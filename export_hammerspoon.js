// Exportiert die Textbausteine als Hammerspoon-Lua-Skript
const fs = require("fs");
const path = require("path");

function sanitizeLuaKey(str) {
  // Erlaubt nur Buchstaben, Zahlen und Unterstriche
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function exportHammerspoonLua(bausteine, outPath) {
  let lua = "-- Jura-TextEdit: Textbausteine für Hammerspoon\n";
  lua +=
    "-- Dieses Skript wird automatisch generiert. Hotkey-Bindings bitte selbst ergänzen!\n\n";
  lua += "local textbausteine = {\n";
  for (const b of bausteine) {
    const key = sanitizeLuaKey(b.name);
    const value = b.text
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");
    lua += `  ${key} = "${value}",\n`;
  }
  lua += "}\n\n";
  lua += "function insertBaustein(name)\n";
  lua += "  local text = textbausteine[name]\n";
  lua += "  if text then\n";
  lua += "    hs.pasteboard.setContents(text)\n";
  lua += "    hs.eventtap.keyStroke({'cmd'}, 'v')\n";
  lua += "  else\n";
  lua += '    hs.alert.show("Textbaustein nicht gefunden: " .. name)\n';
  lua += "  end\n";
  lua += "end\n\n";
  lua += "-- Beispiel für eigene Hotkey-Bindings (vom User zu ergänzen):\n";
  lua +=
    "-- hs.hotkey.bind({'ctrl', 'alt'}, '1', function() insertBaustein('grussformel') end)\n";
  lua +=
    "-- hs.hotkey.bind({'ctrl', 'alt'}, '2', function() insertBaustein('herzliche_gruesse') end)\n";

  fs.writeFileSync(outPath, lua, "utf-8");
}

module.exports = { exportHammerspoonLua };
