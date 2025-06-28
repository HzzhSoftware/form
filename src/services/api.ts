const API_URL = "https://api.kycombinator.com/form";

interface FetchOptions extends RequestInit {}

async function fetchFormAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store', // key change
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error: ${res.status} - ${errorBody}`);
  }

  return res.json();
}

export default fetchFormAPI;