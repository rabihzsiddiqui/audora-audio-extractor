import { describe, it, expect } from "vitest";
import { parseTime, formatTime } from "../lib/time";

describe("parseTime", () => {
  it("parses zero", () => {
    expect(parseTime("0:00")).toBe(0);
  });

  it("parses minutes and seconds", () => {
    expect(parseTime("1:30")).toBe(90);
  });

  it("parses large minute values", () => {
    expect(parseTime("10:00")).toBe(600);
  });

  it("parses leading zeros in seconds", () => {
    expect(parseTime("2:05")).toBe(125);
  });

  it("returns NaN for empty string", () => {
    expect(parseTime("")).toBeNaN();
  });

  it("returns NaN for missing colon", () => {
    expect(parseTime("130")).toBeNaN();
  });

  it("returns NaN when seconds >= 60", () => {
    expect(parseTime("1:60")).toBeNaN();
    expect(parseTime("0:99")).toBeNaN();
  });

  it("returns NaN for non-numeric parts", () => {
    expect(parseTime("a:30")).toBeNaN();
    expect(parseTime("1:bc")).toBeNaN();
  });

  it("returns NaN for three-part strings", () => {
    expect(parseTime("1:30:00")).toBeNaN();
  });

  it("handles whitespace", () => {
    expect(parseTime("  2:00  ")).toBe(120);
  });
});

describe("formatTime", () => {
  it("formats zero", () => {
    expect(formatTime(0)).toBe("0:00");
  });

  it("formats seconds only", () => {
    expect(formatTime(45)).toBe("0:45");
  });

  it("formats minutes and seconds", () => {
    expect(formatTime(90)).toBe("1:30");
  });

  it("pads single-digit seconds", () => {
    expect(formatTime(61)).toBe("1:01");
  });

  it("returns 0:00 for NaN", () => {
    expect(formatTime(NaN)).toBe("0:00");
  });

  it("returns 0:00 for negative", () => {
    expect(formatTime(-5)).toBe("0:00");
  });
});
