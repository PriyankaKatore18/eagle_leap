"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

import { submitContact } from "@/lib/api";
import { contactSchema, type ContactValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Book Publishing",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    startTransition(async () => {
      try {
        const response = await submitContact(values);
        toast.success(response.message ?? "Message received successfully.");
        form.reset();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to send your message.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Full Name *</label>
          <Input {...form.register("name")} className="h-12" placeholder="Your name" />
          <ErrorText message={form.formState.errors.name?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Email Address *</label>
          <Input {...form.register("email")} type="email" className="h-12" placeholder="you@example.com" />
          <ErrorText message={form.formState.errors.email?.message} />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Mobile Number</label>
          <Input {...form.register("phone")} className="h-12" placeholder="+91 98765 43210" />
          <ErrorText message={form.formState.errors.phone?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Service *</label>
          <select
            {...form.register("service")}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Book Publishing</option>
            <option>Printing Services</option>
            <option>Call for Paper</option>
            <option>Store Support</option>
            <option>Distribution</option>
          </select>
          <ErrorText message={form.formState.errors.service?.message} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Message *</label>
        <Textarea {...form.register("message")} rows={5} placeholder="Tell us about your requirement..." />
        <ErrorText message={form.formState.errors.message?.message} />
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Sending..." : "Submit Enquiry"}
      </Button>
    </form>
  );
}
