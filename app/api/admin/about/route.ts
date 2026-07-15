import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const SINGLETON_ID = 'default';
const TABLE_NAME = 'AboutConfig';

function validateAboutBody(body: Record<string, unknown>): Prisma.AboutConfigUpdateInput {
  const { bio, bioSecond, milestones, coreSkills, principles } = body;
  if (typeof bio !== 'string' || bio.trim().length === 0) {
    throw new Error('Missing or invalid field: bio');
  }
  return {
    bio: bio.trim(),
    bioSecond: typeof bioSecond === 'string' ? bioSecond : undefined,
    milestones: milestones as Prisma.InputJsonValue,
    coreSkills: Array.isArray(coreSkills)
      ? coreSkills.filter((s): s is string => typeof s === 'string')
      : undefined,
    principles: principles as Prisma.InputJsonValue,
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const about = await prisma.aboutConfig.findUnique({ where: { id: SINGLETON_ID } });
    return NextResponse.json(about);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data = validateAboutBody(body);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.aboutConfig.findUnique({ where: { id: SINGLETON_ID } });
      if (existing) {
        await createBackup(TABLE_NAME, SINGLETON_ID, existing, 'UPDATE', tx);
        return tx.aboutConfig.update({ where: { id: SINGLETON_ID }, data });
      }
      return tx.aboutConfig.create({
        data: { id: SINGLETON_ID, ...(data as Prisma.AboutConfigCreateInput) },
      });
    });
    return NextResponse.json(result);
  } catch (e) {
    return handleApiError(e);
  }
}
