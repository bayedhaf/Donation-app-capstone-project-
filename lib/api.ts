

const RAW_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
function resolveUrl(endpoint: string, overrideBase?: string) {
  const base = (overrideBase ?? RAW_BASE).replace(/\/$/, "");
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${base}${endpoint}`; // if base is empty, this is relative
}

async function parseJsonSafe<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T);
  } catch {
    throw new Error(`Invalid JSON response (${res.status} ${res.statusText})`);
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || `HTTP ${res.status}`);
  }
  return parseJsonSafe<T>(res);
}

export async function apiGet<T = unknown>(endpoint: string, opts?: { baseUrl?: string; token?: string; headers?: HeadersInit }): Promise<T> {
  const url = resolveUrl(endpoint, opts?.baseUrl);
  const res = await authFetch(url, { cache: "no-store", headers: opts?.headers }, opts?.token);
  return handle<T>(res);
}

export async function apiPost<T = unknown>(endpoint: string, body: unknown, opts?: { baseUrl?: string; token?: string; headers?: HeadersInit }): Promise<T> {
  const url = resolveUrl(endpoint, opts?.baseUrl);
  const init: RequestInit = { method: "POST", headers: opts?.headers };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    init.body = body; // browser will set proper multipart headers
  } else {
    const hdrs = new Headers(init.headers || {});
    if (!hdrs.has("Content-Type")) hdrs.set("Content-Type", "application/json");
    init.headers = hdrs;
    init.body = JSON.stringify(body ?? {});
  }
  const res = await authFetch(url, init, opts?.token);
  return handle<T>(res);
}

export async function apiPut<T = unknown>(endpoint: string, body?: unknown, opts?: { baseUrl?: string; token?: string; headers?: HeadersInit }): Promise<T> {
  const url = resolveUrl(endpoint, opts?.baseUrl);
  const init: RequestInit = { method: "PUT", headers: opts?.headers };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    init.body = body;
  } else if (body !== undefined) {
    const hdrs = new Headers(init.headers || {});
    if (!hdrs.has("Content-Type")) hdrs.set("Content-Type", "application/json");
    init.headers = hdrs;
    init.body = JSON.stringify(body);
  }
  const res = await authFetch(url, init, opts?.token);
  return handle<T>(res);
}

// --- Auth helpers with cookie storage ---
function getAccessTokenFromCookies(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )accessToken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function setAccessTokenCookie(token: string) {
  if (typeof document === "undefined") return;
  // Session cookie; customize max-age if needed
  document.cookie = `accessToken=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
}

async function tryRefreshToken(baseUrl?: string): Promise<boolean> {
  try {
    const url = resolveUrl("/refresh-token", baseUrl);
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return false;
  const data = await res.json().catch(() => null) as unknown as { accessToken?: string; token?: string } | null;
    const newToken: string | undefined = data?.accessToken || data?.token;
    if (newToken) {
      setAccessTokenCookie(newToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function authFetch(url: string, init: RequestInit = {}, explicitToken?: string, baseUrlForRefresh?: string): Promise<Response> {
  const headers = new Headers(init.headers || {});
  const token = explicitToken ?? getAccessTokenFromCookies();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const first = await fetch(url, { ...init, headers });
  if (first.status !== 401) return first;

  // Attempt refresh once and retry
  const refreshed = await tryRefreshToken(baseUrlForRefresh);
  if (!refreshed) return first;
  const retryHeaders = new Headers(init.headers || {});
  const newToken = getAccessTokenFromCookies();
  if (newToken) retryHeaders.set("Authorization", `Bearer ${newToken}`);
  return fetch(url, { ...init, headers: retryHeaders });
}

// --- Explicit, self-managed client factory ---
export type ApiClientOptions = {
  baseUrl?: string; // e.g. https://capstone-api-dwzu.onrender.com
  getToken?: () => string | null; // user-supplied token getter
  onUnauthorizedRefresh?: () => Promise<string | null>; // optional: handle refresh and return new token
  defaultHeaders?: HeadersInit;
};

export function createApiClient(opts: ApiClientOptions) {
  const { baseUrl, getToken, onUnauthorizedRefresh, defaultHeaders } = opts;
  async function doFetch(endpoint: string, init: RequestInit = {}) {
    const url = resolveUrl(endpoint, baseUrl);
    const headers = new Headers(defaultHeaders || {});
    const initHeaders = new Headers(init.headers || {});
    initHeaders.forEach((v, k) => headers.set(k, v));
    const token = getToken?.() ?? null;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const first = await fetch(url, { ...init, headers });
    if (first.status !== 401 || !onUnauthorizedRefresh) return first;
    const newToken = await onUnauthorizedRefresh();
    if (!newToken) return first;
    const retryHeaders = new Headers(defaultHeaders || {});
    initHeaders.forEach((v, k) => retryHeaders.set(k, v));
    retryHeaders.set("Authorization", `Bearer ${newToken}`);
    return fetch(url, { ...init, headers: retryHeaders });
  }

  return {
    async get<T = any>(endpoint: string): Promise<T> {
      const res = await doFetch(endpoint, { cache: "no-store" });
      return handle<T>(res);
    },
    async post<T = any>(endpoint: string, body: any): Promise<T> {
      const init: RequestInit = { method: "POST" };
      if (typeof FormData !== "undefined" && body instanceof FormData) {
        init.body = body;
      } else {
        init.headers = { "Content-Type": "application/json" };
        init.body = JSON.stringify(body ?? {});
      }
      const res = await doFetch(endpoint, init);
      return handle<T>(res);
    },
    async put<T = any>(endpoint: string, body?: any): Promise<T> {
      const init: RequestInit = { method: "PUT" };
      if (typeof FormData !== "undefined" && body instanceof FormData) {
        init.body = body;
      } else if (body !== undefined) {
        init.headers = { "Content-Type": "application/json" };
        init.body = JSON.stringify(body);
      }
      const res = await doFetch(endpoint, init);
      return handle<T>(res);
    },
  };
}
