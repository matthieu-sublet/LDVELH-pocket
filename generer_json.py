import json
import os

# Configuration
USER = "matthieu-sublet"
REPO = "LDVELH-pocket"
BRANCH = "main"
DOSSIER_LIVRES = "./books"
FICHIER_SORTIE = "books-list.json"

def generer_inventaire():
    inventaire = {}
    
    # Parcourir les fichiers du dossier
    for fichier in os.listdir(DOSSIER_LIVRES):
        if fichier.endswith(".pdf"):
            # Création d'une clé unique basée sur le nom du fichier (sans extension)
            cle = os.path.splitext(fichier)[0]
            
            # Construction de l'URL brute (Raw)
            url = f"https://raw.githubusercontent.com/{USER}/{REPO}/{BRANCH}/{DOSSIER_LIVRES.replace('./', '')}/{fichier}"
            
            inventaire[cle] = {
                "titre": cle.replace("_", " ").title(), # Formattage simple du titre
                "nom_fichier": fichier,
                "url": url
            }
    
    # Écriture du fichier JSON
    with open(FICHIER_SORTIE, 'w', encoding='utf-8') as f:
        json.dump(inventaire, f, indent=4, ensure_ascii=False)
    
    print(f"Fichier {FICHIER_SORTIE} généré avec succès !")

if __name__ == "__main__":
    generer_inventaire()
