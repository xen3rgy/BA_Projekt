import { loadPartials } from './partials.js';
import { initDarkModeToggle } from './theme.js';
import { setCurrentYear } from './utils.js';
import { createToast } from './toast.js';
import { initSettings } from './settings.js';
import { initTranslator } from './translator.js';
import { initAudioMock } from './audio-mock.js';
import { initChat } from './chat.js';
import { initTabs } from './tabs.js';

(async function bootstrap() {
  await loadPartials();

  initDarkModeToggle();
  setCurrentYear('year');

  const toast = createToast(document.getElementById('toast'));
  const showToast = toast.show;

  const { callLLM } = initSettings({ showToast });
  initTranslator({ callLLM, showToast });
  initAudioMock();
  initChat({ callLLM, showToast });
  initTabs();
})();
