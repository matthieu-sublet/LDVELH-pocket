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
const BASE_PDF = ''; // URLs complètes dans BOOKS.pdf

const BOOKS = [
  { n:  1, t: 'Le Sorcier de la Montagne de Feu', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/01 - Le Sorcier de la Montagne de Feu.pdf' },
  { n:  2, t: 'La Citadelle du Chaos', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/02 - La Citadelle du Chaos.pdf' },
  { n:  3, t: 'La Forêt de la Malédiction', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/03 - La Forêt de la Malédiction.pdf' },
  { n:  4, t: 'La Galaxie Tragique', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/04 - La Galaxie Tragique.pdf' },
  { n:  5, t: 'La Cité des Voleurs', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/05 - La Cité des Voleurs.pdf' },
  { n:  6, t: 'Le Labyrinthe de la Mort', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/06 - Le Labyrinthe de la Mort.pdf' },
  { n:  7, t: 'L\'Île du Roi Lézard', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/07 - L_ile du Roi Lézard.pdf' },
  { n:  8, t: 'Le Marais aux Scorpions', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/08 - Le Marais aux Scorpions.pdf' },
  { n:  9, t: 'La Sorcière des Neiges', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/09 - La Sorcière des Neiges.pdf' },
  { n: 10, t: 'Le Manoir de l\'Enfer', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/10 - Le Manoir de l_Enfer.pdf' },
  { n: 11, t: 'Le Talisman de la Mort', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/11 - Le Talisman de la Mort.pdf' },
  { n: 12, t: 'Le Mercenaire de l\'Espace', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/12 - Le Mercenaire de l_Espace.pdf' },
  { n: 13, t: 'Le Combattant de l\'Autoroute', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/13 - Le Combattant de l_Autoroute.pdf' },
  { n: 14, t: 'Le Temple de la Terreur', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/14 - Le Temple de la Terreur.pdf' },
  { n: 15, t: 'Les Trafiquants de Kelter', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/15 - Les Trafiquants de Kelter.pdf' },
  { n: 16, t: 'Défis Sanglants sur l\'Océan', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/16 - Défis sanglants sur l_Océan.pdf' },
  { n: 17, t: 'Rendez-vous avec la Mort', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/17 - Rendez-vous avec la MORT.pdf' },
  { n: 18, t: 'La Planète Rebelle', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/18 - La Planète Rebelle.pdf' },
  { n: 19, t: 'Les Démons des Profondeurs', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/19 - Les Démons des Profondeurs.pdf' },
  { n: 20, t: 'L\'Épée du Samouraï', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/20 - L_Epée du Samouraï.pdf' },
  { n: 21, t: 'L\'Épreuve des Champions', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/21 - L_Epreuve des Champions.pdf' },
  { n: 22, t: 'La Grande Menace des Robots', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/22 - La Grande Menace des Robots.pdf' },
  { n: 23, t: 'Les Sceaux de la Destruction', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/23 - Les Sceaux de la Destruction.pdf' },
  { n: 24, t: 'La Créature venue du Chaos', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/24 - La Créature venue du Chaos.pdf' },
  { n: 25, t: 'La Forteresse du Cauchemar', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/25 - La Forteresse du Cauchemar.pdf' },
  { n: 26, t: 'La Crypte du Sorcier', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/26 - La Crypte du Sorcier.pdf' },
  { n: 27, t: 'Le Chasseur des Étoiles', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/27 - Le Chasseur des Etoiles.pdf' },
  { n: 28, t: 'Les Spectres de l\'Angoisse', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/28 - Les Spectres de l_Angoisse.pdf' },
  { n: 29, t: 'Les Rôdeurs de la Nuit', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/29 - Les Rôdeurs de la nuit.pdf' },
  { n: 30, t: 'Le Gouffre de la Cruauté', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/30 - Le Gouffre de la Cruauté.pdf' },
  { n: 31, t: 'L\'Empire des Hommes-Lézards', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/31 - L_Empire des Hommes-Lézards.pdf' },
  { n: 32, t: 'Les Esclaves de l\'Éternité', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/32 - Les Esclaves de l_Eternité.pdf' },
  { n: 33, t: 'Le Justicier de l\'Univers', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/33 - Le Justicier de l_Univers.pdf' },
  { n: 34, t: 'Le Voleur d\'Âmes', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/34 - Le Voleur d_Ames.pdf' },
  { n: 35, t: 'Le Vampire du Château Noir', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/35 - Le Vampire du Château Noir.pdf' },
  { n: 36, t: 'La Nuit des Mutants', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/36 - La Nuit des Mutants.pdf' },
  { n: 37, t: 'Les Sombres Cohortes', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/37 - Les Sombres Cohortes.pdf' },
  { n: 38, t: 'L\'Élu des Six Clans', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/38 - L_Elu des Six Clans.pdf' },
  { n: 39, t: 'Le Volcan de Zamarra', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/39 - Le Volcan de Zamarra.pdf' },
  { n: 40, t: 'Le Sceptre Noir', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/40 - Le Sceptre Noir.pdf' },
  { n: 41, t: 'L\'Arpenteur de la Lune', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/46 - L_Arpenteur de la Lune.pdf' },
  { n: 42, t: 'Les Mercenaires du Levant', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/47 - Les Mercenaires du Levant.pdf' },
  { n: 43, t: 'Les Mondes de l\'Aleph', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/48 - Les Mondes de l_Aleph.pdf' },
  { n: 44, t: 'Le Siège de Sardath', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/49 - Le Siège de Sardath.pdf' },
  { n: 45, t: 'Retour à la Montagne de Feu', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/50 - Retour à la Montagne de Feu.pdf' },
  { n: 46, t: 'Les Mages de Solani', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/51 - Les Mages de Solani.pdf' },
  { n: 47, t: 'La Légende de Zagor', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/52 - La Légende de Zagor.pdf' },
  { n: 48, t: 'Le Sépulcre des Ombres', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/53 - Le Sépulcre des Ombres.pdf' },
  { n: 49, t: 'Le Voleur de Vie', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/54 - Le Voleur de Vie.pdf' },
  { n: 50, t: 'Les Chevaliers du Destin', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/55 - Les Chevaliers du Destin.pdf' },
  { n: 51, t: 'Le Chasseur de Mages', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/56 - Le Chasseur de Mages.pdf' },
  { n: 52, t: 'La Revanche du Vampire', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/57 - La Revanche du Vampire.pdf' },
  { n: 53, t: 'Le Dragon de la Nuit', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/58 - Le Dragon de la Nuit.pdf' },
  { n: 54, t: 'La Malédiction de la Momie', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/59 - La Malédiction de la Momie.pdf' },
  { n: 55, t: 'L\'Œil d\'Émeraude', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/60 - L\'Œil d\'Émeraude.pdf' },
  { n: 56, t: 'Les Pirates du Crâne Noir', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/61 - Les Pirates du Crâne Noir.pdf' },
  { n: 57, t: 'Les Hurlements du Loup-Garou', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/62 - Les Hurlements du Loup-Garou.pdf' },
  { n: 58, t: 'Le Chasseur de Tempêtes', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/63 - Le Chasseur de Tempêtes.pdf' },
  { n: 59, t: 'La Nuit du Nécromancien', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/64 - La Nuit du Nécromancien.pdf' },
  { n: 60, t: 'Massacre à la Tronçonneuse de Zombies', pdf: 'https://raw.githubusercontent.com/matthieu-sublet/LDVELH-pocket/main/books/65 - Massacre à la Tronçonneuse de Zombies.pdf' },
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
