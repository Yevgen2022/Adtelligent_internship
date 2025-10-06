// export const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3500";

export const API_ORIGIN =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/+$/,
    "",
  ) ?? "";

export const API_BASE = `${API_ORIGIN}`;

// export const API_PREFIX = "/api";
// export const API_BASE = `${API_ORIGIN}${API_PREFIX}`;
