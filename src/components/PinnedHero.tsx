"use client";

import { useEffect, useRef } from "react";
import { BookingButton } from "./BookingButton";

// Matches the real technique found in Own the Patch's shipped CSS:
// `.opening__media { position: sticky; top: 0; height: 100svh;
// margin-bottom: -100svh; }` inside a wrapper (`.opening`) that also
// contains the hero and two "band" sections as ordinary, real-height
// sections. The sticky media has no layout height of its own (the
// negative margin cancels it), so it stays visually pinned for exactly
// as long as those three sections take to scroll past, then releases
// naturally — no JS-computed "which beat is active" state needed at all.
export function PinnedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ambient canvas backdrop. Sits *behind* the hero <video> and only shows
  // through if the video sources are missing or fail to load (older browser,
  // blocked autoplay before poster paints) — a slow, brand-colored dot field
  // so the hero is never a flat block while the clip buffers.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const cols = 26;
    const rows = 14;
    const dots: { x: number; y: number; phase: number }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: (i + 0.5) / cols,
          y: (j + 0.5) / rows,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      const time = t / 1000;
      for (const dot of dots) {
        const wave = Math.sin(time * 0.6 + dot.phase + dot.x * 4) * 0.5 + 0.5;
        const r = 1 + wave * 1.6;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(169, 184, 181, ${0.06 + wave * 0.14})`;
        ctx!.arc(dot.x * width, dot.y * height, r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }
    draw(0);
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="top" className="relative">
      {/* Pinned media: no layout height (negative margin cancels it), and a
          NEGATIVE z-index so it sits strictly behind every following section.
          (.opening is only `relative`, not a stacking context, so -z-10
          resolves against the root — the media can never paint over the
          stats/section panels that come after it.) */}
      <div className="sticky top-0 -z-10 -mb-[100vh] h-screen overflow-hidden bg-ink-deep">
        {/* Ambient canvas fallback — shows only if the video fails to load. */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        {/* Real hero video — a dark, cinematic dental-exam clip. 1080p on
            tablet/desktop, a lighter 720p on phones; poster paints first,
            the canvas sits behind as a fallback. See README for re-encoding. */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/media/hero-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/media/hero-720.mp4" type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/50 via-ink-deep/70 to-ink-deep"
          aria-hidden="true"
        />
      </div>

      {/* Hero — content bottom-aligned, matching the reference exactly */}
      <section
        data-nav-theme="dark"
        className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-24 pt-24 lg:pl-72 lg:pr-16 lg:pt-0"
      >
        <div
          className="guides pointer-events-none absolute inset-0 lg:pl-56"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="relative max-w-4xl">
          <div
            className="hero-rise mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cream/70"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-2.5 w-2.5 bg-brand" aria-hidden="true" />
            Google Ads · Hemsida · SEO · Spårning
          </div>
          <h1
            className="hero-rise font-display text-[32px] font-bold leading-[1.04] tracking-tightest text-cream sm:text-4xl md:text-5xl"
            style={{ animationDelay: "0.12s" }}
          >
            Från första sökningen till betald behandling.
            <span className="mt-2 block text-brand-light">
              Vi äger hela vägen dit.
            </span>
          </h1>
          <p
            className="hero-rise mt-8 max-w-xl text-xl leading-relaxed text-cream/75"
            style={{ animationDelay: "0.26s" }}
          >
            Hemsida, SEO, Google Ads och spårning — inte fyra separata
            leverantörer, utan{" "}
            <span className="font-semibold text-cream">
              en enda kedja vi ansvarar för
            </span>
            . Fast månadsarvode, annonsbudgeten är alltid er egen.
          </p>
          <div
            className="hero-rise mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.4s" }}
          >
            <BookingButton>Boka samtal</BookingButton>
            <a
              href="#start"
              className="roll text-xs font-bold uppercase tracking-wide text-cream/60 hover:text-cream"
            >
              Eller få en gratis snabbgranskning
            </a>
          </div>
        </div>

        {/* Scroll indicator — a light segment that travels the full height of
            the hero, down the whole video area (not a short stub). */}
        <div className="pointer-events-none absolute right-6 top-28 bottom-24 z-10 hidden w-px overflow-hidden lg:right-16 lg:block">
          <span className="absolute inset-0 bg-cream/12" aria-hidden="true" />
          <span
            className="hero-travel absolute left-0 h-24 w-px bg-gradient-to-b from-transparent via-brand to-transparent"
            aria-hidden="true"
          />
        </div>
        <span className="pointer-events-none absolute bottom-8 right-3 z-10 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-cream/40 [writing-mode:vertical-rl] lg:block">
          Scroll
        </span>
      </section>

      {/* Band 1 — rent vs. equity claim */}
      <section
        data-nav-theme="dark"
        className="relative z-10 flex min-h-screen items-center px-6 py-24 lg:pl-72 lg:pr-16"
      >
        <div className="max-w-xl">
          <p className="text-3xl font-display font-bold leading-[1.05] tracking-tightest text-cream sm:text-4xl md:text-5xl">
            Kedjorna vinner inte för att de gör en sak bättre.
            <span className="mt-2 block">
              De vinner för att allt hänger ihop.
            </span>
          </p>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/70">
            Hemsida, SEO, annonser och spårning som en enda maskin — det är
            fördelen, inte budgeten i sig. Lokala kliniker som bara har en
            Google Ads-kille och en separat webbyrå tappar mellan skarvarna.
            Det är den luckan vi fyller.
          </p>
        </div>
      </section>

      {/* Band 2 — differentiation claim */}
      <section
        data-nav-theme="dark"
        className="relative z-10 flex min-h-screen items-center px-6 py-24 lg:pl-72 lg:pr-16"
      >
        <div className="max-w-xl">
          <p className="text-3xl font-display font-bold leading-[1.05] tracking-tightest text-cream sm:text-4xl md:text-5xl">
            <span className="mb-3 block text-base font-bold uppercase tracking-[0.14em] text-brand-light sm:text-lg">
              En vanlig tanke:
            </span>
            ”Vi väntar med marknadsföring tills vi expanderat.”
          </p>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/70">
            Men expansion kräver samma sak ni redan behöver nu — en hemsida,
            synlighet och spårning som hänger ihop. Vi bygger den kedjan innan
            ni växer, inte efter.
          </p>
        </div>
      </section>
    </div>
  );
}
