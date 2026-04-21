import { notFound } from "next/navigation";

import { ProtectedReader } from "@/components/site/protected-reader";
import { getProductBySlug } from "@/data/catalog-data";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { productId: string } }) {
  const product = getProductBySlug(params.productId);

  if (!product) {
    return createMetadata({
      title: "Reader Not Found",
      description: "The requested ebook reader could not be found.",
      path: `/ebook-reader/${params.productId}`,
    });
  }

  return createMetadata({
    title: `${product.title} Reader`,
    description: `Protected ebook reader view for ${product.title}.`,
    path: `/ebook-reader/${product.slug}`,
  });
}

export default function EbookReaderPage({ params }: { params: { productId: string } }) {
  const product = getProductBySlug(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-secondary px-4 py-10">
      <div className="container-custom">
        <ProtectedReader
          title={product.title}
          viewerLabel="demo.user@eagleleap.in"
          pages={[
            `${product.title} opens in a protected reader layout designed for view-only access. Download actions are intentionally absent, common right-click behavior is blocked, and watermarking identifies the active viewer session.`,
            `This preview illustrates how Eagle Leap Publication can present academic and research-led ebooks with stronger access control, session-based reading, and a cleaner premium experience for buyers, authors, and institutions.`,
            `During backend implementation, this reader will connect to purchased access, JWT-backed sessions, watermark settings, and media delivery rules defined in the ecommerce and ebook access modules.`,
          ]}
        />
      </div>
    </div>
  );
}
