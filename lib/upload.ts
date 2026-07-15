import path from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Magic bytes for common safe image types
const IMAGE_MAGIC: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
  'image/bmp': [[0x42, 0x4d]],
  'image/tiff': [[0x49, 0x49, 0x2a, 0x00], [0x4d, 0x4d, 0x00, 0x2a]],
  'image/avif': [[0x00, 0x00, 0x00]],
};

const ALLOWED_TYPES = new Set(Object.keys(IMAGE_MAGIC));

export function getUploadDir() {
  return path.join(process.cwd(), 'public', 'uploads');
}

export function sanitizeFilename(original: string): string {
  const basename = path.basename(original.replace(/\\/g, '/'));
  const safe = basename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
  const name = safe.length > 0 ? safe.slice(0, 100) : 'upload';
  return name;
}

export type ImageFileValidation = { ok: true } | { ok: false; reason: string };

export function validateImageFile(file: File): ImageFileValidation {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, reason: 'Only image files (JPG, PNG, WebP, GIF, BMP, TIFF, AVIF) are allowed.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, reason: 'File size exceeds 5 MB limit.' };
  }
  if (file.size === 0) {
    return { ok: false, reason: 'Empty file uploaded.' };
  }
  return { ok: true };
}

export async function validateImageMagicBytes(buffer: Buffer, mimeType: string): Promise<ImageFileValidation> {
  const signatures = IMAGE_MAGIC[mimeType];
  if (!signatures) {
    return { ok: false, reason: 'Unsupported image type.' };
  }
  // Special case: avif/heic have box-based format, skip deep magic check
  if (mimeType === 'image/avif') {
    return { ok: true };
  }
  const matches = signatures.some((sig) =>
    sig.every((byte, i) => buffer[i] === byte)
  );
  if (!matches) {
    return { ok: false, reason: 'File content does not match declared image type.' };
  }
  return { ok: true };
}

export function isInsideUploadDir(uploadDir: string, targetPath: string): boolean {
  const resolved = path.resolve(targetPath);
  const resolvedUploadDir = path.resolve(uploadDir);
  return resolved.startsWith(resolvedUploadDir + path.sep);
}
