import { handleApiError, requireAdmin } from '@/lib/auth-guard';
import { createBackup } from '@/lib/backup';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const TABLE_NAME = 'Testimonial';

function validateTestimonialBody(body: Record<string, unknown>): Prisma.TestimonialCreateInput {
  const { name, role, company, avatar, text, rating, order } = body;
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Missing or invalid field: name');
  }
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Missing or invalid field: text');
  }
  const numericRating = typeof rating === 'number' ? rating : Number(rating);
  if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
    throw new Error('Missing or invalid field: rating (must be 1-5)');
  }
  return {
    name: name.trim(),
    role: typeof role === 'string' ? role : undefined,
    company: typeof company === 'string' ? company : undefined,
    avatar: typeof avatar === 'string' ? avatar : undefined,
    text: text.trim(),
    rating: numericRating,
    order: typeof order === 'number' ? order : 0,
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { id: _, ...rest } = body;
    const data = validateTestimonialBody(rest);
    const testimonial = await prisma.testimonial.create({ data });
    return NextResponse.json(testimonial, { status: 201 });
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
    const data = validateTestimonialBody(rest);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.testimonial.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'UPDATE', tx);
      return tx.testimonial.update({ where: { id }, data });
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
      const existing = await tx.testimonial.findUnique({ where: { id } });
      if (!existing) return null;
      await createBackup(TABLE_NAME, id, existing, 'DELETE', tx);
      await tx.testimonial.delete({ where: { id } });
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
