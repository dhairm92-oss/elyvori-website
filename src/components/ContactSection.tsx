import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Calculator,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Github,
  Briefcase,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { language, theme, t, isRtl } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'booking' | 'calculator'>('booking');

  // Contact / Consultation form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'mobile',
    projectScope: '',
    timeline: 'asap',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Estimator calculator state
  const [platform, setPlatform] = useState<string>('both');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'auth',
    'realtime',
    'payments',
  ]);
  const [complexity] = useState<'mvp' | 'enterprise'>('enterprise');

  const featureOptions = [
    {
      id: 'auth',
      label: 'Auth & Biometrics (FaceID/Fingerprint)',
      labelAr: 'المصادقة والبصمة الحيوية (FaceID وبصمة الأصبع)',
      cost: 600,
      days: 3,
    },
    {
      id: 'realtime',
      label: 'Real-time Sync & Push Notifications (FCM)',
      labelAr: 'مزامنة فورية وإشعارات حية (FCM)',
      cost: 900,
      days: 5,
    },
    {
      id: 'payments',
      label: 'Payment Gateway (Stripe/Apple/Google Pay)',
      labelAr: 'بوابات الدفع (Stripe و Apple Pay و Google Pay)',
      cost: 1100,
      days: 6,
    },
    {
      id: 'offline',
      label: 'Offline-First DB Sync (Hive/SQLite)',
      labelAr: 'تخزين ومزامنة دون إنترنت (Hive و SQLite)',
      cost: 800,
      days: 4,
    },
    {
      id: 'animations',
      label: 'Custom 120fps Shaders & Micro-interactions',
      labelAr: 'حركات وتفاعلات مخصصة فائقة السلاسة 120Hz',
      cost: 750,
      days: 4,
    },
    {
      id: 'ai',
      label: 'AI & Machine Learning / Cloud Endpoints',
      labelAr: 'ذكاء اصطناعي وتكامل نماذج سحابية',
      cost: 1200,
      days: 6,
    },
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate estimated budget and timeline
  const baseCost = platform === 'both' ? 2500 : 1800;
  const featuresCost = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.cost : 0);
  }, 0);
  const multiplier = complexity === 'enterprise' ? 1.25 : 1.0;
  const totalCost = Math.round((baseCost + featuresCost) * multiplier);

  const baseDays = platform === 'both' ? 14 : 10;
  const featuresDays = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.days : 0);
  }, 0);
  const totalWeeks = Math.ceil((baseDays + featuresDays) / 5);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.primaryEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const projectTypeLabels: Record<string, { ar: string; en: string }> = {
    mobile: {
      ar: 'تطوير تطبيق جوال متكامل (Flutter / iOS & Android)',
      en: 'Full Flutter Mobile App (iOS & Android)',
    },
    ai: {
      ar: 'استراتيجيات وتكامل الذكاء الاصطناعي (AI Strategies & LLM APIs)',
      en: 'AI Strategies, LLM & Gemini Integration',
    },
    data: {
      ar: 'إدارة وهيكلة وإدخال البيانات الاحترافية (Data Entry & QA)',
      en: 'Professional Data Entry & Structured Management',
    },
    firebase: {
      ar: 'هندسة وتكامل سحابة Firebase والمزامنة الفورية',
      en: 'Firebase Cloud Architecture & Real-Time Sync',
    },
    ui: {
      ar: 'تجديد الواجهات والرسوم الحركية الفاخرة (120Hz Animations)',
      en: 'Luxury UI/UX & 120Hz Animation Overhaul',
    },
    audit: {
      ar: 'تدقيق معماري ومراجعة شاملة للكود والأداء',
      en: 'Codebase Architecture Audit & Security Review',
    },
    consult: {
      ar: 'استشارة فنية واستراتيجية مجانية (30 دقيقة)',
      en: '30-Min Free Strategy & Roadmap Call',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Build real mailto link so user can immediately send from mail client
    const subject = encodeURIComponent(
      `Free Consultation Request: ${formData.name} - ${projectTypeLabels[formData.projectType]?.[language] || formData.projectType}`
    );
    const body = encodeURIComponent(
      `Hello Mohammed,\n\nI would like to book a free architectural consultation:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Project Type: ${projectTypeLabels[formData.projectType]?.[language] || formData.projectType}\n` +
      `• Target Timeline: ${formData.timeline}\n` +
      `• Project Scope & Details:\n${formData.projectScope || 'N/A'}\n\n` +
      `Best regards,\n${formData.name}`
    );
    const mailtoUrl = `mailto:${PORTFOLIO_INFO.primaryEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Golden & Amber Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f2ca50', '#d4af37', '#ffffff', '#37beff', '#ffe088'],
      });

      // Try opening mail client in background
      try {
        const mailLink = document.createElement('a');
        mailLink.href = mailtoUrl;
        mailLink.target = '_blank';
        mailLink.click();
      } catch (err) {
        // Handled silently
      }
    }, 700);
  };

  // Direct Social / Professional Channels
  const directChannels = [
    {
      id: 'upwork',
      title: 'Upwork Top Rated Plus',
      titleAr: 'منصة Upwork (حساب معتمد)',
      handle: 'Mohammed Dhair • 100% Score',
      url: PORTFOLIO_INFO.upworkUrl,
      icon: Briefcase,
      color: '#14a800',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Direct Chat',
      titleAr: 'محادثة واتساب فورية',
      handle: 'Quick Project Discussion',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        language === 'ar'
          ? 'مرحباً محمد، أود حجز استشارة مجانية لمشروع فلاتر.'
          : "Hello Mohammed, I'd like to book a free consultation for a Flutter mobile project."
      )}`,
      icon: MessageCircle,
      color: '#25D366',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Network',
      titleAr: 'لينكد إن (LinkedIn)',
      handle: 'linkedin.com/in/mohammed-dhair',
      url: PORTFOLIO_INFO.linkedinUrl,
      icon: Linkedin,
      color: '#0077b5',
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      titleAr: 'مستودعات جيت هب (GitHub)',
      handle: 'github.com/dhairm92-oss',
      url: PORTFOLIO_INFO.githubUrl,
      icon: Github,
      color: '#a1a1aa',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto select-none">
      {/* Luxury 3D Ambient Backdrop Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#f2ca50]/8 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#0468d7]/8 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* MAIN GLOWING GOLDEN HEADLINE: احجز استشارة مجانية                         */}
      {/* ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        {/* Floating Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-[#f2ca50]/15 border-[#f2ca50]/35 text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.2)]'
              : 'bg-[#8c6800]/15 border-[#c49a1b]/40 text-[#8c6800]'
          } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t('contact.badge')}</span>
        </div>

        {/* Large Glowing Gold Headline */}
        <h2
          className={`font-display-section text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold transition-all ${
            theme === 'dark'
              ? 'heading-luxury-gold drop-shadow-[0_0_40px_rgba(242,202,80,0.35)]'
              : 'text-[#8c6800] drop-shadow-[0_4px_25px_rgba(140,104,0,0.2)]'
          }`}
        >
          {t('contact.title')}
        </h2>

        <p
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#6b6455]'
          } ${isRtl ? 'font-arabic text-base sm:text-lg leading-relaxed' : 'font-body'}`}
        >
          {t('contact.subtitle')}
        </p>

        {/* Mode Switcher Pills: Free Consultation Booking vs Scope Estimator */}
        <div className="inline-flex p-1.5 rounded-2xl border backdrop-blur-md mt-4 transition-colors">
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'booking'
                ? theme === 'dark'
                  ? 'bg-[#f2ca50] text-[#131318] shadow-[0_0_20px_rgba(242,202,80,0.4)]'
                  : 'bg-[#8c6800] text-white shadow-md'
                : theme === 'dark'
                ? 'text-[#d0c5af] hover:text-white'
                : 'text-[#6b6455] hover:text-[#1a1a20]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'ar' ? 'نموذج حجز الاستشارة' : 'Free Consultation'}</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'calculator'
                ? theme === 'dark'
                  ? 'bg-[#f2ca50] text-[#131318] shadow-[0_0_20px_rgba(242,202,80,0.4)]'
                  : 'bg-[#8c6800] text-white shadow-md'
                : theme === 'dark'
                ? 'text-[#d0c5af] hover:text-white'
                : 'text-[#6b6455] hover:text-[#1a1a20]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{language === 'ar' ? 'حاسبة التكلفة والمدة' : 'Cost & Scope Estimator'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT: Free Consultation Form & Direct Contact Channels            */}
      {/* ========================================================================= */}
      {activeTab === 'booking' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Floating Glassmorphism Form (7 cols) */}
          <div
            className={`lg:col-span-7 p-7 sm:p-9 md:p-10 rounded-3xl border glass-card relative transition-all duration-300 shadow-2xl ${
              theme === 'dark'
                ? 'bg-[#1b1b22]/90 border-[#f2ca50]/30 hover:border-[#f2ca50]/60 shadow-[0_15px_50px_rgba(0,0,0,0.6)]'
                : 'bg-white/95 border-[#c49a1b]/40 hover:border-[#8c6800] shadow-[0_15px_45px_rgba(140,104,0,0.12)]'
            }`}
          >
            {/* Header */}
            <div className="mb-6">
              <h3
                className={`text-xl sm:text-2xl font-bold flex items-center gap-2.5 ${
                  theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#f2ca50]" />
                <span>{t('contact.form.title')}</span>
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1.5 ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('contact.form.subtitle')}
              </p>
            </div>

            {submitted ? (
              /* Celebratory Success Confirmation Modal */
              <div
                className={`p-8 sm:p-10 text-center rounded-2xl border space-y-4 animate-fade-in ${
                  theme === 'dark'
                    ? 'bg-[#131318] border-[#f2ca50]/50 shadow-[0_0_40px_rgba(242,202,80,0.15)]'
                    : 'bg-[#f7f4ec] border-[#8c6800]/50 shadow-lg'
                }`}
              >
                {/* Celebratory Icon with Sparkling Stars */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#f2ca50]/20 animate-ping" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#f2ca50] to-[#ffd768] text-[#131318] flex items-center justify-center text-3xl shadow-xl">
                    ✓
                  </div>
                  <Star className="absolute -top-1 -right-1 w-5 h-5 text-[#f2ca50] animate-bounce" />
                </div>

                <h4
                  className={`text-xl sm:text-2xl font-bold font-headline ${
                    theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                  }`}
                >
                  {t('contact.form.successTitle')}
                </h4>

                <p
                  className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
                    theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                  }`}
                >
                  {t('contact.form.successDesc')}
                </p>

                {/* Consultation Summary Card */}
                <div
                  className={`p-4 rounded-xl border text-start text-xs space-y-1.5 font-mono max-w-md mx-auto ${
                    theme === 'dark'
                      ? 'bg-[#1b1b22] border-[#333240] text-[#e4e1e9]'
                      : 'bg-white border-[#e0d8c7] text-[#1a1a20]'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="text-[#a1a1aa]">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
                    <span className="font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a1a1aa]">{language === 'ar' ? 'البريد:' : 'Email:'}</span>
                    <span className="font-bold text-[#37beff]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a1a1aa]">{language === 'ar' ? 'نوع المشروع:' : 'Type:'}</span>
                    <span className="font-bold text-[#f2ca50]">
                      {projectTypeLabels[formData.projectType]?.[language] || formData.projectType}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_INFO.primaryEmail}?subject=Direct Consultation Follow-up`}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-[#f2ca50] text-[#131318] hover:bg-[#ffe088]'
                        : 'bg-[#8c6800] text-white hover:bg-[#a67c00]'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'فتح البريد المباشر' : 'Open Direct Mail'}</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'mobile',
                        projectScope: '',
                        timeline: 'asap',
                      });
                    }}
                    className={`text-xs font-mono underline cursor-pointer p-2 ${
                      theme === 'dark' ? 'text-[#a1a1aa] hover:text-[#f2ca50]' : 'text-[#6b7280]'
                    }`}
                  >
                    {t('contact.form.sendAnother')}
                  </button>
                </div>
              </div>
            ) : (
              /* The Real Glassmorphism Form with Golden Focus Glow */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field 1: Name */}
                <div>
                  <label
                    className={`text-xs block mb-1.5 font-bold ${
                      theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                    }`}
                  >
                    {t('contact.form.name')} <span className="text-[#f2ca50]">*</span>
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-300 ${
                      focusedField === 'name' ? 'ring-2 ring-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' : ''
                    }`}
                  >
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.form.namePh')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#131318] border-[#2e2d38] text-[#e4e1e9]'
                          : 'bg-[#fbf9f4] border-[#e0d8c7] text-[#1a1a20]'
                      }`}
                    />
                  </div>
                </div>

                {/* Field 2: Email */}
                <div>
                  <label
                    className={`text-xs block mb-1.5 font-bold ${
                      theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                    }`}
                  >
                    {t('contact.form.email')} <span className="text-[#f2ca50]">*</span>
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-300 ${
                      focusedField === 'email' ? 'ring-2 ring-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' : ''
                    }`}
                  >
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.form.emailPh')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#131318] border-[#2e2d38] text-[#e4e1e9]'
                          : 'bg-[#fbf9f4] border-[#e0d8c7] text-[#1a1a20]'
                      }`}
                    />
                  </div>
                </div>

                {/* Field 3: Project Type (Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`text-xs block mb-1.5 font-bold ${
                        theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                      }`}
                    >
                      {t('contact.form.projectType')}
                    </label>
                    <div
                      className={`relative rounded-xl transition-all duration-300 ${
                        focusedField === 'projectType' ? 'ring-2 ring-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' : ''
                      }`}
                    >
                      <select
                        value={formData.projectType}
                        onFocus={() => setFocusedField('projectType')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-[#131318] border-[#2e2d38] text-[#e4e1e9]'
                            : 'bg-[#fbf9f4] border-[#e0d8c7] text-[#1a1a20]'
                        }`}
                      >
                        <option value="mobile">{t('contact.form.type.mobile')}</option>
                        <option value="ai">{t('contact.form.type.ai')}</option>
                        <option value="data">{t('contact.form.type.data')}</option>
                        <option value="firebase">{t('contact.form.type.firebase')}</option>
                        <option value="ui">{t('contact.form.type.ui')}</option>
                        <option value="audit">{t('contact.form.type.audit')}</option>
                        <option value="consult">{t('contact.form.type.consult')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`text-xs block mb-1.5 font-bold ${
                        theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                      }`}
                    >
                      {t('contact.form.timeline')}
                    </label>
                    <div
                      className={`relative rounded-xl transition-all duration-300 ${
                        focusedField === 'timeline' ? 'ring-2 ring-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' : ''
                      }`}
                    >
                      <select
                        value={formData.timeline}
                        onFocus={() => setFocusedField('timeline')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-[#131318] border-[#2e2d38] text-[#e4e1e9]'
                            : 'bg-[#fbf9f4] border-[#e0d8c7] text-[#1a1a20]'
                        }`}
                      >
                        <option value="asap">{t('contact.form.timeline.asap')}</option>
                        <option value="month">{t('contact.form.timeline.month')}</option>
                        <option value="planning">{t('contact.form.timeline.planning')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Field 4: Project Scope & Description */}
                <div>
                  <label
                    className={`text-xs block mb-1.5 font-bold ${
                      theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                    }`}
                  >
                    {t('contact.form.scope')}
                  </label>
                  <div
                    className={`relative rounded-xl transition-all duration-300 ${
                      focusedField === 'projectScope' ? 'ring-2 ring-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' : ''
                    }`}
                  >
                    <textarea
                      rows={3}
                      value={formData.projectScope}
                      onFocus={() => setFocusedField('projectScope')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      placeholder={t('contact.form.scopePh')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                        theme === 'dark'
                          ? 'bg-[#131318] border-[#2e2d38] text-[#e4e1e9]'
                          : 'bg-[#fbf9f4] border-[#e0d8c7] text-[#1a1a20]'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit Button with Subtle Pulse Animation */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-[#f2ca50] via-[#ffd56b] to-[#f2ca50] text-[#131318] hover:shadow-[0_0_35px_rgba(242,202,80,0.5)] animate-pulse'
                        : 'bg-[#8c6800] hover:bg-[#a67c00] text-white shadow-lg animate-pulse'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>{t('contact.form.sending')}</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{t('contact.form.submit')}</span>
                        <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Channels & Interactive Contact Icons (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Direct Email Banner */}
            <div
              className={`p-6 rounded-3xl border glass-card transition-all ${
                theme === 'dark'
                  ? 'bg-[#1b1b22] border-[#f2ca50]/25 shadow-lg'
                  : 'bg-white border-[#c49a1b]/35 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                      theme === 'dark'
                        ? 'bg-[#f2ca50]/15 border-[#f2ca50]/35 text-[#f2ca50]'
                        : 'bg-[#8c6800]/15 border-[#c49a1b]/40 text-[#8c6800]'
                    }`}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span
                      className={`text-[11px] block font-mono ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                      }`}
                    >
                      {t('contact.directInbox')}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold font-mono block ${
                        theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                      }`}
                    >
                      {PORTFOLIO_INFO.primaryEmail}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    theme === 'dark'
                      ? 'bg-[#131318] hover:bg-[#f2ca50]/20 text-[#f2ca50] border-[#f2ca50]/40'
                      : 'bg-[#f7f4ec] hover:bg-[#8c6800]/20 text-[#8c6800] border-[#c49a1b]/40'
                  }`}
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? t('contact.copied') : t('contact.copy')}</span>
                </button>
              </div>
            </div>

            {/* Direct Connect Grid */}
            <div
              className={`p-6 rounded-3xl border glass-card space-y-4 ${
                theme === 'dark'
                  ? 'bg-[#1b1b22] border-[#2e2d38]'
                  : 'bg-white border-[#e0d8c7] shadow-md'
              }`}
            >
              <h4
                className={`text-sm font-bold tracking-wider ${
                  theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#574f3e]'
                } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
              >
                {t('contact.channels.title')}
              </h4>

              <div className="space-y-2.5">
                {directChannels.map((chan) => {
                  const IconComp = chan.icon;
                  return (
                    <a
                      key={chan.id}
                      href={chan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-[#131318] border-[#262530] hover:border-[#f2ca50]/50 hover:bg-[#1a1a24]'
                          : 'bg-[#faf8f3] border-[#e0d8c7] hover:border-[#8c6800] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                            theme === 'dark'
                              ? 'bg-[#1f1f2a] border-[#383748] text-[#f2ca50] group-hover:scale-110 group-hover:border-[#f2ca50]'
                              : 'bg-white border-[#d5ccba] text-[#8c6800] group-hover:scale-110 group-hover:border-[#8c6800]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold block ${
                              theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                            }`}
                          >
                            {language === 'ar' ? chan.titleAr : chan.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#a1a1aa] block">
                            {chan.handle}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Calculator Tab View */
        <div
          className={`max-w-4xl mx-auto p-7 md:p-10 rounded-3xl border glass-card space-y-6 shadow-2xl ${
            theme === 'dark'
              ? 'bg-[#1b1b22] border-[#f2ca50]/25'
              : 'bg-white border-[#c49a1b]/30 shadow-md'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              theme === 'dark' ? 'border-[#2a292f]' : 'border-[#ede7d8]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calculator
                className={`w-6 h-6 ${theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'}`}
              />
              <h3
                className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                }`}
              >
                {t('contact.calc.title')}
              </h3>
            </div>
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full border ${
                theme === 'dark'
                  ? 'text-[#f2ca50] bg-[#f2ca50]/10 border-[#f2ca50]/20'
                  : 'text-[#8c6800] bg-[#8c6800]/10 border-[#c49a1b]/30'
              }`}
            >
              {t('contact.calc.live')}
            </span>
          </div>

          {/* Platform Choice */}
          <div>
            <label
              className={`text-xs block mb-2 font-bold ${
                theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
              }`}
            >
              {t('contact.calc.step1')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('both')}
                className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  platform === 'both'
                    ? theme === 'dark'
                      ? 'border-[#f2ca50] bg-[#f2ca50]/15 text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.2)]'
                      : 'border-[#8c6800] bg-[#8c6800]/15 text-[#8c6800] font-bold shadow-sm'
                    : theme === 'dark'
                    ? 'border-[#2a292f] bg-[#131318] text-[#a1a1aa] hover:border-[#4d4635]'
                    : 'border-[#e0d8c7] bg-[#f7f4ec] text-[#6b7280] hover:border-[#8c6800]/50'
                }`}
              >
                {t('contact.calc.both')}
              </button>
              <button
                type="button"
                onClick={() => setPlatform('single')}
                className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  platform === 'single'
                    ? theme === 'dark'
                      ? 'border-[#f2ca50] bg-[#f2ca50]/15 text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.2)]'
                      : 'border-[#8c6800] bg-[#8c6800]/15 text-[#8c6800] font-bold shadow-sm'
                    : theme === 'dark'
                    ? 'border-[#2a292f] bg-[#131318] text-[#a1a1aa] hover:border-[#4d4635]'
                    : 'border-[#e0d8c7] bg-[#f7f4ec] text-[#6b7280] hover:border-[#8c6800]/50'
                }`}
              >
                {t('contact.calc.single')}
              </button>
            </div>
          </div>

          {/* Features Selection */}
          <div>
            <label
              className={`text-xs block mb-2 font-bold ${
                theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
              }`}
            >
              {t('contact.calc.step2')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {featureOptions.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`text-start p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? theme === 'dark'
                          ? 'border-[#37beff] bg-[#37beff]/10 text-[#e4e1e9]'
                          : 'border-[#0468d7] bg-[#0468d7]/10 text-[#1a1a20]'
                        : theme === 'dark'
                        ? 'border-[#2a292f] bg-[#131318] text-[#a1a1aa] hover:border-[#4d4635]'
                        : 'border-[#e0d8c7] bg-[#f7f4ec] text-[#6b7280] hover:border-[#c49a1b]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? theme === 'dark'
                              ? 'border-[#37beff] bg-[#37beff] text-[#131318]'
                              : 'border-[#0468d7] bg-[#0468d7] text-white'
                            : 'border-[#4d4635]'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span>{language === 'ar' ? feat.labelAr : feat.label}</span>
                    </div>
                    <span
                      className={`font-mono text-[11px] ${
                        theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                      }`}
                    >
                      +${feat.cost}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimated Results Banner */}
          <div
            className={`p-6 rounded-2xl border flex flex-col sm:flex-row justify-between items-center gap-4 ${
              theme === 'dark'
                ? 'bg-[#131318] border-[#f2ca50]/30'
                : 'bg-[#f7f4ec] border-[#c49a1b]/40'
            }`}
          >
            <div>
              <span
                className={`text-[11px] uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('contact.calc.estimate')}
              </span>
              <span
                className={`text-4xl font-bold font-headline ${
                  theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                }`}
              >
                ${totalCost.toLocaleString()}{' '}
                <span className="text-xs font-normal">USD</span>
              </span>
            </div>

            <div
              className={`${
                isRtl ? 'sm:border-r sm:pr-6 text-start' : 'sm:border-l sm:pl-6 text-start sm:text-right'
              } ${theme === 'dark' ? 'sm:border-[#2a292f]' : 'sm:border-[#e0d8c7]'}`}
            >
              <span
                className={`text-[11px] uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('contact.calc.timeline')}
              </span>
              <span
                className={`text-2xl font-bold flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-[#acc7ff]' : 'text-[#0468d7]'
                }`}
              >
                <Clock className="w-5 h-5" />
                ~{totalWeeks} {totalWeeks === 1 ? t('contact.calc.week') : t('contact.calc.weeks')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('booking')}
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#f2ca50] text-[#131318] hover:bg-[#ffe088]'
                : 'bg-[#8c6800] text-white hover:bg-[#a67c00]'
            }`}
          >
            <span>{language === 'ar' ? 'الانتقال لحجز الاستشارة' : 'Proceed to Book Consultation'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
