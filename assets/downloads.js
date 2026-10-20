// Keep download buttons pointing at the latest published stable release.
// The HTML includes direct v3.0.0 URLs as a no-JavaScript / API-error fallback.
(async () => {
  const installer = document.querySelector('[data-direct-download="installer"]');
  const portable = document.querySelector('[data-direct-download="portable"]');
  if (!installer || !portable) return;
  try {
    const response = await fetch('https://api.github.com/repos/mgcarnevali/NvProfileSwitcher/releases/latest',
      { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!response.ok) return;
    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const exe = assets.find(a => /^NvProfileSwitcher-Setup-v[\\d.]+\\.exe$/i.test(a.name));
    const zip = assets.find(a => /^NvProfileSwitcher-v[\\d.]+\\.zip$/i.test(a.name));
    if (exe?.browser_download_url) installer.href = exe.browser_download_url;
    if (zip?.browser_download_url) portable.href = zip.browser_download_url;
  } catch (_) {
    // Offline or API rate limited: the HTML fallback links remain usable.
  }
})();
