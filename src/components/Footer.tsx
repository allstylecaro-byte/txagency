import { Logo } from "./Nav";
import { RollText } from "./ui";
import { navItems, waLink, defaultWaMessage } from "@/lib/site";

const services = [
  "Hemsida",
  "Google Ads",
  "SEO",
  "Local SEO",
  "Spårning",
];

export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="border-t border-ink-line bg-ink-deep px-6 py-20 lg:pl-72 lg:pr-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24">
        <div>
          <Logo />
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand">
            Dental growth. Online.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/50">
            TXagency bygger och driver hemsidor, annonsering och synlighet för
            svenska tandvårdskliniker — mätt varje månad, med hela resan från
            sökning till bokad behandling i fokus.
          </p>
        </div>

        <div className="lg:justify-self-end lg:text-right">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/40">
            Vad vi gör
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
            {services.map((s) => (
              <li
                key={s}
                className="text-xs font-bold uppercase tracking-wide text-cream/55"
              >
                {s}
              </li>
            ))}
          </ul>
          <a
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="roll mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-ondark hover:text-cream"
          >
            <RollText>+46 70 330 29 28</RollText> <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line pt-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="roll text-[11px] font-bold uppercase tracking-[0.12em] text-cream/50 hover:text-cream"
          >
            <RollText>{item.label}</RollText>
          </a>
        ))}
        <a
          href="/artiklar"
          className="roll text-[11px] font-bold uppercase tracking-[0.12em] text-cream/50 hover:text-cream"
        >
          <RollText>Artiklar</RollText>
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-2 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} TXagency</span>
        <span>Byggd med samma tänk som vi säljer: mät, optimera, upprepa.</span>
      </div>
    </footer>
  );
}
