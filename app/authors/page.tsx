import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { getAuthorInitials } from "@/lib/cms-content";
import { getCmsAuthors } from "@/lib/cms-store";
import { canRenderCmsImageSrc } from "@/lib/cms-media";
import { heroImages } from "@/data/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Authors",
  description:
    "Meet the authors, scholars, and contributors shaping Eagle Leap Publication's books and academic catalogue.",
  path: "/authors",
});

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = (await getCmsAuthors())
    .filter((author) => author.status !== "draft")
    .sort((left, right) => {
      const featuredScore = Number(Boolean(right.featured)) - Number(Boolean(left.featured));
      if (featuredScore !== 0) {
        return featuredScore;
      }
      return left.name.localeCompare(right.name);
    });

  const featuredCount = authors.filter((author) => author.featured).length;
  const designationCount = new Set(authors.map((author) => author.designation)).size;

  return (
    <SiteShell>
      <PageHero
        title="Our Authors"
        subtitle="The people behind our books and publications, spanning commerce, management, agriculture, engineering, and strategic studies."
        breadcrumbs={[{ label: "Authors" }]}
        backgroundSrc={heroImages.homeResearch}
        backgroundAlt="Academic books and authorship collage"
      />

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            centered
            eyebrow="Author Directory"
            title="A connected author roster that updates from the CMS."
            description="Publishers can add or update author profiles in the admin panel, and the public website will reflect those changes here."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Profiles", value: `${authors.length}` },
              { label: "Featured", value: `${featuredCount}` },
              { label: "Disciplines", value: `${designationCount}` },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">{item.label}</p>
                <p className="mt-4 text-4xl font-extrabold text-primary">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {authors.map((author) => (
              <article
                key={author.id}
                className="group flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary text-lg font-extrabold text-white shadow-glow">
                      {canRenderCmsImageSrc(author.image) ? (
                        <Image src={author.image} alt={author.name} fill unoptimized className="object-cover" />
                      ) : (
                        <span className="gradient-brand flex h-full w-full items-center justify-center">
                          {getAuthorInitials(author.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight text-primary">{author.name}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{author.designation}</p>
                    </div>
                  </div>
                  {author.featured ? (
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Featured
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/publications">View Publications</Link>
                  </Button>
                  <Button asChild className="rounded-full gradient-accent text-accent-foreground">
                    <Link href="/publish-my-book">Work With Us</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Become Part of the Catalogue"
        subtitle="Join the Eagle Leap roster and publish your next book or academic contribution with us."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
