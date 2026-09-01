import React, { useState, useEffect } from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { Menu, X, ExternalLink, Globe, Sun, Moon, Sparkles } from 'lucide-react';
import { PORTFOLIO_INFO, PORTFOLIO_ASSETS } from '../data/portfolioData';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme, t, isRtl } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: t('nav.work') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-[#131318]/92 backdrop-blur-xl border-b border-[#f2ca50]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(242,202,80,0.08)]'
            : 'bg-[#f7f4ec]/95 backdrop-blur-xl border-b border-[#c49a1b]/25 shadow-[0_4px_25px_rgba(0,0,0,0.06)]'
          : theme === 'dark'
          ? 'bg-[#131318]/70 backdrop-blur-md border-b border-[#f2ca50]/15'
          : 'bg-[#f7f4ec]/80 backdrop-blur-md border-b border-[#c49a1b]/20'
      }`}
    >
      <div className="flex justify-between items-center px-5 sm:px-8 md:px-12 lg:px-20 py-3.5 md:py-4 max-w-[1440px] mx-auto">
        {/* Brand Logo & Founder Avatar */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <AnimatedLogo size="md" />
            <img
              src={PORTFOLIO_ASSETS.avatar}
              alt="Mohammed Dhair"
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-[#f2ca50] object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-start">
            <span
              className={`font-display-lg text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors font-bold ${
                theme === 'dark' ? 'text-[#f2ca50] group-hover:text-[#ffe088]' : 'text-[#a67c00] group-hover:text-[#8c6800]'
              }`}
            >
              ELYVORI
            </span>
            <span
              className={`font-label-caps text-[9px] sm:text-[10px] tracking-widest ${
                theme === 'dark' ? 'text-[#d0c5af]/80' : 'text-[#6b6455]'
              }`}
            >
              {language === 'ar' ? 'محمد ظهير' : 'BY MOHAMMED DHAIR'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`text-xs md:text-sm transition-all duration-300 py-1 relative cursor-pointer ${
                    isRtl ? 'font-arabic font-semibold' : 'font-label-caps font-medium'
                  } ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-[#f2ca50] font-bold'
                        : 'text-[#8c6800] font-bold'
                      : theme === 'dark'
                      ? 'text-[#e4e1e9]/70 hover:text-[#f2ca50]'
                      : 'text-[#374151] hover:text-[#8c6800]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#f2ca50] via-[#ffd700] to-[#f2ca50] rounded-full shadow-[0_0_8px_rgba(242,202,80,0.6)]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Controls: Language Switcher, Theme Switcher & Upwork CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'dark'
                ? 'border-[#f2ca50]/30 bg-[#1b1b20] text-[#f2ca50] hover:bg-[#f2ca50]/15'
                : 'border-[#c49a1b]/40 bg-[#ffffff] text-[#8c6800] hover:bg-[#f2ca50]/20 shadow-sm'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="tracking-wide">{language === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* Theme Toggle (Day / Night) Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'تبديل إلى وضع النهار (Light)' : 'تبديل إلى وضع الليل (Dark)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'dark'
                ? 'border-[#f2ca50]/30 bg-[#1b1b20] text-[#f2ca50] hover:bg-[#f2ca50]/15'
                : 'border-[#c49a1b]/40 bg-[#ffffff] text-[#8c6800] hover:bg-[#f2ca50]/20 shadow-sm'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span className="hidden lg:inline text-[11px]">{t('nav.themeLight')}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#8c6800]" />
                <span className="hidden lg:inline text-[11px]">{t('nav.themeDark')}</span>
              </>
            )}
          </button>

          {/* Upwork CTA */}
          <a
            href={PORTFOLIO_INFO.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 ${
              theme === 'dark'
                ? 'border-[#f2ca50]/50 text-[#f2ca50] hover:bg-[#f2ca50]/15 glow-primary'
                : 'border-[#8c6800] bg-[#8c6800] text-white hover:bg-[#a67c00] shadow-md'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t('nav.topRated')}</span>
            <span className="xl:hidden">Upwork 100%</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Controls (Lang + Theme + Menu Toggle) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Lang toggle on mobile header */}
          <button
            onClick={toggleLanguage}
            className={`p-2 rounded-full border text-xs font-bold transition-colors ${
              theme === 'dark'
                ? 'border-[#f2ca50]/30 bg-[#1b1b20] text-[#f2ca50]'
                : 'border-[#c49a1b]/40 bg-white text-[#8c6800]'
            }`}
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Quick Theme toggle on mobile header */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border text-xs font-bold transition-colors ${
              theme === 'dark'
                ? 'border-[#f2ca50]/30 bg-[#1b1b20] text-[#f2ca50]'
                : 'border-[#c49a1b]/40 bg-white text-[#8c6800]'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#f2ca50]" /> : <Moon className="w-4 h-4 text-[#8c6800]" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors focus:outline-none ${
              theme === 'dark' ? 'text-[#f2ca50] hover:bg-[#1f1f25]' : 'text-[#8c6800] hover:bg-[#e9e3d3]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 border-b transition-all ${
            theme === 'dark'
              ? 'bg-[#131318]/98 border-[#f2ca50]/20 text-[#e4e1e9]'
              : 'bg-[#f7f4ec]/98 border-[#c49a1b]/30 text-[#1a1a20]'
          } backdrop-blur-2xl`}
        >
          <ul className="flex flex-col gap-3 mb-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-start py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] border-s-4 border-[#f2ca50]'
                          : 'bg-[#8c6800]/10 text-[#8c6800] border-s-4 border-[#8c6800]'
                        : theme === 'dark'
                        ? 'text-[#e4e1e9]/80 hover:bg-[#1f1f25]'
                        : 'text-[#374151] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={`pt-4 border-t flex flex-col gap-3.5 ${theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e0d8c7]'}`}>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className={theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}>{t('nav.available')}</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${theme === 'dark' ? 'bg-[#f2ca50]/15 text-[#f2ca50]' : 'bg-[#8c6800]/15 text-[#8c6800]'}`}>
                {t('hero.score')}
              </span>
            </div>

            <a
              href={PORTFOLIO_INFO.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex justify-center items-center gap-2 py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-md ${
                theme === 'dark'
                  ? 'bg-[#f2ca50] text-[#131318] hover:bg-[#ffe088]'
                  : 'bg-[#8c6800] text-white hover:bg-[#a67c00]'
              }`}
            >
              <span>{t('nav.hireUpwork')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
