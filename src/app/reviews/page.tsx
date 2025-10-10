import { getSortedReviewsData } from '../../lib/markdown';
import Card from '@/components/Card';

export default function Reviews() {
  const allReviewsData = getSortedReviewsData();

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Reviews
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Honest thoughts, detailed analysis, and personal experiences. 
            From books to coffee shops, here&apos;s what I really think.
          </p>
        </div>

        {/* Reviews Grid */}
        {allReviewsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allReviewsData.map((review) => (
              <Card
                key={review.slug}
                title={review.title}
                description={review.description}
                image={review.image}
                date={review.date}
                slug={review.slug}
                type="reviews"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-8">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Reviews Yet</h3>
            <p className="text-gray-400 text-lg mb-8">
              I&apos;m working on some great reviews. Check back soon!
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Coming Soon
            </div>
          </div>
        )}

        {/* Footer CTA */}
        {allReviewsData.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to suggest a review?
              </h3>
              <p className="text-gray-400 mb-6">
                Have something you&apos;d like me to review? I&apos;m always looking for new experiences to share.
              </p>
              <a 
                href="/about" 
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
              >
                Get in Touch
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
