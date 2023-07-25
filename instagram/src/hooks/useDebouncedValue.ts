import { useState, useEffect } from "react";

export default function useDebouncedValue<T = any>(
  value: T,
  delay: number = 500
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      // useEffect가 다시 실행되면 항상 return 부분이 실행 됨
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
