import React from 'react';
import { EXPERIENCES, TESTIMONIALS, PORTFOLIO_INFO } from '../data/portfolioData';
import { Briefcase, Star, Award, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExperienceSection: React.FC = () => {
  const { language, theme, t, isRtl } = useApp();

  return (
    <section id="experience" className="relative py-20 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f2ca50]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs mb-3 font-semibold ${
              theme === 'dark'
                ? 'bg-[#f2ca50]/15 border-[#f2ca50]/30 text-[#f2ca50]'
                : 'bg-[#8c6800]/15 border-[#c49a1b]/40 text-[#8c6800]'
            } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{t('exp.badge')}</span>
          </div>

          <h2
            className={`font-display-section text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold ${
              theme === 'dark' ? 'heading-luxury-gold drop-shadow-[0_4px_25px_rgba(242,202,80,0.15)]' : 'text-[#8c6800]'
            }`}
          >
            {t('exp.title')}
          </h2>
          <p
            className={`text-base sm:text-lg mt-2.5 max-w-2xl ${
              theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#6b6455]'
            } ${isRtl ? 'font-arabic text-base sm:text-lg leading-relaxed' : 'font-body'}`}
          >
            {t('exp.subtitle')}
          </p>
        </div>

        {/* Upwork Top Rated Plus Banner */}
        <a
          href={PORTFOLIO_INFO.upworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 md:mt-0 p-4 rounded-2xl border flex items-center gap-4 shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#1b1b20] border-[#f2ca50]/40 text-[#e4e1e9] hover:border-[#f2ca50] glow-primary'
              : 'bg-white border-[#c49a1b]/50 text-[#1a1a20] hover:border-[#8c6800]'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-xl ${
              theme === 'dark'
                ? 'bg-[#f2ca50]/15 border-[#f2ca50] text-[#f2ca50]'
                : 'bg-[#8c6800]/15 border-[#8c6800] text-[#8c6800]'
            }`}
          >
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${
                  theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                }`}
              >
                {t('exp.topRated')}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-mono font-bold">
                {t('exp.jss')}
              </span>
            </div>
            <p className={`text-xs mt-0.5 flex items-center gap-1.5 ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}`}>
              <span>{t('exp.topTalent')}</span>
              <ExternalLink className="w-3 h-3 text-[#f2ca50]" />
            </p>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Career Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <h3
            className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${
              theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
            }`}
          >
            <Briefcase
              className={`w-6 h-6 ${theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'}`}
            />
            <span>{t('exp.milestones')}</span>
          </h3>

          <div
            className={`relative ${
              isRtl
                ? 'border-r mr-3 md:mr-4 pr-6 md:pr-8'
                : 'border-l ml-3 md:ml-4 pl-6 md:pl-8'
            } space-y-8 ${theme === 'dark' ? 'border-[#f2ca50]/20' : 'border-[#c49a1b]/30'}`}
          >
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline node dot */}
                <div
                  className={`absolute ${
                    isRtl ? '-right-[31px] md:-right-[39px]' : '-left-[31px] md:-left-[39px]'
                  } top-1.5 w-4 h-4 rounded-full border-2 transition-colors shadow-sm ${
                    theme === 'dark'
                      ? 'bg-[#131318] border-[#f2ca50] group-hover:bg-[#f2ca50]'
                      : 'bg-white border-[#8c6800] group-hover:bg-[#8c6800]'
                  }`}
                />

                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 glass-card ${
                    theme === 'dark'
                      ? 'bg-[#1b1b20] border-[#4d4635] group-hover:border-[#f2ca50]/40'
                      : 'bg-white border-[#c49a1b]/30 group-hover:border-[#8c6800] shadow-md'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                        theme === 'dark'
                          ? 'bg-[#f2ca50]/10 border-[#f2ca50]/20 text-[#f2ca50]'
                          : 'bg-[#8c6800]/10 border-[#c49a1b]/30 text-[#8c6800]'
                      }`}
                    >
                      {language === 'ar' ? exp.periodAr : exp.period}
                    </span>
                    <span
                      className={`text-xs font-mono ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                      }`}
                    >
                      {language === 'ar' ? exp.typeAr : exp.type}
                    </span>
                  </div>

                  <h4
                    className={`text-lg sm:text-xl font-bold mt-2 ${
                      theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                    }`}
                  >
                    {language === 'ar' ? exp.roleAr : exp.role}
                  </h4>
                  <p
                    className={`text-xs font-semibold mb-3 ${
                      theme === 'dark' ? 'text-[#acc7ff]' : 'text-[#0468d7]'
                    }`}
                  >
                    {language === 'ar' ? exp.companyAr : exp.company}
                  </p>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#4b5563]'
                    }`}
                  >
                    {language === 'ar' ? exp.descriptionAr : exp.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {(language === 'ar' ? exp.achievementsAr : exp.achievements).map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#1f2937]'}>
                          {ach}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`flex flex-wrap gap-1.5 pt-3 border-t ${
                      theme === 'dark' ? 'border-[#2a292f]' : 'border-[#ede7d8]'
                    }`}
                  >
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                          theme === 'dark'
                            ? 'bg-[#131318] text-[#d0c5af] border-[#2a292f]'
                            : 'bg-[#f7f4ec] text-[#574f3e] border-[#e0d8c7]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Client Endorsements & Reviews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h3
            className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${
              theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
            }`}
          >
            <Quote
              className={`w-6 h-6 ${theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'}`}
            />
            <span>{t('exp.testimonials')}</span>
          </h3>

          <div className="space-y-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 glass-card relative ${
                  theme === 'dark'
                    ? 'bg-[#1b1b20] border-[#4d4635] hover:border-[#f2ca50]/40'
                    : 'bg-white border-[#c49a1b]/30 hover:border-[#8c6800] shadow-md'
                }`}
              >
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                      }`}
                    />
                  ))}
                  <span
                    className={`text-xs font-mono ${
                      isRtl ? 'mr-2' : 'ml-2'
                    } ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}`}
                  >
                    {t('exp.verified')}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm italic leading-relaxed mb-6 font-normal ${
                    theme === 'dark' ? 'text-[#e4e1e9]/90' : 'text-[#374151]'
                  }`}
                >
                  "{language === 'ar' ? test.contentAr : test.content}"
                </p>

                <div
                  className={`flex items-center justify-between pt-4 border-t ${
                    theme === 'dark' ? 'border-[#2a292f]' : 'border-[#ede7d8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.clientName}
                      className={`w-10 h-10 rounded-full object-cover border ${
                        theme === 'dark' ? 'border-[#f2ca50]/40' : 'border-[#8c6800]/40'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5
                        className={`text-xs font-bold ${
                          theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
                        }`}
                      >
                        {language === 'ar' ? test.clientNameAr : test.clientName}
                      </h5>
                      <p className={`text-[11px] ${theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'}`}>
                        {language === 'ar' ? test.roleAr : test.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-1 rounded border ${
                      theme === 'dark'
                        ? 'text-[#f2ca50] bg-[#f2ca50]/10 border-[#f2ca50]/20'
                        : 'text-[#8c6800] bg-[#8c6800]/10 border-[#c49a1b]/30'
                    }`}
                  >
                    {language === 'ar' ? test.countryAr : test.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
