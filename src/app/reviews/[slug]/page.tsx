import { getReviewData, getAllReviewSlugs } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllReviewSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReviewData(params.slug);

  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/reviews" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Reviews
        </Link>

        {/* Article Header */}
        <article className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={review.image}
              alt={review.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Meta Information */}
            <div className="mb-6">
              <time className="text-sm text-gray-400">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {review.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {review.description}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-800 mb-8"></div>

            {/* Article Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-white prose-a:underline prose-a:decoration-gray-400 prose-a:underline-offset-4
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:text-gray-300 prose-li:leading-relaxed
                prose-blockquote:text-gray-400 prose-blockquote:border-gray-700
                prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
                prose-hr:border-gray-700"
              dangerouslySetInnerHTML={{ __html: review.contentHtml }}
            />
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link 
            href="/reviews" 
            className="inline-flex items-center px-6 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ReviewPageProps) {
  const review = await getReviewData(params.slug);

  return {
    title: `${review.title} | Reviews`,
    description: review.description,
    openGraph: {
      title: review.title,
      description: review.description,
      images: [review.image],
    },
  };
}
