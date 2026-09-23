# Ansökningar → Google Sheets

Varje "Boka samtal"-ansökan från hemsidan sparas som en rad i TX Agencys kalkylark:
https://docs.google.com/spreadsheets/d/1fOpdCMvKZyceNTibUVoEybKDPEREG-34YhevJeakTxs/edit
(första fliken, gid=0; ändra `SPREADSHEET_ID` / `SHEET_GID` i skriptet för ett annat ark).
Det gäller även om besökaren aldrig skickar WhatsApp-meddelandet.

## Engångsinstallation (≈ 3 min)

1. Öppna kalkylarket ovan.
2. **Tillägg → Apps Script**. Radera allt i `Code.gs` och klistra in hela `Ansokningar.gs`. Spara.
3. **Distribuera → Ny distribution** → typ **Webbapp**
   - Kör som: **Jag**
   - Vem har åtkomst: **Alla**
   → **Distribuera**, godkänn behörigheterna (Avancerat → Gå till projektet).
4. Kopiera **webbappens URL** (slutar på `/exec`).
5. Klistra in den i `src/lib/site.ts` → `leadsEndpoint: "https://script.google.com/macros/s/…/exec"`,
   och publicera sajten i Lovable (Publish → Update).

Test: öppna `/exec`-URL:en i webbläsaren, den ska visa `{"ok":true,…}`.
Skicka sedan en testansökan på sajten. En rad ska dyka upp i första fliken.

## Kolumner

Mottagen · Klinik · Ort · Antal stolar · Beläggning idag · Önskade patienttyper ·
Om kliniken & mål · Namn · Telefon · E-post · Sida · Landningssida ·
utm_source/medium/campaign/term · gclid · Status (sätts till "Ny", uppdatera själv).

`gclid` och `utm_*` visar om ansökan kom från Google Ads. Då kan du koppla ansökningar
till kampanjer och senare importera dem som offline-konverteringar.

## Valfritt

- **E-postnotis:** sätt `NOTIFY_EMAIL = "din@adress.se"` i skriptet. Om du ändrar
  skriptet måste du göra **Distribuera → Hantera distributioner → Redigera → Ny version**,
  annars körs den gamla koden. URL:en förblir densamma.
