/* ══════════════════════════════════════════
   themes.js — Thèmes visuels par univers
   Appliqué dynamiquement via CSS variables
   et classes sur <body>
══════════════════════════════════════════ */

const VISUAL_THEMES = {

  // ── Fantasy médiévale (défaut) ───────────
  fantasy: {
    fonts: {
      title:  "'Cinzel Decorative', cursive",
      ui:     "'Cinzel', serif",
      body:   "'EB Garamond', serif",
    },
    googleFonts: 'Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400',
    vars: {
      '--parchment':      '#f2e8d0',
      '--parchment-dark': '#e0ceaa',
      '--ink':            '#1a0f00',
      '--ink-light':      '#3d2b0f',
      '--gold':           '#c9a84c',
      '--gold-light':     '#e8c96b',
      '--gold-dark':      '#8a6520',
      '--emerald':        '#1a5c3a',
      '--emerald-light':  '#2d8a58',
      '--blood':          '#8b1a1a',
      '--blood-dark':     '#5c0e0e',
      '--accent1':        '#c9a84c',
      '--accent2':        '#8a6520',
      '--header-bg':      'linear-gradient(180deg, #1a0a00 0%, #2d1500 60%, #1a0a00 100%)',
      '--header-border':  '#c9a84c',
      '--nav-bg':         '#120800',
      '--card-bg':        'rgba(240,228,200,0.6)',
      '--card-border':    'rgba(201,168,76,0.4)',
      '--app-bg':         '#1a0f00',
      '--body-bg':        '#1a0f00',
      '--stat-btn-bg':    'linear-gradient(180deg, #2d1500, #1a0a00)',
      '--roll-btn-bg':    'linear-gradient(180deg, #8b1a1a, #5c0e0e)',
      '--roll-btn-border':'#c9453a',
      '--primary-btn-bg': 'linear-gradient(180deg, #2d5a1a, #1a3a0e)',
      '--primary-btn-border': '#5aab3a',
      '--section-bg':     'rgba(240,228,200,0.6)',
    },
    headerIcon: '⚔',
    bodyClass:  'theme-fantasy',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
  },

  // ── Science-fiction ──────────────────────
  scifi: {
    fonts: {
      title:  "'Orbitron', sans-serif",
      ui:     "'Rajdhani', sans-serif",
      body:   "'Rajdhani', sans-serif",
    },
    googleFonts: 'Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700',
    vars: {
      '--parchment':      '#0a0e1a',
      '--parchment-dark': '#0d1220',
      '--ink':            '#c8e0ff',
      '--ink-light':      '#7aa8d8',
      '--gold':           '#00d4ff',
      '--gold-light':     '#80eaff',
      '--gold-dark':      '#0099cc',
      '--emerald':        '#00ff88',
      '--emerald-light':  '#33ffaa',
      '--blood':          '#ff3366',
      '--blood-dark':     '#cc0044',
      '--accent1':        '#00d4ff',
      '--accent2':        '#0099cc',
      '--header-bg':      'linear-gradient(180deg, #000510 0%, #001428 60%, #000510 100%)',
      '--header-border':  '#00d4ff',
      '--nav-bg':         '#000510',
      '--card-bg':        'rgba(0,20,40,0.85)',
      '--card-border':    'rgba(0,212,255,0.3)',
      '--app-bg':         '#000510',
      '--body-bg':        '#000510',
      '--stat-btn-bg':    'linear-gradient(180deg, #001428, #000510)',
      '--roll-btn-bg':    'linear-gradient(180deg, #cc0044, #880022)',
      '--roll-btn-border':'#ff3366',
      '--primary-btn-bg': 'linear-gradient(180deg, #006633, #003322)',
      '--primary-btn-border': '#00ff88',
      '--section-bg':     'rgba(0,20,40,0.7)',
    },
    headerIcon: '🚀',
    bodyClass:  'theme-scifi',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='none'/%3E%3Cpath d='M0 30h60M30 0v60' stroke='%2300d4ff' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E")`,
  },

  // ── Post-apocalyptique ───────────────────
  postapoc: {
    fonts: {
      title:  "'Bebas Neue', cursive",
      ui:     "'Oswald', sans-serif",
      body:   "'Oswald', sans-serif",
    },
    googleFonts: 'Bebas+Neue&family=Oswald:wght@300;400;500;600;700',
    vars: {
      '--parchment':      '#1a1208',
      '--parchment-dark': '#251a0a',
      '--ink':            '#d4b896',
      '--ink-light':      '#a08060',
      '--gold':           '#cc7700',
      '--gold-light':     '#ff9900',
      '--gold-dark':      '#884400',
      '--emerald':        '#4a7a00',
      '--emerald-light':  '#6aaa00',
      '--blood':          '#cc3300',
      '--blood-dark':     '#882200',
      '--accent1':        '#cc7700',
      '--accent2':        '#884400',
      '--header-bg':      'linear-gradient(180deg, #0a0800 0%, #1a1208 60%, #0a0800 100%)',
      '--header-border':  '#cc7700',
      '--nav-bg':         '#0a0800',
      '--card-bg':        'rgba(26,18,8,0.9)',
      '--card-border':    'rgba(204,119,0,0.35)',
      '--app-bg':         '#0a0800',
      '--body-bg':        '#0a0800',
      '--stat-btn-bg':    'linear-gradient(180deg, #251a0a, #0a0800)',
      '--roll-btn-bg':    'linear-gradient(180deg, #882200, #551100)',
      '--roll-btn-border':'#cc3300',
      '--primary-btn-bg': 'linear-gradient(180deg, #3a5500, #253800)',
      '--primary-btn-border': '#6aaa00',
      '--section-bg':     'rgba(26,18,8,0.8)',
    },
    headerIcon: '🚗',
    bodyClass:  'theme-postapoc',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
  },

  // ── Horreur ──────────────────────────────
  horror: {
    fonts: {
      title:  "'Creepster', cursive",
      ui:     "'Special Elite', cursive",
      body:   "'Special Elite', cursive",
    },
    googleFonts: 'Creepster&family=Special+Elite',
    vars: {
      '--parchment':      '#0f0a0a',
      '--parchment-dark': '#1a1010',
      '--ink':            '#c8b8b8',
      '--ink-light':      '#8a7070',
      '--gold':           '#8b0000',
      '--gold-light':     '#cc2222',
      '--gold-dark':      '#550000',
      '--emerald':        '#1a3a1a',
      '--emerald-light':  '#2d5a2d',
      '--blood':          '#cc0000',
      '--blood-dark':     '#880000',
      '--accent1':        '#8b0000',
      '--accent2':        '#550000',
      '--header-bg':      'linear-gradient(180deg, #000000 0%, #0f0505 60%, #000000 100%)',
      '--header-border':  '#8b0000',
      '--nav-bg':         '#000000',
      '--card-bg':        'rgba(15,5,5,0.92)',
      '--card-border':    'rgba(139,0,0,0.4)',
      '--app-bg':         '#000000',
      '--body-bg':        '#000000',
      '--stat-btn-bg':    'linear-gradient(180deg, #1a0505, #000000)',
      '--roll-btn-bg':    'linear-gradient(180deg, #550000, #330000)',
      '--roll-btn-border':'#8b0000',
      '--primary-btn-bg': 'linear-gradient(180deg, #1a2a1a, #0f1a0f)',
      '--primary-btn-border': '#2d5a2d',
      '--section-bg':     'rgba(15,5,5,0.85)',
    },
    headerIcon: '💀',
    bodyClass:  'theme-horror',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
  },

  // ── Japon féodal ─────────────────────────
  samurai: {
    fonts: {
      title:  "'Shippori Mincho', serif",
      ui:     "'Shippori Mincho', serif",
      body:   "'Shippori Mincho', serif",
    },
    googleFonts: 'Shippori+Mincho:wght@400;500;600;700;800',
    vars: {
      '--parchment':      '#f5ede0',
      '--parchment-dark': '#e8d8c0',
      '--ink':            '#1a0a0a',
      '--ink-light':      '#3d1a1a',
      '--gold':           '#8b1a1a',
      '--gold-light':     '#cc3333',
      '--gold-dark':      '#550f0f',
      '--emerald':        '#1a3a2a',
      '--emerald-light':  '#2d5a3a',
      '--blood':          '#cc2200',
      '--blood-dark':     '#881500',
      '--accent1':        '#8b1a1a',
      '--accent2':        '#550f0f',
      '--header-bg':      'linear-gradient(180deg, #1a0505 0%, #2d0f0f 60%, #1a0505 100%)',
      '--header-border':  '#8b1a1a',
      '--nav-bg':         '#1a0505',
      '--card-bg':        'rgba(245,237,224,0.7)',
      '--card-border':    'rgba(139,26,26,0.35)',
      '--app-bg':         '#1a0505',
      '--body-bg':        '#1a0505',
      '--stat-btn-bg':    'linear-gradient(180deg, #2d0f0f, #1a0505)',
      '--roll-btn-bg':    'linear-gradient(180deg, #881500, #551000)',
      '--roll-btn-border':'#cc2200',
      '--primary-btn-bg': 'linear-gradient(180deg, #1a3a2a, #0f2a1a)',
      '--primary-btn-border': '#2d5a3a',
      '--section-bg':     'rgba(245,237,224,0.6)',
    },
    headerIcon: '⛩️',
    bodyClass:  'theme-samurai',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='1' fill='%238b1a1a' fill-opacity='0.08'/%3E%3C/svg%3E")`,
  },

  // ── Égypte antique ───────────────────────
  egypt: {
    fonts: {
      title:  "'Cinzel Decorative', cursive",
      ui:     "'Cinzel', serif",
      body:   "'EB Garamond', serif",
    },
    googleFonts: 'Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400',
    vars: {
      '--parchment':      '#f0e0b0',
      '--parchment-dark': '#ddc890',
      '--ink':            '#1a0f00',
      '--ink-light':      '#3d2000',
      '--gold':           '#d4a017',
      '--gold-light':     '#f0c040',
      '--gold-dark':      '#9a7010',
      '--emerald':        '#006644',
      '--emerald-light':  '#008855',
      '--blood':          '#8b1a00',
      '--blood-dark':     '#5c1000',
      '--accent1':        '#d4a017',
      '--accent2':        '#9a7010',
      '--header-bg':      'linear-gradient(180deg, #1a0f00 0%, #2d1e00 60%, #1a0f00 100%)',
      '--header-border':  '#d4a017',
      '--nav-bg':         '#1a0f00',
      '--card-bg':        'rgba(240,224,176,0.65)',
      '--card-border':    'rgba(212,160,23,0.4)',
      '--app-bg':         '#1a0f00',
      '--body-bg':        '#1a0f00',
      '--stat-btn-bg':    'linear-gradient(180deg, #2d1e00, #1a0f00)',
      '--roll-btn-bg':    'linear-gradient(180deg, #5c1000, #3a0a00)',
      '--roll-btn-border':'#8b1a00',
      '--primary-btn-bg': 'linear-gradient(180deg, #004433, #002a22)',
      '--primary-btn-border': '#008855',
      '--section-bg':     'rgba(240,224,176,0.6)',
    },
    headerIcon: '𓂀',
    bodyClass:  'theme-egypt',
    appTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='none'/%3E%3Cpath d='M40 10 L70 70 L10 70 Z' stroke='%23d4a017' stroke-opacity='0.05' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
  },
};

// ── Appliquer le thème visuel ─────────────
let _currentFontLink = null;

function applyVisualTheme(themeKey) {
  const t = VISUAL_THEMES[themeKey] || VISUAL_THEMES.fantasy;
  const root = document.documentElement;

  // CSS variables
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));

  // Police Google Fonts — charge uniquement si différente
  const fontUrl = 'https://fonts.googleapis.com/css2?family=' + t.googleFonts + '&display=swap';
  if (!_currentFontLink || _currentFontLink.href !== fontUrl) {
    if (_currentFontLink) _currentFontLink.remove();
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
    _currentFontLink = link;
  }

  // Police sur les éléments clés via CSS variable
  root.style.setProperty('--font-title', t.fonts.title);
  root.style.setProperty('--font-ui',    t.fonts.ui);
  root.style.setProperty('--font-body',  t.fonts.body);

  // Classe sur le body pour les overrides CSS spécifiques
  document.body.className = t.bodyClass;

  // Icône header
  document.querySelectorAll('.header-sword').forEach(el => {
    el.textContent = t.headerIcon;
  });

  // Texture de fond de l'app
  const app = document.querySelector('.app');
  if (app) app.style.backgroundImage = t.appTexture;

  // Sauvegarder le thème dans le state
  if (typeof state !== 'undefined') {
    state.visualTheme = themeKey;
  }
}

// ── Déterminer le thème depuis le numéro de livre ──
function getVisualThemeForBook(bookNum) {
  const gameTheme = BOOK_THEMES[bookNum] || 'fantasy';
  // Les thèmes visuels ont les mêmes clés que les thèmes de jeu
  return VISUAL_THEMES[gameTheme] ? gameTheme : 'fantasy';
}
