import { useEffect, useCallback, EffectCallback, DependencyList } from 'react';

export default function useDebounce(
  effect: EffectCallback,
  deps: DependencyList = [],
  delay: number = 0
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
