const { dialog } = require("electron");
const exportHammerspoon = require("./export_hammerspoon.js");
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const storage = require("./storage.js");
// IPC-Handler für eigene Bausteine
ipcMain.handle("eigeneBausteine:load", () => {
  return storage.loadEigeneBausteine();
});
ipcMain.handle("eigeneBausteine:save", (event, bausteine) => {
  storage.saveEigeneBausteine(bausteine);
});

// IPC-Handler für Hammerspoon-Export
ipcMain.handle(
  "eigeneBausteine:exportHammerspoon",
  async (event, bausteine) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Hammerspoon-Lua-Skript exportieren",
      defaultPath: require("path").join(
        app.getPath("desktop"),
        "jura_textedit_hammerspoon.lua"
      ),
      filters: [{ name: "Lua Script", extensions: ["lua"] }],
    });
    if (!canceled && filePath) {
      exportHammerspoon.exportHammerspoonLua(bausteine, filePath);
      return { success: true, filePath };
    }
    return { success: false };
  }
);

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: require("path").join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  // Hotkeys für alle Bausteine: Ctrl+Alt+F1 bis F19 (max. 19 Bausteine)
  const bausteinMap = [];
  const bausteinCounts = [2, 6, 11]; // Anzahl Bausteine pro Kategorie (anpassen bei Änderungen)
  let fKey = 1;
  for (let catIdx = 0; catIdx < bausteinCounts.length; catIdx++) {
    for (let bIdx = 0; bIdx < bausteinCounts[catIdx]; bIdx++) {
      if (fKey > 19) break;
      const hotkey = `Control+Alt+F${fKey}`;
      bausteinMap.push({ catIdx, bIdx, hotkey });
      try {
        globalShortcut.register(hotkey, () => {
          if (win) win.webContents.send("hotkey-baustein", { catIdx, bIdx });
        });
      } catch (e) {
        console.error(`Fehler bei Hotkey-Registrierung: ${hotkey}`, e);
      }
      fKey++;
    }
  }
  // Optional: Hotkey-Übersicht in Konsole ausgeben
  console.log("Hotkey-Zuordnung für Textbausteine:");
  bausteinMap.forEach(({ catIdx, bIdx, hotkey }) => {
    console.log(`${hotkey}: Kategorie ${catIdx + 1}, Baustein ${bIdx + 1}`);
  });
});

app.on("window-all-closed", () => {
  globalShortcut.unregisterAll();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
