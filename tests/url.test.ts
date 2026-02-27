import { describe, it, expect } from "vitest";
import { isDirectMediaUrl, validateUrl } from "../lib/url";

describe("isDirectMediaUrl", () => {
  it("returns true for .mp4 URL", () => {
    expect(isDirectMediaUrl("https://example.com/video.mp4")).toBe(true);
  });

  it("returns true for .webm URL", () => {
    expect(isDirectMediaUrl("https://cdn.example.com/files/clip.webm")).toBe(true);
  });

  it("returns true for .mov URL", () => {
    expect(isDirectMediaUrl("https://example.com/recording.MOV")).toBe(true);
  });

  it("returns true for .mkv URL", () => {
    expect(isDirectMediaUrl("https://example.com/film.mkv")).toBe(true);
  });

  it("returns false for HTML page URL", () => {
    expect(isDirectMediaUrl("https://example.com/watch?v=abc")).toBe(false);
  });

  it("returns false for image URL", () => {
    expect(isDirectMediaUrl("https://example.com/image.png")).toBe(false);
  });

  it("returns false for invalid URL", () => {
    expect(isDirectMediaUrl("not-a-url")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isDirectMediaUrl("")).toBe(false);
  });

  it("handles URL with query params", () => {
    expect(isDirectMediaUrl("https://example.com/video.mp4?token=abc")).toBe(true);
  });
});

describe("validateUrl", () => {
  it("returns null for valid https URL", () => {
    expect(validateUrl("https://example.com/video.mp4")).toBeNull();
  });

  it("returns null for valid http URL", () => {
    expect(validateUrl("http://example.com/video.mp4")).toBeNull();
  });

  it("returns error for empty string", () => {
    expect(validateUrl("")).toBeTruthy();
  });

  it("returns error for non-URL string", () => {
    expect(validateUrl("not a url")).toBeTruthy();
  });

  it("returns error for ftp URL", () => {
    expect(validateUrl("ftp://example.com/video.mp4")).toBeTruthy();
  });

  it("returns error for URL with no protocol", () => {
    expect(validateUrl("example.com/video.mp4")).toBeTruthy();
  });

  it("returns error for whitespace-only string", () => {
    expect(validateUrl("   ")).toBeTruthy();
  });
});
