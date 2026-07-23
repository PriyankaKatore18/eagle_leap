"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { ArrowRight, Loader2, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatAssistantFallback, chatAssistantTopics, type ChatAssistantTopic } from "@/data/chat-assistant";
import { siteConfig } from "@/data/site-config";
import { submitContact } from "@/lib/api";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/schemas/forms";

type AssistantReply = {
  question: string;
  answer: string;
  service: string;
  cta?: {
    label: string;
    href: string;
  };
};

type ChatFormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const defaultTopic: ChatAssistantTopic =
  chatAssistantTopics[0] ??
  {
    id: "publishing-help",
    label: "Publishing help",
    question: "How can Eagle Leap help me?",
    service: "Book Publishing",
    keywords: ["publish", "book"],
    answer: "Ask about publishing, ISBN support, pricing, printing, or paper submission and we will guide you forward.",
    leadPrompt: "I want guidance on publishing my book.",
  };

function createInitialForm(service = defaultTopic.service, message = defaultTopic.leadPrompt): ChatFormState {
  return {
    name: "",
    email: "",
    phone: "",
    service,
    message,
  };
}

function createInitialReply(): AssistantReply {
  return {
    question: defaultTopic.question,
    answer: defaultTopic.answer,
    service: defaultTopic.service,
    cta: defaultTopic.cta,
  };
}

function findTopicByMessage(input: string) {
  const normalized = input.toLowerCase().trim();

  if (!normalized) {
    return null;
  }

  let bestMatch: ChatAssistantTopic | null = null;
  let bestScore = 0;

  for (const topic of chatAssistantTopics) {
    let score = 0;

    for (const keyword of topic.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(" ") ? 3 : 1;
      }
    }

    if (normalized.includes(topic.service.toLowerCase())) {
      score += 2;
    }

    if (normalized.includes(topic.label.toLowerCase()) || normalized.includes(topic.question.toLowerCase())) {
      score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = topic;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isResolving, setIsResolving] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeTopicId, setActiveTopicId] = useState(defaultTopic.id);
  const [activeReply, setActiveReply] = useState<AssistantReply>(createInitialReply);
  const [activeService, setActiveService] = useState(defaultTopic.service);
  const [form, setForm] = useState<ChatFormState>(() => createInitialForm());
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) {
        clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
  const whatsappText = `Hello Eagle Leap Publication, I need help with ${activeService.toLowerCase()}. ${form.message}`.trim();
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const syncLeadForm = (service: string, message: string) => {
    setActiveService(service);
    setForm((current) => ({
      ...current,
      service,
      message,
    }));
  };

  const queueReply = (reply: AssistantReply, topicId = "") => {
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
    }

    setIsResolving(true);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    replyTimerRef.current = setTimeout(() => {
      setActiveReply(reply);
      setActiveTopicId(topicId);
      setIsResolving(false);
    }, 250);
  };

  const handleTopicSelect = (topic: ChatAssistantTopic) => {
    if (isResolving) {
      return;
    }

    setShowLeadForm(false);
    syncLeadForm(topic.service, topic.leadPrompt);
    queueReply(
      {
        question: topic.question,
        answer: topic.answer,
        service: topic.service,
        cta: topic.cta,
      },
      topic.id,
    );
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    setInputValue("");
    setShowLeadForm(false);

    const matchedTopic = findTopicByMessage(trimmed);

    if (matchedTopic) {
      syncLeadForm(matchedTopic.service, matchedTopic.leadPrompt);
      queueReply(
        {
          question: matchedTopic.question,
          answer: matchedTopic.answer,
          service: matchedTopic.service,
          cta: matchedTopic.cta,
        },
        matchedTopic.id,
      );
      return;
    }

    syncLeadForm("General Publishing Enquiry", `${chatAssistantFallback.leadPrompt} My question is: ${trimmed}`);
    queueReply({
      question: trimmed,
      answer: chatAssistantFallback.answer,
      service: "General Publishing Enquiry",
      cta: chatAssistantFallback.cta,
    });
  };

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        setActiveTopicId("");
        setActiveReply({
          question: `Thanks, ${parsed.data.name}. What happens next?`,
          answer: "Your details have been shared with the Eagle Leap team. We will contact you shortly with the right package, printing path, or publishing next step.",
          service: parsed.data.service,
        });
        setForm(createInitialForm(parsed.data.service, parsed.data.message));
        setShowLeadForm(false);
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
          className="animate-in slide-in-from-bottom-6 zoom-in-95 fade-in-0 mb-1 flex max-h-[calc(100dvh-6.5rem)] min-h-0 w-[min(25rem,calc(100vw-0.75rem))] flex-col overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_36px_100px_-30px_rgba(15,23,42,0.5)] duration-300 sm:max-h-[calc(100dvh-7.5rem)] sm:w-[25rem]"
          role="dialog"
        >
          <div className="shrink-0 bg-[linear-gradient(135deg,#163f95_0%,#184eaa_58%,#f97316_100%)] px-4 py-3.5 text-white sm:px-5 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Instant publishing help
                </div>
                <div className="mt-3 font-sans text-[1.3rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                  Ask Eagle Leap
                </div>
                <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-white/85">
                  Ask about publishing, ISBN support, pricing, printing, or paper submission and we will guide you forward.
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

          <div className="flex min-h-0 flex-1 flex-col bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_30%,#ffffff_100%)]">
            <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-4 sm:px-5">
              <div className="space-y-6">
                <article
                  aria-live="polite"
                  className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_20px_48px_-32px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">Question answer</p>
                      <p className="mt-2 inline-flex rounded-full border border-accent/20 bg-orange-50 px-3 py-1 text-xs font-semibold text-accent">
                        {activeReply.service}
                      </p>
                    </div>
                    {activeReply.cta ? (
                      <Button asChild variant="ghost" size="sm" className="h-9 rounded-full px-3 text-primary hover:bg-slate-100">
                        <Link href={activeReply.cta.href}>
                          Open
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    ) : null}
                  </div>

                  {isResolving ? (
                    <div className="flex min-h-28 items-center gap-3 text-sm text-muted-foreground">
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-accent" />
                      Loading answer...
                    </div>
                  ) : (
                    <div>
                      <h3 className="mt-4 text-[1.18rem] font-bold leading-tight text-primary">{activeReply.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeReply.answer}</p>
                    </div>
                  )}
                </article>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Popular questions</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {chatAssistantTopics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleTopicSelect(topic)}
                        disabled={isResolving}
                        className={cn(
                          "rounded-full border px-4 py-3 text-left text-sm font-semibold shadow-[0_10px_24px_-18px_rgba(15,23,42,0.24)] transition-smooth disabled:pointer-events-none disabled:opacity-60",
                          topic.id === activeTopicId
                            ? "border-accent bg-orange-50 text-primary"
                            : "border-slate-200 bg-white text-primary hover:border-accent/40 hover:bg-slate-50",
                        )}
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>

                {showLeadForm ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-slate-50/80 p-4 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Share your details</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          Share your contact information and we will get back to you about {form.service.toLowerCase()}.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="inline-flex h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-primary hover:border-accent/30 hover:bg-orange-50"
                      >
                        Close
                      </button>
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
                ) : null}
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white/95 p-4 backdrop-blur sm:p-5">
              <form onSubmit={handleChatSubmit} className="flex items-center gap-2 rounded-[1.45rem] border border-slate-200 bg-slate-50 px-2 py-2 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.35)]">
                <Input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask about ISBN, pricing, Amazon listing..."
                  className="h-11 border-0 bg-transparent px-3 text-[0.95rem] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#163f95_0%,#184eaa_58%,#f97316_100%)] text-white shadow-lg hover:scale-105 disabled:pointer-events-none disabled:opacity-60"
                  disabled={isResolving}
                  aria-label="Send chat message"
                >
                  {isResolving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </form>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setShowLeadForm((current) => !current)}
                  className="inline-flex h-12 items-center justify-center rounded-[1rem] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-primary hover:border-accent/35 hover:bg-accent/10"
                >
                  {showLeadForm ? "Hide form" : "Share details"}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1rem] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-primary hover:border-accent/35 hover:bg-accent/10"
                >
                  <MessageCircle className="h-4 w-4 text-accent" />
                  WhatsApp
                </a>
                <a
                  href={telHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[1rem] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-primary hover:border-accent/35 hover:bg-accent/10"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  Call
                </a>
              </div>
            </div>
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
          Ask about publishing
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Open chat assistant"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1d4ed8_0%,#1e3a8a_45%,#f97316_100%)] text-white shadow-elegant hover:scale-105 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping" />
          <span className="absolute -right-1 top-0 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
            AI
          </span>
          <MessageCircle className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
