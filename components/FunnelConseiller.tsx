import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { agendaUrl } from '@/lib/rdv';
import { CONSEILLERS, TEL_AFFICHE, TEL_LIEN, WHATSAPP_NUMERO, type Conseiller } from '@/lib/conseillers';
import FAQ from '@/components/FAQ';
import AgendaEmbed from '@/components/AgendaEmbed';
import RappelForm from '@/components/RappelForm';
import IconeWhatsApp from '@/components/IconeWhatsApp';

// Mise en page commune des pages de reservation personnelles (/rendez-vous/laura,
// /rendez-vous/michael). Le contenu vient de lib/conseillers.ts.
//
// Meme parcours que les pages Laura et Julien de MeilleurArtisan, habille aux couleurs du
// site : le prospect arrive d'un e-mail pour reserver, donc le calendrier est visible des
// l'arrivee, juste sous la presentation. Le formulaire de rappel et WhatsApp servent ceux qui
// ne trouvent pas de creneau. Pas de longues sections : une page courte qui ne fait qu'une chose.

const ANCRE = 'creneaux';

const BOUTON = 'inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold transition-all duration-200 sm:w-auto';

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

export default function FunnelConseiller({ c }: { c: Conseiller }) {
  const whatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(c.whatsappTexte)}`;
  const autre = CONSEILLERS[c.renvoi.vers];

  return (
    <>
      {/* Presentation : meme bandeau que l'accueil du site (bleu nuit, photo en filigrane). */}
      <section className="relative overflow-hidden bg-primary px-4 pb-32 pt-12 sm:px-6 sm:pb-40 sm:pt-16 lg:px-8">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-20" priority />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-300">
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
              {c.nom} · IAPME Suisse
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
              <a href={`#${ANCRE}`} className={`${BOUTON} bg-accent text-white shadow-lg hover:bg-accent-dark hover:shadow-xl`}>
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
                <h2 className="text-lg font-bold text-primary">Réservez vos 30 minutes avec {c.prenom}</h2>
                <p className="text-sm text-gray-500">Visio Google Meet · gratuit · confirmation immédiate par e-mail</p>
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

      {/* Rappel : volet bleu nuit + formulaire, comme le panneau de MeilleurArtisan. */}
      <section id="rappel" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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

      {/* Ce que l'appel apporte : bandeau du site « Notre engagement ». */}
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
            <Image src={autre.photo} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-sm text-gray-600">{c.renvoi.texte}</p>
              <p className="mt-1 font-semibold text-primary">
                Réservez plutôt avec {autre.nom} <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
