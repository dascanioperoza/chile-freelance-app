import React, { useState } from 'react';

export default function App() {
  // --- LANGUAGE STATE & DICTIONARY ---
  const [lang, setLang] = useState('en');

  const dict = {
    en: {
      title: "Chile Freelance Pro",
      subtitle: "Ley 21.133 • Bilingual Edition",
      switchBtn: "🇪🇸 Cambiar a Español",
      sections: ["1. Core Income", "2. Mandatory Rates (%)", "3. Fiscal Constants", "4. Advanced Tax Rules"],
      labels: {
        gross: "Gross USD", rate: "Exchange Rate", sii: "SII Withholding (F29)",
        afp: "AFP", health: "Health", sis: "SIS", atep: "ATEP",
        uf: "UF ($)", uta: "UTA ($)", tope: "Tope (UF)",
        base: "PreviRed Base %", exp: "Presumed Exp. %", cap: "Exp. Cap (UTA)"
      },
      helpers: {
        gross: "Your total monthly invoice amount sent to the foreign client.",
        rate: "The actual USD to CLP conversion rate applied by your bank/platform.",
        sii: "The mandatory tax retention (15.25% in 2026). The SII holds this until April.",
        afp: "Your pension fund contribution. Varies depending on your AFP.",
        health: "Fonasa or Isapre. Legally 7%, but can be higher depending on your plan.",
        sis: "Disability and Survivorship Insurance. Currently fixed at 1.54%.",
        atep: "Work Accident Insurance + Ley Sanna. Minimum is 0.93%.",
        uf: "Unidad de Fomento. A daily adjusting economic indicator.",
        uta: "Unidad Tributaria Anual. Used to calculate Income Tax brackets.",
        tope: "The legal maximum salary limit (approx 90.1 UF) for calculating AFP/Health.",
        base: "Independent workers only pay social security on 80% of their gross income.",
        exp: "The SII automatically deducts 30% of your income as tax-free 'business expenses'.",
        cap: "The 30% expense deduction is capped at a maximum of 15 UTA per year."
      },
      results: {
        monthlyTitle: "MONTHLY REALITY", monthlySub: "Your out-of-pocket survival budget.",
        grossCLP: "Gross CLP", siiPay: "- SII (F29) Payment",
        previred: "- PreviRed Total", liquid: "Liquid In-Pocket",
        annualTitle: "PROJECTED MAY REFUND", f29Held: "F29 Held:",
        actualTax: "Actual Tax:",
        avgTitle: "True Average Monthly Value", avgSub: "Cash + (Refund ÷ 12)"
      }
    },
    es: {
      title: "Pro Freelancer Chile",
      subtitle: "Ley 21.133 • Edición Bilingüe",
      switchBtn: "🇺🇸 Switch to English",
      sections: ["1. Ingresos Base", "2. Tasas Obligatorias (%)", "3. Constantes Fiscales", "4. Reglas Tributarias"],
      labels: {
        gross: "Ingreso Bruto USD", rate: "Tipo de Cambio", sii: "Retención SII (F29)",
        afp: "AFP", health: "Salud (Isapre/Fonasa)", sis: "SIS", atep: "ATEP (Mutual)",
        uf: "Valor UF ($)", uta: "Valor UTA ($)", tope: "Tope Imponible (UF)",
        base: "Base PreviRed %", exp: "Gasto Presunto %", cap: "Tope Gastos (UTA)"
      },
      helpers: {
        gross: "El monto total de tu factura (boleta) enviada al cliente extranjero.",
        rate: "El tipo de cambio real de USD a CLP que aplica tu banco.",
        sii: "Retención obligatoria (15.25% en 2026). El SII lo guarda hasta la Operación Renta.",
        afp: "Aporte a tu fondo de pensiones. Varía según la AFP que elijas.",
        health: "Fonasa o Isapre. Legalmente 7%, pero puede ser mayor según tu plan.",
        sis: "Seguro de Invalidez y Sobrevivencia. Fijo en 1.54%.",
        atep: "Seguro contra Accidentes del Trabajo + Ley Sanna. Mínimo 0.93%.",
        uf: "Unidad de Fomento. Indicador económico diario usado para topes y seguros.",
        uta: "Unidad Tributaria Anual. Usada para calcular los tramos del Impuesto Global Complementario.",
        tope: "Límite máximo legal (aprox 90.1 UF) sobre el cual se calcula AFP/Salud.",
        base: "Los trabajadores independientes solo cotizan sobre el 80% de su ingreso bruto.",
        exp: "El SII asume que gastaste el 30% de tus ingresos en 'gastos necesarios' y no cobra impuestos sobre eso.",
        cap: "El beneficio del 30% de gasto presunto tiene un límite máximo de 15 UTA al año."
      },
      results: {
        monthlyTitle: "REALIDAD MENSUAL", monthlySub: "Tu presupuesto líquido de supervivencia.",
        grossCLP: "Ingreso Bruto CLP", siiPay: "- Pago SII (F29)",
        previred: "- Total PreviRed", liquid: "Líquido en Bolsillo",
        annualTitle: "DEVOLUCIÓN MAYO PROYECTADA", f29Held: "F29 Retenido:",
        actualTax: "Impuesto Real (IGC):",
        avgTitle: "Valor Mensual Promedio Real", avgSub: "Líquido + (Devolución ÷ 12)"
      }
    }
  };

  const t = dict[lang];

  // --- CORE INPUTS ---
  const [grossUSD, setGrossUSD] = useState(4500);
  const [rate, setRate] = useState(950);
  
  // --- MANDATORY RATES ---
  const [siiRate, setSiiRate] = useState(15.25);
  const [afpRate, setAfpRate] = useState(11.2);
  const [isapreRate, setIsapreRate] = useState(7.0);
  const [sisRate, setSisRate] = useState(1.54);
  const [atepRate, setAtepRate] = useState(0.93);
  
  // --- FISCAL CONSTANTS ---
  const [ufValue, setUfValue] = useState(39841); 
  const [utaValue, setUtaValue] = useState(838668);
  const [topeUF, setTopeUF] = useState(90.1);

  // --- ADVANCED TAX RULES ---
  const [previRedBasePct, setPreviRedBasePct] = useState(80); 
  const [presumedExpensePct, setPresumedExpensePct] = useState(30); 
  const [utaCap, setUtaCap] = useState(15); 

  const handle = (setter) => (e) => {
    setter(e.target.value === "" ? "" : Number(e.target.value));
  };
  const num = (v) => Number(v) || 0;

  // --- MATH & LOGIC ---
  const grossMonthlyCLP = num(grossUSD) * num(rate);
  const rawImposableBase = grossMonthlyCLP * (num(previRedBasePct) / 100);
  const monthlyCapCLP = num(topeUF) * num(ufValue);
  const imposableBase = Math.min(rawImposableBase, monthlyCapCLP);

  const afp = imposableBase * (num(afpRate) / 100);
  const health = imposableBase * (num(isapreRate) / 100);
  const sis = imposableBase * (num(sisRate) / 100);
  const atep = imposableBase * (num(atepRate) / 100);
  const totalPrevired = afp + health + sis + atep;

  const f29 = grossMonthlyCLP * (num(siiRate) / 100);
  const monthlyLiquid = grossMonthlyCLP - f29 - totalPrevired;

  const annualGross = grossMonthlyCLP * 12;
  const uta = num(utaValue);
  const calculatedExpenses = annualGross * (num(presumedExpensePct) / 100);
  const maxExpenseCap = num(utaCap) * uta;
  const actualExpenses = uta > 0 ? Math.min(calculatedExpenses, maxExpenseCap) : 0;
  
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

  const LabelWithHelper = ({ title, helperText, color }) => (
    <div className="label-container">
      <label className="input-label" style={{ color: color || '#475569' }}>{title}</label>
      <div className="tooltip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
        <div className="tooltip-text">{helperText}</div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; min-height: 100vh; }
        
        .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .header-title { font-size: 28px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.5px; }
        .header-sub { color: #64748b; margin: 0; font-weight: 500; font-size: 14px; }
        
        .lang-btn { background: #e2e8f0; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; color: #475569; cursor: pointer; transition: 0.2s; font-size: 13px; }
        .lang-btn:hover { background: #cbd5e1; color: #0f172a; }

        .main-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-alt { background: #f1f5f9; border: 1px solid #e2e8f0; }
        .card-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin: 0 0 16px 0; letter-spacing: 1px; }
        
        .input-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .input-grid-5 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sii-span { grid-column: 1 / -1; }

        .label-container { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
        .input-label { font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .input-field { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 16px; transition: border-color 0.2s; }
        .input-field-trans { background: transparent; border: 1px solid #cbd5e1; padding: 8px; }
        .input-field:focus { outline: none; border-color: #2563eb; }
        
        .flex-between { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .font-bold { font-weight: 700; }
        .text-red { color: #ef4444; }

        .tooltip { position: relative; display: flex; align-items: center; cursor: help; color: #64748b; }
        .tooltip-text { 
          visibility: hidden; width: 220px; background-color: #1e293b; color: #f8fafc; 
          text-align: left; border-radius: 8px; padding: 10px 12px; position: absolute; 
          z-index: 50; bottom: 150%; left: 50%; margin-left: -110px; opacity: 0; 
          transition: opacity 0.2s, transform 0.2s; transform: translateY(5px);
          font-size: 11px; font-weight: 500; text-transform: none; line-height: 1.4;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); pointer-events: none;
        }
        .tooltip-text::after {
          content: ""; position: absolute; top: 100%; left: 50%; margin-left: -6px;
          border-width: 6px; border-style: solid; border-color: #1e293b transparent transparent transparent;
        }
        .tooltip:hover .tooltip-text, .tooltip:active .tooltip-text { 
          visibility: visible; opacity: 1; transform: translateY(0); 
        }
        
        @media (min-width: 768px) {
          .container { padding: 40px 20px; }
          .header-title { font-size: 32px; }
          .main-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
          .card { padding: 24px; }
          .input-grid-5 { grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .sii-span { grid-column: span 3; }
        }
      `}</style>

      <div className="container">
        <header className="header-top">
          <div>
            <h1 className="header-title">{t.title}</h1>
            <p className="header-sub">{t.subtitle}</p>
          </div>
          <button 
            className="lang-btn" 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          >
            {t.switchBtn}
          </button>
        </header>

        <div className="main-grid">
          {/* LEFT COLUMN: PARAMETERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="card">
              <h2 className="card-title">{t.sections[0]}</h2>
              <div className="input-grid-2">
                <div>
                  <LabelWithHelper title={t.labels.gross} helperText={t.helpers.gross} />
                  <input type="number" value={grossUSD} onChange={handle(setGrossUSD)} className="input-field" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.rate} helperText={t.helpers.rate} />
                  <input type="number" value={rate} onChange={handle(setRate)} className="input-field" />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">{t.sections[1]}</h2>
              <div className="input-grid-5">
                <div className="sii-span">
                  <LabelWithHelper color="#2563eb" title={t.labels.sii} helperText={t.helpers.sii} />
                  <input type="number" step="0.01" value={siiRate} onChange={handle(setSiiRate)} className="input-field" style={{ border: '2px solid #bfdbfe' }} />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.afp} helperText={t.helpers.afp} />
                  <input type="number" step="0.1" value={afpRate} onChange={handle(setAfpRate)} className="input-field" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.health} helperText={t.helpers.health} />
                  <input type="number" step="0.1" value={isapreRate} onChange={handle(setIsapreRate)} className="input-field" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.sis} helperText={t.helpers.sis} />
                  <input type="number" step="0.01" value={sisRate} onChange={handle(setSisRate)} className="input-field" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.atep} helperText={t.helpers.atep} />
                  <input type="number" step="0.01" value={atepRate} onChange={handle(setAtepRate)} className="input-field" />
                </div>
              </div>
            </div>

            <div className="card card-alt">
              <h2 className="card-title">{t.sections[2]}</h2>
              <div className="input-grid-3">
                <div>
                  <LabelWithHelper title={t.labels.uf} helperText={t.helpers.uf} />
                  <input type="number" value={ufValue} onChange={handle(setUfValue)} className="input-field input-field-trans" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.uta} helperText={t.helpers.uta} />
                  <input type="number" value={utaValue} onChange={handle(setUtaValue)} className="input-field input-field-trans" />
                </div>
                <div>
                  <LabelWithHelper title={t.labels.tope} helperText={t.helpers.tope} />
                  <input type="number" step="0.1" value={topeUF} onChange={handle(setTopeUF)} className="input-field input-field-trans" />
                </div>
              </div>
            </div>

            <div className="card card-alt" style={{ backgroundColor: '#fdf4ff', borderColor: '#f3e8ff' }}>
              <h2 className="card-title" style={{ color: '#a855f7' }}>{t.sections[3]}</h2>
              <div className="input-grid-3">
                <div>
                  <LabelWithHelper color="#9333ea" title={t.labels.base} helperText={t.helpers.base} />
                  <input type="number" value={previRedBasePct} onChange={handle(setPreviRedBasePct)} className="input-field input-field-trans" style={{ borderColor: '#e9d5ff' }} />
                </div>
                <div>
                  <LabelWithHelper color="#9333ea" title={t.labels.exp} helperText={t.helpers.exp} />
                  <input type="number" value={presumedExpensePct} onChange={handle(setPresumedExpensePct)} className="input-field input-field-trans" style={{ borderColor: '#e9d5ff' }} />
                </div>
                <div>
                  <LabelWithHelper color="#9333ea" title={t.labels.cap} helperText={t.helpers.cap} />
                  <input type="number" value={utaCap} onChange={handle(setUtaCap)} className="input-field input-field-trans" style={{ borderColor: '#e9d5ff' }} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TIMELINE RESULTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '16px 20px' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '15px', fontWeight: '700' }}>{t.results.monthlyTitle}</h3>
                <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '11px' }}>{t.results.monthlySub}</p>
              </div>
              <div style={{ padding: '20px' }}>
                <div className="flex-between"><span style={{ color: '#475569', fontSize: '15px' }}>{t.results.grossCLP}</span> <span className="font-bold">{fmt(grossMonthlyCLP)}</span></div>
                <div className="flex-between" style={{ color: '#ea580c', fontSize: '15px' }}><span>{t.results.siiPay}</span> <span className="font-bold">-{fmt(f29)}</span></div>
                
                <div style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', margin: '12px 0 20px 0' }}>
                  <div className="flex-between font-bold text-red" style={{ marginBottom: '8px' }}><span>{t.results.previred}</span> <span>-{fmt(totalPrevired)}</span></div>
                  <div className="flex-between text-red" style={{ fontSize: '12px', paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>{t.labels.afp}</span> <span>{fmt(afp)}</span></div>
                  <div className="flex-between text-red" style={{ fontSize: '12px', paddingLeft: '8px', borderLeft: '2px solid #fca5a5', marginBottom: '4px' }}><span>{t.labels.health}</span> <span>{fmt(health)}</span></div>
                  <div className="flex-between text-red" style={{ fontSize: '12px', paddingLeft: '8px', borderLeft: '2px solid #fca5a5' }}><span>{t.labels.sis} & {t.labels.atep}</span> <span>{fmt(sis + atep)}</span></div>
                </div>

                <div className="flex-between" style={{ paddingTop: '16px', borderTop: '2px solid #f1f5f9' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>{t.results.liquid}</span>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{fmt(monthlyLiquid)}</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #bfdbfe' }}>
              <div style={{ backgroundColor: '#2563eb', padding: '16px 20px' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '15px', fontWeight: '700' }}>{t.results.annualTitle}</h3>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#eff6ff' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <div className="flex-between" style={{ fontSize: '13px', color: '#1e40af' }}><span>{t.results.f29Held}</span> <span>{fmt(f29 * 12)}</span></div>
                  <div className="flex-between text-red" style={{ fontSize: '13px' }}><span>{t.results.actualTax}</span> <span>-{fmt(annualTax)}</span></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '36px', fontWeight: '900', color: '#1d4ed8', borderTop: '1px solid #bfdbfe', paddingTop: '8px' }}>
                  +{fmt(projectedRefund)}
                </div>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: '#059669', color: 'white' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#d1fae5', letterSpacing: '1px' }}>{t.results.avgTitle}</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#a7f3d0' }}>{t.results.avgSub}</p>
              <div style={{ fontSize: '40px', fontWeight: '900', lineHeight: '1' }}>{fmt(trueMonthlyNet)}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}