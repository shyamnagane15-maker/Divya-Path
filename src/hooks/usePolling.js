import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Polls an async fetcher on an interval. Works identically once
 * fetchFn is swapped from a mock service call to a real fetch() call.
 *
 * @param {() => Promise<any>} fetchFn
 * @param {{ interval?: number, enabled?: boolean }} options
 */
export function usePolling(fetchFn, { interval = 6000, enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;

  const refetch = useCallback(async () => {
    try {
      const result = await fetchRef.current();
      setData(result);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let timer;

    const run = async () => {
      try {
        const result = await fetchRef.current();
        if (!alive) return;
        setData(result);
        setError(null);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
      if (alive) timer = setTimeout(run, interval);
    };

    run();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [interval, enabled]);

  return { data, error, loading, refetch };
}
