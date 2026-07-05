"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Building2, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";

type CounterItem = {
  value: string;
  label: string;
  icon: typeof BookOpen;
};

const counterItems: CounterItem[] = [
  { value: "500+", label: "Books Published", icon: BookOpen },
  { value: "1000+", label: "Happy Authors", icon: Users },
  { value: "100+", label: "Institutions", icon: Building2 },
  { value: "PAN India", label: "Distribution", icon: MapPin },
];

function parseCounterValue(value: string) {
  const numericPart = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  const hasNumber = !Number.isNaN(numericPart);

  return {
    target: hasNumber ? numericPart : 0,
    suffix: hasNumber ? value.replace(/[\d]/g, "") : "",
    staticValue: hasNumber ? "" : value,
  };
}

export function HomeCounterBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(() => counterItems.map(() => 0));

  const parsedItems = useMemo(() => counterItems.map((item) => parseCounterValue(item.value)), []);

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

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(parsedItems.map((item) => Math.round(item.target * eased)));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [parsedItems, visible]);

  return (
    <section ref={ref} className="border-y border-border bg-white">
      <div className="container-custom grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {counterItems.map((item, index) => {
          const Icon = item.icon;
          const parsed = parsedItems[index];

          return (
            <div key={item.label} className="flex items-center gap-4 px-5 py-5 sm:px-6 md:px-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent shadow-sm">
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[1.65rem] font-extrabold leading-none text-primary sm:text-[1.9rem]">
                  {parsed.staticValue ? parsed.staticValue : animatedValues[index]}
                  {parsed.suffix}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
