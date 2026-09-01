import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Wifi,
  Battery,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  Heart,
  Activity,
  ShoppingBag,
  Video,
  Mic,
  Calendar,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers,
  Flame,
  ChevronRight,
} from 'lucide-react';

interface DeviceMockup3DProps {
  project: Project;
  onInspect?: () => void;
}

export const DeviceMockup3D: React.FC<DeviceMockup3DProps> = ({ project, onInspect }) => {
  const { language, theme, isRtl } = useApp();
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-slide carousel every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, isHovered ? 4500 : 3200);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      rotateX: -normY * 10,
      rotateY: normX * 12,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Render individual realistic app screens based on project category and id
  const renderScreenContent = (screenIndex: number) => {
    const isAr = language === 'ar';

    // -------------------------------------------------------------
    // Screen 1: Auth / Biometric Splash Screen
    // -------------------------------------------------------------
    if (screenIndex === 0) {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#131318] via-[#1a1a24] to-[#0c0c10] text-[#e4e1e9] select-none">
          {/* Top Mini Brand */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[#f2ca50] text-[#131318] flex items-center justify-center font-bold text-[10px] shadow-[0_0_10px_rgba(242,202,80,0.4)]">
                E
              </div>
              <span className="text-[10px] font-bold tracking-wider text-[#f2ca50]">
                {project.id.toUpperCase()}
              </span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] border border-[#f2ca50]/30">
              v3.2.0
            </span>
          </div>

          {/* Central Biometric / Welcome Card */}
          <div className="my-auto text-center space-y-3 py-2">
            <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-[#f2ca50]/20 animate-ping opacity-50" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#b88c14] flex items-center justify-center text-[#131318] shadow-[0_0_20px_rgba(242,202,80,0.5)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white tracking-wide">
                {isAr ? 'تسجيل دخول بيومتري' : 'Biometric FaceID'}
              </h4>
              <p className="text-[10px] text-[#a1a1aa] mt-0.5">
                {isAr ? 'مصادقة مشفرة وفائقة الأمان' : 'Hardware-backed Auth'}
              </p>
            </div>

            {/* Simulated PIN Dots */}
            <div className="flex justify-center gap-2 pt-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i <= 3
                      ? 'bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.8)]'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="space-y-1.5 pb-1">
            <div className="w-full py-2 rounded-xl bg-[#f2ca50] text-[#131318] text-[10px] font-bold text-center shadow-md">
              {isAr ? 'المتابعة كحساب موثق' : 'Authorize Session'}
            </div>
            <div className="text-[8px] text-center text-[#71717a]">
              {isAr ? 'محمي بتشفير 256-bit AES' : '256-bit End-to-End Encrypted'}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Screen 2: Main Dashboard / Live Stream
    // -------------------------------------------------------------
    if (screenIndex === 1) {
      return (
        <div className="h-full w-full flex flex-col justify-between p-3.5 bg-[#0f0f14] text-[#e4e1e9] select-none">
          {/* Header Bar */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[9px] text-[#a1a1aa] block">
                {isAr ? 'الرصيد النشط' : 'Portfolio Value'}
              </span>
              <span className="text-xs font-bold text-[#f2ca50] font-mono">
                $48,920.50{' '}
                <span className="text-[8px] text-emerald-400 font-sans">+14.2%</span>
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] text-[9px] font-bold">
              MD
            </div>
          </div>

          {/* Simulated Mini Chart / Activity Wave */}
          <div className="p-2 rounded-xl bg-[#181822] border border-[#2e2d38] space-y-1.5">
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-[#a1a1aa]">{isAr ? 'المؤشر اللحظي' : 'Real-time Feed'}</span>
              <span className="text-emerald-400 font-mono flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> 120 FPS
              </span>
            </div>
            {/* SVG Sparkline */}
            <svg viewBox="0 0 100 30" className="w-full h-8 stroke-[#f2ca50] fill-none">
              <path
                d="M 0,25 Q 15,10 30,18 T 60,8 T 85,15 T 100,5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0,25 Q 15,10 30,18 T 60,8 T 85,15 T 100,5 L 100,30 L 0,30 Z"
                className="fill-[#f2ca50]/15"
              />
            </svg>
          </div>

          {/* Quick Action Pills Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-1.5 rounded-lg bg-[#1f1f2a] text-center border border-[#333240]">
              <Zap className="w-3 h-3 text-[#f2ca50] mx-auto mb-0.5" />
              <span className="text-[8px] font-medium text-white block">
                {isAr ? 'إرسال' : 'Send'}
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#1f1f2a] text-center border border-[#333240]">
              <Layers className="w-3 h-3 text-[#37beff] mx-auto mb-0.5" />
              <span className="text-[8px] font-medium text-white block">
                {isAr ? 'مبادلة' : 'Swap'}
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-[#1f1f2a] text-center border border-[#333240]">
              <ShieldCheck className="w-3 h-3 text-emerald-400 mx-auto mb-0.5" />
              <span className="text-[8px] font-medium text-white block">
                {isAr ? 'سجل' : 'Audit'}
              </span>
            </div>
          </div>

          {/* Bottom Nav Bar */}
          <div className="flex justify-around items-center pt-1 border-t border-[#262530] text-[#71717a]">
            <div className="text-[#f2ca50] flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] mb-0.5" />
              <span className="text-[7px] font-bold">Home</span>
            </div>
            <span className="text-[7px]">Stats</span>
            <span className="text-[7px]">Cards</span>
            <span className="text-[7px]">Profile</span>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Screen 3: Deep Feature / Domain Detail View
    // -------------------------------------------------------------
    return (
      <div className="h-full w-full flex flex-col justify-between p-3.5 bg-gradient-to-b from-[#161620] to-[#0c0c12] text-[#e4e1e9] select-none">
        {/* Title Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-bold text-[#e4e1e9]">
            {isAr ? 'تفاصيل الميزات' : 'Feature Inspector'}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-mono">
            LIVE SYNC
          </span>
        </div>

        {/* Feature Cards Stack */}
        <div className="space-y-2 my-auto">
          <div className="p-2 rounded-xl bg-[#20202c]/90 border border-[#f2ca50]/30 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-white block truncate">
                {isAr ? 'محرك فلاتر 3.29' : 'Flutter Engine'}
              </span>
              <span className="text-[8px] text-[#a1a1aa] block truncate">
                {isAr ? 'أداء عالي وسلاسة 120Hz' : 'Zero dropped frames'}
              </span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#20202c]/90 border border-[#37beff]/30 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#37beff]/20 text-[#37beff] flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-white block truncate">
                {isAr ? 'سحابة Firebase' : 'Firebase Cloud'}
              </span>
              <span className="text-[8px] text-[#a1a1aa] block truncate">
                {isAr ? 'مزامنة فورية ودعم الأوفلاين' : 'Offline-first cache'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Trigger */}
        <button
          onClick={onInspect}
          className="w-full py-1.5 rounded-lg bg-gradient-to-r from-[#f2ca50] to-[#e5b830] text-[#131318] text-[9px] font-bold flex items-center justify-center gap-1 shadow-sm cursor-pointer"
        >
          <span>{isAr ? 'استعراض الكود والمعمارية' : 'Inspect Architecture'}</span>
          <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>
    );
  };

  const screenNames = [
    language === 'ar' ? 'المصادقة' : 'Auth & FaceID',
    language === 'ar' ? 'الرئيسية' : 'Dashboard',
    language === 'ar' ? 'المميزات' : 'Architecture',
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-2 flex flex-col items-center justify-center select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Top Floating Tech Pill Badge */}
      <div className="w-full flex items-center justify-between px-2 mb-2 z-10">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold backdrop-blur-md transition-colors ${
            theme === 'dark'
              ? 'bg-[#1b1b22]/90 border-[#f2ca50]/40 text-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.15)]'
              : 'bg-white/95 border-[#c49a1b]/40 text-[#8c6800] shadow-sm'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
          <span>{project.tags.slice(0, 3).join(' • ')}</span>
        </div>

        {/* Live Interactive Screen Indicator */}
        <span
          className={`text-[9px] font-mono px-2 py-0.5 rounded-md border ${
            theme === 'dark'
              ? 'bg-[#131318] border-[#333240] text-[#a1a1aa]'
              : 'bg-[#faf8f3] border-[#e0d8c7] text-[#6b7280]'
          }`}
        >
          {screenNames[currentScreen]}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 3D LUXURY SMARTPHONE FRAME (ELYVORI GOLD TRIM)                           */}
      {/* ========================================================================= */}
      <div
        className="relative transition-transform duration-300 ease-out flex items-center justify-center cursor-pointer group"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${
            isHovered ? 1.03 : 1.0
          })`,
          transformStyle: 'preserve-3d',
        }}
        onClick={onInspect}
      >
        {/* Ambient Gold Halo Glow behind phone */}
        <div
          className="absolute inset-0 rounded-[40px] bg-[#f2ca50]/20 blur-xl -z-10 transition-opacity duration-500"
          style={{ opacity: isHovered ? 0.8 : 0.3 }}
        />

        {/* Outer Phone Chassis */}
        <div
          className={`relative w-[210px] sm:w-[230px] h-[360px] sm:h-[390px] rounded-[36px] p-[6px] border-[2px] transition-colors shadow-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#2d2920] via-[#1a191f] to-[#121217] border-[#f2ca50]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(242,202,80,0.15)]'
              : 'bg-gradient-to-b from-[#f2e6cb] via-[#ebe2cc] to-[#dfd5bc] border-[#c49a1b]/60 shadow-[0_15px_35px_rgba(140,104,0,0.15)]'
          }`}
        >
          {/* Side Metallic Edge Highlights */}
          <div className="absolute -left-[3px] top-20 w-[3px] h-8 rounded-l-sm bg-[#f2ca50]/70" />
          <div className="absolute -left-[3px] top-32 w-[3px] h-8 rounded-l-sm bg-[#f2ca50]/70" />
          <div className="absolute -right-[3px] top-24 w-[3px] h-12 rounded-r-sm bg-[#f2ca50]/70" />

          {/* Inner Display Bezel */}
          <div className="relative w-full h-full rounded-[30px] bg-[#0c0c10] overflow-hidden border border-[#22212a] flex flex-col justify-between">
            {/* Top Status Bar & Dynamic Island */}
            <div className="relative z-30 pt-1.5 px-4 flex items-center justify-between text-[9px] text-white/80 font-mono bg-gradient-to-b from-[#0c0c10] to-transparent">
              <span className="font-semibold">9:41</span>

              {/* Dynamic Island Pill */}
              <div className="w-16 h-3.5 rounded-full bg-black border border-white/10 flex items-center justify-end px-1.5 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b1b22] border border-[#f2ca50]/40" />
                <div className="w-1 h-1 rounded-full bg-[#37beff]" />
              </div>

              <div className="flex items-center gap-1">
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-2.5 h-2.5 text-[#f2ca50]" />
              </div>
            </div>

            {/* Screen Viewport with Carousel Animation */}
            <div className="relative flex-1 w-full overflow-hidden">
              <div
                key={currentScreen}
                className="w-full h-full animate-fade-in transition-all duration-500"
              >
                {renderScreenContent(currentScreen)}
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-30 pb-1.5 pt-0.5 flex justify-center bg-gradient-to-t from-[#0c0c10] to-transparent">
              <div className="w-20 h-1 rounded-full bg-white/40 group-hover:bg-[#f2ca50] transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Indicator Dots */}
      <div className="flex items-center gap-2 mt-3 z-10">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentScreen(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentScreen === idx
                ? 'w-6 bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.8)]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            title={`Screen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
