import { Nav } from "@/components/Nav";
import { PinnedHero } from "@/components/PinnedHero";
import { ProblemStats } from "@/components/ProblemStats";
import { SearchSpotlight } from "@/components/SearchSpotlight";
import { Solution } from "@/components/Solution";
import { PatientJourney } from "@/components/PatientJourney";
import { CalendarBooking } from "@/components/CalendarBooking";
import { Process } from "@/components/Process";
import { GoogleAdsMethod } from "@/components/GoogleAdsMethod";
import { WebDevShowcase } from "@/components/WebDevShowcase";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <PinnedHero />
        <ProblemStats />
        <SearchSpotlight />
        <Solution />
        <PatientJourney />
        <CalendarBooking />
        <Process />
        <GoogleAdsMethod />
        <WebDevShowcase />
        <WhyUs />
        <About />
      </main>
    </>
  );
}
