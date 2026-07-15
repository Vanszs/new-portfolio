import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const SINGLETON_ID = 'default';
const TABLE_NAME = 'FooterConfig';

function validateFooterBody(body: Record<string, unknown>): Prisma.FooterConfigUpdateInput {
  const { brandText, socialLinks, copyrightText } = body;
  if (typeof brandText !== 'string' || brandText.trim().length === 0) {
    throw new Error('Missing or invalid field: brandText');
  }
  if (typeof copyrightText !== 'string') {
    throw new Error('Missing or invalid field: copyrightText');
  }
  return {
    brandText: brandText.trim(),
    socialLinks: socialLinks as Prisma.InputJsonValue,
    copyrightText,
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const footer = await prisma.footerConfig.findUnique({ where: { id: SINGLETON_ID } });
    return NextResponse.json(footer);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data = validateFooterBody(body);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.footerConfig.findUnique({ where: { id: SINGLETON_ID } });
      if (existing) {
        await createBackup(TABLE_NAME, SINGLETON_ID, existing, 'UPDATE', tx);
        return tx.footerConfig.update({ where: { id: SINGLETON_ID }, data });
      }
      return tx.footerConfig.create({
        data: { id: SINGLETON_ID, ...(data as Prisma.FooterConfigCreateInput) },
      });
    });
    return NextResponse.json(result);
  } catch (e) {
    return handleApiError(e);
  }
}
