import Image from "next/image";
import Link from "next/link";

import type { PublicationRecord } from "@/data/catalog-data";

import { Button } from "../ui/button";

export function PublicationCard({ item }: { item: PublicationRecord }) {
  return (
    <article className="card-reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card hover-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 29vw, (min-width: 768px) 44vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{item.category}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{item.year}</span>
        </div>
        <div className="mt-4 min-h-[6.75rem]">
          <h3 className="text-xl font-bold leading-[1.08] text-primary">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.author}</p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <Button asChild size="lg" className="min-h-12 min-w-[8.75rem] justify-center gradient-accent text-accent-foreground">
            <Link href={`/publications/${item.slug}`}>View Details</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-12 min-w-[8.75rem] justify-center">
            <Link href={`/publications/${item.slug}#reader`}>View PDF</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
