import { AuthorTrustShowcase } from "@/components/site/author-trust-showcase";
import { CtaBand } from "@/components/site/cta-band";
import { FeaturedBooksCarousel } from "@/components/site/featured-books-carousel";
import { HomeCounterBar } from "@/components/site/home-counter-bar";
import { HomeHeroCarousel } from "@/components/site/home-hero-carousel";
import { PublishingJourneyShowcase } from "@/components/site/publishing-journey-showcase";
import { PublishingServicesShowcase } from "@/components/site/publishing-services-showcase";
import { SiteShell } from "@/components/site/site-shell";
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel";
import { getCmsContent } from "@/lib/cms-store";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Publish smarter, grow faster, and reach wider with Eagle Leap Publication's book publishing, paper publication, printing, journal, and store ecosystem.",
  path: "/",
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getCmsContent();
  const books = content.products.filter((product) => product.status !== "draft" && product.status !== "archived");
  const testimonials = content.testimonials.filter((testimonial) => testimonial.status === "published" && testimonial.home !== false);

  return (
    <SiteShell>
      <HomeHeroCarousel />

      <HomeCounterBar />

      <AuthorTrustShowcase />

      <FeaturedBooksCarousel books={books} />

      <PublishingServicesShowcase />

      <PublishingJourneyShowcase />

      <TestimonialsCarousel testimonials={testimonials} />

      <CtaBand
        title="Ready to Publish Your Work?"
        subtitle="Take the next step in your publishing journey with us."
        primaryLabel="Publish Your Book"
        primaryHref="/publish-my-book"
        secondaryLabel="Submit Paper"
        secondaryHref="/call-for-paper"
      />
    </SiteShell>
  );
}
