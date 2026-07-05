"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navigation, siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerNavigation = navigation;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_14px_38px_-24px_rgba(15,23,42,0.35)]">
      <div className="container-custom flex h-[4.5rem] items-center gap-4 lg:h-20 lg:gap-6">
        <SiteLogo variant="horizontal" size="xs" priority />

        <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
          {headerNavigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium",
                  active ? "bg-primary/5 text-accent" : "text-slate-700 hover:bg-slate-100 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button asChild className="hidden rounded-full bg-accent px-5 text-sm text-white shadow-soft hover:bg-accent/90 md:inline-flex lg:px-6 lg:text-base">
            <a href={siteConfig.bookStoreUrl} className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Book Store
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-slate-200 p-2.5 text-primary hover:bg-slate-50 xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white xl:hidden">
          <nav className="container-custom flex flex-col gap-2 py-4">
            {headerNavigation.map((item) => (
              <div key={item.href} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-primary"
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <Button asChild className="mt-2 w-full rounded-full bg-accent text-white hover:bg-accent/90">
              <a href={siteConfig.bookStoreUrl} onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Book Store
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
