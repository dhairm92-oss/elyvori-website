import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme } from '../types';

interface AppContextType {
  language: Language;
  theme: Theme;
  isRtl: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.about': 'من أنا',
    'nav.skills': 'المهارات',
    'nav.work': 'الأعمال',
    'nav.experience': 'الخبرات',
    'nav.contact': 'تواصل معي',
    'nav.available': 'متاح للمشاريع والتعاقد',
    'nav.hireUpwork': 'وظفني عبر Upwork',
    'nav.topRated': 'مهندس معتمد Top Rated',
    'nav.langToggle': 'English',
    'nav.themeDark': 'الليل',
    'nav.themeLight': 'النهار',

    // Hero
    'hero.badge': 'مهندس ومهندس معماري أول لتطبيقات فلاتر',
    'hero.score': 'تقييم 100% على Upwork',
    'hero.title': 'ELYVORI',
    'hero.by': 'بواسطة محمد ظهير',
    'hero.bio': 'مطور فلاتر أول بخبرة تزيد عن 5 سنوات في بناء تطبيقات جوال استثنائية وعالية الأداء لنظامي Android و iOS مع أفضل الممارسات المعمارية.',
    'hero.viewWork': 'استعراض أعمالي',
    'hero.hireMe': 'توظيف عبر Upwork',
    'hero.stat.years': 'سنوات خبرة',
    'hero.stat.apps': 'تطبيقات منجزة',
    'hero.stat.success': 'نسبة نجاح المشاريع',
    'hero.stat.rejections': 'رفض في المتاجر',
    'hero.explore': 'استكشف المنظومة البرمجية',
    'hero.portraitBadge': 'محمد ظهير • مؤسس ELYVORI',

    // About
    'about.title': 'نبذة عني',
    'about.p1': 'مطور فلاتر خبير ومستشار برمجيات بخبرة تزيد عن 5 سنوات في هندسة وبناء تطبيقات الجوال المتقدمة، ومتخصص محترف في استراتيجيات وحلول الذكاء الاصطناعي، وإدارة وهيكلة وإدخال البيانات بدقة متناهية، والمنظومة السحابية المتكاملة لـ Firebase والبنية المعمارية النظيفة (Clean Architecture / Bloc).',
    'about.p2': 'أجمع بين الدقة الهندسية الصارمة والشغف بالتصاميم الفاخرة ذات الطابع العصري، لضمان أن كل تطبيق ونظام برمجي يعمل بأقصى كفاءة وموثوقية، ويمنح المستخدمين والشركات تجربة رقمية استثنائية متكاملة وسلسة.',
    'about.highlight.arch': 'بنية معمارية بمعايير المؤسسات',
    'about.highlight.perf': 'سلاسة فائقة 120Hz وظلال Canvas مخصصة',
    'about.highlight.firebase': 'محرك مزامنة أوفلاين وسحابة Firebase',
    'about.highlight.ai': 'استراتيجيات وحلول الذكاء الاصطناعي التوليدي',
    'about.highlight.data': 'إدارة وهيكلة وإدخال البيانات بدقة 100%',
    'about.highlight.ui': 'واجهات مستخدم متقنة وفائقة الدقة',
    'about.terminal.title': 'بيئة تشغيل فلاتر التفاعلية',
    'about.terminal.placeholder': 'اكتب whoami أو ai أو data أو help...',
    'about.terminal.run': 'تنفيذ',
    'about.portraitCaption': 'محمد ظهير في مكتب ELYVORI التنفيذي',

    // Competencies
    'skills.title': 'المهارات والقدرات التقنية',
    'skills.subtitle': 'الرادار التقني والمهارات التخصصية في تطوير الجوال، الذكاء الاصطناعي، وإدارة البيانات.',
    'skills.mobile.title': 'تطوير تطبيقات الجوال',
    'skills.mobile.desc': 'تطبيقات Flutter فائقة السلاسة مع جسور ومنصات أصلية Native.',
    'skills.ai.title': 'استراتيجيات الذكاء الاصطناعي',
    'skills.ai.desc': 'تكامل نماذج Gemini & OpenAI وهندسة الأوامر وأتمتة المهام الذكية.',
    'skills.data.title': 'إدخال وإدارة البيانات',
    'skills.data.desc': 'إدخال ومعالجة البيانات بدقة 100%، تدقيق الجودة، وهيكلة المخططات.',
    'skills.state.title': 'إدارة الحالة المعمارية',
    'skills.state.desc': 'تدفقات بيانات تفاعلية وقابلة للتوسع والاختبار بنسبة 100%.',
    'skills.backend.title': 'الخلفية وقواعد البيانات',
    'skills.backend.desc': 'مزامنة فورية، مصادقة آمنة، وتخزين محلي ذكي Offline-First.',
    'skills.devtools.title': 'أدوات التطوير والعمليات',
    'skills.devtools.desc': 'أتمتة CI/CD واختبارات شاملة ونشر سلس على المتاجر.',

    // Work
    'work.badge': 'دراسات حالة مختارة',
    'work.title': 'سجل الأعمال والمشاريع',
    'work.subtitle': 'تطبيقات فلاتر حقيقية عالية الأداء تم بناؤها ونشرها بنجاح لعملاء حول العالم.',
    'work.all': 'الكل',
    'work.inspect': 'تفاصيل المشروع',
    'work.modal.summary': 'الملخص التنفيذي',
    'work.modal.metrics': 'أثر الإنتاج ومؤشرات الأداء',
    'work.modal.stack': 'التقنيات والأدوات',
    'work.modal.architecture': 'النمط المعماري وإدارة الحالة',
    'work.modal.pattern': 'البنية المعمارية',
    'work.modal.state': 'استراتيجية إدارة الحالة',
    'work.modal.backend': 'الطبقة الخلفية والخدمات السحابية',
    'work.modal.features': 'المميزات والوحدات الأساسية',
    'work.modal.liveDemo': 'تجربة التطبيق المباشرة',
    'work.modal.verified': 'تسليم معتمد بنجاح 100%',
    'work.tab.overview': 'نظرة عامة ومؤشرات',
    'work.tab.arch': 'البنية المعمارية والحالة',
    'work.tab.features': 'المميزات والأمان',

    // Experience
    'exp.badge': 'السجل المهني والموثوقية',
    'exp.title': 'الخبرات وثقة العملاء',
    'exp.subtitle': 'أكثر من 5 سنوات من تسليم حلول برمجية متكاملة في الوقت المحدد وبأعلى معايير الجودة.',
    'exp.topRated': 'Top Rated Plus على Upwork',
    'exp.jss': 'معدل رضا 100%',
    'exp.topTalent': 'ضمن أفضل 1% من مطوري الجوال عالمياً',
    'exp.milestones': 'محطات المسيرة المهنية',
    'exp.testimonials': 'شهادات وتقييمات العملاء',
    'exp.verified': 'تقييم 5 نجوم معتمد',

    // Contact & Free Consultation
    'contact.badge': 'جلسة استشارية مجانية 1-on-1',
    'contact.title': 'احجز استشارة مجانية',
    'contact.subtitle': 'احجز جلستك الاستشارية المجانية (30 دقيقة) لتخطيط معماري وهندسي متكامل ومناقشة تفاصيل تطبيقك وخارطة الطريق البرمجية.',
    'contact.calc.title': 'حاسبة النطاق والتكلفة التقديرية',
    'contact.calc.live': 'حساب فوري',
    'contact.calc.step1': '1. المنصات المستهدفة',
    'contact.calc.both': 'iOS + Android معاً (فلاتر)',
    'contact.calc.single': 'منصة واحدة فقط',
    'contact.calc.step2': '2. الوحدات والميزات المطلوبة',
    'contact.calc.estimate': 'الاستثمار التقديري',
    'contact.calc.timeline': 'الجدول الزمني التقديري',
    'contact.calc.weeks': 'أسابيع',
    'contact.calc.week': 'أسبوع',
    'contact.form.title': 'نموذج حجز الاستشارة المجانية',
    'contact.form.subtitle': 'أقوم بالرد وتأكيد موعد الاستشارة خلال 6 ساعات مع تحليل فني مسبق لمتطلبات مشروعك.',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.namePh': 'مثال: فيصل العتيبي / Alexander Vance',
    'contact.form.email': 'البريد الإلكتروني المهني',
    'contact.form.emailPh': 'name@company.com',
    'contact.form.projectType': 'نوع المشروع / الخدمة المطلوبة',
    'contact.form.type.mobile': '📱 تطوير تطبيق جوال متكامل (Flutter / iOS & Android)',
    'contact.form.type.ai': '🤖 استراتيجيات وتكامل الذكاء الاصطناعي (AI Strategies & LLM APIs)',
    'contact.form.type.data': '📊 إدارة وهيكلة وإدخال البيانات الاحترافية (Data Entry & QA)',
    'contact.form.type.firebase': '🔥 هندسة وتكامل سحابة Firebase والمزامنة الفورية',
    'contact.form.type.ui': '⚡ تجديد الواجهات والرسوم الحركية الفاخرة (120Hz Animations)',
    'contact.form.type.audit': '🛡️ تدقيق معماري ومراجعة شاملة للكود والأداء',
    'contact.form.type.consult': '💡 استشارة فنية واستراتيجية مجانية (30 دقيقة)',
    'contact.form.scope': 'وصف مختصر للمشروع أو فكرة التطبيق',
    'contact.form.scopePh': 'اشرح فكرة تطبيقك، الميزات الجوهرية، الجدول الزمني المستهدف، أو حالة الكود الحالي...',
    'contact.form.timeline': 'الجدول الزمني المفضل للبدء',
    'contact.form.timeline.asap': 'فوري (خلال هذا الأسبوع)',
    'contact.form.timeline.month': 'خلال 2 - 4 أسابيع',
    'contact.form.timeline.planning': 'مرحلة التخطيط والدراسة',
    'contact.form.submit': 'تأكيد حجز الاستشارة المجانية الآن',
    'contact.form.sending': 'جارٍ تأكيد وتجهيز الاستشارة...',
    'contact.form.successTitle': 'تم حجز استشارتك المجانية بنجاح!',
    'contact.form.successDesc': 'شكراً لاهتمامك. تم تجهيز تفاصيل جلستك الاستشارية وسيصلك تأكيد الموعد ورابط الاجتماع عبر بريدك الإلكتروني خلال دقائق.',
    'contact.form.sendAnother': 'حجز موعد أو إرسال استفسار آخر',
    'contact.directInbox': 'البريد الإلكتروني المباشر',
    'contact.copy': 'نسخ',
    'contact.copied': 'تم النسخ!',
    'contact.channels.title': 'قنوات التواصل والتوظيف المباشر',

    // Footer
    'footer.brand': 'ELYVORI',
    'footer.rights': 'ELYVORI بواسطة محمد ظهير • مراجع العملاء متوفرة عند الطلب',
    'footer.copied': 'تم نسخ رابط معرض الأعمال بنجاح!',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.available': 'Available for Hire',
    'nav.hireUpwork': 'Hire Me on Upwork',
    'nav.topRated': 'Top Rated Plus Engineer',
    'nav.langToggle': 'عربي',
    'nav.themeDark': 'Night',
    'nav.themeLight': 'Day',

    // Hero
    'hero.badge': 'Top Rated Mobile Solutions Architect',
    'hero.score': '100% Upwork Score',
    'hero.title': 'ELYVORI',
    'hero.by': 'BY MOHAMMED DHAIR',
    'hero.bio': 'Flutter Developer with 5+ years experience building professional high-performance mobile apps for Android & iOS.',
    'hero.viewWork': 'View My Work',
    'hero.hireMe': 'Hire Me on Upwork',
    'hero.stat.years': 'Years Exp.',
    'hero.stat.apps': 'Apps Built',
    'hero.stat.success': 'Job Success',
    'hero.stat.rejections': 'App Rejections',
    'hero.explore': 'EXPLORE ECOSYSTEM',
    'hero.portraitBadge': 'Mohammed Dhair • Founder of ELYVORI',

    // About
    'about.title': 'About Me',
    'about.p1': 'Flutter Developer and mobile software consultant with 5+ years building cross-platform apps. Specialized expert in AI integration strategies, professional structured data entry & management, Firebase backend engineering, and clean architecture (Bloc, Provider, Riverpod) delivering production-ready systems for international clients.',
    'about.p2': 'My approach combines rigorous technical execution with a passion for high-end luxury aesthetics, ensuring every application not only performs flawlessly but feels uniquely premium.',
    'about.highlight.arch': 'Production-Grade Architecture',
    'about.highlight.perf': '120Hz Fluid Shaders & Canvas',
    'about.highlight.firebase': 'Firebase & Offline Sync Engine',
    'about.highlight.ai': 'AI Integration & Intelligent Strategies',
    'about.highlight.data': '100% Precision Data Entry & QA',
    'about.highlight.ui': 'Pixel-Perfect Luxury UI/UX',
    'about.terminal.title': 'Interactive Flutter Runtime',
    'about.terminal.placeholder': "type 'whoami', 'ai', 'data', or 'help'...",
    'about.terminal.run': 'RUN',
    'about.portraitCaption': 'Mohammed Dhair in the ELYVORI Executive Suite',

    // Competencies
    'skills.title': 'Core Competencies',
    'skills.subtitle': 'Technical radar & specialized capabilities across mobile software, AI strategies, and data operations.',
    'skills.mobile.title': 'Mobile Development',
    'skills.mobile.desc': 'Native-feel Flutter apps with 60/120fps fluid animations & native platform bridges.',
    'skills.ai.title': 'AI Strategies & Integrations',
    'skills.ai.desc': 'Gemini & OpenAI API integrations, prompt engineering, and intelligent workflow automation.',
    'skills.data.title': 'Data Entry & Management',
    'skills.data.desc': 'High-accuracy structured data entry, validation QA, schema normalization, and ETL.',
    'skills.state.title': 'State Management',
    'skills.state.desc': 'Decoupled, reactive state flows designed for scale and testability.',
    'skills.backend.title': 'Backend & Databases',
    'skills.backend.desc': 'Real-time database sync, cloud functions, and offline-first local persistence.',
    'skills.devtools.title': 'DevTools & Ops',
    'skills.devtools.desc': 'Automated CI/CD pipelines, automated testing, and store compliance.',

    // Work
    'work.badge': 'Featured Case Studies',
    'work.title': 'Selected Works',
    'work.subtitle': 'High-performance cross-platform Flutter applications engineered for international clients.',
    'work.all': 'All',
    'work.inspect': 'Details →',
    'work.modal.summary': 'Executive Summary',
    'work.modal.metrics': 'Production Impact & Metrics',
    'work.modal.stack': 'Stack & Ecosystem',
    'work.modal.architecture': 'Architecture & State Management',
    'work.modal.pattern': 'Architectural Pattern',
    'work.modal.state': 'State Management Strategy',
    'work.modal.backend': 'Backend Integration Tier',
    'work.modal.features': 'Core Feature Modules',
    'work.modal.liveDemo': 'Live App Demo',
    'work.modal.verified': 'Verified Production Delivery',
    'work.tab.overview': 'Overview & Metrics',
    'work.tab.arch': 'Architecture & State',
    'work.tab.features': 'Features & Security',

    // Experience
    'exp.badge': 'Track Record & Reputation',
    'exp.title': 'Experience & Trust',
    'exp.subtitle': '5+ years of delivering enterprise-ready mobile systems on time and within budget.',
    'exp.topRated': 'Top Rated Plus',
    'exp.jss': '100% JSS',
    'exp.topTalent': 'Top 1% Mobile Talent on Upwork',
    'exp.milestones': 'Career Milestones',
    'exp.testimonials': 'Client Endorsements',
    'exp.verified': '5.0 Verified Rating',

    // Contact & Free Consultation
    'contact.badge': '1-on-1 Free Strategy Consultation',
    'contact.title': 'Book a Free Consultation',
    'contact.subtitle': 'Book a complimentary 30-minute architectural and technical strategy session to blueprint your Flutter app and roadmap.',
    'contact.calc.title': 'Interactive Scope & Cost Estimator',
    'contact.calc.live': 'Live Calc',
    'contact.calc.step1': '1. TARGET PLATFORMS',
    'contact.calc.both': 'iOS + Android (Flutter)',
    'contact.calc.single': 'Single Platform Only',
    'contact.calc.step2': '2. REQUIRED CAPABILITIES & MODULES',
    'contact.calc.estimate': 'Estimated Investment',
    'contact.calc.timeline': 'Est. Timeline',
    'contact.calc.weeks': 'Weeks',
    'contact.calc.week': 'Week',
    'contact.form.title': 'Book Your Free Consultation',
    'contact.form.subtitle': 'I reply within 6 hours with calendar confirmation and initial architectural notes.',
    'contact.form.name': 'YOUR FULL NAME',
    'contact.form.namePh': 'e.g. Alexander Vance / Faisal Al-Otaibi',
    'contact.form.email': 'WORK EMAIL ADDRESS',
    'contact.form.emailPh': 'alex@company.com',
    'contact.form.projectType': 'PROJECT TYPE / ENGAGEMENT',
    'contact.form.type.mobile': '📱 Full Flutter Mobile App (iOS & Android)',
    'contact.form.type.ai': '🤖 AI Strategies, LLM & Gemini Integration',
    'contact.form.type.data': '📊 Professional Data Entry & Structured Management',
    'contact.form.type.firebase': '🔥 Firebase Cloud Architecture & Real-Time Sync',
    'contact.form.type.ui': '⚡ Luxury UI/UX & 120Hz Animation Overhaul',
    'contact.form.type.audit': '🛡️ Codebase Architecture Audit & Security Review',
    'contact.form.type.consult': '💡 30-Min Free Strategy & Roadmap Call',
    'contact.form.scope': 'PROJECT SUMMARY / APP CONCEPT',
    'contact.form.scopePh': 'Describe your app concept, core goals, timeline, or existing codebase...',
    'contact.form.timeline': 'TARGET START TIMELINE',
    'contact.form.timeline.asap': 'Immediate (This Week)',
    'contact.form.timeline.month': 'Within 2 - 4 Weeks',
    'contact.form.timeline.planning': 'Exploration & Planning Phase',
    'contact.form.submit': 'Confirm Free Consultation Booking',
    'contact.form.sending': 'Preparing Consultation Details...',
    'contact.form.successTitle': 'Consultation Booked Successfully!',
    'contact.form.successDesc': 'Thank you! Mohammed will review your project requirements and dispatch your meeting invite link shortly.',
    'contact.form.sendAnother': 'Book another session or send an inquiry',
    'contact.directInbox': 'DIRECT INBOX',
    'contact.copy': 'Copy',
    'contact.copied': 'Copied!',
    'contact.channels.title': 'Direct Contact & Hiring Channels',

    // Footer
    'footer.brand': 'ELYVORI',
    'footer.rights': 'ELYVORI by Mohammed Dhair • References available upon request',
    'footer.copied': 'Portfolio link copied to clipboard!',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic as requested
  const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark obsidian mode

  useEffect(() => {
    // Sync html attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const isRtl = language === 'ar';

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        isRtl,
        toggleLanguage,
        setLanguage,
        toggleTheme,
        setTheme,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
