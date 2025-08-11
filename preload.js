const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exportHammerspoon: (bausteine) =>
    ipcRenderer.invoke("eigeneBausteine:exportHammerspoon", bausteine),
});
