import { cyrToLat, latToCyr, latKeys } from "./data/transliteration-map.js";

const CYR_REGEX = /[\u0400-\u04FF]/;

/**
 * Detects if text contains Cyrillic characters.
 */
function isCyrillic(text) {
  return CYR_REGEX.test(text);
}

/**
 * Transliterates Cyrillic text to Latin.
 */
function cyrillicToLatin(text) {
  let result = "";
  for (const char of text) {
    result += cyrToLat[char] ?? char;
  }
  return result;
}

/**
 * Transliterates Latin text to Cyrillic.
 */
function latinToCyrillic(text) {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (const key of latKeys) {
      if (text.startsWith(key, i)) {
        result += latToCyr[key];
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  return result;
}

/**
 * Auto-detect direction and transliterate.
 * Cyrillic input → Latin output, Latin input → Cyrillic output.
 * @param {string} text
 * @returns {string}
 */
export function transliterate(text) {
  if (typeof text !== "string" || text.length === 0) return "";
  return isCyrillic(text) ? cyrillicToLatin(text) : latinToCyrillic(text);
}
