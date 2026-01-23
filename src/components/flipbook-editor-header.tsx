"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconHome,
  IconBook,
  IconArrowLeft,
  IconEye,
  IconSettings,
  IconZoomIn,
  IconMaximize,
  IconVolume,
  IconGridDots,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface FlipbookEditorHeaderProps {
  title: string
  description?: string
  flipbookSlug: string
}

export function FlipbookEditorHeader({
  title,
  description,
  flipbookSlug,
}: FlipbookEditorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          <IconBook className="h-5 w-5" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <IconHome className="mr-1 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Login / Register</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/flipbook/${flipbookSlug}/edit`}>
            <IconSettings className="mr-1 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>
    </header>
  )
}

interface FlipbookViewerControlsProps {
  onZoomIn?: () => void
  onFullscreen?: () => void
  onToggleAudio?: () => void
  onToggleGrid?: () => void
}

export function FlipbookViewerControls({
  onZoomIn,
  onFullscreen,
  onToggleAudio,
  onToggleGrid,
}: FlipbookViewerControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-lg bg-background/80 p-1 backdrop-blur-sm">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleGrid}>
        <IconGridDots className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onZoomIn}>
        <IconZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onFullscreen}>
        <IconMaximize className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleAudio}>
        <IconVolume className="h-4 w-4" />
      </Button>
    </div>
  )
}
