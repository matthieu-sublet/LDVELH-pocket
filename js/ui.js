/* ══════════════════════════════════════════
   ui.js — Rendu de l'interface principale
══════════════════════════════════════════ */

// ── Panneau Livre (Google PDF Viewer) ────
// Contourne X-Frame-Options et CORS en utilisant
// le viewer Google Docs qui peut afficher tout PDF public.
let _bookLoadedNum = null;

function renderBookPanel() {
  const empty   = document.getElementById('book-panel-empty');
  const viewer  = document.getElementById('book-panel-viewer');
  const iframe  = document.getElementById('book-iframe');
  const loading = document.getElementById('book-loading');
  const errBox  = document.getElementById('book-error');
  const label   = document.getElementById('book-panel-label');
  const extLink = document.getElementById('book-panel-extlink');
  const errLink = document.getElementById('book-error-link');

  // Trouver le numéro du livre
  let bookNum = state.bookNum || null;
  if (!bookNum && state.book) {
    const m = state.book.match(/^#(\d+)/);
    if (m) bookNum = parseInt(m[1]);
  }

  const book = bookNum ? BOOKS.find(function(b) { return b.n === bookNum; }) : null;

  if (!book || !book.pdf) {
    empty.style.display  = 'flex';
    viewer.style.display = 'none';
    return;
  }

  const directUrl  = BASE_PDF + book.pdf;
  // Google Docs viewer : affiche un PDF distant sans restriction CORS/X-Frame
  const viewerUrl  = 'https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(directUrl);
  const title      = '#' + book.n + ' — ' + book.t;

  empty.style.display  = 'none';
  viewer.style.display = 'flex';
  if (label)   label.textContent = title;
  if (extLink) extLink.href = directUrl;
  if (errLink) errLink.href = directUrl;

  // Déjà chargé pour ce livre
  if (_bookLoadedNum === bookNum) return;
  _bookLoadedNum = bookNum;

  // Afficher le loader pendant que Google charge le PDF
  iframe.style.display  = 'none';
  errBox.style.display  = 'none';
  loading.style.display = 'flex';

  // Timeout de sécurité : si Google ne répond pas en 15s → fallback
  const timeout = setTimeout(function() {
    loading.style.display = 'none';
    errBox.style.display  = 'flex';
    iframe.style.display  = 'none';
    _bookLoadedNum = null;
  }, 15000);

  iframe.onload = function() {
    clearTimeout(timeout);
    loading.style.display = 'none';
    errBox.style.display  = 'none';
    iframe.style.display  = 'flex';
  };

  iframe.onerror = function() {
    clearTimeout(timeout);
    loading.style.display = 'none';
    errBox.style.display  = 'flex';
    iframe.style.display  = 'none';
    _bookLoadedNum = null;
  };

  iframe.src = viewerUrl;
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
