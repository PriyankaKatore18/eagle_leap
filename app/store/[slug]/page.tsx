import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { StoreProductActions } from "@/components/site/store-product-actions";
import { resolveCmsMediaSrc } from "@/lib/cms-media";
import { getCmsProductBySlug } from "@/lib/cms-store";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getCmsProductBySlug(params.slug);

  if (!product) {
    return createMetadata({
      title: "Store Item Not Found",
      description: "The requested product could not be found.",
      path: `/store/${params.slug}`,
    });
  }

  return createMetadata({
    title: product.title,
    description: product.description,
    path: `/store/${product.slug}`,
  });
}

export const dynamic = "force-dynamic";

export default async function StoreDetailPage({ params }: { params: { slug: string } }) {
  const product = await getCmsProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const isEbook = product.format === "Ebook" || product.format === "Both";
  const isHardCopy = product.format === "Hard Copy" || product.format === "Both";

  return (
    <SiteShell>
      <PageHero
        title={product.title}
        subtitle={product.description}
        breadcrumbs={[{ label: "Store", href: "/store" }, { label: product.title }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-elegant">
            <Image
              src={resolveCmsMediaSrc(product.cover)}
              alt={product.title}
              priority
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full object-cover"
            />
          </div>
          <div className="card-reveal rounded-[2rem] border border-border bg-card p-10 shadow-card">
            <SectionHeading eyebrow={product.category} title={product.title} description={product.description} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Author", product.author],
                ["Format", product.format],
                ["Price", product.price],
                ["ISBN", product.isbn],
                ["Publication Year", product.year],
                ["Stock", product.stock],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-secondary p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                  <p className="mt-2 text-lg font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <StoreProductActions productSlug={product.slug} isEbook={isEbook} isHardCopy={isHardCopy} />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <div className="card-reveal rounded-3xl bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Secure Ebook Reader" title="Protection-first viewer design" />
            <div className="mt-6 space-y-3 text-muted-foreground">
              <p>• Disable right click and common print/save shortcuts</p>
              <p>• Watermark pages with user identity</p>
              <p>• No download or print button in the UI</p>
              <p>• Access only after login or purchase in the full backend flow</p>
            </div>
          </div>
          <div className="card-reveal rounded-3xl bg-card p-10 shadow-card">
            <SectionHeading eyebrow="Hard Copy Delivery" title="Purchase-friendly fulfilment flow" />
            <div className="mt-6 space-y-3 text-muted-foreground">
              <p>• Shipping details and estimated delivery block</p>
              <p>• Stock status visibility for each title</p>
              <p>• Bulk and institutional order readiness</p>
              <p>• Order tracking will connect during backend implementation</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need help with this title?"
        subtitle="Our team can help with purchases, distribution, academic orders, and secure ebook access questions."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Shop More Books"
        secondaryHref="/store"
      />
    </SiteShell>
  );
}
