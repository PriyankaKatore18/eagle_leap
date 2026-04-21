"use client";

import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";

type ProtectedReaderProps = {
  title: string;
  viewerLabel: string;
  pages: string[];
};

export function ProtectedReader({ title, viewerLabel, pages }: ProtectedReaderProps) {
  useEffect(() => {
    const blockContextMenu = (event: Event) => event.preventDefault();
    const blockKeys = (event: KeyboardEvent) => {
      if (
        event.key === "PrintScreen" ||
        ((event.ctrlKey || event.metaKey) && ["p", "s", "u", "c"].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return (
    <div className="rounded-3xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Secure Ebook Viewer</p>
          <h2 className="mt-2 text-2xl font-extrabold text-primary">{title}</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Watermarked access for {viewerLabel}
        </div>
      </div>
      <div className="space-y-6 bg-secondary/60 p-6">
        {pages.map((page, index) => (
          <div key={page} className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="pointer-events-none absolute inset-0 flex rotate-[-18deg] items-center justify-center text-3xl font-extrabold uppercase tracking-[0.5em] text-primary/5">
              {viewerLabel}
            </div>
            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Page {index + 1}</p>
              <p className="max-w-3xl select-none leading-8 text-foreground/85">{page}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
