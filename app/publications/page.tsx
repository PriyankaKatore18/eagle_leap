import nextDynamic from "next/dynamic";

import { AsyncSectionPlaceholder } from "@/components/site/async-section-placeholder";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { getCmsPublications } from "@/lib/cms-store";
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
