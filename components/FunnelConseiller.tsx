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
      {/* Premier ecran = le calendrier. Le prospect arrive d'un e-mail pour reserver :
          a gauche (au-dessus sur mobile) une presentation courte, a droite l'agenda iClosed,
          visible sans defiler. */}
      <section id={ANCRE} className="relative scroll-mt-24 overflow-hidden bg-primary px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-15" priority />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-8">
          <div className="text-white lg:pt-4">
            <div className="flex items-center gap-3">
              <Image
                src={c.photo}
                alt={c.photoAlt}
                width={112}
                height={112}
                priority
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-accent lg:h-20 lg:w-20"
              />
              <div>
                <p className="font-bold">{c.nom}</p>
                <p className="text-sm text-gray-300">{c.role}</p>
              </div>
            </div>
            <h1 className="mt-4 text-balance text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{c.h1}</h1>
            <p className="text-pretty mt-4 hidden leading-relaxed text-gray-200 lg:block">{c.lead}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium text-gray-200 lg:flex-col">
              {c.chips.map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5">
                  <IconeCheck />
                  {chip}
                </li>
              ))}
            </ul>
            <blockquote className="mt-6 hidden border-l-4 border-accent pl-3 text-sm italic leading-relaxed text-gray-300 lg:block">
              «&#8239;{c.citation}&#8239;»
            </blockquote>
            <div className="mt-6 hidden flex-col gap-2 text-sm lg:flex">
              <a href="#rappel" className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                Aucun créneau ? {c.prenom} vous rappelle
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#25D366]"
              >
                <IconeWhatsApp className="h-4 w-4 text-[#25D366]" />
                Une question avant ? WhatsApp
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            <AgendaEmbed url={agendaUrl(c.slug)} locale="fr" sujet={`Réserver avec ${c.prenom}`} direct />
          </div>
        </div>
        <p className="relative z-10 mx-auto mt-5 max-w-3xl text-center text-sm text-gray-200 lg:hidden">
          Aucun créneau ne vous convient ?{' '}
          <a href="#rappel" className="font-semibold text-white underline underline-offset-4">
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
