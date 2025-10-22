/**
 * Reusable UI building blocks.
 */
export function addBubble(container, text, role, options = {}) {
  if (!container) return null;
  const div = document.createElement('div');

  if (role === 'user') {
    div.className = 'ml-auto max-w-[85%] rounded-2xl border px-3 py-2 bg-white';
  } else if (role === 'assistant') {
    div.className = 'mr-auto max-w-[85%] rounded-2xl border px-3 py-2 bg-amber-50';
  } else {
    div.className = 'mx-auto text-xs text-gray-500';
  }

  if (options.asHTML) {
    div.innerHTML = text;
  } else {
    div.textContent = text;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

export function createThinking(container) {
  return addBubble(
    container,
    '<span class="spinner"></span><span class="align-middle">… denk nach</span>',
    'assistant',
    { asHTML: true }
  );
}
