import dynamic from "next/dynamic";
import Link from "next/link";
import { Shield, ShoppingBag, Sparkles, Truck } from "lucide-react";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { IllustrationPanel } from "@/components/site/illustration-panel";
import { PageHero } from "@/components/site/page-hero";
import { ProductCard } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { storeCategoryHighlights, storeProducts } from "@/data/catalog-data";
import { heroImages } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

const StoreBrowser = dynamic(() => import("@/components/site/store-browser").then((module) => module.StoreBrowser), {
  ssr: false,
  loading: () => <AsyncSectionPlaceholder variant="browser" />,
});

export const metadata = createMetadata({
  title: "Store",
  description: "Browse academic, research, and general books in secure ebook or hard copy formats with search, filters, and protected reader flows.",
  path: "/store",
});

export default function StorePage() {
  return (
    <SiteShell>
      <PageHero
        title="Explore Our Book Store"
        subtitle="Browse academic, research, and general books available in digital and printed formats."
        breadcrumbs={[{ label: "Store" }]}
        backgroundSrc={heroImages.storeHero}
        backgroundAlt="Books displayed for the Eagle Leap store"
      />

      <section className="py-24">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Storefront Experience"
              title="A premium bookstore layout with secure ebook and hard copy flows."
              description="This opening section now follows the document more closely with dedicated store actions, a stronger visual anchor, and clearer browsing intent."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-accent text-accent-foreground">
                <Link href="#store-browser">Shop All Books</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#formats">Browse Ebooks</Link>
              </Button>
            </div>
          </div>
          <IllustrationPanel
            src={heroImages.storeFeature}
            alt="Modern bookstore-style browsing space"
            eyebrow="Book-Themed Visual"
            title="Professional shelf-style browsing with a more premium retail feel."
            description="A premium bookstore image gives the store page more credibility and makes product browsing feel polished and trustworthy."
            items={[
              "Featured books and category-led discovery",
              "Secure ebook reader access",
              "Hard copy stock and delivery support",
              "New arrivals and popular title visibility",
            ]}
            dark
          />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Browse by Category" title="Category-led discovery for faster product browsing." centered />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {storeCategoryHighlights.map((item) => (
              <div key={item.title} className="rounded-3xl bg-card p-8 shadow-card">
                <p className="text-xl font-bold text-primary">{item.title}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Featured Books"
            title="A clean premium storefront with format-aware discovery."
            description="Category cards, filters, search, new arrivals, and popular titles all live inside a single structured browsing experience."
            centered
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {storeProducts.filter((item) => item.featured).slice(0, 3).map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="formats" className="bg-secondary py-24">
        <div className="container-custom grid items-stretch gap-6 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Available Formats" title="Ebooks" description="Digital reading format with secure online viewing, no direct download, and protected reader access after login or purchase." />
            <div className="mt-8 space-y-3 text-muted-foreground">
              <p>• Only online viewing access</p>
              <p>• No download button</p>
              <p>• Watermarked access</p>
              <p>• Session-based secure reader flow</p>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Available Formats" title="Hard Copy Books" description="Printed editions with purchase flow, stock visibility, shipping support, and estimated delivery handling." />
            <div className="mt-8 space-y-3 text-muted-foreground">
              <p>• Buy now and add to cart actions</p>
              <p>• Stock availability support</p>
              <p>• Delivery and shipping details</p>
              <p>• Bulk and institutional ordering ready</p>
            </div>
          </div>
        </div>
      </section>

      <section id="store-browser" className="py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Search and Filter" title="Find titles by category, format, author, and popularity." />
          <div className="mt-12">
            <StoreBrowser />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="New Arrivals" title="Recently added books surfaced for quick discovery." centered />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {storeProducts.filter((item) => item.newArrival).map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Popular Titles" title="Trust-building books with stronger visibility and demand." centered />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {storeProducts.filter((item) => item.popular).map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Why Buy From Us" title="Trust-focused reasons to purchase through Eagle Leap." centered />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: ShoppingBag, text: "Wide range of books" },
              { icon: Sparkles, text: "Academic and research-focused titles" },
              { icon: Shield, text: "Secure ebook access" },
              { icon: Truck, text: "Quality printed books with delivery support" },
            ].map((item) => (
              <div key={item.text} className="rounded-3xl bg-card p-8 shadow-card">
                <item.icon className="h-10 w-10 text-accent" />
                <p className="mt-5 text-lg font-semibold text-primary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Discover Knowledge in Every Format"
        subtitle="Read online or order printed copies from our growing collection of books."
        primaryLabel="Shop Now"
        primaryHref="/store"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SiteShell>
  );
}
