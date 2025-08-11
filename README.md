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

## Automatischer Build & Installer-Download (GitHub Actions)

Mit jedem Push auf den `main`-Branch werden automatisch plattformübergreifende Installer (Windows & macOS) gebaut und als Download bereitgestellt.

- Die fertigen Installer findest du nach jedem Build unter [GitHub Actions → Artifacts](https://github.com/MelchiorForster/Jura---TextEdit/actions).
- macOS-Installer (DMG) werden auf echten Macs via GitHub Actions gebaut.
- Windows-Installer (EXE) werden auf Windows-Runnern gebaut.

**Hinweis:**

- macOS-Installer können nur auf macOS (bzw. über GitHub Actions) gebaut werden, nicht unter Windows/Linux.
- Die Hammerspoon-Exportfunktion ist nur für macOS relevant und wird unter Windows ausgeblendet.

### Status-Badge

![Build Status](https://github.com/MelchiorForster/Jura---TextEdit/actions/workflows/build.yml/badge.svg)

## Roadmap

- Settings-Feature (API-Key, Theme, Hotkey-Konfiguration)
- Export/Import von Textbausteinen
- KI-Integration (z.B. OpenAI)
- Backup/Restore
- Verbesserte Hotkey-Übersicht und Konflikterkennung

## Lizenz

MIT
