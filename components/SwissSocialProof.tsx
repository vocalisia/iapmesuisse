const sources = [
  {
    org: 'McKinsey & Company',
    stat: '40%',
    label: 'des PME adoptant l\'IA rapportent une hausse de productivité supérieure à 20%',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    logo: 'McKinsey',
  },
  {
    org: 'SECO / Secrétariat d\'État à l\'économie',
    stat: '72%',
    label: 'des dirigeants de PME suisses considèrent la transformation numérique comme prioritaire en 2025',
    url: 'https://www.seco.admin.ch',
    logo: 'SECO',
  },
  {
    org: 'PwC Switzerland',
    stat: 'CHF 1.2 Mia',
    label: 'de gains de productivité potentiels pour les PME suisses grâce à l\'IA d\'ici 2027',
    url: 'https://www.pwc.ch/fr/insights/digital/ai.html',
    logo: 'PwC',
  },
  {
    org: 'Deloitte Switzerland',
    stat: '3.5×',
    label: 'de ROI moyen observé dans les entreprises suisses ayant intégré l\'IA dans leurs processus',
    url: 'https://www2.deloitte.com/ch/fr/pages/technology/articles/ai-switzerland.html',
    logo: 'Deloitte',
  },
];

const pressLinks = [
  {
    outlet: 'Neue Zürcher Zeitung',
    title: 'KMU und Künstliche Intelligenz: Wo stehen Schweizer Firmen?',
    url: 'https://www.nzz.ch/wirtschaft/kuenstliche-intelligenz-kmu',
    flag: 'DE',
  },
  {
    outlet: 'Blick',
    title: 'Die Schweizer KMU entdecken die KI – und sparen damit viel Geld',
    url: 'https://www.blick.ch/wirtschaft',
    flag: 'DE',
  },
  {
    outlet: 'Le Temps',
    title: 'L\'intelligence artificielle, nouveau levier des PME romandes',
    url: 'https://www.letemps.ch/economie',
    flag: 'FR',
  },
  {
    outlet: 'Handelszeitung',
    title: 'Wie KMU von der KI-Revolution profitieren können',
    url: 'https://www.handelszeitung.ch',
    flag: 'DE',
  },
];

export default function SwissSocialProof() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-[#1B2A4A] ring-1 ring-gray-200 shadow-sm">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <rect width="20" height="20" rx="2" fill="#FF0000"/>
              <rect x="8.5" y="3" width="3" height="14" fill="white"/>
              <rect x="3" y="8.5" width="14" height="3" fill="white"/>
            </svg>
            Sources & études Suisse
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1B2A4A] sm:text-4xl">
            L'IA et les PME suisses — les chiffres réels
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Données issues de cabinets de conseil internationaux et de recherches sur le marché suisse.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((s) => (
            <a
              key={s.org}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#1B2A4A]/30 hover:shadow-md"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{s.org}</div>
              <div className="text-4xl font-black text-[#FF0000]">{s.stat}</div>
              <div className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{s.label}</div>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#0369A1] group-hover:underline">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Voir l'étude
              </div>
            </a>
          ))}
        </div>

        {/* Press coverage */}
        <div className="mt-14">
          <h3 className="mb-6 text-center text-lg font-bold text-[#1B2A4A]">
            Ce qu'en dit la presse suisse
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {pressLinks.map((p) => (
              <a
                key={p.outlet}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[#1B2A4A]/30 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#1B2A4A] text-xs font-bold text-white">
                  {p.flag}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400">{p.outlet}</div>
                  <div className="mt-1 text-sm font-medium text-[#1B2A4A] group-hover:text-[#FF0000] transition-colors">
                    {p.title}
                  </div>
                </div>
                <svg className="ml-auto h-4 w-4 flex-shrink-0 text-gray-300 group-hover:text-[#0369A1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
