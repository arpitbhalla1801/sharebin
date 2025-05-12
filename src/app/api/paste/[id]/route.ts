import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Paste from '@/models/Paste';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pasteId = params.id;
  
  await connectDB();
  
  try {
    const paste = await Paste.findOne({ paste_id: pasteId }).lean();
    
    if (!paste) {
      return NextResponse.json(
        { error: 'Paste not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(paste);
  } catch (error) {
    console.error('Error fetching paste:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paste' },
      { status: 500 }
    );
  }
}
