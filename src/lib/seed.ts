const USERS_KEY = "app.users";

export async function seedUsersOnce() {
  if (localStorage.getItem(USERS_KEY)) return;
  const mod = await import("../data/users.json");
  localStorage.setItem(USERS_KEY, JSON.stringify(mod.default));
}
