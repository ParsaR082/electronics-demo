/**
 * Persian number mapping dictionary
 */
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Converts English and Arabic digits to Persian digits
 */
export function toPersianDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return "";
  const str = input.toString();
  return str
    .replace(/[0-9]/g, (w) => PERSIAN_DIGITS[+w])
    .replace(/[٠-٩]/g, (w) => PERSIAN_DIGITS[ARABIC_DIGITS.indexOf(w)]);
}

/**
 * Formats a number with comma separators and Persian digits
 * e.g. 12500000 -> ۱۲,۵۰۰,۰۰۰
 */
export function formatPersianNumber(num: number | string): string {
  if (num === undefined || num === null) return "";
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(n)) return toPersianDigits(num);
  const formatted = new Intl.NumberFormat("fa-IR").format(n);
  return formatted;
}

/**
 * Formats a price in Tomans with Persian numerals
 * e.g. 89000000 -> ۸۹,۰۰۰,۰۰۰ تومان
 */
export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) return "۰ تومان";
  return `${formatPersianNumber(price)} تومان`;
}

/**
 * Normalizes Persian text for consistent search:
 * - Maps Arabic ي to Persian ی
 * - Maps Arabic ك to Persian ک
 * - Maps Arabic ة to Persian ه
 * - Removes zero-width non-joiner (optional/normalized)
 * - Trims and lowercases
 */
export function normalizePersianText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/[\u200B-\u200D\uFEFF]/g, " ") // replace zero-width spaces with regular space
    .replace(/\s+/g, " ")
    .trim();
}
