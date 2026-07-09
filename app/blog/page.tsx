import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { resolveCmsMediaSrcOrFallback } from "@/lib/cms-media";
import { getCmsBlogs } from "@/lib/cms-store";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description: "Latest insights and publishing knowledge on ISBN, ISSN, research writing, academic publishing, and printing systems.",
  path: "/blog",
});

export const dynamic = "force-dynamic";

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

export default async function BlogPage() {
  const posts = (await getCmsBlogs())
    .filter((post) => post.status === "published")
    .sort((left, right) => Date.parse(right.publishAt) - Date.parse(left.publishAt));

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
          {posts.length > 0 ? (
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <Image
                      src={resolveCmsMediaSrcOrFallback(post.featuredImage)}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 42vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]">
                      <span className="text-accent">{post.category}</span>
                      {post.featured ? <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Featured</span> : null}
                    </div>
                    <h2 className="mt-4 text-2xl font-bold leading-tight text-primary">{post.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground">{formatBlogDate(post.publishAt)}</p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-primary">{post.author}</span>
                      <Link href={`/blog/${post.slug}`} className="inline-flex font-semibold text-accent">
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[2rem] border border-border bg-card p-10 text-center text-muted-foreground shadow-card">
              No blog posts are published yet.
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
