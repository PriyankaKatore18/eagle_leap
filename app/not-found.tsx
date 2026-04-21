import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-custom flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Page Not Found</p>
        <h1 className="mt-4 text-4xl font-extrabold text-primary md:text-6xl">The page you requested does not exist.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Let&apos;s take you back to the main publishing routes so you can continue exploring the site.
        </p>
        <Button asChild size="lg" className="mt-8 gradient-accent text-accent-foreground">
          <Link href="/">Back to Home</Link>
        </Button>
      </section>
    </SiteShell>
  );
}
