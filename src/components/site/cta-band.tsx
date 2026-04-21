import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

type CtaBandProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBandProps) {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="gradient-brand relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-elegant md:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
          </div>
          <div className="relative">
            <FileText className="mx-auto h-14 w-14 text-accent" />
            <h2 className="mt-6 text-3xl font-extrabold md:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-accent px-8 text-accent-foreground shadow-glow">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 px-8 text-white hover:bg-white hover:text-primary">
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
