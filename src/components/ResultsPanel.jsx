import React from 'react';

export default function ResultsPanel({ t, results }) {
  const {
    grossMonthlyCLP, totalPrevired, afp, health, sis, atep,
    f29, monthlyLiquid, annualTax, projectedRefund, trueMonthlyNet
  } = results;

  const fmt = (v) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(v);

  // Calculate percentages for the progress bar
  const gross = grossMonthlyCLP || 1; // avoid division by zero
  const pctLiquid = (monthlyLiquid / gross) * 100;
  const pctSii = (f29 / gross) * 100;
  const pctAfp = (afp / gross) * 100;
  const pctHealth = (health / gross) * 100;
  const pctSisAtep = ((sis + atep) / gross) * 100;

  return (
    <div className="flex flex-col gap-5 md:gap-6 sticky top-6">
      
      {/* CARD 1: Monthly Reality - Glassmorphism style */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md transition-all">
        <div className="bg-slate-900 dark:bg-slate-950 p-4 px-5">
          <h3 className="m-0 text-white text-[15px] font-bold">{t.results.monthlyTitle}</h3>
          <p className="m-0 mt-0.5 text-slate-400 text-[11px]">{t.results.monthlySub}</p>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600 dark:text-slate-400 text-[15px]">{t.results.grossCLP}</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{fmt(grossMonthlyCLP)}</span>
          </div>
          <div className="flex justify-between items-center mb-2 text-orange-600 dark:text-orange-400 text-[15px]">
            <span>{t.results.siiPay}</span>
            <span className="font-bold">-{fmt(f29)}</span>
          </div>
          
          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-xl my-4 text-red-500 dark:text-red-400">
            <div className="flex justify-between items-center font-bold mb-2">
              <span>{t.results.previred}</span>
              <span>-{fmt(totalPrevired)}</span>
            </div>
            {/* Details */}
            <div className="flex justify-between text-[12px] pl-2 border-l-2 border-red-300 dark:border-red-800 mb-1">
              <span>{t.labels.afp}</span><span>{fmt(afp)}</span>
            </div>
            <div className="flex justify-between text-[12px] pl-2 border-l-2 border-red-300 dark:border-red-800 mb-1">
              <span>{t.labels.health}</span><span>{fmt(health)}</span>
            </div>
            <div className="flex justify-between text-[12px] pl-2 border-l-2 border-red-300 dark:border-red-800">
              <span>{t.labels.sis} & {t.labels.atep}</span><span>{fmt(sis + atep)}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-end pt-4 border-t-2 border-slate-100 dark:border-slate-700/50 mt-2 gap-2">
            <span className="text-[12px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.results.liquid}</span>
            <span className="text-3xl md:text-[28px] font-black text-slate-900 dark:text-white leading-none">{fmt(monthlyLiquid)}</span>
          </div>
        </div>
      </div>

      {/* CARD 2: Visual Distribution (NEW FEATURE) */}
      <div className="rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h3 className="text-[13px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-1">{t.results.distribution}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-4">{t.results.distributionSub}</p>
        
        {/* Progress Bar Container */}
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-900">
          <div style={{ width: `${pctLiquid}%` }} className="bg-emerald-500 h-full transition-all duration-500" title="Liquid"></div>
          <div style={{ width: `${pctSii}%` }} className="bg-orange-500 h-full transition-all duration-500" title="SII"></div>
          <div style={{ width: `${pctAfp}%` }} className="bg-red-400 h-full transition-all duration-500" title="AFP"></div>
          <div style={{ width: `${pctHealth}%` }} className="bg-red-500 h-full transition-all duration-500" title="Health"></div>
          <div style={{ width: `${pctSisAtep}%` }} className="bg-red-600 h-full transition-all duration-500" title="SIS+ATEP"></div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-[11px] font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Liquid {pctLiquid.toFixed(1)}%</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> SII {pctSii.toFixed(1)}%</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> AFP {pctAfp.toFixed(1)}%</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Health {pctHealth.toFixed(1)}%</div>
        </div>
      </div>

      {/* CARD 3: Annual Reality */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-blue-200 dark:border-blue-900/50">
        <div className="bg-blue-600 p-4 px-5">
          <h3 className="m-0 text-white text-[15px] font-bold">{t.results.annualTitle}</h3>
        </div>
        <div className="p-5 bg-blue-50 dark:bg-blue-950/20">
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex justify-between text-[13px] text-blue-900 dark:text-blue-300 font-medium"><span>{t.results.f29Held}</span> <span>{fmt(f29 * 12)}</span></div>
            <div className="flex justify-between text-[13px] text-red-500 dark:text-red-400 font-medium"><span>{t.results.actualTax}</span> <span>-{fmt(annualTax)}</span></div>
          </div>
          <div className="text-right text-4xl mt-3 font-black text-blue-700 dark:text-blue-400 border-t border-blue-200 dark:border-blue-800/50 pt-3">
            +{fmt(projectedRefund)}
          </div>
        </div>
      </div>

      {/* CARD 4: True Average */}
      <div className="rounded-2xl p-5 shadow-lg bg-emerald-600 dark:bg-emerald-700 text-white bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-800 border border-emerald-400 dark:border-emerald-600">
        <h3 className="m-0 mb-1 text-[13px] font-extrabold uppercase text-emerald-100 tracking-wider">{t.results.avgTitle}</h3>
        <p className="m-0 mb-3 text-[11px] text-emerald-200">{t.results.avgSub}</p>
        <div className="text-[40px] font-black leading-none drop-shadow-sm">{fmt(trueMonthlyNet)}</div>
      </div>

    </div>
  );
}
