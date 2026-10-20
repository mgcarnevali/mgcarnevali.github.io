(() => {
  const themes = ['auto', 'light', 'dark'];
  const labels = {auto: '◐ Auto theme', light: '☀ Light theme', dark: '☾ Dark theme'};
  let theme = 'auto';
  try { const stored = localStorage.getItem('mgcarnevali-theme'); if (themes.includes(stored)) theme = stored; } catch (_) {}
  const root = document.documentElement;
  const button = document.querySelector('[data-theme-toggle]');
  function apply(next) {
    theme = next;
    if (theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    if (button) {
      button.textContent = labels[theme];
      button.setAttribute('aria-label', `Theme: ${theme}. Click to change theme`);
      button.setAttribute('title', 'Theme: ' + theme + '. Click to change');
    }
    try { localStorage.setItem('mgcarnevali-theme', theme); } catch (_) {}
  }
  if (button) button.addEventListener('click', () => apply(themes[(themes.indexOf(theme) + 1) % themes.length]));
  apply(theme);
})();
