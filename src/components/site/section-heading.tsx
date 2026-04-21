type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = false, invert = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "section-reveal mx-auto max-w-3xl text-center" : "section-reveal max-w-3xl"}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent sm:text-sm">{eyebrow}</p> : null}
      <h2 className={`mt-3 font-display text-3xl font-extrabold leading-[1.08] md:text-4xl lg:text-[3.15rem] ${invert ? "text-white" : "text-primary"}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${invert ? "text-white/80" : "text-muted-foreground"}`}>{description}</p>
      ) : null}
    </div>
  );
}
