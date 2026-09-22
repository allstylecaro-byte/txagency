"use client";

import { useState } from "react";
import { CalcSlider, CalcStat, formatKr, formatNum, useTween } from "./CalcKit";

// Interactive marginal-economics calculator for the homepage. The clinic
// drags in its own reality — chairs, empty slots, how much we'd fill, the
// treatment mix — and sees the tillkommande årsomsättning update live.
// An illustration of the principle, never a guarantee (stated on the card).

const OTHER_VALUE = 1200; // snittvärde för ett vanligt besök (kr)
const WEEKS = 45; // arbetsveckor per år

export function RevenueCalculator() {
  const [chairs, setChairs] = useState(2);
  const [emptyPerChair, setEmptyPerChair] = useState(6);
  const [fillRate, setFillRate] = useState(35);
  const [highShare, setHighShare] = useState(20);
  const [highValue, setHighValue] = useState(35000);

  const emptyWeek = chairs * emptyPerChair;
  const filled = emptyWeek * (fillRate / 100);
  const high = filled * (highShare / 100);
  const other = filled - high;
  const weekly = high * highValue + other * OTHER_VALUE;
  const annual = weekly * WEEKS;

  const annualT = useTween(annual);

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
      style={{ background: "linear-gradient(135deg,#0e343b,#0a2b31 60%,#123f47)" }}
    >
      <span
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Räkna på er klinik
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          {/* Inputs */}
          <div className="space-y-5">
            <CalcSlider
              variant="dark"
              label="Behandlingsstolar"
              value={chairs}
              onChange={setChairs}
              min={1}
              max={10}
              unit=" st"
            />
            <CalcSlider
              variant="dark"
              label="Tomma tider / vecka per stol"
              value={emptyPerChair}
              onChange={setEmptyPerChair}
              min={0}
              max={25}
              hint="Hur många bokningsbara tider står tomma i snitt?"
            />
            <CalcSlider
              variant="dark"
              label="Andel av de tomma tiderna vi fyller"
              value={fillRate}
              onChange={setFillRate}
              min={5}
              max={80}
              unit=" %"
            />
            <CalcSlider
              variant="dark"
              label="Andel som blir högvärdesbehandling"
              value={highShare}
              onChange={setHighShare}
              min={0}
              max={50}
              unit=" %"
              hint="Implantat, Invisalign, fasader …"
            />
            <CalcSlider
              variant="dark"
              label="Värde per högvärdesbehandling"
              value={highValue}
              onChange={setHighValue}
              min={10000}
              max={70000}
              step={1000}
              unit=" kr"
            />
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-cream/12 bg-white/[0.06] p-6 text-center lg:min-w-[16rem] lg:self-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
              Tillkommande omsättning
            </div>
            <div className="mt-2 flex items-baseline justify-center gap-1">
              <span className="font-display text-2xl font-bold text-brand-light">≈</span>
              <span className="font-display text-4xl font-bold tabular-nums tracking-tightest text-cream sm:text-5xl">
                {formatNum(Math.round(annualT / 1000) * 1000)}
              </span>
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-cream/50">
              kr / år
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-cream/10 pt-5 text-left">
              <CalcStat
                variant="dark"
                label="Fyllda tider / v"
                value={formatNum(filled, 1)}
              />
              <CalcStat
                variant="dark"
                accent
                label="Högvärde / v"
                value={formatNum(high, 1)}
              />
              <CalcStat
                variant="dark"
                label="Per vecka"
                value={formatKr(weekly)}
              />
              <CalcStat
                variant="dark"
                label="Veckor / år"
                value={String(WEEKS)}
              />
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/45">
          Illustration av principen, inte en prognos för er klinik. Stolen, lokalen
          och teamet är redan betalda — därför landar varje ny tid, särskilt en
          högvärdesbehandling, till stor del rakt på marginalen. Verkligt utfall
          beror på behandlingsmix och pris hos er.
        </p>
      </div>
    </div>
  );
}
