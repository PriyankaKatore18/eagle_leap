import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  light?: boolean;
  size?: "xs" | "sm" | "md";
  variant?: "horizontal" | "stacked";
  className?: string;
  priority?: boolean;
};

export function SiteLogo({ light = false, size = "sm", variant = "stacked", className, priority = false }: SiteLogoProps) {
  const stackedDimensions = {
    xs: { src: "/brand/eagle-leap-publication-logo.svg", width: 88, height: 78, heightClass: "h-10" },
    sm: { src: "/brand/eagle-leap-publication-logo.svg", width: 118, height: 105, heightClass: "h-12" },
    md: { src: "/brand/eagle-leap-publication-logo.svg", width: 156, height: 139, heightClass: "h-16" },
  } as const;

  const horizontalDimensions = {
    xs: { src: "/brand/eagle-leap-publication-logo-horizontal.svg", width: 194, height: 52, heightClass: "h-9" },
    sm: { src: "/brand/eagle-leap-publication-logo-horizontal.svg", width: 236, height: 62, heightClass: "h-11" },
    md: { src: "/brand/eagle-leap-publication-logo-horizontal.svg", width: 284, height: 75, heightClass: "h-14" },
  } as const;

  const current = (variant === "horizontal" ? horizontalDimensions : stackedDimensions)[size];

  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center", className)} aria-label="Eagle Leap Publication home">
      <span
        className={cn(
          "inline-flex rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]",
          light ? "bg-white/95 p-2 shadow-soft" : "",
        )}
      >
        <Image
          src={current.src}
          alt="Eagle Leap Publication"
          width={current.width}
          height={current.height}
          priority={priority}
          className={cn("w-auto", current.heightClass)}
        />
      </span>
    </Link>
  );
}
