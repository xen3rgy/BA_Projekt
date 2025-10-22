/**
 * Handles modal interactions and exposes an API helper for OpenAI-compatible endpoints.
 */
export function initSettings({ showToast }) {
  const modal = document.getElementById('settingsModal');
  const openButtons = [
    document.getElementById('settingsBtn'),
    document.getElementById('settingsHintBtn'),
  ].filter(Boolean);
  const closeButton = document.getElementById('settingsClose');
  const form = document.getElementById('settingsForm');
  const resetButton = document.getElementById('settingsReset');

  const apiKeyInput = document.getElementById('apiKeyInput');
  const apiUrlInput = document.getElementById('apiUrlInput');
  const apiModelInput = document.getElementById('apiModelInput');
  const apiTempInput = document.getElementById('apiTempInput');

  const storage = {
    key: 'rk-api-key',
    url: 'rk-api-url',
    model: 'rk-api-model',
    temp: 'rk-api-temp',
  };

  const config = {
    key: localStorage.getItem(storage.key) ?? '',
    url: localStorage.getItem(storage.url) ?? '',
    model: localStorage.getItem(storage.model) ?? 'gpt-4o-mini',
    temperature: parseFloat(localStorage.getItem(storage.temp) ?? '0.3'),
  };

  const applyToForm = () => {
    if (apiKeyInput) apiKeyInput.value = config.key;
    if (apiUrlInput) apiUrlInput.value = config.url;
    if (apiModelInput) apiModelInput.value = config.model;
    if (apiTempInput) apiTempInput.value = isFinite(config.temperature) ? config.temperature : 0.3;
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    applyToForm();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButton?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (evt) => {
    if (evt.target === modal) closeModal();
  });

  form?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    config.key = apiKeyInput?.value.trim() ?? '';
    config.url = apiUrlInput?.value.trim() ?? '';
    config.model = apiModelInput?.value.trim() || 'gpt-4o-mini';
    const parsed = parseFloat(apiTempInput?.value ?? '0.3');
    config.temperature = Number.isNaN(parsed) ? 0.3 : parsed;

    localStorage.setItem(storage.key, config.key);
    localStorage.setItem(storage.url, config.url);
    localStorage.setItem(storage.model, config.model);
    localStorage.setItem(storage.temp, config.temperature.toString());

    closeModal();
    showToast('API‑Einstellungen gespeichert.', 'success');
  });

  resetButton?.addEventListener('click', () => {
    config.key = '';
    config.url = '';
    config.model = 'gpt-4o-mini';
    config.temperature = 0.3;

    localStorage.removeItem(storage.key);
    localStorage.removeItem(storage.url);
    localStorage.removeItem(storage.model);
    localStorage.removeItem(storage.temp);

    applyToForm();
    showToast('API‑Einstellungen zurückgesetzt. Fallback‑Regeln werden verwendet.', 'info');
  });

  applyToForm();

  const ensureEndpoint = () => {
    const base = (config.url || 'https://api.openai.com/v1').replace(/\/$/, '');
    return `${base}/chat/completions`;
  };

  return {
    async callLLM(messages) {
      if (!config.key) {
        throw new Error('Kein API‑Key konfiguriert. Öffne „API Setup“ und trage einen Schlüssel ein.');
      }

      const response = await fetch(ensureEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.key}`,
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4o-mini',
          messages,
          temperature:
            typeof config.temperature === 'number' && !Number.isNaN(config.temperature)
              ? config.temperature
              : 0.3,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API‑Fehler (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (!content) {
        throw new Error('Keine Antwort vom Modell erhalten.');
      }
      return content;
    },
  };
}
