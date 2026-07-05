"use client";

import { useRouter } from "next/navigation";
import { BookOpen, FileText, LayoutTemplate, Plus, Save, ShoppingBag, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { publicationCategories, type ProductRecord, type PublicationRecord } from "@/data/catalog-data";
import { type CmsContent, createRecordId, slugify } from "@/lib/cms-content";
import { cmsMediaOptions } from "@/lib/cms-media";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";

const productFormats = ["Ebook", "Hard Copy", "Both"] as const;
const publicationTypeOptions = ["Book", "ISBN Paper", "Edited Book"] as const;
const publicationCategoryOptions = publicationCategories.filter((item) => item !== "All");

function createEmptyProduct(): ProductRecord {
  return {
    id: "",
    slug: "",
    title: "",
    author: "",
    category: "",
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

type EditorHeaderProps = {
  title: string;
  description: string;
  badge: string;
};

function EditorHeader({ title, description, badge }: EditorHeaderProps) {
  return (
    <section className="rounded-[32px] gradient-brand p-8 text-white shadow-elegant">
      <Badge variant="secondary" className="bg-white/10 text-white">
        {badge}
      </Badge>
      <h1 className="mt-5 text-4xl font-extrabold">{title}</h1>
      <p className="mt-4 max-w-3xl text-white/80">{description}</p>
    </section>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextField({ id, label, value, onChange, placeholder }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

type ToggleFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-primary">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
      {label}
    </label>
  );
}

export function AdminCmsPage({ initialContent }: { initialContent: CmsContent }) {
  const router = useRouter();
  const [savedContent, setSavedContent] = useState(initialContent);
  const [content, setContent] = useState(initialContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialProduct = initialContent.products[0];
  const initialPublication = initialContent.publications[0];
  const [selectedProductId, setSelectedProductId] = useState(initialProduct?.id ?? "new-product");
  const [selectedPublicationId, setSelectedPublicationId] = useState(initialPublication?.id ?? "new-publication");
  const [productDraft, setProductDraft] = useState<ProductRecord>(initialProduct ? { ...initialProduct } : createEmptyProduct());
  const [publicationDraft, setPublicationDraft] = useState<PublicationRecord>(
    initialPublication ? { ...initialPublication } : createEmptyPublication(),
  );

  const loadProductDraft = (product?: ProductRecord) => {
    if (!product) {
      setSelectedProductId("new-product");
      setProductDraft(createEmptyProduct());
      return;
    }

    setSelectedProductId(product.id);
    setProductDraft({ ...product });
  };

  const loadPublicationDraft = (publication?: PublicationRecord) => {
    if (!publication) {
      setSelectedPublicationId("new-publication");
      setPublicationDraft(createEmptyPublication());
      return;
    }

    setSelectedPublicationId(publication.id);
    setPublicationDraft({ ...publication });
  };

  const resetToSavedState = () => {
    setContent(savedContent);
    setHasUnsavedChanges(false);
    setStatusMessage("Local edits were reset to the last saved CMS data.");
    loadProductDraft(savedContent.products[0]);
    loadPublicationDraft(savedContent.publications[0]);
  };

  const applyProductDraft = () => {
    const normalized: ProductRecord = {
      ...productDraft,
      id: productDraft.id || createRecordId("product"),
      slug: slugify(productDraft.slug || productDraft.title),
    };

    setContent((current) => {
      const exists = current.products.some((item) => item.id === normalized.id);

      return {
        ...current,
        products: exists
          ? current.products.map((item) => (item.id === normalized.id ? normalized : item))
          : [normalized, ...current.products],
      };
    });

    setHasUnsavedChanges(true);
    setStatusMessage(`Prepared product changes for "${normalized.title || "Untitled product"}". Save all changes to publish them.`);
    loadProductDraft(normalized);
  };

  const applyPublicationDraft = () => {
    const normalized: PublicationRecord = {
      ...publicationDraft,
      id: publicationDraft.id || createRecordId("publication"),
      slug: slugify(publicationDraft.slug || publicationDraft.title),
      pdfUrl: publicationDraft.pdfUrl?.trim() || undefined,
      certificateUrl: publicationDraft.certificateUrl?.trim() || undefined,
    };

    setContent((current) => {
      const exists = current.publications.some((item) => item.id === normalized.id);

      return {
        ...current,
        publications: exists
          ? current.publications.map((item) => (item.id === normalized.id ? normalized : item))
          : [normalized, ...current.publications],
      };
    });

    setHasUnsavedChanges(true);
    setStatusMessage(
      `Prepared publication changes for "${normalized.title || "Untitled publication"}". Save all changes to publish them.`,
    );
    loadPublicationDraft(normalized);
  };

  const deleteProduct = (id: string) => {
    const record = content.products.find((item) => item.id === id);

    if (!record || !window.confirm(`Delete "${record.title}" from the admin catalog?`)) {
      return;
    }

    const nextProducts = content.products.filter((item) => item.id !== id);
    const nextContent = { ...content, products: nextProducts };

    setContent(nextContent);
    setHasUnsavedChanges(true);
    setStatusMessage(`Marked "${record.title}" for deletion. Save all changes to remove it from the website.`);
    loadProductDraft(nextProducts[0]);
  };

  const deletePublication = (id: string) => {
    const record = content.publications.find((item) => item.id === id);

    if (!record || !window.confirm(`Delete "${record.title}" from the publication library?`)) {
      return;
    }

    const nextPublications = content.publications.filter((item) => item.id !== id);
    const nextContent = { ...content, publications: nextPublications };

    setContent(nextContent);
    setHasUnsavedChanges(true);
    setStatusMessage(`Marked "${record.title}" for deletion. Save all changes to remove it from the website.`);
    loadPublicationDraft(nextPublications[0]);
  };

  const saveAllChanges = () => {
    setStatusMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/cms", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content),
        });

        const payload = (await response.json()) as { message?: string; content?: CmsContent };

        if (!response.ok || !payload.content) {
          setStatusMessage(payload.message ?? "The admin CMS could not be saved.");
          return;
        }

        setSavedContent(payload.content);
        setContent(payload.content);
        setHasUnsavedChanges(false);
        setStatusMessage(payload.message ?? "CMS content saved.");
        loadProductDraft(payload.content.products.find((item) => item.id === selectedProductId) ?? payload.content.products[0]);
        loadPublicationDraft(
          payload.content.publications.find((item) => item.id === selectedPublicationId) ?? payload.content.publications[0],
        );
        window.dispatchEvent(new Event("eagle-leap-cms-updated"));
        router.refresh();
      } catch {
        setStatusMessage("The admin CMS could not be saved because the request failed.");
      }
    });
  };

  const productExists = content.products.some((item) => item.id === productDraft.id);
  const publicationExists = content.publications.some((item) => item.id === publicationDraft.id);

  return (
    <div className="space-y-6">
      <EditorHeader
        badge="Admin CMS"
        title="Manage books, publications, and homepage content from one panel."
        description="This page is protected by the admin login and writes to the local CMS store used by the live website. Add books, edit records, remove items, and update the homepage feature block without touching the code."
      />

      <Card className="rounded-[28px] border-border shadow-card">
        <CardContent className="flex flex-col gap-4 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Save Status</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant={hasUnsavedChanges ? "secondary" : "outline"} className={hasUnsavedChanges ? "bg-accent/10 text-accent" : ""}>
                {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
              </Badge>
              <span className="text-sm text-muted-foreground">Last saved: {formatCmsTimestamp(savedContent.updatedAt)}</span>
            </div>
            {statusMessage ? <p className="mt-3 text-sm text-primary">{statusMessage}</p> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={resetToSavedState} disabled={isPending || !hasUnsavedChanges}>
              Reset Local Edits
            </Button>
            <Button className="gradient-accent text-accent-foreground" onClick={saveAllChanges} disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="h-auto flex-wrap rounded-2xl bg-card p-2 shadow-card">
          <TabsTrigger value="products" className="gap-2 rounded-xl px-4 py-2">
            <ShoppingBag className="h-4 w-4" />
            Store Books
          </TabsTrigger>
          <TabsTrigger value="publications" className="gap-2 rounded-xl px-4 py-2">
            <BookOpen className="h-4 w-4" />
            Publications
          </TabsTrigger>
          <TabsTrigger value="homepage" className="gap-2 rounded-xl px-4 py-2">
            <LayoutTemplate className="h-4 w-4" />
            Homepage Section
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-primary">Store catalog</CardTitle>
                  <CardDescription>{content.products.length} records managed from the admin panel</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadProductDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {content.products.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => loadProductDraft(item)}
                  className={cn(
                    "rounded-3xl border p-5 text-left transition-colors",
                    selectedProductId === item.id ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.author}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 px-3 text-destructive hover:text-destructive"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteProduct(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {item.format}
                    </Badge>
                    <Badge variant="secondary">{item.price}</Badge>
                    <Badge variant="secondary">{item.slug}</Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{productExists ? "Edit store book" : "Add store book"}</CardTitle>
              <CardDescription>
                Use `asset:book-1` to `asset:book-4`, or enter a public image path like `/images/your-cover.jpg`.
              </CardDescription>
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
                  <TextField
                    id="product-title"
                    label="Book title"
                    value={productDraft.title}
                    onChange={(value) => setProductDraft((current) => ({ ...current, title: value }))}
                  />
                  <TextField
                    id="product-author"
                    label="Author"
                    value={productDraft.author}
                    onChange={(value) => setProductDraft((current) => ({ ...current, author: value }))}
                  />
                  <TextField
                    id="product-slug"
                    label="Slug"
                    value={productDraft.slug}
                    onChange={(value) => setProductDraft((current) => ({ ...current, slug: value }))}
                    placeholder="auto-generated from title"
                  />
                  <TextField
                    id="product-category"
                    label="Category"
                    value={productDraft.category}
                    onChange={(value) => setProductDraft((current) => ({ ...current, category: value }))}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="product-format">Format</Label>
                    <select
                      id="product-format"
                      value={productDraft.format}
                      onChange={(event) =>
                        setProductDraft((current) => ({
                          ...current,
                          format: event.target.value as ProductRecord["format"],
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {productFormats.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    id="product-price"
                    label="Price"
                    value={productDraft.price}
                    onChange={(value) => setProductDraft((current) => ({ ...current, price: value }))}
                  />
                  <TextField
                    id="product-stock"
                    label="Stock label"
                    value={productDraft.stock}
                    onChange={(value) => setProductDraft((current) => ({ ...current, stock: value }))}
                  />
                  <TextField
                    id="product-isbn"
                    label="ISBN"
                    value={productDraft.isbn}
                    onChange={(value) => setProductDraft((current) => ({ ...current, isbn: value }))}
                  />
                  <TextField
                    id="product-year"
                    label="Year"
                    value={productDraft.year}
                    onChange={(value) => setProductDraft((current) => ({ ...current, year: value }))}
                  />
                  <TextField
                    id="product-cover"
                    label="Cover image"
                    value={productDraft.cover}
                    onChange={(value) => setProductDraft((current) => ({ ...current, cover: value }))}
                  />
                </div>

                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="text-sm font-semibold text-primary">Preset covers</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cmsMediaOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setProductDraft((current) => ({ ...current, cover: option.value }))}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    value={productDraft.description}
                    onChange={(event) => setProductDraft((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-[140px]"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <ToggleField
                    label="Featured title"
                    checked={Boolean(productDraft.featured)}
                    onChange={(checked) => setProductDraft((current) => ({ ...current, featured: checked }))}
                  />
                  <ToggleField
                    label="New arrival"
                    checked={Boolean(productDraft.newArrival)}
                    onChange={(checked) => setProductDraft((current) => ({ ...current, newArrival: checked }))}
                  />
                  <ToggleField
                    label="Popular title"
                    checked={Boolean(productDraft.popular)}
                    onChange={(checked) => setProductDraft((current) => ({ ...current, popular: checked }))}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">
                    {productExists ? "Apply Product Changes" : "Add Product"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => loadProductDraft()}>
                    Start New Product
                  </Button>
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
                  <CardTitle className="text-2xl text-primary">Publication library</CardTitle>
                  <CardDescription>{content.publications.length} publication entries managed from the admin panel</CardDescription>
                </div>
                <Button variant="outline" onClick={() => loadPublicationDraft()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Publication
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {content.publications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => loadPublicationDraft(item)}
                  className={cn(
                    "rounded-3xl border p-5 text-left transition-colors",
                    selectedPublicationId === item.id ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.author}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 px-3 text-destructive hover:text-destructive"
                      onClick={(event) => {
                        event.stopPropagation();
                        deletePublication(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      {item.publicationType}
                    </Badge>
                    <Badge variant="secondary">{item.category}</Badge>
                    <Badge variant="secondary">{item.year}</Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{publicationExists ? "Edit publication" : "Add publication"}</CardTitle>
              <CardDescription>These records power the publication grids, detail pages, and related author cards.</CardDescription>
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
                  <TextField
                    id="publication-title"
                    label="Title"
                    value={publicationDraft.title}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, title: value }))}
                  />
                  <TextField
                    id="publication-author"
                    label="Author"
                    value={publicationDraft.author}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, author: value }))}
                  />
                  <TextField
                    id="publication-slug"
                    label="Slug"
                    value={publicationDraft.slug}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, slug: value }))}
                    placeholder="auto-generated from title"
                  />
                  <TextField
                    id="publication-edition"
                    label="Edition"
                    value={publicationDraft.edition}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, edition: value }))}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="publication-type">Publication type</Label>
                    <select
                      id="publication-type"
                      value={publicationDraft.publicationType}
                      onChange={(event) =>
                        setPublicationDraft((current) => ({
                          ...current,
                          publicationType: event.target.value as PublicationRecord["publicationType"],
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {publicationTypeOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publication-category">Category</Label>
                    <select
                      id="publication-category"
                      value={publicationDraft.category}
                      onChange={(event) =>
                        setPublicationDraft((current) => ({
                          ...current,
                          category: event.target.value as PublicationRecord["category"],
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {publicationCategoryOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    id="publication-isbn"
                    label="ISBN"
                    value={publicationDraft.isbn}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, isbn: value }))}
                  />
                  <TextField
                    id="publication-year"
                    label="Year"
                    value={publicationDraft.year}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, year: value }))}
                  />
                  <TextField
                    id="publication-date"
                    label="Publication date"
                    value={publicationDraft.publicationDate}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, publicationDate: value }))}
                  />
                  <TextField
                    id="publication-cover"
                    label="Cover image"
                    value={publicationDraft.cover}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, cover: value }))}
                  />
                  <TextField
                    id="publication-pdf"
                    label="PDF preview URL"
                    value={publicationDraft.pdfUrl ?? ""}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, pdfUrl: value }))}
                    placeholder="/previews/publication-preview.svg"
                  />
                  <TextField
                    id="publication-certificate"
                    label="Certificate URL"
                    value={publicationDraft.certificateUrl ?? ""}
                    onChange={(value) => setPublicationDraft((current) => ({ ...current, certificateUrl: value }))}
                    placeholder="/previews/publication-certificate.svg"
                  />
                </div>

                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="text-sm font-semibold text-primary">Preset covers</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cmsMediaOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPublicationDraft((current) => ({ ...current, cover: option.value }))}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publication-description">Description</Label>
                  <Textarea
                    id="publication-description"
                    value={publicationDraft.description}
                    onChange={(event) => setPublicationDraft((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-[140px]"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <ToggleField
                    label="Featured publication"
                    checked={Boolean(publicationDraft.featured)}
                    onChange={(checked) => setPublicationDraft((current) => ({ ...current, featured: checked }))}
                  />
                  <div className="rounded-2xl border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
                    Use the same slug across related store and publication entries when a book should appear in both areas.
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="gradient-accent text-accent-foreground">
                    {publicationExists ? "Apply Publication Changes" : "Add Publication"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => loadPublicationDraft()}>
                    Start New Publication
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage" className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                  <LayoutTemplate className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-primary">Homepage feature section</CardTitle>
                  <CardDescription>Edit the paired left and right blocks shown near the top of the homepage.</CardDescription>
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
                    setContent((current) => ({
                      ...current,
                      homeFeatureSection: { ...current.homeFeatureSection, leftEyebrow: value },
                    }));
                    setHasUnsavedChanges(true);
                  }}
                />
                <TextField
                  id="home-right-eyebrow"
                  label="Right eyebrow"
                  value={content.homeFeatureSection.rightEyebrow}
                  onChange={(value) => {
                    setContent((current) => ({
                      ...current,
                      homeFeatureSection: { ...current.homeFeatureSection, rightEyebrow: value },
                    }));
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-left-title">Left title</Label>
                <Textarea
                  id="home-left-title"
                  value={content.homeFeatureSection.leftTitle}
                  onChange={(event) => {
                    setContent((current) => ({
                      ...current,
                      homeFeatureSection: { ...current.homeFeatureSection, leftTitle: event.target.value },
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-right-title">Right title</Label>
                <Textarea
                  id="home-right-title"
                  value={content.homeFeatureSection.rightTitle}
                  onChange={(event) => {
                    setContent((current) => ({
                      ...current,
                      homeFeatureSection: { ...current.homeFeatureSection, rightTitle: event.target.value },
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-right-description">Right description</Label>
                <Textarea
                  id="home-right-description"
                  value={content.homeFeatureSection.rightDescription}
                  onChange={(event) => {
                    setContent((current) => ({
                      ...current,
                      homeFeatureSection: { ...current.homeFeatureSection, rightDescription: event.target.value },
                    }));
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {content.homeFeatureSection.leftHighlights.map((item, index) => (
                  <TextField
                    key={`left-highlight-${index}`}
                    id={`left-highlight-${index}`}
                    label={`Left highlight ${index + 1}`}
                    value={item}
                    onChange={(value) => {
                      const nextHighlights = [...content.homeFeatureSection.leftHighlights] as [string, string];
                      nextHighlights[index] = value;
                      setContent((current) => ({
                        ...current,
                        homeFeatureSection: { ...current.homeFeatureSection, leftHighlights: nextHighlights },
                      }));
                      setHasUnsavedChanges(true);
                    }}
                  />
                ))}
                {content.homeFeatureSection.rightHighlights.map((item, index) => (
                  <TextField
                    key={`right-highlight-${index}`}
                    id={`right-highlight-${index}`}
                    label={`Right highlight ${index + 1}`}
                    value={item}
                    onChange={(value) => {
                      const nextHighlights = [...content.homeFeatureSection.rightHighlights] as [string, string];
                      nextHighlights[index] = value;
                      setContent((current) => ({
                        ...current,
                        homeFeatureSection: { ...current.homeFeatureSection, rightHighlights: nextHighlights },
                      }));
                      setHasUnsavedChanges(true);
                    }}
                  />
                ))}
              </div>

              <TextField
                id="home-image-src"
                label="Right image path"
                value={content.homeFeatureSection.imageSrc}
                onChange={(value) => {
                  setContent((current) => ({
                    ...current,
                    homeFeatureSection: { ...current.homeFeatureSection, imageSrc: value },
                  }));
                  setHasUnsavedChanges(true);
                }}
              />
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-primary">Editing guidance</CardTitle>
                  <CardDescription>Keep the homepage section balanced while you update the text and image.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground">
              <div className="rounded-3xl border border-border bg-secondary p-5">
                Move short supporting statements into the right-side highlight boxes if the left headline becomes too tall.
              </div>
              <div className="rounded-3xl border border-border bg-secondary p-5">
                Use concise left-highlight text so both cards stay visually balanced without shrinking the main headline too much.
              </div>
              <div className="rounded-3xl border border-border bg-secondary p-5">
                The admin panel saves the homepage copy, store books, and publication library together. Click `Save All Changes` after any edit.
              </div>
              <div className="rounded-3xl border border-border bg-secondary p-5">
                For image paths, prefer existing public files like `/images/...` or one of the preset asset keys used for book covers.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
