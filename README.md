# INFO.CF — Média en ligne
> L'Afrique centrale au cœur du monde.

---

## 📁 Structure du projet

```
infocf/
├── pages/
│   ├── index.html          ← Homepage
│   ├── article.html        ← Page article
│   └── rubrique.html       ← Pages Afrique & Monde
├── css/
│   ├── base.css            ← Variables, reset, utilitaires
│   ├── nav-footer.css      ← Navigation & Footer (desktop + mobile)
│   ├── homepage.css        ← Styles homepage
│   └── article.css         ← Styles page article
├── js/
│   └── main.js             ← JavaScript global
└── README.md
```

---

## 🎨 Identité visuelle

| Élément       | Valeur               |
|---------------|----------------------|
| Vert panafricain | `#1a7a3c`         |
| Rouge panafricain | `#c8102e`        |
| Or             | `#d4a017`           |
| Fond           | `#fdf8f0` (crème)   |
| Police titres  | Bebas Neue          |
| Police édito   | Libre Baskerville   |
| Police UI      | Barlow              |

---

## 🚀 Déploiement

### Option 1 — GitHub Pages (gratuit)
```bash
# 1. Créer un repo GitHub "infocf"
# 2. Pousser les fichiers
git init
git add .
git commit -m "INFO.CF — première version"
git remote add origin https://github.com/TON_USERNAME/infocf.git
git push -u origin main

# 3. Activer GitHub Pages dans Settings > Pages
# → URL : https://ton_username.github.io/infocf/pages/
```

### Option 2 — Netlify (gratuit, drag & drop)
```
1. Aller sur https://netlify.com
2. Glisser le dossier /infocf dans l'interface
3. URL générée automatiquement en 30 secondes
4. Domaine personnalisé possible : infocf.com
```

### Option 3 — Vercel (gratuit)
```bash
npm i -g vercel
cd infocf
vercel
# Suivre les instructions → URL en ligne instantanément
```

### Option 4 — Hébergement classique (OVH, Hostinger...)
```
1. Compresser le dossier en .zip
2. Uploader via FTP ou cPanel File Manager
3. Pointer le domaine sur le dossier
```

---

## 📄 Pages incluses

| Page | Fichier | Fonctionnalités |
|------|---------|-----------------|
| Homepage | `index.html` | Hero grid, ticker, articles, opinions, sidebar |
| Article | `article.html` | Prose complète, réactions, auteur, articles liés |
| Rubrique Afrique | `rubrique.html` | Filtres région, grille/liste, pagination |
| Rubrique Monde | `rubrique.html` | Filtres zone, grille/liste, pagination |

---

## 📱 Responsive

- ✅ Desktop (1200px+)
- ✅ Tablette (768–1024px)
- ✅ Mobile (< 768px) — menu hamburger + bottom nav

---

## ➕ Prochaines étapes recommandées

- [ ] Intégrer un CMS (WordPress headless, Strapi, Directus)
- [ ] Connecter une API d'actualités (NewsAPI, AFP)
- [ ] Ajouter un moteur de recherche (Algolia, Meilisearch)
- [ ] Mettre en place Google Analytics / Plausible
- [ ] Créer la page À propos & Contact
- [ ] Optimiser les images (WebP, lazy loading)
- [ ] Ajouter les meta OpenGraph pour partage réseaux sociaux
- [ ] Enregistrer le domaine infocf.com / infocf.net

---

## 📞 Contact

Projet créé avec Claude (Anthropic) — Mars 2026  
Pour toute question : contact@infocf.com
