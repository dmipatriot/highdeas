'use client';

import { useRouter } from 'next/navigation';
import { Post, Verdict } from '@/lib/posts';

function verdictLabel(verdict: Verdict): { text: string; className: string } {
  switch (verdict) {
    case 'GENIUS':
      return { text: '[ DECODED ]', className: 'text-primary-container' };
    case 'COOKED':
      return { text: '[ CORRUPTED ]', className: 'text-error' };
    case 'MAYBE':
      return { text: '[ ARCHIVED ]', className: 'text-[#ababab]' };
  }
}

function hexId(id: string): string {
  return '0x' + id.replace(/-/g, '').slice(0, 6).toUpperCase();
}

function formatTs(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function normalizeTags(tags: Post['tags']): string[] {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try { return JSON.parse(tags); } catch { return []; }
  }
  return [];
}

export default function ArchiveRow({ post }: { post: Post }) {
  const router = useRouter();
  const verdict = verdictLabel(post.verdict);
  const tags = normalizeTags(post.tags);
  const category = tags[0] ?? '—';

  return (
    <tr
      onClick={() => router.push(`/post/${post.slug}`)}
      className="border-b border-white/5 hover:bg-[#00FF9C]/5 cursor-pointer group transition-colors"
    >
      <td className="px-4 py-3 text-[11px] text-on-surface-variant font-mono whitespace-nowrap">
        {hexId(post.id)}
      </td>
      <td className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors">
        {post.title.toUpperCase()}
      </td>
      <td className="px-4 py-3 text-[11px] text-on-surface-variant uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
        {category.toUpperCase()}
      </td>
      <td className="px-4 py-3 text-[11px] text-on-surface-variant whitespace-nowrap hidden lg:table-cell">
        {formatTs(post.created_at)}
      </td>
      <td className={`px-4 py-3 text-[11px] font-bold whitespace-nowrap ${verdict.className}`}>
        {verdict.text}
      </td>
    </tr>
  );
}
