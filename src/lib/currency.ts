export const currencies = [
  "USD", "EUR", "GBP", "JPY", "CNY", "HKD", "TWD", "KRW", "AUD", "CAD",
  "CHF", "SGD", "INR", "NZD", "SEK", "NOK", "DKK", "PLN", "BRL", "MXN",
  "THB", "MYR", "IDR", "PHP", "VND", "ZAR", "TRY", "AED", "SAR", "CZK", "HUF", "ILS", "RUB",
  "CLP", "COP", "ARS", "PEN", "QAR", "KWD", "OMR", "EGP", "RON", "BGN", "RSD", "PKR", "BDT", "NGN",
] as const;

export type Currency = (typeof currencies)[number];

export const currencyNames: Record<Currency, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  TWD: "New Taiwan Dollar",
  KRW: "South Korean Won",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  SGD: "Singapore Dollar",
  INR: "Indian Rupee",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  PLN: "Polish Zloty",
  BRL: "Brazilian Real",
  MXN: "Mexican Peso",
  THB: "Thai Baht",
  MYR: "Malaysian Ringgit",
  IDR: "Indonesian Rupiah",
  PHP: "Philippine Peso",
  VND: "Vietnamese Dong",
  ZAR: "South African Rand",
  TRY: "Turkish Lira",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  CZK: "Czech Koruna",
  HUF: "Hungarian Forint",
  ILS: "Israeli New Shekel",
  RUB: "Russian Ruble",
  CLP: "Chilean Peso",
  COP: "Colombian Peso",
  ARS: "Argentine Peso",
  PEN: "Peruvian Sol",
  QAR: "Qatari Riyal",
  KWD: "Kuwaiti Dinar",
  OMR: "Omani Rial",
  EGP: "Egyptian Pound",
  RON: "Romanian Leu",
  BGN: "Bulgarian Lev",
  RSD: "Serbian Dinar",
  PKR: "Pakistani Rupee",
  BDT: "Bangladeshi Taka",
  NGN: "Nigerian Naira",
};

export const currencySymbols: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", HKD: "HK$", TWD: "NT$", KRW: "₩",
  AUD: "A$", CAD: "C$", CHF: "CHF", SGD: "S$", INR: "₹", NZD: "NZ$", SEK: "kr", NOK: "kr",
  DKK: "kr", PLN: "zł", BRL: "R$", MXN: "MX$", THB: "฿", MYR: "RM", IDR: "Rp", PHP: "₱",
  VND: "₫", ZAR: "R", TRY: "₺", AED: "د.إ", SAR: "﷼",
  CZK: "Kč", HUF: "Ft", ILS: "₪", RUB: "₽",
  CLP: "$", COP: "$", ARS: "$", PEN: "S/.",
  QAR: "ر.ق", KWD: "د.ك", OMR: "ر.ع", EGP: "E£",
  RON: "lei", BGN: "лв", RSD: "дин.",
  PKR: "₨", BDT: "৳", NGN: "₦",
};

const currencyRates: Record<Currency, number> = {
  USD: 1, EUR: 0.92, GBP: 0.78, JPY: 150, CNY: 7.2, HKD: 7.8, TWD: 32, KRW: 1380,
  AUD: 1.5, CAD: 1.37, CHF: 0.9, SGD: 1.35, INR: 83, NZD: 1.65, SEK: 10.5, NOK: 10.7,
  DKK: 6.9, PLN: 4, BRL: 5.5, MXN: 18, THB: 36, MYR: 4.7, IDR: 16000, PHP: 58,
  VND: 25000, ZAR: 18, TRY: 33, AED: 3.67, SAR: 3.75, CZK: 23, HUF: 360, ILS: 3.7, RUB: 90,
  CLP: 950, COP: 4000, ARS: 900, PEN: 3.75, QAR: 3.64, KWD: 0.31, OMR: 0.38, EGP: 48,
  RON: 4.6, BGN: 1.8, RSD: 108, PKR: 280, BDT: 118, NGN: 1500,
};

const zeroDecimalCurrencies = new Set<Currency>(["JPY", "KRW", "IDR", "VND", "HUF", "CLP", "COP", "RSD", "PKR", "NGN"]);

export function roundCurrencyAmount(value: number, currency: Currency) {
  return zeroDecimalCurrencies.has(currency) ? Math.round(value) : Math.round(value * 100) / 100;
}

export function convertCurrencyAmount(value: number, from: Currency, to: Currency) {
  if (from === to) return value;
  return roundCurrencyAmount(value * currencyRates[to] / currencyRates[from], to);
}
