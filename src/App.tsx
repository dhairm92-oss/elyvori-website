import React, { useState, useEffect } from 'react';
import { BackgroundShader } from './components/BackgroundShader';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { BreakingNewsTicker3D } from './components/BreakingNewsTicker3D';
import { Project } from './types';
import { AppProvider, useApp } from './context/AppContext';

function PortfolioApp() {
  const { theme, isRtl } = useApp();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll spy to update active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'work', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === 'hero' ? '' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo不易 = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 overflow-x-hidden ${
        theme === 'dark'
          ? 'bg-[#131318] text-[#e4e1e9] selection:bg-[#f2ca50]/30 selection:text-[#ffe088]'
          : 'bg-[#faf8f3] text-[#1a1a20] selection:bg-[#8c6800]/25 selection:text-[#8c6800]'
      } ${isRtl ? 'font-arabic' : 'font-body'}`}
    >
      {/* Background Interactive WebGL Shader */}
      <BackgroundShader opacity={theme === 'dark' ? 0.5 : 0.15} interactive={true} />

      {/* Background Interactive Three.js Floating Gold Spheres & Crescent */}
      <ThreeBackground opacity={theme === 'dark' ? 0.75 : 0.4} />

      {/* Global Ambient Lighting Orbs */}
      <div
        className={`fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] pointer-events-none -z-10 ${
          theme === 'dark' ? 'bg-[#f2ca50]/5' : 'bg-[#e5c158]/10'
        }`}
      />
      <div
        className={`fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] pointer-events-none -z-10 ${
          theme === 'dark' ? 'bg-[#0468d7]/8' : 'bg-[#0468d7]/5'
        }`}
      />

      {/* Main Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollTo不易}
        onOpenContactModal={() => scrollTo不易('contact')}
      />

      {/* Content Stream */}
      <main className="relative z-10">
        {/* 3D Interactive Breaking News Live Ticker Ribbon at the very top */}
        <BreakingNewsTicker3D onNavigateSection={scrollTo不易} />

        {/* Screen 1: Hero Section */}
        <HeroSection
          onViewWork={() => scrollTo不易('work')}
          onHireMe={() => scrollTo不易('contact')}
        />

        {/* Screen 2: About Me & Core Competencies Bento Grid */}
        <AboutSection />

        {/* Screen 3: Selected Work Case Studies & Live Interactive Filter */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Screen 4: Experience Timeline & Verified Upwork Testimonials */}
        <ExperienceSection />

        {/* Screen 5: Interactive Project Scope Estimator & Direct Inquiry */}
        <ContactSection />
      </main>

      {/* Screen Footer */}
      <Footer />

      {/* Detailed Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Luxury Interactive WhatsApp Consultation Floating Widget */}
      <WhatsAppWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortfolioApp />
    </AppProvider>
  );
}
