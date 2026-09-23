"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/site";
import { captureAttribution, leadsConnected, sendLead } from "@/lib/leads";

// A slide-out booking form. On desktop it slides in from the right edge as a
// side panel; on mobile it's a full-height sheet. Opened by dispatching the
// `tx:book` event (see BookingButton / the nav CTA). On submit the answers are
// logged to the "Ansökningar" Google Sheet (when `site.leadsEndpoint` is set)
// and a WhatsApp message to the agency is composed, matching the rest of the
// site's contact flow.

export const openBooking = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("tx:book"));
};

const OCC = ["Under 50 %", "50–70 %", "70–85 %", "Över 85 %", "Vet ej"];

// The clinic tells us which kind of patients they want more of — not a number.
const PATIENT_TYPES = [
  "Allmäntandvård",
  "Implantat",
  "Invisalign / tandreglering",
  "Estetiskt (fasader, blekning)",
  "Akuttandvård",
  "Barn & ungdom",
];

export function BookingDrawer() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);
  const [patients, setPatients] = useState<string[]>([]);
  const [form, setForm] = useState({
    clinic: "",
    city: "",
    chairs: "",
    occupancy: "",
    story: "",
    name: "",
    phone: "",
    email: "",
    website: "", // honeypot — hidden from people, bots fill it in
  });

  const togglePatient = (t: string) =>
    setPatients((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  useEffect(() => {
    captureAttribution();
    const onOpen = () => setOpen(true);
    window.addEventListener("tx:book", onOpen);
    return () => window.removeEventListener("tx:book", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstRef.current?.focus(), 320);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Hej! Jag vill boka ett samtal om marknadsföring.\n\n` +
      `Klinik: ${form.clinic || "—"}\n` +
      `Ort: ${form.city || "—"}\n` +
      `Antal stolar: ${form.chairs || "—"}\n` +
      `Beläggning idag: ${form.occupancy || "—"}\n` +
      `Önskad patienttyp: ${patients.length ? patients.join(", ") : "—"}\n` +
      `Om kliniken & mål: ${form.story || "—"}\n` +
      `Kontakt: ${form.name || "—"}\n` +
      `Telefon: ${form.phone || "—"}\n` +
      `E-post: ${form.email || "—"}`;
    sendLead({
      clinic: form.clinic,
      city: form.city,
      chairs: form.chairs,
      occupancy: form.occupancy,
      patients: patients.join(", "),
      story: form.story,
      name: form.name,
      phone: form.phone,
      email: form.email,
      website: form.website,
    });
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
  const label = "block text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45";

  return (
    <>
      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] bg-ink-deep/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Boka ett samtal"
        className={`fixed inset-y-0 right-0 z-[101] flex w-full max-w-[460px] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Kostnadsfritt · 20 min</div>
            <div className="mt-0.5 font-display text-xl font-bold tracking-tightest text-ink">Boka ett samtal</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Stäng"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
        </div>

        {sent ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-cream">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="mt-5 font-display text-2xl font-bold tracking-tightest text-ink">Tack!</div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-sage">
              {leadsConnected
                ? "Vi har tagit emot dina uppgifter och hör av oss inom en arbetsdag. Vill du snabba på kan du även skicka meddelandet i WhatsApp."
                : "Vi öppnade WhatsApp med dina uppgifter. Skicka meddelandet så hör vi av oss inom en arbetsdag."}
            </p>
            <button type="button" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream">
              Stäng
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={set("website")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />
            <p className="text-sm leading-relaxed text-sage">
              Berätta om er klinik så kommer vi till samtalet med en konkret plan —
              var ni tappar patienter idag och vad vi skulle göra först.
            </p>
            {/* Value props — make the call worth booking */}
            <ul className="mt-4 space-y-2">
              {[
                "Gratis genomgång av hemsida, Google & synlighet",
                "En prioriterad åtgärdslista — inte en säljpitch",
                "Ni äger allt vi bygger. Inga bindningstider.",
              ].map((v) => (
                <li key={v} className="flex items-start gap-2 text-[13px] leading-snug text-ink/70">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" className="mt-0.5 shrink-0 text-brand" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {v}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              <div>
                <label className={label} htmlFor="bk-clinic">Klinikens namn</label>
                <input id="bk-clinic" ref={firstRef} value={form.clinic} onChange={set("clinic")} className={field} placeholder="T.ex. Nord Dental" autoComplete="organization" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor="bk-city">Ort</label>
                  <input id="bk-city" value={form.city} onChange={set("city")} className={field} placeholder="T.ex. Stockholm" autoComplete="address-level2" />
                </div>
                <div>
                  <label className={label} htmlFor="bk-chairs">Antal stolar</label>
                  <input id="bk-chairs" value={form.chairs} onChange={set("chairs")} className={field} placeholder="T.ex. 3" inputMode="numeric" />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="bk-occ">Beläggning idag</label>
                <select id="bk-occ" value={form.occupancy} onChange={set("occupancy")} className={`${field} appearance-none`}>
                  <option value="">Välj…</option>
                  {OCC.map((o) => (<option key={o} value={o}>{o}</option>))}
                </select>
              </div>
              <div>
                <span className={label}>Vilka patienter vill ni ha fler av?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PATIENT_TYPES.map((t) => {
                    const on = patients.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        onClick={() => togglePatient(t)}
                        className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors ${on ? "border-[#d63d25] bg-[#d63d25] text-white" : "border-ink/15 bg-white text-ink/70 hover:border-ink/35"}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className={label} htmlFor="bk-story">Berätta om er klinik &amp; mål <span className="font-semibold normal-case tracking-normal text-ink/30">(valfritt)</span></label>
                <textarea id="bk-story" value={form.story} onChange={set("story")} rows={3} className={`${field} resize-none`} placeholder="Vad vill ni uppnå? Vad har ni testat? Största utmaningen just nu?" />
              </div>
              <div className="border-t border-ink/10 pt-4">
                <label className={label} htmlFor="bk-name">Ditt namn</label>
                <input id="bk-name" value={form.name} onChange={set("name")} className={field} placeholder="För- och efternamn" autoComplete="name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor="bk-phone">Telefon</label>
                  <input id="bk-phone" value={form.phone} onChange={set("phone")} className={field} placeholder="07X-XXX XX XX" type="tel" autoComplete="tel" />
                </div>
                <div>
                  <label className={label} htmlFor="bk-email">E-post</label>
                  <input id="bk-email" value={form.email} onChange={set("email")} className={field} placeholder="namn@klinik.se" type="email" autoComplete="email" />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button type="submit" className="w-full rounded-full bg-[#d63d25] py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#c2361f]">
                Skicka &amp; boka samtal
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/45">
                Vi ringer aldrig kallt — uppgifterna används bara för att förbereda ert samtal.
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
