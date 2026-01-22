export interface Flipbook {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  slug: string;
  pdf_url: string;
  cover_url: string | null;
  logo_url: string | null;
  watermark_text: string | null;
  watermark_opacity: number;
  allow_download: boolean;
  is_published: boolean;
  page_count: number;
  created_at: string;
  updated_at: string;
}

export interface FlipbookPage {
  id: string;
  flipbook_id: string;
  page_number: number;
  image_url: string;
  created_at: string;
}

export interface FlipbookAnalytics {
  id: string;
  flipbook_id: string;
  session_id: string;
  page_number: number;
  time_spent: number;
  visitor_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  created_at: string;
}

export interface FlipbookView {
  id: string;
  flipbook_id: string;
  session_id: string;
  visitor_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  created_at: string;
}

export interface FlipbookSettings {
  title: string;
  description: string;
  logo_url: string | null;
  watermark_text: string;
  watermark_opacity: number;
  allow_download: boolean;
  is_published: boolean;
}
