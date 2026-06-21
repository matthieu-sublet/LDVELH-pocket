/* ══════════════════════════════════════════
   ui.js — Rendu de l'interface principale
══════════════════════════════════════════ */

// ── Panneau Livre (iframe PDF) ───────────
function renderBookPanel() {
  const empty  = document.getElementById('book-panel-empty');
  const viewer = document.getElementById('book-panel-viewer');
  const iframe = document.getElementById('book-iframe');
  const label  = document.getElementById('book-panel-label');
  const extLink = document.getElementById('book-panel-extlink');

  // Trouver le numéro du livre depuis l'état
  let bookNum = state.bookNum || null;
  if (!bookNum && state.book) {
    const m = state.book.match(/^#(\d+)/);
    if (m) bookNum = parseInt(m[1]);
  }

  const book = bookNum ? BOOKS.find(b => b.n === bookNum) : null;

  if (!book || !book.pdf) {
    empty.style.display  = 'flex';
    viewer.style.display = 'none';
    return;
  }

  const url = BASE_PDF + book.pdf;

  empty.style.display  = 'none';
  viewer.style.display = 'flex';

  // Charger l'iframe seulement si l'URL a changé (évite rechargement à chaque clic)
  if (iframe.dataset.loaded !== url) {
    iframe.src = url;
    iframe.dataset.loaded = url;
  }

  if (label)   label.textContent = '#' + book.n + ' — ' + book.t;
  if (extLink) extLink.href = url;
}

// ── Toast ────────────────────────────────
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

// ── Header ───────────────────────────────
function updateHeader() {
  const nameEl = document.getElementById('header-hero-name');
  const subEl  = document.getElementById('header-book-sub');
  if (nameEl) nameEl.textContent = state.name || '';
  if (subEl)  subEl.textContent  = state.book || 'Fiche de Personnage';
}

// ── Navigation ───────────────────────────
const TABS = ['stats', 'dice', 'combat', 'inventory', 'notes', 'book', 'saves'];

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.querySelectorAll('.nav-tab')[TABS.indexOf(id)].classList.add('active');
  if (id === 'saves') renderSlots();
  if (id === 'book')  renderBookPanel();
}

// ── Render principal ─────────────────────
function render() {
  // Identité
  document.getElementById('char-name').value = state.name || '';
  document.getElementById('char-book').value = state.book || '';

  // Notes
  document.getElementById('notes-area').value = state.notes || '';
  document.getElementById('para-area').value  = state.paras || '';

  // Stats
  document.getElementById('skill-val').textContent   = state.skill;
  document.getElementById('stamina-val').textContent = state.stamina;
  document.getElementById('luck-val').textContent    = state.luck;
  document.getElementById('skill-max').textContent   = state.skillMax;
  document.getElementById('stamina-max').textContent = state.staminaMax;
  document.getElementById('luck-max').textContent    = state.luckMax;

  // Barre HP
  const pct = Math.max(0, Math.min(100, Math.round(state.stamina / state.staminaMax * 100)));
  const bar  = document.getElementById('hp-bar');
  bar.style.width      = pct + '%';
  bar.style.background = pct > 50
    ? 'linear-gradient(90deg, #2d8a58, #5aab3a)'
    : pct > 25
      ? 'linear-gradient(90deg, #c9a84c, #e8c96b)'
      : 'linear-gradient(90deg, #8b1a1a, #c9453a)';

  // Or & repas
  document.getElementById('gold-val').textContent  = state.gold;
  document.getElementById('meals-val').textContent = state.meals;

  // Potion — libellé dynamique
  const pt      = POTION_TYPES[state.potionType || 'stamina'];
  const descEl  = document.getElementById('potion-desc-label');
  if (descEl) descEl.textContent = pt.icon + ' ' + pt.label + ' — ' + state.potions + ' mesure(s) restante(s)';

  // Pips potion
  const pip = document.getElementById('potion-pips');
  pip.innerHTML = '';
  for (let i = 0; i < state.potionsTotal; i++) {
    const d = document.createElement('div');
    d.className = 'potion-pip ' + (i < state.potions ? 'full' : 'used');
    pip.appendChild(d);
  }

  // Inventaire
  renderInventory();

  updateHeader();

  // Restaurer le thème visuel
  if (state.theme || state.visualTheme) {
    applyVisualTheme(state.visualTheme || state.theme || 'fantasy');
  }
}

function renderInventory() {
  const list = document.getElementById('item-list');
  if (!list) return;
  if (state.items.length === 0) {
    list.innerHTML = '<li style="color:var(--ink-light);font-size:13px;font-style:italic;padding:8px 0;">Aucun objet…</li>';
    return;
  }
  list.innerHTML = '';
  state.items.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'item-entry';
    li.innerHTML = `
      <span class="item-icon">${itemIcon(item.name)}</span>
      <span class="item-name">${esc(item.name)}</span>
      ${item.qty > 1 ? `<span class="item-qty">×${item.qty}</span>` : ''}
      <button class="item-del" onclick="removeItem(${i})">✕</button>`;
    list.appendChild(li);
  });
}
