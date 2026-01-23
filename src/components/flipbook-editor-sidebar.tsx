"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconBook,
  IconDownload,
  IconLink,
  IconLock,
  IconMusic,
  IconPalette,
  IconPhoto,
  IconShare,
  IconTextCaption,
  IconTypography,
  IconVideo,
  IconLayoutNavbar,
  IconList,
  IconPlayerPlay,
  IconArrowLeft,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface FlipbookEditorSidebarProps {
  flipbookId: string
  flipbookSlug: string
  activeSection: string
  onSectionChange: (section: string) => void
  onSave: () => void
  saving: boolean
}

const styleItems = [
  { id: "title", title: "Title", icon: IconTypography },
  { id: "page-effect", title: "Page Effect", icon: IconPlayerPlay },
  { id: "background", title: "Background", icon: IconPalette },
  { id: "logo", title: "Logo", icon: IconPhoto },
  { id: "controls", title: "Controls", icon: IconLayoutNavbar },
  { id: "table-of-contents", title: "Table of Contents", icon: IconList },
  { id: "background-audio", title: "Background Audio", icon: IconMusic },
]

const settingsItems = [
  { id: "password-protect", title: "Password Protect", icon: IconLock },
  { id: "capture-lead-form", title: "Capture Lead Form", icon: IconTextCaption },
  { id: "replace-pdf", title: "Replace PDF", icon: IconBook },
  { id: "copy-flipbook", title: "Copy Flipbook", icon: IconShare },
]

const interactionItems = [
  { id: "link", title: "Link", icon: IconLink },
  { id: "image", title: "Image", icon: IconPhoto },
  { id: "video", title: "Video", icon: IconVideo },
  { id: "audio", title: "Audio", icon: IconMusic },
  { id: "web", title: "Web", icon: IconShare },
]

export function FlipbookEditorSidebar({
  flipbookId,
  flipbookSlug,
  activeSection,
  onSectionChange,
  onSave,
  saving,
}: FlipbookEditorSidebarProps) {
  return (
    <Sidebar variant="inset" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            asChild
          >
            <Link href={`/view/${flipbookSlug}`} target="_blank">
              <IconShare className="mr-1 h-4 w-4" />
              Share
            </Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={onSave}
            disabled={saving}
          >
            <IconDownload className="mr-1 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Style Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
            Style
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {styleItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Interactions Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
            Interactions
            <Button variant="outline" size="sm" className="h-6 text-xs">
              Edit Mode
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {interactionItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" size="sm" asChild className="w-full justify-start">
          <Link href="/dashboard">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
