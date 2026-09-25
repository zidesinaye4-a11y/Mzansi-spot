const spots = [
  { name: "Mama's Kitchen", category: "Food & drink", detail: "Homestyle meals • Open now", icon: "🍲", tag: "Today's special: R60 chicken + chips", keywords: "food restaurant meals kitchen" },
  { name: "Kasi Car Wash", category: "Everyday services", detail: "Car wash • Open now", icon: "🚗", tag: "From R50", keywords: "car wash services" },
  { name: "Beauty Studio", category: "Beauty & wellness", detail: "Hair, nails & beauty", icon: "💅🏽", tag: "Walk-ins welcome", keywords: "beauty wellness hair nails" },
  { name: "Tongaat Tyres", category: "Everyday services", detail: "Tyres & quick repairs", icon: "🛞", tag: "Trusted local service", keywords: "repairs services tyres" },
  { name: "The Corner Shop", category: "Shopping", detail: "Groceries & essentials", icon: "🛒", tag: "Open until 20:00", keywords: "shopping groceries" },
  { name: "Braai House", category: "Food & drink", detail: "Flame-grilled favourites", icon: "🔥", tag: "Popular nearby", keywords: "food restaurant braai" }
];

const grid = document.querySelector('#spotGrid');
const empty = document.querySelector('#emptyState');
const input = document.querySelector('#searchInput');
const toast = document.querySelector('#toast');

function render(query = '') {
  const needle = query.trim().toLowerCase();
  const filtered = spots.filter(spot => !needle || `${spot.name} ${spot.category} ${spot.detail} ${spot.keywords}`.toLowerCase().includes(needle));
  grid.innerHTML = filtered.map(spot => `
    <article class="spot-card">
      <div class="spot-image" aria-hidden="true">${spot.icon}</div>
      <div class="spot-body">
        <h3>${spot.name}</h3>
        <div class="spot-meta">${spot.category} · <span class="open">${spot.detail}</span></div>
        <span class="tag">${spot.tag}</span>
      </div>
    </article>
  `).join('');
  empty.hidden = filtered.length > 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelector('#searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  render(input.value);
  document.querySelector('#discover').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  input.value = button.dataset.query;
  render(button.dataset.query);
  document.querySelector('#discover').scrollIntoView({ behavior: 'smooth' });
}));

document.querySelector('#showAll').addEventListener('click', () => { input.value = ''; render(); });
document.querySelector('#listBusiness').addEventListener('click', () => showToast('Business listing is coming soon—your spot matters!'));

document.querySelector('#menuButton').addEventListener('click', (event) => {
  const nav = document.querySelector('#mainNav');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

render();
