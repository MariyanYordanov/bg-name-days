import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getNameDay,
  getNamesByDate,
  getTodayNames,
  searchNames,
  getAllNameDays,
  transliterate,
} from "../src/index.js";

describe("transliterate", () => {
  it("converts Cyrillic to Latin", () => {
    assert.equal(transliterate("Георги"), "Georgi");
    assert.equal(transliterate("Йордан"), "Yordan");
    assert.equal(transliterate("Щерьо"), "Shteryo");
    assert.equal(transliterate("Юлия"), "Yuliya");
    assert.equal(transliterate("Яна"), "Yana");
  });

  it("converts Latin to Cyrillic", () => {
    assert.equal(transliterate("Georgi"), "Георги");
    assert.equal(transliterate("Yordan"), "Йордан");
    assert.equal(transliterate("Yana"), "Яна");
  });

  it("handles empty and invalid input", () => {
    assert.equal(transliterate(""), "");
    assert.equal(transliterate(null), "");
    assert.equal(transliterate(undefined), "");
  });
});

describe("getNameDay", () => {
  it("finds name day for Cyrillic name", () => {
    const result = getNameDay("Георги");
    assert.notEqual(result, null);
    assert.equal(result.date, "05-06");
    assert.equal(result.holiday, "Гергьовден");
    assert.ok(result.names.includes("Георги"));
  });

  it("finds name day for Latin name", () => {
    const result = getNameDay("Georgi");
    assert.notEqual(result, null);
    assert.equal(result.date, "05-06");
  });

  it("is case-insensitive", () => {
    const result = getNameDay("георги");
    assert.notEqual(result, null);
    assert.equal(result.date, "05-06");
  });

  it("returns null for unknown name", () => {
    assert.equal(getNameDay("Непознато"), null);
  });

  it("returns null for empty input", () => {
    assert.equal(getNameDay(""), null);
    assert.equal(getNameDay(null), null);
  });

  it("finds Васил on 01-01", () => {
    const result = getNameDay("Васил");
    assert.notEqual(result, null);
    assert.equal(result.date, "01-01");
    assert.equal(result.holiday, "Васильовден (Нова година)");
  });

  it("finds Никола on 12-06", () => {
    const result = getNameDay("Никола");
    assert.notEqual(result, null);
    assert.equal(result.date, "12-06");
    assert.equal(result.holiday, "Никулден");
  });
});

describe("getNamesByDate", () => {
  it("returns names for a valid date string", () => {
    const result = getNamesByDate("05-06");
    assert.notEqual(result, null);
    assert.equal(result.holiday, "Гергьовден");
    assert.ok(result.names.includes("Георги"));
  });

  it("returns names for a Date object", () => {
    const date = new Date(2026, 4, 6); // May 6
    const result = getNamesByDate(date);
    assert.notEqual(result, null);
    assert.equal(result.holiday, "Гергьовден");
  });

  it("returns null for unknown date", () => {
    assert.equal(getNamesByDate("13-99"), null);
  });

  it("returns names for Jan 1", () => {
    const result = getNamesByDate("01-01");
    assert.notEqual(result, null);
    assert.ok(result.names.includes("Васил"));
  });
});

describe("getTodayNames", () => {
  it("returns an object or null", () => {
    const result = getTodayNames();
    if (result !== null) {
      assert.ok(typeof result.date === "string");
      assert.ok(typeof result.holiday === "string");
      assert.ok(Array.isArray(result.names));
    }
  });
});

describe("searchNames", () => {
  it("finds names by Cyrillic prefix", () => {
    const results = searchNames("Геор");
    assert.ok(results.length > 0);
    assert.ok(results.some((r) => r.name === "Георги"));
  });

  it("finds names by Latin prefix", () => {
    const results = searchNames("Geo");
    assert.ok(results.length > 0);
    assert.ok(results.some((r) => r.name === "Георги"));
  });

  it("is case-insensitive", () => {
    const results = searchNames("геор");
    assert.ok(results.length > 0);
  });

  it("returns empty array for no match", () => {
    const results = searchNames("xyz123");
    assert.equal(results.length, 0);
  });

  it("returns empty for empty query", () => {
    assert.deepEqual(searchNames(""), []);
    assert.deepEqual(searchNames(null), []);
  });
});

describe("getAllNameDays", () => {
  it("returns a non-empty object", () => {
    const all = getAllNameDays();
    const keys = Object.keys(all);
    assert.ok(keys.length > 50);
  });

  it("each entry has holiday and names", () => {
    const all = getAllNameDays();
    for (const [date, entry] of Object.entries(all)) {
      assert.ok(typeof entry.holiday === "string");
      assert.ok(Array.isArray(entry.names));
      assert.match(date, /^\d{2}-\d{2}$/);
    }
  });

  it("contains 500+ unique names total", () => {
    const all = getAllNameDays();
    const allNames = new Set();
    for (const entry of Object.values(all)) {
      for (const name of entry.names) {
        allNames.add(name);
      }
    }
    assert.ok(allNames.size >= 500, `Expected 500+ unique names, got ${allNames.size}`);
  });
});
