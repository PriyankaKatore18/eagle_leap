type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  invert?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  invert = false,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "section-reveal mx-auto max-w-3xl text-center" : "section-reveal max-w-3xl"}>
      {eyebrow ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm sm:tracking-[0.34em]">{eyebrow}</p> : null}
      <h2
        className={`mt-3 font-display text-[1.95rem] font-extrabold leading-[1.24] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.85rem] ${invert ? "text-white" : "text-primary"} ${titleClassName ?? ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-sm leading-relaxed sm:text-base md:mt-5 md:text-lg ${invert ? "text-white/80" : "text-muted-foreground"} ${descriptionClassName ?? ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
