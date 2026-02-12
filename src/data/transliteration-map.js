/**
 * Bulgarian official transliteration (Закон за транслитерацията, 2009).
 * Cyrillic to Latin mapping.
 */
export const cyrToLat = {
  "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D",
  "Е": "E", "Ж": "Zh", "З": "Z", "И": "I", "Й": "Y",
  "К": "K", "Л": "L", "М": "M", "Н": "N", "О": "O",
  "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U",
  "Ф": "F", "Х": "H", "Ц": "Ts", "Ч": "Ch", "Ш": "Sh",
  "Щ": "Sht", "Ъ": "A", "Ь": "Y", "Ю": "Yu", "Я": "Ya",
  "а": "a", "б": "b", "в": "v", "г": "g", "д": "d",
  "е": "e", "ж": "zh", "з": "z", "и": "i", "й": "y",
  "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
  "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
  "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh",
  "щ": "sht", "ъ": "a", "ь": "y", "ю": "yu", "я": "ya"
};

/**
 * Latin to Cyrillic mapping (reverse).
 * Multi-character sequences must come first for correct matching.
 */
export const latToCyr = {
  "Sht": "Щ", "sht": "щ",
  "Zh": "Ж", "zh": "ж",
  "Ts": "Ц", "ts": "ц",
  "Ch": "Ч", "ch": "ч",
  "Sh": "Ш", "sh": "ш",
  "Yu": "Ю", "yu": "ю",
  "Ya": "Я", "ya": "я",
  "A": "А", "a": "а",
  "B": "Б", "b": "б",
  "V": "В", "v": "в",
  "G": "Г", "g": "г",
  "D": "Д", "d": "д",
  "E": "Е", "e": "е",
  "Z": "З", "z": "з",
  "I": "И", "i": "и",
  "Y": "Й", "y": "й",
  "K": "К", "k": "к",
  "L": "Л", "l": "л",
  "M": "М", "m": "м",
  "N": "Н", "n": "н",
  "O": "О", "o": "о",
  "P": "П", "p": "п",
  "R": "Р", "r": "р",
  "S": "С", "s": "с",
  "T": "Т", "t": "т",
  "U": "У", "u": "у",
  "F": "Ф", "f": "ф",
  "H": "Х", "h": "х"
};

/**
 * Sorted Latin keys for reverse transliteration (longest first).
 */
export const latKeys = Object.keys(latToCyr).sort((a, b) => b.length - a.length);
