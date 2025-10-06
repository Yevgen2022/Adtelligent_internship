import { API_BASE } from "../config";

export class ApiError extends Error {
  declare status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function join(base: string, path: string) {
  const b = base.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`;
}

function toQuery(params?: Record<string, unknown>) {
  if (!params) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    sp.append(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const isAbs = /^https?:\/\//i.test(path);
  const url = isAbs ? path : join(API_BASE, path);

  const headers = new Headers(init.headers);

  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    credentials: "include", // для cookie-сесій
    ...init,
    headers,
  });

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const text = await res.text();
      if (text) msg = text.slice(0, 1000);
    } catch {}
    throw new ApiError(res.status, msg);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get<T>(path: string, params?: Record<string, unknown>) {
    return apiFetch<T>(`${path}${toQuery(params)}`);
  },
  post<T>(path: string, body?: unknown) {
    return apiFetch<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  put<T>(path: string, body?: unknown) {
    return apiFetch<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  patch<T>(path: string, body?: unknown) {
    return apiFetch<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  delete<T>(path: string) {
    return apiFetch<T>(path, { method: "DELETE" });
  },
};
