import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

import { navigation, siteConfig } from "@/data/site-config";

import { FooterNewsletterForm } from "./footer-newsletter-form";
import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="gradient-dark relative mt-20 overflow-hidden pb-8 pt-20 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <SiteLogo light size="md" variant="stacked" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Professional book publishing, academic paper support, secure ebooks, printing, and distribution services
              designed to move authors and institutions forward.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-bold text-accent">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {navigation.slice(0, 9).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block hover:translate-x-1 hover:text-accent">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-bold text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                {siteConfig.location}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                {siteConfig.phone}
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                {siteConfig.email}
              </li>
            </ul>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <Link href="/privacy-policy" className="block hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="block hover:text-accent">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="block hover:text-accent">
                Refund Policy
              </Link>
              <Link href="/shipping-policy" className="block hover:text-accent">
                Shipping Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-bold text-accent">Newsletter</h4>
            <p className="mb-4 text-sm text-white/70">Monthly insights on publishing, research, and printing workflows.</p>
            <FooterNewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Designed for a clean, premium publishing experience.</p>
        </div>
      </div>
    </footer>
  );
}
