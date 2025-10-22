/**
 * Lightweight toast helper. Returns a function that can display messages.
 */
export function createToast(element) {
  if (!element) {
    return { show: () => {} };
  }

  let timeoutId;

  const resetTone = () => {
    element.classList.remove('border-emerald-400', 'border-amber-400', 'border-red-400');
  };

  return {
    show(message, tone = 'info') {
      element.textContent = message;
      element.classList.remove('hidden');
      resetTone();
      if (tone === 'success') element.classList.add('border-emerald-400');
      else if (tone === 'error') element.classList.add('border-red-400');
      else element.classList.add('border-amber-400');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        element.classList.add('hidden');
      }, 4200);
    },
  };
}
