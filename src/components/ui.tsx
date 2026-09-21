import type { ReactNode } from "react";

function Arrow({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      className={`cta009__icon cta009__icon--${side}`}
    >
      <path
        d="M14 19L21 12L14 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M21 12H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

// Primary CTA pill with the reference site's sliding-arrow hover.
export function CtaButton({
  children,
  href,
  external,
  full,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  full?: boolean;
  // default = forest pill (sand sections); light = sand pill (dark
  // sections); accent = sage pill (the fixed CTA that crosses both).
  variant?: "default" | "light" | "accent";
  className?: string;
}) {
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;
  const variantClass =
    variant === "light"
      ? "cta009--light"
      : variant === "accent"
        ? "cta009--accent"
        : "";
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`cta009 ${variantClass} ${full ? "cta009--full" : ""} ${className}`}
    >
      <span className="cta009__inner">
        <Arrow side="left" />
        <span className="cta009__text">{children}</span>
        <Arrow side="right" />
      </span>
      <span className="cta009__bg" aria-hidden="true" />
    </a>
  );
}

// Text whose characters roll up on hover of the nearest `.roll` ancestor.
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll-clip">
      <span>{children}</span>
    </span>
  );
}
