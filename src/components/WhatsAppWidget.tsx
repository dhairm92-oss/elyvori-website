import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2, PhoneCall, ChevronUp, Bot, Database, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_ASSETS } from '../data/portfolioData';

export const WhatsAppWidget: React.FC = () => {
  const { language, theme, isRtl } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasPrompted, setHasPrompted] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('mobile');

  const topics = [
    {
      id: 'mobile',
      icon: Smartphone,
      ar: '📱 استشارة تطبيق فلاتر جديد',
      en: '📱 New Flutter App Consultation',
      msgAr: 'مرحباً مهندس محمد، أود استشارتك بخصوص بناء تطبيق جوال جديد (Flutter / iOS & Android).',
      msgEn: 'Hello Mohammed, I would like to consult with you about building a new Flutter mobile app.',
    },
    {
      id: 'ai',
      icon: Bot,
      ar: '🤖 استشارات وحلول الذكاء الاصطناعي',
      en: '🤖 AI Strategy & Integration',
      msgAr: 'مرحباً مهندس محمد، أود استشارة متخصصة حول دمج الذكاء الاصطناعي (Gemini/OpenAI) في مشروعي.',
      msgEn: 'Hello Mohammed, I would like an AI strategy consultation to integrate LLM features into my project.',
    },
    {
      id: 'data',
      icon: Database,
      ar: '📊 إدارة وإدخال البيانات الاحترافية',
      en: '📊 Data Entry & Management',
      msgAr: 'مرحباً مهندس محمد، أود الاستفسار عن خدمات إدارة وهيكلة وإدخال البيانات للمشروع.',
      msgEn: 'Hello Mohammed, I would like to inquire about structured data entry and management services.',
    },
    {
      id: 'urgent',
      icon: PhoneCall,
      ar: '⚡ مناقشة مشروع عاجل / تعاقد',
      en: '⚡ Urgent Project / Hiring',
      msgAr: 'مرحباً محمد، لدي مشروع جاهز للبدء وأرغب في مناقشة التفاصيل والجدول الزمني معك مباشرة.',
      msgEn: 'Hello Mohammed, I have a project ready to launch and would like to discuss scope and availability.',
    },
  ];

  // Set initial default message based on language & default topic
  useEffect(() => {
    const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];
    setCustomMessage(language === 'ar' ? currentTopic.msgAr : currentTopic.msgEn);
  }, [language, selectedTopic]);

  // Subtle auto-open hint after 4 seconds for maximum engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    const target = topics.find((t) => t.id === topicId);
    if (target) {
      setCustomMessage(language === 'ar' ? target.msgAr : target.msgEn);
    }
  };

  const handleOpenWhatsApp = () => {
    const textToSend = customMessage.trim() || (language === 'ar' ? 'مرحباً محمد، أود حجز استشارة مجانية لمشروعي.' : 'Hello Mohammed, I would like to book a free project consultation.');
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToSend)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp Consultation" className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex flex-col items-end select-none`}>
      {/* Expanded Consultation Card */}
      {isOpen && (
        <div
          className={`mb-4 w-[92vw] sm:w-[380px] rounded-3xl p-5 shadow-2xl border backdrop-blur-2xl transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-6 ${
            theme === 'dark'
              ? 'bg-[#16161b]/95 border-[#25D366]/40 text-[#e4e1e9] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,211,102,0.15)]'
              : 'bg-white/95 border-[#25D366]/50 text-[#1a1a20] shadow-[0_20px_50px_rgba(0,0,0,0.15),0_0_30px_rgba(37,211,102,0.12)]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={PORTFOLIO_ASSETS.avatar}
                  alt="Mohammed Dhair"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#25D366]"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#16161b] rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm leading-tight">
                    {language === 'ar' ? 'محمد ظهير' : 'Mohammed Dhair'}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#37beff]" />
                </div>
                <p className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-ping" />
                  {language === 'ar' ? 'متاح للاستشارة الفورية' : 'Online • Instant Consultation'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp Consultation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-3.5 space-y-3">
            {/* Friendly Greeting Balloon */}
            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed border ${
                theme === 'dark'
                  ? 'bg-[#1b1b22] border-white/5 text-[#d1d5db]'
                  : 'bg-[#f3f4f6] border-black/5 text-[#374151]'
              }`}
            >
              {language === 'ar' ? (
                <>
                  <span className="font-semibold text-[#f2ca50]">أهلاً بك! 👋</span> هل لديك فكرة تطبيق، استفسار عن الذكاء الاصطناعي، أو إدارة البيانات؟ يسعدني تقديم <strong>استشارة فنية مجانية فورية</strong> معك مباشرة.
                </>
              ) : (
                <>
                  <span className="font-semibold text-[#f2ca50]">Welcome! 👋</span> Have a mobile app project, AI query, or data management requirement? I'm available for an <strong>instant free technical consultation</strong>.
                </>
              )}
            </div>

            {/* Topic Quick Chips */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-[#a1a1aa] mb-1.5">
                {language === 'ar' ? 'اختر موضوع الاستشارة:' : 'Select consultation topic:'}
              </p>
              <div className="grid grid-cols-1 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {topics.map((top) => {
                  const isSel = selectedTopic === top.id;
                  return (
                    <button
                      key={top.id}
                      onClick={() => handleSelectTopic(top.id)}
                      className={`text-left rtl:text-right px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                        isSel
                          ? 'bg-[#25D366]/15 border-[#25D366] text-[#25D366] shadow-sm font-semibold'
                          : theme === 'dark'
                          ? 'bg-[#1b1b22]/70 border-white/5 text-[#9ca3af] hover:border-white/20'
                          : 'bg-white border-black/5 text-[#4b5563] hover:border-black/15'
                      }`}
                    >
                      <span>{language === 'ar' ? top.ar : top.en}</span>
                      {isSel && <Sparkles className="w-3 h-3 text-[#25D366]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editable Custom Message Input */}
            <div className="relative">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={2}
                placeholder={language === 'ar' ? 'اكتب رسالتك أو استفسارك هنا...' : 'Type your consultation message...'}
                className={`w-full text-xs p-2.5 rounded-xl border outline-none resize-none transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#121217] border-white/10 text-white focus:border-[#25D366]'
                    : 'bg-[#fafafa] border-black/10 text-black focus:border-[#25D366]'
                }`}
              />
            </div>

            {/* Main Action Button to Launch WhatsApp */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-xs md:text-sm shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>
                {language === 'ar' ? 'بدء محادثة واتساب الآن' : 'Start WhatsApp Chat Now'}
              </span>
              <Send className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Main Consultation Button / Badge */}
      <div className="flex items-center gap-3">
        {/* Floating Callout Hint (when closed) */}
        {!isOpen && hasPrompted && (
          <div
            onClick={() => setIsOpen(true)}
            className={`hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-2xl shadow-xl border backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 animate-bounce ${
              theme === 'dark'
                ? 'bg-[#18181f]/95 border-[#25D366]/40 text-[#e4e1e9]'
                : 'bg-white/95 border-[#25D366]/50 text-[#1a1a20]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-xs font-bold text-[#25D366]">
              {language === 'ar' ? 'استشارة مجانية فورية 💬' : 'Free Instant Consultation 💬'}
            </span>
          </div>
        )}

        {/* The Main Round WhatsApp Trigger Orb */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open WhatsApp Consultation"
          className={`relative group p-3.5 sm:p-4 rounded-full shadow-[0_10px_35px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4ade80] text-white border-2 border-white/40`}
        >
          {/* Radar Ripple Waves */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />

          {isOpen ? (
            <ChevronUp className="w-6 h-6 rotate-180 transition-transform duration-300" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#f2ca50] border-2 border-[#128C7E] rounded-full" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
