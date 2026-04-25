"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(value / 30));
    const timer = window.setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplay(value);
        window.clearInterval(timer);
        return;
      }
      setDisplay(current);
    }, 40);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.span ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
      {display}
      {suffix}
    </motion.span>
  );
}
