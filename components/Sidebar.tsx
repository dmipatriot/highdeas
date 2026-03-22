'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'LIVE_FEED', href: '/', icon: 'sensors' },
  { label: 'ARCHIVE', href: '/archive', icon: 'inventory_2' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 bottom-0 w-64 bg-black border-r border-[#00FF9C]/10 z-40">
      {/* Process monitor block */}
      <div className="px-4 py-3 border-b border-[#00FF9C]/10">
        <p className="text-[10px] tracking-widest text-[#ababab] uppercase opacity-60">
          PROCESS_MONITOR
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 bg-[#00FF9C] animate-pulse" />
          <p className="text-xs tracking-widest text-[#00FF9C]">STATUS: ACTIVE</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 text-xs tracking-widest transition-colors ${
                isActive
                  ? 'bg-[#00FF9C]/10 text-[#00FF9C] border-l-4 border-[#00FF9C]'
                  : 'text-[#ababab] opacity-70 hover:bg-[#00FF9C]/5 hover:opacity-100 border-l-4 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-base leading-none">
                {icon}
              </span>
              [{label}]
            </Link>
          );
        })}
      </nav>

      {/* Log out */}
      <div className="border-t border-[#00FF9C]/10 py-2">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs tracking-widest text-[#ababab] opacity-70 hover:bg-[#00FF9C]/5 hover:opacity-100 transition-colors border-l-4 border-transparent">
          <span className="material-symbols-outlined text-base leading-none">
            logout
          </span>
          LOG_OUT
        </button>
      </div>
    </aside>
  );
}
