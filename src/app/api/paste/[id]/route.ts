import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Paste from '@/models/Paste';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const paste = await Paste.findOne({ paste_id: params.id });

  if (!paste) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(paste);
}
