/** True only for https: absolute URLs (rejects javascript:/data:/mailto:/http:). */
export function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
