import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { getBlogBySlug } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
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

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <section className="py-24">
        <div className="container-custom max-w-4xl">
          <article className="rounded-[2rem] border border-border bg-card p-10 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{post.category}</p>
            <p className="mt-3 text-sm text-muted-foreground">{post.publishDate}</p>
            <div className="prose prose-slate mt-8 max-w-none">
              <p>
                Eagle Leap Publication structures its publishing and printing ecosystem around clarity, credibility,
                and reader-ready execution. This article expands on that approach with practical takeaways for authors,
                researchers, and institutions planning their next release.
              </p>
              <p>
                From ISBN and ISSN workflows to manuscript preparation, discovery, printing quality, and catalogue
                visibility, the goal is always the same: reduce friction while keeping the process professional and
                transparent.
              </p>
              <p>
                As the platform grows, articles like this will connect directly to the CMS-driven blog system so the
                team can publish updated knowledge resources without changing the frontend architecture.
              </p>
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
