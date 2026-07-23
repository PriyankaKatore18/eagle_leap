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
    <section className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="gradient-brand relative overflow-hidden rounded-3xl p-8 text-center text-white shadow-elegant sm:p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
          </div>
          <div className="relative">
            <FileText className="mx-auto h-12 w-12 text-accent sm:h-14 sm:w-14" />
            <h2 className="mt-6 text-[2rem] font-extrabold leading-[1.15] sm:text-3xl md:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="gradient-accent w-full px-8 text-accent-foreground shadow-glow sm:w-auto">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button asChild size="lg" variant="outline" className="w-full border-white/30 bg-white/5 px-8 text-white hover:bg-white hover:text-primary sm:w-auto">
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
