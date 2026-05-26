# iapmesuisse.ch — TODO

> Audit 2026-05-26 | Stack: Next.js, 439 articles multilang, 22 cantons, villes | 5 fixes déployés 2026-05-12

## Critical
- [ ] **Sitemap vérifier couverture** — `app/sitemap.ts` importe getBlogPosts + CANTONS + VILLES. Vérifier que 439 articles + 22 cantons + villes apparaissent effectivement dans output sitemap
- [ ] **5 images pour 439 articles** — OG image fallback = generic `blog-default.jpg`. Générer covers via Flux local pipeline
- [ ] **`sitemap.ts.bak` dans app/** — Next.js peut le servir comme route. Supprimer

## High
- [ ] **Contenu EN/IT/DE non vérifié** — 104+ articles par locale probablement machine-translated. Spot-audit 5 par locale pour faits hallucidés
- [ ] **Hreflang par article** — confirmer que `[locale]/blog/[slug]` émet hreflang vers les 4 locales
- [ ] **Quiz/jeux canonical** — sitemap liste 4 quizzes. Vérifier pas de self-canonical loop avec /quiz redirect

## Medium
- [ ] **proxy.ts à la racine** — vérifier intent (Cloudflare? Vercel rewrite?). Pourrait casser routing
- [ ] **Encodage `Démarrons` fichier** — caractère cassé à la racine. Supprimer
- [ ] **Structure géo manquante** — ajouter liens /cantons/[canton]/villes/[ville] pour SEO local pyramide

## Low
- [ ] **3 fichiers .txt dans public/** — vérifications Bing/Google. Confirmer besoin ou supprimer
- [ ] **Icônes boilerplate** — favicon.svg + globe.svg + window.svg Next.js template. Nettoyer
