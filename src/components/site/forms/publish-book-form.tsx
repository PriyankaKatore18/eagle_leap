"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { packagePlans } from "@/data/forms-data";
import { siteConfig } from "@/data/site-config";
import { submitPublishRequest } from "@/lib/api";
import { publishBookSchema, type PublishBookValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

export function PublishBookForm() {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<PublishBookValues>({
    resolver: zodResolver(publishBookSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      bookTitle: "",
      numberOfPages: 0,
      language: "",
      bookType: "Academic",
      selectedPackage: packagePlans[1]?.name ?? "",
      message: "",
    },
  });

  const onSubmit = (values: PublishBookValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value ?? ""));
        });
        if (file) {
          formData.append("manuscript", file);
        }

        const response = await submitPublishRequest(formData);
        toast.success(response.message ?? "Your request has been submitted.");
        form.reset();
        setFile(null);

        const whatsappMessage = `Hello Eagle Leap Publication, I submitted my book details for "${values.bookTitle}". Please share the next steps.`;
        window.open(
          `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank",
          "noopener,noreferrer",
        );
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to submit the request.");
      }
    });
  };

  return (
    <form id="publish-book-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Full Name *</label>
          <Input {...form.register("fullName")} className="h-12" placeholder="Your full name" />
          <ErrorText message={form.formState.errors.fullName?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Mobile Number *</label>
          <Input {...form.register("mobile")} className="h-12" placeholder="+91 98765 43210" />
          <ErrorText message={form.formState.errors.mobile?.message} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Email Address *</label>
          <Input {...form.register("email")} type="email" className="h-12" placeholder="you@example.com" />
          <ErrorText message={form.formState.errors.email?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Book Title *</label>
          <Input {...form.register("bookTitle")} className="h-12" placeholder="Enter your book title" />
          <ErrorText message={form.formState.errors.bookTitle?.message} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Number of Pages *</label>
          <Input {...form.register("numberOfPages")} type="number" className="h-12" placeholder="120" />
          <ErrorText message={form.formState.errors.numberOfPages?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Language</label>
          <Input {...form.register("language")} className="h-12" placeholder="English / Marathi / Hindi" />
          <ErrorText message={form.formState.errors.language?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Book Type *</label>
          <select
            {...form.register("bookType")}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Academic</option>
            <option>Research</option>
            <option>General</option>
            <option>Other</option>
          </select>
          <ErrorText message={form.formState.errors.bookType?.message} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Upload Manuscript / 1 Chapter</label>
          <Input type="file" accept=".pdf,.doc,.docx" className="h-12 pt-3" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Select Package *</label>
          <select
            {...form.register("selectedPackage")}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {packagePlans.map((plan) => (
              <option key={plan.name}>{plan.name}</option>
            ))}
          </select>
          <ErrorText message={form.formState.errors.selectedPackage?.message} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Message / Special Requirements</label>
        <Textarea {...form.register("message")} rows={5} placeholder="Share anything important about your manuscript or publishing goals..." />
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit & Get Started"}
      </Button>
    </form>
  );
}
