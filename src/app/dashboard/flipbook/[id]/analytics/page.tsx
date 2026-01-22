import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Clock, BarChart3, Users, FileText } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FlipbookAnalyticsPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch flipbook
  const { data: flipbook } = await supabase
    .from('flipbooks')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!flipbook) {
    redirect('/dashboard');
  }

  // Fetch total views
  const { count: totalViews } = await supabase
    .from('flipbook_views')
    .select('*', { count: 'exact', head: true })
    .eq('flipbook_id', id);

  // Fetch unique sessions
  const { data: uniqueSessions } = await supabase
    .from('flipbook_views')
    .select('session_id')
    .eq('flipbook_id', id);
  
  const uniqueViewers = new Set(uniqueSessions?.map(s => s.session_id)).size;

  // Fetch page analytics
  const { data: pageAnalytics } = await supabase
    .from('flipbook_analytics')
    .select('page_number, time_spent')
    .eq('flipbook_id', id);

  // Calculate average time per page
  const pageTimeMap: { [key: number]: number[] } = {};
  pageAnalytics?.forEach(item => {
    if (!pageTimeMap[item.page_number]) {
      pageTimeMap[item.page_number] = [];
    }
    pageTimeMap[item.page_number].push(item.time_spent);
  });

  const pageStats = Object.entries(pageTimeMap).map(([page, times]) => ({
    page: parseInt(page) + 1,
    avgTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
    views: times.length,
  })).sort((a, b) => a.page - b.page);

  // Calculate total average time
  const allTimes = pageAnalytics?.map(p => p.time_spent) || [];
  const avgTimePerPage = allTimes.length > 0 
    ? Math.round(allTimes.reduce((a, b) => a + b, 0) / allTimes.length) 
    : 0;

  // Get recent views
  const { data: recentViews } = await supabase
    .from('flipbook_views')
    .select('*')
    .eq('flipbook_id', id)
    .order('created_at', { ascending: false })
    .limit(10);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <Link
              href={`/view/${flipbook.slug}`}
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Flipbook
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Analytics: {flipbook.title}
          </h1>
          <p className="text-gray-400 mt-1">
            Track how viewers interact with your flipbook
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{totalViews || 0}</p>
                <p className="text-gray-400 text-sm">Total Views</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{uniqueViewers}</p>
                <p className="text-gray-400 text-sm">Unique Viewers</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{formatTime(avgTimePerPage)}</p>
                <p className="text-gray-400 text-sm">Avg. Time/Page</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{flipbook.page_count}</p>
                <p className="text-gray-400 text-sm">Total Pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page Performance */}
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Time Spent Per Page
            </h2>
            {pageStats.length > 0 ? (
              <div className="space-y-3">
                {pageStats.map((stat) => {
                  const maxTime = Math.max(...pageStats.map(s => s.avgTime));
                  const percentage = maxTime > 0 ? (stat.avgTime / maxTime) * 100 : 0;
                  
                  return (
                    <div key={stat.page}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Page {stat.page}</span>
                        <span className="text-white">{formatTime(stat.avgTime)}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No page analytics yet</p>
            )}
          </div>

          {/* Recent Views */}
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Recent Views
            </h2>
            {recentViews && recentViews.length > 0 ? (
              <div className="space-y-3">
                {recentViews.map((view) => (
                  <div
                    key={view.id}
                    className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg"
                  >
                    <div>
                      <p className="text-white text-sm">
                        {new Date(view.created_at).toLocaleDateString()} at{' '}
                        {new Date(view.created_at).toLocaleTimeString()}
                      </p>
                      <p className="text-gray-400 text-xs truncate max-w-[200px]">
                        {view.referrer || 'Direct visit'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {view.session_id.substring(0, 8)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No views yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
