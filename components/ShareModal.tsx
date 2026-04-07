'use client';

import { useState, useEffect } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postSlug: string;
}

export default function ShareModal({ isOpen, onClose, postTitle, postSlug }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const postUrl = `https://ideaterminal.vercel.app/post/${postSlug}`;
  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const truncatedTitle = postTitle.length > 40 ? postTitle.slice(0, 40) + '...' : postTitle;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85" />
      <div
        className="relative z-10 w-full max-w-sm bg-[#0e0e0e] border border-[#00FF9C]/30 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-[#00FF9C] rounded-full animate-pulse" />
          <span className="text-[11px] font-bold text-[#00FF9C] tracking-widest uppercase">
            SHARE_ENCRYPTED // TRANSMISSION
          </span>
        </div>

        {/* Target */}
        <div className="text-[10px] text-[#ababab] uppercase tracking-widest mb-6">
          TARGET: {truncatedTitle.toUpperCase()}
        </div>

        {/* Share buttons */}
        <div className="flex flex-col gap-2 mb-4">
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-widest text-center py-3 px-4 border border-[#00FF9C]/30 text-[#ababab] hover:border-[#00FF9C] hover:text-[#00FF9C] transition-colors"
          >
            [[ X / TWITTER ]]
          </a>
          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-widest text-center py-3 px-4 border border-[#00FF9C]/30 text-[#ababab] hover:border-[#00FF9C] hover:text-[#00FF9C] transition-colors"
          >
            [[ FACEBOOK ]]
          </a>
          <a
            href={redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-widest text-center py-3 px-4 border border-[#00FF9C]/30 text-[#ababab] hover:border-[#00FF9C] hover:text-[#00FF9C] transition-colors"
          >
            [[ REDDIT ]]
          </a>
          <button
            onClick={handleCopy}
            className={`text-[11px] font-bold uppercase tracking-widest py-3 px-4 border transition-colors ${
              copied
                ? 'border-[#00FF9C] text-[#00FF9C]'
                : 'border-[#00FF9C]/30 text-[#ababab] hover:border-[#00FF9C] hover:text-[#00FF9C]'
            }`}
          >
            {copied ? '[[ LINK_COPIED // ]]' : '[[ COPY_LINK ]]'}
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full text-[11px] font-bold uppercase tracking-widest py-2 px-4 border border-[#ababab]/30 text-[#ababab] hover:border-[#00FF9C] hover:text-[#00FF9C] transition-colors"
        >
          [ CLOSE_TRANSMISSION ]
        </button>
      </div>
    </div>
  );
}
