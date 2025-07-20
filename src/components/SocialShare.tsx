'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SocialShare({ url, title, description, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch {
        // Fallback to showing the menu
        setShowMenu(!showMenu);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full transition-colors"
        title="Share this business"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="text-sm font-medium text-gray-900 mb-2 px-2">Share this business</div>
            
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMenu(false)}
            >
              <Facebook className="h-4 w-4 mr-3 text-blue-600" />
              Facebook
            </a>
            
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMenu(false)}
            >
              <Twitter className="h-4 w-4 mr-3 text-blue-400" />
              Twitter
            </a>
            
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowMenu(false)}
            >
              <Linkedin className="h-4 w-4 mr-3 text-blue-700" />
              LinkedIn
            </a>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-3 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 mr-3 text-gray-600" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}