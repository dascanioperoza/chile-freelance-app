import React, { useState } from 'react';

export default function App() {
  // --- USER INPUTS (Fixes the '0' bug) ---
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
    <>
      {/* INJECTED RESPONSIVE CSS */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; min-height: 100vh; }
        .header-title { font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.5px; }
        .header-sub { color: #64748b; margin: 0 0 30px 0; font-weight: 500; font-size: 14px; }
        
        .main-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin: 0 0 16px 0; letter-spacing: 1px; }
        
        .input-grid-2 { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .input-grid-3 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-grid-5 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sii-span { grid-column: 1 / -1; } /* Spans full width on mobile */

        .input-label { display: block; font-size: 11px; font-weight: 700; color: #475569; margin-bottom: 4px; }
        .input-field { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 16px; transition: border-color 0.2s; }
        .input-field:focus { outline: none; border-color: #2563eb; }
        
        .flex-between { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .text-lg { font-size: 15px; }
        .text-sm { font-size: 13px; }
        .font-bold { font-weight: 700; }
        .text-red { color: #ef4444; }
        
        /* Desktop Breakpoint */
        @media (min-width: 768px) {
          .container { padding: 40px 20px; }
          .header-title { font-size: 32px; }
          .header-sub { font-size: 16px; margin-bottom: 40px; }
          .main-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
          .card { padding: 24px; }
          .input-grid-2 { grid-template-columns: 1fr 1fr; gap: 15px; }
          .input-grid-3 { grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
          .input-grid-5 { grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .sii-span { grid-column: span 3; }
        }
      `}</style>

      <div className="container">
        <header>
          <h1 className="header-title">Chile Freelance Pro</h1>
          <p className="header-sub">Ley 21.133 • Mobile Fiscal Dashboard</p>
        </header>

        <div className="main-grid">
          {/* LEFT COLUMN: PARAMETERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="card">
              <h2 className="card-title">1. Core Income</h2>
              <div className="input-grid-2">
                <div>
                  <label className="input-label">Gross USD</label>
                  <input type="number" value={grossUSD} onChange={handle(setGrossUSD)} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Exchange Rate</label>
                  <input type="number" value={rate} onChange={handle(setRate)} className="input-field" />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">2. Mandatory Rates (%)</h2>
              <div className="input-grid-5">
                <div className="sii-span">
                  <label className="input-label" style={{ color: '#2563eb' }}>SII Withholding (F29)</label>
                  <input type="number" step="0.01" value={siiRate} onChange={handle(setSiiRate)} className="input-field" style={{ border: '2px solid #bfdbfe' }} />
                </div>
                <div><label className="input-label">AFP</label><input type="number" step="0.1" value={afpRate} onChange={handle(setAfpRate)} className="input-field" /></div>
                <div><label className="input-label">Health</label><input type="number" step="0.1" value={isapreRate} onChange={handle(setIsapreRate)} className="input-field" /></div>
                <div><label className="input-label">SIS</label><input type="number" step="0.01" value={sisRate} onChange={handle(setSisRate)} className="input-field" /></div>
                <div><label className="input-label">ATEP</label><input type="number" step="0.01" value={atepRate} onChange={handle(setAtepRate)} className="input-field" /></div>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <h2 className="card-title">3. Fiscal Constants</h2>
              <div className="input-grid-3">
                <div><label className="input-label">UF ($)</label><input type="number" value={ufValue} onChange={handle(setUfValue)} className="input-field" style={{ backgroundColor: 'transparent' }} /></div>
                <div><label className="input-label">UTA ($)</label><input type="number" value={utaValue} onChange={handle(setUtaValue)} className="input-field" style={{ backgroundColor: 'transparent' }} /></div>
                <div><label className="input-label">Tope (UF)</label><input type="number" step="0.1" value={topeUF} onChange={handle(setTopeUF)} className="input-field" style={{ backgroundColor: 'transparent' }} /></div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TIMELINE RESULTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* STEP 1: MONTHLY */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '16px 20px' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '15px', fontWeight: '700' }}>MONTHLY REALITY</h3>
                <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '11px' }}>Your out-of-pocket survival budget.</p>
              </div>
              <div style={{ padding: '20px' }}>
                <div className="flex-between text-lg"><span style={{ color: '#475569' }}>Gross CLP</span> <span className="font-bold">{fmt(grossMonthlyCLP)}</span></div>
                <div className="flex-between text-lg" style={{ color: '#ea580c' }}><span>- SII (F29) Payment</span> <span className="font-bold">-{fmt(f29)}</span></div>
                
                <div style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', margin: '12px 0 20px 0' }}>
                  <div className="flex-between font-bold text-red" style={{ marginBottom: '8px' }}><span>- PreviRed Total</span> <span>-{fmt(totalPrevired)}</span></div>
                  <div className="flex-between text-sm text-red" style={{ paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>AFP</span> <span>{fmt(afp)}</span></div>
                  <div className="flex-between text-sm text-red" style={{ paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>Health</span> <span>{fmt(health)}</span></div>
                  <div className="flex-between text-sm text-red" style={{ paddingLeft: '8px', borderLeft: '2px solid #fca5a5' }}><span>SIS & ATEP</span> <span>{fmt(sis + atep)}</span></div>
                </div>

                <div className="flex-between" style={{ paddingTop: '16px', borderTop: '2px solid #f1f5f9' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>Liquid In-Pocket</span>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{fmt(monthlyLiquid)}</span>
                </div>
              </div>
            </div>

            {/* STEP 2: ANNUAL */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #bfdbfe' }}>
              <div style={{ backgroundColor: '#2563eb', padding: '16px 20px' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '15px', fontWeight: '700' }}>PROJECTED MAY REFUND</h3>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#eff6ff' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <div className="flex-between text-sm" style={{ color: '#1e40af' }}><span>F29 Held:</span> <span>{fmt(f29 * 12)}</span></div>
                  <div className="flex-between text-sm text-red"><span>Actual Tax:</span> <span>-{fmt(annualTax)}</span></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '36px', fontWeight: '900', color: '#1d4ed8', borderTop: '1px solid #bfdbfe', paddingTop: '8px' }}>
                  +{fmt(projectedRefund)}
                </div>
              </div>
            </div>

            {/* STEP 3: AVERAGE */}
            <div className="card" style={{ backgroundColor: '#059669', color: 'white' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#d1fae5', letterSpacing: '1px' }}>True Average Monthly Value</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#a7f3d0' }}>Cash + (Refund ÷ 12)</p>
              <div style={{ fontSize: '40px', fontWeight: '900', lineHeight: '1' }}>{fmt(trueMonthlyNet)}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}