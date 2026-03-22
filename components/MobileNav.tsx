'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'LIVE_FEED', href: '/', icon: 'sensors' },
  { label: 'ARCHIVE', href: '/archive', icon: 'inventory_2' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-black border-t border-white/10 flex items-stretch">
      {TABS.map(({ label, href, icon }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[9px] tracking-widest transition-colors ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-400 border-t-2 border-emerald-400'
                : 'text-[#ababab] opacity-70 border-t-2 border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-xl leading-none">
              {icon}
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
