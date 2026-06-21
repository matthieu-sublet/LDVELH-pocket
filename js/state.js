/* ══════════════════════════════════════════
   state.js — État du jeu & système de sauvegarde
══════════════════════════════════════════ */

const SAVE_KEY    = 'df-current';   // clé stable, ne change plus jamais
const SLOT_KEY    = 'df-slot-';     // df-slot-0 / df-slot-1 / df-slot-2
const LEGACY_KEYS = ['defi-fantastique-v1', 'defi-fantastique-v2'];

// État par défaut
let state = {
  name: '', book: '',
  skill: 10, skillMax: 12,
  stamina: 20, staminaMax: 24,
  luck: 9,  luckMax: 10,
  gold: 0,
  meals: 0,
  potions: 2, potionsTotal: 2,
  potionType: 'stamina',
  items: [],
  notes: '', paras: '',
  diceHistory: [],
};

// ── Chargement ───────────────────────────
function tryLoad(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return false;
    state = parsed;
    return true;
  } catch (e) {
    return false;
  }
}

function initState() {
  // 1. Clé stable courante
  if (tryLoad(SAVE_KEY) && state.name) return 'loaded';

  // 2. Migration depuis anciennes clés
  for (const k of LEGACY_KEYS) {
    if (tryLoad(k) && state.name) {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      localStorage.removeItem(k);
      return 'migrated';
    }
  }

  return 'new'; // aucune sauvegarde trouvée
}

// ── Persistance courante ─────────────────
function saveState() {
  state.name   = document.getElementById('char-name').value   || state.name;
  state.book   = document.getElementById('char-book').value   || state.book;
  state.notes  = document.getElementById('notes-area').value  || state.notes;
  state.paras  = document.getElementById('para-area').value   || state.paras;
  state._savedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  updateHeader();
}

// ── Slots ────────────────────────────────
function saveToSlot(i) {
  const snap = JSON.parse(JSON.stringify(state));
  snap.name   = document.getElementById('char-name').value  || snap.name;
  snap.notes  = document.getElementById('notes-area').value || snap.notes;
  snap.paras  = document.getElementById('para-area').value  || snap.paras;
  snap._savedAt = Date.now();
  localStorage.setItem(SLOT_KEY + i, JSON.stringify(snap));
  renderSlots();
  toast('💾 Sauvegardé dans l\'emplacement ' + (i + 1) + ' !');
}

function loadFromSlot(i) {
  if (!confirm('Charger l\'emplacement ' + (i + 1) + ' ? La partie en cours sera écrasée.')) return;
  const raw = localStorage.getItem(SLOT_KEY + i);
  if (!raw) return;
  try {
    state = JSON.parse(raw);
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    render();
    toast('📂 Emplacement ' + (i + 1) + ' chargé !');
  } catch (e) {
    toast('❌ Erreur de chargement.');
  }
}

function deleteSlot(i) {
  if (!confirm('Effacer l\'emplacement ' + (i + 1) + ' définitivement ?')) return;
  localStorage.removeItem(SLOT_KEY + i);
  renderSlots();
  toast('🗑 Emplacement ' + (i + 1) + ' effacé.');
}

function renderSlots() {
  const container = document.getElementById('save-slots');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    let slot = null;
    try { slot = JSON.parse(localStorage.getItem(SLOT_KEY + i)); } catch (e) {}
    const date = slot?._savedAt
      ? new Date(slot._savedAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
      : '';
    const div = document.createElement('div');
    div.className = 'save-slot' + (slot ? ' occupied' : '');
    div.innerHTML = `
      <div class="save-slot-header">
        <span class="save-slot-num">${i + 1}</span>
        <span class="save-slot-name">${slot ? esc(slot.name || 'Sans nom') : 'Emplacement vide'}</span>
        ${date ? `<span class="save-slot-date">${date}</span>` : ''}
      </div>
      ${slot
        ? `<div class="save-slot-meta">${esc(slot.book || '')} · Hab ${slot.skillMax} · End ${slot.staminaMax} · Cha ${slot.luckMax}</div>`
        : `<div class="save-slot-empty">Aucune partie sauvegardée</div>`}
      <div class="save-slot-btns">
        <button class="slot-btn slot-btn-save" onclick="saveToSlot(${i})">💾 Sauvegarder</button>
        <button class="slot-btn slot-btn-load" onclick="loadFromSlot(${i})" ${!slot ? 'disabled' : ''}>📂 Charger</button>
        <button class="slot-btn slot-btn-del"  onclick="deleteSlot(${i})"   ${!slot ? 'disabled' : ''}>🗑 Effacer</button>
      </div>`;
    container.appendChild(div);
  }
}

// ── Export / Import fichier ──────────────
function exportSave() {
  const snap = JSON.parse(JSON.stringify(state));
  snap.name   = document.getElementById('char-name').value  || snap.name;
  snap.notes  = document.getElementById('notes-area').value || snap.notes;
  snap.paras  = document.getElementById('para-area').value  || snap.paras;
  snap._exportedAt = new Date().toISOString();
  snap._version    = 3;

  const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const hero = (snap.name || 'hero').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  a.href     = url;
  a.download = `defi-fantastique_${hero}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('📤 Sauvegarde exportée !');
}

function importSave(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.name || !parsed.skill) throw new Error('Format invalide');
      state = parsed;
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      document.getElementById('wizard').style.display = 'none';
      render();
      const status = document.getElementById('import-status');
      if (status) { status.textContent = '✅ Importé : ' + state.name; status.style.display = 'block'; setTimeout(() => status.style.display = 'none', 3000); }
      toast('📥 Partie importée : ' + state.name + ' !');
    } catch (err) {
      toast('❌ Fichier invalide ou corrompu.');
    }
    input.value = '';
  };
  reader.readAsText(file);
}

// ── Récupération legacy ──────────────────
function checkLegacySlots() {
  for (const k of LEGACY_KEYS) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      const p = JSON.parse(raw);
      if (p && p.name) {
        const card = document.getElementById('legacy-card');
        if (!card) return;
        document.getElementById('legacy-desc').innerHTML =
          `Une sauvegarde de <strong>${p.name}</strong> (ancienne version) a été trouvée. Vous pouvez la récupérer.`;
        card.style.display = 'block';
        card._legacyKey = k;
        return;
      }
    } catch (e) {}
  }
}

function recoverLegacy() {
  const card = document.getElementById('legacy-card');
  if (!card) return;
  const raw = localStorage.getItem(card._legacyKey);
  if (!raw) return;
  try {
    state = JSON.parse(raw);
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    localStorage.removeItem(card._legacyKey);
    card.style.display = 'none';
    document.getElementById('wizard').style.display = 'none';
    render();
    toast('✅ Sauvegarde récupérée : ' + state.name + ' !');
  } catch (e) {
    toast('❌ Erreur lors de la récupération.');
  }
}
