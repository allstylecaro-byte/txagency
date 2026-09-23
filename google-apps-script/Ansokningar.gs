/**
 * TX Agency — booking requests ("Boka samtal") → Google Sheet.
 *
 * Paste into the lead sheet's Extensions → Apps Script, then deploy as a web app
 * (Execute as: Me, Who has access: Anyone). Put the /exec URL in
 * src/lib/site.ts → leadsEndpoint. Each form submission becomes one row.
 */

// The TX Agency lead sheet, and the tab rows go into (gid in the sheet URL).
const SPREADSHEET_ID = "1fOpdCMvKZyceNTibUVoEybKDPEREG-34YhevJeakTxs";
const SHEET_GID = 0;
// Used only if no tab with SHEET_GID exists.
const SHEET_NAME = "Ansökningar";

// Optional: an address to email on every new request. Leave "" for none.
const NOTIFY_EMAIL = "";

// [column header, field sent by the website]
const COLUMNS = [
  ["Mottagen", null],
  ["Klinik", "clinic"],
  ["Ort", "city"],
  ["Antal stolar", "chairs"],
  ["Beläggning idag", "occupancy"],
  ["Önskade patienttyper", "patients"],
  ["Om kliniken & mål", "story"],
  ["Namn", "name"],
  ["Telefon", "phone"],
  ["E-post", "email"],
  ["Sida", "page"],
  ["Landningssida", "landing"],
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_term", "utm_term"],
  ["gclid", "gclid"],
  ["Status", null],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.website) return json({ ok: true }); // honeypot filled → bot

    const sheet = getSheet();
    const row = COLUMNS.map(([header, key]) => {
      if (header === "Mottagen") return new Date();
      if (header === "Status") return "Ny";
      return clean(data[key]);
    });
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "Ny ansökan: " + (data.clinic || data.name || "okänd klinik"),
        COLUMNS.map(([h], i) => h + ": " + row[i]).join("\n"),
      );
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json({ ok: true, sheet: getSheet().getName() });
}

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet =
    ss.getSheets().find((s) => s.getSheetId() === SHEET_GID) ||
    ss.getSheetByName(SHEET_NAME) ||
    ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([h]) => h));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm");
  }
  return sheet;
}

// Trim, cap length, and stop anything starting with = + - @ from being run as
// a formula (also keeps "+46…" phone numbers as text).
function clean(v) {
  if (v === undefined || v === null) return "";
  let s = String(v).trim().slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
