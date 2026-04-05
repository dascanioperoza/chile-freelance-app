import React, { useState, useEffect } from 'react';
import { dict } from './constants/dictionary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaxCalculator } from './hooks/useTaxCalculator';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';

export default function App() {
  // --- PREFERENCES STATE ---
  const [lang, setLang] = useLocalStorage('app-lang', 'en');
  const [theme, setTheme] = useLocalStorage('app-theme', 'system'); // 'light', 'dark', 'system'

  // Apply dark mode on mount and theme change
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'system' || theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  const t = dict[lang];

  // --- PERSISTENT CALCULATOR STATE ---
  const [grossUSD, setGrossUSD] = useLocalStorage('tax-grossUSD', "4500");
  const [rate, setRate] = useLocalStorage('tax-rate', "950");
  const [siiRate, setSiiRate] = useLocalStorage('tax-siiRate', "15.25");
  const [afpRate, setAfpRate] = useLocalStorage('tax-afpRate', "11.2");
  const [isapreRate, setIsapreRate] = useLocalStorage('tax-isapreRate', "7.0");
  const [sisRate, setSisRate] = useLocalStorage('tax-sisRate', "1.54");
  const [atepRate, setAtepRate] = useLocalStorage('tax-atepRate', "0.93");
  const [ufValue, setUfValue] = useLocalStorage('tax-ufValue', "39841"); 
  const [utaValue, setUtaValue] = useLocalStorage('tax-utaValue', "838668");
  const [topeUF, setTopeUF] = useLocalStorage('tax-topeUF', "90.1");
  const [previRedBasePct, setPreviRedBasePct] = useLocalStorage('tax-previRedBasePct', "80"); 
  const [presumedExpensePct, setPresumedExpensePct] = useLocalStorage('tax-presumedExpensePct', "30"); 
  const [utaCap, setUtaCap] = useLocalStorage('tax-utaCap', "15"); 

  const inputProps = {
    grossUSD, setGrossUSD, rate, setRate, siiRate, setSiiRate, afpRate, setAfpRate,
    isapreRate, setIsapreRate, sisRate, setSisRate, atepRate, setAtepRate,
    ufValue, setUfValue, utaValue, setUtaValue, topeUF, setTopeUF,
    previRedBasePct, setPreviRedBasePct, presumedExpensePct, setPresumedExpensePct, utaCap, setUtaCap
  };

  // --- CALCULATOR HOOK ---
  const results = useTaxCalculator(inputProps);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-100 font-sans pb-20">
      <div className="max-w-[1200px] mx-auto p-5 md:p-10">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-[15px]">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 
                         px-4 py-2 rounded-full font-semibold text-[13px] transition-colors shadow-sm"
              onClick={toggleTheme}
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button 
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 
                         px-4 py-2 rounded-full font-semibold text-[13px] transition-colors shadow-sm"
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            >
              {t.switchBtn}
            </button>
          </div>
        </header>

        {/* MAIN TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* LEFT: Inputs */}
          <div>
            <InputPanel t={t} p={inputProps} />
          </div>

          {/* RIGHT: Results */}
          <div>
            <ResultsPanel t={t} results={results} />
          </div>
        </div>

      </div>
    </div>
  );
}