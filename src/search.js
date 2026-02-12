import { transliterate } from "./transliterate.js";

const CYR_REGEX = /[\u0400-\u04FF]/;

/**
 * Normalizes a string for comparison: lowercase and trimmed.
 */
export function normalize(str) {
  return str.toLowerCase().trim();
}

/**
 * Checks if a name matches a query (prefix or exact match).
 * Supports both Cyrillic and Latin input.
 * @param {string} name - The name to check (Cyrillic).
 * @param {string} query - The search query.
 * @returns {boolean}
 */
export function nameMatches(name, query) {
  const normalizedName = normalize(name);
  const normalizedQuery = normalize(query);

  // Direct match
  if (normalizedName.startsWith(normalizedQuery)) return true;

  // If query is Latin, transliterate and match against Cyrillic
  if (!CYR_REGEX.test(query)) {
    const cyrQuery = normalize(transliterate(query));
    if (normalizedName.startsWith(cyrQuery)) return true;
  }

  // If query is Cyrillic, transliterate name to Latin and match
  if (CYR_REGEX.test(query)) {
    const latName = normalize(transliterate(name));
    if (latName.startsWith(normalizedQuery)) return true;
  }

  return false;
}

/**
 * Formats a date string from a Date object to "MM-DD".
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}
