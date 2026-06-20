import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Bot,
  Building2,
  ChevronLeft,
  ChevronRight,
  Contact,
  Cpu,
  Frame,
  Layers3,
  Mail,
  MapPin,
  MonitorSmartphone,
  PenTool,
  Phone,
  House,
  Sparkles,
  SquareStack,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Grainient from './components/Grainient';
import BorderGlow from './components/BorderGlow';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_VIEWPORT = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
const PHONE_DESKTOP_VIEWPORT = 'width=1440, viewport-fit=cover';
const LANGUAGE_STORAGE_KEY = 'afd-site-language';

function isPhoneLikeDevice() {
  if (typeof window === 'undefined') return false;

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowScreen = window.matchMedia('(max-width: 767px)').matches;
  const touchCapable = navigator.maxTouchPoints > 0;
  const userAgent = navigator.userAgent || '';
  const phoneAgent = /Android.*Mobile|iPhone|iPod|Windows Phone|Mobile/i.test(userAgent);

  return (phoneAgent || (coarsePointer && narrowScreen)) && touchCapable;
}

function DeviceViewportManager() {
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) return undefined;

    const applyViewport = () => {
      const isPhone = isPhoneLikeDevice();
      viewportMeta.setAttribute('content', isPhone ? PHONE_DESKTOP_VIEWPORT : DEFAULT_VIEWPORT);
      document.documentElement.dataset.device = isPhone ? 'phone' : 'desktop';
      document.body.dataset.device = isPhone ? 'phone' : 'desktop';
    };

    applyViewport();

    const mediaQueries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(pointer: coarse)'),
    ];

    mediaQueries.forEach((query) => {
      if (query.addEventListener) {
        query.addEventListener('change', applyViewport);
      } else {
        query.addListener(applyViewport);
      }
    });

    window.addEventListener('orientationchange', applyViewport);
    window.addEventListener('resize', applyViewport);

    return () => {
      viewportMeta.setAttribute('content', DEFAULT_VIEWPORT);
      delete document.documentElement.dataset.device;
      delete document.body.dataset.device;
      mediaQueries.forEach((query) => {
        if (query.removeEventListener) {
          query.removeEventListener('change', applyViewport);
        } else {
          query.removeListener(applyViewport);
        }
      });
      window.removeEventListener('orientationchange', applyViewport);
      window.removeEventListener('resize', applyViewport);
    };
  }, []);

  return null;
}

function AppImage({ eager = false, fetchPriority, decoding = 'async', ...props }) {
  return (
    <img
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={fetchPriority || (eager ? 'high' : 'auto')}
      decoding={decoding}
      {...props}
    />
  );
}

const contact = {
  name: 'Geng Zhuohua',
  title: 'AFD Design Studio',
  location: 'China',
  email: '635296715@qq.com',
  phone: '+86 156 9632 9109',
  wechat: 'WeChat ID: zh_zuishuai',
};

const categories = [
  {
    title: 'Visual Design',
    icon: PenTool,
    items: ['Graphic Design', 'Poster Design', 'Logo Design', 'UI Design', 'Brand Identity'],
  },
  {
    title: 'AI Design',
    icon: Cpu,
    items: ['AI Agent Design', 'AI Skill Design', 'AI Website / Web / App / Mini Program'],
  },
  {
    title: 'Spatial Design',
    icon: Building2,
    items: ['Residential Design', 'Office / Club / Hotel', 'Retail Space', 'Landscape Design', 'Livestream Set'],
  },
];

const expertiseStats = [
  { value: '05', unit: 'YRS', label: 'Spatial and Brand Design', detail: 'Experience spanning brand systems, space, and high-quality project delivery.' },
  { value: '03', unit: 'LANES', label: 'Core Capability Tracks', detail: 'Visual design, spatial design, and AI-driven digital product delivery.' },
  { value: '80+', unit: 'PROJECTS', label: 'Cross-Category Work', detail: 'Projects across branding, interiors, web, apps, and AI systems.' },
  { value: '08', unit: 'PHASES', label: 'Stable Delivery Method', detail: 'From brief and proposal to production and handoff with a clear workflow.' },
];

const featuredProjects = [
  {
    type: 'VISUAL',
    title: 'XENITH Brand Visual System',
    desc: 'Brand identity, visual recognition, and packaging extension.',
    tags: ['Brand Visual', 'VI', 'Packaging'],
    tone: 'amber',
    image: '/assets/xenith-brand.webp',
    gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
  },
  {
    type: 'AI',
    title: 'Spring Mountain F&B Brand Design',
    desc: 'Restaurant brand, packaging system, and visual extension.',
    tags: ['F&B Brand', 'VI', 'Packaging'],
    tone: 'cyan',
    image: '/assets/spring-mountain-visual.webp',
    gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
  },
  {
    type: 'SPACE',
    title: 'Linyeji LINKING Full-Service Design',
    desc: 'Full-service brand planning, VI, and graphic system.',
    tags: ['Full-Service', 'VI', 'Graphic'],
    tone: 'violet',
    image: '/assets/linyeji-linking.webp',
    gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
  },
  {
    type: 'UI',
    title: 'Yubao / Yinyu Full-Service Design',
    desc: 'Full-service design, VI, and graphic visual system.',
    tags: ['Full-Service', 'VI', 'Graphic'],
    tone: 'green',
    image: '/assets/yuyao-silverjade.webp',
    gallery: ['/assets/yuyao-silverjade.webp'],
  },
];

const projectRows = [
  {
    slug: 'visual',
    icon: PenTool,
    no: '01',
    title: 'Visual Design',
    label: 'VISUAL DESIGN',
    description: 'From graphic systems and posters to logos, UI, and brand identity, building a unified visual language.',
    archiveDetail: 'Focused on brand recognition, visual systems, and digital expression to form a complete and consistent project presentation.',
    layout: 'overviewLeft',
    route: '/works?section=visual',
    subcategories: [
      { label: 'Graphic Design', icon: PenTool },
      { label: 'Poster Design', icon: Frame },
      { label: 'Logo Design', icon: Sparkles },
      { label: 'UI Design', icon: MonitorSmartphone },
      { label: 'Brand Identity', icon: Layers3 },
    ],
    projects: [
      { title: 'XENITH Brand Visual System', meta: 'Brand design / visual identity / extension', year: '2024', visual: 'visualBrand', image: '/assets/xenith-brand.webp', gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'], focal: '50% 42%', focus: ['Brand Design', 'VI'] },
      { title: 'Spring Mountain F&B Brand Design', meta: 'Brand design / dining visuals / packaging system', year: '2024', visual: 'visualUi', image: '/assets/spring-mountain-visual.webp', gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'], focal: '50% 44%', focus: ['F&B Brand', 'Packaging'] },
      { title: 'Linyeji LINKING Full-Service Design', meta: 'Full-service design / VI / graphics', year: '2023', visual: 'visualObject', image: '/assets/linyeji-linking.webp', gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'], focal: '50% 40%', focus: ['Full-Service', 'VI'] },
      { title: 'Yubao / Yinyu Full-Service Design', meta: 'Full-service design / VI / graphics', year: '2024', visual: 'visualBrand', image: '/assets/yuyao-silverjade.webp', gallery: ['/assets/yuyao-silverjade.webp'], focal: '50% 42%', focus: ['Full-Service', 'VI'] },
    ],
  },
  {
    slug: 'space',
    icon: Building2,
    no: '02',
    title: 'Spatial Design',
    label: 'SPATIAL DESIGN',
    description: 'Residential, dining, retail, and club settings shaped through narrative space and grounded experience.',
    archiveDetail: 'Projects around lifestyle, commerce, and spatial storytelling, spanning homes, dining, retail, and club environments.',
    layout: 'overviewRight',
    route: '/works?section=space',
    subcategories: [
      { label: 'Residential Design', icon: Building2 },
      { label: 'Office / Club / Hotel', icon: Frame },
      { label: 'Retail Space', icon: SquareStack },
      { label: 'Landscape Design', icon: Sparkles },
      { label: 'Livestream Set', icon: MonitorSmartphone },
    ],
    projects: [
      { title: 'Spring Mountain Retail Dining Space', meta: 'Commercial interior / dining space / brand support', year: '2024', visual: 'spaceLight', image: '/assets/spring-mountain-space.webp', gallery: ['/assets/spring-mountain-space.webp'], focal: '50% 48%', focus: ['Commercial Interior', 'Dining Space'] },
      { title: 'Wuhan Rongchuang No.1 Residence', meta: 'Residential design / floor plan / modern minimal', year: '2023', visual: 'spaceGallery', image: '/assets/wuhan-rongchuang-1.webp', gallery: ['/assets/wuhan-rongchuang-1.webp'], focal: '50% 38%', focus: ['Residential Design'] },
      { title: 'MOMENT Main Material Exhibition Hall', meta: 'Exhibition interior / narrative space / restrained minimalism', year: '2023', visual: 'spaceRetail', image: '/assets/moment-main-material.webp', gallery: ['/assets/moment-main-material.webp'], focal: '50% 42%', focus: ['Exhibition Space'] },
      { title: 'Yinyu Chinese Tea Bar in Italy', meta: 'Retail space / tea and dining / modern Chinese tone', year: '2024', visual: 'spaceRetail', image: '/assets/yinyu-italy-tea.jpg', gallery: ['/assets/yinyu-italy-tea.jpg'], focal: '50% 44%', focus: ['Retail Space'] },
      { title: 'Modern Oriental Residence / Wuhan', meta: '120 sqm / residential interior / oriental modern', year: '2024', visual: 'spaceLight', image: '/assets/wuhan-oriental-home.webp', gallery: ['/assets/wuhan-oriental-home.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Renji Bakery / Wuhan Fanhai Plaza', meta: 'Retail / bakery space / deconstructive tone', year: '2024', visual: 'spaceGallery', image: '/assets/kq-fanhai-bakery.jpg', gallery: ['/assets/kq-fanhai-bakery.jpg'], focal: '50% 42%', focus: ['Retail Space'] },
      { title: 'The Boots Restaurant / Wuhan', meta: 'Dining interior / commercial architecture / leisure', year: '2024', visual: 'spaceLight', image: '/assets/the-boots-wuhan.webp', gallery: ['/assets/the-boots-wuhan.webp'], focal: '50% 42%', focus: ['Dining Space'] },
      { title: 'Modern Italian Residence / Wuhan Tianchen', meta: '148 sqm / residence / modern Italian style', year: '2023', visual: 'spaceRetail', image: '/assets/huarun-tianchen-italian.webp', gallery: ['/assets/huarun-tianchen-italian.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Nanshan Club / Contemporary Business Space', meta: 'Club interior / business reception / contemporary restraint', year: '2023', visual: 'spaceGallery', image: '/assets/studio-bw.webp', gallery: ['/assets/studio-bw.webp'], focal: '50% 40%', focus: ['Club Space'] },
    ],
  },
  {
    slug: 'web',
    icon: MonitorSmartphone,
    no: '03',
    title: 'Web / App Build',
    label: 'WEB & APP BUILD',
    description: 'From brand websites to back-office systems, balancing experience, conversion, and information hierarchy.',
    archiveDetail: 'Covering brand sites, corporate sites, apps, and mini programs with integrated information architecture and visual presentation.',
    layout: 'overviewLeft',
    route: '/works?section=web',
    subcategories: [
      { label: 'Web / App Build', icon: MonitorSmartphone },
      { label: 'Web Development', icon: Cpu },
      { label: 'App Design', icon: Contact },
      { label: 'Back-Office System', icon: SquareStack },
      { label: 'UI Design', icon: Layers3 },
    ],
    projects: [
      { title: 'Linyeji LINKING Mall App and Admin System', meta: 'Commerce system / data visualization / permissions', year: '2024', visual: 'webDashboard', image: '/assets/linyeji-app-dashboard.webp', gallery: ['/assets/linyeji-app-dashboard.webp', '/assets/linyeji-linking.webp'], focal: '50% 24%', focus: ['Commerce System'] },
      { title: 'Spring Mountain Website Design and Development', meta: 'Brand website / responsive design / interaction', year: '2024', visual: 'webMobile', image: '/assets/spring-mountain-ui.webp', gallery: ['/assets/spring-mountain-ui.webp', '/assets/enterprise-homepage-dev.webp'], focal: '50% 36%', focus: ['Brand Website'] },
      { title: 'Corporate Website Design and Development', meta: 'Corporate website / business interaction / marketing conversion', year: '2023', visual: 'webLanding', image: '/assets/enterprise-homepage-dev.webp', gallery: ['/assets/enterprise-homepage-dev.webp'], focal: '52% 42%', focus: ['Corporate Website'] },
    ],
  },
  {
    slug: 'ai',
    icon: Bot,
    no: '04',
    title: 'AI Agent Build',
    label: 'AI AGENT BUILD',
    description: 'From customer service and workflows to knowledge management, building intelligent systems that can actually run.',
    archiveDetail: 'Centered on AI customer service, workflow automation, and knowledge management to form practical, reusable solutions.',
    layout: 'overviewRight',
    route: '/works?section=ai',
    subcategories: [
      { label: 'AI Agents', icon: Bot },
      { label: 'AI Skills', icon: Sparkles },
      { label: 'Workflow Design', icon: SquareStack },
      { label: 'Knowledge Base', icon: Cpu },
      { label: 'AI Web / App', icon: MonitorSmartphone },
    ],
    projects: [
      { title: 'AI Customer Service Agent', meta: 'Customer inquiry / automated response / recommendation', year: '2024', visual: 'aiFlow', image: '/assets/nexa-ai-agent.webp', gallery: ['/assets/nexa-ai-agent.webp'], focal: '50% 20%', focus: ['AI Customer Service'] },
      { title: 'Business Workflow Automation Agent', meta: 'Process archive / content distribution / publishing', year: '2024', visual: 'aiWorkflow', image: '/assets/ai-workflow-panel.webp', gallery: ['/assets/ai-workflow-panel.webp'], focal: '50% 26%', focus: ['Workflow Automation', 'Content Distribution'] },
      { title: 'KM Agent', meta: 'Skill management / workflow archive / knowledge graph', year: '2023', visual: 'aiKnowledge', image: '/assets/km-agent.webp', gallery: ['/assets/km-agent.webp'], focal: '50% 36%', focus: ['Knowledge Management', 'Skill'] },
    ],
  },
];

const archiveMap = Object.fromEntries(projectRows.map((row) => [row.slug, row]));

const strengths = [
  { icon: Layers3, title: 'Strategy with Delivery', text: 'From brand thinking to spatial execution and digital expression, abstract needs are translated into actionable systems.' },
  { icon: Bot, title: 'Visual, Spatial, and AI Integration', text: 'Visual language, content systems, spatial atmosphere, and intelligent tooling stay aligned under one logic.' },
  { icon: Frame, title: 'High-Density Execution', text: 'Maintain rhythm and quality through complex delivery cycles, multi-round revision, and cross-platform collaboration.' },
  { icon: MonitorSmartphone, title: 'Long-Term Brand Collaboration', text: 'Not a one-off output, but a design relationship embedded into long-term brand growth and operation.' },
  { icon: Cpu, title: 'Web and Interaction Together', text: 'Information architecture, interface hierarchy, and front-end delivery move in sync to avoid design-development drift.' },
  { icon: Sparkles, title: 'Unified Taste and Detail', text: 'Typography, material language, layout, and motion stay coherent so the whole experience feels finished and intentional.' },
];

const introSlides = [
  {
    kind: 'company',
    kicker: 'COMPANY INTRODUCTION',
    title: 'AFD',
    headline: 'Company Overview',
    bodyParts: [
      { text: 'AFD Design Studio is an independent full-service practice focused on brand empowerment and lifestyle aesthetics.', accent: false },
      { text: 'Its work spans spatial design, visual design, and AI-driven digital design.', accent: true },
      { text: 'The studio was founded by professionals with backgrounds in design, supply-chain collaboration, and digital production.', accent: false },
      { text: 'The team has practical delivery experience in environmental space, graphic design, digital media, AI design, and software-oriented creative work.', accent: false },
      { text: 'The emphasis is always on practicality, adaptability, professionalism, and real-world execution.', accent: true },
    ],
    meta: 'SPACE / VISUAL / AI DIGITAL DESIGN',
    image: '/assets/studio-bw.webp',
  },
  {
    kind: 'designer',
    kicker: 'DESIGNER PROFILE',
    title: 'Geng Zhuohua',
    headline: 'Cross-Disciplinary Design Experience',
    body: 'With years of spatial and brand design experience, the practice spans brand VI, campaign graphics, e-commerce visuals, social media design, packaging, commercial interiors, residential design, websites, apps, and AI systems.',
    meta: 'STRATEGY / SYSTEM / DELIVERY',
    image: '/assets/designer-geng-final.webp',
  },
];

const UI_COPY = {
  zh: {
    navBrand: 'AFD Design Studio',
    navLinks: [
      { href: '#profile', label: 'About' },
      { href: '#projects', label: 'Works' },
      { href: '#strengths', label: 'Highlights' },
      { href: '#contact', label: 'Contact' },
    ],
    languageButton: 'EN',
    languageAria: 'Switch to English',
    homeAria: 'Back to home',
    prefaceTitle: 'Let design aesthetics\nshape your daily life',
    prefaceKicker: 'AFD DESIGN STUDIO',
    prefaceCopy: 'Independent full-service studio spanning visual design, interiors, residential projects, digital design, and AI agent building.',
    prefaceSub: 'Present aesthetics with care. Let design influence the way we live.',
    prefaceHint: 'Tap the title to enter',
    prefaceAria: 'Preface page',
    enterHomeAria: 'Enter home page',
    heroTitle: ['Full-Spectrum', 'Design Service'],
    heroAria: 'Full-spectrum design service',
    heroStatDesc: 'Cross-disciplinary project experience spanning brand visuals, AI applications, spatial scenarios, and digital products.',
    heroStart: 'Send Your Brief',
    profileControls: 'Slide controls',
    previousPage: 'Previous slide',
    nextPage: 'Next slide',
    expertiseTitle: 'Cross-Disciplinary Design Experience',
    expertiseLead: 'Bring visual design, spatial design, and digital design into one coherent expression system.',
    expertiseBody: 'The work spans brand VI, graphic campaigns, e-commerce visuals, social media design, packaging, commercial interiors, residential design, websites, apps, and AI systems.',
    expertiseHighlight: 'The focus is translating brand tone, user aesthetics, and market demand into solutions that are stable, elevated, and practical to execute.',
    showcaseTitle: 'Project Showcase',
    showcaseDesc: 'Each category is presented in a consistent three-column rhythm. Open any card to view the complete archive page for that project group.',
    viewAll: 'View all',
    projectCount: 'Projects',
    archiveFilterSuffix: 'category switch',
    openLargeImage: 'Tap to view large image',
    strengthsTitle: 'Core Advantages',
    strengthsDesc: 'Give every project a stable closed loop from concept to execution to final delivery.',
    contactHeading: 'Let our collaboration begin with clear communication',
    contactDesc: 'If you are developing a brand, space, AI, or web project, you can reach me directly through the contact card on the right.',
    contactRole: 'Full-Service Designer / Brand, Spatial, AI, and Digital Design',
    qrAlt: 'WeChat QR code',
    qrHint: 'Scan to add on WeChat',
    sendMail: 'Send Collaboration Email',
    requirementHeading: 'Start the project with a clear brief',
    requirementDesc: 'You can submit your needs directly. Based on project type, budget, and timeline, I will quickly suggest the right collaboration approach and the next step.',
    formProjectType: 'Project Type',
    formProjectPlaceholder: 'Select a project type',
    formName: 'Name',
    formNamePlaceholder: 'Enter your name',
    formRequirement: 'Brief',
    formRequirementPlaceholder: 'Describe the project goal, scope, and the problem you want to solve',
    formBudget: 'Budget',
    formBudgetPlaceholder: 'Select a budget range',
    formBudgetOptions: [
      { value: 'under-10k', label: 'Below 10k RMB' },
      { value: '10k-30k', label: '10k - 30k RMB' },
      { value: '30k-80k', label: '30k - 80k RMB' },
      { value: '80k-150k', label: '80k - 150k RMB' },
      { value: 'over-150k', label: 'Above 150k RMB' },
      { value: 'discuss', label: 'Need discussion' },
    ],
    sendRequirement: 'Send Brief',
    close: 'Close',
    previousImage: 'Previous image',
    nextImage: 'Next image',
  },const CONTACT_EN = {
  name: 'Geng Zhuohua',
  title: 'AFD Design Studio',
  location: 'China',
  email: '635296715@qq.com',
  phone: '+86 156 9632 9109',
  wechat: 'WeChat ID: zh_zuishuai',
};

const CATEGORIES_EN = [
  {
    title: 'Visual Design',
    icon: PenTool,
    items: ['Graphic Design', 'Poster Design', 'Logo Design', 'UI Design', 'Brand Identity'],
  },
  {
    title: 'AI Design',
    icon: Cpu,
    items: ['AI Agent Design', 'AI Skill Design', 'AI Websites / Web / APP / Mini Programs'],
  },
  {
    title: 'Spatial Design',
    icon: Building2,
    items: ['Residential Design', 'Office / Club / Hotel Design', 'New Retail Commercial Design', 'Landscape Design', 'Livestream Set Design'],
  },
];

const EXPERTISE_STATS_EN = [
  {
    value: '05',
    unit: 'YRS',
    label: 'Spatial and Brand Design Experience',
    detail: 'From brand systems to spatial atmosphere, balancing commercial delivery with everyday aesthetics.',
  },
  {
    value: '03',
    unit: 'LANES',
    label: 'Primary Capability Tracks',
    detail: 'Spatial design, visual design, and AI-driven digital products developed in parallel.',
  },
  {
    value: '80+',
    unit: 'PROJECTS',
    label: 'Delivered Across Categories',
    detail: 'Covering brand visuals, space implementation, web / app products, and AI agent customization.',
  },
  {
    value: '08',
    unit: 'PHASES',
    label: 'Stable Delivery Framework',
    detail: 'From requirement breakdown to proposal, production, and handoff with a clear process.',
  },
];

const FEATURED_PROJECTS_EN = [
  {
    type: 'VISUAL',
    title: 'XENITH Brand Visual System',
    desc: 'Brand identity / visual recognition / packaging extension.',
    tags: ['Brand Visuals', 'VI', 'Packaging'],
    tone: 'amber',
    image: '/assets/xenith-brand.webp',
    gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
  },
  {
    type: 'AI',
    title: 'Spring Mountain F&B Brand Design',
    desc: 'Restaurant brand / packaging system / visual extension.',
    tags: ['F&B Brand', 'VI', 'Packaging'],
    tone: 'cyan',
    image: '/assets/spring-mountain-visual.webp',
    gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
  },
  {
    type: 'SPACE',
    title: 'Linyeji LINKING Full-Service Design',
    desc: 'Full-service brand work / VI design / graphic visual system.',
    tags: ['Full-Service Design', 'VI', 'Graphic'],
    tone: 'violet',
    image: '/assets/linyeji-linking.webp',
    gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
  },
  {
    type: 'UI',
    title: 'Yubao 璺?Yinyu Full-Service Design',
    desc: 'Full-service planning / VI design / graphic visual system.',
    tags: ['Full-Service Design', 'VI', 'Graphic'],
    tone: 'green',
    image: '/assets/yuyao-silverjade.webp',
    gallery: ['/assets/yuyao-silverjade.webp'],
  },
];

const STRENGTHS_EN = [
  {
    icon: Layers3,
    title: 'Strategy with Commercial Delivery',
    text: 'From brand thinking to spatial execution and digital expression, abstract needs are translated into actionable systems.',
  },
  {
    icon: Bot,
    title: 'Visual, Spatial, and AI Integration',
    text: 'Visual language, content systems, spatial atmosphere, and intelligent tooling remain aligned under one logic.',
  },
  {
    icon: Frame,
    title: 'High-Density Project Execution',
    text: 'Maintain rhythm and quality through complex delivery cycles, multi-round revision, and cross-platform collaboration.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Long-Term Brand Co-Creation',
    text: 'Not a one-off output, but a design relationship embedded into the brand閳ユ獨 long-term growth and operation.',
  },
  {
    icon: Cpu,
    title: 'Web and Interaction, Built Together',
    text: 'Information architecture, interface hierarchy, and front-end delivery move in sync to avoid design-development drift.',
  },
  {
    icon: Sparkles,
    title: 'Unified Taste and Detail Control',
    text: 'Typography, material language, layout, and motion stay coherent so the whole experience feels finished and intentional.',
  },
];

const INTRO_SLIDES_EN = [
  {
    kind: 'company',
    kicker: 'COMPANY INTRODUCTION',
    title: 'AFD',
    headline: 'Company Overview',
    bodyParts: [
      { text: 'AFD Design Studio is an independent full-service practice focused on brand empowerment and lifestyle aesthetics.', accent: false },
      { text: 'Its work spans spatial design, visual design, and AI-driven digital design.', accent: true },
      { text: 'The studio was founded by professionals with backgrounds in design, supply-chain collaboration, and digital production.', accent: false },
      { text: 'The team has experience across well-known design firms and studios, with practical delivery expertise in environmental space, graphic design, digital media, AI design, and software-oriented creative work.', accent: false },
      { text: 'The emphasis is always on practicality, adaptability, professionalism, and real-world execution.', accent: true },
    ],
    meta: 'SPACE / VISUAL / AI DIGITAL DESIGN',
    image: '/assets/studio-bw.webp',
  },
  {
    kind: 'designer',
    kicker: 'DESIGNER PROFILE',
    title: 'Geng Zhuohua',
    headline: 'Cross-Disciplinary Design Experience',
    body: 'With 5 years of spatial design and 3 years of full-service brand design experience, Geng Zhuohua is among the early builders of AI agents. The practice spans brand VI, campaign graphics, e-commerce visuals, social media design, packaging, commercial interiors, residential design, websites, apps, AICG, AI agents, and custom Skills.',
    meta: 'STRATEGY / SYSTEM / DELIVERY',
    image: '/assets/designer-geng-final.webp',
  },
];

const PROJECT_ROWS_EN = [
  {
    slug: 'visual',
    icon: PenTool,
    no: '01',
    title: 'Visual Design',
    label: 'VISUAL DESIGN',
    description: 'From graphic systems and posters to logos, UI, and brand identity, building a unified visual language.',
    archiveDetail: 'Focused on brand recognition, visual systems, and digital expression so every project forms a consistent presentation and experience.',
    layout: 'overviewLeft',
    route: '/works?section=visual',
    subcategories: [
      { label: 'Graphic Design', icon: PenTool },
      { label: 'Poster Design', icon: Frame },
      { label: 'Logo Design', icon: Sparkles },
      { label: 'UI Design', icon: MonitorSmartphone },
      { label: 'Brand Identity', icon: Layers3 },
    ],
    projects: [
      {
        title: 'XENITH Brand Visual System',
        meta: 'Brand design / visual identity / dynamic extension',
        year: '2024',
        visual: 'visualBrand',
        image: '/assets/xenith-brand.webp',
        gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
        focal: '50% 42%',
        focus: ['Brand Design', 'VI'],
      },
      {
        title: 'Spring Mountain F&B Brand Design',
        meta: 'Brand design / dining visuals / packaging system',
        year: '2024',
        visual: 'visualUi',
        image: '/assets/spring-mountain-visual.webp',
        gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
        focal: '50% 44%',
        focus: ['F&B Brand', 'Packaging'],
      },
      {
        title: 'Linyeji LINKING Full-Service Design',
        meta: 'Full-service design / VI design / graphic visuals',
        year: '2023',
        visual: 'visualObject',
        image: '/assets/linyeji-linking.webp',
        gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
        focal: '50% 40%',
        focus: ['Full-Service Design', 'VI'],
      },
      {
        title: 'Yubao 璺?Yinyu Full-Service Design',
        meta: 'Full-service design / VI design / graphic visuals',
        year: '2024',
        visual: 'visualBrand',
        image: '/assets/yuyao-silverjade.webp',
        gallery: ['/assets/yuyao-silverjade.webp'],
        focal: '50% 42%',
        focus: ['Full-Service Design', 'VI'],
      },
    ],
  },
  {
    slug: 'space',
    icon: Building2,
    no: '02',
    title: 'Spatial Design',
    label: 'SPATIAL DESIGN',
    description: 'Residential, dining, retail, and club settings shaped through narrative space and grounded experience.',
    archiveDetail: 'Projects unfold around lifestyle, commercial consumption, and spatial storytelling, spanning homes, dining, retail, and club environments.',
    layout: 'overviewRight',
    route: '/works?section=space',
    subcategories: [
      { label: 'Residential Design', icon: Building2 },
      { label: 'Office / Club / Hotel', icon: Frame },
      { label: 'New Retail Commercial', icon: SquareStack },
      { label: 'Landscape Design', icon: Sparkles },
      { label: 'Livestream Set Design', icon: MonitorSmartphone },
    ],
    projects: [
      { title: 'Spring Mountain New Retail Dining', meta: 'Commercial interior / dining space / brand empowerment', year: '2024', visual: 'spaceLight', image: '/assets/spring-mountain-space.webp', gallery: ['/assets/spring-mountain-space.webp'], focal: '50% 48%', focus: ['Commercial Interior', 'Dining Space'] },
      { title: 'Wuhan Rongchuang No.1 Residence', meta: 'Residential design / flat layout / modern minimal style', year: '2023', visual: 'spaceGallery', image: '/assets/wuhan-rongchuang-1.webp', gallery: ['/assets/wuhan-rongchuang-1.webp'], focal: '50% 38%', focus: ['Residential Design'] },
      { title: 'MOMENT Main Material Exhibition Hall', meta: 'Exhibition interior / narrative space / restrained minimalism', year: '2023', visual: 'spaceRetail', image: '/assets/moment-main-material.webp', gallery: ['/assets/moment-main-material.webp'], focal: '50% 42%', focus: ['Exhibition Space'] },
      { title: 'Yinyu Chinese Tea Bar in Italy', meta: 'New retail space / tea and dining / new Chinese aesthetics', year: '2024', visual: 'spaceRetail', image: '/assets/yinyu-italy-tea.jpg', gallery: ['/assets/yinyu-italy-tea.jpg'], focal: '50% 44%', focus: ['New Retail Space'] },
      { title: 'Modern Oriental Residence 璺?Wuhan', meta: '120 sqm / residential interior / oriental modern aesthetic', year: '2024', visual: 'spaceLight', image: '/assets/wuhan-oriental-home.webp', gallery: ['/assets/wuhan-oriental-home.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Renji Bakery 璺?Wuhan Fanhai Plaza', meta: 'New retail / bakery commercial space / deconstructivist mood', year: '2024', visual: 'spaceGallery', image: '/assets/kq-fanhai-bakery.jpg', gallery: ['/assets/kq-fanhai-bakery.jpg'], focal: '50% 42%', focus: ['Commercial Retail'] },
      { title: 'The Boots Restaurant 璺?Wuhan', meta: 'Dining interior / commercial architecture / leisure experience', year: '2024', visual: 'spaceLight', image: '/assets/the-boots-wuhan.webp', gallery: ['/assets/the-boots-wuhan.webp'], focal: '50% 42%', focus: ['Dining Space'] },
      { title: 'Modern Italian Residence 璺?Wuhan Tianchen', meta: '148 sqm / flat residence / modern Italian style', year: '2023', visual: 'spaceRetail', image: '/assets/huarun-tianchen-italian.webp', gallery: ['/assets/huarun-tianchen-italian.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Nanshan Club 璺?Contemporary Business Space', meta: 'Club interior / business reception / contemporary restraint', year: '2023', visual: 'spaceGallery', image: '/assets/studio-bw.webp', gallery: ['/assets/studio-bw.webp'], focal: '50% 40%', focus: ['Club Space'] },
    ],
  },
  {
    slug: 'web',
    icon: MonitorSmartphone,
    no: '03',
    title: 'Web / App Build',
    label: 'WEB & APP BUILD',
    description: 'From brand websites to back-office systems, balancing experience, conversion, and information hierarchy.',
    archiveDetail: 'Covering brand sites, corporate websites, apps, and mini programs, integrating information architecture with a polished visual experience.',
    layout: 'overviewLeft',
    route: '/works?section=web',
    subcategories: [
      { label: 'Web / App Build', icon: MonitorSmartphone },
      { label: 'Web Development', icon: Cpu },
      { label: 'App Design', icon: Contact },
      { label: 'Back-Office Systems', icon: SquareStack },
      { label: 'UI Design', icon: Layers3 },
    ],
    projects: [
      { title: 'Linyeji LINKING Mall App and Admin System', meta: 'Commerce system / data visualization / back-office permissions', year: '2024', visual: 'webDashboard', image: '/assets/linyeji-app-dashboard.webp', gallery: ['/assets/linyeji-app-dashboard.webp', '/assets/linyeji-linking.webp'], focal: '50% 24%', focus: ['Commerce System'] },
      { title: 'Spring Mountain Product Website Design and Development', meta: 'Brand website / responsive design / interaction design', year: '2024', visual: 'webMobile', image: '/assets/spring-mountain-ui.webp', gallery: ['/assets/spring-mountain-ui.webp', '/assets/enterprise-homepage-dev.webp'], focal: '50% 36%', focus: ['Brand Website'] },
      { title: 'Corporate Website Design and Development', meta: 'Corporate website / business interaction / marketing conversion', year: '2023', visual: 'webLanding', image: '/assets/enterprise-homepage-dev.webp', gallery: ['/assets/enterprise-homepage-dev.webp'], focal: '52% 42%', focus: ['Corporate Website'] },
    ],
  },
  {
    slug: 'ai',
    icon: Bot,
    no: '04',
    title: 'AI Agent Build',
    label: 'AI AGENT BUILD',
    description: 'From customer service and workflows to knowledge management, building executable intelligent systems.',
    archiveDetail: 'Built around AI customer service, workflow automation, and knowledge management, forming AI solutions that can truly land and scale.',
    layout: 'overviewRight',
    route: '/works?section=ai',
    subcategories: [
      { label: 'AI Agents', icon: Bot },
      { label: 'AI Skills', icon: Sparkles },
      { label: 'Workflow Design', icon: SquareStack },
      { label: 'Knowledge Base', icon: Cpu },
      { label: 'AI Web / APP', icon: MonitorSmartphone },
    ],
    projects: [
      { title: 'AI Customer Service Agent', meta: 'Customer inquiry / automated response / knowledge recommendation', year: '2024', visual: 'aiFlow', image: '/assets/nexa-ai-agent.webp', gallery: ['/assets/nexa-ai-agent.webp'], focal: '50% 20%', focus: ['AI Customer Service'] },
      { title: 'Business Workflow Automation Agent', meta: 'Process archiving / content distribution / multi-platform publishing', year: '2024', visual: 'aiWorkflow', image: '/assets/ai-workflow-panel.webp', gallery: ['/assets/ai-workflow-panel.webp'], focal: '50% 26%', focus: ['Workflow Automation', 'Content Distribution'] },
      { title: 'KM Agent', meta: 'Skill management / workflow archive / enterprise knowledge graph', year: '2023', visual: 'aiKnowledge', image: '/assets/km-agent.webp', gallery: ['/assets/km-agent.webp'], focal: '50% 36%', focus: ['Knowledge Management', 'Skill'] },
    ],
  },
];

function getLocalizedPortfolio(language) {
  return {
    ui: UI_COPY[language],
    contact: language === 'en' ? CONTACT_EN : contact,
    categories: language === 'en' ? CATEGORIES_EN : categories,
    expertiseStats: language === 'en' ? EXPERTISE_STATS_EN : expertiseStats,
    featuredProjects: language === 'en' ? FEATURED_PROJECTS_EN : featuredProjects,
    strengths: language === 'en' ? STRENGTHS_EN : strengths,
    introSlides: language === 'en' ? INTRO_SLIDES_EN : introSlides,
    projectRows: language === 'en' ? PROJECT_ROWS_EN : projectRows,
  };
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname + window.location.search);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [language, setLanguage] = useState(() => window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'zh');
  const localized = getLocalizedPortfolio(language);
  const localizedArchiveMap = Object.fromEntries(localized.projectRows.map((row) => [row.slug, row]));

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  }, [language]);

  useEffect(() => {
    const isArchiveRoute = pathname.startsWith('/works');
    document.body.style.overflow = introDismissed || isArchiveRoute ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDismissed, pathname]);

  const enterHome = () => {
    if (introDismissed || introLeaving) return;
    setIntroLeaving(true);
    window.scrollTo(0, 0);
    window.setTimeout(() => setIntroDismissed(true), 920);
  };

  const navigate = (to) => {
    const current = window.location.pathname + window.location.search;
    if (current === to) return;
    window.history.pushState({}, '', to);
    setPathname(to);
    window.scrollTo(0, 0);
  };

  if (pathname.startsWith('/works')) {
    const params = new URLSearchParams(window.location.search);
    const slugFromQuery = params.get('section');
    const slugFromPath = pathname.startsWith('/works/')
      ? pathname.split('/works/')[1]?.split(/[/?#]/)[0]
      : null;
    const activeSlug = localizedArchiveMap[slugFromQuery]?.slug || localizedArchiveMap[slugFromPath]?.slug || 'visual';
    const row = localizedArchiveMap[activeSlug] || localizedArchiveMap.visual;
    return (
      <main className="appRoot">
        <DeviceViewportManager />
        <SiteNav onNavigate={navigate} language={language} setLanguage={setLanguage} ui={localized.ui} />
        <ProjectArchivePage row={row} activeSlug={activeSlug} rows={localized.projectRows} ui={localized.ui} onBack={() => navigate('/')} onNavigate={navigate} />
      </main>
    );
  }

  return (
    <main className="appRoot">
      <DeviceViewportManager />
      {introDismissed && <SiteNav onNavigate={navigate} language={language} setLanguage={setLanguage} ui={localized.ui} />}
      {introDismissed ? (
        <div className="siteCanvas isRevealed">
          <Hero ui={localized.ui} />
          <Profile slides={localized.introSlides} ui={localized.ui} />
          <ExpertiseSpotlight stats={localized.expertiseStats} ui={localized.ui} />
          <ProjectShowcase rows={localized.projectRows} ui={localized.ui} onNavigate={navigate} />
          <Strengths strengths={localized.strengths} ui={localized.ui} />
          <ContactSection contact={localized.contact} ui={localized.ui} />
          <RequirementForm categories={localized.categories} ui={localized.ui} />
        </div>
      ) : (
        <PrefacePage isLeaving={introLeaving} onEnter={enterHome} ui={localized.ui} />
      )}
    </main>
  );
}

function SiteNav({ onNavigate, language, setLanguage, ui }) {
  return (
    <nav className="nav siteNav">
      <a
        className="brand"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('/');
        }}
      >
        <AppImage src="/assets/afd-logo-nav.png" alt="AFD" eager width="34" height="24" />
        <span>{ui.navBrand}</span>
      </a>
      <div className="navLinks">
        {ui.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href === '#top' ? '/' : '/' + link.href}
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
              window.location.hash = link.href;
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="navActions">
        <button
          className="navLanguage"
          type="button"
          aria-label={ui.languageAria}
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
        >
          {ui.languageButton}
        </button>
        <a
          className="navContact navHomeIcon"
          href="/"
          aria-label={ui.homeAria}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('/');
          }}
        >
          <House size={18} />
        </a>
      </div>
    </nav>
  );
}
function PrefacePage({ isLeaving, onEnter, ui }) {
  const title = ui.prefaceTitle;
  const typedTitle = title;
  const showLead = true;
  const showSupport = true;
  const showCopy = true;

  return (
    <section className={`prefacePage ${isLeaving ? 'isLeaving' : ''}`} aria-label={ui.prefaceAria}>
      <div className="prefaceGrainientLayer" aria-hidden="true">
        <Grainient
          color1="#f04e4e"
          color2="#050505"
          color3="#8d7b7b"
          timeSpeed={0.55}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.9}
          warpSpeed={2.6}
          warpAmplitude={50}
          blendAngle={-32}
          blendSoftness={0.04}
          rotationAmount={500}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1.0}
          centerX={0.01}
          centerY={0.0}
          zoom={0.88}
          fps={24}
          maxDpr={1.25}
          className="prefaceGrainient"
        />
      </div>
      <div className="prefaceAtmosphere" />
      <div className="prefaceFrame" />
      <div className="prefaceNoise" />
      <div className="prefaceContent">
        <div className={`prefaceKicker ${showLead ? 'isVisible' : ''}`}>{ui.prefaceKicker}</div>
        <button className="prefaceTitleButton" type="button" onClick={onEnter} aria-label={ui.enterHomeAria}>
          <span className="prefaceTitle" aria-hidden="true" style={{ whiteSpace: 'pre-line' }}>
            {typedTitle}
            <span className={`prefaceCaret ${typedTitle.length < title.length ? 'isActive' : ''}`} />
          </span>
        </button>
        <div className={`prefaceLine ${showLead ? 'isVisible' : ''}`}>AFD DESIGN</div>
        <div className={`prefaceCopy ${showSupport ? 'isVisible' : ''}`}>{ui.prefaceCopy}</div>
        <div className={`prefaceCopy isSub ${showCopy ? 'isVisible' : ''}`}>{ui.prefaceSub}</div>
      </div>
      <div className={`prefaceHint ${showCopy ? 'isVisible' : ''}`}>{ui.prefaceHint}</div>
    </section>
  );
}
function Hero({ ui }) {
  return (
    <section className="hero" id="top">
      <div className="heroOverlay" />
      <div className="container heroInner heroIndex">
        <h1 className="heroIndexTitle" aria-label={ui.heroAria}>
          <span>{ui.heroTitle[0]}</span>
          <span>{ui.heroTitle[1]}</span>
        </h1>
        <div className="heroStat">
          <span>///</span>
          <strong>80+</strong>
          <p>{ui.heroStatDesc}</p>
        </div>
        <a className="heroStart" href="#requirements">
          {ui.heroStart} <ArrowUpRight size={20} />
        </a>
        <div className="heroClaim">
          <b>DESIGN</b>
          <span>IS NOT DECORATION</span>
        </div>
      </div>
      <div className="scrollCue">SCROLL</div>
    </section>
  );
}

function Profile({ slides, ui }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className="profileCarousel" id="profile">
      <div className={`introSlide ${slide.kind === 'company' ? 'isCompany' : ''} ${slide.mirrored ? 'isMirrored' : ''}`} key={slide.title}>
        <AppImage className="introPhoto" src={slide.image} alt="" />
        <div className="introVeil" />
        <div className="container introLayout">
          <div className="introText">
            <span className="introKicker">{slide.kicker}</span>
            <h2>{slide.title}</h2>
            {slide.kind === 'company' && <AppImage className="companyPlacementLogo" src="/assets/afd-logo-company.png" alt="AFD" />}
            {slide.kind !== 'company' && <h3>{slide.headline}</h3>}
            {slide.kind === 'company' ? (
              <p className="companyBody">
                {slide.bodyParts.map((part, index) => (
                  <span className={part.accent ? 'isAccent' : ''} key={part.text + index}>
                    {part.text}
                  </span>
                ))}
              </p>
            ) : (
              <p>{slide.body}</p>
            )}
            <small>{slide.meta}</small>
          </div>
          <div className="introMeta">
            <span>{String(activeSlide + 1).padStart(2, '0')}</span>
            <strong>{String(slides.length).padStart(2, '0')}</strong>
          </div>
        </div>
      </div>
      <div className="introControls" aria-label={ui.profileControls}>
        <button type="button" onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)} aria-label={ui.previousPage}>
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => setActiveSlide((current) => (current + 1) % slides.length)} aria-label={ui.nextPage}>
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
function useSectionMotion(ref, {
  triggerSelector,
  titleSelector = 'h2',
  bodySelector = 'p',
  cardSelector,
  imageSelector,
} = {}) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canParallaxImages = !prefersReducedMotion && window.matchMedia('(min-width: 960px) and (pointer: fine)').matches;

    const trigger = triggerSelector ? scope.querySelector(triggerSelector) || scope : scope;
    const ctx = gsap.context(() => {
      const titles = scope.querySelectorAll(titleSelector);
      const bodies = scope.querySelectorAll(bodySelector);
      const cards = cardSelector ? scope.querySelectorAll(cardSelector) : [];
      const images = imageSelector ? scope.querySelectorAll(imageSelector) : [];

      if (titles.length) {
        gsap.fromTo(titles, { y: 48, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger, start: 'top 78%', once: true },
        });
      }

      if (bodies.length) {
        gsap.fromTo(bodies, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: { trigger, start: 'top 76%', once: true },
        });
      }

      if (cards.length) {
        gsap.fromTo(cards, { y: 36, opacity: 0, scale: 0.98 }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger, start: 'top 72%', once: true },
        });
      }

      if (canParallaxImages) {
        images.forEach((image) => {
          gsap.fromTo(image, { yPercent: 8, scale: 1.06 }, {
            yPercent: -6,
            scale: 1.01,
            ease: 'none',
            scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
          });
        });
      }
    }, scope);

    return () => ctx.revert();
  }, [bodySelector, cardSelector, imageSelector, ref, titleSelector, triggerSelector]);
}

function ExpertiseSpotlight({ stats, ui }) {
  const sectionRef = useRef(null);

  useSectionMotion(sectionRef, {
    triggerSelector: '.expertiseGrid',
    titleSelector: '.expertiseTitle h2, .expertiseTitle .sectionLabel',
    bodySelector: '.expertiseTitle p, .expertiseIntro p, .expertiseIntro small',
    cardSelector: '.expertiseCard, .expertiseStat',
    imageSelector: '.expertiseHeroPhoto',
  });

  return (
    <section className="section expertiseSection" id="expertise" ref={sectionRef}>
      <div className="container">
        <div className="expertiseGrid">
          <BorderGlow
            className="expertiseCard expertiseIntro"
            edgeSensitivity={24}
            glowColor="0 100 72"
            backgroundColor="#120f17"
            borderRadius={0}
            glowRadius={34}
            glowIntensity={0.92}
            coneSpread={24}
            animated={false}
            colors={['#f04e4e', '#f4f1ea', '#8f8581']}
          >
            <AppImage className="expertiseHeroPhoto" src="/assets/expertise-portrait.webp" alt="" />
          </BorderGlow>

          <div className="expertiseTitle">
            <div className="sectionLabel">FULL-SERVICE DESIGNER</div>
            <h2>{ui.expertiseTitle}</h2>
            <p className="expertiseLead">{ui.expertiseLead}</p>
            <p className="expertiseBody">{ui.expertiseBody}</p>
            <p className="expertiseBody isHighlight">{ui.expertiseHighlight}</p>
          </div>
        </div>

        <div className="expertiseStats">
          {stats.map((item) => (
            <BorderGlow
              className="expertiseStat"
              key={item.label}
              edgeSensitivity={22}
              glowColor="0 100 72"
              backgroundColor="#120f17"
              borderRadius={0}
              glowRadius={28}
              glowIntensity={0.88}
              coneSpread={24}
              animated={false}
              colors={['#f04e4e', '#f4f1ea', '#8f8581']}
            >
              <div className="expertiseStatTop">
                <strong>{item.value}</strong>
                <span>{item.unit}</span>
              </div>
              <h4>{item.label}</h4>
              <p>{item.detail}</p>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
function Projects() {
  const sectionRef = useRef(null);
  useSectionMotion(sectionRef, {
    triggerSelector: '.sectionHead',
    cardSelector: '.categoryCard, .projectCard',
    imageSelector: '.projectVisual',
  });

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="sectionLabel">SELECTED WORKS</div>
            <h2>缁箖鈧銆嶉惄?/h2>
          </div>
          <p>閸ュ绮崫浣哄閵嗕胶鈹栭梻娣偓涓処 娑撳孩鏆熺€涙ぞ楠囬崫浣烘畱缂佺厧鎮庢い鍦窗鐏炴洜銇氶妴?/p>
        </div>

        <div className="categoryGrid">
          {categories.map(({ title, icon: Icon, items }) => (
            <BorderGlow
              className="categoryCard"
              key={title}
              edgeSensitivity={26}
              glowColor="0 100 72"
              backgroundColor="#120f17"
              borderRadius={0}
              glowRadius={34}
              glowIntensity={0.92}
              coneSpread={24}
              animated={false}
              colors={['#f04e4e', '#f4f1ea', '#8f8581']}
            >
              <Icon size={24} />
              <h3>{title}</h3>
              <div className="chipList">
                {items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </BorderGlow>
          ))}
        </div>

        <div className="projectGrid">
          {featuredProjects.map((project) => (
            <BorderGlow
              className={`projectCard ${project.tone}`}
              key={project.title}
              edgeSensitivity={20}
              glowColor="0 100 72"
              backgroundColor="#120f17"
              borderRadius={0}
              glowRadius={42}
              glowIntensity={1}
              coneSpread={24}
              animated={false}
              colors={['#f04e4e', '#f4f1ea', '#8f8581']}
            >
              <div className="projectVisual">
                <AppImage src={project.image} alt="" />
              </div>
              <div className="projectInfo">
                <div className="projectTags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ rows, ui, onNavigate }) {
  const sectionRef = useRef(null);
  useSectionMotion(sectionRef, {
    triggerSelector: '.showcaseHead',
    titleSelector: '.showcaseHead h2',
    bodySelector: '.showcaseHead p',
    cardSelector: '.projectOverviewCard, .showcaseProject',
    imageSelector: '.showcaseVisual img',
  });

  return (
    <section className="projectShowcase" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="showcaseHead">
          <div>
            <span>SELECTED WORKS</span>
            <h2>{ui.showcaseTitle}</h2>
          </div>
          <p>{ui.showcaseDesc}</p>
        </div>
        <div className="projectRows">
          {rows.map((row) => (
            <ProjectShowcaseRow row={row} key={row.title} onNavigate={onNavigate} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcaseRow({ row, onNavigate, ui }) {
  const [activeProject, setActiveProject] = useState(0);
  const projectCount = row.projects.length;
  const pagedMode = projectCount > 3;
  const windowStart = pagedMode ? Math.max(0, Math.min(activeProject - 2, projectCount - 3)) : 0;
  const visibleProjects = pagedMode ? row.projects.slice(windowStart, windowStart + 3) : row.projects;

  return (
    <article className={`showcaseRow ${row.layout === 'overviewRight' ? 'isReverse' : ''}`}>
      <BorderGlow
        className="projectOverviewCard"
        edgeSensitivity={24}
        glowColor="0 100 72"
        backgroundColor="#120f17"
        borderRadius={0}
        glowRadius={36}
        glowIntensity={0.92}
        coneSpread={24}
        animated={false}
        colors={['#f04e4e', '#f4f1ea', '#8f8581']}
      >
        <div className="overviewNumber">
          <span>{row.no}</span>
          <i />
        </div>
        <div>
          <h3>{row.title}</h3>
          <strong>{row.label}</strong>
        </div>
        <p>{row.description}</p>
        <div className="overviewIcons" aria-label={`${row.title} category`}>
          {row.subcategories.map(({ label, icon: Icon }) => (
            <span key={label} title={label}>
              <Icon size={16} />
              {label}
            </span>
          ))}
        </div>
        <a
          href={row.route}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(row.route);
          }}
        >
          <span>{ui.viewAll}</span>
          <ArrowUpRight size={17} />
        </a>
      </BorderGlow>

      <div className="projectCarouselPanel">
        <BorderGlow
          className="projectArrow isLeft"
          as="button"
          type="button"
          onClick={() => setActiveProject((current) => (current - 1 + projectCount) % projectCount)}
          aria-label={ui.previousPage}
          edgeSensitivity={20}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={28}
          glowIntensity={0.9}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <ChevronLeft size={24} />
        </BorderGlow>
        <div className={`projectImageFrame ${pagedMode ? 'isPaged' : ''}`}>
          <div className="projectImageTrack">
            {visibleProjects.map((project, localIndex) => {
              const index = pagedMode ? windowStart + localIndex : localIndex;
              const isActive = index === activeProject;
              return (
                <BorderGlow
                  className={`showcaseProject ${project.visual} ${isActive ? 'isActive' : ''}`}
                  as="button"
                  type="button"
                  key={project.title}
                  onClick={() => setActiveProject(index)}
                  aria-label={`${ui.viewAll} ${project.title}`}
                  edgeSensitivity={18}
                  glowColor="0 100 72"
                  backgroundColor="#120f17"
                  borderRadius={0}
                  glowRadius={30}
                  glowIntensity={0.96}
                  coneSpread={22}
                  animated={false}
                  colors={['#f04e4e', '#f4f1ea', '#8f8581']}
                >
                  <div className="showcaseVisual">
                    <AppImage
                      className="showcaseImage"
                      src={project.image}
                      alt=""
                      style={{ objectPosition: project.focal || '50% 50%' }}
                    />
                  </div>
                  <div className="showcaseCaption">
                    <h4>{project.title}</h4>
                    <p>{project.meta}</p>
                    <time>{project.year}</time>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>
        <BorderGlow
          className="projectArrow isRight"
          as="button"
          type="button"
          onClick={() => setActiveProject((current) => (current + 1) % projectCount)}
          aria-label={ui.nextPage}
          edgeSensitivity={20}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={28}
          glowIntensity={0.9}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <ChevronRight size={24} />
        </BorderGlow>
        <div className="projectDots" aria-label={`${row.title} pagination`}>
          {row.projects.map((project, index) => (
            <button
              type="button"
              className={index === activeProject ? 'isActive' : ''}
              key={project.title}
              onClick={() => setActiveProject(index)}
              aria-label={`${ui.viewAll} ${project.title}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
function buildArchiveSlots(items) {
  const slots = [...items];
  while (slots.length % 3 !== 0) slots.push(null);
  return slots;
}

function getProjectGallery(project) {
  return project.gallery?.length ? project.gallery : [project.image];
}

function ProjectArchivePage({ row, activeSlug, rows, ui, onBack, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState(activeSlug);
  const [viewer, setViewer] = useState(null);
  const visibleProjects = row.projects;
  const sectionRef = useRef(null);

  useSectionMotion(sectionRef, {
    triggerSelector: '.archiveHero',
    titleSelector: '.archiveHeading h1, .archiveCount strong',
    bodySelector: '.archiveHeading p, .archiveCount span',
    cardSelector: '.archiveFilters button, .archiveCard',
    imageSelector: '.archiveImageWrap img',
  });

  useEffect(() => {
    setActiveFilter(activeSlug);
  }, [activeSlug]);

  useEffect(() => {
    if (!viewer) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setViewer(null);
        return;
      }
      if (event.key === 'ArrowLeft') {
        setViewer((current) => {
          if (!current) return current;
          const gallery = getProjectGallery(visibleProjects[current.projectIndex]);
          return { ...current, imageIndex: (current.imageIndex - 1 + gallery.length) % gallery.length };
        });
      }
      if (event.key === 'ArrowRight') {
        setViewer((current) => {
          if (!current) return current;
          const gallery = getProjectGallery(visibleProjects[current.projectIndex]);
          return { ...current, imageIndex: (current.imageIndex + 1) % gallery.length };
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [viewer, visibleProjects]);

  return (
    <main className="archivePage">
      <section className="archiveShell" ref={sectionRef}>
        <div className="container archiveHero">
          <div className="archiveHeading">
            <span className="archiveKicker">{row.label}</span>
            <h1>{row.title}</h1>
            <p>{row.archiveDetail}</p>
          </div>
          <div className="archiveCount">
            <strong>{String(row.projects.length).padStart(2, '0')}</strong>
            <span>{ui.projectCount}</span>
          </div>
        </div>

        <div className="container archiveFilters" role="tablist" aria-label={`${row.title} ${ui.archiveFilterSuffix}`}>
          {rows.map((group) => (
            <BorderGlow
              key={group.slug}
              as="button"
              type="button"
              className={group.slug === activeFilter ? 'isActive archiveFilterButton' : 'archiveFilterButton'}
              onClick={() => onNavigate(`/works?section=${group.slug}`)}
              aria-label={group.title}
              edgeSensitivity={18}
              glowColor="0 100 72"
              backgroundColor="#120f17"
              borderRadius={999}
              glowRadius={24}
              glowIntensity={0.88}
              coneSpread={24}
              animated={false}
              colors={['#f04e4e', '#f4f1ea', '#8f8581']}
            >
              <group.icon size={18} />
              <span>{group.title}</span>
            </BorderGlow>
          ))}
        </div>

        <div className="container archiveGrid">
          {buildArchiveSlots(visibleProjects).map((project, index) => (
            project ? (
              <BorderGlow
                className="archiveCard"
                as="article"
                key={project.title}
                edgeSensitivity={20}
                glowColor="0 100 72"
                backgroundColor="#120f17"
                borderRadius={0}
                glowRadius={34}
                glowIntensity={0.92}
                coneSpread={24}
                animated={false}
                colors={['#f04e4e', '#f4f1ea', '#8f8581']}
              >
                <button
                  className="archiveImageWrap archiveImageButton"
                  type="button"
                  onClick={() => setViewer({ projectIndex: index, imageIndex: 0 })}
                  aria-label={`${ui.viewAll} ${project.title}`}
                >
                  <AppImage src={project.image} alt="" style={{ objectPosition: project.focal || '50% 50%' }} />
                  <span className="archiveImageHint">{ui.openLargeImage}</span>
                </button>
                <div className="archiveCardBody">
                  <div className="archiveMetaRow">
                    <span>{row.title}</span>
                    <time>{project.year}</time>
                  </div>
                  <h2>{project.title}</h2>
                  <p>{project.meta}</p>
                  <div className="archivePills">
                    {project.focus?.length ? project.focus.map((tag) => <span key={tag}>{tag}</span>) : <span>{row.title}</span>}
                  </div>
                </div>
              </BorderGlow>
            ) : (
              <BorderGlow
                className="archiveCard isEmpty"
                key={`empty-${index}`}
                aria-hidden="true"
                edgeSensitivity={20}
                glowColor="0 100 72"
                backgroundColor="#120f17"
                borderRadius={0}
                glowRadius={34}
                glowIntensity={0.92}
                coneSpread={24}
                animated={false}
                colors={['#f04e4e', '#f4f1ea', '#8f8581']}
              />
            )
          ))}
        </div>

        {viewer && visibleProjects[viewer.projectIndex] && (
          <ProjectLightbox
            project={visibleProjects[viewer.projectIndex]}
            imageIndex={viewer.imageIndex}
            onClose={() => setViewer(null)}
            onPrev={() => setViewer((current) => {
              if (!current) return current;
              const gallery = getProjectGallery(visibleProjects[current.projectIndex]);
              return { ...current, imageIndex: (current.imageIndex - 1 + gallery.length) % gallery.length };
            })}
            onNext={() => setViewer((current) => {
              if (!current) return current;
              const gallery = getProjectGallery(visibleProjects[current.projectIndex]);
              return { ...current, imageIndex: (current.imageIndex + 1) % gallery.length };
            })}
            ui={ui}
          />
        )}
      </section>
    </main>
  );
}

function ProjectLightbox({ project, imageIndex, onClose, onPrev, onNext, ui }) {
  const gallery = getProjectGallery(project);
  const current = gallery[imageIndex % gallery.length];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="lightboxBackdrop" type="button" aria-label={ui.close} onClick={onClose} />
      <div className="lightboxPanel">
        <BorderGlow
          className="lightboxClose"
          as="button"
          type="button"
          onClick={onClose}
          aria-label={ui.close}
          edgeSensitivity={18}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={999}
          glowRadius={26}
          glowIntensity={0.82}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          脳
        </BorderGlow>
        <BorderGlow
          className="lightboxArrow isLeft"
          as="button"
          type="button"
          onClick={onPrev}
          aria-label={ui.previousImage}
          edgeSensitivity={18}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={26}
          glowIntensity={0.84}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <ChevronLeft size={28} />
        </BorderGlow>
        <div className="lightboxStage">
          <AppImage src={current} alt={project.title} eager />
          <div className="lightboxMeta">
            <span>{project.title}</span>
            <strong>{String(imageIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</strong>
          </div>
        </div>
        <BorderGlow
          className="lightboxArrow isRight"
          as="button"
          type="button"
          onClick={onNext}
          aria-label={ui.nextImage}
          edgeSensitivity={18}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={26}
          glowIntensity={0.84}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <ChevronRight size={28} />
        </BorderGlow>
      </div>
    </div>
  );
}
function Strengths({ strengths, ui }) {
  const sectionRef = useRef(null);
  useSectionMotion(sectionRef, {
    triggerSelector: '.sectionHead',
    cardSelector: '.strengthCard',
  });

  return (
    <section className="section strengths" id="strengths" ref={sectionRef}>
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="sectionLabel">CAPABILITY</div>
            <h2>{ui.strengthsTitle}</h2>
          </div>
          <p>{ui.strengthsDesc}</p>
        </div>
        <div className="strengthGrid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <BorderGlow
              className="strengthCard"
              key={title}
              edgeSensitivity={28}
              glowColor="0 100 72"
              backgroundColor="#120f17"
              borderRadius={0}
              glowRadius={30}
              glowIntensity={0.88}
              coneSpread={26}
              animated={false}
              colors={['#f04e4e', '#f4f1ea', '#8f8581']}
            >
              <div className="iconBox"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ contact, ui }) {
  const sectionRef = useRef(null);
  useSectionMotion(sectionRef, {
    triggerSelector: '.contactGrid',
    titleSelector: '.contactEnd h2',
    bodySelector: '.contactEnd p',
    cardSelector: '.contactPanel',
    imageSelector: '.contactQrWrap img',
  });

  return (
    <section className="contactEnd" id="contact" ref={sectionRef}>
      <div className="container contactGrid">
        <div>
          <div className="sectionLabel">CONTACT</div>
          <h2>{ui.contactHeading}</h2>
          <p>{ui.contactDesc}</p>
        </div>
        <BorderGlow
          className="contactPanel"
          edgeSensitivity={24}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={38}
          glowIntensity={1}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <span>{contact.title}</span>
          <h3>{contact.name}</h3>
          <p className="contactRole">{ui.contactRole}</p>
          <div className="contactCardBody">
            <div className="contactLines">
              <a href={`mailto:${contact.email}`}>
                <Mail size={16} />
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`}>
                <Phone size={16} />
                {contact.phone}
              </a>
              <strong>
                <Contact size={16} />
                {contact.wechat}
              </strong>
            </div>
            <div className="contactQrWrap">
              <AppImage src="/assets/wechat-qr.jpg" alt={ui.qrAlt} />
              <small>{ui.qrHint}</small>
            </div>
          </div>
          <a className="primaryBtn" href={`mailto:${contact.email}`}>
            {ui.sendMail} <ArrowUpRight size={20} />
          </a>
        </BorderGlow>
      </div>
    </section>
  );
}

function RequirementForm({ categories, ui }) {
  const sectionRef = useRef(null);
  useSectionMotion(sectionRef, {
    triggerSelector: '.requirementGrid',
    titleSelector: '.requirementIntro h2',
    bodySelector: '.requirementIntro p',
    cardSelector: '.briefForm label, .submitBrief',
  });

  return (
    <section className="requirements" id="requirements" ref={sectionRef}>
      <div className="container requirementGrid">
        <div className="requirementIntro">
          <div className="sectionLabel">PROJECT BRIEF</div>
          <h2>{ui.requirementHeading}</h2>
          <p>{ui.requirementDesc}</p>
        </div>
        <BorderGlow
          className="briefForm"
          edgeSensitivity={22}
          glowColor="0 100 72"
          backgroundColor="#120f17"
          borderRadius={0}
          glowRadius={34}
          glowIntensity={0.9}
          coneSpread={24}
          animated={false}
          colors={['#f04e4e', '#f4f1ea', '#8f8581']}
        >
          <label>
            <span>{ui.formProjectType}</span>
            <select defaultValue="">
              <option value="" disabled>{ui.formProjectPlaceholder}</option>
              {categories.map((group) => (
                <optgroup label={group.title} key={group.title}>
                  {group.items.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label>
            <span>{ui.formName}</span>
            <input type="text" placeholder={ui.formNamePlaceholder} />
          </label>
          <label className="wideField">
            <span>{ui.formRequirement}</span>
            <textarea rows="6" placeholder={ui.formRequirementPlaceholder} />
          </label>
          <label>
            <span>{ui.formBudget}</span>
            <select defaultValue="">
              <option value="" disabled>{ui.formBudgetPlaceholder}</option>
              {ui.formBudgetOptions.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <button className="submitBrief" type="button">
            {ui.sendRequirement} <ArrowUpRight size={20} />
          </button>
        </BorderGlow>
      </div>
    </section>
  );
}
createRoot(document.getElementById('root')).render(<App />);


