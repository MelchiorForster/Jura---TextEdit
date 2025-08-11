// storage.js
// Einfache persistente Speicherung für eigene Textbausteine
const { app } = require("electron");
const fs = require("fs");
const path = require("path");

const userDataPath = app ? app.getPath("userData") : process.env.APPDATA;
const filePath = path.join(userDataPath, "eigene_bausteine.json");

function loadEigeneBausteine() {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Fehler beim Laden der eigenen Bausteine:", e);
  }
  return [];
}

function saveEigeneBausteine(bausteine) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(bausteine, null, 2), "utf-8");
  } catch (e) {
    console.error("Fehler beim Speichern der eigenen Bausteine:", e);
  }
}

module.exports = { loadEigeneBausteine, saveEigeneBausteine };
