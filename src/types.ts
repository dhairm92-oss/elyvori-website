export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface SkillCategory {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  description?: string;
  descriptionAr?: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    highlight?: boolean;
    category: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  category: 'Fintech' | 'Health' | 'E-Commerce' | 'Social' | 'Productivity';
  categoryAr: string;
  description: string;
  descriptionAr: string;
  fullOverview: string;
  fullOverviewAr: string;
  architecture: string;
  architectureAr: string;
  stateManagement: string;
  stateManagementAr: string;
  backend: string;
  backendAr: string;
  features: string[];
  featuresAr: string[];
  metrics: string[];
  metricsAr: string[];
  tags: string[];
  image: string;
  mockupColor: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  periodAr: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  location: string;
  locationAr: string;
  type: string;
  typeAr: string;
  description: string;
  descriptionAr: string;
  achievements: string[];
  achievementsAr: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientNameAr: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  avatar: string;
  rating: number;
  content: string;
  contentAr: string;
  project: string;
  projectAr: string;
  country: string;
  countryAr: string;
}

