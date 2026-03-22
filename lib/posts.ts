import { supabase } from './supabase';

export type Verdict = 'GENIUS' | 'MAYBE' | 'COOKED';
export type PostStatus = 'draft' | 'ready' | 'published' | 'review' | 'error';

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;

  source_platform: string;
  conversation_type: string | null;

  title: string;
  slug: string;

  raw_input: string;
  clean_summary: string | null;
  core_idea: string | null;
  why_it_might_work: string | null;
  why_it_might_fail: string | null;
  mvp: string | null;

  verdict: Verdict;
  score: number;

  tags: string[];
  tone: string | null;

  needs_review: boolean;
  review_reason: string | null;

  status: PostStatus;

  image_url: string | null;
  image_prompt: string | null;
  image_style: string | null;

  published_at: string | null;

  metadata: Record<string, unknown>;
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }
  return data as Post;
}
