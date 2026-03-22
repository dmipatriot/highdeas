import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 px-6">
      <div className="w-full max-w-md space-y-8">

        {/* Error code */}
        <div className="space-y-1">
          <div className="text-[10px] text-error/60 uppercase tracking-widest font-bold">
            SYSTEM_EXCEPTION // MODULE: RECORD_RESOLVER
          </div>
          <div className="text-[10px] text-white/10 uppercase tracking-widest">
            ──────────────────────────────────────
          </div>
        </div>

        {/* Big error headline */}
        <div>
          <div
            className="text-5xl md:text-6xl font-black text-error uppercase leading-none tracking-tighter mb-3"
            style={{ textShadow: '0 0 20px rgba(255,113,108,0.4)' }}
          >
            ERROR_404
          </div>
          <div className="text-lg font-bold text-error/70 uppercase tracking-widest">
            // RECORD_NOT_FOUND
          </div>
        </div>

        {/* Detail block */}
        <div className="border-l-2 border-error/30 pl-4 space-y-2">
          <div className="text-[11px] text-on-surface-variant/60 uppercase tracking-wider">
            &gt; QUERIED SLUG: UNKNOWN
          </div>
          <div className="text-[11px] text-on-surface-variant/60 uppercase tracking-wider">
            &gt; STATUS: NO_MATCH_IN_INDEX
          </div>
          <div className="text-[11px] text-on-surface-variant/60 uppercase tracking-wider">
            &gt; SUGGESTION: RECORD MAY HAVE BEEN PURGED OR NEVER EXISTED
          </div>
        </div>

        {/* Pinging dots */}
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-error/60 animate-ping" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-error/60 animate-ping" style={{ animationDelay: '200ms' }} />
          <div className="w-1 h-1 bg-error/60 animate-ping" style={{ animationDelay: '400ms' }} />
        </div>

        {/* Back link */}
        <Link
          href="/archive"
          className="inline-block text-[11px] text-on-surface-variant/50 hover:text-on-surface-variant uppercase tracking-widest transition-colors"
        >
          ← RETURN TO ARCHIVE
        </Link>

      </div>
    </div>
  );
}
