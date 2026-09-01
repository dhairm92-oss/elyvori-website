import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ExternalLink, ArrowUpRight, Sparkles, Smartphone, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeviceMockup3D } from './DeviceMockup3D';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const { language, theme, t, isRtl } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoriesEn = ['All', 'Fintech', 'Health', 'E-Commerce', 'Social', 'Productivity'];
  const categoriesAr = [
    { id: 'All', label: 'الكل' },
    { id: 'Fintech', label: 'تقنية مالية' },
    { id: 'Health', label: 'صحة ولياقة' },
    { id: 'E-Commerce', label: 'تجارة إلكترونية' },
    { id: 'Social', label: 'تواصل اجتماعي' },
    { id: 'Productivity', label: 'إنتاجية' },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="work" className="relative py-20 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs mb-3 font-semibold ${
              theme === 'dark'
                ? 'bg-[#f2ca50]/15 border-[#f2ca50]/30 text-[#f2ca50]'
                : 'bg-[#8c6800]/15 border-[#c49a1b]/40 text-[#8c6800]'
            } ${isRtl ? 'font-arabic' : 'font-label-caps'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('work.badge')}</span>
          </div>

          <h2
            className={`font-display-section text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold ${
              theme === 'dark' ? 'heading-luxury-gold drop-shadow-[0_4px_25px_rgba(242,202,80,0.15)]' : 'text-[#8c6800]'
            }`}
          >
            {t('work.title')}
          </h2>
          <p
            className={`text-base sm:text-lg mt-2.5 max-w-2xl ${
              theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#6b6455]'
            } ${isRtl ? 'font-arabic text-base sm:text-lg leading-relaxed' : 'font-body'}`}
          >
            {t('work.subtitle')}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
          {language === 'ar'
            ? categoriesAr.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`font-arabic text-xs px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? theme === 'dark'
                          ? 'border-[#f2ca50] bg-[#f2ca50] text-[#131318] font-bold shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                          : 'border-[#8c6800] bg-[#8c6800] text-white font-bold shadow-md'
                        : theme === 'dark'
                        ? 'border-[#4d4635] bg-[#1b1b20]/60 text-[#d0c5af] hover:border-[#f2ca50]/50 hover:text-[#e4e1e9]'
                        : 'border-[#e0d8c7] bg-white text-[#574f3e] hover:border-[#8c6800]/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })
            : categoriesEn.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-label-caps text-xs px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? theme === 'dark'
                          ? 'border-[#f2ca50] bg-[#f2ca50] text-[#131318] font-bold shadow-[0_0_15px_rgba(242,202,80,0.3)]'
                          : 'border-[#8c6800] bg-[#8c6800] text-white font-bold shadow-md'
                        : theme === 'dark'
                        ? 'border-[#4d4635] bg-[#1b1b20]/60 text-[#d0c5af] hover:border-[#f2ca50]/50 hover:text-[#e4e1e9]'
                        : 'border-[#e0d8c7] bg-white text-[#574f3e] hover:border-[#8c6800]/50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
        </div>
      </div>

      {/* Projects Grid with Interactive 3D Device Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group rounded-3xl border overflow-hidden glass-card transition-all duration-300 flex flex-col shadow-xl ${
              theme === 'dark'
                ? 'bg-[#1b1b20] border-[#4d4635] hover:border-[#f2ca50]/70 hover:shadow-[0_0_35px_rgba(242,202,80,0.18)]'
                : 'bg-white border-[#c49a1b]/30 hover:border-[#8c6800] hover:shadow-[0_10px_35px_rgba(140,104,0,0.15)]'
            }`}
          >
            {/* Interactive 3D Device Mockup Stage */}
            <div
              className={`relative w-full pt-4 pb-2 px-3 border-b flex flex-col items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-gradient-to-b from-[#131318] via-[#16161f] to-[#1a1a24] border-[#2a292f]'
                  : 'bg-gradient-to-b from-[#f7f3e8] via-[#f0ead8] to-[#e8e0cb] border-[#e0d8c7]'
              }`}
            >
              <DeviceMockup3D
                project={project}
                onInspect={() => onSelectProject(project)}
              />
            </div>

            {/* Project Summary & Technical Insights */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-[#f2ca50]/15 text-[#f2ca50] border-[#f2ca50]/30'
                        : 'bg-[#8c6800]/15 text-[#8c6800] border-[#c49a1b]/40'
                    }`}
                  >
                    {language === 'ar' ? project.categoryAr : project.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {language === 'ar' ? 'معتمد للإنتاج' : 'Production Verified'}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectProject(project)}
                  className={`text-lg md:text-xl font-bold transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'text-[#e4e1e9] group-hover:text-[#f2ca50]'
                      : 'text-[#1a1a20] group-hover:text-[#8c6800]'
                  }`}
                >
                  {language === 'ar' ? project.titleAr : project.title}
                </h3>
                <p
                  className={`text-xs line-clamp-2 mt-2 leading-relaxed font-normal ${
                    theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#574f3e]'
                  }`}
                >
                  {language === 'ar' ? project.taglineAr : project.tagline}
                </p>
              </div>

              {/* Highlights & Action Button */}
              <div
                className={`space-y-3 pt-3 border-t ${
                  theme === 'dark' ? 'border-[#2a292f]' : 'border-[#ede7d8]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className={`font-semibold ${
                      theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                    }`}
                  >
                    {language === 'ar' ? project.metricsAr[0] : project.metrics[0]}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                    theme === 'dark'
                      ? 'bg-[#131318] hover:bg-[#f2ca50] hover:text-[#131318] text-[#f2ca50] border-[#f2ca50]/40'
                      : 'bg-white hover:bg-[#8c6800] hover:text-white text-[#8c6800] border-[#c49a1b]/50 shadow-sm'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('work.inspect')}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
