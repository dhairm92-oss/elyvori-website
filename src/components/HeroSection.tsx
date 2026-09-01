import React, { useState, useEffect, useRef } from 'react';
import {
  TYPEWRITER_PHRASES_EN,
  TYPEWRITER_PHRASES_AR,
  PORTFOLIO_INFO,
  PORTFOLIO_ASSETS,
} from '../data/portfolioData';
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Layers,
  ArrowDown,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroSectionProps {
  onViewWork: () => void;
  onHireMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onHireMe }) => {
  const { language, theme, t, isRtl } = useApp();
  const phrases = language === 'ar' ? TYPEWRITER_PHRASES_AR : TYPEWRITER_PHRASES_EN;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 3D Mouse Parallax & Tilt State
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Reset indices when language changes
  useEffect(() => {
    setPhraseIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [language]);

  // Robust Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length] || '';
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  // Mouse move handler for 3D parallax & tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized coordinates (-1 to 1)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max rotation angles (degrees)
    const maxRotate = 8;
    const rotateY = normX * maxRotate;
    const rotateX = -normY * maxRotate;

    setTilt({
      x: normX * 16,
      y: normY * 16,
      rotateX,
      rotateY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const currentPhrase = phrases[phraseIndex] || phrases[0];
  const displayedText = currentPhrase.substring(0, charIndex);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] md:min-h-[90vh] w-full flex items-center justify-center pt-8 md:pt-12 pb-14 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f2ca50]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0468d7]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN (or RIGHT in RTL): Typography, Bio, Call to Action, Stats     */}
        {/* ========================================================================= */}
        <div
          className={`lg:col-span-7 flex flex-col items-start text-start ${
            isRtl ? 'order-1 lg:order-1' : 'order-1 lg:order-1'
          }`}
        >
          {/* Top Floating Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md mb-6 shadow-sm ${
              theme === 'dark'
                ? 'bg-[#1b1b20]/90 border-[#f2ca50]/30 text-[#f2ca50]'
                : 'bg-white/90 border-[#c49a1b]/40 text-[#8c6800]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase font-headline">
              {t('hero.badge')}
            </span>
            <span className={theme === 'dark' ? 'text-[#4d4635]' : 'text-[#c49a1b]'}>•</span>
            <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('hero.score')}
            </span>
          </div>

          {/* Big Brand Title: ELYVORI */}
          <div className="space-y-1 mb-4 select-none">
            <h1
              className={`font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-[98px] xl:text-[112px] leading-[0.92] font-extrabold transition-all duration-300 ${
                theme === 'dark'
                  ? 'heading-luxury-gold drop-shadow-[0_12px_40px_rgba(242,202,80,0.3)]'
                  : 'text-[#8c6800] drop-shadow-[0_4px_20px_rgba(140,104,0,0.18)]'
              }`}
            >
              {t('hero.title')}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <span
                className={`h-[2px] w-14 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#f2ca50] to-transparent'
                    : 'bg-gradient-to-r from-[#8c6800] to-transparent'
                }`}
              />
              <p
                className={`text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase ${
                  theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#574f3e]'
                } ${isRtl ? 'font-arabic tracking-normal font-bold text-sm sm:text-lg' : 'font-headline'}`}
              >
                {t('hero.by')}
              </p>
            </div>
          </div>

          {/* Dynamic Typewriter Heading */}
          <div className="min-h-[56px] md:min-h-[68px] flex items-center my-3">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-[#acc7ff]' : 'text-[#0468d7]'
              } ${isRtl ? 'font-arabic' : 'font-headline'}`}
            >
              <span>{displayedText}</span>
              <span className="inline-block w-1.5 h-7 md:h-9 mx-1.5 bg-[#f2ca50] rounded-sm animate-pulse align-middle shadow-[0_0_12px_rgba(242,202,80,0.8)]" />
            </h2>
          </div>

          {/* Subtitle / Bio Paragraph */}
          <p
            className={`text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 font-normal ${
              theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#374151]'
            } ${isRtl ? 'font-arabic text-base sm:text-lg leading-loose' : 'font-body'}`}
          >
            {t('hero.bio')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4 w-full max-w-2xl mb-10">
            <button
              onClick={onViewWork}
              className={`text-xs md:text-sm font-bold px-7 py-3.5 rounded-full hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#f2ca50] hover:bg-[#ffe088] text-[#131318] glow-primary'
                  : 'bg-[#8c6800] hover:bg-[#a67c00] text-white shadow-md'
              } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
            >
              <span>{t('hero.viewWork')}</span>
              <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً مهندس محمد، أود استشارتك بخصوص مشروع جديد.'
                  : 'Hello Mohammed, I would like to consult with you about a new project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs md:text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] ${
                isRtl ? 'font-arabic' : 'font-label-caps'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{language === 'ar' ? 'استشارة واتساب فورية' : 'WhatsApp Consultation'}</span>
            </a>

            <a
              href={PORTFOLIO_INFO.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs md:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer border ${
                theme === 'dark'
                  ? 'bg-[#1b1b20]/80 hover:bg-[#f2ca50]/15 border-[#f2ca50]/40 text-[#f2ca50] hover:text-[#ffe088] glow-secondary'
                  : 'bg-white hover:bg-[#f7f4ec] border-[#c49a1b]/40 text-[#8c6800] hover:text-[#a67c00] shadow-sm'
              } ${isRtl ? 'font-arabic font-bold' : 'font-label-caps'}`}
            >
              <span>{t('hero.hireMe')}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#37beff]" />
            </a>
          </div>

          {/* Quantitative Highlights Strip */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-2xl p-4 sm:p-5 rounded-2xl border backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-[#1b1b20]/80 border-[#f2ca50]/25 shadow-2xl'
                : 'bg-white/90 border-[#c49a1b]/35 shadow-lg'
            }`}
          >
            <div className="flex flex-col items-center sm:items-start p-2">
              <span
                className={`text-2xl sm:text-3xl font-bold font-headline ${
                  theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                }`}
              >
                {PORTFOLIO_INFO.yearsExperience}
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider mt-1 ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
              >
                {t('hero.stat.years')}
              </span>
            </div>

            <div
              className={`flex flex-col items-center sm:items-start p-2 ${
                isRtl ? 'border-r' : 'border-l'
              } ${theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e5e7eb]'}`}
            >
              <span
                className={`text-2xl sm:text-3xl font-bold font-headline ${
                  theme === 'dark' ? 'text-[#acc7ff]' : 'text-[#0468d7]'
                }`}
              >
                {PORTFOLIO_INFO.completedProjects}
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider mt-1 ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('hero.stat.apps')}
              </span>
            </div>

            <div
              className={`flex flex-col items-center sm:items-start p-2 ${
                isRtl ? 'border-r' : 'border-l'
              } ${theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e5e7eb]'}`}
            >
              <span
                className={`text-2xl sm:text-3xl font-bold font-headline ${
                  theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                }`}
              >
                100%
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider mt-1 ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('hero.stat.success')}
              </span>
            </div>

            <div
              className={`flex flex-col items-center sm:items-start p-2 ${
                isRtl ? 'border-r' : 'border-l'
              } ${theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e5e7eb]'}`}
            >
              <span className="text-2xl sm:text-3xl font-bold font-headline text-emerald-500">
                0
              </span>
              <span
                className={`text-[11px] uppercase tracking-wider mt-1 ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('hero.stat.rejections')}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN (or LEFT in RTL): Large 3D Executive Holographic Portrait     */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`lg:col-span-5 relative w-full flex items-center justify-center ${
            isRtl ? 'order-2 lg:order-2' : 'order-2 lg:order-2'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* 1. Golden Glowing Backlight Aura (3D Halo) */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[40px] bg-gradient-to-tr from-[#f2ca50]/30 via-[#d4af37]/20 to-[#37beff]/15 blur-3xl opacity-75 animate-pulse-subtle pointer-events-none -z-10"
            style={{
              transform: `translate(${tilt.x * 0.4}px, ${tilt.y * 0.4}px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
            }}
          />

          {/* 2. Floating 3D Specular Spheres around the portrait */}
          {/* Sphere 1: Top-Left Large Gold Sphere */}
          <div
            className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full metallic-gold-sphere animate-float-slow z-30 pointer-events-none"
            style={{
              transform: `translate3d(${-tilt.x * 1.2}px, ${-tilt.y * 1.2}px, 40px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
            }}
          />

          {/* Sphere 2: Bottom-Right Medium Azure Sphere */}
          <div
            className="absolute -bottom-5 -right-5 sm:-bottom-7 sm:-right-7 w-10 h-10 sm:w-12 sm:h-12 rounded-full metallic-blue-sphere animate-float-reverse z-30 pointer-events-none"
            style={{
              transform: `translate3d(${tilt.x * 1.4}px, ${tilt.y * 1.4}px, 50px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
            }}
          />

          {/* Sphere 3: Right Center Mini Chrome Sphere */}
          <div
            className="absolute top-1/2 -right-6 sm:-right-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full metallic-chrome-sphere animate-float-gentle z-30 pointer-events-none"
            style={{
              transform: `translate3d(${tilt.x * 0.9}px, ${tilt.y * 0.9}px, 30px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
            }}
          />

          {/* Sphere 4: Bottom Left Small Gold Sphere */}
          <div
            className="absolute bottom-12 -left-4 w-6 h-6 rounded-full metallic-gold-sphere animate-float-slow z-30 pointer-events-none"
            style={{
              transform: `translate3d(${-tilt.x * 0.8}px, ${tilt.y * 0.8}px, 25px)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
            }}
          />

          {/* 3. The Main 3D Floating Portrait Card Container */}
          <div
            className={`relative w-full max-w-[480px] lg:max-w-none rounded-3xl p-3 sm:p-4 border transition-all duration-200 shadow-2xl glass-card overflow-hidden group ${
              theme === 'dark'
                ? 'bg-[#1b1b20]/90 border-[#f2ca50]/50 shadow-[0_25px_60px_-15px_rgba(242,202,80,0.25)]'
                : 'bg-white/95 border-[#c49a1b]/60 shadow-[0_25px_50px_-12px_rgba(140,104,0,0.2)]'
            }`}
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
                isHovered ? 1.02 : 1
              }, ${isHovered ? 1.02 : 1}, 1)`,
              transformStyle: 'preserve-3d',
              transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* Top Decorative Corner Accent Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#f2ca50] z-20 pointer-events-none rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#f2ca50] z-20 pointer-events-none rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#f2ca50] z-20 pointer-events-none rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#f2ca50] z-20 pointer-events-none rounded-br-sm" />

            {/* Subtle Glass Surface Reflection Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Inner Gold Bevel Border Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-[#f2ca50]/40 shadow-inner bg-black/40">
              
              {/* Executive Portrait Image */}
              <img
                src={PORTFOLIO_ASSETS.portrait}
                alt="Mohammed Dhair - Lead Flutter Architect"
                className="w-full h-auto min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[530px] object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Bottom Vignette with Gold Ambient Lighting */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark'
                    ? 'from-[#131318] via-[#131318]/20 to-transparent'
                    : 'from-[#1a1a20]/80 via-transparent to-transparent'
                } pointer-events-none`}
              />

              {/* Bottom Identity Overlay Banner */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3.5 rounded-2xl bg-[#131318]/85 border border-[#f2ca50]/40 backdrop-blur-xl shadow-xl text-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-[#f2ca50]">
                      {language === 'ar' ? PORTFOLIO_INFO.nameAr : PORTFOLIO_INFO.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#acc7ff] font-mono mt-0.5">
                    {language === 'ar'
                      ? 'مؤسس ELYVORI • كبير مهندسي فلاتر'
                      : 'Founder of ELYVORI • Lead Flutter Architect'}
                  </p>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2ca50]/15 border border-[#f2ca50]/30 text-[#f2ca50] text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>120Hz</span>
                </div>
              </div>
            </div>

            {/* 4. Holographic Floating Badge 1: Top-Right Glass Badge */}
            <div
              className={`absolute top-6 ${
                isRtl ? 'left-6' : 'right-6'
              } z-30 px-3.5 py-1.5 rounded-xl border shadow-xl backdrop-blur-xl flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-[#131318]/90 border-[#f2ca50]/50 text-[#f2ca50]'
                  : 'bg-white/95 border-[#c49a1b]/60 text-[#8c6800]'
              }`}
              style={{
                transform: `translateZ(30px) translate(${tilt.x * 0.5}px, ${tilt.y * 0.5}px)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
              }}
            >
              <Award className="w-4 h-4 text-[#f2ca50] shrink-0" />
              <div className="flex flex-col text-start">
                <span className="text-[10px] font-bold font-headline uppercase leading-tight">
                  {language === 'ar' ? 'أفضل كفاءة مصنفة' : 'Top Rated Plus'}
                </span>
                <span className="text-[9px] font-mono text-emerald-400 font-semibold leading-tight">
                  {language === 'ar' ? 'نسبة نجاح 100%' : '100% Job Success'}
                </span>
              </div>
            </div>

            {/* 5. Holographic Floating Badge 2: Mid-Left Glass Badge */}
            <div
              className={`absolute top-28 ${
                isRtl ? 'right-6' : 'left-6'
              } z-30 px-3 py-1.5 rounded-xl border shadow-xl backdrop-blur-xl flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-[#131318]/90 border-[#37beff]/40 text-[#acc7ff]'
                  : 'bg-white/95 border-[#0468d7]/40 text-[#0468d7]'
              }`}
              style={{
                transform: `translateZ(25px) translate(${-tilt.x * 0.4}px, ${-tilt.y * 0.4}px)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
              }}
            >
              <Zap className="w-3.5 h-3.5 text-[#37beff] shrink-0" />
              <span className="text-[10px] font-mono font-bold">
                {language === 'ar' ? 'هندسة معمارية نظيفة' : 'Clean Arch & Bloc'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
