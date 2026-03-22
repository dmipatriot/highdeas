export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="w-full max-w-sm px-6 space-y-6">

        {/* Label */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          <span className="text-xs text-primary font-bold uppercase tracking-widest crt-glow">
            DECRYPTING_RECORD...
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-white/5 w-full overflow-hidden">
          <div className="h-full bg-primary animate-[progress_2.2s_ease-in-out_infinite]" />
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-primary animate-ping" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-primary animate-ping" style={{ animationDelay: '200ms' }} />
          <div className="w-1 h-1 bg-primary animate-ping" style={{ animationDelay: '400ms' }} />
        </div>

        {/* Flavor lines */}
        <div className="space-y-1.5 font-mono">
          {[
            '> FETCHING RECORD_HASH...',
            '> VERIFYING INTEGRITY_SEAL...',
            '> DECODING PAYLOAD...',
            '> RUNNING ANALYSIS_ENGINE_V4...',
          ].map((line) => (
            <div key={line} className="text-[10px] text-primary/30 animate-pulse">
              {line}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes progress {
          0%   { width: 0%; margin-left: 0%; }
          50%  { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
