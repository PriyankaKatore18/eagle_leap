"use client";

import { useMemo, useState } from "react";

import { publicationCategories, type PublicationRecord } from "@/data/catalog-data";

import { PublicationCard } from "./publication-card";

export function PublicationsBrowser({
  items,
  initialCategory = "All",
}: {
  items: PublicationRecord[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [year, setYear] = useState("All");

  const categoryOptions = useMemo(() => Array.from(new Set([...publicationCategories, ...items.map((item) => item.category)])), [items]);
  const years = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.year)))], [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const yearMatch = year === "All" || item.year === year;
      return categoryMatch && yearMatch;
    });
  }, [category, items, year]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-border bg-card p-5 shadow-card">
        {categoryOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              category === item ? "gradient-accent text-white" : "bg-secondary text-primary hover:bg-accent/10 hover:text-accent"
            }`}
          >
            {item}
          </button>
        ))}
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="ml-auto h-11 rounded-full border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {years.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {filtered.map((item) => (
          <PublicationCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
