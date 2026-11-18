# Site Slice Pizza Kénitra

Site officiel + appli installable (PWA) : https://slicepizzamaroc.pages.dev

- `source/slice-pizza-kenitra.html` : le site complet (photos intégrées, menu dans `CONFIG`).
- `public/` : la version mise en ligne, construite par `python3 build.py` (photos en fichiers séparés).
- `firebase/regles-firestore.txt` : règles de sécurité Firestore (à coller dans Firebase → Firestore → Règles).
- `docs/` : guides (récap email EmailJS).

Mise en ligne : Cloudflare Pages relié à ce dépôt, dossier publié `public`, sans commande de build.
Chaque envoi sur `main` met le site à jour automatiquement.
