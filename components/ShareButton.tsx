'use client';

import { useState } from 'react';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  postTitle: string;
  postSlug: string;
}

export default function ShareButton({ postTitle, postSlug }: ShareButtonProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsShareOpen(true)}
        className="text-primary hover:text-primary-container transition-colors animate-pulse crt-glow"
      >
        [[ ↑ SHARE ]]
      </button>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        postTitle={postTitle}
        postSlug={postSlug}
      />
    </>
  );
}
