import Link from 'next/link';
import { getAllPublishedPosts } from '@/lib/posts';
import ArchiveRow from './ArchiveRow';

const PAGE_SIZE = 20;

const SECTOR_HEALTH = [
  { label: 'IDEATION', pct: 87 },
  { label: 'VALIDATION', pct: 63 },
  { label: 'EXECUTION', pct: 41 },
  { label: 'SCALING', pct: 29 },
];

const SYSTEM_LOGS = [
  '> ARCHIVE_DAEMON v4.1 ACTIVE',
  '> LAST_SYNC: 00:00:14 AGO',
  '> INTEGRITY_CHECK: PASS',
  '> INDEX_REBUILT: 1,024 NODES',
  '> ANOMALIES_DETECTED: 0',
  '> AWAITING_NEXT_FLUSH...',
];

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const allPosts = await getAllPublishedPosts();
  const total = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam ?? 1) || 1), totalPages);
  const offset = (page - 1) * PAGE_SIZE;
  const posts = allPosts.slice(offset, offset + PAGE_SIZE);
  const showing = posts.length;

  return (
    <div className="cursor-crosshair min-h-screen bg-background px-4 md:px-8 py-10 max-w-6xl mx-auto">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary crt-glow uppercase tracking-tighter mb-2">
          &gt; _ARCHIVE_DUMP_STREAM
        </h1>
        <p className="text-xs text-on-surface-variant uppercase tracking-widest">
          {total} RECORD{total !== 1 ? 'S' : ''} FOUND // DATABASE: HIGHDEAS_V4 // STATUS: ONLINE
        </p>
      </div>

      {/* ── Table container ────────────────────────────────── */}
      <div className="border border-[#00FF9C]/10 bg-surface-container-lowest overflow-hidden mb-8">

        {/* Controls bar */}
        <div className="bg-[#00FF9C]/5 border-b border-[#00FF9C]/10 p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">
            <span className="text-primary/60">QUERY:</span>{' '}
            SELECT * FROM IDEAS WHERE STATUS=&apos;PUBLISHED&apos;{' '}
            <span className="text-on-surface-variant/50">// LIMIT: 100</span>
          </div>
          <div className="flex gap-2">
            <button className="text-[10px] border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 px-3 py-1.5 uppercase tracking-widest transition-colors">
              [ EXPORT_CSV ]
            </button>
            <button className="text-[10px] border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 px-3 py-1.5 uppercase tracking-widest transition-colors">
              [ FILTER_RECORDS ]
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold whitespace-nowrap">
                  HEX_ID
                </th>
                <th className="px-4 py-3 text-left text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
                  SCHEMA_NAME
                </th>
                <th className="px-4 py-3 text-left text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold hidden md:table-cell whitespace-nowrap">
                  CATEGORY
                </th>
                <th className="px-4 py-3 text-left text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold hidden lg:table-cell whitespace-nowrap">
                  TIMESTAMP
                </th>
                <th className="px-4 py-3 text-left text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold whitespace-nowrap">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-[11px] text-on-surface-variant/40 uppercase tracking-widest"
                  >
                    NO RECORDS FOUND // STREAM EMPTY
                  </td>
                </tr>
              ) : (
                posts.map((post) => <ArchiveRow key={post.id} post={post} />)
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-surface-container-high border-t border-[#00FF9C]/10 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">
            PAGE{' '}
            <span className="text-primary font-bold">
              [ {String(page).padStart(2, '0')} / {String(totalPages).padStart(2, '0')} ]
            </span>
            {' '}// SHOWING{' '}
            <span className="text-on-surface">{showing}</span> OF{' '}
            <span className="text-on-surface">{total}</span> ENTRIES
          </div>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={`/archive?page=${page - 1}`}
                className="text-[10px] border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 px-3 py-1.5 uppercase tracking-widest transition-colors"
              >
                [ PREV ]
              </Link>
            ) : (
              <span className="text-[10px] border border-white/5 text-on-surface-variant/20 px-3 py-1.5 uppercase tracking-widest">
                [ PREV ]
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={`/archive?page=${page + 1}`}
                className="text-[10px] border border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 px-3 py-1.5 uppercase tracking-widest transition-colors"
              >
                [ NEXT ]
              </Link>
            ) : (
              <span className="text-[10px] border border-white/5 text-on-surface-variant/20 px-3 py-1.5 uppercase tracking-widest">
                [ NEXT ]
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Visualization module ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* SECTOR_HEALTH */}
        <div className="border border-[#00FF9C]/10 bg-surface-container-lowest p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
              SECTOR_HEALTH
            </span>
          </div>
          <div className="space-y-3">
            {SECTOR_HEALTH.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-on-surface-variant uppercase tracking-widest">
                    {s.label}
                  </span>
                  <span className="text-[9px] text-primary font-bold">{s.pct}%</span>
                </div>
                <div className="h-1 bg-white/5">
                  <div
                    className="h-full bg-primary/60 transition-all"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DATA_INTEGRITY */}
        <div className="border border-[#00FF9C]/10 bg-surface-container-lowest p-5 flex flex-col items-center justify-center">
          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">
            DATA_INTEGRITY
          </div>
          <div className="text-6xl font-black text-primary crt-glow mb-2">
            {total > 0 ? '99%' : '—'}
          </div>
          <div className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest text-center">
            {total} RECORDS VERIFIED
            <br />
            0 CORRUPTIONS DETECTED
          </div>
        </div>

        {/* SYSTEM_LOGS */}
        <div className="border border-[#00FF9C]/10 bg-black p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
              SYSTEM_LOGS
            </span>
          </div>
          <div className="space-y-1.5 font-mono">
            {SYSTEM_LOGS.map((line, i) => (
              <div key={i} className="text-[10px] text-primary/50 leading-tight">
                {line}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
