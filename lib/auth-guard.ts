import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number = 401) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}

export async function requireAdmin() {
  const session = await auth();
  if (!session) {
    throw new AuthError('Unauthorized', 401);
  }
  if (session.user?.role !== 'admin') {
    throw new AuthError('Forbidden', 403);
  }
  return session;
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  console.error('API error:', error);
  return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
}
