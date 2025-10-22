import { pick, timeNow, weekday } from './utils.js';

/** Simple rule-based mock translator Hochdeutsch -> Kärntnerisch */
export function toKaerntnerisch(text = '') {
  if (!text) return '';
  const rules = [
    [/guten tag/gi, 'Grias di'],
    [/hallo/gi, 'Servas'],
    [/ich habe/gi, 'I hob'],
    [/ich hab/gi, 'I hob'],
    [/ich bin/gi, 'I bin'],
    [/du bist/gi, 'Du bist'],
    [/nicht/gi, 'ned'],
    [/kein/gi, 'koan'],
    [/klein/gi, 'klaa'],
    [/ganz/gi, 'gonz'],
    [/gut/gi, 'leiwaund'],
    [/sehr/gi, 'voll'],
    [/vielleicht/gi, 'vielleichts'],
    [/was/gi, 'wos'],
    [/wie/gi, 'wia'],
    [/auch/gi, 'aa'],
    [/euch/gi, 'enk'],
    [/euer/gi, 'eich'],
    [/mir/gi, 'ma'],
    [/dir/gi, 'da'],
    [/mit/gi, 'mitn'],
    [/ich/gi, 'I'],
    [/nicht\s+gewusst/gi, 'ned gwusst'],
    [/sehr gut/gi, 'ur leiwaund'],
  ];

  return rules.reduce((out, [regex, replacement]) => out.replace(regex, replacement), text);
}

const lokalTipps = [
  'Geh am Drauufer spaziern und hol da a Eis – simpel, oba guat.',
  'A gscheite Hauskost beim bodenständign Wirt – Preis passt, Portionen aa.',
  'Villacher Alpenstraße auffi – Aussicht is leiwaund (wennst a Auto host).',
  'Kleiner Stadtbummel am Hauptplatz, dann Kaffee – klassisch und gemütlich.',
];

const studiumTipps = [
  'Lern täglich 45–60 Minuten fokussiert, ned marathonn.',
  'Schreib da a kurze Zusammenfassung nach jeder Einheit – bleibt bessa picken.',
  'Frag de Prof früh, wenn wos unklar is – spart da Nerven.',
  'Mach 2–3 Übungsbeispiele statt 20 Seiten Theorie lesen.',
];

/** Intent-based fallback answer for the chat when no API is configured */
export function fallbackReply(text = '') {
  const t = text.toLowerCase();

  if (/hallo|servus|gria[sß]|hi|hey/.test(t)) return 'Servas! Wos gibt’s?';
  if (/wie geht/.test(t)) return 'Jo passt, danke – a bissl stressig, oba geht scho. Wia schaugts bei da aus?';
  if (/wetter|regen|sonne|temperatur/.test(t)) return 'I bin ka Wetterfrosch, oba nimm a Joppe mit – in Kärnten wechselt’s gschwind.';
  if (/villach|klagenfurt|kärnten/.test(t))
    return `In ${t.includes('villach') ? 'Villach' : 'Kärnten'} geht imma wos: ${pick(lokalTipps)}`;
  if (/essen|lokal|restaurant|mittag|mittagessen|abendessen/.test(t))
    return `I würd a bodenständign Wirt empfehlen: ${pick(lokalTipps)}`;
  if (/hilfe|kannst du.*helfen|problem|fehler|bug/.test(t))
    return 'Sicher. Erzähl gnaue – wos geht ned? Gemma Schritt für Schritt durch.';
  if (/studium|fh|prof|prüfung|lernen|examen|klausur/.test(t)) return `Für’s Studium: ${pick(studiumTipps)}`;
  if (/motivation|keine lust|prokrastinier/.test(t))
    return 'Kloa Tipp: 10‑Minuten‑Regel. Fang klan an – meistens bleibst dann eh dabei.';
  if (/zeit|uhr|spät/.test(t)) return `Es is grad ${timeNow()} am ${weekday()}. Pack zam, mach a Pause.`;
  if (/danke|thx|dankeschön/.test(t)) return 'Gern gschehn! Wenn no wos is, sog einfach.';
  if (/sport|laufen|fitness|training/.test(t)) return 'A lockere 20‑Minuten‑Rundn reicht. Wichtig is: regelmäßig, ned extrem.';
  if (/projekt|chatbot|dialekt|korpus/.test(t))
    return 'Fokus: Mittelkärntnerisch, klares Regelwerk und a Handvoll Beispiel‑Sätze, dann iteriern.';
  if (/idee|vorschlag|was soll ich machen/.test(t))
    return 'Pick a klans Ziel für heit und bring des bis zum Ende. Danach belohn di – Kaffee oder Spaziern.';

  return 'Klingt spannend. I würd sagen: mach langsam, denk a bissl nach und wennst magst, schaun ma glei drüber.';
}
