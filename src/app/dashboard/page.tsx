import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Book, BarChart3, Eye, Trash2, Edit, Share2, ExternalLink } from 'lucide-react';
import { Flipbook } from '@/types/flipbook';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user's flipbooks
  const { data: flipbooks } = await supabase
    .from('flipbooks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-white font-semibold text-xl">
              OriginBook
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">{user.email}</span>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              My Flipbooks
            </h1>
            <p className="text-gray-400 mt-1">
              Create and manage your interactive flipbooks
            </p>
          </div>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Flipbook
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Book className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{flipbooks?.length || 0}</p>
                <p className="text-gray-400 text-sm">Total Flipbooks</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Eye className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{flipbooks?.filter((f: Flipbook) => f.is_published).length || 0}</p>
                <p className="text-gray-400 text-sm">Published</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">0</p>
                <p className="text-gray-400 text-sm">Total Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flipbooks Grid */}
        {flipbooks && flipbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flipbooks.map((flipbook: Flipbook) => (
              <div
                key={flipbook.id}
                className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-colors"
              >
                {/* Cover Preview */}
                <div className="aspect-[3/4] bg-neutral-800 relative overflow-hidden">
                  {flipbook.cover_url ? (
                    <img
                      src={flipbook.cover_url}
                      alt={flipbook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Book className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/flipbook/${flipbook.id}/edit`}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href={`/view/${flipbook.slug}`}
                      target="_blank"
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Preview"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </Link>
                    <Link
                      href={`/dashboard/flipbook/${flipbook.id}/analytics`}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Analytics"
                    >
                      <BarChart3 className="w-5 h-5 text-white" />
                    </Link>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        flipbook.is_published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {flipbook.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium truncate">{flipbook.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {flipbook.page_count} pages • {new Date(flipbook.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-12 text-center">
            <Book className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No flipbooks yet</h3>
            <p className="text-gray-400 mb-6">
              Upload your first PDF to create an interactive flipbook
            </p>
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Your First Flipbook
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
