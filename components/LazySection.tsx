"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function LazySection({ children }: { children: ReactNode }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before entering the screen to minimize visual delay
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[50px] w-full">
      {inView ? children : null}
    </div>
  );
}
