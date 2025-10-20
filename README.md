# Red ma Kärntnerisch! – Bachelorprojekt

Interaktive Einseiten-Anwendung für das FH-Kärnten Bachelorprojekt. Besucher:innen tippen auf Hochdeutsch und erhalten logisch zusammenhängende Antworten im mittelkärntnerischen Dialekt.

## Inhalte

- Übersetzer: Hochdeutsch → Kärntnerisch (Text oder per Audio-Mock)
- Dialekt-Chatbot mit Intent-Logik + optionaler Live-Anbindung an Chat-Completions-APIs
- Projektüberblick zu Features, Technik, Evaluation und Datenschutz

## Nutzung

1. Öffne `index_chat_plus.html` im Browser (lokal genügt ein Doppelklick oder ein kleines `python -m http.server`).
2. Klicke auf **API Setup** (rechts oben) bzw. den Hinweis unterhalb der Live-Demo.
3. Trage einen gültigen Schlüssel für einen OpenAI-kompatiblen Endpoint ein. Unterstützt werden z. B.:
   - `https://api.openai.com/v1` mit einem OpenAI-Key
   - `https://openrouter.ai/api/v1` mit einem OpenRouter-Key (Modellnamen inkl. Anbieter, z. B. `openrouter/openai/gpt-4o-mini`)
4. Speichere die Einstellungen. Sie liegen ausschließlich im Browser-LocalStorage.
5. Stelle Fragen im Dialekt-Chat oder nutze den Übersetzer. Bei API-Problemen greift automatisch das Offline-Regelwerk.

> ⚠️ Für Produktivbetrieb sollte ein eigener Backend-Proxy eingesetzt werden, damit API-Keys nicht im Frontend liegen.

## Entwicklung

- Keine zusätzlichen Build-Schritte nötig (Vanilla HTML/CSS/JS + Tailwind via CDN)
- Einstellungen, Toasts und Chat-Verlauf werden clientseitig verwaltet
- Fallback-Regeln für Dialektantworten befinden sich in `replyFor()` sowie `toKaerntnerisch()` innerhalb der HTML-Datei

## Lizenz

Projektartefakt für Lehrzwecke – nutzbar und erweiterbar innerhalb des Studienprojekts.
