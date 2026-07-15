'use client';
import { useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

type FileValidation = { ok: true } | { ok: false; error: string };

function validateClientFile(file: File): FileValidation {
  if (!file.type.startsWith('image/')) {
    return { ok: false, error: 'Only image files (JPG, PNG, WebP, etc.) are allowed.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: 'File size must be 5 MB or smaller.' };
  }
  if (file.size === 0) {
    return { ok: false, error: 'Selected file is empty.' };
  }
  return { ok: true };
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateClientFile(file);
    if ('error' in validation) {
      setError(validation.error);
      e.target.value = '';
      return;
    }

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Upload failed. Please try again.');
      } else {
        onChange(data.url);
        setError(null);
      }
    } catch (err) {
      console.error('Upload failed', err);
      setError('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border border-[#e5e2da]" />
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          name="image"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] text-sm focus:outline-none focus:border-brand-orange"
        />
        <span className="text-xs text-[#8c8c8c] text-center">or</span>
        <label
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-dark text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-brand-orange transition-colors shrink-0 ${uploading ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );

}
