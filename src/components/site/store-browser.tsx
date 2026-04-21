"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { storeCategories, storeProducts } from "@/data/catalog-data";

import { ProductCard } from "./product-card";

export function StoreBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("All");
  const [sort, setSort] = useState("Latest");
  const deferredQuery = useDeferredValue(query);

  const authors = useMemo(() => ["All", ...Array.from(new Set(storeProducts.map((item) => item.author)))], []);
  const [author, setAuthor] = useState("All");

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const items = storeProducts.filter((item) => {
      const categoryMatch =
        category === "All" ||
        item.category === category ||
        (category === "Ebooks" && (item.format === "Ebook" || item.format === "Both")) ||
        (category === "Hard Copy Books" && (item.format === "Hard Copy" || item.format === "Both")) ||
        (category === "New Arrivals" && item.newArrival) ||
        (category === "Featured Titles" && item.featured);
      const formatMatch = format === "All" || item.format === format || (format === "Hard Copy" && item.format === "Both");
      const authorMatch = author === "All" || item.author === author;
      const queryMatch =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.author.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized);

      return categoryMatch && formatMatch && authorMatch && queryMatch;
    });

    if (sort === "Popular") {
      return items.sort((left, right) => Number(Boolean(right.popular)) - Number(Boolean(left.popular)));
    }

    if (sort === "Price: Low to High") {
      return items.sort((left, right) => Number(left.price.replace(/\D/g, "")) - Number(right.price.replace(/\D/g, "")));
    }

    if (sort === "Price: High to Low") {
      return items.sort((left, right) => Number(right.price.replace(/\D/g, "")) - Number(left.price.replace(/\D/g, "")));
    }

    return items.sort((left, right) => Number(right.year) - Number(left.year));
  }, [author, category, deferredQuery, format, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Search</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search title, author, keyword..."
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Category</label>
          <div className="flex flex-wrap gap-2">
            {storeCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  category === item ? "gradient-accent text-white" : "bg-secondary text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Format</label>
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {["All", "Ebook", "Hard Copy", "Both"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Author</label>
          <select
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {authors.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Sort By</label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {["Latest", "Popular", "Price: Low to High", "Price: High to Low"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </aside>

      <div className="space-y-8">
        <div className="flex items-center justify-between rounded-3xl border border-border bg-card px-6 py-4 shadow-card">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-primary">{filtered.length}</span> titles
          </p>
          <p className="text-sm text-muted-foreground">Secure ebook access and hard copy delivery supported</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
