import { Link } from '@/i18n/routing';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function CTA({ title, description, buttonText, href }: CTAProps) {
  return (
    <section className="bg-[#1B2A4A] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-300">
          {description}
        </p>
        <div className="mt-8">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg bg-[#FF0000] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
          >
            {buttonText}
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
