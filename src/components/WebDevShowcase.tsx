"use client";

import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { BookingButton } from "./BookingButton";

// Web-development showcase: a compact clinic homepage inside a browser frame
// (the layout we build), with the message + pillars to its left. An original
// demo clinic ("Nord Dental"), clearly labelled "Exempel".

const TEAL = "#1c5348";
const MINT = "#e6f2ec";
const TINK = "#16302a";
const TMUT = "#5f746c";

const PILLARS = [
  { label: "Snabb", body: "Laddar på under en sekund. Långsamma sidor tappar besökare innan de ser er.", icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" /> },
  { label: "Byggd för mobilen", body: "De flesta söker i telefonen. Sidan känns byggd för den — inte hopklämd.", icon: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" strokeLinecap="round" /></> },
  { label: "Boka alltid nära", body: "Telefon och bokning i räckhåll på varje skärm — det är där tider tappas.", icon: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" /></> },
  { label: "Mätt från dag ett", body: "Varje samtal och bokning spåras, så vi vet vad som faktiskt fungerar.", icon: <><path d="M4 19V10M10 19V4M16 19v-7" strokeLinecap="round" /><path d="M4 19h14" strokeLinecap="round" /></> },
];

// A compact clinic homepage we build — matches the reference layout.
function MockDesktop() {
  const stats = [
    { n: "3 500+", l: "Nöjda patienter", d: <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" /> },
    { n: "20+", l: "År av erfarenhet", d: <><circle cx="12" cy="9" r="5" /><path d="M9 13l-1.5 8L12 18l4.5 3L15 13" strokeLinejoin="round" /></> },
    { n: "99%", l: "Patientnöjdhet", d: <path d="M7 11v9M7 11l4-8a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.4l-1.5 6A2 2 0 0 1 20 20H7" strokeLinejoin="round" /> },
    { n: "4 000+", l: "Friska leenden", d: <path d="M12 3c-2.5 0-4 2-4 5 0 4 2 6 2.5 9 .4 2.4 1 4 2 4s1.2-2 1.5-4c.2-1.3.5-2 2-2s1.8.7 2 2c.3 2 .5 4 1.5 4s1.6-1.6 2-4c.5-3 2.5-5 2.5-9 0-3-1.5-5-4-5-1.6 0-2.4.8-4 .8S9.6 3 8 3z" strokeLinejoin="round" /> },
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

      {/* nav — text-only wordmark */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="leading-none" aria-hidden="true">
          <span className="block font-display text-[13px] font-bold tracking-tightest" style={{ color: TINK }}>Nord Dental</span>
          <span className="block text-[6px] font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>Tandklinik</span>
        </span>
        <div className="hidden items-center gap-3 text-[8.5px] font-semibold md:flex" style={{ color: TINK }}>
          <span style={{ color: TEAL }}>Hem</span><span>Behandlingar</span><span>Priser</span><span>Om oss</span><span>Blogg</span><span>Kontakt</span>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[8px] font-bold text-white" style={{ background: TEAL }}>Boka tid</span>
      </div>

      {/* hero: photo right, mint blob + text left */}
      <div className="relative mx-3 overflow-hidden rounded-xl" style={{ height: 250 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/clinic-hero.webp" alt="Tandläkare med patient" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "60% 45%", transform: "scaleX(-1)" }} />
        <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-center p-4" style={{ background: MINT, borderRadius: "0 20px 96px 0" }}>
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.1em]" style={{ color: TEAL }}>★ Patientfokuserad tandvård</span>
          <div className="mt-1.5 font-display text-[19px] font-bold leading-[1.02] tracking-tightest" style={{ color: TINK }}>
            Friska leenden,<br /><span style={{ color: TEAL }}>glada liv</span>
          </div>
          <p className="mt-1 max-w-[10rem] text-[8px] leading-snug" style={{ color: TMUT }}>Mild vård, modern teknik och ett vänligt team dedikerat till ditt leende.</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1.5 text-[8px] font-bold text-white" style={{ background: TEAL }}>Boka tid</span>
            <span className="inline-flex items-center gap-1 text-[8px] font-semibold" style={{ color: TINK }}>
              <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke={TEAL} strokeWidth="2" aria-hidden="true"><path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" strokeLinejoin="round" /></svg>
              071-234 56 78
            </span>
          </div>
        </div>
        {/* counting badge over the seam */}
        <div className="absolute left-[52%] top-1/2 flex h-[76px] w-[76px] -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-lg">
          <div className="font-display text-[15px] font-bold leading-none tracking-tightest" style={{ color: TINK }}>4 000+</div>
          <div className="mt-0.5 px-1 text-[5.5px] leading-tight" style={{ color: TMUT }}>förbättrade leenden och räknar</div>
          <div className="mt-1 flex -space-x-1" aria-hidden="true">
            {["#f0c27b", "#a1c4fd", "#f6a6b2"].map((c) => (<span key={c} className="h-3 w-3 rounded-full border border-white" style={{ background: c }} />))}
          </div>
        </div>
      </div>

      {/* stats card overlapping the hero */}
      <div className="mx-4 -mt-3 mb-4 grid grid-cols-4 gap-1 rounded-xl border border-ink/8 bg-white p-2.5 shadow-[0_10px_30px_-14px_rgba(16,48,42,0.3)]">
        {stats.map((s, i) => (
          <div key={s.l} className={`px-1 text-center ${i > 0 ? "border-l border-ink/8" : ""}`}>
            <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(47,138,122,0.12)", color: TEAL }} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">{s.d}</svg>
            </span>
            <div className="mt-1 font-display text-[13px] font-bold leading-none tracking-tightest" style={{ color: TINK }}>{s.n}</div>
            <div className="mt-0.5 text-[6.5px] font-semibold" style={{ color: TMUT }}>{s.l}</div>
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
