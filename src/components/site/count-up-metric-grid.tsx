"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpMetricGridProps = {
  metrics: readonly { value: string; label: string }[];
  className?: string;
};

function parseMetricValue(value: string) {
  const numericPart = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");

  return {
    target: Number.isNaN(numericPart) ? 0 : numericPart,
    suffix,
  };
}

export function CountUpMetricGrid({ metrics, className }: CountUpMetricGridProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(() => metrics.map(() => 0));

  const parsedMetrics = useMemo(() => metrics.map((metric) => parseMetricValue(metric.value)), [metrics]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(parsedMetrics.map((metric) => Math.round(metric.target * eased)));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [parsedMetrics, visible]);

  return (
    <div ref={ref} className={className ?? "grid gap-5 md:grid-cols-2 xl:grid-cols-4"}>
      {metrics.map((metric, index) => (
        <article
          key={metric.label}
          className="flex h-full min-h-[12rem] flex-col justify-between rounded-[2rem] border border-border/80 bg-card p-8 shadow-[0_24px_54px_-38px_rgba(15,23,42,0.28)]"
        >
          <p className="font-display text-4xl font-extrabold leading-none text-accent md:text-[2.9rem]">
            {animatedValues[index]}
            {parsedMetrics[index]?.suffix}
          </p>
          <p className="mt-6 max-w-[18rem] text-lg leading-relaxed text-muted-foreground">{metric.label}</p>
        </article>
      ))}
    </div>
  );
}
