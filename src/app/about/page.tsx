import { getAboutData } from '../../lib/about-markdown';
import Image from 'next/image';
import Link from 'next/link';
import BlogContent from '../../components/BlogContent';
import PageWithLoading from '../../components/PageWithLoading';
import './about-content.css';

export default function About() {
  const about = getAboutData();

  return (
    <PageWithLoading 
      minLoadingTime={4000}
    >
      <div className="min-h-screen bg-black pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          {/* About Content Container */}
          <article className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {about.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {about.description}
              </p>

              {/* Hero Image */}
              {about.image && (
                <div className="mb-8 flex justify-center">
                  <Image
                    src={about.image}
                    alt={about.title}
                    width={600}
                    height={500}
                    className="w-3/4 max-w-lg h-96 md:h-[28rem] object-cover rounded-lg"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div className="about-content">
                <BlogContent contentHtml={about.contentHtml} />
              </div>
            </div>
          </article>

          {/* Back to Home */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageWithLoading>
  );
}
