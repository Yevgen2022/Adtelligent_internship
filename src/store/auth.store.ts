// store/auth.schema.ts

import { nanoid } from "nanoid";
import { create } from "zustand";
import type { Credentials, User } from "../types/auth.type";

type AuthState = {
  currentUser: User | null;
  users: User[];
  hydrateFromStorage: () => void;
  register: (data: Omit<User, "id">) => Promise<void> | void;
  login: (c: Credentials) => Promise<void> | void;
  logout: () => void;
};

const USERS_KEY = "app.users";
const SESSION_KEY = "app.session";

export const useAuth = create<AuthState>((set, get) => ({
  currentUser: null,
  users: [],
  hydrateFromStorage: () => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    set({ users, currentUser: session });
  },
  register: ({ name, email, password }) => {
    const { users } = get();
    if (users.some((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser: User = { id: nanoid(), name, email, password };
    const nextUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    set({ users: nextUsers, currentUser: newUser });
  },
  login: ({ email, password }) => {
    const { users } = get();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) throw new Error("Invalid email or password");
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    set({ currentUser: user });
  },
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    set({ currentUser: null });
  },
}));
