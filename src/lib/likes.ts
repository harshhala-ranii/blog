// Client-side utility functions for likes

export function getLikePercentage(likes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return Math.round((likes / totalVotes) * 100);
}

export function getDislikePercentage(dislikes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return Math.round((dislikes / totalVotes) * 100);
}