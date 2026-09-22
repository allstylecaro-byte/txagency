"use client";

import { useState, type ReactNode } from "react";
import {
  CalcSlider,
  CalcPanel,
  CalcResult,
  CalcStat,
  formatKr,
  formatNum,
  useTween,
} from "./CalcKit";

// Per-article interactive calculators. Each answers the specific formula its
// article discusses (Google Ads CAC, SEO value, patient lifetime value), so a
// reader can plug in their own numbers instead of reading a static example.
// All are illustrations — real outcomes depend on the clinic.

// ---- Google Ads: klick → lead → patient → CAC / ROAS -----------------------
export function GoogleAdsCalculator() {
  const [budget, setBudget] = useState(15000);
  const [cpc, setCpc] = useState(22);
  const [clickToLead, setClickToLead] = useState(8);
  const [leadToPatient, setLeadToPatient] = useState(55);
  const [patientValue, setPatientValue] = useState(8000);

  const clicks = budget / cpc;
  const leads = clicks * (clickToLead / 100);
  const patients = leads * (leadToPatient / 100);
  const cac = patients > 0 ? budget / patients : 0;
  const revenue = patients * patientValue;
  const roas = budget > 0 ? revenue / budget : 0;

  const cacT = useTween(cac);

  return (
    <CalcPanel
      eyebrow="Räkna själv · Google Ads"
      title="Vad kostar en ny patient?"
      intro="Dra i era egna siffror så ser ni kostnad per patient (CAC) och avkastning (ROAS) direkt."
      inputs={
        <>
          <CalcSlider variant="dark" label="Månadsbudget" value={budget} onChange={setBudget} min={3000} max={60000} step={500} unit=" kr" />
          <CalcSlider variant="dark" label="Kostnad per klick (CPC)" value={cpc} onChange={setCpc} min={5} max={60} unit=" kr" hint="Tandvård ligger ofta 15–35 kr." />
          <CalcSlider variant="dark" label="Klick → kontakt" value={clickToLead} onChange={setClickToLead} min={2} max={20} unit=" %" hint="Andel som ringer eller fyller i formulär." />
          <CalcSlider variant="dark" label="Kontakt → patient" value={leadToPatient} onChange={setLeadToPatient} min={20} max={90} unit=" %" />
          <CalcSlider variant="dark" label="Värde per ny patient" value={patientValue} onChange={setPatientValue} min={1000} max={40000} step={500} unit=" kr" />
        </>
      }
      result={
        <CalcResult
          value={formatKr(Math.round(cacT))}
          label="Kostnad per ny patient"
          sub={
            <div className="grid grid-cols-2 gap-4 text-left">
              <CalcStat variant="dark" label="Klick / mån" value={formatNum(clicks)} />
              <CalcStat variant="dark" label="Kontakter / mån" value={formatNum(leads, 1)} />
              <CalcStat variant="dark" accent label="Patienter / mån" value={formatNum(patients, 1)} />
              <CalcStat variant="dark" accent label="ROAS" value={`${formatNum(roas, 1)}×`} />
            </div>
          }
        />
      }
      note="Illustration. CPC och konverteringsgrad varierar med ort, konkurrens och landningssida — mät ert eget utfall innan ni skalar budget."
    />
  );
}

// ---- SEO: sökvolym × CTR(position) → patienter / värde ---------------------
const CTR: Record<number, number> = { 1: 27, 2: 14, 3: 9, 4: 6, 5: 4, 6: 3, 7: 2.4, 8: 1.8, 9: 1.4, 10: 1.1 };

export function SeoValueCalculator() {
  const [volume, setVolume] = useState(600);
  const [position, setPosition] = useState(3);
  const [visitToPatient, setVisitToPatient] = useState(4);
  const [patientValue, setPatientValue] = useState(8000);

  const ctr = CTR[position] ?? 1;
  const clicks = volume * (ctr / 100);
  const patients = clicks * (visitToPatient / 100);
  const monthly = patients * patientValue;
  const yearly = monthly * 12;

  const yearlyT = useTween(yearly);

  return (
    <CalcPanel
      eyebrow="Räkna själv · SEO"
      title="Vad är en topplacering värd?"
      intro="Uppskatta hur många patienter en position i Googles organiska resultat kan ge — och vad det är värt per år."
      inputs={
        <>
          <CalcSlider variant="dark" label="Sökvolym / mån (ert ord)" value={volume} onChange={setVolume} min={50} max={5000} step={10} />
          <CalcSlider variant="dark" label="Målposition i Google" value={position} onChange={setPosition} min={1} max={10} hint={`Uppskattad klickandel: ${formatNum(ctr, 1)} %`} />
          <CalcSlider variant="dark" label="Besök → patient" value={visitToPatient} onChange={setVisitToPatient} min={1} max={15} unit=" %" />
          <CalcSlider variant="dark" label="Värde per ny patient" value={patientValue} onChange={setPatientValue} min={1000} max={40000} step={500} unit=" kr" />
        </>
      }
      result={
        <CalcResult
          value={`≈ ${formatNum(Math.round(yearlyT / 1000) * 1000)} kr`}
          label="Värde per år"
          sub={
            <div className="grid grid-cols-2 gap-4 text-left">
              <CalcStat variant="dark" label="Klick / mån" value={formatNum(clicks)} />
              <CalcStat variant="dark" accent label="Patienter / mån" value={formatNum(patients, 1)} />
              <CalcStat variant="dark" label="Värde / mån" value={formatKr(monthly)} />
              <CalcStat variant="dark" label="Klickandel" value={`${formatNum(ctr, 1)} %`} />
            </div>
          }
        />
      }
      note="Illustration med typiska klickandelar per position. Faktisk trafik beror på sökintention, kartresultat och konkurrens."
    />
  );
}

// ---- Patient lifetime value ------------------------------------------------
export function PatientValueCalculator() {
  const [perVisit, setPerVisit] = useState(1400);
  const [visitsYear, setVisitsYear] = useState(2);
  const [years, setYears] = useState(9);
  const [cac, setCac] = useState(1200);

  const ltv = perVisit * visitsYear * years;
  const ratio = cac > 0 ? ltv / cac : 0;

  const ltvT = useTween(ltv);

  return (
    <CalcPanel
      eyebrow="Räkna själv · Patientvärde"
      title="Vad är en patient värd över tid?"
      intro="En ny patient är sällan ett enda besök. Se livstidsvärdet — och hur det förhåller sig till vad ni betalar för att få patienten."
      inputs={
        <>
          <CalcSlider variant="dark" label="Snittintäkt per besök" value={perVisit} onChange={setPerVisit} min={300} max={8000} step={100} unit=" kr" />
          <CalcSlider variant="dark" label="Besök per år" value={visitsYear} onChange={setVisitsYear} min={1} max={6} step={0.5} />
          <CalcSlider variant="dark" label="År som patient" value={years} onChange={setYears} min={1} max={20} unit=" år" />
          <CalcSlider variant="dark" label="Kostnad att få patienten (CAC)" value={cac} onChange={setCac} min={200} max={20000} step={100} unit=" kr" />
        </>
      }
      result={
        <CalcResult
          value={formatKr(Math.round(ltvT))}
          label="Livstidsvärde per patient"
          sub={
            <div className="grid grid-cols-2 gap-4 text-left">
              <CalcStat variant="dark" accent label="LTV / CAC" value={`${formatNum(ratio, 1)}×`} />
              <CalcStat variant="dark" label="Intäkt / år" value={formatKr(perVisit * visitsYear)} />
            </div>
          }
        />
      }
      note="Illustration. Ett hälsosamt förhållande brukar vara minst 3× LTV mot CAC — då finns marginal att investera i fler patienter."
    />
  );
}

// ---- Registry: slug → calculator ------------------------------------------
const ADS = ["vad-kostar-google-ads-tandlakare", "kostnad-per-ny-patient", "google-ads-akut-tandlakare", "google-ads-implantat-invisalign", "google-ads-vs-meta-ads-tandklinik", "konverteringsspårning-tandklinik"];
const SEO = ["vad-ar-seo-tandlakare", "lokal-seo-tandlakare", "vad-kostar-seo-tandklinik", "seo-eller-google-ads-tandklinik", "mata-seo-kpi-tandklinik"];
const LTV = ["patientens-livstidsvarde", "fa-fler-patienter-tandklinik", "patientens-resa-tandklinik", "kostnad-per-ny-patient"];

const registry: Record<string, () => ReactNode> = {};
for (const s of ADS) registry[s] = () => <GoogleAdsCalculator />;
for (const s of SEO) registry[s] = () => <SeoValueCalculator />;
// LTV wins for these specific slugs (kostnad-per-ny-patient stays on Ads above).
for (const s of LTV) if (s !== "kostnad-per-ny-patient") registry[s] = () => <PatientValueCalculator />;

export function getArticleCalculator(slug: string): ReactNode | null {
  const make = registry[slug];
  return make ? make() : null;
}
