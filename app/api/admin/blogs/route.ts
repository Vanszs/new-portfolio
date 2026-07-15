import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const TABLE_NAME = 'Blog';

function validateBlogBody(body: Record<string, unknown>): Prisma.BlogCreateInput {
  const { title, category, date, readTime, image, description, order } = body;
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
    date: typeof date === 'string' ? date : undefined,
    readTime: typeof readTime === 'string' ? readTime : undefined,
    image: image.trim(),
    description,
    order: typeof order === 'number' ? order : 0,
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const blogs = await prisma.blog.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(blogs);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id: _, ...rest } = body;
    const data = validateBlogBody(rest);
    const blog = await prisma.blog.create({ data });
    return NextResponse.json(blog, { status: 201 });
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
    const data = validateBlogBody(rest);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.blog.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'UPDATE', tx);
      return tx.blog.update({ where: { id }, data });
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
      const existing = await tx.blog.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'DELETE', tx);
      await tx.blog.delete({ where: { id } });
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
