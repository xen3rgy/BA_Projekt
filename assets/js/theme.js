/**
 * Connects the dark mode toggle button to the HTML root element.
 */
export function initDarkModeToggle(options = {}) {
  const storageKey = options.storageKey ?? 'rk-dark';
  const button = document.getElementById('darkToggle');
  if (!button) return;

  const syncLabel = () => {
    const dark = document.documentElement.classList.contains('dark');
    button.textContent = dark ? 'Light Mode' : 'Dark Mode';
  };

  button.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem(storageKey, isDark ? '1' : '0');
    } catch (error) {
      console.warn('Konnte Theme nicht speichern:', error);
    }
    syncLabel();
  });

  syncLabel();
}
