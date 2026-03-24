import { Link } from '@/i18n/routing';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  ctaText?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  features,
  ctaText = 'En savoir plus',
}: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B2A4A]/5 text-3xl">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-bold text-[#1B2A4A]">{title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>

      {/* Feature list */}
      {features.length > 0 && (
        <ul className="mb-6 flex-1 space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA button */}
      <Link
        href="/contact"
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF0000]"
      >
        {ctaText}
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
