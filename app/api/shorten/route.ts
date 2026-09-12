import { NextResponse } from 'next/server';
import { db } from '@/src/prisma/db';
import { generateShortCode } from '@/lib/shortcode';

const MAX_RETRIES = 5;

function isUniqueConstraintError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return false;
  }

  const code = error.code;
  return code === '23505' || code === 'P2002';
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || !('url' in body) || typeof body.url !== 'string') {
    return NextResponse.json({ error: 'A valid "url" field is required' }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(body.url);
  } catch {
    return NextResponse.json({ error: 'A valid "url" field is required' }, { status: 400 });
  }

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const shortCode = generateShortCode();

    try {
      const created = await db.orm.public.Url.create({
        shortCode,
        originalUrl: url.toString(),
      });

      return NextResponse.json(
        {
          shortCode: created.shortCode,
          shortUrl: `${process.env.BASE_URL ?? new URL(request.url).origin}/${created.shortCode}`,
        },
        { status: 201 }
      );
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        continue; // shortCode already existed — loop again with a fresh one
      }

      console.error('Failed to create short URL:', error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }

  return NextResponse.json(
    { error: 'Could not generate a unique code, please try again' },
    { status: 500 }
  );
}