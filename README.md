# Défi Fantastique — Fiche de Personnage

Application mobile web pour gérer votre fiche de personnage lors de la lecture des livres de la série **Défi Fantastique** (Fighting Fantasy).

## Structure du projet

```
defi-fantastique/
├── index.html          # HTML pur, aucune logique
├── css/
│   └── style.css       # Tous les styles
└── js/
    ├── data.js         # Données statiques (livres, noms, potions, icônes)
    ├── state.js        # État du jeu & système de sauvegarde
    ├── ui.js           # Rendu de l'interface (render, navigation, toast)
    ├── game.js         # Actions de jeu (stats, dés, combat, inventaire)
    ├── wizard.js       # Wizard de création de personnage
    └── main.js         # Point d'entrée (initialisation)
```

## Fonctionnalités

### 🛡 Stats
- Gestion Habileté / Endurance / Chance avec valeurs max
- Barre d'Endurance colorée (vert → jaune → rouge)
- Potion magique avec 2 mesures (Adresse / Vigueur / Bonne Fortune)

### 🎲 Dés
- Lancer 1d6 ou 2d6 avec animation
- Tenter la Chance (règles officielles)
- Historique des 10 derniers lancers

### ⚔️ Combat
- Calcul automatique de la Force d'Attaque (2d6 + Habileté)
- Modificateurs globaux (ivresse, poison, bénédiction…)
- Log de combat détaillé
- Chance en combat

### 🎒 Sac
- Gestion des pièces d'or
- Inventaire avec icônes automatiques
- Compteur de provisions (manger = +4 Endurance)

### 📜 Notes
- Journal d'aventure libre
- Liste des paragraphes visités

### 💾 Saves
- Sauvegarde automatique continue (clé stable `df-current`)
- 3 emplacements rapides nommés
- Export / Import en fichier `.json`
- Migration automatique des anciennes sauvegardes

### ✨ Wizard de création
- 7 étapes guidées selon les règles officielles
- Jets de dés avec possibilité de relancer une fois
- Générateur de noms fantasy
- Sélecteur des 59 livres de la série
- Choix de la potion (Adresse / Vigueur / Bonne Fortune)
- Or de départ saisi manuellement

## Hébergement sur GitHub Pages

1. Créer un dépôt GitHub (ex: `defi-fantastique`)
2. Uploader tous les fichiers **en conservant la structure des dossiers**
3. Settings → Pages → Source : branche `main`, dossier `/root`
4. Votre app sera accessible sur `https://votre-pseudo.github.io/defi-fantastique/`

## Règles implémentées

Conformes aux règles officielles de la série Défi Fantastique :
- **Habileté** : 1d6 + 6
- **Endurance** : 2d6 + 12
- **Chance** : 1d6 + 6
- **Potion** : une seule bouteille de 2 mesures au choix
- **Combat** : Force d'Attaque = 2d6 + Habileté, dégâts = 2 pts
- **Chance en combat** : succès → +2 dégâts, échec → −1 Endurance
- **Provisions** : +4 Endurance par repas (hors combat)
