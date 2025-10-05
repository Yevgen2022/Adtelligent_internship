// Повертає пріоритетно adUnitId -> code -> оригінальний рядок
export function pickAdUnitId(jsonOrText: string): string {
    if (!jsonOrText) return "";
    const raw = jsonOrText.trim();

    // не JSON — вертаємо як є (наприклад "system" або "home-left-adtelligent")
    if (!(raw.startsWith("{") && raw.endsWith("}"))) return raw;

    try {
        const obj = JSON.parse(raw);
        return obj?.adUnitId || obj?.code || jsonOrText;
    } catch {
        // битий JSON — показуємо як є
        return jsonOrText;
    }
}
