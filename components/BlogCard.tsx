import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  locale: string;
  readMoreText?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  locale,
  readMoreText = 'Lire la suite',
}: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Blog Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src="/images/blog-default.jpg"
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
      {/* Date */}
      <time
        dateTime={date}
        className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400"
      >
        {new Date(date).toLocaleDateString(`${locale}-CH`, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold leading-snug text-[#1B2A4A] transition-colors group-hover:text-[#FF0000]">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>

      {/* Excerpt */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
        {excerpt}
      </p>

      {/* Read more link */}
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center text-sm font-semibold text-[#1B2A4A] transition-colors hover:text-[#FF0000]"
      >
        {readMoreText}
        <svg
          className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
      </div>
    </article>
  );
}
