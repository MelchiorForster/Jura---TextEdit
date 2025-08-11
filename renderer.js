// Exportfunktion für Hammerspoon-Lua-Skript
async function exportEigeneBausteineHammerspoon() {
  const eigene = kategorien[0].bausteine;
  const result = await window.electronAPI.exportHammerspoon(eigene);
  if (result && result.success) {
    alert("Export erfolgreich!\nSkript gespeichert unter:\n" + result.filePath);
  }
}
window.exportEigeneBausteineHammerspoon = exportEigeneBausteineHammerspoon;
// Textbausteine mit Kategorien
const kategorien = [
  {
    name: "Eigene Formulierungen",
    bausteine: [], // Wird beim Start geladen
  },
  {
    name: "Grußformulierungen",
    bausteine: [
      { name: "Grußformel", text: "Mit freundlichen Grüßen\nMelchior" },
      { name: "Herzliche Grüße", text: "Herzliche Grüße\nMelchior" },
    ],
  },
  {
    name: "Paragraphen",
    bausteine: [
      {
        name: "§ 1 BGB",
        text: "Die Rechtsfähigkeit des Menschen beginnt mit der Vollendung der Geburt.",
      },
      {
        name: "§ 242 BGB",
        text: "Der Schuldner ist verpflichtet, die Leistung so zu bewirken, wie Treu und Glauben mit Rücksicht auf die Verkehrssitte es erfordern.",
      },
      {
        name: "§ 823 BGB",
        text: "Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit, das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist dem anderen zum Ersatz des daraus entstehenden Schadens verpflichtet.",
      },
      {
        name: "§ 929 BGB",
        text: "Die Übertragung des Eigentums an einer beweglichen Sache erfolgt durch Einigung des Veräußerers und des Erwerbers und Übergabe der Sache.",
      },
      {
        name: "§ 433 BGB",
        text: "Durch den Kaufvertrag wird der Verkäufer einer Sache verpflichtet, dem Käufer die Sache zu übereignen und ihm das Eigentum daran zu verschaffen. Der Käufer ist verpflichtet, dem Verkäufer den vereinbarten Kaufpreis zu zahlen und die gekaufte Sache abzunehmen.",
      },
      {
        name: "§ 119 BGB",
        text: "Wer bei der Abgabe einer Willenserklärung über deren Inhalt im Irrtum war oder eine Erklärung dieses Inhalts überhaupt nicht abgeben wollte, kann die Erklärung anfechten, wenn anzunehmen ist, dass er sie bei Kenntnis der Sachlage und bei verständiger Würdigung des Falles nicht abgegeben haben würde.",
      },
    ],
  },
  {
    name: "Anwaltspez. Formulierungen",
    bausteine: [
      {
        name: "Fristsache",
        text: "Wir weisen darauf hin, dass es sich um eine Fristsache handelt.",
      },
      {
        name: "Mandatsannahme",
        text: "Hiermit bestätigen wir die Annahme des Mandats.",
      },
      {
        name: "Mandatsbestätigung",
        text: "Hiermit bestätigen wir die Übernahme des Mandats in der oben genannten Angelegenheit.",
      },
      {
        name: "Vollmacht",
        text: "Anbei übersenden wir Ihnen die unterzeichnete Vollmacht.",
      },
      {
        name: "Fristverlängerung",
        text: "Wir beantragen höflich die Verlängerung der gesetzten Frist um weitere zwei Wochen.",
      },
      {
        name: "Akteneinsicht",
        text: "Wir bitten um Übersendung der Akte zur Einsichtnahme.",
      },
      {
        name: "Zahlungsaufforderung",
        text: "Wir fordern Sie auf, den ausstehenden Betrag bis spätestens zum [Datum] zu begleichen.",
      },
      {
        name: "Klageankündigung",
        text: "Sollte die Zahlung nicht fristgerecht eingehen, behalten wir uns die Einleitung gerichtlicher Schritte vor.",
      },
      {
        name: "Vergleichsvorschlag",
        text: "Im Interesse einer gütlichen Einigung unterbreiten wir folgenden Vergleichsvorschlag: …",
      },
      {
        name: "Rücknahmeerklärung",
        text: "Hiermit erklären wir die Rücknahme der Klage.",
      },
      {
        name: "Empfangsbekenntnis",
        text: "Das Empfangsbekenntnis wird anliegend zurückgereicht.",
      },
    ],
  },
  {
    name: "Kopf/ Fußzeile",
    bausteine: [
      {
        name: "Kopfzeile Standard",
        text: "Kanzlei Muster & Partner\nRechtsanwälte\nMusterstraße 1\n12345 Musterstadt",
      },
      {
        name: "Fußzeile Standard",
        text: "Telefon: 01234/567890 | Fax: 01234/567891\nE-Mail: info@kanzlei-muster.de | www.kanzlei-muster.de",
      },
      {
        name: "Kopfzeile Abteilung",
        text: "Abteilung Arbeitsrecht\nKanzlei Muster & Partner",
      },
      {
        name: "Fußzeile Bankverbindung",
        text: "Bank: Musterbank\nIBAN: DE00 1234 5678 9012 3456 00\nBIC: MUSTDEFFXXX",
      },
    ],
  },
];

let aktuelleKategorie = 0;

function renderKategorien() {
  const select = document.getElementById("kategorie-select");
  select.innerHTML = "";
  // Kategorien alphabetisch sortieren, aber "Eigene Formulierungen" ans Ende
  const eigeneIdx = kategorien.findIndex(
    (k) => k.name === "Eigene Formulierungen"
  );
  const sorted = kategorien
    .map((k, idx) => ({ ...k, origIdx: idx }))
    .filter((k, idx) => idx !== eigeneIdx)
    .sort((a, b) => a.name.localeCompare(b.name));
  if (eigeneIdx !== -1)
    sorted.push({ ...kategorien[eigeneIdx], origIdx: eigeneIdx });
  sorted.forEach((k, i) => {
    const option = document.createElement("option");
    option.value = k.origIdx;
    option.textContent = k.name;
    select.appendChild(option);
  });
  select.value = aktuelleKategorie;
}

function renderList() {
  const list = document.getElementById("baustein-list");
  list.innerHTML = "";
  kategorien[aktuelleKategorie].bausteine.forEach((b, idx) => {
    const li = document.createElement("li");
    li.textContent = b.name;
    li.onclick = () => {
      document.getElementById("baustein-text").value = b.text;
    };
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // Eigene Bausteine laden
  const eigene = await window.electronAPI.loadEigeneBausteine();
  if (Array.isArray(eigene)) {
    kategorien[0].bausteine = eigene;
  }
  renderKategorien();
  renderList();
  // Event-Listener für neuen Baustein
  document.getElementById("add-baustein-btn").onclick = async () => {
    const name = document.getElementById("new-baustein-name").value.trim();
    const text = document.getElementById("new-baustein-text").value.trim();
    if (!name || !text) return;
    kategorien[0].bausteine.push({ name, text });
    // Speichern
    await window.electronAPI.saveEigeneBausteine(kategorien[0].bausteine);
    document.getElementById("new-baustein-name").value = "";
    document.getElementById("new-baustein-text").value = "";
    if (aktuelleKategorie === 0) renderList();
  };
  document.getElementById("kategorie-select").onchange = (e) => {
    aktuelleKategorie = parseInt(e.target.value);
    renderList();
    document.getElementById("baustein-text").value = "";
  };
  document.getElementById("copy-btn").onclick = () => {
    const text = document.getElementById("baustein-text").value;
    navigator.clipboard.writeText(text);
  };

  // ...alle IPC-Events laufen jetzt über window.electronAPI...
});
