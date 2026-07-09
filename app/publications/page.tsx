import Link from "next/link";
import Image from "next/image";
import nextDynamic from "next/dynamic";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { getAuthorInitials } from "@/lib/cms-content";
import { getCmsFeaturedAuthors, getCmsPublications } from "@/lib/cms-store";
import { canRenderCmsImageSrc } from "@/lib/cms-media";
import { createMetadata } from "@/lib/seo";

const PublicationsBrowser = nextDynamic(
  () => import("@/components/site/publications-browser").then((module) => module.PublicationsBrowser),
  {
    ssr: false,
    loading: () => <AsyncSectionPlaceholder variant="browser" />,
  },
);

export const metadata = createMetadata({
  title: "Publications",
  description: "Explore books, papers, chapters, and edited volumes with filters, detail pages, secure viewer areas, and author recognition blocks.",
  path: "/publications",
});

export const dynamic = "force-dynamic";

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
  };
}) {
  const publications = await getCmsPublications();
  const authors = await getCmsFeaturedAuthors(3);

  return (
    <SiteShell>
      <PageHero
        title="Our Publications"
        subtitle="Explore our published books, research papers, and academic work. Discover the contributions of our authors and researchers."
        breadcrumbs={[{ label: "Publications" }]}
      />

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Publication Library"
            title="Books, papers, and edited volumes arranged for fast discovery."
            description="Use the filters to explore edited books, papers, and year-wise releases while keeping the grid ready for future admin-managed updates."
          />
          <div className="mt-12">
            <PublicationsBrowser items={publications} initialCategory={searchParams.category ?? "All"} />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Authors"
            title="Recognizing the people behind the publications."
            description="Explore the same author roster that powers the connected admin and store experiences."
            centered
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {authors.map((author) => (
              <div key={author.id} className="card-reveal rounded-3xl bg-card p-8 text-center shadow-card">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-secondary text-2xl font-extrabold text-white">
                  {canRenderCmsImageSrc(author.image) ? (
                    <Image src={author.image} alt={author.name} fill unoptimized className="object-cover" />
                  ) : (
                    <span className="gradient-brand flex h-full w-full items-center justify-center">
                      {getAuthorInitials(author.name)}
                    </span>
                  )}
                </div>
                <p className="mt-5 text-xl font-bold text-primary">{author.name}</p>
                <p className="mt-2 text-muted-foreground">{author.designation}</p>
                <Link href="/authors" className="mt-5 inline-flex text-sm font-semibold text-accent">
                  View Author Directory
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Become a Published Author"
        subtitle="Join our growing community of authors and researchers."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
