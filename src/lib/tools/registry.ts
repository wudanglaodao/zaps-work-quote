export const tools = [
  {
    slug: "3d-print-cost-calculator",
    status: "live" as const,
    category: "fabrication" as const,
    names: { en: "3D Print Cost Calculator", "zh-hant": "3D 列印成本計算器" },
    summaries: {
      en: "Filament, machine time, labor, failure risk, margin, PDF, and CSV.",
      "zh-hant": "耗材、機器時間、人工、失敗風險、毛利、PDF 與 CSV。",
    },
  },
  {
    slug: "laser-cutting-cost-calculator",
    status: "soon" as const,
    category: "fabrication" as const,
    names: { en: "Laser Cutting Cost Calculator", "zh-hant": "雷射切割成本計算器" },
    summaries: { en: "Sheet material, cutting time, setup, waste, and margin.", "zh-hant": "板材、切割時間、設定、損耗與毛利。" },
  },
  {
    slug: "cleaning-quote-generator",
    status: "soon" as const,
    category: "services" as const,
    names: { en: "Cleaning Quote Generator", "zh-hant": "清潔服務報價工具" },
    summaries: { en: "Rooms, area, frequency, add-ons, and labor.", "zh-hant": "房間、面積、頻率、加購與人工。" },
  },
  {
    slug: "freelance-job-quote",
    status: "soon" as const,
    category: "creative" as const,
    names: { en: "Freelance Job Quote", "zh-hant": "自由工作者報價工具" },
    summaries: { en: "Scope, hourly rate, revisions, rush fee, and deposit.", "zh-hant": "工作範圍、時薪、修改、急件費與訂金。" },
  },
];
