# Jura-TextEdit

Professionelle, plattformübergreifende Textbaustein-Software für Juristen, Kanzleien und Vielschreiber.

## Features

- Textbausteine in Kategorien (z.B. Grußformeln, Paragraphen, eigene Formulierungen)
- Eigene Textbausteine anlegen, verwalten und dauerhaft speichern
- Moderne, übersichtliche Benutzeroberfläche (Dark/Light-Mode)
- Systemweite Hotkey-Integration (über Hammerspoon für macOS)
- Export der eigenen Textbausteine als Hammerspoon-Lua-Skript
- (Optional: Export/Import, KI-Integration, Settings, Backup – in Planung)

## Installation

1. **Voraussetzung:** [Node.js](https://nodejs.org/) und [npm](https://www.npmjs.com/) installiert
2. Projektverzeichnis öffnen:
   ```bash
   cd textbaustein-electron
   npm install
   npm start
   ```
3. Die App startet als Electron-Desktop-Anwendung.

## Eigene Textbausteine dauerhaft speichern

- Eigene Textbausteine werden automatisch im Benutzerverzeichnis gespeichert und beim Start geladen.

## Systemweite Hotkeys mit Hammerspoon (macOS)

### Schritt-für-Schritt-Anleitung

1. **Hammerspoon installieren:**
   - Download: https://www.hammerspoon.org/
   - Installieren und starten
2. **Konfigurationsordner öffnen:**
   ```bash
   open ~/.hammerspoon
   ```
   Falls der Ordner nicht existiert:
   ```bash
   mkdir ~/.hammerspoon
   open ~/.hammerspoon
   ```
3. **init.lua anlegen oder bearbeiten:**
   - Datei `init.lua` im Ordner `~/.hammerspoon/` anlegen oder öffnen
4. **Textbausteine exportieren:**
   - In der App auf „Eigene Textbausteine als Hammerspoon-Skript exportieren“ klicken
   - Die Datei speichern und den Inhalt in `init.lua` einfügen (oder per `require` einbinden)
5. **Hotkey-Bindings ergänzen:**
   - Am Ende der Datei z.B.:
     ```lua
     hs.hotkey.bind({'ctrl', 'alt'}, '1', function() insertBaustein('grussformel') end)
     hs.hotkey.bind({'ctrl', 'alt'}, '2', function() insertBaustein('herzliche_gruesse') end)
     ```
6. **Hammerspoon neu laden:**
   - Menüleiste: Hammerspoon-Icon → „Reload Config“ oder `cmd+ctrl+R`
7. **Testen:**
   - Hotkeys in beliebigem Textfeld drücken – der Textbaustein wird eingefügt.

**Hinweis:**

- Die Hotkey-Kombinationen sind frei wählbar und können an die eigenen Bedürfnisse angepasst werden.
- Fehler werden in der Hammerspoon-Konsole angezeigt.

## Windows: Systemweite Hotkeys

- Für Windows kann ein ähnliches Prinzip mit [AutoHotkey](https://www.autohotkey.com/) genutzt werden (Exportfunktion in Planung).

## macOS-Installer erstellen

Um einen Installer für macOS zu bauen, öffne das Projekt auf einem Mac und führe im Projektverzeichnis aus:

```bash
npm install
npm run dist-mac
```

Die fertige DMG-Datei findest du anschließend im `dist/`-Ordner.

**Hinweis:**

- macOS-Installer können nur auf einem Mac gebaut werden, nicht unter Windows/Linux.
- Die Hammerspoon-Exportfunktion ist nur für macOS relevant und wird unter Windows ausgeblendet.

## Roadmap

- Settings-Feature (API-Key, Theme, Hotkey-Konfiguration)
- Export/Import von Textbausteinen
- KI-Integration (z.B. OpenAI)
- Backup/Restore
- Verbesserte Hotkey-Übersicht und Konflikterkennung

## Lizenz

MIT
