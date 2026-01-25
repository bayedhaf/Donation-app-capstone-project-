// Simple client for server/edge/client usage

const RAW_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
function resolveUrl(endpoint: string) {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${RAW_BASE}${endpoint}`; // if RAW_BASE is empty, this is relative
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

export async function apiGet<T = any>(endpoint: string): Promise<T> {
  const url = resolveUrl(endpoint);
  const res = await authFetch(url, { cache: "no-store" });
  return handle<T>(res);
}

export async function apiPost<T = any>(endpoint: string, body: any): Promise<T> {
  const url = resolveUrl(endpoint);
  const init: RequestInit = { method: "POST" };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    init.body = body; // browser will set proper multipart headers
  } else {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body ?? {});
  }
  const res = await authFetch(url, init);
  return handle<T>(res);
}

export async function apiPut<T = any>(endpoint: string, body?: any): Promise<T> {
  const url = resolveUrl(endpoint);
  const init: RequestInit = { method: "PUT" };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    init.body = body;
  } else if (body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const res = await authFetch(url, init);
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

async function tryRefreshToken(): Promise<boolean> {
  try {
    const url = resolveUrl("/refresh-token");
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null) as any;
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

async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});
  const token = getAccessTokenFromCookies();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const first = await fetch(url, { ...init, headers });
  if (first.status !== 401) return first;

  // Attempt refresh once and retry
  const refreshed = await tryRefreshToken();
  if (!refreshed) return first;
  const retryHeaders = new Headers(init.headers || {});
  const newToken = getAccessTokenFromCookies();
  if (newToken) retryHeaders.set("Authorization", `Bearer ${newToken}`);
  return fetch(url, { ...init, headers: retryHeaders });
}
