import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  Trophy,
  Smartphone,
  CheckCircle2,
  Bot,
  Database,
  MessageCircle,
  TrendingUp,
  Zap,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Flame,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface TickerItem {
  id: string;
  tagAr: string;
  tagEn: string;
  tagColor: string;
  icon: any;
  headlineAr: string;
  headlineEn: string;
  subAr: string;
  subEn: string;
  badgeAr?: string;
  badgeEn?: string;
  linkAction?: string;
}

export const BreakingNewsTicker3D: React.FC<{
  onNavigateSection?: (sectionId: string) => void;
}> = ({ onNavigateSection }) => {
  const { language, theme, isRtl } = useApp();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);

  // News ticker data items
  const tickerItems: TickerItem[] = [
    {
      id: 'upwork',
      tagAr: 'إنجاز عالمي',
      tagEn: 'MILESTONE',
      tagColor: '#f2ca50',
      icon: Trophy,
      headlineAr: 'رتبة Top Rated Plus على Upwork بنسبة نجاح 100%',
      headlineEn: 'Upwork Top Rated Plus Badge with 100% Job Success Rate',
      subAr: 'تقييم 5.0/5.0 ورضا كامل من جميع العملاء الدوليين والشركات الناشئة',
      subEn: 'Verified 5.0/5.0 Rating across all international client contracts',
      badgeAr: 'TOP 1%',
      badgeEn: 'TOP 1%',
      linkAction: 'experience',
    },
    {
      id: 'flutter',
      tagAr: 'تطوير الجوال',
      tagEn: 'FLUTTER ARCH',
      tagColor: '#37beff',
      icon: Smartphone,
      headlineAr: 'خبرة 5+ سنوات وأكثر من 8 تطبيقات إنتاجية منشورة',
      headlineEn: '5+ Years Production Architecture & 8+ Live Published Mobile Apps',
      subAr: 'بنية معمارية Clean Architecture / Bloc فائقة السرعة والسلاسة',
      subEn: 'Enterprise BLoC pattern with 60/120Hz native performance',
      badgeAr: '5+ YEARS',
      badgeEn: '5+ YEARS',
      linkAction: 'work',
    },
    {
      id: 'stores',
      tagAr: 'اعتماد المتاجر',
      tagEn: 'ZERO REJECTION',
      tagColor: '#10b981',
      icon: CheckCircle2,
      headlineAr: 'نسبة قبول 100% من المرة الأولى على App Store و Google Play',
      headlineEn: '100% First-Time Store Approval on Apple App Store & Google Play',
      subAr: 'سجل نظيف بنسبة 0% رفض عبر كامل دورات إطلاق التطبيقات',
      subEn: '0% rejection record adhering strictly to iOS & Android guidelines',
      badgeAr: '100% APPROVED',
      badgeEn: '100% APPROVED',
      linkAction: 'work',
    },
    {
      id: 'ai',
      tagAr: 'ذكاء اصطناعي',
      tagEn: 'AI & LLM',
      tagColor: '#a855f7',
      icon: Bot,
      headlineAr: 'استراتيجيات وحلول الذكاء الاصطناعي وتكامل Gemini & OpenAI',
      headlineEn: 'Advanced AI Strategies, Gemini & OpenAI LLM Integration',
      subAr: 'هندسة الأوامر المتقدمة وأتمتة سير العمل الذكي داخل تطبيقات الهواتف',
      subEn: 'Prompt engineering, RAG pipelines, and intelligent mobile features',
      badgeAr: 'AI POWERED',
      badgeEn: 'AI POWERED',
      linkAction: 'skills',
    },
    {
      id: 'data',
      tagAr: 'إدارة البيانات',
      tagEn: 'DATA PRECISION',
      tagColor: '#38bdf8',
      icon: Database,
      headlineAr: 'إدخال وهيكلة ومعالجة البيانات الاحترافية بدقة 100%',
      headlineEn: 'High-Precision 100% QA Structured Data Entry & ETL Management',
      subAr: 'تدقيق الجودة، تطبيع المخططات وقواعد البيانات، وعمليات الهيكلة',
      subEn: 'Data cleansing, schema normalization, and robust pipeline operations',
      badgeAr: '100% ACCURATE',
      badgeEn: '100% ACCURATE',
      linkAction: 'skills',
    },
    {
      id: 'whatsapp',
      tagAr: 'استشارة فورية',
      tagEn: 'LIVE CONSULT',
      tagColor: '#25D366',
      icon: MessageCircle,
      headlineAr: 'متاح الآن للاستشارة الفنية المجانية المباشرة عبر واتساب',
      headlineEn: 'Available for Instant 1-on-1 WhatsApp Architecture Consultation',
      subAr: 'ناقش فكرة تطبيقك أو متطلبات الذكاء الاصطناعي والبيانات فوراً',
      subEn: 'Discuss your app roadmap, AI strategy, or data entry needs directly',
      badgeAr: 'ONLINE NOW',
      badgeEn: 'ONLINE NOW',
      linkAction: 'whatsapp',
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? tickerItems
      : tickerItems.filter((i) => {
          if (activeCategory === 'flutter') return i.id === 'flutter' || i.id === 'stores';
          if (activeCategory === 'ai') return i.id === 'ai';
          if (activeCategory === 'data') return i.id === 'data';
          if (activeCategory === 'upwork') return i.id === 'upwork' || i.id === 'whatsapp';
          return true;
        });

  // Three.js 3D Emblem Animation in Ticker Header
  useEffect(() => {
    const canvas = canvas3dRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(48, 48);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    // 3D Diamond / Octahedron Gem
    const geometry = new THREE.OctahedronGeometry(1.0, 0);
    const material = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xf2ca50 : 0xd4af37,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: false,
    });
    const gemMesh = new THREE.Mesh(geometry, material);
    scene.add(gemMesh);

    // Wireframe Outer Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x37beff : 0x0468d7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      gemMesh.rotation.x += 0.015;
      gemMesh.rotation.y += 0.025;
      wireMesh.rotation.x -= 0.01;
      wireMesh.rotation.y -= 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  // Handle 3D Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleItemClick = (item: TickerItem) => {
    if (item.linkAction === 'whatsapp') {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        language === 'ar'
          ? 'مرحباً مهندس محمد، اطلعت على شريط الأخبار وأود حجز استشارة معك بخصوص مشروعي.'
          : 'Hello Mohammed, I saw your live news ticker and would like to book a project consultation.'
      )}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else if (item.linkAction && onNavigateSection) {
      onNavigateSection(item.linkAction);
    }
  };

  return (
    <section
      aria-label="Breaking News 3D Ticker"
      className="relative z-30 w-full pt-20 sm:pt-24 pb-2 px-3 sm:px-6 max-w-7xl mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Perspective Wrapper */}
      <div
        ref={containerRef}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#14141a]/95 border-[#f2ca50]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(242,202,80,0.12)]'
            : 'bg-white/95 border-[#c49a1b]/40 shadow-[0_20px_40px_rgba(0,0,0,0.08),0_0_25px_rgba(196,154,27,0.15)]'
        }`}
      >
        {/* Top 3D Metallic Golden Header / Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-white/10 dark:border-white/10 bg-gradient-to-r from-transparent via-[#f2ca50]/5 to-transparent">
          {/* Left / Right Live Emblem Badge */}
          <div className="flex items-center gap-3">
            {/* Real 3D Rotating Three.js Gem */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#f2ca50]/10 border border-[#f2ca50]/30 overflow-hidden shadow-inner">
              <canvas ref={canvas3dRef} className="w-8 h-8" />
            </div>

            {/* Pulsing Live Broadcast Marker */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#ef4444]/20 via-[#ef4444]/10 to-transparent border border-[#ef4444]/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444]"></span>
              </span>
              <span className="text-[11px] font-black tracking-widest text-[#ef4444] uppercase font-mono">
                {language === 'ar' ? 'عاجل • شريط البث الحي' : 'LIVE 3D BROADCAST'}
              </span>
            </div>

            {/* Professional Headline Tagline */}
            <span
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-semibold ${
                theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>
                {language === 'ar'
                  ? 'آخر التحديثات والإنجازات المعتمدة • المهندس محمد ظهير'
                  : 'Verified Milestones & Real-time Live Updates • Mohammed Dhair'}
              </span>
            </span>
          </div>

          {/* Right Controls: Category Filter & Speed/Pause */}
          <div className="flex items-center gap-2">
            {/* Category Quick Selector */}
            <div className="hidden lg:flex items-center gap-1 bg-black/20 dark:bg-black/30 p-1 rounded-xl border border-white/5">
              {[
                { id: 'all', ar: 'الكل', en: 'All' },
                { id: 'flutter', ar: 'فلاتر والمتاجر', en: 'Flutter & Stores' },
                { id: 'ai', ar: 'الذكاء الاصطناعي', en: 'AI & LLMs' },
                { id: 'data', ar: 'البيانات', en: 'Data Ops' },
                { id: 'upwork', ar: 'التعاقد والتواصل', en: 'Upwork & WA' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#f2ca50] text-[#131318] font-bold shadow-sm'
                      : 'text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  {language === 'ar' ? cat.ar : cat.en}
                </button>
              ))}
            </div>

            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-mono ${
                theme === 'dark'
                  ? 'bg-[#1b1b22] border-white/10 hover:border-[#f2ca50] text-[#e4e1e9]'
                  : 'bg-[#f3f4f6] border-black/10 hover:border-[#8c6800] text-[#1a1a20]'
              }`}
              title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#25D366]" /> : <Pause className="w-3.5 h-3.5 text-[#f2ca50]" />}
              <span className="text-[10px] hidden sm:inline">{isPaused ? (language === 'ar' ? 'تشغيل' : 'Play') : (language === 'ar' ? 'إيقاف' : 'Pause')}</span>
            </button>

            {/* Speed Toggle */}
            <button
              onClick={() => setSpeed((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 0.6 : 1))}
              className={`px-2 py-1 rounded-xl border text-[10px] font-bold font-mono transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#1b1b22] border-white/10 hover:border-[#37beff] text-[#37beff]'
                  : 'bg-[#f3f4f6] border-black/10 hover:border-[#0468d7] text-[#0468d7]'
              }`}
              title="Change Speed"
            >
              {speed === 1 ? '1.0x' : speed === 1.75 ? '1.75x' : '0.6x'}
            </button>
          </div>
        </div>

        {/* The 3D Infinite Marquee Ribbon */}
        <div
          className="relative py-3.5 overflow-hidden flex items-center group cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Side Fade Gradients for 3D Depth */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#14141a] dark:from-[#14141a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#14141a] dark:from-[#14141a] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track 1 & 2 for Seamless Loop */}
          <div
            className="flex items-center gap-4 sm:gap-6 whitespace-nowrap will-change-transform"
            style={{
              animation: `marquee-scroll ${32 / speed}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
              direction: 'ltr',
            }}
          >
            {/* Render items twice to ensure endless looping */}
            {[...filteredItems, ...filteredItems, ...filteredItems].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => handleItemClick(item)}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer select-none group/card ${
                    theme === 'dark'
                      ? 'bg-[#1b1b24]/90 border-white/10 hover:border-[#f2ca50]/60 shadow-lg hover:shadow-[0_10px_25px_rgba(242,202,80,0.15)]'
                      : 'bg-[#f7f4ec]/95 border-black/10 hover:border-[#8c6800]/50 shadow-md hover:shadow-[0_10px_25px_rgba(140,104,0,0.15)]'
                  }`}
                >
                  {/* Item Icon with Glow Badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md transition-transform group-hover/card:rotate-6"
                    style={{
                      backgroundColor: `${item.tagColor}18`,
                      border: `1px solid ${item.tagColor}45`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.tagColor }} />
                  </div>

                  {/* Headline and Subtext */}
                  <div className="flex flex-col text-left rtl:text-right">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${item.tagColor}25`,
                          color: item.tagColor,
                        }}
                      >
                        {language === 'ar' ? item.tagAr : item.tagEn}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#e4e1e9] dark:text-[#e4e1e9] text-gray-900 group-hover/card:text-[#f2ca50] transition-colors">
                        {language === 'ar' ? item.headlineAr : item.headlineEn}
                      </h4>
                      {item.badgeAr && (
                        <span className="hidden sm:inline-block text-[9px] font-black px-1.5 py-0.5 rounded bg-white/10 text-[#f2ca50] border border-[#f2ca50]/30 font-mono">
                          {language === 'ar' ? item.badgeAr : item.badgeEn}
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#4b5563]'}`}>
                      {language === 'ar' ? item.subAr : item.subEn}
                    </p>
                  </div>

                  {/* Jump Action Indicator */}
                  <div className="pl-2 rtl:pr-2 flex-shrink-0 text-[#f2ca50] opacity-70 group-hover/card:opacity-100 group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1 transition-all">
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded CSS Keyframes for Super-Smooth Infinite 3D Marquee */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
