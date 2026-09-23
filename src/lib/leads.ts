import { site } from "@/lib/site";

// Sends booking requests to the Google Sheet behind `site.leadsEndpoint`, so
// every lead is saved even if the visitor never sends the WhatsApp message.

const ATTR_KEY = "tx:attribution";
const ATTR_PARAMS = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term"];

// Remember how the visitor first arrived (Google Ads click id, UTM tags) for
// this session, so a lead submitted pages later is still attributed.
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const attr: Record<string, string> = { landing: window.location.pathname };
    for (const k of ATTR_PARAMS) {
      const v = q.get(k);
      if (v) attr[k] = v;
    }
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  } catch {
    // Storage blocked (private mode etc.) — attribution is best-effort.
  }
}

function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}");
  } catch {
    return {};
  }
}

export const leadsConnected = Boolean(site.leadsEndpoint);

// Fire-and-forget. Apps Script can't answer CORS preflights, so this is sent
// as a "simple" text/plain request; sendBeacon also survives the tab switch
// when WhatsApp opens right after.
export function sendLead(fields: Record<string, string>) {
  if (!site.leadsEndpoint || typeof window === "undefined") return;
  const body = JSON.stringify({
    ...fields,
    ...readAttribution(),
    page: window.location.pathname,
  });
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  if (navigator.sendBeacon?.(site.leadsEndpoint, blob)) return;
  fetch(site.leadsEndpoint, { method: "POST", mode: "no-cors", keepalive: true, body: blob }).catch(
    () => {},
  );
}
