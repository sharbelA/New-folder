// Lightweight health widget: non-intrusive, minimal footprint
(function(){
  const pollInterval = 15000; // 15s

  function createWidget() {
    const container = document.createElement('div');
    container.id = 'health-widget';
    container.className = 'health-widget';
    container.setAttribute('aria-live','polite');
    container.innerHTML = `
      <button class="hw-close" aria-label="Close health widget">×</button>
      <div class="hw-body">
        <div class="hw-title">Server</div>
        <div class="hw-status">Checking…</div>
        <button class="hw-refresh">Refresh</button>
      </div>
    `;

    container.querySelector('.hw-close').addEventListener('click', () => container.remove());
    container.querySelector('.hw-refresh').addEventListener('click', fetchHealth);

    document.body.appendChild(container);
    return container;
  }

  async function fetchHealth() {
    if (!widget) return;
    const statusEl = widget.querySelector('.hw-status');
    try {
      const res = await fetch('/api/health', {cache: 'no-store'});
      if (!res.ok) throw new Error('bad');
      const json = await res.json();
      const up = json && (json.status === 'ok');
      const uptime = (json && json.uptime) ? ` · uptime ${Math.round(json.uptime)}s` : '';
      statusEl.textContent = up ? `OK${uptime}` : 'Unavailable';
      statusEl.classList.toggle('hw-ok', up);
    } catch (e) {
      statusEl.textContent = 'Offline';
      statusEl.classList.remove('hw-ok');
    }
  }

  // Only run when DOM is ready
  let widget = null;
  function init(){
    if (!document.body) return setTimeout(init, 50);
    try {
      widget = createWidget();
      fetchHealth();
      setInterval(fetchHealth, pollInterval);
    } catch (e) {
      // no-op: keep this component non-fatal
    }
  }

  init();
})();
