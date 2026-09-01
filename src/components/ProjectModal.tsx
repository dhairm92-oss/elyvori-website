import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Layers,
  Server,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');
  const { language, theme, t, isRtl } = useApp();

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] border rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
          theme === 'dark'
            ? 'bg-[#1b1b20] border-[#f2ca50]/30 text-[#e4e1e9]'
            : 'bg-white border-[#c49a1b]/40 text-[#1a1a20]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div
          className={`relative h-44 sm:h-56 w-full overflow-hidden ${
            theme === 'dark' ? 'bg-[#131318]' : 'bg-[#e5dfcf]'
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-125"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              theme === 'dark'
                ? 'from-[#1b1b20] via-[#1b1b20]/60 to-transparent'
                : 'from-white via-white/60 to-transparent'
            }`}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 ${
              isRtl ? 'left-5' : 'right-5'
            } p-2.5 rounded-full border transition-colors focus:outline-none cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#131318]/80 text-[#e4e1e9] hover:text-[#f2ca50] border-[#f2ca50]/20 hover:border-[#f2ca50]'
                : 'bg-white/80 text-[#1a1a20] hover:text-[#8c6800] border-[#c49a1b]/40 hover:border-[#8c6800] shadow-sm'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Category */}
          <div className="absolute bottom-5 left-6 sm:left-8 right-6">
            <div
              className={`inline-block px-3 py-1 rounded-full border text-xs mb-2 font-bold tracking-wider ${
                theme === 'dark'
                  ? 'bg-[#f2ca50]/20 border-[#f2ca50]/40 text-[#f2ca50]'
                  : 'bg-[#8c6800]/15 border-[#c49a1b]/50 text-[#8c6800]'
              }`}
            >
              {language === 'ar' ? project.categoryAr : project.category}
            </div>
            <h3
              className={`font-display-lg text-2xl sm:text-3xl md:text-4xl font-bold ${
                theme === 'dark' ? 'text-[#e4e1e9]' : 'text-[#1a1a20]'
              }`}
            >
              {language === 'ar' ? project.titleAr : project.title}
            </h3>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex border-b px-6 sm:px-8 ${
            theme === 'dark' ? 'bg-[#18181d] border-[#2a292f]' : 'bg-[#faf8f3] border-[#e5dfcf]'
          }`}
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 text-xs tracking-wider border-b-2 transition-all cursor-pointer font-semibold ${
              activeTab === 'overview'
                ? theme === 'dark'
                  ? 'border-[#f2ca50] text-[#f2ca50] font-bold'
                  : 'border-[#8c6800] text-[#8c6800] font-bold'
                : theme === 'dark'
                ? 'border-transparent text-[#a1a1aa] hover:text-[#e4e1e9]'
                : 'border-transparent text-[#6b7280] hover:text-[#1a1a20]'
            }`}
          >
            {t('work.tab.overview')}
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 px-4 text-xs tracking-wider border-b-2 transition-all cursor-pointer font-semibold ${
              activeTab === 'architecture'
                ? theme === 'dark'
                  ? 'border-[#f2ca50] text-[#f2ca50] font-bold'
                  : 'border-[#8c6800] text-[#8c6800] font-bold'
                : theme === 'dark'
                ? 'border-transparent text-[#a1a1aa] hover:text-[#e4e1e9]'
                : 'border-transparent text-[#6b7280] hover:text-[#1a1a20]'
            }`}
          >
            {t('work.tab.arch')}
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`py-3.5 px-4 text-xs tracking-wider border-b-2 transition-all cursor-pointer font-semibold ${
              activeTab === 'features'
                ? theme === 'dark'
                  ? 'border-[#f2ca50] text-[#f2ca50] font-bold'
                  : 'border-[#8c6800] text-[#8c6800] font-bold'
                : theme === 'dark'
                ? 'border-transparent text-[#a1a1aa] hover:text-[#e4e1e9]'
                : 'border-transparent text-[#6b7280] hover:text-[#1a1a20]'
            }`}
          >
            {t('work.tab.features')}
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4
                  className={`text-xs uppercase tracking-wider mb-2 font-bold ${
                    theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                  }`}
                >
                  {t('work.modal.summary')}
                </h4>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    theme === 'dark' ? 'text-[#d0c5af]' : 'text-[#374151]'
                  }`}
                >
                  {language === 'ar' ? project.fullOverviewAr : project.fullOverview}
                </p>
              </div>

              {/* Key Impact Metrics */}
              <div>
                <h4
                  className={`text-xs uppercase tracking-wider mb-3 font-bold ${
                    theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                  }`}
                >
                  {t('work.modal.metrics')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(language === 'ar' ? project.metricsAr : project.metrics).map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                        theme === 'dark'
                          ? 'bg-[#131318] border-[#f2ca50]/20'
                          : 'bg-[#f7f4ec] border-[#c49a1b]/30'
                      }`}
                    >
                      <Activity
                        className={`w-5 h-5 shrink-0 ${
                          theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-semibold font-mono">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4
                  className={`text-xs uppercase tracking-wider mb-2 ${
                    theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
                  }`}
                >
                  {t('work.modal.stack')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1 rounded-full border font-mono ${
                        theme === 'dark'
                          ? 'bg-[#2a292f] text-[#37beff] border-[#37beff]/30'
                          : 'bg-[#f0f7ff] text-[#0468d7] border-[#0468d7]/30'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  theme === 'dark'
                    ? 'bg-[#131318] border-[#f2ca50]/20'
                    : 'bg-[#f7f4ec] border-[#c49a1b]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Layers
                    className={`w-6 h-6 shrink-0 mt-0.5 ${
                      theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                    }`}
                  />
                  <div>
                    <h5 className="text-sm font-bold">{t('work.modal.pattern')}</h5>
                    <p
                      className={`text-xs mt-1 font-mono ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#574f3e]'
                      }`}
                    >
                      {language === 'ar' ? project.architectureAr : project.architecture}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 pt-3 border-t ${
                    theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e0d8c7]'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-[#37beff] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold">{t('work.modal.state')}</h5>
                    <p
                      className={`text-xs mt-1 font-mono ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#574f3e]'
                      }`}
                    >
                      {language === 'ar' ? project.stateManagementAr : project.stateManagement}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 pt-3 border-t ${
                    theme === 'dark' ? 'border-[#2a292f]' : 'border-[#e0d8c7]'
                  }`}
                >
                  <Server
                    className={`w-6 h-6 shrink-0 mt-0.5 ${
                      theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                    }`}
                  />
                  <div>
                    <h5 className="text-sm font-bold">{t('work.modal.backend')}</h5>
                    <p
                      className={`text-xs mt-1 font-mono ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#574f3e]'
                      }`}
                    >
                      {language === 'ar' ? project.backendAr : project.backend}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  theme === 'dark'
                    ? 'bg-[#131318]/70 border-[#2a292f] text-[#d0c5af]'
                    : 'bg-white border-[#e0d8c7] text-[#374151]'
                }`}
              >
                <span
                  className={`font-bold font-mono ${
                    theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                  }`}
                >
                  {language === 'ar' ? 'معيار الأداء: ' : 'Performance Rule: '}
                </span>
                {language === 'ar'
                  ? 'تم تصميم الكود بمراقبة دقيقة لميزانية الإطارات (Frame Budget 16ms)، وإعادة بناء جزئي للعناصر فقط، وتسريع عتادي عبر Skia/Impeller لضمان تجربة مستخدم خالية تماماً من التقطيع.'
                  : 'Engineered with constant frame budget tracking, lazy widget reconstruction via selectors, and hardware-accelerated Skia/Impeller pipeline passes to eliminate UI stutter under heavy workloads.'}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4
                className={`text-xs uppercase tracking-wider mb-2 font-bold ${
                  theme === 'dark' ? 'text-[#f2ca50]' : 'text-[#8c6800]'
                }`}
              >
                {t('work.modal.features')}
              </h4>
              <ul className="space-y-2.5">
                {(language === 'ar' ? project.featuresAr : project.features).map((feat, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-[#131318] border-[#2a292f]'
                        : 'bg-[#f7f4ec] border-[#e0d8c7]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          className={`p-5 sm:p-6 border-t flex flex-wrap items-center justify-between gap-4 ${
            theme === 'dark' ? 'bg-[#131318] border-[#2a292f]' : 'bg-[#f4ede0] border-[#e0d8c7]'
          }`}
        >
          <div
            className={`flex items-center gap-2 text-xs font-mono ${
              theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#6b7280]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('work.modal.verified')}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#f2ca50] hover:bg-[#ffe088] text-[#131318]'
                    : 'bg-[#8c6800] hover:bg-[#a67c00] text-white'
                }`}
              >
                <span>{t('work.modal.liveDemo')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
