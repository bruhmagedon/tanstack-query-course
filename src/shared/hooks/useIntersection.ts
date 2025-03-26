import { useRef, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });
      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect]
  );
}
