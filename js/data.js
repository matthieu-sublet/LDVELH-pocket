/* ══════════════════════════════════════════
   data.js — Données statiques
   Potions, livres, thèmes, noms
══════════════════════════════════════════ */

// ── Potions ──────────────────────────────
const POTION_TYPES = {
  skill:   { label: "Potion d'Adresse",       icon: '⚔️', stat: 'skill'   },
  stamina: { label: 'Potion de Vigueur',       icon: '❤️', stat: 'stamina' },
  luck:    { label: 'Potion de Bonne Fortune', icon: '🍀', stat: 'luck'    },
};

// ── Livres avec URL PDF ──────────────────
const BASE_PDF = 'https://bibl.remz.ca/defis_fantastiques-65/';

const BOOKS = [
  { n:  1, t: 'Le Sorcier de la Montagne de Feu',  pdf: 'Defis%20Fantastiques%2001%20-%20Le%20Sorcier%20de%20la%20Montagne%20de%20feu.pdf' },
  { n:  2, t: 'La Citadelle du Chaos',              pdf: 'Defis%20Fantastiques%2002%20-%20La%20Citadelle%20du%20Chaos.pdf' },
  { n:  3, t: 'La Forêt de la Malédiction',         pdf: 'Defis%20Fantastiques%2003%20-%20La%20Foret%20de%20la%20Malediction.pdf' },
  { n:  4, t: 'La Cité des Voleurs',                pdf: 'Defis%20Fantastiques%2004%20-%20La%20Cite%20des%20Voleurs.pdf' },
  { n:  5, t: 'La Plaine des Ténèbres',             pdf: 'Defis%20Fantastiques%2005%20-%20La%20Plaine%20des%20Tenebres.pdf' },
  { n:  6, t: "Le Manoir de l'Enfer",               pdf: "Defis%20Fantastiques%2006%20-%20Le%20Manoir%20de%20l'enfer.pdf" },
  { n:  7, t: "L'Île du Roi Lézard",                pdf: "Defis%20Fantastiques%2007%20-%20L'Ile%20du%20Roi%20Lezard.pdf" },
  { n:  8, t: 'Les Collines du Diable',             pdf: 'Defis%20Fantastiques%2008%20-%20Les%20Collines%20du%20Diable.pdf' },
  { n:  9, t: 'Le Marais du Désespoir',             pdf: 'Defis%20Fantastiques%2009%20-%20La%20Sorciere%20des%20Neiges.pdf' },
  { n: 10, t: 'La Légende du Zagor',                pdf: "Defis%20Fantastiques%2010%20-%20Le%20Manoir%20de%20l'enfer.pdf" },
  { n: 11, t: 'La Créature venue des profondeurs',  pdf: 'Defis%20Fantastiques%2011%20-%20La%20Creature%20venue%20des%20profondeurs.pdf' },
  { n: 12, t: 'La Forteresse de la Terreur',        pdf: 'Defis%20Fantastiques%2012%20-%20La%20Forteresse%20de%20la%20Terreur.pdf' },
  { n: 13, t: 'La Malédiction de la Momie',         pdf: 'Defis%20Fantastiques%2013%20-%20La%20Malediction%20de%20la%20Momie.pdf' },
  { n: 14, t: "L'Épée du Samouraï",                 pdf: 'Defis%20Fantastiques%2014%20-%20Le%20Temple%20de%20la%20Terreur.pdf' },
  { n: 15, t: "L'Antre de la Peur",                 pdf: "Defis%20Fantastiques%2015%20-%20L'Antre%20de%20la%20Peur.pdf" },
  { n: 16, t: 'La Galaxie Maudite',                 pdf: 'Defis%20Fantastiques%2016%20-%20La%20Galaxie%20Maudite.pdf' },
  { n: 17, t: "L'Ennemi du Temps",                  pdf: "Defis%20Fantastiques%2017%20-%20L'Ennemi%20du%20Temps.pdf" },
  { n: 18, t: "L'Autel des Dieux",                  pdf: "Defis%20Fantastiques%2018%20-%20L'Autel%20des%20Dieux.pdf" },
  { n: 19, t: 'Le Masque du Chaos',                 pdf: 'Defis%20Fantastiques%2019%20-%20Le%20Masque%20du%20Chaos.pdf' },
  { n: 20, t: 'La Tombe des Rois',                  pdf: 'Defis%20Fantastiques%2020%20-%20La%20Tombe%20des%20Rois.pdf' },
  { n: 21, t: "L'Épreuve des Champions",            pdf: "Defis%20Fantastiques%2021%20-%20l'epreuve%20des%20champions.pdf" },
  { n: 22, t: 'Le Robot de Glace',                  pdf: 'Defis%20Fantastiques%2022%20-%20Le%20Robot%20de%20Glace.pdf' },
  { n: 23, t: "L'Horreur sur Titan",                pdf: "Defis%20Fantastiques%2023%20-%20L'Horreur%20sur%20Titan.pdf" },
  { n: 24, t: 'La Tour du Destin',                  pdf: 'Defis%20Fantastiques%2024%20-%20La%20Tour%20du%20Destin.pdf' },
  { n: 25, t: 'Les Galères du Malheur',             pdf: 'Defis%20Fantastiques%2025%20-%20Les%20Galeres%20du%20Malheur.pdf' },
  { n: 26, t: 'Le Labyrinthe de la Mort',           pdf: 'Defis%20Fantastiques%2026%20-%20Le%20Labyrinthe%20de%20la%20Mort.pdf' },
  { n: 27, t: "L'Arène des Ombres",                 pdf: "Defis%20Fantastiques%2027%20-%20L'Arena%20de%20la%20Terreur.pdf" },
  { n: 28, t: 'La Prison du Mal',                   pdf: 'Defis%20Fantastiques%2028%20-%20La%20Prison%20du%20Mal.pdf' },
  { n: 29, t: 'La Terre des Dieux',                 pdf: 'Defis%20Fantastiques%2029%20-%20La%20Terre%20des%20Dieux.pdf' },
  { n: 30, t: 'La Rébellion des Robots',            pdf: 'Defis%20Fantastiques%2030%20-%20La%20Rebellion%20des%20Robots.pdf' },
  { n: 31, t: 'Le Passage du Diable',               pdf: 'Defis%20Fantastiques%2031%20-%20Le%20Passage%20du%20Diable.pdf' },
  { n: 32, t: "Le Voleur d'Âmes",                   pdf: "Defis%20Fantastiques%2032%20-%20Le%20Voleur%20d'Ames.pdf" },
  { n: 33, t: 'Les Jungles de la Mort',             pdf: 'Defis%20Fantastiques%2033%20-%20Les%20Jungles%20de%20la%20Mort.pdf' },
  { n: 34, t: "L'Île du Roi du Volcan",             pdf: "Defis%20Fantastiques%2034%20-%20L'Ile%20du%20Roi%20du%20Volcan.pdf" },
  { n: 35, t: 'Le Talisman de la Mort',             pdf: 'Defis%20Fantastiques%2035%20-%20Le%20Talisman%20de%20la%20Mort.pdf' },
  { n: 36, t: 'Le Chasseur de Primes',              pdf: 'Defis%20Fantastiques%2036%20-%20Le%20Chasseur%20de%20Primes.pdf' },
  { n: 37, t: "Le Guerrier d'Acier",                pdf: "Defis%20Fantastiques%2037%20-%20Le%20Guerrier%20d'Acier.pdf" },
  { n: 38, t: 'La Demeure des Morts',               pdf: "Defis%20Fantastiques%2038%20-%20L'Elu%20des%20Six%20Clans.pdf" },
  { n: 39, t: 'Le Retour de Vampyr',                pdf: 'Defis%20Fantastiques%2039%20-%20Le%20Retour%20de%20Vampyr.pdf' },
  { n: 40, t: 'Les Donjons de Dragonlance',         pdf: 'Defis%20Fantastiques%2040%20-%20Les%20Donjons%20de%20Dragonlance.pdf' },
  { n: 41, t: 'La Légende des Sept Serpents',       pdf: 'Defis%20Fantastiques%2041%20-%20La%20Vengeance%20des%20Demons.pdf' },
  { n: 42, t: 'Le Colosse de Mahaka',               pdf: 'Defis%20Fantastiques%2042%20-%20Le%20Colosse%20de%20Mahaka.pdf' },
  { n: 43, t: 'La Montagne du Druide',              pdf: 'Defis%20Fantastiques%2043%20-%20La%20Montagne%20du%20Druide.pdf' },
  { n: 44, t: 'Le Temple de la Terreur',            pdf: 'Defis%20Fantastiques%2044%20-%20Le%20Temple%20de%20la%20Terreur.pdf' },
  { n: 45, t: 'Le Manoir des Pièges',               pdf: 'Defis%20Fantastiques%2045%20-%20La%20Tour%20de%20la%20Destruction.pdf' },
  { n: 46, t: 'La Créature du Chaos',               pdf: 'Defis%20Fantastiques%2046%20-%20La%20Creature%20du%20Chaos.pdf' },
  { n: 47, t: "L'Abbaye des Spectres",              pdf: "Defis%20Fantastiques%2047%20-%20L'Abbaye%20des%20Spectres.pdf" },
  { n: 48, t: "Les Mondes de l'Aleph",              pdf: "Defis%20Fantastiques%2048%20-%20Les%20Mondes%20de%20l'Aleph.pdf" },
  { n: 49, t: "La Pyramide de l'Horreur",           pdf: "Defis%20Fantastiques%2049%20-%20La%20Pyramide%20de%20l'Horreur.pdf" },
  { n: 50, t: 'Le Retour du Sorcier',               pdf: 'Defis%20Fantastiques%2050%20-%20Le%20Retour%20du%20Sorcier.pdf' },
  { n: 51, t: 'Les Guerriers du Destin',            pdf: 'Defis%20Fantastiques%2051%20-%20Les%20Guerriers%20du%20Destin.pdf' },
  { n: 52, t: 'Les Catacombes du Cauchemar',        pdf: 'Defis%20Fantastiques%2052%20-%20Les%20Catacombes%20du%20Cauchemar.pdf' },
  { n: 53, t: 'La Grotte du Chaos',                 pdf: 'Defis%20Fantastiques%2053%20-%20La%20Grotte%20du%20Chaos.pdf' },
  { n: 54, t: 'La Tour de Glace',                   pdf: 'Defis%20Fantastiques%2054%20-%20La%20Tour%20de%20Glace.pdf' },
  { n: 55, t: 'La Lande de la Mort',                pdf: 'Defis%20Fantastiques%2055%20-%20La%20Lande%20de%20la%20Mort.pdf' },
  { n: 56, t: 'Les Chevaliers du Destin',           pdf: 'Defis%20Fantastiques%2056%20-%20Les%20Chevaliers%20du%20Destin.pdf' },
  { n: 57, t: 'Le Chasseur de Mages',               pdf: 'Defis%20Fantastiques%2057%20-%20Le%20Chasseur%20de%20Mages.pdf' },
  { n: 58, t: 'Le Retour du Vampire',               pdf: 'Defis%20Fantastiques%2058%20-%20Le%20Retour%20du%20Vampire.pdf' },
  { n: 59, t: 'La Malédiction de la Momie (rééd.)', pdf: 'Defis%20Fantastiques%2059%20-%20La%20Malediction%20de%20la%20Momie.pdf' },
];

// ── Thèmes par univers ───────────────────
const THEMES = {
  fantasy: {
    label: 'Fantasy médiévale', icon: '⚔️', color: '#8a6520',
    equipment: ['Épée', 'Armure de cuir', 'Lanterne'],
    nameStyle: 'fantasy',
    hint: 'Univers classique de Titan — épées, magie et donjons.',
    special: null,
  },
  scifi: {
    label: 'Science-fiction', icon: '🚀', color: '#1a4a6e',
    equipment: ['Pistolet laser', 'Combinaison spatiale', 'Communicateur', 'Kit de survie'],
    nameStyle: 'modern',
    hint: 'Univers spatial. Les armes à énergie remplacent les épées.',
    special: 'Dans ce livre, le combat peut utiliser des armes à feu ou laser.',
  },
  postapoc: {
    label: 'Post-apocalyptique', icon: '🚗', color: '#5a3a1a',
    equipment: ['Fusil de chasse', 'Voiture blindée', 'Jerricane d\'essence', 'Trousse de secours'],
    nameStyle: 'modern',
    hint: 'Monde dévasté, routes dangereuses. Votre véhicule est votre meilleure arme.',
    special: 'Votre véhicule a ses propres points de carrosserie à gérer séparément.',
  },
  horror: {
    label: 'Horreur', icon: '👻', color: '#3a1a3a',
    equipment: ['Lampe torche', 'Crucifix', 'Couteau', 'Carnet de notes'],
    nameStyle: 'modern',
    hint: 'Ambiance gothique ou horreur contemporaine.',
    special: 'Certains livres ajoutent un score de PEUR en plus des stats habituelles.',
  },
  samurai: {
    label: 'Japon féodal', icon: '⛩️', color: '#6e1a1a',
    equipment: ['Katana', 'Wakizashi', 'Armure de samouraï (do-maru)', 'Rations de riz'],
    nameStyle: 'japanese',
    hint: "Univers du Japon féodal. L'honneur est aussi important que la survie.",
    special: "Ce livre inclut un score d'HONNEUR qui influence certaines situations.",
  },
  egypt: {
    label: 'Égypte antique', icon: '🏺', color: '#8a6520',
    equipment: ['Khépesh (épée courbe)', 'Bouclier en bois', 'Amulette', 'Provisions'],
    nameStyle: 'ancient',
    hint: 'Pyramides, malédictions et dieux égyptiens.',
    special: null,
  },
};

// ── Association livre → thème visuel ───────
const BOOK_THEMES = {
  // Science-fiction
  16: 'scifi', 17: 'scifi', 22: 'scifi', 23: 'scifi', 30: 'scifi', 37: 'scifi',
  // Post-apocalyptique
  36: 'postapoc',
  // Horreur
  38: 'horror', 39: 'horror', 49: 'horror', 58: 'horror', 59: 'horror',
  // Japon féodal
  14: 'samurai',
  // Égypte antique
  13: 'egypt',
};

/* ══════════════════════════════════════════
   RÈGLES SPÉCIFIQUES PAR LIVRE
   Chaque entrée peut surcharger :
   - skillFormula    : formule Habileté (défaut: '1d6+6')
   - staminaFormula  : formule Endurance (défaut: '2d6+12')
   - luckFormula     : formule Chance (défaut: '1d6+6')
   - skillBonus      : bonus fixe Habileté (int)
   - staminaBonus    : bonus fixe Endurance (int)
   - luckBonus       : bonus fixe Chance (int)
   - skillDice       : nb de dés Habileté (défaut: 1)
   - staminaDice     : nb de dés Endurance (défaut: 2)
   - extraStats      : stats supplémentaires []
   - equipment       : liste d'objets de départ (remplace défaut)
   - noEquipment     : true = pas d'équipement de départ
   - noPotion        : true = pas de potion
   - noPotionChoice  : true = pas de choix de potion (potion imposée)
   - potionForced    : type de potion imposée
   - specialRules    : texte explicatif des règles spéciales
   - skillPenalty    : malus Habileté de départ (ex: -3 pour House of Hell)
   - startingGold    : or de départ fixe (si non nul, pas de saisie)
   - crewStats       : true = créer des stats pour l'équipage (Starship Traveller)
══════════════════════════════════════════ */

const BOOK_RULES = {

  // ── Règles standard (référence) ─────────
  _default: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Épée', 'Armure de cuir', 'Lanterne'],
    noPotion: false,
    specialRules: null,
  },

  // ── #16 La Galaxie Maudite (Starship Traveller) ─
  16: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Phaseur', 'Uniforme de commandant', 'Communicateur'],
    noPotion: true,
    crewStats: true,
    extraStats: [
      { key: 'weaponsStrength', label: 'Force des armes du vaisseau', formula: '1d6 + 6', dice: 1, bonus: 6 },
      { key: 'shields',         label: 'Boucliers du vaisseau',       formula: '1d6 + 6', dice: 1, bonus: 6 },
    ],
    specialRules: "Vous êtes commandant d'un vaisseau spatial. Vous gérez aussi les stats de votre équipage (Officier Science, Médecin, Ingénieur, Chef Sécurité, 2 Gardes) et les stats du vaisseau (Force d'Armes, Boucliers). Pas de règle de Tenter la Chance dans ce livre.",
  },

  // ── #17 L'Ennemi du Temps ───────────────
  17: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Pistolet laser', 'Combinaison de voyage temporel', 'Chrono-détecteur'],
    noPotion: false,
    specialRules: 'Voyage dans le temps. Vous pouvez traverser différentes époques historiques.',
  },

  // ── #22 Le Robot de Glace ───────────────
  22: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Pistolet laser', 'Combinaison arctique', 'Kit de survie'],
    noPotion: false,
    specialRules: 'Aventure de science-fiction sur une planète glacée.',
  },

  // ── #23 L'Horreur sur Titan ─────────────
  23: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Pistolet laser', 'Combinaison spatiale', 'Oxygène (12 heures)'],
    noPotion: false,
    specialRules: "Vous êtes sur la lune Titan de Saturne. L'atmosphère hostile rend chaque moment précieux.",
  },

  // ── #30 La Rébellion des Robots ─────────
  30: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Pistolet laser', 'Combinaison blindée', 'Disrupteur EMP'],
    noPotion: false,
    specialRules: 'Les robots se sont rebellés. Vos armes à énergie sont vos seuls alliés.',
  },

  // ── #36 Le Chasseur de Primes (Freeway Fighter) ─
  36: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 24', staminaDice: 2, staminaBonus: 24,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Dodge Interceptor blindé', 'Fusil de chasse', 'Pistolet Magnum', 'Trousse de premiers secours (2 utilisations)', 'Spray à huile', 'Pointes de route'],
    extraStats: [
      { key: 'firepower', label: 'Puissance de Feu du véhicule', formula: '1d6 + 6', dice: 1, bonus: 6 },
      { key: 'armour',    label: 'Blindage du véhicule',         formula: '2d6 + 20', dice: 2, bonus: 20 },
    ],
    noPotion: true,
    startingGold: 0,
    goldLabel: 'Crédits',
    specialRules: "L'Endurance se calcule avec 2d6+24 (pas +12). Votre véhicule a ses propres stats : Puissance de Feu (1d6+6) et Blindage (2d6+20). Vous avez aussi 4 roquettes. Gérez votre réservoir d'essence — tomber en panne = fin de partie !",
  },

  // ── #37 Le Guerrier d'Acier ─────────────
  37: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Corps cybernétique', 'Canon laser intégré', 'Détecteur de mouvement'],
    noPotion: false,
    specialRules: 'Vous êtes un robot guerrier. Votre armure est intégrée à votre corps.',
  },

  // ── #38 La Demeure des Morts (House of Hell) ─
  38: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    extraStats: [
      { key: 'fearMax', label: 'Score de PEUR maximum', formula: '1d6 + 6', dice: 1, bonus: 6 },
    ],
    noEquipment: true,
    noPotion: true,
    skillPenalty: -3,
    specialRules: "Vous êtes un civil désarmé, piégé dans une maison hantée. Pas d'équipement, pas de potion. Votre Habileté est réduite de 3 jusqu'à trouver une arme. Lancez 1d6+6 pour votre score de PEUR maximum — si vous atteignez ce score, vous mourez de terreur !",
  },

  // ── #14 L'Épée du Samouraï (Sword of the Samurai) ─
  14: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    extraStats: [
      { key: 'honour', label: 'Honneur', formula: 'fixe', fixed: 3 },
    ],
    equipment: ['Katana', 'Wakizashi', 'Armure de samouraï (do-maru)', 'Rations de riz (10)'],
    noPotion: true,
    specialRules: "Vous êtes un samouraï avec un score d'HONNEUR (commence à 3). Il augmente en aidant les autres, et diminue en agissant de manière déshonorante. Si l'Honneur tombe à 0, votre personnage se fait seppuku (suicide rituel). Vous choisissez aussi des compétences spéciales de combat.",
  },

  // ── #13 La Malédiction de la Momie ──────
  13: {
    skillFormula: '1d6 + 6', skillDice: 1, skillBonus: 6,
    staminaFormula: '2d6 + 12', staminaDice: 2, staminaBonus: 12,
    luckFormula: '1d6 + 6', luckDice: 1, luckBonus: 6,
    equipment: ['Khépesh (épée courbe)', 'Bouclier en bois', 'Amulette sacrée', 'Provisions (10)'],
    noPotion: false,
    specialRules: "Aventure en Égypte ancienne. Méfiez-vous des malédictions des pharaons.",
  },
};

// Récupérer les règles d'un livre (avec fallback sur défaut)
function getBookRules(bookNum) {
  return Object.assign({}, BOOK_RULES._default, BOOK_RULES[bookNum] || {});
}

// ── Noms par style ───────────────────────
const NAMES_BY_STYLE = {
  fantasy: {
    prefix: ['Ald','Bra','Cal','Dor','Eld','Fal','Gar','Hal','Ith','Jor',
              'Kel','Lor','Mal','Nor','Orn','Pel','Ran','Sor','Tal','Vor',
              'Wyn','Zar','Aer','Bel','Cyn','Dar','Even','Fir','Gwen','Hael'],
    mid:    ['an','ar','en','or','al','in','on','el','ath','iel',
              'wyn','mir','dan','gar','dor','ven','bar','tor','sel','mar'],
    suffix: ['dor','mir','wyn','las','rand','iel','ion','ath','ryn','gar',
              'thor','ven','dal','sur','rath','bor','sel','nar','diel','orn'],
    titles: ['le Brave','le Téméraire','la Courageuse',"l'Intrépide",
              'la Valkyrie','le Chasseur',"l'Éclaireur",'la Guerrière',
              'le Sage',"l'Ombre",'le Forgeron','la Chasseresse',
              'le Pèlerin',"l'Érudit",'la Sentinelle'],
    female: ['Aelindra','Sylvara','Myrène','Elowen','Ithilwen','Caladria',
              'Nyriel','Selvaine','Thariel','Rysara','Briavel','Cenara',
              'Fenwyn','Lyreith','Morwenna'],
    male:   ['Aldric','Braxton','Caldor','Dorian','Elvaren','Falkor',
              'Garreth','Halsten','Irvaan','Jorund','Keldar','Lorian',
              'Malvern','Nordan','Orskel','Pelador','Randor','Sorvan',
              'Taldris','Vorath'],
  },
  modern: {
    female: ['Alex','Jordan','Morgan','Casey','Riley','Quinn','Taylor',
              'Avery','Blake','Drew','Jamie','Reese','Sam','Charlie'],
    male:   ['Marcus','Jake','Ryan','Cole','Dex','Zane','Victor','Ethan',
              'Lucas','Nathan','Owen','Tyler','Kyle','Adrian','Dean'],
    titles: ['dit La Machine','dit Le Survivant','la Téméraire',
              'le Chasseur','dit Le Fantôme','la Solitaire',"dit L'Acier"],
  },
  japanese: {
    male:   ['Hiro','Kenji','Takeshi','Ryū','Daisuke','Makoto','Shiro',
              'Akira','Kazuo','Noboru','Ichiro','Tadashi','Yoshi','Taro'],
    female: ['Yuki','Hana','Sakura','Ayame','Midori','Kasumi','Nami',
              'Suki','Rei','Akemi','Fumiko','Haruki','Izumi','Kiku'],
    titles: ['de la Montagne des Vents','du Clan du Dragon',
              'aux Deux Lames','le Sans-Maître','la Lame du Couchant',
              'du Temple Interdit','aux Yeux de Faucon'],
  },
  ancient: {
    male:   ['Amenhotep','Ramses','Thutmose','Kha','Seti','Ay','Horemheb',
              'Nakhti','Meriptah','Userhat','Amenmes','Sennefer'],
    female: ['Nefertari','Isis','Hathor','Merytaten','Ankhesenamun',
              'Sitamun','Nefertiti','Tiy','Henuttawy','Mutnofret'],
    titles: ['Fils du Nil','Servante des Dieux','Bras d\'Amon',
              "Œil de Rê",'Lame du Pharaon','Gardien des Tombes'],
  },
};

// Alias pour compatibilité
const NAME_PARTS = NAMES_BY_STYLE.fantasy;

// ── Icônes d'objets ──────────────────────
function itemIcon(name) {
  const n = name.toLowerCase();
  if (/épée|sabre|lame|dague|couteau|hache|massue|katana|wakizashi|khépesh/.test(n)) return '⚔️';
  if (/pistolet|fusil|laser|blaster|arme à feu/.test(n))   return '🔫';
  if (/bouclier|armure|casque|cuirasse|do-maru/.test(n))   return '🛡';
  if (/combinaison|costume|tenue/.test(n))                  return '🦺';
  if (/potion|fiole|élixir|remède|adresse|vigueur|fortune|trousse/.test(n)) return '🧪';
  if (/livre|parchemin|carte|lettre|note|sort|carnet|manuel/.test(n)) return '📜';
  if (/clé|clef/.test(n))                                  return '🗝';
  if (/lampe|torche|lanterne/.test(n))                     return '🕯';
  if (/corde/.test(n))                                     return '🪢';
  if (/grappin|crochet/.test(n))                           return '🪝';
  if (/outil|kit/.test(n))                                 return '🔧';
  if (/flèche|arc/.test(n))                                return '🏹';
  if (/bâton|staff|sceptre/.test(n))                       return '🪄';
  if (/amulette|anneau|bague|talisman|crucifix/.test(n))   return '💍';
  if (/voiture|véhicule|moto|camion/.test(n))              return '🚗';
  if (/vaisseau|navette|spatiale/.test(n))                 return '🚀';
  if (/essence|carburant|jerricane/.test(n))               return '⛽';
  if (/rations|provisions|nourriture|riz/.test(n))         return '🍖';
  if (/communicateur|radio|téléphone/.test(n))             return '📡';
  if (/or|pièce|monnaie|crédit/.test(n))                   return '🪙';
  if (/insigne|badge|emblème/.test(n))                     return '🏅';
  return '🎒';
}

// ── Utilitaire HTML escape ───────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
