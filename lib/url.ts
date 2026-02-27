const DIRECT_MEDIA_EXTENSIONS = [
  ".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv", ".3gp",
  ".m4v", ".flv", ".wmv",
];

/**
 * Returns true if the URL appears to point to a direct media file
 * based on its path extension heuristic.
 */
export function isDirectMediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.toLowerCase();
    return DIRECT_MEDIA_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  } catch {
    return false;
  }
}

/**
 * Validates a URL string. Returns null if valid, or an error message.
 */
export function validateUrl(url: string): string | null {
  if (!url.trim()) return "Please enter a URL";

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return "URL must start with http:// or https://";
    }
    return null;
  } catch {
    return "Please enter a valid URL";
  }
}

/**
 * Attempts to fetch a URL as a Blob for processing.
 * Returns { blob, filename } on success, or throws with a user-friendly message.
 */
export async function fetchMediaBlob(
  url: string
): Promise<{ blob: Blob; filename: string }> {
  let response: Response;

  try {
    response = await fetch(url, { mode: "cors" });
  } catch {
    throw new Error(
      "This link cannot be fetched by your browser. This is usually a CORS restriction. Download the video and use Upload instead."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Server returned ${response.status}. Download the video and use Upload instead.`
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (
    !contentType.startsWith("video/") &&
    !contentType.startsWith("audio/") &&
    !contentType.startsWith("application/octet-stream")
  ) {
    throw new Error(
      "The URL does not point to a media file. Try a direct .mp4 or .webm link."
    );
  }

  const blob = await response.blob();

  // Try to get a filename from the URL
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/");
    const last = segments[segments.length - 1];
    if (last && last.includes(".")) {
      return { blob, filename: last };
    }
  } catch {
    // ignore
  }

  return { blob, filename: "video.mp4" };
}
