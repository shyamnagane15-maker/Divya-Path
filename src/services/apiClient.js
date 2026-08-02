/**
 * apiClient.js
 * -----------------------------------------------------------------------
 * Every service in /services currently calls mockRequest() instead of
 * fetch(). This is the ONLY file that should change when a real backend
 * (Express/Node) is ready — swap mockRequest's internals for a real
 * fetch() against API_BASE_URL and every page/component keeps working
 * unmodified, since they only depend on the returned Promise shape.
 * -----------------------------------------------------------------------
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const DEFAULT_DELAY = 450;

/**
 * Simulates a network round-trip and returns a deep-cloned payload so
 * consumers never accidentally mutate shared mock state.
 */
export function mockRequest(payload, { delay = DEFAULT_DELAY, failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error("Simulated network failure"));
        return;
      }
      const data = typeof payload === "function" ? payload() : payload;
      resolve(JSON.parse(JSON.stringify(data)));
    }, delay);
  });
}

/**
 * Real backend call, ready to use as soon as endpoints exist.
 * Usage later: return apiFetch('/live-monitoring/summary')
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}
