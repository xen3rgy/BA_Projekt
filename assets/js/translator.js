import { toKaerntnerisch } from './dialect.js';
import { addBubble, createThinking } from './ui.js';

const translatorSystemPrompt =
  'Du bist ein hochpräziser Übersetzer für mittelkärntnerischen Dialekt. Gib nur den übersetzten Satz zurück, keine Erklärungen. Pflege informellen, warmherzigen Ton, bleib logisch.';

export function initTranslator({ callLLM, showToast }) {
  const messages = document.getElementById('messages');
  const input = document.getElementById('input');
  const sendBtn = document.getElementById('sendBtn');

  const sendMessage = async () => {
    const text = input?.value.trim();
    if (!text) return;
    addBubble(messages, text, 'user');
    if (input) input.value = '';
    const thinking = createThinking(messages);

    try {
      const response = await callLLM([
        { role: 'system', content: translatorSystemPrompt },
        { role: 'user', content: `Übersetze ins mittelkärntnerische Dialektdeutsch. Gib nur den Dialekt zurück. Text: "${text}"` },
      ]);
      messages?.removeChild(thinking);
      addBubble(messages, response, 'assistant');
    } catch (error) {
      console.error(error);
      messages?.removeChild(thinking);
      const fallback = toKaerntnerisch(text) ||
        'I bin ma ned sicher – probier da Key in da API‑Konfiguration ei zum tragen.';
      addBubble(messages, fallback, 'assistant');
      showToast(error.message, 'error');
    }
  };

  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  sendBtn?.addEventListener('click', sendMessage);

  document.querySelectorAll('.ex-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (input) {
        input.value = button.getAttribute('data-ex') ?? '';
        input.focus();
      }
    });
  });
}

export { toKaerntnerisch };
