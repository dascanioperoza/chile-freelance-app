import React, { useState } from 'react';

export default function App() {
  // --- USER INPUTS (Allowed to be empty strings to fix the '0' bug) ---
  const [grossUSD, setGrossUSD] = useState(4500);
  const [rate, setRate] = useState(950);
  const [siiRate, setSiiRate] = useState(15.25);
  const [afpRate, setAfpRate] = useState(11.2);
  const [isapreRate, setIsapreRate] = useState(7.0);
  const [sisRate, setSisRate] = useState(1.54);
  const [atepRate, setAtepRate] = useState(0.93);
  
  // Fiscal Constants
  const [ufValue, setUfValue] = useState(39841); 
  const [utaValue, setUtaValue] = useState(838668);
  const [topeUF, setTopeUF] = useState(90.1);

  // --- SAFE INPUT HANDLER ---
  const handle = (setter) => (e) => {
    setter(e.target.value === "" ? "" : Number(e.target.value));
  };
  const num = (v) => Number(v) || 0;

  // --- MATH & LOGIC ---
  const grossMonthlyCLP = num(grossUSD) * num(rate);
  const rawImposableBase = grossMonthlyCLP * 0.8;
  const monthlyCapCLP = num(topeUF) * num(ufValue);
  const imposableBase = Math.min(rawImposableBase, monthlyCapCLP);

  const afp = imposableBase * (num(afpRate) / 100);
  const health = imposableBase * (num(isapreRate) / 100);
  const sis = imposableBase * (num(sisRate) / 100);
  const atep = imposableBase * (num(atepRate) / 100);
  const totalPrevired = afp + health + sis + atep;

  const f29 = grossMonthlyCLP * (num(siiRate) / 100);
  const monthlyLiquid = grossMonthlyCLP - f29 - totalPrevired;

  // Annual Projections
  const annualGross = grossMonthlyCLP * 12;
  const uta = num(utaValue);
  const actualExpenses = uta > 0 ? Math.min(annualGross * 0.3, 15 * uta) : 0;
  const taxableBaseAnnual = Math.max(0, annualGross - actualExpenses - (totalPrevired * 12));

  const calcAnnualIGC = (base) => {
    if (uta === 0) return 0;
    const b = base / uta;
    if (b <= 13.5) return 0;
    if (b <= 30) return (base * 0.04) - (0.54 * uta);
    if (b <= 50) return (base * 0.08) - (1.74 * uta);
    if (b <= 70) return (base * 0.135) - (4.49 * uta);
    if (b <= 90) return (base * 0.23) - (11.14 * uta);
    if (b <= 120) return (base * 0.304) - (17.80 * uta);
    if (b <= 310) return (base * 0.35) - (23.32 * uta);
    return (base * 0.40) - (38.82 * uta);
  };

  const annualTax = calcAnnualIGC(taxableBaseAnnual);
  const projectedRefund = (f29 * 12) - annualTax;
  const trueMonthlyNet = ((monthlyLiquid * 12) + projectedRefund) / 12;

  const fmt = (v) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(v);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Chile Freelance Pro</h1>
        <p style={{ color: '#64748b', margin: 0, fontWeight: '500' }}>Ley 21.133 • Dynamic Fiscal Dashboard</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
        
        {/* LEFT COLUMN: PARAMETERS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '20px', letterSpacing: '1px' }}>1. Core Income</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Gross USD</label>
                <input type="number" value={grossUSD} onChange={handle(setGrossUSD)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Exchange Rate</label>
                <input type="number" value={rate} onChange={handle(setRate)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '20px', letterSpacing: '1px' }}>2. Mandatory Rates (%)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              <div style={{ gridColumn: 'span 3' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#2563eb', marginBottom: '6px' }}>SII Withholding (F29)</label>
                <input type="number" step="0.01" value={siiRate} onChange={handle(setSiiRate)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #bfdbfe', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
              <div><label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>AFP</label><input type="number" step="0.1" value={afpRate} onChange={handle(setAfpRate)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Health</label><input type="number" step="0.1" value={isapreRate} onChange={handle(setIsapreRate)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>SIS</label><input type="number" step="0.01" value={sisRate} onChange={handle(setSisRate)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>ATEP</label><input type="number" step="0.01" value={atepRate} onChange={handle(setAtepRate)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }} /></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f1f5f9', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '20px', letterSpacing: '1px' }}>3. Fiscal Constants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>UF ($)</label><input type="number" value={ufValue} onChange={handle(setUfValue)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'transparent', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>UTA ($)</label><input type="number" value={utaValue} onChange={handle(setUtaValue)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'transparent', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>Tope (UF)</label><input type="number" step="0.1" value={topeUF} onChange={handle(setTopeUF)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'transparent', boxSizing: 'border-box' }} /></div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TIMELINE RESULTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* STEP 1: MONTHLY */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '16px 24px' }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: '700' }}>MONTHLY REALITY</h3>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '12px' }}>Your strict out-of-pocket survival budget.</p>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px' }}><span style={{ color: '#475569' }}>Gross CLP</span> <span style={{ fontWeight: '700' }}>{fmt(grossMonthlyCLP)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#ea580c' }}><span>- SII (F29) Payment</span> <span style={{ fontWeight: '600' }}>-{fmt(f29)}</span></div>
              
              <div style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', marginTop: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626', fontWeight: '700', marginBottom: '8px' }}><span>- PreviRed Total</span> <span>-{fmt(totalPrevired)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#ef4444', paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>AFP</span> <span>{fmt(afp)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#ef4444', paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>Health</span> <span>{fmt(health)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#ef4444', paddingLeft: '8px', borderLeft: '2px solid #fca5a5' }}><span>SIS & ATEP</span> <span>{fmt(sis + atep)}</span></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '2px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Liquid In-Pocket</span>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a' }}>{fmt(monthlyLiquid)}</span>
              </div>
            </div>
          </div>

          {/* STEP 2: ANNUAL */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #bfdbfe', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.1)' }}>
            <div style={{ backgroundColor: '#2563eb', padding: '16px 24px' }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: '700' }}>PROJECTED MAY REFUND</h3>
              <p style={{ margin: '4px 0 0 0', color: '#bfdbfe', fontSize: '12px' }}>Assuming 12 months at this income level.</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: '#eff6ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#1e40af', marginBottom: '4px' }}>F29 Held: {fmt(f29 * 12)}</div>
                  <div style={{ fontSize: '13px', color: '#dc2626' }}>Actual Tax: -{fmt(annualTax)}</div>
                </div>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#1d4ed8' }}>+{fmt(projectedRefund)}</div>
              </div>
            </div>
          </div>

          {/* STEP 3: AVERAGE */}
          <div style={{ backgroundColor: '#059669', borderRadius: '16px', overflow: 'hidden', padding: '24px', color: 'white', boxShadow: '0 10px 15px -3px rgba(5,150,105,0.3)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#d1fae5', letterSpacing: '1px' }}>True Average Monthly Value</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#a7f3d0' }}>Mathematical value of your work: Cash + (Refund ÷ 12)</p>
            <div style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1' }}>{fmt(trueMonthlyNet)}</div>
          </div>

        </div>
      </div>
    </div>
  );
}