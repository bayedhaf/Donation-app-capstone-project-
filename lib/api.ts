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
  const res = await fetch(url, { cache: "no-store" });
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
  const res = await fetch(url, init);
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
  const res = await fetch(url, init);
  return handle<T>(res);
}
