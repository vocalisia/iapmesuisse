import { OPENAI_MODEL, SYSTEM_PROMPTS } from './config';
import type { RSSItem } from './rss-fetcher';
import { aiClient } from './ai-client';

export interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

function fallbackArticle(item: RSSItem): GeneratedArticle {
  const title = `Ce que les PME suisses doivent retenir : ${item.title}`.slice(0, 95);
  const description = item.description || `Analyse pratique pour les PME suisses à partir de l'actualité ${item.source}.`;
  const content = [
    `## Pourquoi ce sujet concerne les PME suisses`,
    ``,
    `L'actualité publiée par ${item.source} met en lumière un sujet que les PME suisses ne peuvent plus traiter comme une simple veille technologique : ${item.title}. Pour une entreprise romande, alémanique ou tessinoise, l'enjeu n'est pas de suivre chaque nouveauté, mais de comprendre ce qui peut améliorer l'efficacité, la conformité et la compétitivité.`,
    ``,
    description,
    ``,
    `## Les impacts opérationnels`,
    ``,
    `Le premier impact concerne la priorisation. Une PME dispose rarement d'une équipe dédiée à l'innovation, à la cybersécurité ou à l'automatisation. Elle doit donc transformer l'information en décisions concrètes : faut-il tester un outil, adapter une procédure, former une équipe ou surveiller un risque ?`,
    ``,
    `Le deuxième impact concerne la gouvernance. En Suisse, les projets numériques doivent rester cohérents avec la nLPD, les exigences de confidentialité, les attentes clients et les contraintes internes. Une technologie utile est une technologie comprise, documentée et maîtrisée.`,
    ``,
    `## Méthode recommandée`,
    ``,
    `1. Identifier le processus métier concerné : vente, support, finance, RH, production ou direction.`,
    `2. Évaluer le gain potentiel : temps économisé, erreurs évitées, meilleure qualité de service ou réduction du risque.`,
    `3. Vérifier les données utilisées : origine, sensibilité, stockage, accès et durée de conservation.`,
    `4. Lancer un test limité avant tout déploiement large.`,
    `5. Mesurer les résultats avec des indicateurs simples et partagés.`,
    ``,
    `## Points de vigilance`,
    ``,
    `Une PME doit éviter deux erreurs fréquentes. La première consiste à adopter un outil parce qu'il est visible dans l'actualité, sans lien direct avec un besoin métier. La seconde consiste à attendre trop longtemps, au risque de laisser les concurrents structurer plus vite leurs processus numériques.`,
    ``,
    `Le bon équilibre consiste à avancer par cas d'usage, avec un périmètre clair, une responsabilité interne et une mesure du résultat.`,
    ``,
    `## Conclusion`,
    ``,
    `Pour IAPME Suisse, l'objectif est d'aider les PME à transformer l'actualité IA et digitale en décisions utiles. Une veille n'a de valeur que si elle débouche sur une action raisonnable, mesurable et adaptée au contexte suisse.`,
  ].join('\n');

  return {
    title,
    excerpt: description.slice(0, 155),
    content,
    slug: item.title,
  };
}

export async function generateArticle(item: RSSItem): Promise<GeneratedArticle> {
  const userPrompt = `Sujet source :
Titre : "${item.title}"
Source : ${item.source}
Description : ${item.description}
Lien : ${item.link}
Date : ${item.pubDate}

Rédige un article ORIGINAL pour les PME suisses basé sur ce sujet.`;

  let response;
  try {
    response = await aiClient.chat.completions.create({
      model: OPENAI_MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.generator },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });
  } catch (err) {
    console.warn(`[Generator] AI unavailable, using deterministic fallback: ${(err as Error).message}`);
    return fallbackArticle(item);
  }

  const result = JSON.parse(response.choices[0].message.content || '{}');

  // Validate
  if (!result.title || !result.content) {
    throw new Error('Generated article missing title or content');
  }

  const wordCount = result.content.split(/\s+/).length;
  if (wordCount < 300) {
    throw new Error(`Article too short: ${wordCount} words (minimum 300)`);
  }

  console.log(`[Generator] Created article: "${result.title}" (${wordCount} words)`);

  return {
    title: result.title,
    excerpt: result.excerpt || result.title,
    content: result.content,
    slug: result.slug || 'article',
  };
}
