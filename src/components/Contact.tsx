"use client";

import { useState, type FormEvent } from "react";
import { waLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wide text-ink/50">
        {label}
      </span>
      <input
        {...props}
        className="border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brand"
      />
    </label>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    clinic: "",
    contact: "",
    message: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      `Namn: ${form.name}`,
      `Klinik: ${form.clinic}`,
      `Kontakt: ${form.contact}`,
      form.message ? `Meddelande: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const text = `Hej! Jag vill boka ett samtal.\n${lines}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="kontakt"
      data-nav-theme="light"
      className="scroll-mt-20 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            Kontakt
          </div>
          <HighlightReveal
            as="h2"
            barTheme="light"
            className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
            lines={["Boka ett samtal."]}
          />
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Fyll i formuläret så öppnas WhatsApp med ett förifyllt meddelande
            till oss — eller skriv direkt.
          </p>
          <a
            href={waLink(
              "Hej! Jag vill boka ett samtal om marknadsföring för min klinik.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand hover:text-ink"
          >
            +46 70 330 29 28 <span aria-hidden="true">↗</span>
          </a>
        </Reveal>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field
            label="Namn"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Field
            label="Klinik"
            required
            value={form.clinic}
            onChange={(e) => setForm({ ...form, clinic: e.target.value })}
          />
          <Field
            label="Telefon eller e-post"
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-ink/50">
              Meddelande (valfritt)
            </span>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="resize-none border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-brand"
            />
          </label>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-brand-dark"
          >
            Skicka via WhatsApp <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
