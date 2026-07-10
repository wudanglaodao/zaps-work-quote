export const currencies = [
  "USD", "EUR", "GBP", "JPY", "CNY", "HKD", "TWD", "KRW", "AUD", "CAD",
  "CHF", "SGD", "INR", "NZD", "SEK", "NOK", "DKK", "PLN", "BRL", "MXN",
  "THB", "MYR", "IDR", "PHP", "VND", "ZAR", "TRY", "AED", "SAR", "CZK", "HUF", "ILS", "RUB",
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
};

export const currencySymbols: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", HKD: "HK$", TWD: "NT$", KRW: "₩",
  AUD: "A$", CAD: "C$", CHF: "CHF", SGD: "S$", INR: "₹", NZD: "NZ$", SEK: "kr", NOK: "kr",
  DKK: "kr", PLN: "zł", BRL: "R$", MXN: "MX$", THB: "฿", MYR: "RM", IDR: "Rp", PHP: "₱",
  VND: "₫", ZAR: "R", TRY: "₺", AED: "د.إ", SAR: "﷼",
  CZK: "Kč", HUF: "Ft", ILS: "₪", RUB: "₽",
};
