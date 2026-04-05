import React from 'react';
import LabelWithHelper from './LabelWithHelper';

export default function InputPanel({ t, p }) {
  // We destructure the handlers and state variables out of properties 'p' for readability
  // p contains: grossUSD, setGrossUSD, rate, setRate,... etc.

  const inputClass = "w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const inputTransClass = "w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all";
  
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      
      {/* SECTION 1: Core Income */}
      <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-[13px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-4">{t.sections[0]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <LabelWithHelper title={t.labels.gross} helperText={t.helpers.gross} />
            <input type="number" value={p.grossUSD} onChange={(e) => p.setGrossUSD(e.target.value)} className={inputClass} />
          </div>
          <div>
            <LabelWithHelper title={t.labels.rate} helperText={t.helpers.rate} />
            <input type="number" value={p.rate} onChange={(e) => p.setRate(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* SECTION 2: Mandatory Rates */}
      <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-[13px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-4">{t.sections[1]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-3">
            <LabelWithHelper color="#2563eb" title={t.labels.sii} helperText={t.helpers.sii} />
            <input type="number" step="0.01" value={p.siiRate} onChange={(e) => p.setSiiRate(e.target.value)} 
              className={`${inputClass} border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20`} />
          </div>
          <div>
            <LabelWithHelper title={t.labels.afp} helperText={t.helpers.afp} />
            <input type="number" step="0.1" value={p.afpRate} onChange={(e) => p.setAfpRate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <LabelWithHelper title={t.labels.health} helperText={t.helpers.health} />
            <input type="number" step="0.1" value={p.isapreRate} onChange={(e) => p.setIsapreRate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <div className="flex gap-2 w-full">
               <div className="flex-1">
                 <LabelWithHelper title={t.labels.sis} helperText={t.helpers.sis} />
                 <input type="number" step="0.01" value={p.sisRate} onChange={(e) => p.setSisRate(e.target.value)} className={inputClass} />
               </div>
               <div className="flex-1">
                 <LabelWithHelper title={t.labels.atep} helperText={t.helpers.atep} />
                 <input type="number" step="0.01" value={p.atepRate} onChange={(e) => p.setAtepRate(e.target.value)} className={inputClass} />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Fiscal Constants */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-[13px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-4">{t.sections[2]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <LabelWithHelper title={t.labels.uf} helperText={t.helpers.uf} />
            <input type="number" value={p.ufValue} onChange={(e) => p.setUfValue(e.target.value)} className={inputTransClass} />
          </div>
          <div>
            <LabelWithHelper title={t.labels.uta} helperText={t.helpers.uta} />
            <input type="number" value={p.utaValue} onChange={(e) => p.setUtaValue(e.target.value)} className={inputTransClass} />
          </div>
          <div>
            <LabelWithHelper title={t.labels.tope} helperText={t.helpers.tope} />
            <input type="number" step="0.1" value={p.topeUF} onChange={(e) => p.setTopeUF(e.target.value)} className={inputTransClass} />
          </div>
        </div>
      </div>

      {/* SECTION 4: Advanced Tax Rules */}
      <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-5 md:p-6 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-800/30">
        <h2 className="text-[13px] font-extrabold uppercase text-fuchsia-500 dark:text-fuchsia-400 tracking-wider mb-4">{t.sections[3]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <LabelWithHelper color="#a855f7" title={t.labels.base} helperText={t.helpers.base} />
            <input type="number" value={p.previRedBasePct} onChange={(e) => p.setPreviRedBasePct(e.target.value)} className={`${inputTransClass} !border-fuchsia-200 dark:!border-fuchsia-800/50 focus:!ring-fuchsia-500`} />
          </div>
          <div>
            <LabelWithHelper color="#a855f7" title={t.labels.exp} helperText={t.helpers.exp} />
            <input type="number" value={p.presumedExpensePct} onChange={(e) => p.setPresumedExpensePct(e.target.value)} className={`${inputTransClass} !border-fuchsia-200 dark:!border-fuchsia-800/50 focus:!ring-fuchsia-500`} />
          </div>
          <div>
            <LabelWithHelper color="#a855f7" title={t.labels.cap} helperText={t.helpers.cap} />
            <input type="number" value={p.utaCap} onChange={(e) => p.setUtaCap(e.target.value)} className={`${inputTransClass} !border-fuchsia-200 dark:!border-fuchsia-800/50 focus:!ring-fuchsia-500`} />
          </div>
        </div>
      </div>

    </div>
  );
}
