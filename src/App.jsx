import React, { useState } from 'react';

export default function App() {
  const [grossUSD, setGrossUSD] = useState(4500);
  const [rate, setRate] = useState(950);
  const [siiRate, setSiiRate] = useState(15.25);
  const [afpRate, setAfpRate] = useState(11.2);
  const [isapreRate, setIsapreRate] = useState(7.0);

  // 2026 Regulatory Constants (Estimates based on UF/UTA projections)
  const UF_2026 = 39841; 
  const TOPE_IMPONIBLE_UF = 90.1; // Monthly cap for AFP/Health
  const UTA_2026 = 838668; // Annual Tax Unit
  const DEEMED_EXPENSE_CAP = 15 * UTA_2026; // 15 UTA Annual Cap

  // 1. Base Income
  const grossMonthlyCLP = grossUSD * rate;
  const grossAnnualCLP = grossMonthlyCLP * 12;

  // 2. PreviRed Base (Tope Imponible Check)
  const rawImposableBase = grossMonthlyCLP * 0.8;
  const imposableBase = Math.min(rawImposableBase, TOPE_IMPONIBLE_UF * UF_2026);

  // 3. PreviRed Itemized Costs
  const afp = imposableBase * (afpRate / 100);
  const health = imposableBase * (isapreRate / 100);
  const sis = imposableBase * 0.0154; // SIS 1.54%
  const atep = imposableBase * 0.0093; // ATEP + Sanna 0.93%
  const totalPrevired = afp + health + sis + atep;

  // 4. SII Cash Flow (F29)
  const f29 = grossMonthlyCLP * (siiRate / 100);
  const liquidInHand = grossMonthlyCLP - f29 - totalPrevired;

  // 5. Annual Income Tax (IGC) Calculation
  const annualExpenses = Math.min(grossAnnualCLP * 0.3, DEEMED_EXPENSE_CAP);
  const annualSocialSecurity = totalPrevired * 12;
  const annualTaxableBase = Math.max(0, grossAnnualCLP - annualExpenses - annualSocialSecurity);

  const calcAnnualIGC = (base) => {
    const utm = UTA_2026 / 12;
    if (base <= 13.5 * UTA_2026 / 12 * 12) { /* Simplified for display logic */ }
    // Official 2026 Annual Brackets (Approx)
    if (base <= 9397480) return 0;
    if (base <= 20883300) return (base * 0.04) - 375899;
    if (base <= 34805500) return (base * 0.08) - 1211232;
    if (base <= 48727700) return (base * 0.135) - 3125535;
    if (base <= 62649900) return (base * 0.23) - 7754664;
    return (base * 0.304) - 12390750;
  };

  const annualTax = calcAnnualIGC(annualTaxableBase);
  const annualF29Total = f29 * 12;
  const projectedRefund = annualF29Total - annualTax;
  const trueMonthlyAverage = ((liquidInHand * 12) + projectedRefund) / 12;

  const fmt = (v) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(v);

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '30px', backgroundColor: '#f1f5f9', borderRadius: '16px', fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, color: '#1e293b' }}>Precision Freelancer Ledger</h1>
        <p style={{ color: '#64748b' }}>Full 2026 Fiscal Year Projection (Ley 21.133)</p>
      </header>

      {/* INPUTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {[['Gross USD', grossUSD, setGrossUSD], ['Rate', rate, setRate], ['SII %', siiRate, setSiiRate], ['AFP %', afpRate, setAfpRate], ['Health %', isapreRate, setIsapreRate]].map(([label, val, set], i) => (
          <div key={i}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '5px' }}>{label}</label>
            <input type="number" value={val} onChange={(e) => set(Number(e.target.value))} style={{ width: '90%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
        
        {/* COLUMN 1: MONTHLY LEDGER */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '16px', marginTop: 0, borderBottom: '1px solid #edf2f7', paddingBottom: '10px' }}>Monthly Out-of-Pocket Execution</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <tbody>
              <tr style={{ height: '35px' }}><td>Gross Income</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{fmt(grossMonthlyCLP)}</td></tr>
              <tr style={{ height: '35px', color: '#f97316' }}><td>SII Withholding (F29)</td><td style={{ textAlign: 'right' }}>- {fmt(f29)}</td></tr>
              <tr style={{ height: '35px', color: '#ef4444' }}><td>AFP Contribution</td><td style={{ textAlign: 'right' }}>- {fmt(afp)}</td></tr>
              <tr style={{ height: '35px', color: '#ef4444' }}><td>Health (Isapre/Fonasa)</td><td style={{ textAlign: 'right' }}>- {fmt(health)}</td></tr>
              <tr style={{ height: '35px', color: '#ef4444' }}><td>SIS (Disability)</td><td style={{ textAlign: 'right' }}>- {fmt(sis)}</td></tr>
              <tr style={{ height: '35px', color: '#ef4444', borderBottom: '1px solid #edf2f7' }}><td>ATEP + Sanna</td><td style={{ textAlign: 'right' }}>- {fmt(atep)}</td></tr>
              <tr style={{ height: '50px', fontSize: '18px' }}>
                <td style={{ fontWeight: 'bold' }}>Liquid In-Pocket</td>
                <td style={{ textAlign: 'right', fontWeight: '900', color: '#0f172a' }}>{fmt(liquidInHand)}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px' }}>*Imposable base capped at {fmt(TOPE_IMPONIBLE_UF * UF_2026)}</p>
        </div>

        {/* COLUMN 2: ANNUAL WEALTH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '12px', border: '1px solid #dbeafe' }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>Projected May 2027 Refund</h3>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#1d4ed8', margin: '10px 0' }}>{fmt(projectedRefund)}</div>
            <div style={{ fontSize: '12px', color: '#60a5fa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Annual F29 Deposits:</span> <span>{fmt(annualF29Total)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Annual Income Tax:</span> <span>- {fmt(annualTax)}</span></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '12px', color: 'white' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px' }}>TOTAL TRUE MONTHLY VALUE</span>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#4ade80', margin: '5px 0' }}>{fmt(trueMonthlyAverage)}</div>
            <p style={{ fontSize: '12px', margin: 0, opacity: 0.7 }}>This is your current liquid cash + your refund divided by 12.</p>
          </div>

        </div>
      </div>
    </div>
  );
}