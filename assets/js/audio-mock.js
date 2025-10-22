import { toKaerntnerisch } from './translator.js';

/**
 * Simulates audio capture, STT and TTS with static text.
 */
export function initAudioMock() {
  const recBtn = document.getElementById('recBtn');
  const sttBtn = document.getElementById('sttBtn');
  const ttsBtn = document.getElementById('ttsBtn');
  const sttText = document.getElementById('sttText');
  const dialektText = document.getElementById('dialektText');
  let recording = false;

  recBtn?.addEventListener('click', () => {
    recording = !recording;
    if (recBtn) {
      recBtn.textContent = recording ? '● Aufnahme läuft (Mock)' : 'Aufnahme starten (Mock)';
      recBtn.classList.toggle('bg-red-50', recording);
    }
  });

  sttBtn?.addEventListener('click', () => {
    const sample = 'Hallo, ich bin gerade in Villach und brauche eine Auskunft.';
    if (sttText) sttText.textContent = sample;
    if (dialektText) dialektText.textContent = toKaerntnerisch(sample);
  });

  ttsBtn?.addEventListener('click', () => {
    alert('TTS (Mock) – Dialekt wird abgespielt');
  });
}
