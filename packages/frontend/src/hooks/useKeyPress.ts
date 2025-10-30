import { useEffect } from "react";

export function useKeyPress(key: string, handler: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== key) return;

      e.preventDefault();
      handler(e);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler]);
}
