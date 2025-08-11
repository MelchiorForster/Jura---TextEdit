-- Jura-TextEdit: Textbausteine für Hammerspoon
-- Dieses Skript wird automatisch generiert. Hotkey-Bindings bitte selbst ergänzen!

local textbausteine = {
  -- Beispiel: name = "Text"
}

function insertBaustein(name)
  local text = textbausteine[name]
  if text then
    hs.pasteboard.setContents(text)
    hs.eventtap.keyStroke({'cmd'}, 'v')
  else
    hs.alert.show("Textbaustein nicht gefunden: " .. name)
  end
end

-- Beispiel für eigene Hotkey-Bindings (vom User zu ergänzen):
-- hs.hotkey.bind({'ctrl', 'alt'}, '1', function() insertBaustein('grussformel') end)
-- hs.hotkey.bind({'ctrl', 'alt'}, '2', function() insertBaustein('herzliche_gruesse') end)
