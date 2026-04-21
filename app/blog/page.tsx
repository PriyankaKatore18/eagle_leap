import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { blogPosts } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "Latest insights and publishing knowledge on ISBN, ISSN, research writing, academic publishing, and printing systems.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        title="Latest Insights & Publishing Knowledge"
        subtitle="Explore expert insights on book publishing, ISBN & ISSN processes, research writing, and printing solutions."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Knowledge Hub" title="Publishing insight cards designed for SEO and education." centered />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{post.category}</p>
                <h2 className="mt-4 text-2xl font-bold text-primary">{post.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground">{post.publishDate}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-accent">
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
