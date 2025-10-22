/**
 * Handles the tabbed interface in the live demo section.
 */
export function initTabs() {
  const tabTrans = document.getElementById('tabTrans');
  const tabChat = document.getElementById('tabChat');
  const panelTrans = document.getElementById('panelTrans');
  const panelChat = document.getElementById('panelChat');

  if (!tabTrans || !tabChat || !panelTrans || !panelChat) return;

  const activate = (tab) => {
    const translatorActive = tab === 'trans';
    tabTrans.classList.toggle('tab-active', translatorActive);
    tabChat.classList.toggle('tab-active', !translatorActive);
    panelTrans.classList.toggle('hidden', !translatorActive);
    panelChat.classList.toggle('hidden', translatorActive);
  };

  tabTrans.addEventListener('click', () => activate('trans'));
  tabChat.addEventListener('click', () => activate('chat'));
}
