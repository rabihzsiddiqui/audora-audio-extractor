import { describe, it, expect } from "vitest";
import { validateTrim, isTrimValid } from "../lib/validators";

describe("validateTrim", () => {
  it("returns no errors for empty fields", () => {
    expect(validateTrim({ startTime: "", duration: "" })).toEqual({});
  });

  it("returns no errors for valid startTime", () => {
    expect(validateTrim({ startTime: "1:30", duration: "" })).toEqual({});
  });

  it("returns no errors for valid duration", () => {
    expect(validateTrim({ startTime: "", duration: "2:00" })).toEqual({});
  });

  it("returns no errors for both valid fields", () => {
    expect(validateTrim({ startTime: "0:30", duration: "1:00" })).toEqual({});
  });

  it("returns error for invalid startTime format", () => {
    const result = validateTrim({ startTime: "abc", duration: "" });
    expect(result.startTime).toBeTruthy();
  });

  it("returns error for invalid duration format", () => {
    const result = validateTrim({ startTime: "", duration: "xyz" });
    expect(result.duration).toBeTruthy();
  });

  it("returns error for startTime with bad seconds", () => {
    const result = validateTrim({ startTime: "1:70", duration: "" });
    expect(result.startTime).toBeTruthy();
  });

  it("returns error for zero duration", () => {
    const result = validateTrim({ startTime: "", duration: "0:00" });
    expect(result.duration).toBeTruthy();
  });

  it("returns errors for both invalid fields", () => {
    const result = validateTrim({ startTime: "bad", duration: "also-bad" });
    expect(result.startTime).toBeTruthy();
    expect(result.duration).toBeTruthy();
  });
});

describe("isTrimValid", () => {
  it("returns true when both fields empty", () => {
    expect(isTrimValid({ startTime: "", duration: "" })).toBe(true);
  });

  it("returns true for valid fields", () => {
    expect(isTrimValid({ startTime: "0:10", duration: "1:30" })).toBe(true);
  });

  it("returns false for invalid startTime", () => {
    expect(isTrimValid({ startTime: "not-valid", duration: "" })).toBe(false);
  });

  it("returns false for invalid duration", () => {
    expect(isTrimValid({ startTime: "", duration: "0:00" })).toBe(false);
  });
});
