import { useCallback } from 'react';

export const useQueryParams = () => {
  const setQueryParam = useCallback((key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  }, []);

  const getQueryParam = useCallback((key: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
  }, []);

  const removeQueryParam = useCallback((key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.pushState({}, '', url);
  }, []);

  return {
    setQueryParam,
    getQueryParam,
    removeQueryParam
  };
};

export default useQueryParams;