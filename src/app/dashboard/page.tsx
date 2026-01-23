"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  IconBook,
  IconChartBar,
  IconEye,
  IconPlus,
  IconUpload,
  IconEdit,
  IconTrash,
  IconShare,
} from "@tabler/icons-react"
import { Flipbook } from "@/types/flipbook"

export default function DashboardPage() {
  const [flipbooks, setFlipbooks] = useState<Flipbook[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalFlipbooks: 0,
    totalViews: 0,
    publishedCount: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    fetchFlipbooks()
  }, [])

  const fetchFlipbooks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("flipbooks")
        .select("*")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setFlipbooks(data || [])
      setStats({
        totalFlipbooks: data?.length || 0,
        totalViews: data?.reduce((acc, f) => acc + (f.view_count || 0), 0) || 0,
        publishedCount: data?.filter((f) => f.is_published).length || 0,
      })
    } catch (error) {
      console.error("Error fetching flipbooks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flipbook?")) return

    try {
      const { error } = await supabase.from("flipbooks").delete().eq("id", id)
      if (error) throw error
      fetchFlipbooks()
    } catch (error) {
      console.error("Error deleting flipbook:", error)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Flipbooks</CardTitle>
                    <IconBook className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalFlipbooks}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.publishedCount} published
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <IconEye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalViews}</div>
                    <p className="text-xs text-muted-foreground">Across all flipbooks</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                    <IconChartBar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">View detailed analytics</p>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Flipbooks</h2>
                <Button asChild>
                  <Link href="/dashboard/upload">
                    <IconPlus className="mr-2 h-4 w-4" />
                    Create New
                  </Link>
                </Button>
              </div>

              {/* Flipbooks Grid */}
              {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-muted rounded-t-lg" />
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : flipbooks.length === 0 ? (
                <Card className="p-12">
                  <div className="text-center">
                    <IconBook className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No flipbooks yet</h3>
                    <p className="mt-2 text-muted-foreground">
                      Upload your first PDF to create a beautiful flipbook
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/dashboard/upload">
                        <IconUpload className="mr-2 h-4 w-4" />
                        Upload PDF
                      </Link>
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {flipbooks.map((flipbook) => (
                    <Card key={flipbook.id} className="overflow-hidden group">
                      <div className="aspect-[3/4] bg-muted relative">
                        {flipbook.cover_url ? (
                          <img
                            src={flipbook.cover_url}
                            alt={flipbook.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <IconBook className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="secondary" size="sm" asChild>
                            <Link href={`/view/${flipbook.slug}`}>
                              <IconEye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="secondary" size="sm" asChild>
                            <Link href={`/dashboard/flipbook/${flipbook.id}/edit`}>
                              <IconEdit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/view/${flipbook.slug}`
                              )
                            }}
                          >
                            <IconShare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(flipbook.id)}
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{flipbook.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {flipbook.page_count || 0} pages
                            </p>
                          </div>
                          <Badge variant={flipbook.is_published ? "default" : "secondary"}>
                            {flipbook.is_published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
