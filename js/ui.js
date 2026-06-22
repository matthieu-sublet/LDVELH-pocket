/* ══════════════════════════════════════════
   ui.js — Rendu de l'interface principale
══════════════════════════════════════════ */

// ── Panneau Livre (PDF.js) ───────────────
// PDF.js via CDN — affichage natif avec liens internes cliquables
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const PDFJS_LIB    = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';

let _pdfJsLoaded    = false;
let _pdfJsLoading   = false;
let _pdfDoc         = null;
let _pdfCurrentPage = 1;
let _pdfTotalPages  = 0;
let _pdfLoadedNum   = null;
let _pdfScale       = 1.5;

function loadPdfJs(cb) {
  if (_pdfJsLoaded) { cb(); return; }
  if (_pdfJsLoading) { setTimeout(function(){ loadPdfJs(cb); }, 100); return; }
  _pdfJsLoading = true;
  var s = document.createElement('script');
  s.src = PDFJS_LIB;
  s.onload = function() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    _pdfJsLoaded  = true;
    _pdfJsLoading = false;
    cb();
  };
  s.onerror = function() { _pdfJsLoading = false; showBookError(); };
  document.head.appendChild(s);
}

function renderBookPanel() {
  var empty   = document.getElementById('book-panel-empty');
  var viewer  = document.getElementById('book-panel-viewer');
  var loading = document.getElementById('book-loading');
  var errBox  = document.getElementById('book-error');
  var label   = document.getElementById('book-panel-label');
  var extLink = document.getElementById('book-panel-extlink');
  var errLink = document.getElementById('book-error-link');

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

  var pdfUrl = book.pdf; // URL complète GitHub raw
  var title  = '#' + book.n + ' — ' + book.t;

  empty.style.display  = 'none';
  viewer.style.display = 'flex';
  if (label)   label.textContent = title;
  if (extLink) extLink.href = pdfUrl;
  if (errLink) errLink.href = pdfUrl;

  // Déjà chargé
  if (_pdfLoadedNum === bookNum && _pdfDoc) {
    showPdfPage(_pdfCurrentPage);
    return;
  }

  // Reset
  _pdfDoc       = null;
  _pdfLoadedNum = null;
  showBookLoading();

  loadPdfJs(function() {
    pdfjsLib.getDocument(pdfUrl).promise.then(function(doc) {
      _pdfDoc         = doc;
      _pdfTotalPages  = doc.numPages;
      _pdfCurrentPage = 1;
      _pdfLoadedNum   = bookNum;
      updatePdfControls();
      showPdfPage(1);
    }).catch(function(err) {
      console.warn('PDF.js error:', err);
      showBookError();
    });
  });
}

function showBookLoading() {
  var iframe  = document.getElementById('book-iframe');
  var loading = document.getElementById('book-loading');
  var errBox  = document.getElementById('book-error');
  var canvas  = document.getElementById('pdf-canvas-wrap');
  if (iframe)  iframe.style.display  = 'none';
  if (errBox)  errBox.style.display  = 'none';
  if (canvas)  canvas.style.display  = 'none';
  if (loading) loading.style.display = 'flex';
}

function showBookError() {
  var loading = document.getElementById('book-loading');
  var errBox  = document.getElementById('book-error');
  var canvas  = document.getElementById('pdf-canvas-wrap');
  if (loading) loading.style.display = 'none';
  if (canvas)  canvas.style.display  = 'none';
  if (errBox)  errBox.style.display  = 'flex';
}

function showPdfPage(pageNum) {
  if (!_pdfDoc) return;
  pageNum = Math.max(1, Math.min(_pdfTotalPages, pageNum));
  _pdfCurrentPage = pageNum;
  updatePdfControls();

  _pdfDoc.getPage(pageNum).then(function(page) {
    var wrap    = document.getElementById('pdf-canvas-wrap');
    var loading = document.getElementById('book-loading');
    var errBox  = document.getElementById('book-error');
    if (!wrap) return;

    // Adapter le scale à la largeur du conteneur
    var container = document.getElementById('book-panel-viewer');
    var width     = container ? container.clientWidth || 420 : 420;
    var viewport  = page.getViewport({ scale: 1 });
    var scale     = (width / viewport.width) * 0.98;
    var scaled    = page.getViewport({ scale: scale });

    // Recréer le canvas à chaque page
    wrap.innerHTML = '';
    var canvas  = document.createElement('canvas');
    var ctx     = canvas.getContext('2d');
    canvas.width  = scaled.width;
    canvas.height = scaled.height;
    canvas.style.width  = '100%';
    canvas.style.display = 'block';
    wrap.appendChild(canvas);

    // Couche de liens cliquables
    var linkDiv = document.createElement('div');
    linkDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    wrap.style.position = 'relative';
    wrap.appendChild(linkDiv);

    if (loading) loading.style.display = 'none';
    if (errBox)  errBox.style.display  = 'none';
    wrap.style.display = 'block';

    page.render({ canvasContext: ctx, viewport: scaled }).promise.then(function() {
      // Rendre les annotations (liens internes)
      return page.getAnnotations();
    }).then(function(annotations) {
      annotations.forEach(function(ann) {
        if (ann.subtype !== 'Link') return;
        var rect = ann.rect;
        // Convertir les coordonnées PDF en coordonnées écran
        var x1 = rect[0] * scale;
        var y1 = scaled.height - rect[3] * scale;
        var x2 = rect[2] * scale;
        var y2 = scaled.height - rect[1] * scale;
        var w  = x2 - x1;
        var h  = y2 - y1;

        var link = document.createElement('a');
        link.style.cssText = 'position:absolute;left:' + (x1/canvas.width*100) + '%;top:' + (y1/canvas.height*100) + '%;width:' + (w/canvas.width*100) + '%;height:' + (h/canvas.height*100) + '%;cursor:pointer;';

        if (ann.dest) {
          // Lien interne — naviguer vers le paragraphe
          link.href = '#';
          link.title = 'Aller au paragraphe';
          link.onclick = (function(dest) {
            return function(e) {
              e.preventDefault();
              _pdfDoc.getDestination(dest).then(function(destArr) {
                if (!destArr) return;
                return _pdfDoc.getPageIndex(destArr[0]);
              }).then(function(idx) {
                if (idx !== undefined) showPdfPage(idx + 1);
              });
            };
          })(ann.dest);
        } else if (ann.url) {
          link.href   = ann.url;
          link.target = '_blank';
        }
        linkDiv.appendChild(link);
      });
    });
  });
}

function updatePdfControls() {
  var cur   = document.getElementById('pdf-page-current');
  var input = document.getElementById('pdf-page-input');
  var total = document.getElementById('pdf-page-total');
  var prev  = document.getElementById('pdf-prev');
  var next  = document.getElementById('pdf-next');
  var dl    = document.getElementById('book-dl-link');
  if (cur)   cur.textContent   = _pdfCurrentPage;
  if (input) input.value       = _pdfCurrentPage;
  if (total) total.textContent = _pdfTotalPages;
  if (prev)  prev.disabled     = _pdfCurrentPage <= 1;
  if (next)  next.disabled     = _pdfCurrentPage >= _pdfTotalPages;
  // Met à jour le lien de téléchargement
  var extLink = document.getElementById('book-panel-extlink');
  var errLink = document.getElementById('book-error-link');
  if (dl && extLink) dl.href = extLink.href;
}

function pdfPrevPage() { if (_pdfCurrentPage > 1) showPdfPage(_pdfCurrentPage - 1); }
function pdfNextPage() { if (_pdfCurrentPage < _pdfTotalPages) showPdfPage(_pdfCurrentPage + 1); }
function pdfGoToPage(n) {
  var p = parseInt(n);
  if (!isNaN(p)) showPdfPage(p);
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
