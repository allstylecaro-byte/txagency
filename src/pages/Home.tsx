import { Nav } from "@/components/Nav";
import { PinnedHero } from "@/components/PinnedHero";
import { ProblemStats } from "@/components/ProblemStats";
import { SearchSpotlight } from "@/components/SearchSpotlight";
import { Solution } from "@/components/Solution";
import { CaseStudy } from "@/components/CaseStudy";
import { PatientJourney } from "@/components/PatientJourney";
import { CalendarBooking } from "@/components/CalendarBooking";
import { Process } from "@/components/Process";
import { GoogleAdsMethod } from "@/components/GoogleAdsMethod";
import { WebDevShowcase } from "@/components/WebDevShowcase";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";

// Order is proof-first: problem → solution → the real case → how it works →
// what the clinic gets → the economics behind it → CTA (in the shared tail).
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <PinnedHero />
        <ProblemStats />
        <Solution />
        <CaseStudy />
        <SearchSpotlight />
        <PatientJourney />
        <Process />
        <GoogleAdsMethod />
        <WebDevShowcase />
        <WhyUs />
        <CalendarBooking />
        <About />
      </main>
    </>
  );
}
