"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { paperSubjects } from "@/data/forms-data";
import { submitPaperSubmission } from "@/lib/api";
import { paperSubmissionSchema, type PaperSubmissionValues } from "@/schemas/forms";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-destructive">{message}</p> : null;
}

export function PaperSubmissionForm() {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<PaperSubmissionValues>({
    resolver: zodResolver(paperSubmissionSchema),
    defaultValues: {
      authorName: "",
      paperTitle: "",
      email: "",
      mobile: "",
      subjectArea: paperSubjects[0] ?? "",
      message: "",
    },
  });

  const onSubmit = (values: PaperSubmissionValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value ?? ""));
        });
        if (file) {
          formData.append("paper", file);
        }

        const response = await submitPaperSubmission(formData);
        toast.success(response.message ?? "Paper submitted successfully.");
        form.reset();
        setFile(null);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to submit paper details.");
      }
    });
  };

  return (
    <form id="paper-submission-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-card">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Author Name *</label>
          <Input {...form.register("authorName")} className="h-12" placeholder="Author full name" />
          <ErrorText message={form.formState.errors.authorName?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Paper Title *</label>
          <Input {...form.register("paperTitle")} className="h-12" placeholder="Enter paper or chapter title" />
          <ErrorText message={form.formState.errors.paperTitle?.message} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Email *</label>
          <Input {...form.register("email")} type="email" className="h-12" placeholder="you@example.com" />
          <ErrorText message={form.formState.errors.email?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Mobile *</label>
          <Input {...form.register("mobile")} className="h-12" placeholder="+91 98765 43210" />
          <ErrorText message={form.formState.errors.mobile?.message} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-primary">Subject Area *</label>
          <select
            {...form.register("subjectArea")}
            className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {paperSubjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <ErrorText message={form.formState.errors.subjectArea?.message} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Upload Paper</label>
        <Input type="file" accept=".pdf,.doc,.docx" className="h-12 pt-3" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-primary">Additional Notes</label>
        <Textarea {...form.register("message")} rows={4} placeholder="Share abstract details, institution, or reviewer notes..." />
      </div>
      <Button type="submit" size="lg" className="gradient-accent w-full text-accent-foreground" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Paper"}
      </Button>
    </form>
  );
}
