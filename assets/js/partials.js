/**
 * Fetches static HTML fragments and injects them into the matching container.
 * Containers need a `data-partial` attribute that points to the file path.
 */
export async function loadPartials() {
  const containers = Array.from(document.querySelectorAll('[data-partial]'));
  await Promise.all(
    containers.map(async (container) => {
      const url = container.getAttribute('data-partial');
      if (!url) return;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();
        container.innerHTML = html;
      } catch (error) {
        console.error(`Fehler beim Laden von ${url}:`, error);
        container.innerHTML =
          '<div class="text-red-500 text-sm">Teil konnte nicht geladen werden.</div>';
      }
    })
  );
}
