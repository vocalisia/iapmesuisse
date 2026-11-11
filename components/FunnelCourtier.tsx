import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { agendaUrl } from '@/lib/rdv';
import { TEL_AFFICHE, TEL_LIEN, WHATSAPP_NUMERO } from '@/lib/conseillers';
import { COURTIERS, type Courtier } from '@/lib/courtiers';
import FAQ from '@/components/FAQ';
import AgendaEmbed from '@/components/AgendaEmbed';
import RappelForm from '@/components/RappelForm';
import IconeWhatsApp from '@/components/IconeWhatsApp';

// Mise en page des deux pages de reservation de la campagne courtiers en assurance
// (/rendez-vous/courtiers-3e-pilier, /rendez-vous/courtiers-lamal). Contenu : lib/courtiers.ts.
//
// Meme habillage que les pages des signataires IA — bandeau bleu nuit, calendrier qui
// chevauche le bandeau, volet de rappel — avec trois sections en plus. Un courtier ne bloque
// pas quinze minutes sur la seule photo du commercial : il veut savoir ce qu'on installe,
// comment l'appel se deroule, et si son canton est encore libre. D'ou le deroule minute par
// minute, les trois metiers qu'on lui retire, et la grille des six cantons romands.
//
// Composant separe de FunnelConseiller : les pages laura / michael sont volontairement
// courtes, on ne leur impose pas ces sections.

const ANCRE = 'creneaux';

const BOUTON =
  'inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold transition-all duration-200 sm:w-auto';

// Chiffres mesures, jamais arrondis a la hausse : Google Search Console, 90 jours au
// 12 septembre 2026. Ce sont des visites de recherche, pas des demandes de rendez-vous, et
// la page le dit — un courtier qui se sent enfume ne rappelle jamais.
const RESEAU = [
  { n: '36 800', l: 'affichages par mois dans Google, sur l’ensemble du réseau' },
  { n: '378', l: 'visites mensuelles sur job-emploi.ch, notre site le plus fort' },
  { n: '12,2', l: 'position moyenne de job-emploi.ch dans les résultats' },
];

const CANTONS = [
  { code: 'GE', nom: 'Genève' },
  { code: 'VD', nom: 'Vaud' },
  { code: 'VS', nom: 'Valais' },
  { code: 'FR', nom: 'Fribourg' },
  { code: 'NE', nom: 'Neuchâtel' },
  { code: 'JU', nom: 'Jura' },
];

function IconeCheck() {
  return (
    <svg className="h-4 w-4 shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FunnelCourtier({ c }: { c: Courtier }) {
  const whatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(c.whatsappTexte)}`;
  const autre = COURTIERS[c.renvoi.vers];

  return (
    <>
      {/* Presentation : bandeau de l'accueil du site. */}
      <section className="relative overflow-hidden bg-primary px-4 pb-32 pt-12 sm:px-6 sm:pb-40 sm:pt-16 lg:px-8">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-20" priority />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-300">
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
              {c.pastille}
            </p>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{c.h1}</h1>
            <p className="text-pretty mt-5 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg">{c.lead}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-gray-200">
              {c.chips.map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5">
                  <IconeCheck />
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`#${ANCRE}`}
                className={`${BOUTON} bg-accent text-white shadow-lg hover:bg-accent-dark hover:shadow-xl`}
              >
                Choisir mon créneau
              </a>
              <a href="#rappel" className={`${BOUTON} border-2 border-white text-white hover:bg-white hover:text-primary`}>
                Être rappelé par {c.prenom}
              </a>
            </div>
          </div>

          <figure className="mx-auto hidden w-full max-w-[340px] rounded-2xl bg-white p-3 shadow-2xl lg:block">
            <Image
              src={c.photo}
              alt={c.photoAlt}
              width={560}
              height={560}
              priority
              className="aspect-square w-full rounded-xl object-cover"
            />
            <figcaption className="px-2 pb-2 pt-4">
              <p className="text-lg font-bold text-primary">{c.nom}</p>
              <p className="text-sm text-gray-500">{c.role}</p>
              <blockquote className="mt-3 border-l-4 border-accent pl-3 text-sm leading-relaxed text-gray-700">
                «&#8239;{c.citation}&#8239;»
              </blockquote>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Calendrier : visible des l'arrivee, il chevauche le bandeau. */}
      <section id={ANCRE} className="scroll-mt-24 bg-gray-50 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto -mt-24 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:-mt-28">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <Image
                src={c.photo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/80"
              />
              <div>
                <h2 className="text-lg font-bold text-primary">
                  Réservez vos {c.duree} avec {c.prenom}
                </h2>
                <p className="text-sm text-gray-500">
                  Visio ou téléphone · sans engagement · confirmation immédiate par e-mail
                </p>
              </div>
            </div>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#25D366]/20"
            >
              <IconeWhatsApp className="h-4 w-4 text-[#25D366]" />
              Une question avant ?
            </a>
          </div>
          <AgendaEmbed url={agendaUrl(c.slug)} locale="fr" sujet={c.pastille} direct />
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-gray-600">
          Aucun créneau ne vous convient ?{' '}
          <a href="#rappel" className="font-semibold text-primary underline underline-offset-4 hover:text-accent">
            Laissez votre numéro
          </a>{' '}
          et {c.prenom} vous rappelle.
        </p>
      </section>

      {/* Ce qu'on retire au courtier. */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Ce que vous n’aurez pas à faire
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-gray-600">
            {c.sujetsIntro}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.sujets.map((s) => (
              <div key={s.titre} className="rounded-2xl border-l-4 border-accent bg-gray-50 p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-bold text-primary">{s.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience mesuree du reseau : les chiffres avant la promesse, et leur source. */}
      <section className="bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ce que notre réseau reçoit vraiment
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {RESEAU.map((r) => (
              <div key={r.n} className="text-center">
                <div className="text-4xl font-extrabold tabular-nums text-accent sm:text-5xl">{r.n}</div>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-300">{r.l}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-gray-400">
            Source : Google Search Console, 90 jours au 12 septembre 2026. Ce sont des visites de recherche, pas des
            demandes de rendez-vous — le réseau est le point de départ du dispositif, pas la promesse.
          </p>
        </div>
      </section>

      {/* Exclusivite cantonale. */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Un canton, un cabinet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-base leading-relaxed text-gray-600">
            Nous n’ouvrons chaque canton qu’à un seul cabinet. Ce n’est pas un argument de vente : c’est la seule façon
            d’envoyer quelqu’un à un conseiller plutôt que de vendre le même contact à cinq concurrents.
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CANTONS.map((canton) => (
              <li
                key={canton.code}
                className="rounded-2xl bg-white px-4 py-6 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="text-2xl font-extrabold tracking-tight text-primary">{canton.code}</p>
                <p className="mt-1 text-sm text-gray-500">{canton.nom}</p>
                <p className="mt-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  Libre
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deroule de l'appel : desamorce la peur du rendez-vous commercial. */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Comment se passent les {c.duree}
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {c.deroule.map((d) => (
              <li key={d.temps} className="rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5">
                <p className="inline-block rounded-md bg-primary px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
                  {d.temps}
                </p>
                <h3 className="mt-3 text-lg font-bold text-primary">{d.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rappel : volet bleu nuit + formulaire. */}
      <section id="rappel" className="scroll-mt-24 bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-primary p-8 text-white sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{c.rappelTitre}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{c.rappelTexte}</p>
            <ul className="mt-8 space-y-4">
              {c.rappelPoints.map((p) => (
                <li key={p} className="flex gap-3 text-sm font-medium leading-relaxed text-white">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/15 pt-6 text-sm text-gray-300">
              <p>Pressé ?</p>
              <a href={`tel:${TEL_LIEN}`} className="mt-1 inline-block text-xl font-bold text-white hover:text-accent">
                {TEL_AFFICHE}
              </a>
            </div>
          </div>
          <div className="bg-white p-6 sm:p-10">
            <RappelForm persona={c.slug} prenom={c.prenom} messageAide={c.rappelMessageAide} whatsapp={whatsapp} />
          </div>
        </div>
      </section>

      {/* Ce que l'appel apporte. */}
      <section className="bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ce que vous avez en raccrochant
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {c.resultats.map((r, i) => (
              <div key={r.titre} className="text-center">
                <div className="text-4xl font-extrabold text-accent sm:text-5xl">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 text-lg font-bold text-white">{r.titre}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-300">{r.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl">Vos questions</h2>
          <div className="mt-10">
            <FAQ items={c.questions} />
          </div>

          <Link
            href={autre.chemin}
            className="mt-12 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Image
              src={autre.photo}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm text-gray-600">{c.renvoi.texte}</p>
              <p className="mt-1 font-semibold text-primary">
                Voir la page {autre.prenom} <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Derniere invitation a reserver. */}
      <section className="bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-2xl font-bold leading-snug text-white sm:text-3xl">{c.bandeFinale}</p>
          <div className="mt-8 flex justify-center">
            <a
              href={`#${ANCRE}`}
              className={`${BOUTON} bg-accent text-white shadow-lg hover:bg-accent-dark hover:shadow-xl`}
            >
              Choisir mon créneau
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
