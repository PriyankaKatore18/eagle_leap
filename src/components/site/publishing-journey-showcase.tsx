import type { LucideIcon } from "lucide-react";
import { BookOpenText, CloudUpload, Feather, FilePenLine, Globe, ScanBarcode, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type JourneyTone = {
  border: string;
  corner: string;
  dashBorder: string;
  iconBorder: string;
  iconColor: string;
  labelColor: string;
  nodeBorder: string;
  nodeColor: string;
  rule: string;
};

type JourneyStep = {
  description: string;
  icon: LucideIcon;
  number: string;
  side: "left" | "right";
  title: string;
  tone: JourneyTone;
};

const publishingJourney: JourneyStep[] = [
  {
    number: "01",
    side: "left",
    title: "Submit Your Manuscript",
    description: "Upload your completed manuscript securely through our guided submission flow.",
    icon: CloudUpload,
    tone: {
      border: "border-[#f5d8be]",
      corner: "bg-[linear-gradient(135deg,#ffb26b_0%,#f97316_85%)]",
      dashBorder: "border-accent",
      iconBorder: "border-[#f5d9bf]",
      iconColor: "text-accent",
      labelColor: "text-accent",
      nodeBorder: "border-[#ff9d4e]",
      nodeColor: "text-accent",
      rule: "bg-accent",
    },
  },
  {
    number: "02",
    side: "right",
    title: "Editing & Proofreading",
    description: "Professional editors polish language, structure, and readability for a polished finish.",
    icon: FilePenLine,
    tone: {
      border: "border-[#ddd0f7]",
      corner: "bg-[linear-gradient(135deg,#b88cff_0%,#7c3aed_88%)]",
      dashBorder: "border-[#7c3aed]",
      iconBorder: "border-[#e3d9fb]",
      iconColor: "text-[#7c3aed]",
      labelColor: "text-[#7c3aed]",
      nodeBorder: "border-[#8b5cf6]",
      nodeColor: "text-[#7c3aed]",
      rule: "bg-[#7c3aed]",
    },
  },
  {
    number: "03",
    side: "left",
    title: "Cover Design & Formatting",
    description: "We create a strong cover and a clean interior layout aligned with your subject.",
    icon: BookOpenText,
    tone: {
      border: "border-[#c6e9ea]",
      corner: "bg-[linear-gradient(135deg,#6fd0d6_0%,#178f96_88%)]",
      dashBorder: "border-[#178f96]",
      iconBorder: "border-[#d2eff0]",
      iconColor: "text-[#178f96]",
      labelColor: "text-[#178f96]",
      nodeBorder: "border-[#23a3ac]",
      nodeColor: "text-[#178f96]",
      rule: "bg-[#178f96]",
    },
  },
  {
    number: "04",
    side: "right",
    title: "ISBN & Publishing",
    description: "ISBN registration, production coordination, and final publishing approvals are handled for you.",
    icon: ScanBarcode,
    tone: {
      border: "border-[#f3deb2]",
      corner: "bg-[linear-gradient(135deg,#ffd36a_0%,#e0a12d_88%)]",
      dashBorder: "border-[#e0a12d]",
      iconBorder: "border-[#f6e4bf]",
      iconColor: "text-[#d4911b]",
      labelColor: "text-[#d4911b]",
      nodeBorder: "border-[#e0a12d]",
      nodeColor: "text-[#c58314]",
      rule: "bg-[#e0a12d]",
    },
  },
  {
    number: "05",
    side: "left",
    title: "Global Distribution",
    description: "Your book is prepared for wider reach through online and direct distribution channels.",
    icon: Globe,
    tone: {
      border: "border-[#f7cade]",
      corner: "bg-[linear-gradient(135deg,#ff9bc7_0%,#ec4899_88%)]",
      dashBorder: "border-[#ec4899]",
      iconBorder: "border-[#f9d5e5]",
      iconColor: "text-[#ec4899]",
      labelColor: "text-[#ec4899]",
      nodeBorder: "border-[#ec4899]",
      nodeColor: "text-[#ec4899]",
      rule: "bg-[#ec4899]",
    },
  },
];

function JourneyPath() {
  return (
    <svg viewBox="0 0 160 1200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="journeyRibbon" x1="42" y1="0" x2="118" y2="1200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8dee7" />
          <stop offset="0.16" stopColor="#cfd6e2" />
          <stop offset="0.4" stopColor="#17386f" />
          <stop offset="0.7" stopColor="#0c275e" />
          <stop offset="1" stopColor="#f0d0b3" />
        </linearGradient>
        <linearGradient id="journeyCore" x1="92" y1="0" x2="92" y2="1200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffb35c" />
          <stop offset="1" stopColor="#f3952e" />
        </linearGradient>
        <filter id="journeyGlow" x="-40%" y="-10%" width="180%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0f274f" floodOpacity="0.18" />
        </filter>
      </defs>

      <path
        d="M98 0C98 78 44 98 44 168C44 244 112 267 112 345C112 429 40 451 40 531C40 611 116 633 116 721C116 805 52 828 52 912C52 999 107 1015 107 1087C107 1136 95 1169 82 1200"
        stroke="url(#journeyRibbon)"
        strokeWidth="34"
        strokeLinecap="round"
        fill="none"
        filter="url(#journeyGlow)"
      />
      <path
        d="M98 0C98 78 44 98 44 168C44 244 112 267 112 345C112 429 40 451 40 531C40 611 116 633 116 721C116 805 52 828 52 912C52 999 107 1015 107 1087C107 1136 95 1169 82 1200"
        stroke="url(#journeyCore)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="14 12"
        fill="none"
      />

      <ellipse cx="82" cy="1190" rx="26" ry="8" fill="#f3dac2" opacity="0.55" />
      <ellipse cx="82" cy="1190" rx="42" ry="14" fill="none" stroke="#f2d5b7" strokeWidth="2" opacity="0.42" />
    </svg>
  );
}

function DesktopJourneyCard({ step }: { step: JourneyStep }) {
  const Icon = step.icon;
  const isLeft = step.side === "left";

  return (
    <article
      className={cn(
        "group relative isolate max-w-[28rem] overflow-hidden rounded-[2.15rem] border bg-white px-7 py-7 shadow-[0_28px_65px_-48px_rgba(15,23,42,0.34)] transition-smooth hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-48px_rgba(15,23,42,0.34)] sm:px-8 sm:py-8",
        step.tone.border,
        isLeft ? "mr-auto" : "ml-auto",
      )}
    >
      <div
        className={cn(
          "absolute top-0 h-20 w-20 opacity-90",
          isLeft ? "left-0 rounded-br-[2rem]" : "right-0 rounded-bl-[2rem]",
          step.tone.corner,
        )}
      />

      <div className={cn("relative z-10 flex items-center gap-6", !isLeft && "flex-row-reverse")}>
        <div
          className={cn(
            "flex h-28 w-28 shrink-0 items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,#ffffff_0%,#fffdfb_42%,#f6efe8_100%)] shadow-[0_26px_60px_-42px_rgba(15,23,42,0.36)]",
            step.tone.iconBorder,
          )}
        >
          <Icon className={cn("h-12 w-12", step.tone.iconColor)} />
        </div>

        <div className={cn("max-w-[15rem]", !isLeft && "text-left")}>
          <p className={cn("text-xs font-semibold uppercase tracking-[0.32em]", step.tone.labelColor)}>Publishing Step</p>
          <h3 className="mt-4 text-[2rem] font-extrabold leading-[1.02] text-primary">{step.title}</h3>
          <div className={cn("mt-4 h-[3px] w-12 rounded-full", step.tone.rule)} />
          <p className="mt-5 text-[1rem] leading-8 text-slate-600">{step.description}</p>
        </div>
      </div>
    </article>
  );
}

function MobileJourneyCard({ step }: { step: JourneyStep }) {
  const Icon = step.icon;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.8rem] border bg-white px-5 py-5 shadow-[0_24px_55px_-40px_rgba(15,23,42,0.28)] sm:px-6 sm:py-6",
        step.tone.border,
      )}
    >
      <div className={cn("absolute left-0 top-0 h-16 w-16 rounded-br-[1.5rem] opacity-90", step.tone.corner)} />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,#ffffff_0%,#fffdfb_42%,#f6efe8_100%)] shadow-[0_22px_48px_-40px_rgba(15,23,42,0.36)]",
            step.tone.iconBorder,
          )}
        >
          <Icon className={cn("h-7 w-7", step.tone.iconColor)} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-[4px] bg-white text-base font-extrabold shadow-[0_16px_34px_-22px_rgba(15,23,42,0.32)]",
                step.tone.nodeBorder,
                step.tone.nodeColor,
              )}
            >
              {step.number}
            </span>
            <p className={cn("text-[0.68rem] font-semibold uppercase tracking-[0.28em]", step.tone.labelColor)}>Publishing Step</p>
          </div>

          <h3 className="mt-3 text-[1.5rem] font-extrabold leading-[1.08] text-primary">{step.title}</h3>
          <div className={cn("mt-3 h-[3px] w-10 rounded-full", step.tone.rule)} />
          <p className="mt-4 text-[0.98rem] leading-7 text-slate-600">{step.description}</p>
        </div>
      </div>
    </article>
  );
}

export function PublishingJourneyShowcase() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#ffffff_56%,#fffaf5_100%)] py-24 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,#fed7aa_0%,rgba(254,215,170,0.22)_35%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,#dbeafe_0%,rgba(219,234,254,0.18)_32%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ffedd5_0%,rgba(255,237,213,0.22)_36%,transparent_72%)] blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 text-accent sm:gap-4">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent via-accent/35 to-accent/75 sm:block lg:w-24" />
            <Sparkles className="h-4 w-4 text-[#e6a442]" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-accent sm:text-[0.82rem]">Publishing Process</p>
            <Sparkles className="h-4 w-4 text-[#e6a442]" />
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent via-accent/35 to-accent/75 sm:block lg:w-24" />
          </div>

          <h2 className="mx-auto mt-5 max-w-5xl text-balance font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-primary sm:text-[3.1rem] lg:text-[5rem]">
            <span className="block">Your Publishing Journey</span>
            <span className="mt-1 block">
              <span className="text-primary">in </span>
              <span className="text-accent">5 Simple Steps</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-500 sm:text-xl">
            From manuscript to marketplace - we guide you every step.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#e9caa3] sm:w-20" />
            <Feather className="h-4 w-4 text-[#dfad68]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#e9caa3] sm:w-20" />
          </div>
        </div>

        <div className="mt-14 lg:hidden">
          <div className="relative mx-auto max-w-2xl pl-5 sm:pl-7">
            <div className="absolute bottom-8 left-5 top-6 w-px bg-gradient-to-b from-slate-300 via-slate-400 to-slate-200 sm:left-7" />

            <div className="space-y-6">
              {publishingJourney.map((step) => (
                <div key={step.number} className="relative pl-8 sm:pl-10">
                  <div
                    className={cn(
                      "absolute left-0 top-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[5px] bg-white text-lg font-extrabold shadow-[0_18px_42px_-26px_rgba(15,23,42,0.3)]",
                      step.tone.nodeBorder,
                      step.tone.nodeColor,
                    )}
                  >
                    {step.number}
                  </div>
                  <MobileJourneyCard step={step} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-16 hidden lg:block">
          <div className="pointer-events-none absolute bottom-[7.5rem] left-1/2 top-6 w-40 -translate-x-1/2">
            <JourneyPath />
          </div>

          <div className="relative space-y-6">
            {publishingJourney.map((step) => {
              const isLeft = step.side === "left";

              return (
                <div key={step.number} className="grid min-h-[14rem] items-center lg:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)]">
                  <div className={cn(!isLeft && "invisible")}>{isLeft ? <DesktopJourneyCard step={step} /> : null}</div>

                  <div className="relative flex h-full items-center justify-center">
                    <div
                      className={cn(
                        "relative z-10 flex h-[4.9rem] w-[4.9rem] items-center justify-center rounded-full border-[6px] bg-white font-extrabold leading-none shadow-[0_22px_55px_-30px_rgba(15,23,42,0.34)]",
                        step.tone.nodeBorder,
                        step.tone.nodeColor,
                      )}
                    >
                      <span className="text-[2rem]">{step.number}</span>
                    </div>

                    <div
                      className={cn(
                        "absolute top-1/2 h-px w-12 -translate-y-1/2 border-t-2 border-dashed",
                        step.tone.dashBorder,
                        isLeft ? "right-1/2 mr-11" : "left-1/2 ml-11",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full",
                        step.tone.rule,
                        isLeft ? "left-[1.15rem]" : "right-[1.15rem]",
                      )}
                    />
                  </div>

                  <div className={cn(isLeft && "invisible")}>{!isLeft ? <DesktopJourneyCard step={step} /> : null}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl rounded-[2rem] border border-[#efdcc7] bg-white/95 px-6 py-7 shadow-[0_26px_60px_-44px_rgba(15,23,42,0.24)] sm:px-8 sm:py-8">
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:gap-8 md:text-left">
            <div className="flex shrink-0 items-center gap-3 text-[#e4ba78]">
              <span className="h-px w-8 bg-[#efd8b0] sm:w-10" />
              <BookOpenText className="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="h-px w-8 bg-[#efd8b0] sm:w-10" />
            </div>

            <div>
              <h3 className="text-[1.55rem] font-extrabold leading-[1.12] text-primary sm:text-[2.2rem]">
                We don&apos;t just publish books,
                <br className="hidden sm:block" /> we help create legacies.
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-500 sm:text-lg">
                Your story matters. Let&apos;s bring it to the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
