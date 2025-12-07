import { getBlogData, getAllBlogSlugs } from '../../../lib/blog-markdown';
import { getBlogLikes } from '../../../lib/likes-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogContent from '../../../components/BlogContent';
import LikeDislike from '../../../components/LikeDislike';
import Share from '../../../components/Share';
import PageWithLoading from '../../../components/PageWithLoading';
import './blog-content.css';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogData(slug);
  const likesData = await getBlogLikes(slug);

  if (!blog) {
    notFound();
  }

  return (
    <PageWithLoading 
      minLoadingTime={3000}
    >
      <div className="min-h-screen bg-black pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </Link>

        {/* Article Header */}
        <article className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Meta Information */}
            <div className="mb-6">
              <time className="text-sm text-gray-400">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {blog.description}
            </p>

            {/* Featured Image */}
            <div className="mb-8 w-full flex justify-center">
              <div className="relative w-full max-w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded-lg w-full h-auto object-contain max-h-[80vh]"
                  loading="eager"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mb-8"></div>

            {/* Article Content */}
            <div className="max-w-none text-gray-300 leading-relaxed">
              <BlogContent 
                contentHtml={blog.contentHtml}
                className="blog-content"
              />
            </div>

            {/* Like/Dislike Component */}
            <LikeDislike 
              slug={blog.slug}
              initialLikes={likesData.likes}
              initialDislikes={likesData.dislikes}
              initialTotalVotes={likesData.totalVotes}
            />

            {/* Share */}
            <Share title={blog.title} />
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link 
            href="/blogs" 
            className="inline-flex items-center px-6 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Blogs
          </Link>
        </div>
      </div>
    </div>
    </PageWithLoading>
  );
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  return {
    title: `${blog.title} | Latest Blogs`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}
