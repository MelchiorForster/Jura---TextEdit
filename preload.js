const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exportHammerspoon: (bausteine) =>
    ipcRenderer.invoke("eigeneBausteine:exportHammerspoon", bausteine),
  loadEigeneBausteine: () => ipcRenderer.invoke("eigeneBausteine:load"),
  saveEigeneBausteine: (data) =>
    ipcRenderer.invoke("eigeneBausteine:save", data),
  onHotkeyCopy: (callback) => ipcRenderer.on("hotkey-copy", callback),
  onHotkeyCategory: (callback) => ipcRenderer.on("hotkey-category", callback),
  onHotkeyBaustein: (callback) => ipcRenderer.on("hotkey-baustein", callback),
});
