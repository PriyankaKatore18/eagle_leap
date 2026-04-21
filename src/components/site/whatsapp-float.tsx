"use client";

import Link from "next/link";
import { useEffect, useState, useTransition, type FormEvent } from "react";
import { ArrowRight, BookOpen, FileText, MessageCircle, Phone, Printer, ScrollText, Send, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site-config";
import { submitContact } from "@/lib/api";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/schemas/forms";

const quickTopics = [
  {
    label: "Publish my book",
    service: "Book Publishing",
    prompt: "I want to publish my book and need guidance on ISBN, design, and marketplace listing.",
    href: "/publish-my-book",
    icon: BookOpen,
  },
  {
    label: "Printing support",
    service: "Printing Services",
    prompt: "I need printing support for books, magazines, certificates, or institutional materials.",
    href: "/printing",
    icon: Printer,
  },
  {
    label: "Submit paper",
    service: "Call for Paper",
    prompt: "I want to submit a paper or chapter and need details about publication, certificate, and review steps.",
    href: siteConfig.paperSubmissionLink,
    icon: FileText,
  },
  {
    label: "Journal help",
    service: "Journal Support",
    prompt: "I need help with journal details, ISSN information, or the current issue.",
    href: siteConfig.journalWebsite,
    icon: ScrollText,
  },
] as const;

type ChatFormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function createInitialForm(): ChatFormState {
  return {
    name: "",
    email: "",
    phone: "",
    service: quickTopics[0].service,
    message: quickTopics[0].prompt,
  };
}

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<ChatFormState>(createInitialForm);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const activeTopic = quickTopics.find((topic) => topic.service === form.service) ?? quickTopics[0];
  const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
  const whatsappText = `Hello Eagle Leap Publication, I need help with ${form.service.toLowerCase()}. ${form.message}`.trim();
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const handleTopicSelect = (service: (typeof quickTopics)[number]["service"]) => {
    const selectedTopic = quickTopics.find((topic) => topic.service === service);

    if (!selectedTopic) {
      return;
    }

    setForm((current) => ({
      ...current,
      service: selectedTopic.service,
      message: selectedTopic.prompt,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please fill in the required details.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await submitContact(parsed.data);
        toast.success(response.message ?? "Thanks. Our team will contact you shortly.");
        setForm(createInitialForm());
        setIsOpen(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to send your enquiry.");
      }
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-1rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Publishing assistant"
          className="w-[min(26rem,calc(100vw-1rem))] overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[0_28px_90px_-26px_rgba(15,23,42,0.45)]"
          role="dialog"
        >
          <div className="gradient-brand px-5 py-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Live publishing help
                </div>
                <h3 className="mt-3 text-[1.9rem] font-extrabold leading-[1.12] text-white">Chat with Eagle Leap</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                  Ask about book publishing, ISBN support, printing, or paper submission and we will guide you to the right next step.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[min(70vh,42rem)] space-y-5 overflow-y-auto bg-background p-4 sm:p-5">
            <div className="space-y-3">
              <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-secondary px-4 py-3 text-sm leading-relaxed text-primary shadow-soft">
                Hi, I am your publishing assistant. Tell me what you want to do and I will point you in the right direction.
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-secondary px-4 py-3 text-sm leading-relaxed text-primary shadow-soft">
                Most visitors ask us about publishing a book, printing college material, journal help, or submitting a paper.
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Choose a topic</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {quickTopics.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = topic.service === form.service;

                  return (
                    <button
                      key={topic.service}
                      type="button"
                      onClick={() => handleTopicSelect(topic.service)}
                      className={cn(
                        "rounded-2xl border px-3 py-3 text-left shadow-soft transition-smooth",
                        isActive ? "border-accent bg-accent/10 text-primary" : "border-border bg-card text-primary hover:border-accent/50 hover:bg-secondary",
                      )}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-primary/70")} />
                        {topic.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{topic.service}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Recommended page</p>
                  <p className="mt-2 text-base font-semibold text-primary">{activeTopic.label}</p>
                </div>
                <Button asChild variant="ghost" size="sm" className="h-9 px-3 text-primary">
                  <Link href={activeTopic.href}>
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 text-sm font-semibold text-primary hover:border-accent/40 hover:bg-accent/10"
              >
                <MessageCircle className="h-4 w-4 text-accent" />
                WhatsApp
              </a>
              <a
                href={telHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 text-sm font-semibold text-primary hover:border-accent/40 hover:bg-accent/10"
              >
                <Phone className="h-4 w-4 text-accent" />
                Call us
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.5rem] border border-border bg-card p-4 shadow-soft">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Start the conversation</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Share your details and requirement. We will follow up with the right package, submission path, or consultation.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Full name"
                  className="h-11 rounded-xl"
                />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email address"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <Input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Mobile number"
                  className="h-11 rounded-xl"
                />
                <div className="inline-flex h-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 px-4 text-sm font-semibold text-accent">
                  {form.service}
                </div>
              </div>

              <Textarea
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                rows={4}
                placeholder="Tell us what you need help with..."
                className="rounded-2xl"
              />

              <Button type="submit" className="gradient-accent h-12 w-full rounded-2xl text-accent-foreground" disabled={isPending}>
                {isPending ? "Sending..." : "Send enquiry"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      ) : null}

      <div className="flex items-center gap-3">
        <div className={cn("hidden rounded-full border border-border bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-card backdrop-blur md:block", isOpen && "opacity-0")}>
          Chat with us
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Open chat assistant"
          className="group relative flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-white shadow-elegant hover:scale-105"
        >
          <span className="absolute inset-0 rounded-full bg-primary/35 animate-ping" />
          <span className="absolute -right-1 top-0 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white shadow-lg">
            1
          </span>
          <MessageCircle className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
