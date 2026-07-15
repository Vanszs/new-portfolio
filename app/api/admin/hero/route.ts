import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const SINGLETON_ID = 'default';
const TABLE_NAME = 'HeroConfig';

function validateHeroBody(body: Record<string, unknown>): Prisma.HeroConfigUpdateInput {
  const { headline, subtitle, imageUrl, tagline } = body;
  if (typeof headline !== 'string' || headline.trim().length === 0) {
    throw new Error('Missing or invalid field: headline');
  }
  if (typeof subtitle !== 'string') {
    throw new Error('Missing or invalid field: subtitle');
  }
  if (typeof imageUrl !== 'string' || imageUrl.trim().length === 0) {
    throw new Error('Missing or invalid field: imageUrl');
  }
  if (typeof tagline !== 'string') {
    throw new Error('Missing or invalid field: tagline');
  }
  return {
    headline: headline.trim(),
    subtitle,
    imageUrl: imageUrl.trim(),
    tagline,
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const hero = await prisma.heroConfig.findUnique({ where: { id: SINGLETON_ID } });
    return NextResponse.json(hero);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data = validateHeroBody(body);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.heroConfig.findUnique({ where: { id: SINGLETON_ID } });
      if (existing) {
        await createBackup(TABLE_NAME, SINGLETON_ID, existing, 'UPDATE', tx);
        return tx.heroConfig.update({ where: { id: SINGLETON_ID }, data });
      }
      return tx.heroConfig.create({
        data: { id: SINGLETON_ID, ...(data as Prisma.HeroConfigCreateInput) },
      });
    });
    return NextResponse.json(result);
  } catch (e) {
    return handleApiError(e);
  }
}
