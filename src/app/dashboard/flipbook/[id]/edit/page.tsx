'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  Loader2,
  Image as ImageIcon,
  Type,
  Download,
  Share2,
  Trash2
} from 'lucide-react';
import { Flipbook } from '@/types/flipbook';

export default function FlipbookEditorPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const flipbookId = params.id as string;

  const [flipbook, setFlipbook] = useState<Flipbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [allowDownload, setAllowDownload] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchFlipbook();
  }, [flipbookId]);

  const fetchFlipbook = async () => {
    try {
      const { data, error } = await supabase
        .from('flipbooks')
        .select('*')
        .eq('id', flipbookId)
        .single();

      if (error) throw error;

      setFlipbook(data);
      setTitle(data.title);
      setDescription(data.description || '');
      setWatermarkText(data.watermark_text || '');
      setWatermarkOpacity(data.watermark_opacity || 0.3);
      setAllowDownload(data.allow_download);
      setIsPublished(data.is_published);
      setLogoPreview(data.logo_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flipbook');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let logoUrl = flipbook?.logo_url;

      // Upload logo if changed
      if (logoFile) {
        const { data: { user } } = await supabase.auth.getUser();
        const fileName = `${user?.id}/${flipbookId}/logo-${Date.now()}.${logoFile.name.split('.').pop()}`;
        
        const { error: uploadError } = await supabase.storage
          .from('flipbooks')
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('flipbooks')
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      // Update flipbook
      const { error: updateError } = await supabase
        .from('flipbooks')
        .update({
          title,
          description,
          watermark_text: watermarkText,
          watermark_opacity: watermarkOpacity,
          allow_download: allowDownload,
          is_published: isPublished,
          logo_url: logoUrl,
        })
        .eq('id', flipbookId);

      if (updateError) throw updateError;

      // Refresh flipbook data
      await fetchFlipbook();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this flipbook? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('flipbooks')
        .delete()
        .eq('id', flipbookId);

      if (error) throw error;

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/view/${flipbook?.slug}`;
    navigator.clipboard.writeText(url);
    alert('Share link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!flipbook) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Flipbook not found</p>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <nav className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={`/view/${flipbook.slug}`}
                target="_blank"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
              <button
                onClick={copyShareLink}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-1.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Info */}
          <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Type className="w-5 h-5" />
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Flipbook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add a description..."
                />
              </div>
            </div>
          </section>

          {/* Branding */}
          <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Branding
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-12 object-contain bg-neutral-800 rounded-lg px-4 py-2"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg cursor-pointer hover:bg-neutral-700 transition-colors">
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your watermark text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Watermark Opacity: {Math.round(watermarkOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Settings */}
          <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg cursor-pointer">
                <div>
                  <p className="text-white font-medium">Allow Download</p>
                  <p className="text-gray-400 text-sm">Let viewers download the original PDF</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={allowDownload}
                    onChange={(e) => setAllowDownload(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-700 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                </div>
              </label>
              <label className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg cursor-pointer">
                <div>
                  <p className="text-white font-medium">Publish</p>
                  <p className="text-gray-400 text-sm">Make this flipbook publicly accessible</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-700 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                </div>
              </label>
            </div>
          </section>

          {/* Share Link */}
          <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Link
            </h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/view/${flipbook.slug}`}
                className="flex-1 px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-gray-400 focus:outline-none"
              />
              <button
                onClick={copyShareLink}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Once you delete a flipbook, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Delete Flipbook
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
