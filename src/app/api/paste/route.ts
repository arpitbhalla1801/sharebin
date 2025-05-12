import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Paste from '@/models/Paste';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  await connectDB();
  const { title, content, language, is_private, expires_in } = await req.json();

  const paste = await Paste.create({
    paste_id: uuidv4(),
    title,
    content,
    language,
    is_private,
    expires_at: expires_in ? new Date(Date.now() + expires_in * 1000) : null,
  });

  return NextResponse.json({ id: paste.paste_id }, { status: 201 });
}
