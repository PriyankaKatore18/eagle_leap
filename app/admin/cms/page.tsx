import { AdminCmsPage } from "@/components/site/admin/admin-cms-page";
import { getCmsContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function AdminCmsRoute() {
  const content = await getCmsContent();

  return <AdminCmsPage initialContent={content} />;
}
