"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

// A scroll-driven "patient journey". The phone stays fixed centre-stage while
// the captions scroll in one at a time like a normal page — you don't see the
// next caption until you scroll to it, and when it lands the phone's screen
// changes. It opens on the exact glossy 3D tooth (phone hidden), then a Google
// local search, a clean clinic site, a booking and a confirmation — all in a
// real clinic-app aesthetic (not the agency's own brand). Desktop pins +
// animates; mobile is a vertical reveal.

const QUERY = "tandimplantat nära mig";
const DOMAIN = "er-tandklinik.se";
const CITY = "Stockholm";

// Clean clinic-app palette (kept distinct from the TXagency brand so the phone
// reads as a client's clinic, not our agency).
const BLUE = "#2f6df6";
const BLUE_DK = "#2456c8";
const INKC = "#16233f";
const MUT = "#64748b";
const LIME = "#d6ec8b";
const LIMEINK = "#3f5218";
const SKY = "#eaf1ff";

// CliniQ-inspired premium clinic palette (soft teal + deep navy) for the
// site / booking / confirmation screens — the climax of the journey.
const NAVY = "#123b45";
const NAVY_DK = "#0d2c34";
const TEAL = "#3d8a97";
const TEAL_DK = "#2f6f7b";
const MIST = "#e8f1f2";

// A clean doctor avatar (self-contained silhouette on a soft teal disc).
function DocAvatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm"
      style={{ width: size, height: size, background: `linear-gradient(160deg, #cfe6ea, ${TEAL})` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none">
        <circle cx="12" cy="9" r="4" fill="#fff" opacity="0.94" />
        <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" fill="#fff" opacity="0.94" />
      </svg>
    </span>
  );
}

// Little star glyph for ratings.
function Star({ s = 9 }: { s?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="#ffd76a" aria-hidden="true">
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

// Up-right arrow used on the CliniQ-style cards.
function ArrowUR({ s = 12 }: { s?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CAPS = [
  { n: "01", title: "Det börjar med en värk", body: "03:00 på natten vaknar någon i ert område av en värk som inte går att sova bort — och tar upp telefonen för att hitta hjälp nu, inte imorgon." },
  { n: "02", title: "De söker på Google", body: "”tandimplantat nära mig”. Frågan är bara: vem dyker upp överst — och ser rätt ut?" },
  { n: "03", title: "De klickar in på er sida", body: "En snabb, tydlig sida byggd för exakt det de söker — med bokning och nummer överst." },
  { n: "04", title: "De bokar direkt", body: "Formuläret tar 30 sekunder. Numret finns kvar om de hellre vill ringa." },
  { n: "05", title: "Bekräftat", body: "En ny patient i kalendern — spårad hela vägen tillbaka till sökningen." },
];
const N = CAPS.length; // 6 steps
const SW = 300;
const SH = 650;
const ROW = 430; // large spacing so the next caption is off-screen until you scroll

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Assisted / "magnetic" mapping: each step dwells, then hands off quickly.
function dwell(raw: number) {
  const seg = Math.floor(raw);
  const fr = raw - seg;
  return seg + ease(clamp((fr - 0.35) / 0.4));
}

// ---- shared bits -----------------------------------------------------------
function StatusBar({ dark }: { dark?: boolean }) {
  const c = dark ? "rgba(233,230,221,0.8)" : "rgba(22,35,63,0.7)";
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold tabular-nums" style={{ color: c }}>
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true"><rect x="0" y="3" width="2.5" height="8" rx="1" fill="currentColor"/><rect x="4" y="1.5" width="2.5" height="9.5" rx="1" fill="currentColor"/><rect x="8" y="0" width="2.5" height="11" rx="1" fill="currentColor" opacity="0.4"/></svg>
        <span className="inline-block h-2.5 w-5 rounded-[3px] border border-current opacity-70" />
      </span>
    </div>
  );
}

// ---- 1. lock screen (night, the ache) --------------------------------------
function ScreenLock(_p: { cp: number }) {
  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-[#0e343b] to-[#071e22] pb-8">
      <div>
        <StatusBar dark />
        <div className="mt-14 text-center">
          <div className="font-display text-[76px] font-bold leading-none tracking-tightest text-cream">03:02</div>
          <div className="mt-1 text-[13px] font-semibold text-cream/55">Natt mot tisdag 12 nov</div>
        </div>
        <div className="mx-4 mt-8 flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-cream">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M8 3c-2.5 0-4 2-4 5 0 4 2 6 2.5 9 .4 2.4 1 4 2 4s1.2-2 1.5-4c.2-1.3.5-2 2-2s1.8.7 2 2c.3 2 .5 4 1.5 4s1.6-1.6 2-4c.5-3 2.5-5 2.5-9 0-3-1.5-5-4-5-1.6 0-2.4.8-4 .8S9.6 3 8 3z" fill="currentColor"/></svg>
          </span>
          <div>
            <div className="text-[12px] font-bold text-cream">Det värker igen</div>
            <div className="text-[11px] text-cream/60">Måste hitta en tandläkare som kan ta emot…</div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-xl">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#5f6368" strokeWidth="2"/><path d="m20 20-3-3" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[13px] text-ink/45">Sök på Google</span>
          <span className="ml-auto flex items-center gap-2.5" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" fill="#4285F4"/><path d="M6 12a6 6 0 0 0 12 0M12 18v3" stroke="#EA4335" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#4285F4" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="#EA4335" strokeWidth="1.8"/></svg>
          </span>
        </div>
        <div className="mt-6 flex justify-center"><span className="h-1 w-32 rounded-full bg-cream/40" /></div>
      </div>
    </div>
  );
}

// ---- 2. Google local search (matches a real local-ad result) ---------------
function ScreenGoogle({ cp }: { cp: number }) {
  const typed = QUERY.slice(0, Math.round(clamp((cp - 0.04) / 0.22) * QUERY.length));
  const typing = cp < 0.3;
  const finding = cp > 0.28 && cp < 0.38;
  // Results appear right after the search and stay up for the rest of the step.
  const resultsVis = clamp((cp - 0.34) / 0.1);
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="flex flex-col gap-[3px]" aria-hidden="true">
          <span className="h-[2px] w-4 bg-ink/50" /><span className="h-[2px] w-4 bg-ink/50" /><span className="h-[2px] w-4 bg-ink/50" />
        </span>
        <div className="font-display text-[22px] font-bold tracking-tight">
          <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
        </div>
        <span className="h-6 w-6 rounded-full" style={{ background: `linear-gradient(135deg,${BLUE},#3a5568)` }} aria-hidden="true" />
      </div>
      {/* search field */}
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-full border border-ink/10 px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#5f6368" strokeWidth="2"/><path d="m20 20-3-3" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
        <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
          {typed}
          {typing && <span className="ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[3px] animate-pulse bg-[#4285F4] align-middle" />}
        </span>
        {typing
          ? <span className="flex items-center gap-2.5" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" fill="#4285F4"/></svg>
            </span>
          : <span className="text-[15px] font-medium text-ink/40" aria-hidden="true">✕</span>}
      </div>
      {/* tabs */}
      <div className="mt-3 flex items-center gap-4 border-b border-ink/8 px-4 pb-2 text-[12px] font-medium">
        <span className="relative pb-2 text-ink">Alla<span className="absolute inset-x-0 -bottom-[9px] h-[2px] rounded bg-[#4285F4]" /></span>
        <span className="text-ink/50">Kartor</span>
        <span className="text-ink/50">Bilder</span>
        <span className="text-ink/50">Shopping</span>
        <span className="text-ink/40">Nyheter</span>
      </div>
      {/* body */}
      <div className="relative flex-1 px-4 pt-3">
        <div className="flex items-center justify-between text-[11px] text-ink/55">
          <span>Resultat nära dig · <b className="font-semibold text-ink/75">{CITY}</b></span>
          <span aria-hidden="true">⋮</span>
        </div>
        {finding && (
          <div className="mt-3 space-y-2.5" aria-hidden="true">
            {[100, 92, 84].map((w, i) => (<div key={i} className="h-3 rounded-full bg-ink/8" style={{ width: `${w}%` }} />))}
          </div>
        )}
        {/* results */}
        <div className="mt-3" style={{ opacity: resultsVis, transform: `translateY(${(1 - resultsVis) * 12}px)` }}>
          {/* sponsored local card */}
          <div className="rounded-2xl border border-ink/10 p-3 shadow-[0_2px_12px_rgba(16,61,69,0.08)]">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] leading-none">
                  <span className="font-bold text-ink">Annons</span><span className="text-ink/40">·</span><span className="truncate text-ink/70">{DOMAIN}</span>
                </div>
                <div className="mt-1 text-[15px] font-bold leading-tight text-ink">Er Tandklinik {CITY}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                  <span className="font-bold text-ink">4,9</span>
                  <span className="text-[#fbbc05]" aria-hidden="true">★★★★★</span>
                  <span className="text-ink/50">(128) · 0,5 km</span>
                </div>
                <div className="mt-0.5 text-[11px] text-ink/55">Tandvård · <span className="font-semibold text-[#1a8a4b]">Öppet</span></div>
              </div>
              <span className="ml-2 h-11 w-11 shrink-0 overflow-hidden rounded-lg" style={{ background: "#e8ede9", backgroundImage: "radial-gradient(circle at 60% 45%, #f0573f 0 4px, transparent 4px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)", backgroundSize: "auto, 12px 12px, 12px 12px" }} aria-hidden="true" />
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-ink/55">Akuttider idag, fast pris och erfaret implantatteam. Boka online på under en minut.</p>
            <div className="mt-2 flex items-center gap-2 border-t border-ink/8 pt-2 text-[12px] font-semibold" style={{ color: BLUE }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" strokeLinejoin="round"/></svg>
              Ring 08-000 00 00
            </div>
          </div>
          {/* second, weaker listing */}
          <div className="mt-3 px-1">
            <div className="flex items-center gap-2 text-[12px] font-semibold" style={{ color: BLUE }}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" strokeLinejoin="round"/></svg>
              Ring 08-555 55 55
            </div>
            <div className="text-[11px] text-ink/55">Annan klinik · {CITY}</div>
            <p className="mt-0.5 text-[11px] leading-snug text-ink/45">Allmän tandvård. Öppettider vardagar, ingen onlinebokning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- 3. clinic site (clean app aesthetic) ----------------------------------
function ScreenSite({ cp }: { cp: number }) {
  const rise = ease(clamp(cp / 0.5));
  const services: { t: string; p: string; dark?: boolean }[] = [
    { t: "Undersökning", p: "från 495 kr" },
    { t: "Implantat", p: "från 14 900 kr" },
    { t: "Tandblekning", p: "1 995 kr" },
    { t: "Akuttid", p: "995 kr", dark: true },
  ];
  return (
    <div className="flex h-full flex-col" style={{ background: MIST }}>
      <StatusBar />
      {/* brand bar */}
      <div className="flex items-center justify-between px-5 pt-2">
        <span className="font-display text-[15px] font-bold tracking-tight" style={{ color: NAVY }}>
          Nord<span style={{ color: TEAL }}>Dental</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm" style={{ color: NAVY }} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
          </span>
          <DocAvatar size={32} />
        </span>
      </div>
      {/* hero doctor card */}
      <div
        className="mx-5 mt-3 rounded-3xl p-4 shadow-lg"
        style={{ opacity: rise, transform: `translateY(${(1 - rise) * 12}px)`, background: `linear-gradient(150deg, ${TEAL}, ${NAVY})` }}
      >
        <div className="flex items-center gap-3">
          <DocAvatar size={52} />
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white">Dr. Sofia Ek</div>
            <div className="text-[10px] text-white/70">Implantat & estetisk tandvård</div>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold text-white">
              <Star /> 4,9 · 320 omdömen
            </div>
          </div>
          <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white" style={{ color: NAVY }} aria-hidden="true">
            <ArrowUR s={15} />
          </span>
        </div>
      </div>
      {/* find care + search */}
      <div className="px-5 pt-4">
        <div className="font-display text-[17px] font-bold leading-tight tracking-tightest" style={{ color: NAVY }}>
          Hitta rätt <span style={{ color: TEAL }}>vård</span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={MUT} strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
          <span className="text-[11px]" style={{ color: MUT }}>Sök behandling…</span>
        </div>
      </div>
      {/* service price grid */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 px-5 pb-5">
        {services.map((s) => (
          <div key={s.t} className="rounded-2xl p-3 shadow-sm" style={{ background: s.dark ? NAVY : "#fff" }}>
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-bold leading-tight" style={{ color: s.dark ? "#fff" : NAVY }}>{s.t}</div>
              <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: s.dark ? TEAL : MIST, color: s.dark ? "#fff" : NAVY }}>
                <ArrowUR s={11} />
              </span>
            </div>
            <div className="mt-5 text-[9px]" style={{ color: s.dark ? "rgba(255,255,255,0.6)" : MUT }}>Per besök</div>
            <div className="text-[12px] font-bold" style={{ color: s.dark ? "#fff" : TEAL }}>{s.p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 4. booking (CliniQ-style: doctor, day pills, time ruler) ---------------
function ScreenBook({ cp }: { cp: number }) {
  const timeSel = cp > 0.45;
  const pressed = cp > 0.82;
  const days: [string, string][] = [["Mån", "22"], ["Tis", "23"], ["Ons", "24"], ["Tor", "25"]];
  const selDay = 2;
  return (
    <div className="flex h-full flex-col" style={{ background: MIST }}>
      <StatusBar />
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm" style={{ color: NAVY }} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="text-[12px] font-bold" style={{ color: NAVY }}>Boka tid</span>
        <span className="h-8 w-8" />
      </div>
      {/* doctor card */}
      <div className="mx-5 mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
        <DocAvatar size={44} />
        <div className="min-w-0">
          <div className="text-[12px] font-bold" style={{ color: NAVY }}>Dr. Sofia Ek</div>
          <div className="text-[10px]" style={{ color: MUT }}>Implantatkonsultation · {CITY}</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold text-white" style={{ background: TEAL }}>
          <Star /> 4,9
        </span>
      </div>
      {/* choose day */}
      <div className="px-5 pt-4">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: MUT }}>Välj dag · januari</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {days.map(([d, n], i) => {
            const on = i === selDay;
            return (
              <div key={n} className="rounded-2xl py-2.5 text-center shadow-sm" style={{ background: on ? NAVY : "#fff" }}>
                <div className="text-[9px] font-semibold" style={{ color: on ? "rgba(255,255,255,0.7)" : MUT }}>{d}</div>
                <div className="mt-0.5 text-[15px] font-bold" style={{ color: on ? "#fff" : NAVY }}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* choose time — ruler */}
      <div className="px-5 pt-4">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: MUT }}>Välj tid</div>
        <div className="mt-2 rounded-2xl bg-white px-3 py-3 shadow-sm">
          <div className="flex items-end justify-between gap-[3px]" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => {
              const major = i % 6 === 0;
              const active = timeSel && i === 15;
              return (
                <span
                  key={i}
                  className="flex-1 rounded-full transition-all"
                  style={{ height: active ? 26 : major ? 18 : 10, background: active ? TEAL : major ? NAVY : "rgba(18,59,69,0.18)" }}
                />
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-semibold" style={{ color: MUT }}>
            <span>08:00</span>
            <span>09:00</span>
            <span style={{ color: timeSel ? TEAL : MUT, fontWeight: timeSel ? 800 : 600 }}>{timeSel ? "Idag 09:30" : "10:00"}</span>
            <span>11:00</span>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="mt-auto px-5 pb-6">
        <div
          className="flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-bold text-white shadow-lg transition-transform"
          style={{ background: pressed ? NAVY_DK : NAVY, transform: pressed ? "scale(0.96)" : "none" }}
        >
          Boka tid
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
}

// ---- 5. confirmation (CliniQ-style ticket + attribution) --------------------
function ScreenDone(_p: { cp: number }) {
  return (
    <div className="flex h-full flex-col" style={{ background: MIST }}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span
          className="pj-pop flex h-[72px] w-[72px] items-center justify-center rounded-full text-white"
          style={{ background: TEAL, boxShadow: `0 12px 28px ${TEAL}55` }}
        >
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div className="mt-5 font-display text-[20px] font-bold tracking-tightest" style={{ color: NAVY }}>Bokningen är klar</div>
        <p className="mt-1 text-[11.5px] leading-snug" style={{ color: MUT }}>Vi ses, Anna. En bekräftelse ligger redan i din inkorg.</p>

        {/* ticket */}
        <div className="mt-5 w-full overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: NAVY }}>
            <DocAvatar size={40} />
            <div className="min-w-0 text-left">
              <div className="text-[12px] font-bold text-white">Dr. Sofia Ek</div>
              <div className="text-[9.5px] text-white/70">Implantatkonsultation</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[9px] text-white/60">Onsdag</div>
              <div className="text-[13px] font-bold text-white">09:30</div>
            </div>
          </div>
          <div className="space-y-2 px-4 py-3">
            {([["Klinik", `Nord Dental · ${CITY}`], ["Datum", "24 jan · 09:30"], ["Referens", "#1042"]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex justify-between text-[11px]">
                <span style={{ color: MUT }}>{k}</span>
                <span style={{ color: NAVY, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 flex w-full gap-2">
          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[10px] font-bold text-white" style={{ background: TEAL }}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" /></svg>
            Kalender
          </div>
          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[10px] font-bold shadow-sm" style={{ background: "#fff", color: NAVY }}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M5 8l7 5 7-5" strokeLinecap="round" /></svg>
            SMS skickat
          </div>
        </div>
      </div>

      {/* attribution footer — the professional angle: every new patient traced */}
      <div className="px-6 pb-5">
        <div
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed py-2 text-[9.5px] font-semibold"
          style={{ borderColor: "rgba(18,59,69,0.28)", color: TEAL_DK }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
          Ny patient · spårad från Google-sökning
        </div>
      </div>
    </div>
  );
}

export function PatientJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  // Scale the whole phone + caption stage down on short viewports so the
  // 650px phone never gets clipped top/bottom (13" laptops are ~700px tall).
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const total = wrap.offsetHeight - window.innerHeight;
        setP(clamp(total > 0 ? -rect.top / total : 0));
      });
    };
    const onResize = () => {
      // Phone (650) + breathing room needs ~770px; scale down proportionally
      // below that, floor at 0.72 so it stays legible.
      setStage(clamp((window.innerHeight - 24) / 770, 0.72, 1));
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const PAD = 0.5;
  const raw = clamp(p * (N - 1 + 2 * PAD) - PAD, 0, N - 1);
  const posE = dwell(raw);

  const phoneScreens = [ScreenLock, ScreenGoogle, ScreenSite, ScreenBook, ScreenDone];
  const spos = posE; // 0 => lock screen at full (the phone is the whole story now)

  const fr = raw - Math.floor(raw);
  const cross = Math.sin(clamp((fr - 0.35) / 0.4) * Math.PI);
  const pushScale = 1 + 0.014 * cross;

  return (
    <section id="resan" data-nav-theme="dark" className="border-t border-ink-line bg-ink-deep">
      {/* ---------- Desktop: pinned demo ---------- */}
      <div ref={wrapRef} className="relative hidden lg:block" style={{ height: `calc(100vh + ${(N - 1) * 120 + 100}vh)` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* progress bar only — no labels */}
          <div className="pointer-events-none absolute left-1/2 top-10 z-30 -translate-x-1/2">
            <div className="h-[3px] w-48 overflow-hidden rounded-full bg-cream/12">
              <div className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out" style={{ width: `${Math.round(p * 100)}%` }} />
            </div>
          </div>

          {/* Scaled stage: phone + side captions scale together so the phone
              fits shorter laptop viewports without clipping. */}
          <div className="absolute inset-0" style={{ transform: `scale(${stage})`, transformOrigin: "center center" }}>
          {/* PHONE */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative rounded-[58px] p-[2px]" style={{ background: "linear-gradient(150deg,#4a5560,#0b0d10 42%,#39424c 82%)", transform: `scale(${pushScale})` }}>
              <span className="absolute -left-[3px] top-[128px] h-8 w-[3px] rounded-l bg-[#20262c]" aria-hidden="true" />
              <span className="absolute -left-[3px] top-[172px] h-12 w-[3px] rounded-l bg-[#20262c]" aria-hidden="true" />
              <span className="absolute -left-[3px] top-[232px] h-12 w-[3px] rounded-l bg-[#20262c]" aria-hidden="true" />
              <span className="absolute -right-[3px] top-[196px] h-16 w-[3px] rounded-r bg-[#20262c]" aria-hidden="true" />
              <div className="rounded-[56px] bg-black p-[11px]">
                <div className="relative overflow-hidden rounded-[46px] bg-black" style={{ width: SW, height: SH }}>
                  <div className="absolute left-1/2 top-[14px] z-30 flex h-[26px] w-[88px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-[#10333b] ring-1 ring-[#1c4a54]" />
                  </div>
                  {phoneScreens.map((S, j) => {
                    const rel = spos - j;
                    const op = clamp(1 - Math.abs(rel) / 0.5);
                    if (op <= 0.001) return null;
                    const ty = -rel * 42;
                    const sc = 1 - Math.abs(rel) * 0.06;
                    const jcp = clamp(spos - (j - 0.5));
                    return (
                      <div key={j} className="absolute inset-0" style={{ opacity: op, transform: `translateY(${ty}px) scale(${sc})`, zIndex: Math.round(op * 10) }}>
                        <S cp={jcp} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SIDE CAPTIONS — driven by the raw scroll (not the snapped screen
              position) so the text glides down continuously as you scroll; the
              phone screen settles when a step "lands". */}
          {CAPS.map((c, i) => {
            const off = (i - raw) * ROW;
            const d = Math.abs(i - raw);
            const vis = clamp(1 - d / 0.85);
            return (
              <div key={`num-${c.n}`}>
                <div className="absolute right-[calc(50%+232px)] top-1/2 z-20 w-[15rem] text-right" style={{ transform: `translateY(calc(-50% + ${off}px))`, opacity: vis }}>
                  <div className="font-display font-bold tabular-nums leading-none tracking-tightest text-brand" style={{ fontSize: "104px" }}>{c.n}</div>
                </div>
                <div className="absolute left-[calc(50%+232px)] top-1/2 z-20 w-[22rem] max-w-[26vw] text-left" style={{ transform: `translateY(calc(-50% + ${off}px))`, opacity: vis }}>
                  <div className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-brand-light">Steg {c.n}</div>
                  <h3 className="mt-2 font-display font-bold uppercase leading-[0.98] tracking-tightest text-cream" style={{ fontSize: "30px" }}>{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/60 [hyphens:auto] [overflow-wrap:break-word]" style={{ maxWidth: "19rem" }}>{c.body}</p>
                </div>
              </div>
            );
          })}
          </div>

          {/* scroll cue */}
          <div className="pointer-events-none absolute bottom-9 left-1/2 z-20 -translate-x-1/2" style={{ opacity: clamp(1 - posE / (N - 1)) }}>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-cream/45">Scrolla vidare</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className="animate-bounce text-brand" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical reveal ---------- */}
      <div className="px-6 py-24 lg:hidden">
        <Reveal className="max-w-md">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">Från värk till bokad tid</div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-cream sm:text-4xl">Resan en ny patient tar.</h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/70">Från en värk mitt i natten till en bokad tid — och en bekräftelse i fickan. Vi bygger varje steg på vägen.</p>
        </Reveal>
        <div className="relative mt-12 pl-8">
          <div className="absolute bottom-2 left-[7px] top-2 w-[2px] bg-cream/15" aria-hidden="true" />
          {CAPS.map((c) => (
            <Reveal key={c.n} className="relative pb-10 last:pb-0">
              <span className="absolute -left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-brand bg-brand" aria-hidden="true" />
              <div className="font-display text-2xl font-bold tracking-tightest text-brand-light">{c.n}</div>
              <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tightest text-cream">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/65 [hyphens:auto] [overflow-wrap:break-word]">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
