"use client";

import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  Database,
  FileText,
  ImageIcon,
  LayoutTemplate,
  Newspaper,
  MessageSquareQuote,
  Plus,
  RotateCcw,
  Save,
  Search,
  ShoppingBag,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";

import { publicationCategories, type ProductRecord, type PublicationRecord } from "@/data/catalog-data";
import {
  createAuthorRecordId,
  createBlogRecordId,
  createRecordId,
  ensureAuthorRecord,
  ensureBlogRecord,
  ensureProductRecord,
  ensurePublicationRecord,
  ensureTestimonialRecord,
  slugify,
  type AuthorRecord,
  type BlogRecord,
  type CmsContent,
  type TestimonialRecord,
} from "@/lib/cms-content";
import { cmsMediaOptions, resolveCmsMediaSrc } from "@/lib/cms-media";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";

const productFormats = ["Ebook", "Hard Copy", "Both"] as const;
const productStatusOptions: NonNullable<ProductRecord["status"]>[] = ["active", "draft", "out_of_stock", "archived"];
const publicationTypeOptions = ["Book", "ISBN Paper", "Edited Book"] as const;
const publicationCategoryOptions = publicationCategories.filter((item) => item !== "All") as PublicationRecord["category"][];
const authorStatusOptions: AuthorRecord["status"][] = ["published", "draft"];
const blogStatusOptions: BlogRecord["status"][] = ["published", "draft", "review", "scheduled"];
const testimonialStatusOptions: TestimonialRecord["status"][] = ["published", "draft", "archived"];
const testimonialRatingOptions = ["1", "2", "3", "4", "5"] as const;

type AdminCmsPageProps = {
  initialContent: CmsContent;
  storageLabel: string;
};

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type SelectFieldProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

type ToggleFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

type ImagePickerFieldProps = {
  id: string;
  label: string;
  value: string;
  uploading: boolean;
  onChange: (value: string) => void;
  onUpload: (file: File) => void;
  placeholder?: string;
};

type RecordShellProps = {
  active: boolean;
  title: string;
  description: string;
  badges: string[];
  onSelect: () => void;
  onDelete: () => void;
};

function createEmptyProduct(): ProductRecord {
  return {
    id: "",
    slug: "",
    title: "",
    author: "",
    category: "Academic Books",
    format: "Both",
    price: "INR 0",
    stock: "In Stock",
    isbn: "",
    year: new Date().getFullYear().toString(),
    description: "",
    cover: "asset:book-1",
    featured: false,
    newArrival: false,
    popular: false,
    status: "active",
  };
}

function createEmptyPublication(): PublicationRecord {
  return {
    id: "",
    slug: "",
    title: "",
    author: "",
    year: new Date().getFullYear().toString(),
    edition: "First Edition",
    publicationType: "Book",
    category: "Books",
    isbn: "",
    publicationDate: "",
    description: "",
    cover: "asset:book-1",
    featured: false,
    pdfUrl: "",
    certificateUrl: "",
  };
}

function createDefaultAuthorImage(name: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || "Author")}`;
}

function createEmptyAuthor(): AuthorRecord {
  return {
    id: "",
    slug: "",
    name: "",
    designation: "Author",
    bio: "",
    image: createDefaultAuthorImage("Author"),
    website: "",
    featured: false,
    status: "published",
  };
}

function createEmptyTestimonial(): TestimonialRecord {
  return {
    id: "",
    slug: "",
    name: "",
    designation: "Author",
    review: "",
    rating: 5,
    home: true,
    packages: true,
    about: true,
    status: "published",
  };
}

function createEmptyBlog(): BlogRecord {
  return {
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "/banners/home-hero-publishing-ai.png",
    author: "Editorial Team",
    category: "Publishing",
    publishAt: new Date().toISOString().slice(0, 10),
    featured: true,
    status: "published",
  };
}

function formatCmsTimestamp(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(parsed);
}

function TextField({ id, label, value, onChange, placeholder }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function SelectField<T extends string>({ id, label, value, options, onChange }: SelectFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-primary">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function ImagePickerField({ id, label, value, uploading, onChange, onUpload, placeholder }: ImagePickerFieldProps) {
  const previewSrc = value ? resolveCmsMediaSrc(value) : "";

  return (
    <div className="space-y-3 md:col-span-2">
      <div className="grid gap-4 rounded-2xl border border-border bg-secondary p-4 md:grid-cols-[8rem_minmax(0,1fr)]">
        <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
          {previewSrc ? (
            <img src={previewSrc} alt={`${label} preview`} className="h-full w-full object-contain p-2" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 space-y-3">
          <TextField id={id} label={label} value={value} onChange={onChange} placeholder={placeholder ?? "/uploads/cms/image.jpg"} />
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor={`${id}-upload`}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            <input
              id={`${id}-upload`}
              type="file"
              accept="image/*"
              disabled={uploading}
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onUpload(file);
                }
                event.target.value = "";
              }}
            />
            <span className="text-xs text-muted-foreground">JPG, PNG, WEBP, GIF, SVG, or AVIF</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordShell({ active, title, description, badges, onSelect, onDelete }: RecordShellProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-3 rounded-3xl border bg-card p-4 transition-colors",
        active ? "border-primary/35 bg-primary/5" : "border-border hover:border-primary/20 hover:bg-secondary/60",
      )}
    >
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
        <h3 className="truncate text-base font-bold text-primary">{title || "Untitled record"}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description || "No details yet"}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="max-w-full truncate">
              {badge}
            </Badge>
          ))}
        </div>
      </button>
      <Button type="button" variant="ghost" size="icon" className="shrink-0 text-destructive hover:text-destructive" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </article>
  );
}

export function AdminCmsPage({ initialContent, storageLabel }: AdminCmsPageProps) {
  const router = useRouter();
  const [savedContent, setSavedContent] = useState(initialContent);
  const [content, setContent] = useState(initialContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [uploadingImageFor, setUploadingImageFor] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [selectedProductId, setSelectedProductId] = useState(initialContent.products[0]?.id ?? "new-product");
  const [selectedPublicationId, setSelectedPublicationId] = useState(initialContent.publications[0]?.id ?? "new-publication");
  const [selectedAuthorId, setSelectedAuthorId] = useState(initialContent.authors[0]?.id ?? "new-author");
  const [selectedBlogId, setSelectedBlogId] = useState(initialContent.blogs[0]?.id ?? "new-blog");
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(initialContent.testimonials[0]?.id ?? "new-testimonial");

  const [productDraft, setProductDraft] = useState<ProductRecord>(initialContent.products[0] ?? createEmptyProduct());
  const [publicationDraft, setPublicationDraft] = useState<PublicationRecord>(initialContent.publications[0] ?? createEmptyPublication());
  const [authorDraft, setAuthorDraft] = useState<AuthorRecord>(initialContent.authors[0] ?? createEmptyAuthor());
  const [blogDraft, setBlogDraft] = useState<BlogRecord>(initialContent.blogs[0] ?? createEmptyBlog());
  const [testimonialDraft, setTestimonialDraft] = useState<TestimonialRecord>(initialContent.testimonials[0] ?? createEmptyTestimonial());

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.products;
    return content.products.filter((item) => `${item.title} ${item.author} ${item.category}`.toLowerCase().includes(query));
  }, [content.products, search]);

  const filteredPublications = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.publications;
    return content.publications.filter((item) => `${item.title} ${item.author} ${item.category}`.toLowerCase().includes(query));
  }, [content.publications, search]);

  const filteredAuthors = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.authors;
    return content.authors.filter((item) => `${item.name} ${item.designation}`.toLowerCase().includes(query));
  }, [content.authors, search]);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.blogs;
    return content.blogs.filter((item) => `${item.title} ${item.author} ${item.category}`.toLowerCase().includes(query));
  }, [content.blogs, search]);

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return content.testimonials;
    return content.testimonials.filter((item) => `${item.name} ${item.designation} ${item.review}`.toLowerCase().includes(query));
  }, [content.testimonials, search]);

  const stats = [
    { label: "Books", value: content.products.length, icon: ShoppingBag },
    { label: "Publications", value: content.publications.length, icon: BookOpen },
    { label: "Authors", value: content.authors.length, icon: UserRound },
    { label: "Blogs", value: content.blogs.length, icon: Newspaper },
    { label: "Testimonials", value: content.testimonials.length, icon: MessageSquareQuote },
  ];

  const resetToSavedState = () => {
    setContent(savedContent);
    setHasUnsavedChanges(false);
    setStatusMessage("Local edits reset to the last MySQL saved state.");
    loadProductDraft(savedContent.products[0]);
    loadPublicationDraft(savedContent.publications[0]);
    loadAuthorDraft(savedContent.authors[0]);
    loadBlogDraft(savedContent.blogs[0]);
    loadTestimonialDraft(savedContent.testimonials[0]);
  };

  const loadProductDraft = (product?: ProductRecord) => {
    setSelectedProductId(product?.id ?? "new-product");
    setProductDraft(product ? { ...product } : createEmptyProduct());
  };

  const loadPublicationDraft = (publication?: PublicationRecord) => {
    setSelectedPublicationId(publication?.id ?? "new-publication");
    setPublicationDraft(publication ? { ...publication } : createEmptyPublication());
  };

  const loadAuthorDraft = (author?: AuthorRecord) => {
    setSelectedAuthorId(author?.id ?? "new-author");
    setAuthorDraft(author ? { ...author } : createEmptyAuthor());
  };

  const loadBlogDraft = (blog?: BlogRecord) => {
    setSelectedBlogId(blog?.id ?? "new-blog");
    setBlogDraft(blog ? { ...blog } : createEmptyBlog());
  };

  const loadTestimonialDraft = (testimonial?: TestimonialRecord) => {
    setSelectedTestimonialId(testimonial?.id ?? "new-testimonial");
    setTestimonialDraft(testimonial ? { ...testimonial } : createEmptyTestimonial());
  };

  const markPrepared = (message: string) => {
    setHasUnsavedChanges(true);
    setStatusMessage(message);
  };

  const uploadImageFile = async (file: File, folder: string, key: string, onUploaded: (url: string) => void) => {
    if (!file.type.startsWith("image/")) {
      setStatusMessage("Please upload an image file.");
      return;
    }

    setUploadingImageFor(key);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string; url?: string };

      if (!response.ok || !payload.url) {
        setStatusMessage(payload.message ?? "Image upload failed.");
        return;
      }

      onUploaded(payload.url);
      markPrepared(`Uploaded image: ${payload.url}`);
    } catch {
      setStatusMessage("Image upload failed because the request could not complete.");
    } finally {
      setUploadingImageFor(null);
    }
  };

  const applyProductDraft = () => {
    const normalized = ensureProductRecord({
      ...productDraft,
      id: productDraft.id || createRecordId("product"),
      slug: slugify(productDraft.slug || productDraft.title),
    });

    setContent((current) => ({
      ...current,
      products: current.products.some((item) => item.id === normalized.id)
        ? current.products.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current.products],
    }));
    loadProductDraft(normalized);
    markPrepared(`Prepared book changes for "${normalized.title || "Untitled book"}".`);
  };

  const applyPublicationDraft = () => {
    const normalized = ensurePublicationRecord({
      ...publicationDraft,
      id: publicationDraft.id || createRecordId("publication"),
      slug: slugify(publicationDraft.slug || publicationDraft.title),
      pdfUrl: publicationDraft.pdfUrl?.trim() || undefined,
      certificateUrl: publicationDraft.certificateUrl?.trim() || undefined,
    });

    setContent((current) => ({
      ...current,
      publications: current.publications.some((item) => item.id === normalized.id)
        ? current.publications.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current.publications],
    }));
    loadPublicationDraft(normalized);
    markPrepared(`Prepared publication changes for "${normalized.title || "Untitled publication"}".`);
  };

  const applyAuthorDraft = () => {
    const normalized = ensureAuthorRecord({
      ...authorDraft,
      id: authorDraft.id || createAuthorRecordId(),
      slug: slugify(authorDraft.slug || authorDraft.name),
      image: authorDraft.image || createDefaultAuthorImage(authorDraft.name),
      website: authorDraft.website?.trim() || undefined,
    });

    setContent((current) => ({
      ...current,
      authors: current.authors.some((item) => item.id === normalized.id)
        ? current.authors.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current.authors],
    }));
    loadAuthorDraft(normalized);
    markPrepared(`Prepared author changes for "${normalized.name || "Untitled author"}".`);
  };

  const applyBlogDraft = () => {
    const normalized = ensureBlogRecord({
      ...blogDraft,
      id: blogDraft.id || createBlogRecordId(),
      slug: slugify(blogDraft.slug || blogDraft.title),
    });

    setContent((current) => ({
      ...current,
      blogs: current.blogs.some((item) => item.id === normalized.id)
        ? current.blogs.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current.blogs],
    }));
    loadBlogDraft(normalized);
    markPrepared(`Prepared blog changes for "${normalized.title || "Untitled blog"}".`);
  };

  const applyTestimonialDraft = () => {
    const normalized = ensureTestimonialRecord({
      ...testimonialDraft,
      id: testimonialDraft.id || createRecordId("testimonial"),
      slug: slugify(testimonialDraft.slug || testimonialDraft.name),
      rating: Number(testimonialDraft.rating),
    });

    setContent((current) => ({
      ...current,
      testimonials: current.testimonials.some((item) => item.id === normalized.id)
        ? current.testimonials.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current.testimonials],
    }));
    loadTestimonialDraft(normalized);
    markPrepared(`Prepared testimonial changes for "${normalized.name || "Untitled testimonial"}".`);
  };

  const deleteProduct = (id: string) => {
    const record = content.products.find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${record.title}" from books?`)) return;
    const products = content.products.filter((item) => item.id !== id);
    setContent((current) => ({ ...current, products }));
    loadProductDraft(products[0]);
    markPrepared(`Prepared deletion for "${record.title}".`);
  };

  const deletePublication = (id: string) => {
    const record = content.publications.find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${record.title}" from publications?`)) return;
    const publications = content.publications.filter((item) => item.id !== id);
    setContent((current) => ({ ...current, publications }));
    loadPublicationDraft(publications[0]);
    markPrepared(`Prepared deletion for "${record.title}".`);
  };

  const deleteAuthor = (id: string) => {
    const record = content.authors.find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${record.name}" from authors?`)) return;
    const authors = content.authors.filter((item) => item.id !== id);
    setContent((current) => ({ ...current, authors }));
    loadAuthorDraft(authors[0]);
    markPrepared(`Prepared deletion for "${record.name}".`);
  };

  const deleteBlog = (id: string) => {
    const record = content.blogs.find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${record.title}" from blogs?`)) return;
    const blogs = content.blogs.filter((item) => item.id !== id);
    setContent((current) => ({ ...current, blogs }));
    loadBlogDraft(blogs[0]);
    markPrepared(`Prepared deletion for "${record.title}".`);
  };

  const deleteTestimonial = (id: string) => {
    const record = content.testimonials.find((item) => item.id === id);
    if (!record || !window.confirm(`Delete "${record.name}" from testimonials?`)) return;
    const testimonials = content.testimonials.filter((item) => item.id !== id);
    setContent((current) => ({ ...current, testimonials }));
    loadTestimonialDraft(testimonials[0]);
    markPrepared(`Prepared deletion for "${record.name}".`);
  };

  const saveAllChanges = () => {
    setStatusMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/cms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
        });
        const payload = (await response.json()) as { message?: string; content?: CmsContent };

        if (!response.ok || !payload.content) {
          setStatusMessage(payload.message ?? "MySQL CMS save failed.");
          return;
        }

        setSavedContent(payload.content);
        setContent(payload.content);
        setHasUnsavedChanges(false);
        setStatusMessage(payload.message ?? "CMS content saved to MySQL.");
        loadProductDraft(payload.content.products.find((item) => item.id === selectedProductId) ?? payload.content.products[0]);
        loadPublicationDraft(payload.content.publications.find((item) => item.id === selectedPublicationId) ?? payload.content.publications[0]);
        loadAuthorDraft(payload.content.authors.find((item) => item.id === selectedAuthorId) ?? payload.content.authors[0]);
        loadBlogDraft(payload.content.blogs.find((item) => item.id === selectedBlogId) ?? payload.content.blogs[0]);
        loadTestimonialDraft(payload.content.testimonials.find((item) => item.id === selectedTestimonialId) ?? payload.content.testimonials[0]);
        window.dispatchEvent(new Event("eagle-leap-cms-updated"));
        router.refresh();
      } catch {
        setStatusMessage("The MySQL CMS request failed.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] gradient-brand p-8 text-white shadow-elegant">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Badge variant="secondary" className="bg-white/10 text-white">
              Admin CMS
            </Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight">Manage Eagle Leap content from MySQL.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/78 sm:text-base">
              Books, publications, authors, blogs, testimonials, and homepage highlights now save to the same database-backed
              content layer used by the website.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[420px]">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-accent">
                <Database className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">Storage</span>
              </div>
              <p className="mt-3 text-lg font-bold">{storageLabel}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-accent">
                <BadgeCheck className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">Status</span>
              </div>
              <p className="mt-3 text-lg font-bold">{hasUnsavedChanges ? "Pending save" : "Synced"}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-[24px] border-border shadow-card">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-primary">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-[28px] border-border shadow-card">
        <CardContent className="flex flex-col gap-5 p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Save status</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant={hasUnsavedChanges ? "secondary" : "outline"} className={hasUnsavedChanges ? "bg-accent/10 text-accent" : ""}>
                {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
              </Badge>
              <span className="text-sm text-muted-foreground">Last loaded: {formatCmsTimestamp(savedContent.updatedAt)}</span>
            </div>
            {statusMessage ? <p className="mt-3 text-sm font-medium text-primary">{statusMessage}</p> : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={resetToSavedState} disabled={isPending || !hasUnsavedChanges}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button className="gradient-accent text-accent-foreground" onClick={saveAllChanges} disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save to MySQL & Publish"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="books" className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <TabsList className="h-auto flex-wrap rounded-2xl bg-card p-2 shadow-card">
            <TabsTrigger value="books" className="gap-2 rounded-xl px-4 py-2">
              <ShoppingBag className="h-4 w-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="publications" className="gap-2 rounded-xl px-4 py-2">
              <BookOpen className="h-4 w-4" />
              Publications
            </TabsTrigger>
            <TabsTrigger value="authors" className="gap-2 rounded-xl px-4 py-2">
              <UserRound className="h-4 w-4" />
              Authors
            </TabsTrigger>
            <TabsTrigger value="blogs" className="gap-2 rounded-xl px-4 py-2">
              <Newspaper className="h-4 w-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2 rounded-xl px-4 py-2">
              <MessageSquareQuote className="h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="homepage" className="gap-2 rounded-xl px-4 py-2">
              <LayoutTemplate className="h-4 w-4" />
              Homepage
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full xl:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-10" placeholder="Search records" />
          </div>
        </div>

        <TabsContent value="books" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Books</CardTitle>
                  <CardDescription>{filteredProducts.length} visible records</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadProductDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid max-h-[760px] gap-4 overflow-auto pr-2">
              {filteredProducts.map((item) => (
                <RecordShell
                  key={item.id}
                  active={selectedProductId === item.id}
                  title={item.title}
                  description={`${item.author} • ${item.category}`}
                  badges={[item.format, item.price, item.status ?? "active"]}
                  onSelect={() => loadProductDraft(item)}
                  onDelete={() => deleteProduct(item.id)}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{content.products.some((item) => item.id === productDraft.id) ? "Edit book" : "Add book"}</CardTitle>
              <CardDescription>Storefront books appear on the public store and detail pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyProductDraft();
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField id="product-title" label="Title" value={productDraft.title} onChange={(value) => setProductDraft((current) => ({ ...current, title: value }))} />
                  <TextField id="product-author" label="Author" value={productDraft.author} onChange={(value) => setProductDraft((current) => ({ ...current, author: value }))} />
                  <TextField id="product-slug" label="Slug" value={productDraft.slug} onChange={(value) => setProductDraft((current) => ({ ...current, slug: value }))} placeholder="auto from title" />
                  <TextField id="product-category" label="Category" value={productDraft.category} onChange={(value) => setProductDraft((current) => ({ ...current, category: value }))} />
                  <SelectField id="product-format" label="Format" value={productDraft.format} options={productFormats} onChange={(value) => setProductDraft((current) => ({ ...current, format: value }))} />
                  <SelectField id="product-status" label="Status" value={productDraft.status ?? "active"} options={productStatusOptions} onChange={(value) => setProductDraft((current) => ({ ...current, status: value }))} />
                  <TextField id="product-price" label="Price" value={productDraft.price} onChange={(value) => setProductDraft((current) => ({ ...current, price: value }))} />
                  <TextField id="product-offer-price" label="Offer price" value={productDraft.offerPrice ?? ""} onChange={(value) => setProductDraft((current) => ({ ...current, offerPrice: value }))} />
                  <TextField id="product-stock" label="Stock label" value={productDraft.stock} onChange={(value) => setProductDraft((current) => ({ ...current, stock: value }))} />
                  <TextField id="product-isbn" label="ISBN" value={productDraft.isbn} onChange={(value) => setProductDraft((current) => ({ ...current, isbn: value }))} />
                  <TextField id="product-year" label="Year" value={productDraft.year} onChange={(value) => setProductDraft((current) => ({ ...current, year: value }))} />
                  <ImagePickerField
                    id="product-cover"
                    label="Cover image"
                    value={productDraft.cover}
                    uploading={uploadingImageFor === "product-cover"}
                    onChange={(value) => setProductDraft((current) => ({ ...current, cover: value }))}
                    placeholder="/uploads/book-covers/cover.jpg"
                    onUpload={(file) =>
                      uploadImageFile(file, "book-covers", "product-cover", (url) =>
                        setProductDraft((current) => ({ ...current, cover: url })),
                      )
                    }
                  />
                </div>

                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="text-sm font-semibold text-primary">Cover presets</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cmsMediaOptions.map((option) => (
                      <Button key={option.value} type="button" variant="outline" size="sm" onClick={() => setProductDraft((current) => ({ ...current, cover: option.value }))}>
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" value={productDraft.description} onChange={(event) => setProductDraft((current) => ({ ...current, description: event.target.value }))} className="min-h-[130px]" />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <ToggleField label="Featured" checked={Boolean(productDraft.featured)} onChange={(checked) => setProductDraft((current) => ({ ...current, featured: checked }))} />
                  <ToggleField label="New arrival" checked={Boolean(productDraft.newArrival)} onChange={(checked) => setProductDraft((current) => ({ ...current, newArrival: checked }))} />
                  <ToggleField label="Popular" checked={Boolean(productDraft.popular)} onChange={(checked) => setProductDraft((current) => ({ ...current, popular: checked }))} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">Apply Book</Button>
                  <Button type="button" variant="outline" onClick={() => loadProductDraft()}>New Book</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Publications</CardTitle>
                  <CardDescription>{filteredPublications.length} visible records</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadPublicationDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid max-h-[760px] gap-4 overflow-auto pr-2">
              {filteredPublications.map((item) => (
                <RecordShell
                  key={item.id}
                  active={selectedPublicationId === item.id}
                  title={item.title}
                  description={`${item.author} • ${item.publicationDate}`}
                  badges={[item.publicationType, item.category, item.year]}
                  onSelect={() => loadPublicationDraft(item)}
                  onDelete={() => deletePublication(item.id)}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{content.publications.some((item) => item.id === publicationDraft.id) ? "Edit publication" : "Add publication"}</CardTitle>
              <CardDescription>Publication records power publication listing and detail pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyPublicationDraft();
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField id="publication-title" label="Title" value={publicationDraft.title} onChange={(value) => setPublicationDraft((current) => ({ ...current, title: value }))} />
                  <TextField id="publication-author" label="Author" value={publicationDraft.author} onChange={(value) => setPublicationDraft((current) => ({ ...current, author: value }))} />
                  <TextField id="publication-slug" label="Slug" value={publicationDraft.slug} onChange={(value) => setPublicationDraft((current) => ({ ...current, slug: value }))} placeholder="auto from title" />
                  <TextField id="publication-edition" label="Edition" value={publicationDraft.edition} onChange={(value) => setPublicationDraft((current) => ({ ...current, edition: value }))} />
                  <SelectField id="publication-type" label="Type" value={publicationDraft.publicationType} options={publicationTypeOptions} onChange={(value) => setPublicationDraft((current) => ({ ...current, publicationType: value }))} />
                  <SelectField id="publication-category" label="Category" value={publicationDraft.category} options={publicationCategoryOptions} onChange={(value) => setPublicationDraft((current) => ({ ...current, category: value }))} />
                  <TextField id="publication-isbn" label="ISBN" value={publicationDraft.isbn} onChange={(value) => setPublicationDraft((current) => ({ ...current, isbn: value }))} />
                  <TextField id="publication-year" label="Year" value={publicationDraft.year} onChange={(value) => setPublicationDraft((current) => ({ ...current, year: value }))} />
                  <TextField id="publication-date" label="Publication date" value={publicationDraft.publicationDate} onChange={(value) => setPublicationDraft((current) => ({ ...current, publicationDate: value }))} />
                  <ImagePickerField
                    id="publication-cover"
                    label="Cover image"
                    value={publicationDraft.cover}
                    uploading={uploadingImageFor === "publication-cover"}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, cover: value }))}
                    placeholder="/uploads/publication-covers/cover.jpg"
                    onUpload={(file) =>
                      uploadImageFile(file, "publication-covers", "publication-cover", (url) =>
                        setPublicationDraft((current) => ({ ...current, cover: url })),
                      )
                    }
                  />
                  <TextField id="publication-pdf" label="PDF URL" value={publicationDraft.pdfUrl ?? ""} onChange={(value) => setPublicationDraft((current) => ({ ...current, pdfUrl: value }))} />
                  <TextField id="publication-certificate" label="Certificate URL" value={publicationDraft.certificateUrl ?? ""} onChange={(value) => setPublicationDraft((current) => ({ ...current, certificateUrl: value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publication-description">Description</Label>
                  <Textarea id="publication-description" value={publicationDraft.description} onChange={(event) => setPublicationDraft((current) => ({ ...current, description: event.target.value }))} className="min-h-[130px]" />
                </div>
                <ToggleField label="Featured publication" checked={Boolean(publicationDraft.featured)} onChange={(checked) => setPublicationDraft((current) => ({ ...current, featured: checked }))} />
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">Apply Publication</Button>
                  <Button type="button" variant="outline" onClick={() => loadPublicationDraft()}>New Publication</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authors" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Authors</CardTitle>
                  <CardDescription>{filteredAuthors.length} visible records</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadAuthorDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid max-h-[760px] gap-4 overflow-auto pr-2">
              {filteredAuthors.map((item) => (
                <RecordShell
                  key={item.id}
                  active={selectedAuthorId === item.id}
                  title={item.name}
                  description={item.designation}
                  badges={[item.status, item.featured ? "featured" : "standard"]}
                  onSelect={() => loadAuthorDraft(item)}
                  onDelete={() => deleteAuthor(item.id)}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{content.authors.some((item) => item.id === authorDraft.id) ? "Edit author" : "Add author"}</CardTitle>
              <CardDescription>Author records appear on the authors page and featured author sections.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyAuthorDraft();
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField id="author-name" label="Name" value={authorDraft.name} onChange={(value) => setAuthorDraft((current) => ({ ...current, name: value, image: current.image || createDefaultAuthorImage(value) }))} />
                  <TextField id="author-slug" label="Slug" value={authorDraft.slug} onChange={(value) => setAuthorDraft((current) => ({ ...current, slug: value }))} placeholder="auto from name" />
                  <TextField id="author-designation" label="Designation" value={authorDraft.designation} onChange={(value) => setAuthorDraft((current) => ({ ...current, designation: value }))} />
                  <SelectField id="author-status" label="Status" value={authorDraft.status} options={authorStatusOptions} onChange={(value) => setAuthorDraft((current) => ({ ...current, status: value }))} />
                  <TextField id="author-image" label="Image URL" value={authorDraft.image} onChange={(value) => setAuthorDraft((current) => ({ ...current, image: value }))} />
                  <TextField id="author-website" label="Website" value={authorDraft.website ?? ""} onChange={(value) => setAuthorDraft((current) => ({ ...current, website: value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author-bio">Bio</Label>
                  <Textarea id="author-bio" value={authorDraft.bio} onChange={(event) => setAuthorDraft((current) => ({ ...current, bio: event.target.value }))} className="min-h-[150px]" />
                </div>
                <ToggleField label="Featured author" checked={Boolean(authorDraft.featured)} onChange={(checked) => setAuthorDraft((current) => ({ ...current, featured: checked }))} />
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">Apply Author</Button>
                  <Button type="button" variant="outline" onClick={() => loadAuthorDraft()}>New Author</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Blogs</CardTitle>
                  <CardDescription>{filteredBlogs.length} visible records</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadBlogDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid max-h-[760px] gap-4 overflow-auto pr-2">
              {filteredBlogs.map((item) => (
                <RecordShell
                  key={item.id}
                  active={selectedBlogId === item.id}
                  title={item.title}
                  description={`${item.author} • ${item.publishAt}`}
                  badges={[item.category, item.status, item.featured ? "featured" : "standard"]}
                  onSelect={() => loadBlogDraft(item)}
                  onDelete={() => deleteBlog(item.id)}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{content.blogs.some((item) => item.id === blogDraft.id) ? "Edit blog" : "Add blog"}</CardTitle>
              <CardDescription>Published blog posts appear on the public blog listing and detail pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyBlogDraft();
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField id="blog-title" label="Title" value={blogDraft.title} onChange={(value) => setBlogDraft((current) => ({ ...current, title: value }))} />
                  <TextField id="blog-slug" label="Slug" value={blogDraft.slug} onChange={(value) => setBlogDraft((current) => ({ ...current, slug: value }))} placeholder="auto from title" />
                  <TextField id="blog-author" label="Author" value={blogDraft.author} onChange={(value) => setBlogDraft((current) => ({ ...current, author: value }))} />
                  <TextField id="blog-category" label="Category" value={blogDraft.category} onChange={(value) => setBlogDraft((current) => ({ ...current, category: value }))} />
                  <TextField id="blog-publish-at" label="Publish date" value={blogDraft.publishAt} onChange={(value) => setBlogDraft((current) => ({ ...current, publishAt: value }))} />
                  <SelectField id="blog-status" label="Status" value={blogDraft.status} options={blogStatusOptions} onChange={(value) => setBlogDraft((current) => ({ ...current, status: value }))} />
                  <ImagePickerField
                    id="blog-featured-image"
                    label="Featured image"
                    value={blogDraft.featuredImage}
                    uploading={uploadingImageFor === "blog-featured-image"}
                    onChange={(value) => setBlogDraft((current) => ({ ...current, featuredImage: value }))}
                    placeholder="/uploads/blogs/featured-image.jpg"
                    onUpload={(file) =>
                      uploadImageFile(file, "blogs", "blog-featured-image", (url) =>
                        setBlogDraft((current) => ({ ...current, featuredImage: url })),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-excerpt">Excerpt</Label>
                  <Textarea id="blog-excerpt" value={blogDraft.excerpt} onChange={(event) => setBlogDraft((current) => ({ ...current, excerpt: event.target.value }))} className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-content">Content</Label>
                  <Textarea id="blog-content" value={blogDraft.content} onChange={(event) => setBlogDraft((current) => ({ ...current, content: event.target.value }))} className="min-h-[220px]" />
                </div>
                <ToggleField label="Featured post" checked={Boolean(blogDraft.featured)} onChange={(checked) => setBlogDraft((current) => ({ ...current, featured: checked }))} />
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">Apply Blog</Button>
                  <Button type="button" variant="outline" onClick={() => loadBlogDraft()}>New Blog</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Testimonials</CardTitle>
                  <CardDescription>{filteredTestimonials.length} visible records</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadTestimonialDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid max-h-[760px] gap-4 overflow-auto pr-2">
              {filteredTestimonials.map((item) => {
                const placement = [item.home ? "home" : null, item.packages ? "packages" : null, item.about ? "about" : null]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <RecordShell
                    key={item.id}
                    active={selectedTestimonialId === item.id}
                    title={item.name}
                    description={`${item.designation} - ${item.review}`}
                    badges={[item.status, `${item.rating}/5`, placement || "unplaced"]}
                    onSelect={() => loadTestimonialDraft(item)}
                    onDelete={() => deleteTestimonial(item.id)}
                  />
                );
              })}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                {content.testimonials.some((item) => item.id === testimonialDraft.id) ? "Edit testimonial" : "Add testimonial"}
              </CardTitle>
              <CardDescription>Testimonials drive public trust on the homepage and other marketing sections.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  applyTestimonialDraft();
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField id="testimonial-name" label="Name" value={testimonialDraft.name} onChange={(value) => setTestimonialDraft((current) => ({ ...current, name: value }))} />
                  <TextField id="testimonial-slug" label="Slug" value={testimonialDraft.slug} onChange={(value) => setTestimonialDraft((current) => ({ ...current, slug: value }))} placeholder="auto from name" />
                  <TextField id="testimonial-designation" label="Designation" value={testimonialDraft.designation} onChange={(value) => setTestimonialDraft((current) => ({ ...current, designation: value }))} />
                  <SelectField
                    id="testimonial-rating"
                    label="Rating"
                    value={String(testimonialDraft.rating) as (typeof testimonialRatingOptions)[number]}
                    options={testimonialRatingOptions}
                    onChange={(value) => setTestimonialDraft((current) => ({ ...current, rating: Number(value) }))}
                  />
                  <SelectField
                    id="testimonial-status"
                    label="Status"
                    value={testimonialDraft.status}
                    options={testimonialStatusOptions}
                    onChange={(value) => setTestimonialDraft((current) => ({ ...current, status: value }))}
                  />
                  <div className="md:col-span-2">
                    <Label htmlFor="testimonial-review">Review</Label>
                    <Textarea
                      id="testimonial-review"
                      value={testimonialDraft.review}
                      onChange={(event) => setTestimonialDraft((current) => ({ ...current, review: event.target.value }))}
                      className="min-h-[160px]"
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <ToggleField label="Homepage" checked={Boolean(testimonialDraft.home)} onChange={(checked) => setTestimonialDraft((current) => ({ ...current, home: checked }))} />
                  <ToggleField label="Packages" checked={Boolean(testimonialDraft.packages)} onChange={(checked) => setTestimonialDraft((current) => ({ ...current, packages: checked }))} />
                  <ToggleField label="About" checked={Boolean(testimonialDraft.about)} onChange={(checked) => setTestimonialDraft((current) => ({ ...current, about: checked }))} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">Apply Testimonial</Button>
                  <Button type="button" variant="outline" onClick={() => loadTestimonialDraft()}>
                    New Testimonial
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-primary">Homepage Feature Section</CardTitle>
                  <CardDescription>Homepage feature copy and image path stored in MySQL.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  id="home-left-eyebrow"
                  label="Left eyebrow"
                  value={content.homeFeatureSection.leftEyebrow}
                  onChange={(value) => {
                    setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, leftEyebrow: value } }));
                    markPrepared("Prepared homepage feature changes.");
                  }}
                />
                <TextField
                  id="home-right-eyebrow"
                  label="Right eyebrow"
                  value={content.homeFeatureSection.rightEyebrow}
                  onChange={(value) => {
                    setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, rightEyebrow: value } }));
                    markPrepared("Prepared homepage feature changes.");
                  }}
                />
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="home-left-title">Left title</Label>
                  <Textarea
                    id="home-left-title"
                    value={content.homeFeatureSection.leftTitle}
                    onChange={(event) => {
                      setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, leftTitle: event.target.value } }));
                      markPrepared("Prepared homepage feature changes.");
                    }}
                    className="min-h-[130px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home-right-title">Right title</Label>
                  <Textarea
                    id="home-right-title"
                    value={content.homeFeatureSection.rightTitle}
                    onChange={(event) => {
                      setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, rightTitle: event.target.value } }));
                      markPrepared("Prepared homepage feature changes.");
                    }}
                    className="min-h-[130px]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="home-right-description">Right description</Label>
                <Textarea
                  id="home-right-description"
                  value={content.homeFeatureSection.rightDescription}
                  onChange={(event) => {
                    setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, rightDescription: event.target.value } }));
                    markPrepared("Prepared homepage feature changes.");
                  }}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {content.homeFeatureSection.leftHighlights.map((item, index) => (
                  <TextField
                    key={`left-${index}`}
                    id={`home-left-highlight-${index}`}
                    label={`Left highlight ${index + 1}`}
                    value={item}
                    onChange={(value) => {
                      const leftHighlights = [...content.homeFeatureSection.leftHighlights] as [string, string];
                      leftHighlights[index] = value;
                      setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, leftHighlights } }));
                      markPrepared("Prepared homepage feature changes.");
                    }}
                  />
                ))}
                {content.homeFeatureSection.rightHighlights.map((item, index) => (
                  <TextField
                    key={`right-${index}`}
                    id={`home-right-highlight-${index}`}
                    label={`Right highlight ${index + 1}`}
                    value={item}
                    onChange={(value) => {
                      const rightHighlights = [...content.homeFeatureSection.rightHighlights] as [string, string];
                      rightHighlights[index] = value;
                      setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, rightHighlights } }));
                      markPrepared("Prepared homepage feature changes.");
                    }}
                  />
                ))}
              </div>
              <TextField
                id="home-image-src"
                label="Image path"
                value={content.homeFeatureSection.imageSrc}
                onChange={(value) => {
                  setContent((current) => ({ ...current, homeFeatureSection: { ...current.homeFeatureSection, imageSrc: value } }));
                  markPrepared("Prepared homepage feature changes.");
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
