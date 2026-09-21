"use client";

import type { ReactNode } from "react";
import { openBooking } from "./BookingDrawer";

// A primary CTA that opens the booking drawer instead of linking out. Same
// pill styling as CtaButton (cta009), rendered as a <button>.
export function BookingButton({
  children,
  full,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  full?: boolean;
  variant?: "default" | "light" | "accent";
  className?: string;
}) {
  const variantClass =
    variant === "light" ? "cta009--light" : variant === "accent" ? "cta009--accent" : "";
  return (
    <button
      type="button"
      onClick={openBooking}
      className={`cta009 ${variantClass} ${full ? "cta009--full" : ""} ${className}`}
    >
      <span className="cta009__inner">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="cta009__icon cta009__icon--left"><path d="M14 19L21 12L14 5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" /><path d="M21 12H2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" /></svg>
        <span className="cta009__text">{children}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="cta009__icon cta009__icon--right"><path d="M14 19L21 12L14 5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" /><path d="M21 12H2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" /></svg>
      </span>
      <span className="cta009__bg" aria-hidden="true" />
    </button>
  );
}
