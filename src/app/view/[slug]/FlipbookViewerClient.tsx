'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import FlipbookViewer from '@/components/FlipbookViewer';
import { Flipbook, FlipbookPage } from '@/types/flipbook';

interface FlipbookViewerClientProps {
  flipbook: Flipbook;
  pages: FlipbookPage[];
  sessionId: string;
}

export default function FlipbookViewerClient({ 
  flipbook, 
  pages, 
  sessionId 
}: FlipbookViewerClientProps) {
  const supabase = createClient();
  const [currentPage, setCurrentPage] = useState(0);
  const pageStartTime = useRef<number>(Date.now());
  const hasRecordedView = useRef(false);

  // Record initial view
  useEffect(() => {
    if (!hasRecordedView.current) {
      recordView();
      hasRecordedView.current = true;
    }
  }, []);

  // Track time spent on each page
  useEffect(() => {
    pageStartTime.current = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      if (timeSpent > 0) {
        recordPageAnalytics(currentPage, timeSpent);
      }
    };
  }, [currentPage]);

  // Record on page unload
  useEffect(() => {
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      if (timeSpent > 0) {
        // Use sendBeacon for reliable tracking on page unload
        const data = {
          flipbook_id: flipbook.id,
          session_id: sessionId,
          page_number: currentPage,
          time_spent: timeSpent,
          user_agent: navigator.userAgent,
          referrer: document.referrer,
        };
        
        navigator.sendBeacon(
          '/api/analytics',
          JSON.stringify(data)
        );
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [currentPage]);

  const recordView = async () => {
    try {
      await supabase.from('flipbook_views').insert({
        flipbook_id: flipbook.id,
        session_id: sessionId,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (err) {
      console.error('Failed to record view:', err);
    }
  };

  const recordPageAnalytics = async (page: number, timeSpent: number) => {
    try {
      await supabase.from('flipbook_analytics').insert({
        flipbook_id: flipbook.id,
        session_id: sessionId,
        page_number: page,
        time_spent: timeSpent,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (err) {
      console.error('Failed to record analytics:', err);
    }
  };

  const handlePageChange = (page: number) => {
    // Record time spent on previous page
    const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
    if (timeSpent > 0) {
      recordPageAnalytics(currentPage, timeSpent);
    }
    
    setCurrentPage(page);
    pageStartTime.current = Date.now();
  };

  // Get page images
  const pageImages = pages.map(p => p.image_url);

  // If no pages exist, show PDF directly using PDF.js (client-side rendering)
  // For now, show placeholder
  if (pageImages.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-2">{flipbook.title}</h1>
          <p className="text-gray-400 mb-4">This flipbook is being processed...</p>
          {flipbook.pdf_url && (
            <a
              href={flipbook.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              View PDF directly
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <FlipbookViewer
      pages={pageImages}
      coverUrl={flipbook.cover_url}
      watermark={flipbook.watermark_text}
      watermarkOpacity={flipbook.watermark_opacity}
      allowDownload={flipbook.allow_download}
      pdfUrl={flipbook.pdf_url}
      onPageChange={handlePageChange}
      logo={flipbook.logo_url}
    />
  );
}
