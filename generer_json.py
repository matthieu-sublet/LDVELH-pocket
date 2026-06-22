import json
import os
import uuid

# Configuration
USER = "matthieu-sublet"
REPO = "LDVELH-pocket"
BRANCH = "main"
DOSSIER_LIVRES = "./books"
FICHIER_SORTIE = "books-list.json"

def generer_inventaire():
    inventaire = {}
    
    # Vérifier si le dossier existe
    if not os.path.exists(DOSSIER_LIVRES):
        print(f"Erreur : Le dossier {DOSSIER_LIVRES} n'existe pas.")
        return

    # Parcourir les fichiers du dossier et les trier pour l'ordre des volumes
    fichiers = sorted([f for f in os.listdir(DOSSIER_LIVRES) if f.endswith(".pdf")])
    
    for index, fichier in enumerate(fichiers, start=1):
        # Génération d'un GUID unique (UUID v4) pour chaque livre
        identifiant_unique = str(uuid.uuid4())
        
        # Extraction du nom sans extension pour le titre
        nom_sans_extension = os.path.splitext(fichier)[0]
        
        # Construction de l'URL brute (Raw) GitHub
        url = f"https://raw.githubusercontent.com/{USER}/{REPO}/{BRANCH}/{DOSSIER_LIVRES.replace('./', '')}/{fichier}"
        
        # Formatage du numéro sur 2 chiffres (ex: 01, 02... 10)
        volume_formate = f"{index:02d}"
        
        # Structure demandée
        inventaire[identifiant_unique] = {
            "numéro du volume": volume_formate,
            "titre": nom_sans_extension.replace("_", " ").title(),
            "url": url
        }
    
    # Écriture du fichier JSON
    with open(FICHIER_SORTIE, 'w', encoding='utf-8') as f:
        json.dump(inventaire, f, indent=4, ensure_ascii=False)
    
    print(f"Fichier {FICHIER_SORTIE} généré avec succès avec les numéros de volume sur 2 chiffres !")

if __name__ == "__main__":
    generer_inventaire()
