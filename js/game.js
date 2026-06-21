/* ══════════════════════════════════════════
   game.js — Actions de jeu
   Stats, potion, or, provisions,
   inventaire, dés, combat
══════════════════════════════════════════ */

// ── Dé ───────────────────────────────────
function d6() { return Math.floor(Math.random() * 6) + 1; }

// ── Stats ────────────────────────────────
function changeStat(stat, delta) {
  const max = stat + 'Max';
  state[stat] = Math.max(0, Math.min(state[max], state[stat] + delta));
  render();
  saveState();
  if (stat === 'stamina' && state.stamina === 0) toast('💀 Votre personnage est mort !');
}

// ── Potion ───────────────────────────────
function addPotion()    { state.potionsTotal++; state.potions++; render(); saveState(); }
function removePotion() {
  if (state.potionsTotal <= 0) return;
  if (state.potions >= state.potionsTotal) state.potions--;
  state.potionsTotal--;
  render(); saveState();
}

function drinkPotion() {
  if (state.potions <= 0) { toast('Plus de mesure disponible !'); return; }
  state.potions--;
  const pt = state.potionType || 'stamina';
  const remaining = state.potions + ' mesure(s) restante(s)';
  if (pt === 'stamina') {
    state.stamina = state.staminaMax;
    toast('❤️ Potion de Vigueur — Endurance restaurée à ' + state.staminaMax + ' ! (' + remaining + ')');
  } else if (pt === 'skill') {
    state.skill = state.skillMax;
    toast("⚔️ Potion d'Adresse — Habileté restaurée à " + state.skillMax + ' ! (' + remaining + ')');
  } else if (pt === 'luck') {
    state.luckMax += 1;
    state.luck     = state.luckMax;
    toast('🍀 Potion de Bonne Fortune — Chance restaurée à ' + state.luck + ' (+1 bonus) ! (' + remaining + ')');
  }
  render(); saveState();
}

// ── Or ───────────────────────────────────
function changeGold(delta) {
  state.gold = Math.max(0, state.gold + delta);
  render(); saveState();
}

// ── Provisions ───────────────────────────
function changeMeals(delta) {
  state.meals = Math.max(0, state.meals + delta);
  render(); saveState();
}

function eatMeal() {
  if (state.meals <= 0) { toast('Plus de provisions !'); return; }
  state.meals--;
  const gain    = Math.min(4, state.staminaMax - state.stamina);
  state.stamina = Math.min(state.staminaMax, state.stamina + 4);
  render(); saveState();
  toast('🍖 +' + gain + ' Endurance (total : ' + state.stamina + ')');
}

// ── Inventaire ───────────────────────────
function addItem() {
  const input    = document.getElementById('item-input');
  const qtyInput = document.getElementById('qty-input');
  const name     = input.value.trim();
  if (!name) return;
  const qty      = parseInt(qtyInput.value) || 1;
  const existing = state.items.find(i => i.name.toLowerCase() === name.toLowerCase());
  if (existing) { existing.qty += qty; }
  else          { state.items.push({ name, qty }); }
  input.value    = '';
  qtyInput.value = 1;
  render(); saveState();
}

function removeItem(i) {
  state.items.splice(i, 1);
  render(); saveState();
}

// ── Dés (panneau Dés) ────────────────────
let diceHistory = [];

function rollDice(n) {
  const dice  = Array.from({ length: n }, d6);
  const total = dice.reduce((a, b) => a + b, 0);

  const d1 = document.getElementById('die1');
  const d2 = document.getElementById('die2');
  d1.classList.add('rolling');
  d2.classList.add('rolling');
  setTimeout(() => {
    d1.textContent = dice[0];
    d2.textContent = n > 1 ? dice[1] : '–';
    document.getElementById('dice-total').textContent = total;
    document.getElementById('dice-label').textContent = n === 2 ? 'Total (2d6)' : '1d6';
    d1.classList.remove('rolling');
    d2.classList.remove('rolling');
  }, 500);

  addDiceHistory(`🎲 ${n}d6 → [${dice.join(', ')}] = <strong>${total}</strong>`);
  return { dice, total };
}

function testLuck() {
  const roll  = d6() + d6();
  const lucky = roll <= state.luck;
  const old   = state.luck;
  state.luck  = Math.max(0, state.luck - 1);

  const el = document.getElementById('luck-result');
  el.textContent  = lucky ? '✨ CHANCEUX !' : '💀 MALCHANCEUX…';
  el.style.color  = lucky ? '#1a5c3a' : '#8b1a1a';

  addDiceHistory(`🍀 Chance : ${roll} vs ${old} → ${lucky ? 'Chanceux ✨' : 'Malchanceux 💀'}`);
  render(); saveState();
}

function addDiceHistory(entry) {
  diceHistory.unshift(entry);
  if (diceHistory.length > 20) diceHistory.pop();
  const el = document.getElementById('dice-history');
  if (el) el.innerHTML = diceHistory.slice(0, 10).map(e => `<div>${e}</div>`).join('');
}

function clearHistory() {
  diceHistory = [];
  const el = document.getElementById('dice-history');
  if (el) el.innerHTML = '';
}

// ── Combat ───────────────────────────────
let combatEnemyStamina = 0;
let modHero  = 0;
let modEnemy = 0;

function changeMod(who, delta) {
  if (who === 'hero')  modHero  = Math.max(-10, Math.min(10, modHero  + delta));
  else                 modEnemy = Math.max(-10, Math.min(10, modEnemy + delta));
  renderMods();
}

function setMod(who, val) {
  if (who === 'hero') modHero  = val;
  else                modEnemy = val;
  renderMods();
}

function renderMods() {
  const fmt = v => (v > 0 ? '+' : '') + v;
  const cls = v => v > 0 ? 'positive' : v < 0 ? 'negative' : 'zero';

  const hEl = document.getElementById('mod-hero-val');
  const eEl = document.getElementById('mod-enemy-val');
  if (hEl) { hEl.textContent = fmt(modHero);  hEl.className = 'mod-val ' + cls(modHero); }
  if (eEl) { eEl.textContent = fmt(modEnemy); eEl.className = 'mod-val ' + cls(modEnemy); }

  const badge = document.getElementById('mod-active-badge');
  if (!badge) return;
  const parts = [];
  if (modHero  !== 0) parts.push(`Vous : <strong style="color:${modHero  > 0 ? 'var(--emerald)' : 'var(--blood-dark)'}">${fmt(modHero)}</strong>`);
  if (modEnemy !== 0) parts.push(`Ennemi : <strong style="color:${modEnemy > 0 ? 'var(--emerald)' : 'var(--blood-dark)'}">${fmt(modEnemy)}</strong>`);
  badge.innerHTML   = parts.length ? '⚗️ Modificateurs actifs — ' + parts.join(' | ') : 'Aucun modificateur actif';
  badge.style.fontStyle = parts.length ? 'normal' : 'italic';
  badge.style.color     = parts.length ? 'var(--ink)' : 'var(--ink-light)';
}

function combatRound() {
  const enemyName  = document.getElementById('enemy-name').value  || 'Adversaire';
  const enemySkill = parseInt(document.getElementById('enemy-skill').value) || 7;
  if (combatEnemyStamina === 0) combatEnemyStamina = parseInt(document.getElementById('enemy-stamina').value) || 10;

  if (state.stamina <= 0)      { addCombatLog('💀 Vous êtes mort.', 'dmg');                   return; }
  if (combatEnemyStamina <= 0) { addCombatLog('🏆 Adversaire déjà vaincu !', 'info');          return; }

  const heroRoll  = d6() + d6();
  const enemyRoll = d6() + d6();
  const heroFA    = heroRoll  + state.skill + modHero;
  const enemyFA   = enemyRoll + enemySkill  + modEnemy;

  const fmtFA = (roll, skill, mod) => {
    let s = `${roll}+${skill}`;
    if (mod !== 0) s += (mod > 0 ? '+' : '') + mod;
    return s + `=<strong>${roll + skill + mod}</strong>`;
  };

  addCombatLog(`⚔ Votre FA : ${fmtFA(heroRoll, state.skill, modHero)} | ${enemyName} FA : ${fmtFA(enemyRoll, enemySkill, modEnemy)}`, 'info');

  if (heroFA > enemyFA) {
    combatEnemyStamina = Math.max(0, combatEnemyStamina - 2);
    addCombatLog(`✅ Vous touchez ${enemyName} ! (End. restante : ${combatEnemyStamina})`, 'miss');
    if (combatEnemyStamina <= 0) { addCombatLog(`🏆 ${enemyName} est vaincu !`, 'heal'); toast('🏆 Victoire ! ' + enemyName + ' est vaincu !'); }
  } else if (enemyFA > heroFA) {
    state.stamina = Math.max(0, state.stamina - 2);
    addCombatLog(`❌ ${enemyName} vous blesse ! (Votre End. : ${state.stamina})`, 'hit');
    if (state.stamina <= 0) { addCombatLog('💀 Vous êtes mort…', 'dmg'); toast('💀 Vous avez péri au combat !'); }
    render(); saveState();
  } else {
    addCombatLog('🔄 Égalité ! Les deux combattants esquivent.', 'info');
  }
}

function fightLuck() {
  const roll  = d6() + d6();
  const lucky = roll <= state.luck;
  state.luck  = Math.max(0, state.luck - 1);
  const enemy = document.getElementById('enemy-name').value || 'Adversaire';
  if (lucky) {
    combatEnemyStamina = Math.max(0, combatEnemyStamina - 2);
    addCombatLog(`🍀 Chanceux ! ${enemy} subit 2 dégâts supplémentaires. (End. : ${combatEnemyStamina})`, 'heal');
  } else {
    state.stamina = Math.max(0, state.stamina - 1);
    addCombatLog(`💀 Malchanceux ! Vous subissez 1 dégât. (Votre End. : ${state.stamina})`, 'hit');
  }
  render(); saveState();
}

function addCombatLog(msg, cls) {
  const log = document.getElementById('combat-log');
  if (!log) return;
  const div = document.createElement('div');
  div.className = 'log-entry ' + (cls || '');
  div.innerHTML = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function resetCombat() {
  combatEnemyStamina = 0;
  modHero = 0; modEnemy = 0;
  renderMods();
  const log = document.getElementById('combat-log');
  if (log) log.innerHTML = '<div class="log-entry info">⚔ Prêt à combattre…</div>';
  const ens = document.getElementById('enemy-stamina');
  if (ens) ens.value = '10';
}
