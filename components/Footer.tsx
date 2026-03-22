export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-black border-t border-[#00FF9C]/20 flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-widest text-[#ababab] opacity-60 uppercase">
          UPTIME: 99.99% // LOGS_FLUSHED
        </span>
        <span className="text-[10px] tracking-widest text-[#00FF9C] opacity-60 uppercase">
          [SYS_STATUS: OPTIMAL]
        </span>
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center gap-3">
        <span className="text-[10px] tracking-widest text-[#ababab] opacity-60 uppercase">
          [SYS_STATUS]
        </span>
        <span className="text-[10px] tracking-widest text-[#ababab] opacity-60 uppercase">
          [LATENCY: 14ms]
        </span>
        <span className="text-[10px] tracking-widest text-[#ababab] opacity-60 uppercase">
          [KERNEL_v8]
        </span>
      </div>
    </footer>
  );
}
