// Editorial sub-page / article model, built around the reference "trade
// page" structure: a dark hero, then full-width sections that alternate
// tone — a "moment of search" section with a search-query visual, a
// "what we build" entry list, and generic narrative sections. Kept as
// plain typed data so a CMS/MDX can replace it later without touching the
// layout.

export type Section =
  | {
      kind: "search";
      kicker: string;
      heading: string[];
      body: string[];
      queries: string[];
      caption: string;
    }
  | {
      kind: "build";
      kicker: string;
      heading: string[];
      lede?: string;
      items: { title: string; body: string }[];
    }
  | {
      kind: "prose";
      kicker: string;
      heading: string[];
      body: string[];
      theme?: "dark" | "light";
    };

export type Article = {
  slug: string;
  kicker: string;
  title: string[]; // lines for the hero reveal
  lede: string;
  date: string;
  readingMinutes: number;
  sections: Section[];
};

export const articles: Article[] = [
  {
    slug: "syns-i-kartresultaten",
    kicker: "Local SEO",
    title: ["Så hamnar kliniken", "i Googles kartresultat"],
    lede: "Någon har tandvärk klockan elva på kvällen. En förälder söker akut tid åt sitt barn. Ingen av dem bläddrar till träff nummer tio — de ringer en av de tre klinikerna i kartrutan högst upp. Här är vad som avgör vilka tre det blir.",
    date: "September 2026",
    readingMinutes: 7,
    sections: [
      {
        kind: "search",
        kicker: "Ögonblicket då någon söker",
        heading: ["Ingen letar efter", "just er klinik."],
        body: [
          "En patient som söker tandläkare söker sällan på ert namn — de söker på sitt behov och sin ort. De jämför de kliniker som dyker upp, tittar på betyg och avstånd, och ringer den som känns enklast och tryggast.",
          "Så sidan och profilen måste göra två saker snabbt: se ut som en klinik som vet vad den gör, och göra samtalet lätt att ta. Det är där de flesta kliniker tappar patienter — inte på behandlingen, utan i sökögonblicket.",
        ],
        queries: [
          "tandläkare {er stad}",
          "akut tandläkare nära mig",
          "tandimplantat {er stad}",
          "tandblekning pris",
        ],
        caption:
          "Fyra sökningar, fyra olika patienter. Kartrutan avgör vem de ringer.",
      },
      {
        kind: "build",
        kicker: "Vad som avgör placeringen",
        heading: ["Det här väger Google", "samman — och nästan", "allt går att påverka."],
        lede:
          "Att ta en av de tre platserna i kartrutan är inte tur. Det är summan av ett antal signaler, och de flesta ligger i er kontroll.",
        items: [
          {
            title: "Google-profilen, skött löpande",
            body: "Rätt kategorier, tjänster, öppettider och nya foton — hållna aktuella, inte uppsatta en gång och lämnade. En levande profil signalerar en aktiv klinik.",
          },
          {
            title: "Recensioner som är färska",
            body: "Antal och betyg spelar roll, men även hur nyligen de kom in. En jämn ström av nya omdömen väger tyngre än femtio från 2021. Vi gör det enkelt för nöjda patienter att lämna omdöme.",
          },
          {
            title: "Sidor byggda för lokal sökning",
            body: "Service × ort: en sida för implantat i er stad, en för akut tandvård i er stad. Det är så Google förstår vad ni gör och var — och så patienten hittar rätt direkt.",
          },
          {
            title: "Bevis varje månad",
            body: "Vi mäter var ni ligger i kartresultaten och visar er utvecklingen svart på vitt — så ni ser att det rör sig, istället för att lita på löften.",
          },
        ],
      },
      {
        kind: "prose",
        theme: "dark",
        kicker: "Vad ni realistiskt kan vänta er",
        heading: ["Ingen ärlig byrå", "lovar en placering."],
        body: [
          "Lokal synlighet byggs upp över tid och beror på konkurrensen i just ert område. Den som garanterar förstaplatsen säljer något.",
          "Det vi kan göra är att arbeta metodiskt med signalerna ovan, mäta varje månad och visa er siffrorna. Ni stannar för att det fungerar — inte för att ni sitter fast.",
        ],
      },
    ],
  },
];

articles.push(
  {
    slug: "vad-kostar-google-ads-tandklinik",
    kicker: "Google Ads",
    title: ["Vad kostar det att köra", "Google Ads för en klinik?"],
    lede: "Det ärliga svaret är ”det beror på” — men det betyder inte att ni ska gå i blindo. Här är hur ni räknar så att annonsbudgeten faktiskt hänger ihop med bokade patienter, och vad som gör att ni betalar mer eller mindre än grannkliniken.",
    date: "September 2026",
    readingMinutes: 8,
    sections: [
      {
        kind: "prose",
        theme: "light",
        kicker: "Det korta svaret",
        heading: ["Fel fråga:", "”vad kostar ett klick?”"],
        body: [
          "Ett klick på ”tandläkare” kan kosta allt från några kronor till långt över hundra, beroende på ort och konkurrens. Men klickpriset säger ingenting om vad en patient kostar er — och det är patienten ni betalar för.",
          "Rätt fråga är: vad kostar en bokad tid, och vad är den patienten värd för kliniken? Först då blir en budget ett beslut istället för en gissning.",
        ],
      },
      {
        kind: "build",
        kicker: "Vad som styr priset",
        heading: ["Fyra saker avgör", "vad ni betalar."],
        lede:
          "Två kliniker i samma stad kan betala helt olika för samma patient. Skillnaden ligger nästan alltid i dessa fyra.",
        items: [
          {
            title: "Konkurrensen i er ort",
            body: "Ju fler kliniker som bjuder på samma sökningar, desto högre klickpris. I storstad är det tuffare än i en mindre ort — men också fler patienter att vinna.",
          },
          {
            title: "Hur specifik sökningen är",
            body: "”tandläkare” är brett och dyrt. ”tandimplantat pris {ort}” är smalare, dyrare per klick — men patienten är närmare beslut och värd mycket mer. Rätt sökningar sänker den verkliga kostnaden per patient.",
          },
          {
            title: "Kvaliteten på annons och sida",
            body: "Google belönar annonser och landningssidor som matchar sökningen med lägre klickpris (Quality Score). En snabb, relevant sida gör att samma budget räcker längre.",
          },
          {
            title: "Hur väl ni utesluter slöseri",
            body: "Utan negativa sökord betalar ni för jobbsökare, ”gratis” och nyfikna. Det är budget som aldrig kunde bli en patient.",
          },
        ],
      },
      {
        kind: "prose",
        theme: "dark",
        kicker: "Räkna baklänges",
        heading: ["Börja i patientvärdet,", "inte i klickpriset."],
        body: [
          "Är en implantatpatient värd tiotusentals kronor tål annonseringen ett högre klickpris — det räcker att en liten andel av klicken bokar för att det ska gå ihop. Är det en enkel undersökning med lågt värde måste kostnaden per klick hållas nere och volymen upp.",
          "Det är därför vi aldrig sätter en budget löst. Vi utgår från vad en patient är värd för just er, hur många av besökarna som realistiskt bokar, och hur mycket ni då har råd att betala för att vinna en.",
        ],
      },
      {
        kind: "prose",
        theme: "light",
        kicker: "Så gör vi",
        heading: ["Börja stramt.", "Skala det som bokar."],
        body: [
          "Vi startar fokuserat på de sökningar där patienten är redo att boka, mäter hur många bokade tider budgeten ger, och skalar upp det som fungerar — inte det som ser billigast ut i kontot.",
          "Att det går med en liten budget är inget påstående: Maren Tandvård nådde 14 nya patienter i månaden på 1 500 kr — genom fokus, inte genom att spendera mer. Ingen kan lova ett exakt antal, men disciplinen är densamma oavsett budget.",
        ],
      },
    ],
  },
  {
    slug: "vad-ar-seo-tandklinik",
    kicker: "SEO",
    title: ["Vad är SEO — och vad", "gör det för en klinik?"],
    lede: "SEO är att synas på Google utan att betala per klick. För en tandklinik handlar det mindre om tricks och mer om att vara den självklara kliniken när någon i er stad söker efter det ni gör. Här är vad det faktiskt betyder — och vad det inte gör.",
    date: "September 2026",
    readingMinutes: 7,
    sections: [
      {
        kind: "search",
        kicker: "Där patienter börjar",
        heading: ["Nästan varje ny patient", "börjar med en sökning."],
        body: [
          "Innan någon ringer har de nästan alltid sökt. De skriver in sitt behov och sin ort, tittar på vilka kliniker som dyker upp, och väljer en av de första. SEO handlar om att bli en av dem — organiskt, utan att betala för varje klick.",
          "Skillnaden mot annonser: en topplacering ni byggt upp fortsätter ge patienter även de månader ni inte lägger en krona på annonsering.",
        ],
        queries: [
          "tandläkare {er stad}",
          "tandhygienist nära mig",
          "tandimplantat {er stad}",
          "invisalign {er stad}",
        ],
        caption:
          "För varje sådan sökning finns en topplacering att ta — eller att lämna till en konkurrent.",
      },
      {
        kind: "build",
        kicker: "Tre sorters SEO",
        heading: ["SEO är tre saker", "för en klinik."],
        lede:
          "De hänger ihop, men gör olika jobb. En klinik behöver alla tre.",
        items: [
          {
            title: "Local SEO",
            body: "Google-profilen, kartresultaten och recensionerna. Det här avgör om ni syns i rutan högst upp när någon söker lokalt — och det är där de flesta patienter faktiskt klickar.",
          },
          {
            title: "Innehålls-SEO",
            body: "Egna sidor för det ni vill bli hittade för: en sida för implantat i er stad, en för akut tandvård, en för tandblekning. Så förstår Google vad ni gör och kan visa er för rätt sökning.",
          },
          {
            title: "Teknisk SEO",
            body: "En sida som laddar snabbt, fungerar i mobilen och är byggd så Google enkelt kan läsa den. Utan grunden spelar innehållet mindre roll.",
          },
        ],
      },
      {
        kind: "prose",
        theme: "dark",
        kicker: "SEO vs Google Ads",
        heading: ["Ads ger patienter idag.", "SEO bygger i morgon."],
        body: [
          "Google Ads är som att hyra en plats högst upp — den försvinner dagen ni slutar betala. SEO är att bygga en plats ni äger, som fortsätter jobba. Det ena är hyra, det andra är kapital.",
          "De bästa resultaten kommer när de samarbetar: annonser fyller kalendern medan SEO:n mognar, och när den organiska synligheten är på plats kan annonsbudgeten läggas där den gör mest nytta.",
        ],
      },
      {
        kind: "prose",
        theme: "light",
        kicker: "Vad ni realistiskt kan vänta er",
        heading: ["SEO är ett bygge,", "inte en knapp."],
        body: [
          "Det tar månader, inte dagar, och hur snabbt beror på konkurrensen i er stad. Alla som lovar en förstaplats ”på två veckor” säljer något.",
          "Det vi kan göra är att arbeta metodiskt med de tre delarna ovan, mäta var ni ligger varje månad och visa er utvecklingen — så ni ser bygget växa fram istället för att lita på ord.",
        ],
      },
    ],
  },
  {
    slug: "marknadsforing-tandklinik",
    kicker: "Marknadsföring",
    title: ["Marknadsföring för kliniker:", "var pengarna gör nytta"],
    lede: "De flesta kliniker slösar inte för att de gör för lite — utan för att de optimerar en kanal i taget utan att se helheten. Här är hur ni tänker kring hela resan, från sökning till behandlingsstart, så varje krona jobbar mot en bokad patient.",
    date: "September 2026",
    readingMinutes: 6,
    sections: [
      {
        kind: "prose",
        theme: "light",
        kicker: "Hela resan",
        heading: ["Optimera aldrig", "en kanal i taget."],
        body: [
          "En patient rör sig genom en kedja: söker → klickar → hör av sig → bokar → kommer → påbörjar behandling. En sjunkande kostnad per klick betyder ingenting om de som klickar aldrig bokar.",
          "Därför tittar vi alltid på hela kedjan. Var tappar ni flest patienter? Det är där pengarna gör mest nytta — inte nödvändigtvis där de spenderas idag.",
        ],
      },
      {
        kind: "build",
        kicker: "Var pengarna gör mest nytta",
        heading: ["Fyra hävstänger", "för en klinik."],
        lede:
          "Ni behöver sällan allt på en gång. Men ni behöver veta vilken av dessa som är er största läcka.",
        items: [
          {
            title: "Hemsidan som bokar",
            body: "Snabb sida, tydligt pris och trygghet, nummer överst och bokning ett tryck bort. Ofta den billigaste förbättringen med störst effekt — ni betalar redan för trafiken, den bara bokar inte.",
          },
          {
            title: "Google Ads för akut och hög-intent",
            body: "När någon har ont eller ett tydligt behov idag vill ni synas direkt. Annonser fångar de patienter som inte kan vänta på att SEO:n mognar.",
          },
          {
            title: "Local SEO för långsiktig synlighet",
            body: "Google-profil, kartresultat och recensioner bygger en ström av patienter som fortsätter även de månader ni inte annonserar.",
          },
          {
            title: "Spårning så ni vet",
            body: "Utan mätning gissar ni. Med samtal, formulär och bokningar spårade ser ni vilken kanal som faktiskt fyller kalendern — och kan flytta pengarna dit.",
          },
        ],
      },
      {
        kind: "prose",
        theme: "dark",
        kicker: "Vanligaste misstaget",
        heading: ["Att jaga billiga klick", "istället för patienter."],
        body: [
          "Det är lätt att bli nöjd med en låg kostnad per klick eller en fin trafiksiffra. Men trafik som inte bokar är en kostnad, inte ett resultat.",
          "Vi mäter mot bokade tider och påbörjade behandlingar, för det är det enda som betalar löner. Allt annat är mellansteg på vägen dit.",
        ],
      },
      {
        kind: "prose",
        theme: "light",
        kicker: "Så börjar ni",
        heading: ["Börja med att se", "var ni tappar patienter."],
        body: [
          "Innan ni lägger en krona till: kartlägg var i kedjan patienterna försvinner idag. Ibland är det annonserna, ibland hemsidan, ibland att ingen mäter alls.",
          "Boka ett kort samtal så går vi igenom er klinik och pekar ut den största läckan — utan förpliktelser.",
        ],
      },
    ],
  },
);

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
