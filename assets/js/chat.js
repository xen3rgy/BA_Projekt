import { fallbackReply } from './dialect.js';
import { addBubble, createThinking } from './ui.js';

const chatSystemPrompt =
  'Du bist ein smarter Chatbot aus Kärnten. Antworte immer im mittelkärntnerischen Dialekt, kurze klare Sätze, logisch und hilfreich. Vermeide Hochdeutsch. Bleib respektvoll, keine verletzenden Inhalte.';

export function initChat({ callLLM, showToast }) {
  const chatMsgs = document.getElementById('chatMsgs');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatReset = document.getElementById('chatReset');
  const introText = chatMsgs?.getAttribute('data-intro') ??
    'Frag wos – i probier gscheit zu antwortn (im Dialekt).';

  let chatHistory = [];

  const sendChat = async () => {
    const text = chatInput?.value.trim();
    if (!text) return;
    addBubble(chatMsgs, text, 'user');
    if (chatInput) chatInput.value = '';
    chatHistory.push({ role: 'user', content: text });
    const thinking = createThinking(chatMsgs);

    try {
      const answer = await callLLM([
        { role: 'system', content: chatSystemPrompt },
        ...chatHistory,
      ]);
      chatHistory.push({ role: 'assistant', content: answer });
      chatMsgs?.removeChild(thinking);
      addBubble(chatMsgs, answer, 'assistant');
    } catch (error) {
      console.error(error);
      const fallback = fallbackReply(text);
      chatHistory.push({ role: 'assistant', content: fallback });
      chatMsgs?.removeChild(thinking);
      addBubble(chatMsgs, fallback, 'assistant');
      showToast(error.message, 'error');
    }
  };

  chatInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendChat();
    }
  });

  chatSend?.addEventListener('click', sendChat);

  chatReset?.addEventListener('click', () => {
    chatHistory = [];
    if (!chatMsgs) return;
    chatMsgs.innerHTML = '';
    addBubble(chatMsgs, introText, 'meta');
    showToast('Chat zurückgesetzt.', 'info');
  });

  document.querySelectorAll('.chat-ex').forEach((button) => {
    button.addEventListener('click', () => {
      if (chatInput) {
        chatInput.value = button.getAttribute('data-ex') ?? '';
        chatInput.focus();
      }
    });
  });
}
