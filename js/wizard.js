/* ══════════════════════════════════════════
   wizard.js — Création de personnage
══════════════════════════════════════════ */

const WIZ_TOTAL_STEPS = 7;

let wiz = {
  step: 0,
  name: '', book: '', bookNum: null,
  theme: 'fantasy',
  skill: null,   skillRolled: false,
  stamina: null, staminaRolled: false,
  luck: null,    luckRolled: false,
  gold: 0,
  potion: 'skill',
};

let wizExtraItems   = [];
let selectedBookIdx = -1;

// ── Thème courant ─────────────────────────
function currentTheme() {
  return THEMES[wiz.theme] || THEMES.fantasy;
}

// ── Appliquer le thème ────────────────────
function applyTheme(themeKey) {
  wiz.theme = themeKey || 'fantasy';
  const theme = currentTheme();

  const banner = document.getElementById('wiz-theme-banner');
  if (banner) {
    banner.innerHTML = `<span style="font-size:20px">${theme.icon}</span>&nbsp;<span>${theme.label}</span>`;
    banner.style.display = 'flex';
  }

  const special = document.getElementById('wiz-special-rules');
  if (special) {
    special.style.display = theme.special ? 'block' : 'none';
    if (theme.special) special.textContent = '⚠️ ' + theme.special;
  }

  const hint = document.getElementById('wiz-equip-hint');
  if (hint) hint.textContent = theme.hint;
}

// ── Sélection du livre ────────────────────
function onBookSelected(bookNum, bookTitle) {
  wiz.bookNum = bookNum;
  wiz.book    = bookTitle;
  wiz.rules   = getBookRules(bookNum);
  const bookInput = document.getElementById('wiz-book');
  if (bookInput) bookInput.value = bookTitle;
  const themeKey = BOOK_THEMES[bookNum] || 'fantasy';
  applyTheme(themeKey);
  applyVisualTheme(themeKey);
  generateName();
  updateWizardForRules(wiz.rules);
}

// ── Adapter le wizard selon les règles du livre ──
function updateWizardForRules(rules) {
  if (!rules) return;

  // Formules de dés
  const sf = document.getElementById('wiz-skill-formula');
  const stf = document.getElementById('wiz-stamina-formula');
  const lf = document.getElementById('wiz-luck-formula');
  if (sf)  sf.textContent  = rules.skillFormula   || '1d6 + 6';
  if (stf) stf.textContent = rules.staminaFormula  || '2d6 + 12';
  if (lf)  lf.textContent  = rules.luckFormula     || '1d6 + 6';

  // Règles spéciales — bannière
  const banner = document.getElementById('wiz-book-rules-banner');
  if (banner) {
    if (rules.specialRules) {
      banner.innerHTML = '<strong>⚠️ Règles spéciales pour ce livre :</strong><br>' + rules.specialRules;
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

  // Stats supplémentaires
  renderExtraStats(rules.extraStats || []);

  // Malus Habileté
  const penaltyEl = document.getElementById('wiz-skill-penalty');
  if (penaltyEl) {
    if (rules.skillPenalty) {
      penaltyEl.textContent = '⚠️ Malus de départ : Habileté ' + rules.skillPenalty + ' jusqu`à trouver une arme.';
      penaltyEl.style.display = 'block';
    } else {
      penaltyEl.style.display = 'none';
    }
  }

  // Potion — masquer si livre sans potion
  const potionSection = document.getElementById('wiz-potion-section');
  if (potionSection) potionSection.style.display = rules.noPotion ? 'none' : 'block';

  // Or — label personnalisé
  const goldLabel = document.getElementById('wiz-gold-label');
  if (goldLabel) goldLabel.textContent = rules.goldLabel || "Pièces d'Or de départ";

  // Équipement hint
  const hint = document.getElementById('wiz-equip-hint');
  if (hint) {
    const theme = currentTheme();
    const items = rules.noEquipment
      ? 'Aucun équipement de départ (vous êtes un civil).'
      : (rules.equipment || theme.equipment || ['Épée','Armure de cuir','Lanterne']).join(', ');
    hint.innerHTML = rules.noEquipment
      ? '<em>⚠️ Aucun équipement — vous êtes un civil sans arme.</em>'
      : '📦 Équipement inclus : <strong>' + items + '</strong>';
  }

  // Reset dés si le livre a changé
  wiz.skill = null; wiz.skillRolled = false;
  wiz.stamina = null; wiz.staminaRolled = false;
  wiz.luck = null; wiz.luckRolled = false;
  const safeText = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  safeText('wiz-skill-roll','–'); safeText('wiz-d-skill','?');
  safeText('wiz-stamina-roll','–'); safeText('wiz-d-stamina1','?'); safeText('wiz-d-stamina2','?');
  safeText('wiz-luck-roll','–'); safeText('wiz-d-luck','?');
}

// ── Stats supplémentaires ─────────────────
let wizExtraStatValues = {};

function renderExtraStats(extraStats) {
  const container = document.getElementById('wiz-extra-stats-section');
  if (!container) return;
  wizExtraStatValues = {};
  if (!extraStats || extraStats.length === 0) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = '<div style="font-family:var(--font-ui,serif);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold-dark);margin-bottom:8px;">&#128202; Stats suppl&#233;mentaires</div>';
  extraStats.forEach(stat => {
    if (stat.formula === 'fixe') {
      wizExtraStatValues[stat.key] = stat.fixed;
      container.innerHTML += `<div style="margin-bottom:10px;padding:10px 12px;background:rgba(26,15,0,.06);border:1px solid rgba(201,168,76,.25);border-radius:4px;">
        <div style="font-family:var(--font-ui,'Cinzel',serif);font-size:11px;color:var(--ink-light);">${stat.label} : <strong>${stat.fixed}</strong> (valeur fixe)</div>
      </div>`;
    } else {
      container.innerHTML += `<div style="margin-bottom:10px;padding:10px 12px;background:rgba(26,15,0,.06);border:1px solid rgba(201,168,76,.25);border-radius:4px;">
        <div style="font-family:var(--font-ui,'Cinzel',serif);font-size:11px;color:var(--ink-light);margin-bottom:6px;">${stat.label} (${stat.formula})</div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="d" id="extra-die-${stat.key}" style="width:42px;height:42px;font-size:18px;background:linear-gradient(135deg,#2d1500,#1a0a00);border:2px solid var(--gold);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--font-title,'Cinzel Decorative',cursive);color:var(--gold-light);">?</div>
          <span style="font-family:var(--font-title,'Cinzel Decorative',cursive);font-size:24px;color:var(--ink);" id="extra-val-${stat.key}">–</span>
          <button class="roll-btn" onclick="rollExtraStat('${stat.key}',${stat.dice},${stat.bonus})" style="font-size:10px;padding:7px 12px;">🎲 Lancer</button>
        </div>
      </div>`;
    }
  });
}

function rollExtraStat(key, dice, bonus) {
  const rolls = Array.from({length:dice}, () => Math.floor(Math.random()*6)+1);
  const total = rolls.reduce((a,b)=>a+b,0) + bonus;
  animDie('extra-die-' + key, rolls[0], () => {
    const valEl = document.getElementById('extra-val-' + key);
    if (valEl) valEl.textContent = total;
    wizExtraStatValues[key] = total;
  });
}

// ── Navigation ────────────────────────────
function wizGo(step) {
  wiz.step = step;

  // Afficher le bon écran
  document.querySelectorAll('.wiz-screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('wiz-' + step);
  if (screen) screen.classList.add('active');

  // Dots de progression
  for (let i = 0; i < WIZ_TOTAL_STEPS; i++) {
    const d = document.getElementById('dot-' + i);
    if (!d) continue;
    d.classList.remove('active', 'done');
    if      (i < step)   d.classList.add('done');
    else if (i === step) d.classList.add('active');
  }

  // Boutons footer
  const btnBack   = document.getElementById('btn-back');
  const btnRoll   = document.getElementById('btn-roll');
  const btnNext   = document.getElementById('btn-next');
  const btnFinish = document.getElementById('btn-finish');
  [btnBack, btnRoll, btnNext, btnFinish].forEach(b => { if (b) b.style.display = 'none'; });
  if (btnBack && step > 0) btnBack.style.display = 'block';

  if (step === 0) {
    if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = 'Créer mon héros →'; }
  }
  else if (step === 1) {
    if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = 'Suivant →'; }
    // Rendu de la liste APRÈS que l'écran soit visible
    renderBookList('');
    generateName();
  }
  else if (step === 2) _wizStatButtons('skill',   '1d6+6');
  else if (step === 3) _wizStatButtons('stamina', '2d6+12');
  else if (step === 4) _wizStatButtons('luck',    '1d6+6');
  else if (step === 5) {
    if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = 'Voir le résumé →'; }
    applyTheme(wiz.theme); // met à jour hint équipement
  }
  else if (step === 6) {
    buildSummary();
    if (btnFinish) btnFinish.style.display = 'block';
  }
}

function _wizStatButtons(stat, label) {
  const btnRoll = document.getElementById('btn-roll');
  const btnNext = document.getElementById('btn-next');
  const rolled  = wiz[stat] !== null;
  const rerolled = wiz[stat + 'Rolled'];

  if (!rolled) {
    if (btnRoll) { btnRoll.style.display = 'block'; btnRoll.textContent = `🎲 Lancer (${label})`; }
  } else if (!rerolled) {
    if (btnRoll) { btnRoll.style.display = 'block'; btnRoll.textContent = '🎲 Relancer une fois'; }
    if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = 'Garder ' + wiz[stat] + ' →'; }
  } else {
    if (btnNext) { btnNext.style.display = 'block'; btnNext.textContent = 'Garder ' + wiz[stat] + ' →'; }
  }
}

function wizNext() {
  const step = wiz.step;

  if (step === 1) {
    const nm = (document.getElementById('wiz-name')?.value || '').trim();
    if (!nm) {
      toast('⚠️ Entrez un nom pour votre héros !');
      document.getElementById('wiz-name')?.focus();
      return;
    }
    wiz.name = nm;
    wiz.book = (document.getElementById('wiz-book')?.value || '').trim() || 'Livre sans titre';
  }
  if (step === 2 && wiz.skill   === null) { toast('🎲 Lancez les dés d\'abord !'); return; }
  if (step === 3 && wiz.stamina === null) { toast('🎲 Lancez les dés d\'abord !'); return; }
  if (step === 4 && wiz.luck    === null) { toast('🎲 Lancez les dés d\'abord !'); return; }

  wizGo(step + 1);
}

function wizBack() { wizGo(Math.max(0, wiz.step - 1)); }

// ── Jets de dés ───────────────────────────
function d6() { return Math.floor(Math.random() * 6) + 1; }

function wizRoll() {
  const step = wiz.step;
  const r = wiz.rules || getBookRules(wiz.bookNum);
  if      (step === 2) _rollStat('skill',   ['wiz-d-skill'],                   r.skillDice   || 1, r.skillBonus   || 6);
  else if (step === 3) _rollStat('stamina', ['wiz-d-stamina1','wiz-d-stamina2'], r.staminaDice || 2, r.staminaBonus || 12);
  else if (step === 4) _rollStat('luck',    ['wiz-d-luck'],                     r.luckDice    || 1, r.luckBonus    || 6);
}

function _rollStat(stat, dieIds, numDice, bonus) {
  const rolls = Array.from({ length: numDice }, d6);
  const total = rolls.reduce((a, b) => a + b, 0) + bonus;
  let done = 0;
  rolls.forEach((r, i) => {
    animDie(dieIds[i], r, () => {
      done++;
      if (done === rolls.length) {
        const el = document.getElementById('wiz-' + stat + '-roll');
        if (el) el.textContent = total;
        wiz[stat] = total;
        const firstRoll = !wiz[stat + 'Rolled'];
        wiz[stat + 'Rolled'] = true;
        const hint = document.getElementById('wiz-' + stat + '-reroll-hint');
        if (hint) hint.style.display = firstRoll ? 'block' : 'none';
        wizGo(wiz.step);
      }
    });
  });
}

function animDie(elId, finalVal, cb) {
  const el = document.getElementById(elId);
  if (!el) { if (cb) cb(); return; }
  el.classList.add('rolling');
  let t = 0;
  const iv = setInterval(() => {
    el.textContent = Math.floor(Math.random() * 6) + 1;
    t += 60;
    if (t > 400) {
      clearInterval(iv);
      el.textContent = finalVal;
      el.classList.remove('rolling');
      if (cb) cb();
    }
  }, 60);
}

// ── Or manuel ─────────────────────────────
function changeWizGold(delta) {
  wiz.gold = Math.max(0, (wiz.gold || 0) + delta);
  const el = document.getElementById('wiz-gold-display');
  if (el) el.textContent = wiz.gold;
}

// ── Équipement extra ──────────────────────
function addWizItem() {
  const input = document.getElementById('wiz-extra-item');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  wizExtraItems.push(name);
  input.value = '';
  renderWizExtraList();
}

function removeWizItem(i) {
  wizExtraItems.splice(i, 1);
  renderWizExtraList();
}

function renderWizExtraList() {
  const list = document.getElementById('wiz-extra-list');
  if (!list) return;
  if (wizExtraItems.length === 0) {
    list.innerHTML = '<li style="color:var(--ink-light);font-size:13px;font-style:italic;padding:4px 0;">Aucun objet supplémentaire</li>';
    return;
  }
  list.innerHTML = '';
  wizExtraItems.forEach((name, i) => {
    const li = document.createElement('li');
    li.className = 'item-entry';
    li.innerHTML = `<span class="item-icon">${itemIcon(name)}</span><span class="item-name">${esc(name)}</span><button class="item-del" onclick="removeWizItem(${i})">✕</button>`;
    list.appendChild(li);
  });
}

// ── Choix potion ──────────────────────────
function selectPotion(el) {
  document.querySelectorAll('#potion-choices .equip-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  wiz.potion = el.dataset.potion;
}

// ── Résumé ────────────────────────────────
function buildSummary() {
  const pt        = POTION_TYPES[wiz.potion || 'stamina'];
  const theme     = currentTheme();
  const baseItems = [...(theme.equipment || ['Épée', 'Armure de cuir', 'Lanterne']), ...wizExtraItems];

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('sum-skill',   wiz.skill);
  set('sum-stamina', wiz.stamina);
  set('sum-luck',    wiz.luck);
  set('sum-name',    wiz.name);
  set('sum-theme',   theme.icon + ' ' + theme.label);
  set('sum-book',    wiz.book);
  set('sum-equip',   baseItems.join(', '));
  set('sum-gold',    (wiz.gold || 0) + ' PO');
  set('sum-potion',  pt.icon + ' ' + pt.label + ' (2 mesures)');
}

// ── Finalisation ──────────────────────────
function wizFinish() {
  const rules  = wiz.rules || getBookRules(wiz.bookNum);
  const pt     = POTION_TYPES[wiz.potion || 'stamina'];
  const theme  = currentTheme();

  // Équipement de départ selon les règles du livre
  let baseEquip = [];
  if (!rules.noEquipment) {
    const equipList = rules.equipment || theme.equipment || ['Épée', 'Armure de cuir', 'Lanterne'];
    baseEquip = equipList.map(function(name) { return { name: name, qty: 1 }; });
    if (!rules.noPotion) {
      baseEquip.push({ name: pt.label + ' (2 mesures)', qty: 1 });
    }
  }
  wizExtraItems.forEach(function(n) { baseEquip.push({ name: n, qty: 1 }); });

  // Stats de base avec malus éventuel
  var skillVal = wiz.skill;
  var skillDisplay = skillVal + (rules.skillPenalty ? ' (' + rules.skillPenalty + ' temp.)' : '');

  state = {
    name: wiz.name, book: wiz.book, bookNum: wiz.bookNum,
    theme: wiz.theme, visualTheme: wiz.theme,
    skill:   wiz.skill + (rules.skillPenalty || 0),
    skillMax: wiz.skill,
    stamina: wiz.stamina, staminaMax: wiz.stamina,
    luck:    wiz.luck,    luckMax:    wiz.luck,
    gold: wiz.gold || 0, meals: 0,
    potions: rules.noPotion ? 0 : 2,
    potionsTotal: rules.noPotion ? 0 : 2,
    potionType: wiz.potion || 'stamina',
    extraStats: wizExtraStatValues,
    items: baseEquip,
    notes: rules.specialRules ? ('📋 RÈGLES SPÉCIALES:\n' + rules.specialRules + '\n\n') : '',
    paras: '', diceHistory: [],
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  document.getElementById('wizard').style.display = 'none';
  applyVisualTheme(wiz.theme || 'fantasy');
  render();
  toast(theme.icon + ' Que l\'aventure commence, ' + state.name + ' !');
}

// ── Réinitialisation ──────────────────────
function reopenWizard() {
  if (!confirm('Créer un nouveau personnage ? La partie actuelle sera effacée.')) return;
  localStorage.removeItem(SAVE_KEY);

  wiz = {
    step: 0, name: '', book: '', bookNum: null, theme: 'fantasy',
    skill: null,   skillRolled: false,
    stamina: null, staminaRolled: false,
    luck: null,    luckRolled: false,
    gold: 0, potion: 'stamina',
  };
  wizExtraItems   = [];
  selectedBookIdx = -1;

  const safeText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const safeVal  = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const safeHide = id      => { const el = document.getElementById(id); if (el) el.style.display = 'none'; };

  safeText('wiz-skill-roll',   '–'); safeText('wiz-d-skill',    '?');
  safeText('wiz-stamina-roll', '–'); safeText('wiz-d-stamina1', '?'); safeText('wiz-d-stamina2', '?');
  safeText('wiz-luck-roll',    '–'); safeText('wiz-d-luck',     '?');
  safeText('wiz-gold-display', '0');
  safeHide('wiz-skill-reroll-hint');
  safeHide('wiz-stamina-reroll-hint');
  safeHide('wiz-luck-reroll-hint');
  safeHide('wiz-theme-banner');
  safeHide('wiz-special-rules');
  safeVal('wiz-name', ''); safeVal('wiz-book', ''); safeVal('book-search', '');

  const ns = document.getElementById('name-suggestions');
  if (ns) ns.innerHTML = '';

  document.querySelectorAll('#potion-choices .equip-opt')
    .forEach((o, i) => o.classList.toggle('selected', i === 0));

  renderWizExtraList();
  applyVisualTheme('fantasy');
  document.getElementById('wizard').style.display = 'flex';
  wizGo(0);
}

// ── Générateur de noms ────────────────────
function generateName() {
  const theme  = currentTheme();
  const style  = NAMES_BY_STYLE[theme.nameStyle] || NAMES_BY_STYLE.fantasy;
  const rnd    = arr => arr[Math.floor(Math.random() * arr.length)];
  const suggestions = [];

  if (theme.nameStyle === 'fantasy') {
    for (let i = 0; i < 3; i++)
      suggestions.push(rnd(style.prefix) + rnd(style.suffix));
    suggestions.push(rnd(style.female) + ' ' + rnd(style.titles));
    suggestions.push(rnd(style.male)   + ' ' + rnd(style.titles));
    suggestions.push(rnd(style.prefix) + rnd(style.mid));
  } else {
    for (let i = 0; i < 3; i++)
      suggestions.push(rnd(style.male)   + ' ' + rnd(style.titles));
    for (let i = 0; i < 3; i++)
      suggestions.push(rnd(style.female) + ' ' + rnd(style.titles));
  }

  const container = document.getElementById('name-suggestions');
  if (!container) return;
  container.innerHTML = '';

  const labelEl = document.getElementById('wiz-name-style-label');
  if (labelEl) labelEl.textContent = 'Style : ' + theme.label + ' ' + theme.icon;

  suggestions.slice(0, 6).forEach(name => {
    const chip = document.createElement('div');
    chip.className   = 'name-chip';
    chip.textContent = name;
    chip.onclick     = () => {
      const input = document.getElementById('wiz-name');
      if (input) input.value = name;
      container.querySelectorAll('.name-chip').forEach(c => c.style.fontWeight = 'normal');
      chip.style.fontWeight = 'bold';
    };
    container.appendChild(chip);
  });
}

// ── PDF ───────────────────────────────────
function openBookPDF(n) {
  const book = BOOKS.find(b => b.n === n);
  if (!book || !book.pdf) { toast('❌ PDF non disponible pour ce livre.'); return; }
  window.open(book.pdf, '_blank');
}

// ── Liste des livres ──────────────────────
function renderBookList(filter) {
  const list = document.getElementById('book-list');
  if (!list) return;

  const q        = (filter || '').toLowerCase().trim();
  const filtered = BOOKS.filter(b =>
    b.t.toLowerCase().includes(q) || String(b.n).includes(q)
  );

  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = '<div style="padding:12px;text-align:center;font-size:13px;color:var(--ink-light);font-style:italic;">Aucun résultat</div>';
    return;
  }

  filtered.forEach(b => {
    const themeKey = BOOK_THEMES[b.n] || 'fantasy';
    const theme    = THEMES[themeKey];
    const div      = document.createElement('div');
    div.className  = 'book-item' + (selectedBookIdx === b.n ? ' selected' : '');

    const num    = document.createElement('span');
    num.className = 'book-num';
    num.textContent = b.n;

    const icon   = document.createElement('span');
    icon.style.cssText = 'font-size:13px;flex-shrink:0;';
    icon.title   = theme.label;
    icon.textContent = theme.icon;

    const title  = document.createElement('span');
    title.className = 'book-title';
    title.style.flex = '1';
    title.textContent = b.t;

    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'book-pdf-btn';
    pdfBtn.title     = 'Lire le PDF';
    pdfBtn.textContent = '📖';
    pdfBtn.addEventListener('click', e => { e.stopPropagation(); openBookPDF(b.n); });

    div.appendChild(num);
    div.appendChild(icon);
    div.appendChild(title);
    div.appendChild(pdfBtn);

    div.addEventListener('click', () => {
      selectedBookIdx = b.n;
      onBookSelected(b.n, '#' + b.n + ' — ' + b.t);
      renderBookList(document.getElementById('book-search')?.value || '');
    });

    list.appendChild(div);
  });
}

function filterBooks(q) { renderBookList(q); }

// ── Init ──────────────────────────────────
function initWizardUI() {
  applyTheme('fantasy');
  // book list et noms rendus dans wizGo(1) quand l'écran est visible
}
