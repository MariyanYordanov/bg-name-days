# bg-name-days

Bulgarian name days calendar library. Pure JavaScript, zero dependencies. 500+ names with variants, diminutives, and Latin transliteration.

## Installation

```bash
npm install bg-name-days
```

## Usage

```js
import {
  getNameDay,
  getNamesByDate,
  getTodayNames,
  searchNames,
  getAllNameDays,
  transliterate
} from 'bg-name-days';
```

### Find name day by name

```js
getNameDay("Георги");
// { date: "05-06", holiday: "Гергьовден", names: ["Георги", "Георгина", ...] }

getNameDay("Georgi"); // Latin input works too
// { date: "05-06", holiday: "Гергьовден", names: [...] }

getNameDay("Непознато");
// null
```

### Get names by date

```js
getNamesByDate("05-06");
// { date: "05-06", holiday: "Гергьовден", names: ["Георги", "Георгина", ...] }

getNamesByDate(new Date(2026, 0, 1)); // Date object
// { date: "01-01", holiday: "Васильовден (Нова година)", names: ["Васил", ...] }
```

### Get today's name day

```js
getTodayNames();
// { date: "02-12", holiday: "...", names: [...] } or null
```

### Search names

```js
searchNames("Геор");
// [{ name: "Георги", date: "05-06", holiday: "Гергьовден" }, ...]

searchNames("Geo"); // Latin prefix search
// [{ name: "Георги", date: "05-06", holiday: "Гергьовден" }, ...]
```

### Transliterate

```js
transliterate("Георги");  // "Georgi"
transliterate("Yordan");  // "Йордан"
transliterate("Щерьо");   // "Shteryo"
```

### Get all name days

```js
const all = getAllNameDays();
// { "01-01": { holiday: "Васильовден (Нова година)", names: [...] }, ... }
```

## API

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `getNameDay(name)` | `string` | `object \| null` | Find name day by name (Cyrillic or Latin) |
| `getNamesByDate(date)` | `string \| Date` | `object \| null` | Get names for a specific date |
| `getTodayNames()` | - | `object \| null` | Get today's celebrating names |
| `searchNames(query)` | `string` | `array` | Search names by prefix |
| `getAllNameDays()` | - | `object` | Get the full dataset |
| `transliterate(text)` | `string` | `string` | Auto-detect and transliterate (CYR<->LAT) |

## Transliteration

Follows the official Bulgarian transliteration law (2009):

| А | Б | В | Г | Д | Е | Ж | З | И | Й | К | Л | М | Н | О |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A | B | V | G | D | E | Zh | Z | I | Y | K | L | M | N | O |

| П | Р | С | Т | У | Ф | Х | Ц | Ч | Ш | Щ | Ъ | Ь | Ю | Я |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P | R | S | T | U | F | H | Ts | Ch | Sh | Sht | A | Y | Yu | Ya |

## License

MIT
