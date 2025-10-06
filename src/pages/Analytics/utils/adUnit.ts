// I return the original string with priority adUnitId code
export function pickAdUnitId(jsonOrText: string): string {
  if (!jsonOrText) return "";
  const raw = jsonOrText.trim();

  // non-JSON is returned as is (e.g. "system" or "home-left-adtelligent")
  if (!(raw.startsWith("{") && raw.endsWith("}"))) return raw;

  try {
    const obj = JSON.parse(raw);
    return obj?.adUnitId || obj?.code || jsonOrText;
  } catch {
    return jsonOrText;
  }
}
