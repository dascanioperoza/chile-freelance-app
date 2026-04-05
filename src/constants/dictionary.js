export const dict = {
  en: {
    title: "Chile Freelance Pro",
    subtitle: "Ley 21.133 • Bulletproof Edition",
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
      avgTitle: "True Average Monthly Value", avgSub: "Cash + (Refund ÷ 12)",
      distribution: "Income Distribution", distributionSub: "Where does your money go?"
    }
  },
  es: {
    title: "Pro Freelancer Chile",
    subtitle: "Ley 21.133 • Edición Blindada",
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
      avgTitle: "Valor Mensual Promedio Real", avgSub: "Líquido + (Devolución ÷ 12)",
      distribution: "Distribución del Ingreso", distributionSub: "¿Adónde va tu dinero?"
    }
  }
};
