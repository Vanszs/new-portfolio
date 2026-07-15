import path from 'path';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function getUploadDir() {
  return path.join(process.cwd(), 'public', 'uploads');
}

export function sanitizeFilename(original: string): string {
  // Strip any path components that may have been supplied by the client.
  const basename = path.basename(original.replace(/\\/g, '/'));
  // Remove characters that are not alphanumeric, dot, dash, or underscore.
  const safe = basename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
  // Ensure the name is not empty and has a reasonable length.
  const name = safe.length > 0 ? safe.slice(0, 100) : 'upload';
  return name;
}

export type ImageFileValidation = { ok: true } | { ok: false; reason: string };

export function validateImageFile(file: File): ImageFileValidation {
  if (!file.type.startsWith('image/')) {
    return { ok: false, reason: 'Only image files are allowed.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, reason: 'File size exceeds 5 MB limit.' };
  }
  if (file.size === 0) {
    return { ok: false, reason: 'Empty file uploaded.' };
  }
  return { ok: true };
}

export function isInsideUploadDir(uploadDir: string, targetPath: string): boolean {
  const resolved = path.resolve(targetPath);
  const resolvedUploadDir = path.resolve(uploadDir);
  return resolved.startsWith(resolvedUploadDir + path.sep);
}
