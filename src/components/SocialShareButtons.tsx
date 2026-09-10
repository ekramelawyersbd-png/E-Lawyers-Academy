import React, { useState } from 'react';
import { Share2, Check, Copy, Linkedin, Facebook, Twitter, MessageCircle } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  subtitle?: string;
  type: 'course' | 'certificate';
  certId?: string;
  compact?: boolean;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  title,
  subtitle,
  type,
  certId,
  compact = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Generate public shareable URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://elawyersacademy.com';
  const shareUrl = certId
    ? `${baseUrl}/?cert=${encodeURIComponent(certId)}`
    : `${baseUrl}/?course=${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`;

  const shareText =
    type === 'certificate'
      ? `I'm excited to share that I have earned an Official Certification in "${title}" from E-Lawyers Academy! 🏆 Certificate ID: ${certId || ''}`
      : `Check out this professional training course: "${title}" at E-Lawyers Academy! Master tax law, VAT, and corporate compliance. 📚`;

  const handleShare = (platform: 'linkedin' | 'facebook' | 'twitter' | 'whatsapp') => {
    let url = '';
    if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    } else if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handleShare('linkedin')}
          title="Share on LinkedIn"
          className="p-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
          className="p-2 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          title="Share on WhatsApp"
          className="p-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            {type === 'certificate' ? 'Share Certification to Professional Network' : 'Share Course with Colleagues'}
          </h4>
        </div>
        {copied && (
          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md animate-in fade-in">
            Link copied!
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500 font-medium">
        {type === 'certificate'
          ? 'Showcase your official achievement on LinkedIn or Facebook to boost your professional profile.'
          : 'Spread the word about this course to fellow tax practitioners and legal advisors.'}
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* LinkedIn Button */}
        <button
          onClick={() => handleShare('linkedin')}
          className="px-4 py-2 bg-[#0A66C2] hover:bg-[#084e96] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Linkedin className="w-4 h-4" />
          <span>Share on LinkedIn</span>
        </button>

        {/* Facebook Button */}
        <button
          onClick={() => handleShare('facebook')}
          className="px-4 py-2 bg-[#1877F2] hover:bg-[#0f5fc4] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <Facebook className="w-4 h-4" />
          <span>Share on Facebook</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1da851] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-extrabold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
