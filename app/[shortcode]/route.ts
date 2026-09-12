import { NextResponse } from 'next/server';
import { connectDatabase, db } from '@/src/prisma/db';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  await connectDatabase();
  const url = await db.orm.public.Url.first({ shortCode: shortcode });

  if (!url) {
    return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
  }

  return NextResponse.redirect(url.originalUrl, 302);
}