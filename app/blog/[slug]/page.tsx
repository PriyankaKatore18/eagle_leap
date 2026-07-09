import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { resolveCmsMediaSrcOrFallback } from "@/lib/cms-media";
import { getCmsBlogBySlug } from "@/lib/cms-store";
import { createMetadata } from "@/lib/seo";

function formatBlogDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(parsed);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getCmsBlogBySlug(params.slug);

  if (!post || post.status !== "published") {
    return createMetadata({
      title: "Blog Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${params.slug}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getCmsBlogBySlug(params.slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <SiteShell>
      <PageHero title={post.title} subtitle={post.excerpt} breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section className="py-24">
        <div className="container-custom max-w-5xl">
          <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
            <div className="relative aspect-[16/9] bg-secondary">
              <Image
                src={resolveCmsMediaSrcOrFallback(post.featuredImage)}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]">
                <span className="text-accent">{post.category}</span>
                {post.featured ? <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Featured</span> : null}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {formatBlogDate(post.publishAt)} · {post.author}
              </p>
              <div className="mt-8 space-y-5 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                {post.content}
              </div>
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Need help applying this insight?"
        subtitle="Talk with our team about publishing, journal, printing, or distribution requirements."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Publish Your Book"
        secondaryHref="/publish-my-book"
      />
    </SiteShell>
  );
}
