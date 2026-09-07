export const AGENT_OPTIONS = {
  prospects: { label: 'Qualifier mes prospects', agent: 'Agent de qualification commerciale', job: 'Recueillir les critères utiles, qualifier les demandes et préparer leur transmission à la bonne personne.', inputs: 'Critères de qualification, questions autorisées et étapes commerciales.', metric: 'Demandes correctement qualifiées et délai de prise en charge.' },
  appointments: { label: 'Prendre et confirmer des rendez-vous', agent: 'Agent de prise de rendez-vous', job: 'Proposer les créneaux disponibles, recueillir le motif et préparer les confirmations.', inputs: 'Calendriers, disponibilités, règles de réservation et conditions de modification.', metric: 'Rendez-vous confirmés, erreurs de réservation et absences.' },
  support: { label: 'Répondre aux questions clients', agent: 'Agent de support client', job: 'Préparer les réponses à partir de vos informations validées et orienter les demandes complexes.', inputs: 'FAQ approuvée, procédures et règles de transfert vers votre équipe.', metric: 'Réponses correctes, demandes résolues et transferts pertinents.' },
  followup: { label: 'Relancer les devis et les clients', agent: 'Agent de suivi commercial', job: 'Préparer des relances adaptées au statut du dossier, sans inventer de remise ni de promesse.', inputs: 'Devis validés, historique autorisé, délais et règles de relance.', metric: 'Dossiers suivis, réponses obtenues et prochaines étapes confirmées.' },
  documents: { label: 'Traiter les emails et les documents', agent: 'Agent de traitement administratif', job: 'Classer les demandes, extraire les informations utiles et préparer les documents à vérifier.', inputs: 'Modèles de documents, catégories, champs attendus et règles de validation.', metric: 'Temps complet par dossier, champs corrects et corrections nécessaires.' },
  knowledge: { label: 'Aider mon équipe à trouver une information', agent: 'Assistant de connaissances internes', job: 'Retrouver une réponse dans les documents autorisés et indiquer sa source.', inputs: 'Documentation à jour, droits d’accès et responsables des informations.', metric: 'Réponses sourcées, informations correctes et temps de recherche.' },
  reporting: { label: 'Préparer mes tableaux de bord', agent: 'Agent de reporting opérationnel', job: 'Rassembler les indicateurs définis et préparer un commentaire à partir des données disponibles.', inputs: 'Sources de données, définitions des indicateurs et calendrier de suivi.', metric: 'Fiabilité des chiffres, anomalies repérées et temps de préparation.' },
} as const;
export type AgentGoal = keyof typeof AGENT_OPTIONS;
export const CHANNELS = { email: 'Email', website: 'Site web', phone: 'Téléphone', whatsapp: 'WhatsApp', internal: 'Outils internes' } as const;
export type Diagnosis = { company: string; niche: string; website: string; goal: AgentGoal; channels: (keyof typeof CHANNELS)[]; volume: 'low' | 'medium' | 'high'; sensitive: 'yes' | 'no' | 'unknown'; needs: string; systems: string };
export type Callback = { name: string; email: string; phone: string; preferredTime: string; consent: boolean; botcheck: boolean };
const controls = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/;
function text(value: unknown, label: string, max: number, required = true): string {
  if (typeof value !== 'string' || value.length > max || controls.test(value) || (required && !value.trim())) throw new Error(`${label} : renseignez un texte valide, limité à ${max} caractères.`);
  return value.trim();
}
export function normalizeWebsite(value: unknown): string {
  const raw = text(value, 'Site web', 250, false); if (!raw) return '';
  let url: URL; try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`); } catch { throw new Error('Site web : indiquez une adresse valide.'); }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.') || /\s/.test(raw) || raw.includes('@')) throw new Error('Site web : indiquez une adresse http ou https sans identifiants.');
  return url.href;
}
export function validateDiagnosis(raw: Diagnosis): Diagnosis {
  if (!raw || typeof raw !== 'object') throw new Error('Complétez le diagnostic.');
  if (!Object.hasOwn(AGENT_OPTIONS, raw.goal)) throw new Error('Choisissez votre besoin prioritaire.');
  if (!Array.isArray(raw.channels) || raw.channels.length < 1 || raw.channels.length > 5 || new Set(raw.channels).size !== raw.channels.length || raw.channels.some(c => !Object.hasOwn(CHANNELS, c))) throw new Error('Sélectionnez au moins un canal valide.');
  if (!['low', 'medium', 'high'].includes(raw.volume) || !['yes', 'no', 'unknown'].includes(raw.sensitive)) throw new Error('Précisez le volume et la sensibilité des données.');
  return { company: text(raw.company, 'Entreprise', 120), niche: text(raw.niche, 'Activité / niche', 180), website: normalizeWebsite(raw.website), goal: raw.goal, channels: [...raw.channels], volume: raw.volume, sensitive: raw.sensitive, needs: text(raw.needs, 'Besoin détaillé', 2500), systems: text(raw.systems, 'Outils utilisés', 500, false) };
}
export function recommendAgent(raw: Diagnosis) {
  const input = validateDiagnosis(raw), agent = AGENT_OPTIONS[input.goal];
  return { ...agent, reason: `Votre priorité déclarée est « ${agent.label.toLowerCase()} ». Cette proposition correspond à cette tâche, puis devra être adaptée à votre activité : ${input.niche}.`, channels: input.channels.map(c => CHANNELS[c]), nextStep: input.volume === 'low' ? 'Commencer par un essai limité pour vérifier si un agent est plus utile qu’un modèle ou une automatisation simple.' : 'Choisir un flux représentatif, définir une validation humaine et mesurer un essai avant d’élargir le périmètre.', control: input.sensitive === 'no' ? 'Définir les actions autorisées et les situations transmises à votre équipe.' : 'Faire examiner les données, les droits d’accès et les règles de validation avant toute connexion aux outils.', limitation: 'Orientation fondée sur vos réponses, sans analyse automatique du site web, audit technique ni garantie de résultat. La faisabilité et les connexions seront confirmées lors du rappel.' };
}
export function validateCallback(raw: Callback): Callback {
  if (!raw || raw.botcheck !== false) throw new Error('La demande ne peut pas être envoyée.');
  const name = text(raw.name, 'Nom du contact', 120), email = text(raw.email, 'Email', 254), phone = text(raw.phone, 'Téléphone', 40);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error('Indiquez une adresse email valide.');
  if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 9 || phone.replace(/\D/g, '').length > 15) throw new Error('Indiquez un numéro de téléphone valide, avec indicatif si nécessaire.');
  if (raw.consent !== true) throw new Error('Confirmez votre demande de rappel pour transmettre les coordonnées.');
  return { name, email, phone, preferredTime: text(raw.preferredTime, 'Disponibilité', 150, false), consent: true, botcheck: false };
}
export function callbackPayload(diagnosis: Diagnosis, callback: Callback, sourcePath: string) {
  const d = validateDiagnosis(diagnosis), c = validateCallback(callback), r = recommendAgent(d);
  const source = /^\/(?:fr|de|en|it)(?:\/|$)/.test(sourcePath) ? sourcePath.split(/[?#]/)[0].slice(0, 300) : '/fr/ressources';
  return { subject: 'IAPME Suisse — Demande de rappel pour un agent IA sur mesure', from_site: 'iapmesuisse.ch', name: c.name, email: c.email, company: d.company, phone: c.phone, website: d.website, botcheck: false,
    message: ['DEMANDE DE RAPPEL — AGENT IA SUR MESURE', `Entreprise : ${d.company}`, `Activité / niche : ${d.niche}`, `Besoin prioritaire : ${r.label}`, `Besoin détaillé : ${d.needs}`, `Canaux : ${r.channels.join(', ')}`, `Volume déclaré : ${{ low: 'Moins de 20 demandes par semaine', medium: '20 à 100 demandes par semaine', high: 'Plus de 100 demandes par semaine' }[d.volume]}`, `Données sensibles : ${{ yes: 'Oui', no: 'Non', unknown: 'À déterminer' }[d.sensitive]}`, `Outils actuels : ${d.systems || 'À préciser'}`, '', `Orientation indicative : ${r.agent}`, `Rôle proposé : ${r.job}`, `Informations nécessaires : ${r.inputs}`, `Validation : ${r.control}`, `Essai : ${r.nextStep}`, `Mesure : ${r.metric}`, r.limitation, '', `Disponibilités : ${c.preferredTime || 'À convenir'}`, `Page d’origine : https://iapmesuisse.ch${source}`, 'Le contact a explicitement demandé à être rappelé au sujet de ce projet. Aucun abonnement marketing demandé.'].join('\n') };
}
