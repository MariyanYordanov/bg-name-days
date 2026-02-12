import { nameDays } from "./data/name-days.js";
import { transliterate } from "./transliterate.js";
import { nameMatches, formatDate } from "./search.js";

/**
 * Find the name day for a given name.
 * Supports Cyrillic and Latin input.
 * @param {string} name
 * @returns {{ date: string, holiday: string, names: string[] } | null}
 */
export function getNameDay(name) {
  if (typeof name !== "string" || name.trim().length === 0) return null;

  for (const [date, entry] of Object.entries(nameDays)) {
    for (const n of entry.names) {
      if (nameMatches(n, name) && n.toLowerCase() === name.toLowerCase()) {
        return { date, holiday: entry.holiday, names: [...entry.names] };
      }
      // Try Latin input: transliterate to Cyrillic and compare
      if (n.toLowerCase() === transliterate(name).toLowerCase()) {
        return { date, holiday: entry.holiday, names: [...entry.names] };
      }
    }
  }
  return null;
}

/**
 * Get all names celebrating on a given date.
 * @param {string | Date} date - "MM-DD" string or Date object.
 * @returns {{ date: string, holiday: string, names: string[] } | null}
 */
export function getNamesByDate(date) {
  const key = date instanceof Date ? formatDate(date) : date;
  const entry = nameDays[key];
  if (!entry) return null;
  return { date: key, holiday: entry.holiday, names: [...entry.names] };
}

/**
 * Get the names celebrating today.
 * @returns {{ date: string, holiday: string, names: string[] } | null}
 */
export function getTodayNames() {
  return getNamesByDate(new Date());
}

/**
 * Search names by prefix query. Supports Cyrillic and Latin.
 * @param {string} query
 * @returns {Array<{ name: string, date: string, holiday: string }>}
 */
export function searchNames(query) {
  if (typeof query !== "string" || query.trim().length === 0) return [];

  const results = [];
  const seen = new Set();

  for (const [date, entry] of Object.entries(nameDays)) {
    for (const name of entry.names) {
      if (nameMatches(name, query) && !seen.has(name)) {
        seen.add(name);
        results.push({ name, date, holiday: entry.holiday });
      }
    }
  }

  return results;
}

/**
 * Get all name days data.
 * @returns {Record<string, { holiday: string, names: string[] }>}
 */
export function getAllNameDays() {
  const copy = {};
  for (const [date, entry] of Object.entries(nameDays)) {
    copy[date] = { holiday: entry.holiday, names: [...entry.names] };
  }
  return copy;
}

export { transliterate };
