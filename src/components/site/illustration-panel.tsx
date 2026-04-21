import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

type IllustrationPanelProps = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description?: string;
  items?: string[];
  dark?: boolean;
  className?: string;
};

export function IllustrationPanel({
  src,
  alt,
  eyebrow,
  title,
  description,
  items = [],
  dark = false,
  className,
}: IllustrationPanelProps) {
  return (
    <div
      className={cn(
        "card-reveal flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 shadow-elegant md:p-10",
        dark ? "border-white/10 gradient-brand text-white" : "border-border bg-card",
        className,
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h3 className={cn("mt-4 text-3xl font-extrabold leading-[1.08]", dark ? "text-white" : "text-primary")}>{title}</h3>
      {description ? <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-white/80" : "text-muted-foreground")}>{description}</p> : null}

      <div
        className={cn(
          "relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.75rem] border sm:aspect-[5/4] lg:aspect-[4/3]",
          dark ? "border-white/10 bg-white/5" : "border-border bg-secondary/80",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center transition duration-700 hover:scale-[1.03]"
        />
      </div>

      {items.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-4 text-sm",
                dark ? "border-white/10 bg-white/5 text-white/85" : "border-border bg-secondary text-primary",
              )}
            >
              <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
