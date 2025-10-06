// Кодує посилання в base64url (безпечне для URL)
export function linkToId(link: string) {
  return btoa(link).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Декодує base64url назад у справжній link
export function idToLink(id: string) {
  const b64 = id.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return atob(b64 + pad);
}
