import { auth } from '@/auth';
import {
  getUploadDir,
  isInsideUploadDir,
  sanitizeFilename,
  validateImageFile,
} from '@/lib/upload';
import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const validation = validateImageFile(file);
    if ('reason' in validation) {
      return NextResponse.json({ error: validation.reason }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = getUploadDir();
    const targetPath = path.join(uploadDir, filename);

    if (!isInsideUploadDir(uploadDir, targetPath)) {
      return NextResponse.json({ error: 'Invalid upload path.' }, { status: 400 });
    }

    await mkdir(uploadDir, { recursive: true });
    await writeFile(targetPath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
