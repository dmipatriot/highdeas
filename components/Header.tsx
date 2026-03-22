'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'LIVE_FEED', href: '/' },
  { label: 'ARCHIVE', href: '/archive' },
  { label: 'DEEP_DIVE', href: '/post' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-black/90 border-b border-[#00FF9C]/10 shadow-[0_0_20px_rgba(0,255,156,0.1)] flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="font-bold text-sm tracking-widest text-[#00FF9C] animate-pulse crt-glow select-none"
        >
          [HIGHDEAS]
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1 text-xs tracking-widest transition-colors ${
                  isActive
                    ? 'text-[#00FF9C]'
                    : 'text-[#ababab] opacity-70 hover:text-[#00FF9C] hover:opacity-100'
                }`}
              >
                [{label}]
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-[10px] tracking-widest text-[#ababab] opacity-60 uppercase">
          SYSTEM_v4.0.2 // CONNECTION_SECURE
        </span>
        <span className="material-symbols-outlined text-[#00FF9C] opacity-60 text-xl">
          terminal
        </span>
        <span className="material-symbols-outlined text-[#00FF9C] opacity-60 text-xl">
          sensors
        </span>
      </div>
    </header>
  );
}
