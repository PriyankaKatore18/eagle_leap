"use client";

import { useMemo, useState } from "react";

import { publicationCategories, publications } from "@/data/catalog-data";

import { PublicationCard } from "./publication-card";

export function PublicationsBrowser({ initialCategory = "All" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [year, setYear] = useState("All");

  const years = useMemo(() => ["All", ...Array.from(new Set(publications.map((item) => item.year)))], []);

  const filtered = useMemo(() => {
    return publications.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const yearMatch = year === "All" || item.year === year;
      return categoryMatch && yearMatch;
    });
  }, [category, year]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-border bg-card p-5 shadow-card">
        {publicationCategories.map((item) => (
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
