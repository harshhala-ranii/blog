import { NextRequest, NextResponse } from 'next/server';
import { updateBlogLikes } from '../../../../lib/likes-server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { type } = await request.json();

    if (!type || !['like', 'dislike'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    const updatedData = await updateBlogLikes(slug, type);
    
    return NextResponse.json({
      success: true,
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}
