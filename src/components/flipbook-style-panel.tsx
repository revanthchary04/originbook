"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  IconUpload,
  IconPalette,
  IconPhoto,
  IconPlayerPlay,
  IconMusic,
  IconLock,
  IconMail,
  IconCopy,
  IconRefresh,
  IconLink,
  IconVideo,
  IconWorld,
} from "@tabler/icons-react"

interface StylePanelProps {
  section: string
  flipbook: {
    title: string
    description?: string
    logo_url?: string | null
    watermark_text?: string
    watermark_opacity?: number
    allow_download?: boolean
    is_published?: boolean
    background_color?: string
    page_effect?: string
    background_audio_url?: string
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

// Page Effect Options
const pageEffects = [
  { id: "flip", name: "Flip", description: "Classic page flip animation" },
  { id: "slide", name: "Slide", description: "Smooth slide transition" },
  { id: "fade", name: "Fade", description: "Elegant fade between pages" },
  { id: "zoom", name: "Zoom", description: "Zoom in/out effect" },
  { id: "stack", name: "Stack", description: "Stacked card effect" },
]

// Background Presets
const backgroundPresets = [
  { id: "white", name: "White", color: "#ffffff" },
  { id: "cream", name: "Cream", color: "#faf8f5" },
  { id: "gray", name: "Light Gray", color: "#f5f5f5" },
  { id: "dark", name: "Dark", color: "#1a1a1a" },
  { id: "gradient-1", name: "Soft Gradient", color: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" },
  { id: "gradient-2", name: "Warm Gradient", color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
]

// Image Style Presets for PDF rendering
const imageStyles = [
  { id: "standard", name: "Standard", description: "Original quality, balanced file size" },
  { id: "high-quality", name: "High Quality", description: "Maximum quality, larger files" },
  { id: "web-optimized", name: "Web Optimized", description: "Optimized for fast loading" },
  { id: "print-ready", name: "Print Ready", description: "High DPI for printing" },
]

export function StylePanel({ section, flipbook, onUpdate }: StylePanelProps) {
  const [logoPreview, setLogoPreview] = React.useState<string | null>(flipbook.logo_url || null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoPreview(url)
      // In real implementation, upload file and get URL
      onUpdate({ logo_file: file })
    }
  }

  switch (section) {
    case "title":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Title & Description</CardTitle>
            <CardDescription>Set your flipbook title and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={flipbook.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Enter flipbook title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={flipbook.description || ""}
                onChange={(e) => onUpdate({ description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
          </CardContent>
        </Card>
      )

    case "page-effect":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconPlayerPlay className="h-5 w-5" />
              Page Effect
            </CardTitle>
            <CardDescription>Choose how pages transition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {pageEffects.map((effect) => (
                <div
                  key={effect.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                    flipbook.page_effect === effect.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onUpdate({ page_effect: effect.id })}
                >
                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                    <IconPlayerPlay className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{effect.name}</p>
                    <p className="text-sm text-muted-foreground">{effect.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "background":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconPalette className="h-5 w-5" />
              Background
            </CardTitle>
            <CardDescription>Customize the viewer background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="presets">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              <TabsContent value="presets" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {backgroundPresets.map((preset) => (
                    <div
                      key={preset.id}
                      className={cn(
                        "aspect-square rounded-lg border-2 cursor-pointer transition-all",
                        flipbook.background_color === preset.color
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-muted-foreground/20"
                      )}
                      style={{ background: preset.color }}
                      onClick={() => onUpdate({ background_color: preset.color })}
                      title={preset.name}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="custom" className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={flipbook.background_color || "#ffffff"}
                      onChange={(e) => onUpdate({ background_color: e.target.value })}
                      className="w-14 h-10 p-1"
                    />
                    <Input
                      value={flipbook.background_color || "#ffffff"}
                      onChange={(e) => onUpdate({ background_color: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <IconUpload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )

    case "logo":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconPhoto className="h-5 w-5" />
              Logo
            </CardTitle>
            <CardDescription>Add your brand logo to the flipbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logoPreview && (
              <div className="relative rounded-lg border p-4 bg-muted/50">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-h-20 object-contain mx-auto"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setLogoPreview(null)
                    onUpdate({ logo_url: null })
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Label htmlFor="logo-upload" className="cursor-pointer flex-1">
                <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 hover:bg-muted transition-colors">
                  <IconUpload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Logo</span>
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </Label>
            </div>
            <div className="space-y-2">
              <Label>Logo Position</Label>
              <Select defaultValue="top-left">
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "controls":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Controls</CardTitle>
            <CardDescription>Configure viewer controls visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { id: "zoom", label: "Zoom Controls" },
                { id: "fullscreen", label: "Fullscreen Button" },
                { id: "download", label: "Download Button" },
                { id: "share", label: "Share Button" },
                { id: "print", label: "Print Button" },
                { id: "thumbnails", label: "Page Thumbnails" },
                { id: "search", label: "Search" },
              ].map((control) => (
                <div key={control.id} className="flex items-center justify-between">
                  <Label htmlFor={control.id} className="cursor-pointer">
                    {control.label}
                  </Label>
                  <Checkbox id={control.id} defaultChecked />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "table-of-contents":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Table of Contents</CardTitle>
            <CardDescription>Auto-generated or custom table of contents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Table of Contents</Label>
              <Checkbox defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Style</Label>
              <Select defaultValue="sidebar">
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                  <SelectItem value="modal">Modal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )

    case "background-audio":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconMusic className="h-5 w-5" />
              Background Audio
            </CardTitle>
            <CardDescription>Add ambient audio to your flipbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <IconUpload className="mr-2 h-4 w-4" />
                Upload Audio
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Volume</Label>
              <Input type="range" min="0" max="100" defaultValue="50" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-play</Label>
              <Checkbox />
            </div>
            <div className="flex items-center justify-between">
              <Label>Loop</Label>
              <Checkbox defaultChecked />
            </div>
          </CardContent>
        </Card>
      )

    case "password-protect":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconLock className="h-5 w-5" />
              Password Protection
            </CardTitle>
            <CardDescription>Restrict access to your flipbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Password Protection</Label>
              <Checkbox />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" />
            </div>
          </CardContent>
        </Card>
      )

    case "capture-lead-form":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconMail className="h-5 w-5" />
              Lead Capture Form
            </CardTitle>
            <CardDescription>Collect viewer information before viewing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Lead Form</Label>
              <Checkbox />
            </div>
            <div className="space-y-3">
              <Label>Required Fields</Label>
              {["Name", "Email", "Phone", "Company"].map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="text-sm">{field}</span>
                  <Checkbox defaultChecked={field === "Email"} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "replace-pdf":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconRefresh className="h-5 w-5" />
              Replace PDF
            </CardTitle>
            <CardDescription>Upload a new PDF to replace the current one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 hover:bg-muted transition-colors cursor-pointer">
              <IconUpload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium">Drop PDF here or click to upload</p>
                <p className="text-sm text-muted-foreground">Max file size: 100MB</p>
              </div>
            </div>
            
            {/* Image Style Options */}
            <div className="space-y-3">
              <Label>Image Quality</Label>
              <div className="grid gap-2">
                {imageStyles.map((style) => (
                  <div
                    key={style.id}
                    className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Checkbox id={`style-${style.id}`} />
                    <div className="flex-1">
                      <Label htmlFor={`style-${style.id}`} className="font-medium cursor-pointer">
                        {style.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "copy-flipbook":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconCopy className="h-5 w-5" />
              Copy Flipbook
            </CardTitle>
            <CardDescription>Create a duplicate of this flipbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="copy-title">New Title</Label>
              <Input id="copy-title" defaultValue={`${flipbook.title} (Copy)`} />
            </div>
            <Button className="w-full">
              <IconCopy className="mr-2 h-4 w-4" />
              Create Copy
            </Button>
          </CardContent>
        </Card>
      )

    case "link":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconLink className="h-5 w-5" />
              Add Link
            </CardTitle>
            <CardDescription>Add clickable links to your flipbook pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click on the page viewer to place a link hotspot, then configure the link URL and appearance.
            </p>
            <div className="space-y-2">
              <Label htmlFor="link-url">Link URL</Label>
              <Input id="link-url" placeholder="https://example.com" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Open in new tab</Label>
              <Checkbox defaultChecked />
            </div>
          </CardContent>
        </Card>
      )

    case "image":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconPhoto className="h-5 w-5" />
              Add Image
            </CardTitle>
            <CardDescription>Overlay images on your flipbook pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <IconUpload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <div className="space-y-2">
              <Label>Opacity</Label>
              <Input type="range" min="0" max="100" defaultValue="100" />
            </div>
          </CardContent>
        </Card>
      )

    case "video":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconVideo className="h-5 w-5" />
              Add Video
            </CardTitle>
            <CardDescription>Embed videos in your flipbook pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="upload">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="embed">Embed</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="space-y-4">
                <Button variant="outline" className="w-full">
                  <IconUpload className="mr-2 h-4 w-4" />
                  Upload Video
                </Button>
              </TabsContent>
              <TabsContent value="embed" className="space-y-4">
                <div className="space-y-2">
                  <Label>YouTube / Vimeo URL</Label>
                  <Input placeholder="https://youtube.com/watch?v=..." />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )

    case "audio":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconMusic className="h-5 w-5" />
              Add Audio
            </CardTitle>
            <CardDescription>Add audio clips to specific pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <IconUpload className="mr-2 h-4 w-4" />
              Upload Audio
            </Button>
            <div className="flex items-center justify-between">
              <Label>Auto-play on page view</Label>
              <Checkbox />
            </div>
          </CardContent>
        </Card>
      )

    case "web":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IconWorld className="h-5 w-5" />
              Embed Web Content
            </CardTitle>
            <CardDescription>Embed external web content in your flipbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input placeholder="https://example.com" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Width</Label>
                <Input type="number" defaultValue="400" />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <Input type="number" defaultValue="300" />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Select an option</CardTitle>
            <CardDescription>Choose a section from the sidebar to edit</CardDescription>
          </CardHeader>
        </Card>
      )
  }
}
