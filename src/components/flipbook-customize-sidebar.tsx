"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  IconBrush,
  IconSettings2,
  IconShield,
  IconMail,
  IconList,
  IconLayoutDashboard,
  IconChevronDown,
  IconChevronUp,
  IconPhoto,
  IconPalette,
  IconWorld,
  IconShare,
  IconPrinter,
  IconDownload,
  IconTextCaption,
  IconGridDots,
  IconNotes,
  IconVolume,
  IconMaximize,
  IconZoomIn,
  IconPlayerPlay,
  IconSearch,
  IconLock,
  IconLink,
  IconUsers,
  IconEyeOff,
  IconCode,
  IconAccessible,
  IconBook,
  IconRuler,
  IconShadow,
  IconHighlight,
  IconArrowRight,
  IconPlus,
  IconVideo,
} from "@tabler/icons-react"

interface FlipbookCustomizeSidebarProps {
  flipbook: {
    title: string
    description?: string
    logo_url?: string | null
    background_color?: string
    skin?: string
    favicon_url?: string
    cta_enabled?: boolean
    cta_text?: string
    cta_url?: string
    // Controls
    share_enabled?: boolean
    print_enabled?: boolean
    download_enabled?: boolean
    text_selection_enabled?: boolean
    thumbnails_enabled?: boolean
    notes_enabled?: boolean
    sound_enabled?: boolean
    fullscreen_enabled?: boolean
    zoom_enabled?: boolean
    auto_page_turn?: boolean
    search_enabled?: boolean
    pinned_sidebar?: boolean
    // Privacy
    privacy_mode?: string
    password?: string
    // Layout
    page_turn_mode?: string
    book_layout?: string
    interface_scaling?: number
    hardcover?: boolean
    fixed_zoom?: boolean
    page_offset?: number
    media_navigation?: boolean
    book_thickness?: boolean
    shadow_depth?: string
    link_highlighting?: boolean
    rtl?: boolean
    // Lead form
    lead_form_enabled?: boolean
    // TOC
    toc_enabled?: boolean
  }
  onUpdate: (updates: Record<string, unknown>) => void
  onSave: () => void
  saving: boolean
}

interface SectionProps {
  title: string
  icon: React.ElementType
  defaultOpen?: boolean
  children: React.ReactNode
  badge?: string
}

function Section({ title, icon: Icon, defaultOpen = false, children, badge }: SectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 px-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs text-muted-foreground">{badge}</span>
          )}
          {isOpen ? (
            <IconChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <IconChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

interface SettingRowProps {
  label: string
  children: React.ReactNode
  description?: string
}

function SettingRow({ label, children, description }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <Label className="text-sm">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function SettingButton({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm">{label}</Label>
      <Button variant="outline" size="sm" className="h-8 gap-1" onClick={onClick}>
        {value}
        <span className="text-muted-foreground">•••</span>
      </Button>
    </div>
  )
}

export function FlipbookCustomizeSidebar({
  flipbook,
  onUpdate,
  onSave,
  saving,
}: FlipbookCustomizeSidebarProps) {
  return (
    <div className="w-64 border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Customize flipbook</h2>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Next step"}
            <IconChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
          </Button>
          <Button variant="ghost" size="sm">
            Discard
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Branding & Style */}
        <Section title="Branding & Style" icon={IconBrush} defaultOpen>
          <SettingButton 
            label="Title & Description" 
            value="Change" 
          />
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm">Skin</Label>
              <p className="text-xs text-muted-foreground">Default</p>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              •••
            </Button>
          </div>

          <SettingButton label="Logo" value="Default" />
          <SettingButton label="Background Image" value="Default" />
          <SettingButton label="Color Palette" value="Default" />
          
          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Favicon</Label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <IconBook className="h-4 w-4 text-white" />
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Default •••
              </Button>
            </div>
          </div>

          <SettingRow label="Call-To-Action Button">
            <Switch 
              checked={flipbook.cta_enabled || false}
              onCheckedChange={(checked) => onUpdate({ cta_enabled: checked })}
            />
          </SettingRow>
        </Section>

        <Separator />

        {/* Controls */}
        <Section title="Controls" icon={IconSettings2}>
          <SettingRow label="Share">
            <Switch 
              checked={flipbook.share_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ share_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Print">
            <Switch 
              checked={flipbook.print_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ print_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Download">
            <Switch 
              checked={flipbook.download_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ download_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Text Selection">
            <Switch 
              checked={flipbook.text_selection_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ text_selection_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Thumbnails">
            <Switch 
              checked={flipbook.thumbnails_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ thumbnails_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Notes">
            <Switch 
              checked={flipbook.notes_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ notes_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Sound">
            <Switch 
              checked={flipbook.sound_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ sound_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Fullscreen">
            <Switch 
              checked={flipbook.fullscreen_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ fullscreen_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Zoom">
            <Switch 
              checked={flipbook.zoom_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ zoom_enabled: checked })}
            />
          </SettingRow>
          <SettingRow label="Auto Page Turn">
            <Switch 
              checked={flipbook.auto_page_turn || false}
              onCheckedChange={(checked) => onUpdate({ auto_page_turn: checked })}
            />
          </SettingRow>
          <SettingRow label="Search">
            <Switch 
              checked={flipbook.search_enabled !== false}
              onCheckedChange={(checked) => onUpdate({ search_enabled: checked })}
            />
          </SettingRow>
          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Pinned Sidebar</Label>
            <Select defaultValue="off">
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="on">On</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            The above controls are displayed differently on different devices.{" "}
            <Link href="#" className="text-indigo-600 hover:underline">
              Learn more in our Help Center
            </Link>
          </p>
        </Section>

        <Separator />

        {/* Privacy */}
        <Section title="Privacy" icon={IconShield}>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={flipbook.privacy_mode === "public"}
                onChange={() => onUpdate({ privacy_mode: "public" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconWorld className="h-4 w-4" />
                  <span className="font-medium text-sm">Public</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone can find and view online
                </p>
                <Link href="#" className="text-xs text-indigo-600 hover:underline">
                  Upgrade
                </Link>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                value="shareable"
                checked={flipbook.privacy_mode === "shareable" || !flipbook.privacy_mode}
                onChange={() => onUpdate({ privacy_mode: "shareable" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconLink className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium text-sm">Shareable Link</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Only those with the link can view online
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="privacy"
                value="password"
                checked={flipbook.privacy_mode === "password"}
                onChange={() => onUpdate({ privacy_mode: "password" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconLock className="h-4 w-4" />
                  <span className="font-medium text-sm">Password</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Only those with the password can view online
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="privacy"
                value="restricted"
                checked={flipbook.privacy_mode === "restricted"}
                onChange={() => onUpdate({ privacy_mode: "restricted" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconUsers className="h-4 w-4" />
                  <span className="font-medium text-sm">Restricted Access</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Only authorized readers can view online
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="privacy"
                value="embed"
                checked={flipbook.privacy_mode === "embed"}
                onChange={() => onUpdate({ privacy_mode: "embed" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconCode className="h-4 w-4" />
                  <span className="font-medium text-sm">Protected Embed</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Accessible within the websites you choose
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={flipbook.privacy_mode === "private"}
                onChange={() => onUpdate({ privacy_mode: "private" })}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconEyeOff className="h-4 w-4" />
                  <span className="font-medium text-sm">Private</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Only you can access in your account
                </p>
              </div>
            </label>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Viewers can</Label>
            <SettingRow label="Share">
              <Switch 
                checked={flipbook.share_enabled !== false}
                onCheckedChange={(checked) => onUpdate({ share_enabled: checked })}
              />
            </SettingRow>
          </div>
        </Section>

        <Separator />

        {/* Lead Capture Form */}
        <Section title="Lead Capture Form" icon={IconMail} badge="Off">
          <SettingRow label="Enable">
            <Switch 
              checked={flipbook.lead_form_enabled || false}
              onCheckedChange={(checked) => onUpdate({ lead_form_enabled: checked })}
            />
          </SettingRow>
          <p className="text-xs text-muted-foreground">
            Collect viewer emails, phone numbers, and other information with a built-in lead 
            capture form and then track how many times each visitor views your flipbook.{" "}
            <Link href="#" className="text-indigo-600 hover:underline">
              Learn more in our help center.
            </Link>
          </p>
        </Section>

        <Separator />

        {/* Table of Contents */}
        <Section title="Table of Contents" icon={IconList} badge="Off">
          <SettingRow label="Enable">
            <Switch 
              checked={flipbook.toc_enabled || false}
              onCheckedChange={(checked) => onUpdate({ toc_enabled: checked })}
            />
          </SettingRow>
          <p className="text-xs text-muted-foreground">
            Create an interactive table of contents to help viewers navigate around your 
            content easily.{" "}
            <Link href="#" className="text-indigo-600 hover:underline">
              Learn more
            </Link>
          </p>
          {flipbook.toc_enabled && (
            <Button variant="outline" size="sm" className="w-full">
              <IconPlus className="mr-2 h-4 w-4" />
              Add heading
            </Button>
          )}
        </Section>

        <Separator />

        {/* Layout & Interaction */}
        <Section title="Layout & Interaction" icon={IconLayoutDashboard}>
          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Accessibility</Label>
            <Button variant="outline" size="sm" className="h-8">
              Off •••
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Page Turn Mode</Label>
            <Select 
              value={flipbook.page_turn_mode || "flip"}
              onValueChange={(value) => onUpdate({ page_turn_mode: value })}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flip">Flip</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="fade">Fade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Book Layout</Label>
            <Select 
              value={flipbook.book_layout || "1"}
              onValueChange={(value) => onUpdate({ book_layout: value })}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 page</SelectItem>
                <SelectItem value="2">2 pages</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Interface Scaling</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={50}
                max={150}
                step={10}
                value={flipbook.interface_scaling || 100}
                onChange={(e) => onUpdate({ interface_scaling: parseInt(e.target.value) || 100 })}
                className="w-16 h-8 text-sm"
              />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </div>

          <SettingRow label="Hardcover">
            <Switch 
              checked={flipbook.hardcover || false}
              onCheckedChange={(checked) => onUpdate({ hardcover: checked })}
            />
          </SettingRow>

          <SettingRow label="Fixed Zoom Mode">
            <Switch 
              checked={flipbook.fixed_zoom || false}
              onCheckedChange={(checked) => onUpdate({ fixed_zoom: checked })}
            />
          </SettingRow>

          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Page Numeration Offset</Label>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">−</Button>
              <span className="w-8 text-center text-sm">{flipbook.page_offset || 0}</span>
              <Button variant="outline" size="icon" className="h-8 w-8">+</Button>
            </div>
          </div>

          <SettingRow label="In-Page Media Navigation">
            <Switch 
              checked={flipbook.media_navigation !== false}
              onCheckedChange={(checked) => onUpdate({ media_navigation: checked })}
            />
          </SettingRow>

          <SettingRow label="Book Thickness">
            <Switch 
              checked={flipbook.book_thickness !== false}
              onCheckedChange={(checked) => onUpdate({ book_thickness: checked })}
            />
          </SettingRow>

          <div className="flex items-center justify-between gap-4">
            <Label className="text-sm">Shadow Depth</Label>
            <Select 
              value={flipbook.shadow_depth || "normal"}
              onValueChange={(value) => onUpdate({ shadow_depth: value })}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SettingRow label="Link Highlighting">
            <Switch 
              checked={flipbook.link_highlighting !== false}
              onCheckedChange={(checked) => onUpdate({ link_highlighting: checked })}
            />
          </SettingRow>

          <SettingRow label="Right-To-Left">
            <Switch 
              checked={flipbook.rtl || false}
              onCheckedChange={(checked) => onUpdate({ rtl: checked })}
            />
          </SettingRow>
        </Section>

        <Separator />

        {/* Add Interactions */}
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start">
            <IconVideo className="mr-2 h-4 w-4" />
            Add video, links, etc.
          </Button>
          <Link href="#" className="text-xs text-indigo-600 hover:underline block text-center mt-2">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}
