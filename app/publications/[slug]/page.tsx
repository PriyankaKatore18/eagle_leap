import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { authorProfiles, getPublicationBySlug } from "@/data/catalog-data";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) {
    return createMetadata({
      title: "Publication Not Found",
      description: "The requested publication could not be found.",
      path: `/publications/${params.slug}`,
    });
  }

  return createMetadata({
    title: publication.title,
    description: publication.description,
    path: `/publications/${publication.slug}`,
  });
}

export default function PublicationDetailPage({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) {
    notFound();
  }

  const pdfPreviewSrc = publication.pdfUrl ?? "/previews/publication-preview.svg";
  const certificatePreviewSrc = publication.certificateUrl ?? "/previews/publication-certificate.svg";

  return (
    <SiteShell>
      <PageHero
        title={publication.title}
        subtitle={publication.description}
        breadcrumbs={[{ label: "Publications", href: "/publications" }, { label: publication.title }]}
      />

      <section className="py-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-secondary shadow-elegant">
            <Image
              src={publication.cover}
              alt={publication.title}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full object-cover"
            />
          </div>
          <div className="card-reveal rounded-[2rem] border border-border bg-card p-10 shadow-card">
            <SectionHeading eyebrow={publication.publicationType} title={publication.title} description={publication.description} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Author", publication.author],
                ["Publication Type", publication.publicationType],
                ["ISBN", publication.isbn],
                ["Publication Date", publication.publicationDate],
                ["Edition", publication.edition],
                ["Category", publication.category],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-secondary p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                  <p className="mt-2 text-lg font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="gradient-accent text-accent-foreground">
                <Link href="#reader">View PDF</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#certificate">View Certificate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="reader" className="bg-secondary py-24">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <div className="card-reveal overflow-hidden rounded-3xl bg-card p-8 shadow-card">
            <SectionHeading eyebrow="PDF Viewer" title="Publication preview and reading access" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-secondary">
              <Image src={pdfPreviewSrc} alt={`${publication.title} preview`} width={1200} height={1600} className="h-auto w-full" />
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild className="gradient-accent text-accent-foreground">
                <Link href={pdfPreviewSrc} target="_blank">Open Preview</Link>
              </Button>
            </div>
          </div>
          <div id="certificate" className="card-reveal overflow-hidden rounded-3xl bg-card p-8 shadow-card">
            <SectionHeading eyebrow="Certificate Viewer" title="Recognition and certificate preview" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-secondary">
              <Image src={certificatePreviewSrc} alt={`${publication.title} certificate`} width={1200} height={900} className="h-auto w-full" />
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href={certificatePreviewSrc} target="_blank">Open Certificate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Authors" title="Related author recognition" centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {authorProfiles.map((author) => (
              <div key={author.name} className="card-reveal rounded-3xl border border-border bg-card p-8 text-center shadow-card">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full gradient-brand text-2xl font-extrabold text-white">
                  {author.initials}
                </div>
                <p className="mt-5 text-xl font-bold text-primary">{author.name}</p>
                <p className="mt-2 text-muted-foreground">{author.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Become a Published Author"
        subtitle="Join our growing community of authors and researchers with your next book, paper, or edited contribution."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
