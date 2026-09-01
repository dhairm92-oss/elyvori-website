import React, { useState } from 'react';
import { SKILL_GROUPS, PORTFOLIO_ASSETS, PORTFOLIO_INFO } from '../data/portfolioData';
import {
  Smartphone,
  GitBranch,
  Cloud,
  Wrench,
  Terminal as TerminalIcon,
  ShieldCheck,
  Sparkles,
  Cpu,
  Layers,
  Award,
  ExternalLink,
  Database,
  Brain,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutSection: React.FC = () => {
  const { language, theme, t, isRtl } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<string | null>('FLUTTER');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'elyvori@cluster:~$ flutter doctor -v',
    '[✓] Flutter (Channel stable, 3.29.0, on macOS 15.2, locale ar/en)',
    '[✓] Android toolchain - develop for Android devices (SDK 35)',
    '[✓] Xcode - develop for iOS and macOS (Xcode 16.2)',
    '[✓] Firebase CLI & Cloud Services integrated',
    '[✓] VS Code / Android Studio (version 2024.3)',
    'Type "help" or "stats" to inspect developer radar.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    let reply = '';

    if (cmd === 'help') {
      reply =
        language === 'ar'
          ? 'الأوامر المتاحة: whoami, flutter, bloc, firebase, ai, data, experience, stats, clear'
          : 'Available commands: whoami, flutter, bloc, firebase, ai, data, experience, stats, clear';
    } else if (cmd === 'whoami') {
      reply =
        language === 'ar'
          ? 'محمد ظهير - كبير مهندسي ومطوري تطبيقات فلاتر (خبرة 5+ سنوات)'
          : 'Mohammed Dhair - Lead Flutter Architect & Cross-Platform Engineer (5+ yrs)';
    } else if (cmd === 'flutter') {
      reply =
        language === 'ar'
          ? 'فلاتر 3.x • سلاسة 60/120 إطاراً • عناصر Canvas وظلال برمجية مخصصة'
          : 'Flutter 3.x • 60/120fps engine • Custom RenderObjects & Canvas Shaders';
    } else if (cmd === 'bloc') {
      reply =
        language === 'ar'
          ? 'Bloc / Cubit • تدفق بيانات أحادي الاتجاه • فصل تام لواجهات المستخدم عن المنطق'
          : 'Bloc / Cubit • Unidirectional Data Flow • Strict separation of UI & Business logic';
    } else if (cmd === 'firebase') {
      reply =
        language === 'ar'
          ? 'Firebase Auth, Cloud Firestore, Realtime DB, Cloud Functions, FCM, Remote Config'
          : 'Firebase Auth, Cloud Firestore, Realtime DB, Cloud Functions, FCM, Remote Config';
    } else if (cmd === 'ai') {
      reply =
        language === 'ar'
          ? 'استراتيجيات الذكاء الاصطناعي التوليدي • تكامل نماذج Gemini & OpenAI • هندسة الأوامر والأتمتة'
          : 'Generative AI Strategy • Gemini & OpenAI APIs integration • Prompt Engineering & AI Automation';
    } else if (cmd === 'data') {
      reply =
        language === 'ar'
          ? 'إدخال وإدارة وهيكلة البيانات الاحترافية • معالجة دقيقة 100% • خطوط أنابيب ETL وتطبيع المخططات'
          : 'Professional Data Entry & Management • 100% Accuracy • Structured ETL Pipelines & Normalization';
    } else if (cmd === 'experience') {
      reply =
        language === 'ar'
          ? '5+ سنوات تسليم دولي • نسبة نجاح 100% على Upwork • أكثر من 8 تطبيقات إنتاجية'
          : '5+ years international client delivery • 100% Upwork Success • 8+ Production Apps delivered';
    } else if (cmd === 'stats') {
      reply =
        language === 'ar'
          ? 'تقييم: 5.0★ | استقرار التطبيقات: 99.9% | نسبة قبول المتاجر: 100%'
          : 'Rating: 5.0★ | Crash-Free Rate: 99.9% | App Store Approvals: 100%';
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    } else {
      reply =
        language === 'ar'
          ? `أمر غير معروف: "${cmd}". اكتب "help" لعرض الخيارات.`
          : `Command not recognized: "${cmd}". Type "help" for options.`;
    }

    setTerminalOutput((prev) => [...prev, `elyvori@cluster:~$ ${terminalInput}`, reply]);
    setTerminalInput('');
  };

  const getIcon = (iconName: string) => {
    const iconClass =
      theme === 'dark' ? 'text-[#f2ca50] w-7 h-7' : 'text-[#8c6800] w-7 h-7';
    switch (iconName) {
      case 'smartphone':
        return <Smartphone className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={theme === 'dark' ? 'text-[#f2ca50] w-7 h-7' : 'text-[#8c6800] w-7 h-7'} />;
      case 'database':
        return <Database className={theme === 'dark' ? 'text-[#37beff] w-7 h-7' : 'text-[#0468d7] w-7 h-7'} />;
      case 'account_tree':
        return <GitBranch className={theme === 'dark' ? 'text-[#37beff] w-7 h-7' : 'text-[#0468d7] w-7 h-7'} />;
      case 'cloud':
        return <Cloud className={iconClass} />;
      case 'build':
        return <Wrench className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section id="skills" className="relative py-20 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#0468d7]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* About Section (Asymmetric Grid with Executive Photo & Bio) */}
      <div className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Primary Bio Card */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            {/* Decorative Orbital Rings */}
            <div className="absolute -top-10 -left-10 w-28 h-28 border border-[#f2ca50]/20 rounded-full animate-spin-slow pointer-events-none hidden sm:block" />

            <div
              className={`p-7 sm:p-9 md:p-11 rounded-3xl border relative overflow-hidden shadow-2xl transition-colors ${
                theme === 'dark'
                  ? 'bg-[#1b1b20]/80 border-[#f2ca50]/25 glassmorphism'
                  : 'bg-white/90 border-[#c49a1b]/30 shadow-xl'
              }`}
            >
              {/* Inner Glow Spotlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f2ca50]/10 rounded-full blur-[50px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'border-[#f2ca50]/30 bg-[#f2ca50]/10 text-[#f2ca50]'
                      : 'border-[#c49a1b]/40 bg-[#8c6800]/10 text-[#8c6800]'
                  }`}
                >
                  {language === 'ar' ? 'السيرة المهنية' : 'PROFESSIONAL PROFILE'}
                </span>
                <span
                  className={`text-xs font-mono ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}`}
                >
                  ELYVORI STUDIO
                </span>
              </div>

              <h2
                className={`font-display-section text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight font-extrabold ${
                  theme === 'dark' ? 'heading-luxury-gold drop-shadow-[0_2px_15px_rgba(242,202,80,0.2)]' : 'text-[#8c6800]'
                }`}
              >
                {t('about.title')}
              </h2>

              <p
                className={`text-base sm:text-lg leading-relaxed mb-5 font-normal ${
                  theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#374151]'
                } ${isRtl ? 'font-arabic text-base sm:text-lg' : 'font-body'}`}
              >
                {t('about.p1')}
              </p>

              <p
                className={`text-base sm:text-lg leading-relaxed mb-8 font-normal ${
                  theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#374151]'
                } ${isRtl ? 'font-arabic text-base sm:text-lg' : 'font-body'}`}
              >
                {t('about.p2')}
              </p>

              {/* Key Bullet Highlights */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t ${
                  theme === 'dark' ? 'border-[#f2ca50]/15' : 'border-[#e5e7eb]'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#1f2937]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#f2ca50] shrink-0" />
                  <span>{t('about.highlight.arch')}</span>
                </div>
                <div
                  className={`flex items-center gap-2.5 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#1f2937]'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-[#37beff] shrink-0" />
                  <span>{t('about.highlight.perf')}</span>
                </div>
                <div
                  className={`flex items-center gap-2.5 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#1f2937]'
                  }`}
                >
                  <Cloud className="w-4 h-4 text-[#f2ca50] shrink-0" />
                  <span>{t('about.highlight.firebase')}</span>
                </div>
                <div
                  className={`flex items-center gap-2.5 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#1f2937]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#37beff] shrink-0" />
                  <span>{t('about.highlight.ui')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Executive Portrait Showcase & Interactive Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6 items-center">
            
            {/* User Photo Showcase Card */}
            <div
              className={`w-full rounded-2xl p-4 border overflow-hidden shadow-2xl transition-colors ${
                theme === 'dark'
                  ? 'bg-[#1b1b20]/90 border-[#f2ca50]/30'
                  : 'bg-white border-[#c49a1b]/40 shadow-xl'
              }`}
            >
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] group">
                <img
                  src={PORTFOLIO_ASSETS.portrait}
                  alt="Mohammed Dhair Executive Office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating caption on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="text-xs font-semibold drop-shadow-md">
                      {language === 'ar' ? PORTFOLIO_INFO.nameAr : PORTFOLIO_INFO.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[#f2ca50]">
                    {PORTFOLIO_INFO.brandName}
                  </span>
                </div>
              </div>
              <p
                className={`text-center text-xs mt-2.5 font-mono ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                }`}
              >
                {t('about.portraitCaption')}
              </p>
            </div>

            {/* Interactive Terminal */}
            <div
              className={`w-full bg-[#1b1b20]/95 border border-[#f2ca50]/25 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left ${
                theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#e4e1e9]'
              }`}
              dir="ltr"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#2a292f] mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-[#a1a1aa] font-mono ml-2">elyvori-flutter-runtime</span>
                </div>
                <span className="text-[11px] text-[#f2ca50] font-mono">v3.29.0</span>
              </div>

              {/* Output log */}
              <div className="h-32 overflow-y-auto font-mono text-[11px] text-[#a1a1aa] space-y-1 my-2 pr-1">
                {terminalOutput.slice(-5).map((line, idx) => (
                  <p
                    key={idx}
                    className={
                      line.startsWith('elyvori@')
                        ? 'text-[#acc7ff]'
                        : line.startsWith('[✓]')
                        ? 'text-emerald-400'
                        : 'text-[#e4e1e9]'
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Interactive prompt input */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-[#2a292f]">
                <span className="text-xs text-[#f2ca50] font-mono">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={t('about.terminal.placeholder')}
                  className="flex-1 bg-transparent text-xs text-[#e4e1e9] font-mono placeholder:text-[#6b7280] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-[10px] font-mono rounded bg-[#f2ca50]/20 text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#131318] transition-colors cursor-pointer"
                >
                  {t('about.terminal.run')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Core Competencies Section */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2
              className={`font-display-section text-3xl sm:text-4xl md:text-5xl mb-2 tracking-tight font-extrabold ${
                theme === 'dark' ? 'heading-platinum-white' : 'text-[#1a1a20]'
              }`}
            >
              {t('skills.title')}
            </h2>
            <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#6b6455]'} ${isRtl ? 'font-arabic' : 'font-body'}`}>
              {t('skills.subtitle')}
            </p>
          </div>
          <div
            className={`h-[1px] flex-grow mx-8 mb-4 hidden md:block ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-transparent via-[#f2ca50]/30 to-transparent'
                : 'bg-gradient-to-r from-transparent via-[#c49a1b]/40 to-transparent'
            }`}
          />
        </div>

        {/* Bento Grid Layout for Skills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SKILL_GROUPS.map((group, index) => {
            let spanClass = 'md:col-span-6 lg:col-span-6';
            if (index === 0) spanClass = 'md:col-span-12 lg:col-span-7';
            else if (index === 1) spanClass = 'md:col-span-12 lg:col-span-5';
            else if (index === 2) spanClass = 'md:col-span-12 lg:col-span-5';
            else if (index === 3) spanClass = 'md:col-span-12 lg:col-span-7';
            else if (index === 4) spanClass = 'md:col-span-12 lg:col-span-6';
            else if (index === 5) spanClass = 'md:col-span-12 lg:col-span-6';

            return (
              <div
                key={group.id}
                className={`${spanClass} rounded-2xl p-7 md:p-8 border glass-card relative overflow-hidden transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#1b1b20] border-[#f2ca50]/20'
                    : 'bg-white border-[#c49a1b]/30 shadow-md'
                }`}
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  <div
                    className={`p-3 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-[#2a292f]/60 border-[#f2ca50]/20'
                        : 'bg-[#f7f4ec] border-[#c49a1b]/30'
                    }`}
                  >
                    {getIcon(group.icon)}
                  </div>
                  <div>
                    <h3
                      className={`text-xl md:text-2xl font-bold ${
                        theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                      }`}
                    >
                      {language === 'ar' ? group.titleAr || group.title : group.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}`}>
                      {language === 'ar' ? group.descriptionAr || group.description : group.description}
                    </p>
                  </div>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill.name)}
                        className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer font-mono font-semibold ${
                          isSelected
                            ? theme === 'dark'
                              ? 'border-[#f2ca50] bg-[#f2ca50]/20 text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                              : 'border-[#8c6800] bg-[#8c6800] text-white shadow-sm'
                            : skill.highlight
                            ? theme === 'dark'
                              ? 'border-[#37beff]/40 bg-[#131318]/70 text-[#37beff] hover:border-[#37beff]'
                              : 'border-[#0468d7]/40 bg-[#f0f7ff] text-[#0468d7] hover:border-[#0468d7]'
                            : theme === 'dark'
                            ? 'border-[#4d4635] bg-[#131318]/50 text-[#d0c5af] hover:border-[#f2ca50]/50'
                            : 'border-[#e0d8c7] bg-[#fdfbf7] text-[#574f3e] hover:border-[#8c6800]/50'
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
