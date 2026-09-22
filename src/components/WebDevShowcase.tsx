"use client";

import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { BookingButton } from "./BookingButton";

// Web-development showcase: a compact clinic homepage inside a browser frame
// (the layout we build), with the message + pillars to its left. An original
// demo clinic ("Nord Dental"), clearly labelled "Exempel".

// CliniQ-aligned palette (matches the phone screens: soft teal + deep navy).
const NAVY = "#123b45";
const TEAL = "#3d8a97";
const MINT = "#e8f1f2";
const TINK = "#16333a";
const TMUT = "#5f746c";

const PILLARS = [
  { label: "Snabb", body: "Laddar på under en sekund. Långsamma sidor tappar besökare innan de ser er.", icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" /> },
  { label: "Byggd för mobilen", body: "De flesta söker i telefonen. Sidan känns byggd för den — inte hopklämd.", icon: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" strokeLinecap="round" /></> },
  { label: "Boka alltid nära", body: "Telefon och bokning i räckhåll på varje skärm — det är där tider tappas.", icon: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" /></> },
  { label: "Mätt från dag ett", body: "Varje samtal och bokning spåras, så vi vet vad som faktiskt fungerar.", icon: <><path d="M4 19V10M10 19V4M16 19v-7" strokeLinecap="round" /><path d="M4 19h14" strokeLinecap="round" /></> },
];

// A compact clinic homepage we build — CliniQ-aligned, matching the phone.
function MockDesktop() {
  const services: { t: string; p: string; dark?: boolean }[] = [
    { t: "Undersökning", p: "från 495 kr" },
    { t: "Implantat", p: "från 14 900 kr" },
    { t: "Tandblekning", p: "1 995 kr" },
    { t: "Akuttid", p: "995 kr", dark: true },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-ink/12 bg-white shadow-[0_1px_2px_rgba(16,61,69,0.06),0_40px_70px_-40px_rgba(16,61,69,0.4)]">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-cream-soft px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
        <div className="ml-1.5 flex flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[9px] text-ink/45">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="#1a8a4b" strokeWidth="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#1a8a4b" strokeWidth="2" /></svg>
          norddental.se
        </div>
        <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink/30">Exempel</span>
      </div>

      {/* nav */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-[14px] font-bold tracking-tight" style={{ color: NAVY }}>
          Nord<span style={{ color: TEAL }}>Dental</span>
        </span>
        <div className="hidden items-center gap-3.5 text-[8.5px] font-semibold md:flex" style={{ color: TINK }}>
          <span style={{ color: TEAL }}>Hem</span><span>Behandlingar</span><span>Priser</span><span>Om oss</span><span>Kontakt</span>
        </div>
        <span className="rounded-full px-3 py-1 text-[8px] font-bold text-white" style={{ background: NAVY }}>Boka tid</span>
      </div>

      {/* hero: photo right, navy-gradient text panel left */}
      <div className="relative mx-3 overflow-hidden rounded-2xl" style={{ height: 210 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/clinic-hero.webp" alt="Tandläkare med patient" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "62% 45%", transform: "scaleX(-1)" }} />
        <div className="absolute inset-y-0 left-0 flex w-[60%] flex-col justify-center p-4" style={{ background: `linear-gradient(120deg, ${MINT} 70%, transparent)` }}>
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.1em] shadow-sm" style={{ color: TEAL }}>
            <svg viewBox="0 0 24 24" width="7" height="7" fill="#ffb020"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></svg>
            4,9 · 320 omdömen
          </span>
          <div className="mt-2 font-display text-[20px] font-bold leading-[1.02] tracking-tightest" style={{ color: NAVY }}>
            Friska leenden,<br /><span style={{ color: TEAL }}>glada liv</span>
          </div>
          <p className="mt-1.5 max-w-[10.5rem] text-[8px] leading-snug" style={{ color: TMUT }}>Mild vård, modern teknik och ett team dedikerat till ditt leende.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1.5 text-[8px] font-bold text-white shadow-sm" style={{ background: NAVY }}>Boka tid →</span>
            <span className="inline-flex items-center gap-1 text-[8px] font-semibold" style={{ color: NAVY }}>
              <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke={TEAL} strokeWidth="2" aria-hidden="true"><path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" strokeLinejoin="round" /></svg>
              071-234 56 78
            </span>
          </div>
        </div>
      </div>

      {/* service price cards (matches the phone) — float ON TOP of the hero's
          lower edge, fully visible above it. */}
      <div className="relative z-20 mx-4 mb-4 -mt-8 grid grid-cols-4 gap-2">
        {services.map((s) => (
          <div key={s.t} className="rounded-xl p-2.5 shadow-[0_10px_26px_-16px_rgba(16,48,42,0.4)]" style={{ background: s.dark ? NAVY : "#fff", border: s.dark ? "none" : "1px solid rgba(16,61,69,0.08)" }}>
            <div className="flex items-start justify-between gap-1">
              <div className="text-[8.5px] font-bold leading-tight" style={{ color: s.dark ? "#fff" : NAVY }}>{s.t}</div>
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: s.dark ? TEAL : MINT, color: s.dark ? "#fff" : NAVY }}>
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
            <div className="mt-3 text-[7px]" style={{ color: s.dark ? "rgba(255,255,255,0.6)" : TMUT }}>Per besök</div>
            <div className="text-[9px] font-bold" style={{ color: s.dark ? "#fff" : TEAL }}>{s.p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebDevShowcase() {
  return (
    <section
      id="hemsida"
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
    >
      {/* Top: message (left) + clinic mock (right) */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="max-w-xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Vi bygger hemsidan</div>
            <HighlightReveal
              as="h2"
              barTheme="light"
              className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tightest text-ink sm:text-5xl"
              lines={["Klicket konverterar inte", "om sidan inte är rätt."]}
            />
            <p className="mt-6 text-lg leading-relaxed text-sage">
              Vi kör inte bara annonser till en sida någon annan byggt. Vi bygger själva
              hemsidan — snabb, byggd för mobilen och gjord för ett enda mål: att förvandla
              besökaren till en bokad tid.
            </p>
            <div className="mt-8">
              <BookingButton>Se vad vi kan bygga</BookingButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <MockDesktop />
        </Reveal>
      </div>

      {/* Below: the four pillars in a clean row */}
      <Reveal delay={80}>
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.label}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{p.icon}</svg>
              </span>
              <div className="mt-3 font-display text-base font-bold tracking-tightest text-ink">{p.label}</div>
              <div className="mt-1 text-sm leading-snug text-ink/55">{p.body}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-ink/55">
          Illustration av en sida vi kan bygga, inte en färdig kundsida. Prestanda- och
          exempelsiffrorna är illustrativa — verkligt resultat beror på innehåll och omfattning.
        </p>
      </Reveal>
    </section>
  );
}
