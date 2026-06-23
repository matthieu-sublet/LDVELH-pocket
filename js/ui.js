/* ══════════════════════════════════════════
   ui.js — Rendu de l'interface principale
══════════════════════════════════════════ */

// ── Panneau Livre (fetch → blob → embed natif) ──────────────
// GitHub raw autorise le fetch (CORS *) mais bloque les iframes.
// On télécharge le PDF, on crée une blob URL locale, et on
// l'affiche via <embed> natif du navigateur → qualité 100%,
// polices intactes, liens de paragraphes cliquables.

var _blobCache = {};   // { bookNum: blobUrl }

function renderBookPanel() {
  var empty   = document.getElementById('book-panel-empty');
  var viewer  = document.getElementById('book-panel-viewer');
  var loading = document.getElementById('book-loading');
  var errBox  = document.getElementById('book-error');
  var label   = document.getElementById('book-panel-label');
  var extLink = document.getElementById('book-panel-extlink');
  var errLink = document.getElementById('book-error-link');
  var embedWrap = document.getElementById('pdf-embed-wrap');

  // Trouver le livre
  var bookNum = state.bookNum || null;
  if (!bookNum && state.book) {
    var m = state.book.match(/^#(\d+)/);
    if (m) bookNum = parseInt(m[1]);
  }
  var book = bookNum ? BOOKS.find(function(b){ return b.n === bookNum; }) : null;

  if (!book || !book.pdf) {
    empty.style.display  = 'flex';
    viewer.style.display = 'none';
    return;
  }

  var pdfUrl = book.pdf;
  var title  = '#' + book.n + ' \u2014 ' + book.t;

  empty.style.display  = 'none';
  viewer.style.display = 'flex';
  if (label)   label.textContent = title;
  if (extLink) extLink.href = pdfUrl;
  if (errLink) errLink.href = pdfUrl;

  // Déjà en cache — afficher directement
  if (_blobCache[bookNum]) {
    showEmbed(_blobCache[bookNum]);
    return;
  }

  // Loader
  if (embedWrap) embedWrap.style.display = 'none';
  if (errBox)    errBox.style.display    = 'none';
  if (loading)   loading.style.display   = 'flex';

  fetch(pdfUrl)
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.blob();
    })
    .then(function(blob) {
      // Forcer le bon type MIME pour que le navigateur le reconnaisse comme PDF
      var pdfBlob = new Blob([blob], { type: 'application/pdf' });
      var blobUrl = URL.createObjectURL(pdfBlob);
      _blobCache[bookNum] = blobUrl;
      if (loading) loading.style.display = 'none';
      showEmbed(blobUrl);
    })
    .catch(function(err) {
      console.warn('PDF fetch failed:', err);
      if (loading) loading.style.display = 'none';
      if (errBox)  errBox.style.display  = 'flex';
    });
}

function showEmbed(blobUrl) {
  var embedWrap = document.getElementById('pdf-embed-wrap');
  var errBox    = document.getElementById('book-error');
  var loading   = document.getElementById('book-loading');
  if (!embedWrap) return;
  if (loading) loading.style.display = 'none';
  if (errBox)  errBox.style.display  = 'none';

  // Recréer l'embed pour forcer le rechargement
  embedWrap.innerHTML = '';
  var embed = document.createElement('embed');
  embed.src   = blobUrl;
  embed.type  = 'application/pdf';
  embed.style.cssText = 'width:100%;height:100%;border:none;display:block;';
  embedWrap.appendChild(embed);
  embedWrap.style.display = 'flex';
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
