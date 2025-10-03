// // src/store/auth.store.ts
// import { create } from "zustand";
//
// export type Credentials = { email: string; password: string };
// export type User = { id: string; email: string; name: string };
//
// type AuthState = {
//     currentUser: User | null;
//     hydrate: () => Promise<void>;
//     login: (c: Credentials) => Promise<void>;
//     logout: () => Promise<void>;
//     setUser: (user: User | null) => void;
// };
//
// async function postJson<T>(url: string, body: unknown): Promise<T> {
//     const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(body),
//     });
//     const data = await res.json().catch(() => ({}));
//     if (!res.ok) {
//         const msg = (data as any)?.message ?? "Request failed";
//         throw new Error(msg);
//     }
//     return data as T;
// }
//
// export const useAuth = create<AuthState>((set) => ({
//     currentUser: null,
//
//     hydrate: async () => {
//         try {
//             const res = await fetch("/api/whoami", { credentials: "include" });
//             if (!res.ok) return set({ currentUser: null });
//             const data = (await res.json()) as { user: User | null };
//             set({ currentUser: data.user ?? null });
//         } catch {
//             set({ currentUser: null });
//         }
//     },
//
//     login: async ({ email, password }) => {
//         const data = await postJson<{ ok: boolean; user: User; expiresAt: string }>(
//             "/api/login",
//             { email, password },
//         );
//         set({ currentUser: data.user });
//     },
//
//     logout: async () => {
//         try {
//             await fetch("/api/logout", { method: "POST", credentials: "include" });
//         } finally {
//             set({ currentUser: null });
//         }
//     },
//
//     setUser: (user) => set({ currentUser: user }), // <-- реалізація
// }));

// src/store/auth.store.ts
import { create } from "zustand";

export type Credentials = { email: string; password: string };
export type RegisterDto = { name: string; email: string; password: string };
export type User = { id: string; email: string; name: string };

type AuthState = {
    currentUser: User | null;
    hydrate: () => Promise<void>;
    login: (c: Credentials) => Promise<void>;
    register: (d: RegisterDto) => Promise<void>;        // <-- додано
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // критично для cookie
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg = (data as any)?.message ?? "Request failed";
        throw new Error(msg);
    }
    return data as T;
}

export const useAuth = create<AuthState>((set) => ({
    currentUser: null,

    hydrate: async () => {
        try {
            const res = await fetch("/api/whoami", { credentials: "include" });
            if (!res.ok) return set({ currentUser: null });
            const data = (await res.json()) as { user: User | null };
            set({ currentUser: data.user ?? null });
        } catch {
            set({ currentUser: null });
        }
    },

    login: async ({ email, password }) => {
        const data = await postJson<{ ok: boolean; user: User; expiresAt: string }>(
            "/api/login",
            { email, password }
        );
        set({ currentUser: data.user });
    },

    // 1) реєструємось
    // 2) одразу логуємось тими самими email+password (бек ставить cookie)
    register: async ({ name, email, password }) => {
        await postJson<{ ok: boolean }>(
            "/api/register",
            { name, email, password }
        );
        const loginResp = await postJson<{ ok: boolean; user: User; expiresAt: string }>(
            "/api/login",
            { email, password }
        );
        set({ currentUser: loginResp.user });
    },

    logout: async () => {
        try {
            await fetch("/api/logout", { method: "POST", credentials: "include" });
        } finally {
            set({ currentUser: null });
        }
    },

    setUser: (user) => set({ currentUser: user }),
}));
