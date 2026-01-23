-- OriginBook Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Flipbooks table
CREATE TABLE flipbooks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Flipbook',
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  pdf_url TEXT NOT NULL,
  cover_url TEXT,
  logo_url TEXT,
  watermark_text TEXT,
  watermark_opacity DECIMAL DEFAULT 0.3,
  allow_download BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  page_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page images table (for converted PDF pages)
CREATE TABLE flipbook_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  page_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE flipbook_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  time_spent INTEGER DEFAULT 0, -- in seconds
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- View sessions table (to track unique views)
CREATE TABLE flipbook_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_flipbooks_user_id ON flipbooks(user_id);
CREATE INDEX idx_flipbooks_slug ON flipbooks(slug);
CREATE INDEX idx_flipbook_pages_flipbook_id ON flipbook_pages(flipbook_id);
CREATE INDEX idx_flipbook_analytics_flipbook_id ON flipbook_analytics(flipbook_id);
CREATE INDEX idx_flipbook_analytics_session_id ON flipbook_analytics(session_id);
CREATE INDEX idx_flipbook_views_flipbook_id ON flipbook_views(flipbook_id);

-- Row Level Security (RLS) Policies
ALTER TABLE flipbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flipbook_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE flipbook_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE flipbook_views ENABLE ROW LEVEL SECURITY;

-- Flipbooks policies
CREATE POLICY "Users can view their own flipbooks" ON flipbooks
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Users can create their own flipbooks" ON flipbooks
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own flipbooks" ON flipbooks
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own flipbooks" ON flipbooks
  FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Anyone can view published flipbooks by slug" ON flipbooks
  FOR SELECT USING (is_published = true);

-- Flipbook pages policies
CREATE POLICY "Users can view pages of their flipbooks" ON flipbook_pages
  FOR SELECT USING (
    flipbook_id IN (SELECT id FROM flipbooks WHERE user_id = auth.uid())
  );

CREATE POLICY "Anyone can view pages of published flipbooks" ON flipbook_pages
  FOR SELECT USING (
    flipbook_id IN (SELECT id FROM flipbooks WHERE is_published = true)
  );

CREATE POLICY "Users can manage pages of their flipbooks" ON flipbook_pages
  FOR ALL USING (
    flipbook_id IN (SELECT id FROM flipbooks WHERE user_id = auth.uid())
  );

-- Analytics policies (anyone can insert, only owner can view)
CREATE POLICY "Anyone can insert analytics" ON flipbook_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view analytics of their flipbooks" ON flipbook_analytics
  FOR SELECT USING (
    flipbook_id IN (SELECT id FROM flipbooks WHERE user_id = auth.uid())
  );

-- Views policies
CREATE POLICY "Anyone can insert views" ON flipbook_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view views of their flipbooks" ON flipbook_views
  FOR SELECT USING (
    flipbook_id IN (SELECT id FROM flipbooks WHERE user_id = auth.uid())
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_flipbooks_updated_at
  BEFORE UPDATE ON flipbooks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for PDFs and images (run in Supabase Dashboard > Storage)
-- Create a bucket named 'flipbooks' with public access
