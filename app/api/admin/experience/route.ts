import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const TABLE_NAME = 'Experience';

function validateExperienceBody(body: Record<string, unknown>): Prisma.ExperienceCreateInput {
  const { role, company, location, period, image, summary, description, gallery, tags, order } = body;
  if (typeof role !== 'string' || role.trim().length === 0) {
    throw new Error('Missing or invalid field: role');
  }
  if (typeof company !== 'string' || company.trim().length === 0) {
    throw new Error('Missing or invalid field: company');
  }
  if (typeof location !== 'string') {
    throw new Error('Missing or invalid field: location');
  }
  if (typeof period !== 'string' || period.trim().length === 0) {
    throw new Error('Missing or invalid field: period');
  }
  if (typeof image !== 'string' || image.trim().length === 0) {
    throw new Error('Missing or invalid field: image');
  }
  if (typeof summary !== 'string') {
    throw new Error('Missing or invalid field: summary');
  }
  if (typeof description !== 'string') {
    throw new Error('Missing or invalid field: description');
  }
  return {
    role: role.trim(),
    company: company.trim(),
    location: location.trim(),
    period: period.trim(),
    image: image.trim(),
    summary: summary.trim(),
    description: description.trim(),
    order: typeof order === 'number' ? order : 0,
    gallery: Array.isArray(gallery) ? gallery.filter((g): g is string => typeof g === 'string') : [],
    tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string') : [],
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(experiences);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id: _, ...rest } = body;
    const data = validateExperienceBody(rest);
    const experience = await prisma.experience.create({ data });
    return NextResponse.json(experience, { status: 201 });
  } catch (e) {
    return handleApiError(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id, ...rest } = body;
    if (typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid id.' }, { status: 400 });
    }
    const data = validateExperienceBody(rest);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.experience.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'UPDATE', tx);
      return tx.experience.update({ where: { id }, data });
    });
    if (!result) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
    }
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.experience.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'DELETE', tx);
      await tx.experience.delete({ where: { id } });
      return { success: true };
    });
    if (!result) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (e) {
    return handleApiError(e);
  }
}
