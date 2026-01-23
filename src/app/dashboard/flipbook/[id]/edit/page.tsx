'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Flipbook } from '@/types/flipbook';
import { FlipbookCustomizeSidebar } from '@/components/flipbook-customize-sidebar';
import { FlipbookBottomToolbar } from '@/components/flipbook-bottom-toolbar';
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FlipbookEditorPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const flipbookId = params.id as string;

  const [flipbook, setFlipbook] = useState<Flipbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    watermark_text: '',
    watermark_opacity: 0.3,
    allow_download: false,
    is_published: false,
    logo_url: null as string | null,
    logo_file: null as File | null,
    background_color: '#f0f0f0',
    page_effect: 'flip',
    // New settings
    share_enabled: true,
    print_enabled: true,
    download_enabled: true,
    text_selection_enabled: true,
    thumbnails_enabled: true,
    notes_enabled: true,
    sound_enabled: true,
    fullscreen_enabled: true,
    zoom_enabled: true,
    auto_page_turn: false,
    search_enabled: true,
    pinned_sidebar: false,
    privacy_mode: 'public',
    password: '',
    skin: 'default',
    favicon_url: '',
    cta_button_text: '',
    cta_button_url: '',
    lead_capture_enabled: false,
    toc_enabled: false,
    page_turn_mode: 'click',
    book_layout: 'double',
    interface_scaling: 100,
    hardcover: false,
    book_thickness: true,
    shadow_depth: 'medium',
    rtl: false,
  });

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
      setFormData({
        title: data.title || '',
        description: data.description || '',
        watermark_text: data.watermark_text || '',
        watermark_opacity: data.watermark_opacity || 0.3,
        allow_download: data.allow_download || false,
        is_published: data.is_published || false,
        logo_url: data.logo_url || null,
        logo_file: null,
        background_color: data.background_color || '#f5f5f5',
        page_effect: data.page_effect || 'flip',
        // New settings
        share_enabled: data.share_enabled ?? true,
        print_enabled: data.print_enabled ?? true,
        download_enabled: data.download_enabled ?? true,
        text_selection_enabled: data.text_selection_enabled ?? true,
        thumbnails_enabled: data.thumbnails_enabled ?? true,
        notes_enabled: data.notes_enabled ?? true,
        sound_enabled: data.sound_enabled ?? true,
        fullscreen_enabled: data.fullscreen_enabled ?? true,
        zoom_enabled: data.zoom_enabled ?? true,
        auto_page_turn: data.auto_page_turn ?? false,
        search_enabled: data.search_enabled ?? true,
        pinned_sidebar: data.pinned_sidebar ?? false,
        privacy_mode: data.privacy_mode || 'public',
        password: data.password || '',
        skin: data.skin || 'default',
        favicon_url: data.favicon_url || '',
        cta_button_text: data.cta_button_text || '',
        cta_button_url: data.cta_button_url || '',
        lead_capture_enabled: data.lead_capture_enabled ?? false,
        toc_enabled: data.toc_enabled ?? false,
        page_turn_mode: data.page_turn_mode || 'click',
        book_layout: data.book_layout || 'double',
        interface_scaling: data.interface_scaling || 100,
        hardcover: data.hardcover ?? false,
        book_thickness: data.book_thickness ?? true,
        shadow_depth: data.shadow_depth || 'medium',
        rtl: data.rtl ?? false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flipbook');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updates: Record<string, unknown>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let logoUrl = formData.logo_url;

      // Upload logo if changed
      if (formData.logo_file) {
        const { data: { user } } = await supabase.auth.getUser();
        const fileName = `${user?.id}/${flipbookId}/logo-${Date.now()}.${formData.logo_file.name.split('.').pop()}`;
        
        const { error: uploadError } = await supabase.storage
          .from('flipbooks')
          .upload(fileName, formData.logo_file);

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
          title: formData.title,
          description: formData.description,
          watermark_text: formData.watermark_text,
          watermark_opacity: formData.watermark_opacity,
          allow_download: formData.allow_download,
          is_published: formData.is_published,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!flipbook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Flipbook not found</p>
          <Link href="/dashboard" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Left Sidebar - Customize Panel */}
      <FlipbookCustomizeSidebar
        flipbook={formData}
        onUpdate={handleUpdate}
        onSave={handleSave}
        saving={saving}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 bg-white dark:bg-neutral-900 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium truncate max-w-md">{formData.title || 'Untitled'}</span>
          </div>
          
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">page</span>
            <Input
              type="text"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page) && page >= 1) {
                  setCurrentPage(Math.min(page, flipbook.page_count || page));
                }
              }}
              className="w-12 h-8 text-center text-sm"
            />
            <span className="text-sm text-muted-foreground">of {flipbook.page_count || '?'}</span>
          </div>

          {/* Search */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <IconSearch className="h-4 w-4" />
          </Button>
        </div>

        {/* Book Viewer Area */}
        <div 
          className="flex-1 relative overflow-hidden"
          style={{ backgroundColor: formData.background_color }}
        >
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >
            <IconChevronLeft className="h-8 w-8 text-gray-400" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setCurrentPage(p => Math.min(p + 1, flipbook.page_count || p + 1))}
          >
            <IconChevronRight className="h-8 w-8 text-gray-400" />
          </button>

          {/* First/Last Page Buttons */}
          <button
            className="absolute left-4 bottom-4 z-20 p-2 hover:bg-black/5 rounded transition-colors"
            onClick={() => setCurrentPage(1)}
            title="First page"
          >
            <IconArrowNarrowLeft className="h-5 w-5 text-gray-400" />
          </button>

          <button
            className="absolute right-4 bottom-4 z-20 p-2 hover:bg-black/5 rounded transition-colors"
            onClick={() => setCurrentPage(flipbook.page_count || 1)}
            title="Last page"
          >
            <IconArrowNarrowRight className="h-5 w-5 text-gray-400" />
          </button>

          {/* Book Display */}
          <div className="flex items-center justify-center h-full p-8">
            <div className="relative" style={{ perspective: '2000px' }}>
              {/* Book Shadow */}
              <div className="absolute inset-0 -bottom-6 bg-black/15 blur-2xl rounded-lg transform translate-y-6 scale-95" />
              
              {/* Single Page Book View */}
              <div 
                className="relative bg-white rounded shadow-2xl overflow-hidden"
                style={{
                  width: '500px',
                  height: '650px',
                  boxShadow: formData.book_thickness !== false 
                    ? '0 0 0 1px rgba(0,0,0,0.05), 0 25px 50px -12px rgba(0,0,0,0.25), -3px 0 0 #e5e5e5, -6px 0 0 #f0f0f0, -9px 0 0 #f5f5f5'
                    : '0 25px 50px -12px rgba(0,0,0,0.25)',
                }}
              >
                {flipbook.pdf_url ? (
                  <iframe
                    src={`${flipbook.pdf_url}#page=${currentPage}&view=FitH`}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No PDF uploaded
                  </div>
                )}
                
                {/* Logo Overlay */}
                {formData.logo_url && (
                  <div className="absolute top-4 right-4 z-10">
                    <img
                      src={formData.logo_url}
                      alt="Logo"
                      className="h-8 object-contain"
                    />
                  </div>
                )}

                {/* Watermark */}
                {formData.watermark_text && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    style={{ opacity: formData.watermark_opacity }}
                  >
                    <p className="text-4xl font-bold text-gray-400 rotate-[-30deg]">
                      {formData.watermark_text}
                    </p>
                  </div>
                )}

                {/* Page edge effect */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.05))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <FlipbookBottomToolbar
            onThumbnails={() => {}}
            onNotes={() => {}}
            onShare={() => {
              navigator.clipboard.writeText(`${window.location.origin}/view/${flipbook.slug}`);
              alert('Link copied!');
            }}
            onPrint={() => window.print()}
            onDownload={() => {
              if (flipbook.pdf_url) {
                window.open(flipbook.pdf_url, '_blank');
              }
            }}
            onToggleSound={() => setIsMuted(!isMuted)}
            onZoomIn={() => {}}
            onFullscreen={() => {
              document.documentElement.requestFullscreen?.();
            }}
            isMuted={isMuted}
          />
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
}
