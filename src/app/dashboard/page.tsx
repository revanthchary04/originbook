import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-400">
            You&apos;re logged in as <span className="text-white">{user.email}</span>
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-800 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">Getting Started</h3>
              <p className="text-gray-400 text-sm">Start creating your first publication with OriginBook.</p>
            </div>
            <div className="bg-neutral-800 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">Your Publications</h3>
              <p className="text-gray-400 text-sm">View and manage all your published content.</p>
            </div>
            <div className="bg-neutral-800 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Track the performance of your publications.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
