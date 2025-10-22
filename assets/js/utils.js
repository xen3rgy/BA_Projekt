/** Generic utility helpers shared across modules. */
export const pick = (items) => items[Math.floor(Math.random() * items.length)];

export const timeNow = () => new Date().toLocaleTimeString();

export const weekday = () =>
  ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][
    new Date().getDay()
  ];

export function setCurrentYear(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}
