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

  // Products fetch
  const loadBtn = document.getElementById('load-products');
  const productsList = document.getElementById('products-list');

  async function loadProducts() {
    productsList.textContent = 'Loading...';
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      const products = json.products || [];
      productsList.innerHTML = products.map(p => `<li><strong>${p.name}</strong> — $${p.price.toFixed(2)}<div class="muted">${p.description}</div></li>`).join('');
    } catch (err) {
      productsList.textContent = 'Failed to load products. Run the server and try again.';
    }
  }

  if (loadBtn) loadBtn.addEventListener('click', loadProducts);
})();
