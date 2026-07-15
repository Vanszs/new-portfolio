import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const TABLE_NAME = 'Project';

function validateProjectBody(body: Record<string, unknown>): Prisma.ProjectCreateInput {
  const { title, category, image, tags, year, description, order } = body;
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Missing or invalid field: title');
  }
  if (typeof category !== 'string') {
    throw new Error('Missing or invalid field: category');
  }
  if (typeof image !== 'string' || image.trim().length === 0) {
    throw new Error('Missing or invalid field: image');
  }
  if (typeof description !== 'string') {
    throw new Error('Missing or invalid field: description');
  }
  return {
    title: title.trim(),
    category,
    image: image.trim(),
    description,
    year: typeof year === 'string' ? year : undefined,
    order: typeof order === 'number' ? order : 0,
    tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string') : [],
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(projects);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id: _, ...rest } = body;
    const data = validateProjectBody(rest);
    const project = await prisma.project.create({ data });
    return NextResponse.json(project, { status: 201 });
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
    const data = validateProjectBody(rest);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.project.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'UPDATE', tx);
      return tx.project.update({ where: { id }, data });
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
      const existing = await tx.project.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'DELETE', tx);
      await tx.project.delete({ where: { id } });
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
