import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import FlipbookViewerClient from './FlipbookViewerClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ViewFlipbookPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch flipbook by slug
  const { data: flipbook, error } = await supabase
    .from('flipbooks')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !flipbook) {
    notFound();
  }

  // Fetch pages
  const { data: pages } = await supabase
    .from('flipbook_pages')
    .select('*')
    .eq('flipbook_id', flipbook.id)
    .order('page_number', { ascending: true });

  // Record view
  const sessionId = Math.random().toString(36).substring(7);

  return (
    <FlipbookViewerClient
      flipbook={flipbook}
      pages={pages || []}
      sessionId={sessionId}
    />
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: flipbook } = await supabase
    .from('flipbooks')
    .select('title, description')
    .eq('slug', slug)
    .single();

  return {
    title: flipbook?.title || 'Flipbook',
    description: flipbook?.description || 'View this interactive flipbook',
  };
}
