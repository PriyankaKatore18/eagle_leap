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

const actionButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-primary hover:border-accent/35 hover:bg-accent/10";

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
    <div className="fixed bottom-3 right-3 z-50 flex max-w-[calc(100vw-0.75rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:max-w-[calc(100vw-1.5rem)]">
      {isOpen ? (
        <section
          aria-label="Publishing assistant"
          className="mb-1 flex max-h-[calc(100dvh-6.5rem)] min-h-0 w-[min(23.25rem,calc(100vw-0.75rem))] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_32px_90px_-30px_rgba(15,23,42,0.45)] sm:max-h-[calc(100dvh-7.5rem)] sm:w-[24rem]"
          role="dialog"
        >
          <div className="shrink-0 bg-[linear-gradient(135deg,#1d4ed8_0%,#1e40af_55%,#2563eb_100%)] px-4 py-3.5 text-white sm:px-5 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Live publishing help
                </div>
                <div className="mt-3 font-sans text-[1.3rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                  Chat with Eagle Leap
                </div>
                <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-white/85">
                  Ask about book publishing, ISBN support, printing, or paper submission and we will guide you to the next step.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 hover:bg-white/20"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-white p-4 sm:p-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Choose a topic</p>
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
                        "rounded-[1.35rem] border px-3.5 py-3.5 text-left shadow-[0_10px_24px_-18px_rgba(15,23,42,0.24)] transition-smooth",
                        isActive
                          ? "border-accent bg-orange-50 text-primary"
                          : "border-slate-200 bg-white text-primary hover:border-accent/40 hover:bg-slate-50",
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

            <div className="rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Recommended page</p>
                  <p className="mt-2 text-[1.05rem] font-semibold text-primary">{activeTopic.label}</p>
                </div>
                <Button asChild variant="ghost" size="sm" className="h-9 rounded-full px-3 text-primary hover:bg-slate-100">
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
                className={actionButtonClass}
              >
                <MessageCircle className="h-4 w-4 text-accent" />
                WhatsApp
              </a>
              <a
                href={telHref}
                className={actionButtonClass}
              >
                <Phone className="h-4 w-4 text-accent" />
                Call us
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-slate-50/70 p-4 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Start the conversation</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Share your details and requirement. We will follow up with the right package, submission path, or consultation.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Full name"
                  className="h-11 rounded-[1rem] border-slate-200 bg-white shadow-none"
                />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email address"
                  className="h-11 rounded-[1rem] border-slate-200 bg-white shadow-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <Input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Mobile number"
                  className="h-11 rounded-[1rem] border-slate-200 bg-white shadow-none"
                />
                <div className="inline-flex h-11 items-center justify-start rounded-[1rem] border border-accent/25 bg-orange-50 px-4 text-sm font-semibold text-accent sm:justify-center">
                  {form.service}
                </div>
              </div>

              <Textarea
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                rows={3}
                placeholder="Tell us what you need help with..."
                className="rounded-[1.2rem] border-slate-200 bg-white shadow-none"
              />

              <Button type="submit" className="gradient-accent h-12 w-full rounded-[1rem] text-accent-foreground" disabled={isPending}>
                {isPending ? "Sending..." : "Send enquiry"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      ) : null}

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "hidden rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-card backdrop-blur md:block",
            isOpen && "opacity-0",
          )}
        >
          Chat with us
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Open chat assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1d4ed8_0%,#1e3a8a_100%)] text-white shadow-elegant hover:scale-105 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping" />
          <span className="absolute -right-1 top-0 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white shadow-lg">
            1
          </span>
          <MessageCircle className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
