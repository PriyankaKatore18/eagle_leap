import { cn } from "@/lib/utils";

type AsyncSectionPlaceholderProps = {
  variant?: "form" | "browser" | "portal" | "faq";
  className?: string;
  id?: string;
};

export function AsyncSectionPlaceholder({ variant = "form", className, id }: AsyncSectionPlaceholderProps) {
  if (variant === "browser") {
    return (
      <div id={id} className={cn("space-y-8", className)}>
        <div className="animate-pulse rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="h-12 rounded-xl bg-secondary" />
              <div className="h-28 rounded-2xl bg-secondary" />
              <div className="h-12 rounded-xl bg-secondary" />
              <div className="h-12 rounded-xl bg-secondary" />
            </div>
            <div className="space-y-6">
              <div className="h-16 rounded-2xl bg-secondary" />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="overflow-hidden rounded-3xl border border-border bg-background shadow-card">
                    <div className="aspect-[4/5] bg-secondary" />
                    <div className="space-y-3 p-6">
                      <div className="h-4 w-24 rounded-full bg-secondary" />
                      <div className="h-6 rounded bg-secondary" />
                      <div className="h-4 w-3/4 rounded bg-secondary" />
                      <div className="h-4 rounded bg-secondary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "portal") {
    return (
      <div id={id} className={cn("animate-pulse rounded-3xl border border-border bg-card p-8 shadow-card", className)}>
        <div className="grid h-auto grid-cols-2 gap-2 rounded-2xl bg-secondary p-1.5">
          <div className="h-11 rounded-xl bg-background" />
          <div className="h-11 rounded-xl bg-secondary/80" />
        </div>
        <div className="mt-6 space-y-5">
          <div className="h-12 rounded-xl bg-secondary" />
          <div className="h-12 rounded-xl bg-secondary" />
          <div className="h-12 rounded-xl bg-secondary" />
          <div className="h-24 rounded-2xl bg-secondary" />
          <div className="h-12 rounded-xl bg-secondary" />
        </div>
      </div>
    );
  }

  if (variant === "faq") {
    return (
      <div id={id} className={cn("animate-pulse rounded-3xl border border-border bg-card px-6 shadow-card", className)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={cn("space-y-3 py-5", index !== 4 && "border-b border-border")}>
            <div className="h-6 w-5/6 rounded bg-secondary" />
            <div className="h-4 w-full rounded bg-secondary" />
            <div className="h-4 w-2/3 rounded bg-secondary" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id={id} className={cn("animate-pulse rounded-3xl border border-border bg-card p-8 shadow-card", className)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-12 rounded-xl bg-secondary" />
        <div className="h-12 rounded-xl bg-secondary" />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="h-12 rounded-xl bg-secondary" />
        <div className="h-12 rounded-xl bg-secondary" />
      </div>
      <div className="mt-5 h-12 rounded-xl bg-secondary" />
      <div className="mt-5 h-28 rounded-2xl bg-secondary" />
      <div className="mt-5 h-12 rounded-xl bg-secondary" />
    </div>
  );
}
