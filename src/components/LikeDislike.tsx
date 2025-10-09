'use client';

import { useState, useEffect } from 'react';

interface LikeDislikeProps {
  slug: string;
  initialLikes?: number;
  initialDislikes?: number;
  initialTotalVotes?: number;
}

export default function LikeDislike({ 
  slug, 
  initialLikes = 0, 
  initialDislikes = 0, 
  initialTotalVotes = 0 
}: LikeDislikeProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has already voted (stored in localStorage)
  useEffect(() => {
    const savedVote = localStorage.getItem(`vote_${slug}`);
    if (savedVote === 'like' || savedVote === 'dislike') {
      setUserVote(savedVote);
    }
  }, [slug]);

  const handleVote = async (type: 'like' | 'dislike') => {
    if (userVote || isLoading) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const result = await response.json();
        setLikes(result.data.likes);
        setDislikes(result.data.dislikes);
        setTotalVotes(result.data.totalVotes);
        setUserVote(type);
        
        // Save vote to localStorage
        localStorage.setItem(`vote_${slug}`, type);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const likePercentage = totalVotes > 0 ? Math.round((likes / totalVotes) * 100) : 0;
  const dislikePercentage = totalVotes > 0 ? Math.round((dislikes / totalVotes) * 100) : 0;

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-6">
          What did you think of this post?
        </h3>
        
        <div className="flex justify-center gap-6 mb-6">
          {/* Like Button */}
          <button
            onClick={() => handleVote('like')}
            disabled={userVote !== null || isLoading}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${userVote === 'like' 
                ? 'bg-green-600 text-white' 
                : userVote === null 
                  ? 'bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Like
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => handleVote('dislike')}
            disabled={userVote !== null || isLoading}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${userVote === 'dislike' 
                ? 'bg-red-600 text-white' 
                : userVote === null 
                  ? 'bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 14.828a4 4 0 005.656 0L10 13.657l1.172 1.171a4 4 0 105.656-5.656L10 2.343l-6.828 6.829a4 4 0 000 5.656z" clipRule="evenodd" />
            </svg>
            Dislike
          </button>
        </div>

        {/* Results */}
        {totalVotes > 0 && (
          <div className="space-y-3">
            <div className="text-sm text-gray-400">
              {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total
            </div>
            
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">
                  {likePercentage}% liked
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">
                  {dislikePercentage}% disliked
                </span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${likePercentage}%` }}
                ></div>
                <div 
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${dislikePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {userVote && (
          <div className="mt-4 text-sm text-gray-400">
            Thanks for your feedback! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
