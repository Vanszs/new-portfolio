import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const TABLE_NAME = 'Service';

function validateServiceBody(body: Record<string, unknown>): Prisma.ServiceCreateInput {
  const { title, tags, description, image, order } = body;
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Missing or invalid field: title');
  }
  if (typeof description !== 'string') {
    throw new Error('Missing or invalid field: description');
  }
  return {
    title: title.trim(),
    description,
    image: typeof image === 'string' ? image : undefined,
    order: typeof order === 'number' ? order : 0,
    tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string') : [],
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(services);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    // Strip `id` from body to prevent mass-assignment / client-generated IDs.
    const { id: _, ...rest } = body;
    const data = validateServiceBody(rest);
    const service = await prisma.service.create({ data });
    return NextResponse.json(service, { status: 201 });
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
    const data = validateServiceBody(rest);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.service.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'UPDATE', tx);
      return tx.service.update({ where: { id }, data });
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
      const existing = await tx.service.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'DELETE', tx);
      await tx.service.delete({ where: { id } });
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
