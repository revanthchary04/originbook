"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  IconGridDots,
  IconMessage,
  IconShare,
  IconPrinter,
  IconDownload,
  IconVolume,
  IconVolumeOff,
  IconZoomIn,
  IconMaximize,
} from "@tabler/icons-react"

interface FlipbookBottomToolbarProps {
  onThumbnails?: () => void
  onNotes?: () => void
  onShare?: () => void
  onPrint?: () => void
  onDownload?: () => void
  onToggleSound?: () => void
  onZoomIn?: () => void
  onFullscreen?: () => void
  isMuted?: boolean
}

export function FlipbookBottomToolbar({
  onThumbnails,
  onNotes,
  onShare,
  onPrint,
  onDownload,
  onToggleSound,
  onZoomIn,
  onFullscreen,
  isMuted = false,
}: FlipbookBottomToolbarProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center gap-1 px-3 py-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-lg shadow-lg border">
        {/* Thumbnails */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onThumbnails}
          title="Thumbnails"
        >
          <IconGridDots className="h-5 w-5" />
        </Button>

        {/* Notes */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onNotes}
          title="Notes"
        >
          <IconMessage className="h-5 w-5" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Share */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onShare}
          title="Share"
        >
          <IconShare className="h-5 w-5" />
        </Button>

        {/* Print */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onPrint}
          title="Print"
        >
          <IconPrinter className="h-5 w-5" />
        </Button>

        {/* Download */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onDownload}
          title="Download"
        >
          <IconDownload className="h-5 w-5" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Sound */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onToggleSound}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <IconVolumeOff className="h-5 w-5" />
          ) : (
            <IconVolume className="h-5 w-5" />
          )}
        </Button>

        {/* Zoom */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onZoomIn}
          title="Zoom in"
        >
          <IconZoomIn className="h-5 w-5" />
        </Button>

        {/* Fullscreen */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onFullscreen}
          title="Fullscreen"
        >
          <IconMaximize className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
