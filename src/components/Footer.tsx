import React, { useState } from 'react';
import { Code, Share2, Briefcase, Mail, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, theme, t, isRtl } = useApp();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ELYVORI by Mohammed Dhair - Flutter Architect',
          text:
            language === 'ar'
              ? 'معرض أعمال محمد ظهير - كبير مهندسي ومطوري تطبيقات فلاتر (Flutter).'
              : "Check out Mohammed Dhair's Flutter Developer & Mobile Architecture portfolio.",
          url: window.location.href,
        });
      } catch (err) {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer
      id="main-footer"
      className={`w-full py-10 border-t text-xs sm:text-sm transition-colors ${
        theme === 'dark'
          ? 'bg-[#0e0e13] border-[#f2ca50]/15 text-[#d0c5af]'
          : 'bg-[#ede7d8] border-[#c49a1b]/20 text-[#574f3e]'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto space-y-4 md:space-y-0">
        {/* Brand */}
        <div
          className={`font-display-lg text-xl md:text-2xl font-bold tracking-wider ${
            theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
          }`}
        >
          {t('footer.brand')}
        </div>

        {/* Center line */}
        <p className="text-xs sm:text-sm text-center md:text-start font-medium">
          {t('footer.rights')}
        </p>

        {/* Action icons & Copy notification */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse relative">
          {copied && (
            <span
              className={`absolute -top-9 right-0 px-2.5 py-1 rounded text-[11px] font-mono shadow-md flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-[#1b1b20] text-[#f2ca50] border border-[#f2ca50]/40'
                  : 'bg-white text-[#8c6800] border border-[#c49a1b]/40'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>{t('footer.copied')}</span>
            </span>
          )}

          <a
            href={PORTFOLIO_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              theme === 'dark'
                ? 'border-[#4d4635] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/50 hover:bg-[#f2ca50]/10'
                : 'border-[#c49a1b]/40 text-[#574f3e] hover:text-[#8c6800] hover:border-[#8c6800] hover:bg-white'
            }`}
          >
            <Code className="w-4 h-4" />
          </a>

          <button
            onClick={handleShare}
            title="Share"
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'border-[#4d4635] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/50 hover:bg-[#f2ca50]/10'
                : 'border-[#c49a1b]/40 text-[#574f3e] hover:text-[#8c6800] hover:border-[#8c6800] hover:bg-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <a
            href={PORTFOLIO_INFO.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Upwork"
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              theme === 'dark'
                ? 'border-[#4d4635] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/50 hover:bg-[#f2ca50]/10'
                : 'border-[#c49a1b]/40 text-[#574f3e] hover:text-[#8c6800] hover:border-[#8c6800] hover:bg-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PORTFOLIO_INFO.primaryEmail}`}
            title="Email"
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
              theme === 'dark'
                ? 'border-[#4d4635] text-[#d0c5af] hover:text-[#f2ca50] hover:border-[#f2ca50]/50 hover:bg-[#f2ca50]/10'
                : 'border-[#c49a1b]/40 text-[#574f3e] hover:text-[#8c6800] hover:border-[#8c6800] hover:bg-white'
            }`}
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
