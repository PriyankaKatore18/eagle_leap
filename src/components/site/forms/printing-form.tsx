"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { printingServices } from "@/data/forms-data";
import { submitPrintingEnquiry } from "@/lib/api";
import { printingSchema, type PrintingValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

export function PrintingForm() {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<PrintingValues>({
    resolver: zodResolver(printingSchema),
    defaultValues: {
      name: "",
      organization: "",
      mobile: "",
      serviceType: printingServices[0]?.title ?? "",
      quantity: 100,
      message: "",
    },
  });

  const onSubmit = (values: PrintingValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value ?? ""));
        });
        if (file) {
          formData.append("attachment", file);
        }

        const response = await submitPrintingEnquiry(formData);
        toast.success(response.message ?? "Printing enquiry submitted.");
        form.reset();
        setFile(null);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to submit printing enquiry.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Name *</label>
          <Input {...form.register("name")} className="h-12" placeholder="Your name" />
          <ErrorText message={form.formState.errors.name?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Organization / College</label>
          <Input {...form.register("organization")} className="h-12" placeholder="Institution or business name" />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Mobile Number *</label>
          <Input {...form.register("mobile")} className="h-12" placeholder="+91 98765 43210" />
          <ErrorText message={form.formState.errors.mobile?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Service Type *</label>
          <select
            {...form.register("serviceType")}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {printingServices.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
          </select>
          <ErrorText message={form.formState.errors.serviceType?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Quantity *</label>
          <Input {...form.register("quantity")} type="number" className="h-12" placeholder="500" />
          <ErrorText message={form.formState.errors.quantity?.message} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Reference File</label>
        <Input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="h-12 pt-3" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Message</label>
        <Textarea {...form.register("message")} rows={5} placeholder="Tell us about quantities, deadlines, finishing, or delivery requirements..." />
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Submitting..." : "Request a Quote"}
      </Button>
    </form>
  );
}
