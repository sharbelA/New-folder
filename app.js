(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('toggle-theme');
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('message');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.setAttribute('data-theme','dark');

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
    } else {
      root.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    msg.textContent = `Thanks, ${name || 'friend'} — we received your email (${email}).`;
    form.reset();
  });
})();
