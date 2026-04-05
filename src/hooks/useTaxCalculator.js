import { useMemo } from 'react';

const num = (v) => Number(v) || 0;

export function useTaxCalculator(params) {
  const {
    grossUSD, rate, siiRate, afpRate, isapreRate, sisRate, atepRate,
    ufValue, utaValue, topeUF, previRedBasePct, presumedExpensePct, utaCap
  } = params;

  return useMemo(() => {
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
    
    // Total taxable base for the year
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

    return {
      grossMonthlyCLP,
      afp,
      health,
      sis,
      atep,
      totalPrevired,
      f29,
      monthlyLiquid,
      annualTax,
      projectedRefund,
      trueMonthlyNet
    };
  }, [
    grossUSD, rate, siiRate, afpRate, isapreRate, sisRate, atepRate,
    ufValue, utaValue, topeUF, previRedBasePct, presumedExpensePct, utaCap
  ]);
}
