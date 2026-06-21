/* ══════════════════════════════════════════
   main.js — Point d'entrée
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const result = initState();

  if (result === 'loaded' || result === 'migrated') {
    // Restaurer le thème visuel avant d'afficher
    applyVisualTheme(state.visualTheme || state.theme || 'fantasy');
    document.getElementById('wizard').style.display = 'none';
    render();
    if (result === 'migrated') toast('🔄 Ancienne sauvegarde récupérée !');
    checkLegacySlots();
  } else {
    applyVisualTheme('fantasy');
    wizGo(0);
    initWizardUI();
  }
});
