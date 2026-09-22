"use client";

import { useState } from "react";
import { CalcSlider, CalcPanel, CalcResult, CalcStat, formatKr, formatNum, useTween } from "./CalcKit";

// Interactive marginal-economics calculator for the homepage. Uses the shared
// CalcPanel so it looks identical to the per-article calculators — only the
// content differs. An illustration, never a guarantee (stated on the card).

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
    <CalcPanel
      eyebrow="Räkna på er klinik"
      title="Vad är de tomma tiderna värda?"
      intro="Dra i era egna siffror så ser ni tillkommande årsomsättning direkt — stolen och teamet är redan betalda."
      inputs={
        <>
          <CalcSlider variant="dark" label="Behandlingsstolar" value={chairs} onChange={setChairs} min={1} max={10} unit=" st" />
          <CalcSlider variant="dark" label="Tomma tider / vecka per stol" value={emptyPerChair} onChange={setEmptyPerChair} min={0} max={25} hint="Hur många bokningsbara tider står tomma i snitt?" />
          <CalcSlider variant="dark" label="Andel av de tomma tiderna vi fyller" value={fillRate} onChange={setFillRate} min={5} max={80} unit=" %" />
          <CalcSlider variant="dark" label="Andel som blir högvärdesbehandling" value={highShare} onChange={setHighShare} min={0} max={50} unit=" %" hint="Implantat, Invisalign, fasader …" />
          <CalcSlider variant="dark" label="Värde per högvärdesbehandling" value={highValue} onChange={setHighValue} min={10000} max={70000} step={1000} unit=" kr" />
        </>
      }
      result={
        <CalcResult
          value={`≈ ${formatNum(Math.round(annualT / 1000) * 1000)} kr`}
          label="Tillkommande omsättning / år"
          sub={
            <div className="grid grid-cols-2 gap-4 text-left">
              <CalcStat variant="dark" label="Fyllda tider / v" value={formatNum(filled, 1)} />
              <CalcStat variant="dark" accent label="Högvärde / v" value={formatNum(high, 1)} />
              <CalcStat variant="dark" label="Per vecka" value={formatKr(weekly)} />
              <CalcStat variant="dark" label="Veckor / år" value={String(WEEKS)} />
            </div>
          }
        />
      }
      note="Illustration av principen, inte en prognos för er klinik. Varje ny tid — särskilt en högvärdesbehandling — landar till stor del rakt på marginalen. Verkligt utfall beror på behandlingsmix och pris hos er."
    />
  );
}
