'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { nanoid } from 'nanoid';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(10);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Generate unique slug
      const slug = nanoid(10);
      const fileName = `${user.id}/${slug}/${file.name}`;

      setProgress(30);

      // Upload PDF to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('flipbooks')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setProgress(60);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('flipbooks')
        .getPublicUrl(fileName);

      setProgress(80);

      // Create flipbook record
      const { data: flipbook, error: dbError } = await supabase
        .from('flipbooks')
        .insert({
          user_id: user.id,
          title: file.name.replace('.pdf', ''),
          slug: slug,
          pdf_url: publicUrl,
        })
        .select()
        .single();

      if (dbError) {
        throw new Error(dbError.message);
      }

      setProgress(100);

      // Redirect to editor
      router.push(`/dashboard/flipbook/${flipbook.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Upload Your PDF
          </h1>
          <p className="text-gray-400">
            Transform your PDF into an interactive flipbook
          </p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : file
              ? 'border-green-500 bg-green-500/10'
              : 'border-white/20 hover:border-white/40 bg-neutral-900'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />

          <div className="text-center">
            {file ? (
              <>
                <FileText className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-1">{file.name}</p>
                <p className="text-gray-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-1">
                  Drag and drop your PDF here
                </p>
                <p className="text-gray-400 text-sm">or click to browse</p>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {uploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Uploading...</span>
              <span className="text-white text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full mt-6 py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Create Flipbook'
          )}
        </button>
      </main>
    </div>
  );
}
