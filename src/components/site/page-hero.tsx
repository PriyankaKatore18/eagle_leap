import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundSrc?: string | StaticImageData;
  backgroundAlt?: string;
  backgroundImageClassName?: string;
};

export function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundSrc,
  backgroundAlt = "",
  backgroundImageClassName,
}: PageHeroProps) {
  return (
    <section className="gradient-dark relative overflow-hidden pb-20 pt-32">
      {backgroundSrc ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            priority
            sizes="100vw"
            className={cn("object-cover object-center opacity-25", backgroundImageClassName)}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,57,0.94)_0%,rgba(10,31,82,0.9)_44%,rgba(17,46,110,0.72)_100%)]" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
      </div>
      <div className="container-custom relative z-10 section-reveal">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/80">
          <Link href="/" className="flex items-center gap-1 hover:text-accent">
            <Home className="h-4 w-4" /> Home
          </Link>
          {breadcrumbs.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 opacity-60" />
              {item.href ? (
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-accent">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.18] text-white md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-3xl text-lg text-white/80">{subtitle}</p> : null}
      </div>
    </section>
  );
}
