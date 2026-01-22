'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Download, Share2 } from 'lucide-react';

interface PageProps {
  number: number;
  image: string;
  watermark?: string;
  watermarkOpacity?: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ number, image, watermark, watermarkOpacity = 0.3 }, ref) => {
  return (
    <div ref={ref} className="page bg-white shadow-2xl relative overflow-hidden">
      <img
        src={image}
        alt={`Page ${number}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
      {watermark && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: watermarkOpacity }}
        >
          <span className="text-4xl font-bold text-gray-500 transform rotate-[-30deg] select-none">
            {watermark}
          </span>
        </div>
      )}
    </div>
  );
});

Page.displayName = 'Page';

interface FlipbookViewerProps {
  pages: string[];
  coverUrl?: string | null;
  watermark?: string | null;
  watermarkOpacity?: number;
  allowDownload?: boolean;
  pdfUrl?: string;
  onPageChange?: (page: number) => void;
  logo?: string | null;
}

export default function FlipbookViewer({
  pages,
  coverUrl,
  watermark,
  watermarkOpacity = 0.3,
  allowDownload = false,
  pdfUrl,
  onPageChange,
  logo,
}: FlipbookViewerProps) {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalPages(pages.length + (coverUrl ? 1 : 0));
  }, [pages, coverUrl]);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
    onPageChange?.(e.data);
  }, [onPageChange]);

  const goToPrevPage = () => {
    flipBook.current?.pageFlip()?.flipPrev();
  };

  const goToNextPage = () => {
    flipBook.current?.pageFlip()?.flipNext();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl && allowDownload) {
      window.open(pdfUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this flipbook!',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const allPages = coverUrl ? [coverUrl, ...pages] : pages;

  return (
    <div ref={containerRef} className="flex flex-col items-center bg-neutral-950 min-h-screen">
      {/* Header with logo */}
      {logo && (
        <div className="w-full py-4 flex justify-center">
          <img src={logo} alt="Logo" className="h-10 object-contain" />
        </div>
      )}

      {/* Flipbook container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 w-full">
        <div className="relative">
          {/* Book shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none z-10 rounded-lg" />
          
          <HTMLFlipBook
            ref={flipBook}
            width={400}
            height={550}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={!!coverUrl}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="shadow-2xl"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={600}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {allPages.map((pageImage, index) => (
              <Page
                key={index}
                number={index + 1}
                image={pageImage}
                watermark={watermark || undefined}
                watermarkOpacity={watermarkOpacity}
              />
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl px-4 pb-6">
        <div className="bg-neutral-900 border border-white/10 rounded-full px-4 py-2 flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-400 text-sm min-w-[80px] text-center">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {allowDownload && pdfUrl && (
              <button
                onClick={handleDownload}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
