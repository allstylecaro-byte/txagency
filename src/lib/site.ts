export const site = {
  name: "TX Agency",
  tagline: "Hemsidor, Google Ads, SEO och spårning för svenska tandvårdskliniker.",
  whatsappNumber: "46703302928",
};

export const navItems = [
  { number: "01", label: "Lösningen", href: "#losningen" },
  { number: "02", label: "Process", href: "#process" },
  { number: "03", label: "Varför oss", href: "#varfor-oss" },
  { number: "04", label: "Om oss", href: "#om-oss" },
  { number: "05", label: "Kontakt", href: "#start" },
] as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hej! Jag vill boka ett samtal om marknadsföring för min klinik.";
