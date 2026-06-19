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
  name: '耿茁华',
  title: 'AFD全案设计事务所',
  location: 'China',
  email: '635296715@qq.com',
  phone: '+86 156 9632 9109',
  wechat: 'WeChat ID：gzh_zuishuai',
};

const categories = [
  {
    title: '视觉设计',
    icon: PenTool,
    items: ['平面设计', '海报设计', 'Logo 设计', 'UI 设计', '形象设计'],
  },
  {
    title: 'AI 设计',
    icon: Cpu,
    items: ['AI 智能体搭建设计', 'AI Skill 设计', 'AI 网页 / 网站 / APP / 小程序设计'],
  },
  {
    title: '空间设计',
    icon: Building2,
    items: ['住宅设计', '办公 / 会所 / 酒店设计', '新零售商业设计', '景观设计', '直播间置景设计'],
  },
];

const expertiseStats = [
  {
    value: '05',
    unit: '年',
    label: '空间与品牌设计经验',
    detail: '从品牌、空间到视觉系统，持续在商业落地和生活美学之间寻找平衡。',
  },
  {
    value: '03',
    unit: '类',
    label: '主攻能力方向',
    detail: '空间设计、视觉设计、AI 数字设计与网页 / APP 搭建并行推进。',
  },
  {
    value: '80+',
    unit: '个',
    label: '服务全品类项目',
    detail: '覆盖品牌视觉、空间落地、Web / APP / 小程序、AI Agent 与 Skills 定制。',
  },
  {
    value: '08',
    unit: '项',
    label: '稳定交付的方法模块',
    detail: '从需求拆解、方案推演到交付验收，保证项目稳定推进。',
  },
];

const featuredProjects = [
  {
    type: 'VISUAL',
    title: 'XENITH 品牌视觉系统',
    desc: '品牌识别 / 视觉识别 / 包装延展。',
    tags: ['品牌视觉', 'VI', '包装'],
    tone: 'amber',
    image: '/assets/xenith-brand.webp',
    gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
  },
  {
    type: 'AI',
    title: '春山时·餐饮品牌设计',
    desc: '餐饮品牌 / 包装系统 / 视觉延展。',
    tags: ['餐饮品牌', 'VI', '包装'],
    tone: 'cyan',
    image: '/assets/spring-mountain-visual.webp',
    gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
  },
  {
    type: 'SPACE',
    title: '林野集 LINKING·全案设计',
    desc: '品牌全案 / VI 设计 / 平面视觉。',
    tags: ['全案设计', 'VI', '平面'],
    tone: 'violet',
    image: '/assets/linyeji-linking.webp',
    gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
  },
  {
    type: 'UI',
    title: '玉爻·银玉·全案设计',
    desc: '全案设计 / VI设计 / 平面视觉。',
    tags: ['全案设计', 'VI', '平面'],
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
    title: '视觉设计',
    label: 'VISUAL DESIGN',
    description: '从平面、海报、Logo 到 UI 与形象设计，构建统一的视觉系统。',
    archiveDetail: '聚焦品牌识别、视觉系统与数字表达，让每个项目在传播与体验上形成完整一致的界面。',
    layout: 'overviewLeft',
    route: '/works?section=visual',
    subcategories: [
      { label: '平面设计', icon: PenTool },
      { label: '海报设计', icon: Frame },
      { label: 'Logo 设计', icon: Sparkles },
      { label: 'UI 设计', icon: MonitorSmartphone },
      { label: '形象设计', icon: Layers3 },
    ],
    projects: [
      {
        title: 'XENITH 品牌视觉系统',
        meta: '品牌设计 / 视觉识别 / 动态延展',
        year: '2024',
        visual: 'visualBrand',
        image: '/assets/xenith-brand.webp',
        gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
        focal: '50% 42%',
        focus: ['品牌设计', 'VI'],
      },
      {
        title: '春山时·餐饮品牌设计',
        meta: '品牌设计 / 餐饮视觉 / 包装系统',
        year: '2024',
        visual: 'visualUi',
        image: '/assets/spring-mountain-visual.webp',
        gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
        focal: '50% 44%',
        focus: ['餐饮品牌', '包装'],
      },
      {
        title: '林野集 LINKING·全案设计',
        meta: '全案设计 / VI设计 / 平面视觉',
        year: '2023',
        visual: 'visualObject',
        image: '/assets/linyeji-linking.webp',
        gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
        focal: '50% 40%',
        focus: ['全案设计', 'VI'],
      },
      {
        title: '玉爻·银玉·全案设计',
        meta: '全案设计 / VI设计 / 平面视觉',
        year: '2024',
        visual: 'visualBrand',
        image: '/assets/yuyao-silverjade.webp',
        gallery: ['/assets/yuyao-silverjade.webp'],
        focal: '50% 42%',
        focus: ['全案设计', 'VI'],
      },
    ],
  },
  {
    slug: 'space',
    icon: Building2,
    no: '02',
    title: '空间设计',
    label: 'SPATIAL DESIGN',
    description: '住宅、餐饮、商业与会所场景，结合叙事空间与落地体验。',
    archiveDetail: '围绕生活方式、商业消费与空间叙事展开，覆盖住宅、餐饮、新零售与会所场景。',
    layout: 'overviewRight',
    route: '/works?section=space',
    subcategories: [
      { label: '住宅设计', icon: Building2 },
      { label: '办公 / 会所 / 酒店设计', icon: Frame },
      { label: '新零售商业设计', icon: SquareStack },
      { label: '景观设计', icon: Sparkles },
      { label: '直播间置景设计', icon: MonitorSmartphone },
    ],
    projects: [
      {
        title: '春山时·餐饮新零售',
        meta: '商业空间 / 餐饮空间 / 品牌赋能',
        year: '2024',
        visual: 'spaceLight',
        image: '/assets/spring-mountain-space.webp',
        gallery: ['/assets/spring-mountain-space.webp'],
        focal: '50% 48%',
        focus: ['商业空间', '餐饮空间'],
      },
      {
        title: '武汉融创壹号院住宅',
        meta: '住宅设计 / 平层设计 / 现代极简风格',
        year: '2023',
        visual: 'spaceGallery',
        image: '/assets/wuhan-rongchuang-1.webp',
        gallery: ['/assets/wuhan-rongchuang-1.webp'],
        focal: '50% 38%',
        focus: ['住宅设计'],
      },
      {
        title: 'MOMENT 主材展厅设计',
        meta: '展厅空间 / 叙事空间 / 极简克制',
        year: '2023',
        visual: 'spaceRetail',
        image: '/assets/moment-main-material.webp',
        gallery: ['/assets/moment-main-material.webp'],
        focal: '50% 42%',
        focus: ['展厅空间'],
      },
      {
        title: '隐玉·位于意大利的中式茶饮店',
        meta: '新零售空间 / 餐饮空间 / 新中式',
        year: '2024',
        visual: 'spaceRetail',
        image: '/assets/yinyu-italy-tea.jpg',
        gallery: ['/assets/yinyu-italy-tea.jpg'],
        focal: '50% 44%',
        focus: ['新零售空间'],
      },
      {
        title: '东方美学现代住宅·湖北武汉',
        meta: '120平米 / 平层住宅空间 / 东方美学',
        year: '2024',
        visual: 'spaceLight',
        image: '/assets/wuhan-oriental-home.webp',
        gallery: ['/assets/wuhan-oriental-home.webp'],
        focal: '50% 42%',
        focus: ['住宅设计'],
      },
      {
        title: '仟吉·武汉泛海城市广场店',
        meta: '新零售空间 / 烘焙商业空间 / 解构主义',
        year: '2024',
        visual: 'spaceGallery',
        image: '/assets/kq-fanhai-bakery.jpg',
        gallery: ['/assets/kq-fanhai-bakery.jpg'],
        focal: '50% 42%',
        focus: ['新零售商业'],
      },
      {
        title: 'The boots泥靴餐厅·武汉',
        meta: '餐饮空间 / 商业建筑 / 休闲娱乐',
        year: '2024',
        visual: 'spaceLight',
        image: '/assets/the-boots-wuhan.webp',
        gallery: ['/assets/the-boots-wuhan.webp'],
        focal: '50% 42%',
        focus: ['餐饮空间'],
      },
      {
        title: '现代意式·华润置地武汉天宸',
        meta: '148平 / 大平层住宅 / 现代意式',
        year: '2023',
        visual: 'spaceRetail',
        image: '/assets/huarun-tianchen-italian.webp',
        gallery: ['/assets/huarun-tianchen-italian.webp'],
        focal: '50% 42%',
        focus: ['住宅设计'],
      },
      {
        title: '南山会所·现代商务空间',
        meta: '会所空间 / 商务接待 / 当代克制',
        year: '2023',
        visual: 'spaceGallery',
        image: '/assets/studio-bw.webp',
        gallery: ['/assets/studio-bw.webp'],
        focal: '50% 40%',
        focus: ['会所空间'],
      },
    ],
  },
  {
    slug: 'web',
    icon: MonitorSmartphone,
    no: '03',
    title: '网页 / APP 搭建',
    label: 'WEB & APP BUILD',
    description: '从官网到后台系统，兼顾体验、转化与信息层级。',
    archiveDetail: '覆盖品牌官网、企业官网、APP 与小程序，从信息架构到视觉体验一体化落地。',
    layout: 'overviewLeft',
    route: '/works?section=web',
    subcategories: [
      { label: '网页 / APP 搭建', icon: MonitorSmartphone },
      { label: 'Web 开发', icon: Cpu },
      { label: 'App 设计', icon: Contact },
      { label: '后台系统', icon: SquareStack },
      { label: 'UI 设计', icon: Layers3 },
    ],
    projects: [
      {
        title: '林野集LINKING·商城APP及其后台管理系统',
        meta: '商城系统 / 数据可视化 / 后台权限管理',
        year: '2024',
        visual: 'webDashboard',
        image: '/assets/linyeji-app-dashboard.webp',
        gallery: ['/assets/linyeji-app-dashboard.webp', '/assets/linyeji-linking.webp'],
        focal: '50% 24%',
        focus: ['商城系统'],
      },
      {
        title: '春山时·产品官网设计和开发',
        meta: '品牌官网 / 响应式设计 / 交互设计',
        year: '2024',
        visual: 'webMobile',
        image: '/assets/spring-mountain-ui.webp',
        gallery: ['/assets/spring-mountain-ui.webp', '/assets/enterprise-homepage-dev.webp'],
        focal: '50% 36%',
        focus: ['品牌官网'],
      },
      {
        title: '企业官网设计与开发',
        meta: '企业官网 / 业务响应交互 / 营销转化',
        year: '2023',
        visual: 'webLanding',
        image: '/assets/enterprise-homepage-dev.webp',
        gallery: ['/assets/enterprise-homepage-dev.webp'],
        focal: '52% 42%',
        focus: ['企业官网'],
      },
    ],
  },
  {
    slug: 'ai',
    icon: Bot,
    no: '04',
    title: 'AI 智能体搭建',
    label: 'AI AGENT BUILD',
    description: '从客服、流程到知识管理，构建可执行的智能体工作流。',
    archiveDetail: '围绕智能客服、业务流程自动化与知识管理，形成能落地、能复用的 AI 方案。',
    layout: 'overviewRight',
    route: '/works?section=ai',
    subcategories: [
      { label: 'AI 智能体', icon: Bot },
      { label: 'AI Skill', icon: Sparkles },
      { label: '工作流搭建', icon: SquareStack },
      { label: '知识库管理', icon: Cpu },
      { label: 'AI Web / APP', icon: MonitorSmartphone },
    ],
    projects: [
      {
        title: '智能客服Agent',
        meta: '客户咨询 / 自动应答 / 知识推荐',
        year: '2024',
        visual: 'aiFlow',
        image: '/assets/nexa-ai-agent.webp',
        gallery: ['/assets/nexa-ai-agent.webp'],
        focal: '50% 20%',
        focus: ['智能客服'],
      },
      {
        title: '业务流程自动化Agent',
        meta: '流程归档 / 内容分发 / 多平台发布',
        year: '2024',
        visual: 'aiWorkflow',
        image: '/assets/ai-workflow-panel.webp',
        gallery: ['/assets/ai-workflow-panel.webp'],
        focal: '50% 26%',
        focus: ['流程自动化', '内容分发'],
      },
      {
        title: 'KM Agent',
        meta: 'Skill管理 / 工作流归档 / 企业知识图谱',
        year: '2023',
        visual: 'aiKnowledge',
        image: '/assets/km-agent.webp',
        gallery: ['/assets/km-agent.webp'],
        focal: '50% 36%',
        focus: ['知识管理', 'Skill'],
      },
    ],
  },
];

const archiveMap = Object.fromEntries(projectRows.map((row) => [row.slug, row]));

const strengths = [
  {
    icon: Layers3,
    title: '全案策略与商业落地',
    text: '从品牌到空间，持续把抽象需求转化为清晰可执行的方案。',
  },
  {
    icon: Bot,
    title: '视觉、空间、AI 一体化',
    text: '让视觉、内容、空间与技术保持同一套表达逻辑。',
  },
  {
    icon: Frame,
    title: '高密度项目执行',
    text: '在多轮修改、复杂交付与跨端协同中保持节奏与质量。',
  },
  {
    icon: MonitorSmartphone,
    title: '长期主义的品牌共创',
    text: '不是一次性完成，而是把设计真正嵌入品牌长期发展。',
  },
];

const introSlides = [
  {
    kind: 'company',
    kicker: 'COMPANY INTRODUCTION',
    title: 'AFD',
    headline: '公司介绍',
    bodyParts: [
      { text: 'AFD设计工作室是一家专注于品牌全案赋能及生活美学设计的独立全案工作室。', accent: false },
      { text: '服务内容包含空间设计、视觉设计、AI 数字设计等领域。', accent: true },
      { text: '工作室由专业设计背景的设计师、供应链合伙人及后端建设人员共同创立。', accent: false },
      { text: '他们曾就职于知名设计公司与事务所，在环境空间设计、平面设计、数字媒体设计、AI 设计及程序软件设计等领域积累了丰富经验，并具备成熟的项目落地能力。', accent: false },
      { text: '我们更加注重实用性、适配性、专业性与落地性，让项目从想法走向真实体验。', accent: true },
    ],
    meta: 'SPACE / VISUAL / AI DIGITAL DESIGN',
    image: '/assets/studio-bw.webp',
  },
  {
    kind: 'designer',
    kicker: 'DESIGNER PROFILE',
    title: '耿茁华',
    headline: '全方位赋能设计经验',
    body: '拥有 5 年空间设计经验与 3 年品牌全案设计经验，是第一批 AI Agent 搭建先行者。覆盖品牌 VI、平面宣传、电商视觉、新媒体视觉与包装、工装设计、住宅设计、网页搭建、APP 搭建、AICG、AI Agent 搭建与 Skills 定制。擅长将品牌调性、用户审美与市场需求转译为稳定、高级、可执行的方案。',
    meta: 'STRATEGY / SYSTEM / DELIVERY',
    image: '/assets/designer-geng-final.webp',
  },
];

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname + window.location.search);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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
    const activeSlug = archiveMap[slugFromQuery]?.slug || archiveMap[slugFromPath]?.slug || 'visual';
    const row = archiveMap[activeSlug] || archiveMap.visual;
    return (
      <main className="appRoot">
        <SiteNav onNavigate={navigate} />
        <ProjectArchivePage row={row} activeSlug={activeSlug} onBack={() => navigate('/')} onNavigate={navigate} />
      </main>
    );
  }

  return (
    <main className="appRoot">
      {introDismissed && <SiteNav onNavigate={navigate} />}
      {introDismissed ? (
        <div className="siteCanvas isRevealed">
          <Hero />
          <Profile />
          <ExpertiseSpotlight />
          <ProjectShowcase onNavigate={navigate} />
          <Strengths />
          <ContactSection />
          <RequirementForm />
        </div>
      ) : (
        <PrefacePage isLeaving={introLeaving} onEnter={enterHome} />
      )}
    </main>
  );
}

function SiteNav({ onNavigate }) {
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
        <span>AFD全案设计事务所</span>
      </a>
      <div className="navLinks">
        <a href="/#profile" onClick={(event) => { event.preventDefault(); onNavigate('/'); window.location.hash = '#profile'; }}>公司介绍</a>
        <a href="/#projects" onClick={(event) => { event.preventDefault(); onNavigate('/'); window.location.hash = '#projects'; }}>作品展示</a>
        <a href="/#strengths" onClick={(event) => { event.preventDefault(); onNavigate('/'); window.location.hash = '#strengths'; }}>项目介绍</a>
        <a href="/#contact" onClick={(event) => { event.preventDefault(); onNavigate('/'); window.location.hash = '#contact'; }}>联系方式</a>
      </div>
      <a
        className="navContact navHomeIcon"
        href="/"
        aria-label="返回首页"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('/');
        }}
      >
        <House size={18} />
      </a>
    </nav>
  );
}

function PrefacePage({ isLeaving, onEnter }) {
  const typedTitle = '璁╄璁＄編瀛n璐交鎮ㄧ殑鐢熸椿';
  const showLead = true;
  const showSupport = true;
  const showCopy = true;
  const title = '让设计美学\n贯彻您的生活';

  return (
    <section className={`prefacePage ${isLeaving ? 'isLeaving' : ''}`} aria-label="前言页">
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
        <div className={`prefaceKicker ${showLead ? 'isVisible' : ''}`}>AFD全案设计事务所</div>
        <button className="prefaceTitleButton" type="button" onClick={onEnter} aria-label="进入首页">
          <span className="prefaceTitle" aria-hidden="true" style={{ whiteSpace: 'pre-line' }}>
            {typedTitle}
            <span className={`prefaceCaret ${typedTitle.length < title.length ? 'isActive' : ''}`} />
          </span>
        </button>
        <div className={`prefaceLine ${showLead ? 'isVisible' : ''}`}>AFD DESIGN</div>
        <div className={`prefaceCopy ${showSupport ? 'isVisible' : ''}`}>个人全案工作室·覆盖视觉设计，工装，住宅，数字设计，智能体搭建</div>
        <div className={`prefaceCopy isSub ${showCopy ? 'isVisible' : ''}`}>用心去呈现美学，用设计影响生活。</div>
      </div>
      <div className={`prefaceHint ${showCopy ? 'isVisible' : ''}`}>点击标题进入官网</div>
    </section>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroOverlay" />
      <div className="container heroInner heroIndex">
        <h1 className="heroIndexTitle" aria-label="全方位设计服务">
          <span>全方位</span>
          <span>设计服务</span>
        </h1>
        <div className="heroStat">
          <span>///</span>
          <strong>80+</strong>
          <p>覆盖品牌视觉、AI 应用、空间场景与数字产品的综合设计项目经验。</p>
        </div>
        <a className="heroStart" href="#requirements">
          填写您的需求表格
          <ArrowUpRight size={20} />
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

function Profile() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = introSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % introSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

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
            <strong>{String(introSlides.length).padStart(2, '0')}</strong>
          </div>
        </div>
      </div>
      <div className="introControls" aria-label="轮播切换">
        <button type="button" onClick={() => setActiveSlide((current) => (current - 1 + introSlides.length) % introSlides.length)} aria-label="上一页">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => setActiveSlide((current) => (current + 1) % introSlides.length)} aria-label="下一页">
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

function ExpertiseSpotlight() {
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
            <h2>全方位赋能设计经验</h2>
            <p className="expertiseLead">把视觉、空间和数字设计统一到一套更稳定的表达系统里。</p>
            <p className="expertiseBody">
              拥有 5 年空间设计经验，3 年品牌全案设计经验，是第一批 AI Agent 搭建先行者。覆盖品牌 VI、平面宣传、电商视觉、新媒体视觉与包装、工装设计、住宅设计、网页搭建、APP 搭建、AICG、AI Agent 搭建与 Skills 定制。
            </p>
            <p className="expertiseBody isHighlight">
              擅长将品牌调性、用户审美与市场需求转译为稳定、高级、可执行的方案。
            </p>
          </div>
        </div>

        <div className="expertiseStats">
          {expertiseStats.map((item) => (
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
            <h2>精选项目</h2>
          </div>
          <p>围绕品牌、空间、AI 与数字产品的综合项目展示。</p>
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

function ProjectShowcase({ onNavigate }) {
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
            <h2>项目展示</h2>
          </div>
          <p>每个大类下都以统一的三栏节奏进行展示，点击卡片可查看归档页面中的完整项目。</p>
        </div>
        <div className="projectRows">
          {projectRows.map((row) => (
            <ProjectShowcaseRow row={row} key={row.title} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcaseRow({ row, onNavigate }) {
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
        <div className="overviewIcons" aria-label={`${row.title} 分类`}>
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
          <span>查看全部</span>
          <ArrowUpRight size={17} />
        </a>
      </BorderGlow>

      <div className="projectCarouselPanel">
        <BorderGlow
          className="projectArrow isLeft"
          as="button"
          type="button"
          onClick={() => setActiveProject((current) => (current - 1 + projectCount) % projectCount)}
          aria-label="上一项"
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
                  aria-label={`查看 ${project.title}`}
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
          aria-label="下一项"
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
        <div className="projectDots" aria-label={`${row.title} 分页`}>
          {row.projects.map((project, index) => (
            <button
              type="button"
              className={index === activeProject ? 'isActive' : ''}
              key={project.title}
              onClick={() => setActiveProject(index)}
              aria-label={`查看 ${project.title}`}
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

function ProjectArchivePage({ row, activeSlug, onBack, onNavigate }) {
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
            <span>项目数量</span>
          </div>
        </div>

        <div className="container archiveFilters" role="tablist" aria-label={`${row.title} 分类切换`}>
          {projectRows.map((group) => (
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
                  aria-label={`查看 ${project.title}`}
                >
                  <AppImage src={project.image} alt="" style={{ objectPosition: project.focal || '50% 50%' }} />
                  <span className="archiveImageHint">点击查看大图</span>
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
          />
        )}
      </section>
    </main>
  );
}

function ProjectLightbox({ project, imageIndex, onClose, onPrev, onNext }) {
  const gallery = getProjectGallery(project);
  const current = gallery[imageIndex % gallery.length];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="lightboxBackdrop" type="button" aria-label="关闭" onClick={onClose} />
      <div className="lightboxPanel">
        <BorderGlow
          className="lightboxClose"
          as="button"
          type="button"
          onClick={onClose}
          aria-label="关闭"
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
          ×
        </BorderGlow>
        <BorderGlow
          className="lightboxArrow isLeft"
          as="button"
          type="button"
          onClick={onPrev}
          aria-label="上一张"
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
          aria-label="下一张"
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

function Strengths() {
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
            <h2>核心优势</h2>
          </div>
          <p>让每个项目都能从概念、执行到落地形成稳定闭环。</p>
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

function ContactSection() {
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
          <h2>让我们的合作从清晰沟通开始</h2>
          <p>如果你正在推进品牌、空间、AI 或网页项目，可以直接通过右侧联系方式找到我。</p>
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
          <p className="contactRole">全案设计师 / 品牌、空间、AI 与数字设计</p>
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
              <AppImage src="/assets/wechat-qr.jpg" alt="微信二维码" />
              <small>扫码添加微信</small>
            </div>
          </div>
          <a className="primaryBtn" href={`mailto:${contact.email}`}>
            发送合作邮件
            <ArrowUpRight size={20} />
          </a>
        </BorderGlow>
      </div>
    </section>
  );
}

function RequirementForm() {
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
          <h2>让我们的合作从清晰沟通开始</h2>
          <p>你可以直接填写需求，我们会根据项目类型、预算与时间节奏，快速判断匹配方式并给出下一步建议。</p>
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
            <span>项目类别</span>
            <select defaultValue="">
              <option value="" disabled>请选择项目类别</option>
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
            <span>姓名</span>
            <input type="text" placeholder="请输入你的姓名" />
          </label>
          <label className="wideField">
            <span>需求</span>
            <textarea rows="6" placeholder="简要描述项目目标、内容范围和希望解决的问题" />
          </label>
          <label>
            <span>预算</span>
            <select defaultValue="">
              <option value="" disabled>请选择预算范围</option>
              <option value="under-10k">1 万以内</option>
              <option value="10k-30k">1 万 - 3 万</option>
              <option value="30k-80k">3 万 - 8 万</option>
              <option value="80k-150k">8 万 - 15 万</option>
              <option value="over-150k">15 万以上</option>
              <option value="discuss">需要沟通</option>
            </select>
          </label>
          <button className="submitBrief" type="button">
            发送需求
            <ArrowUpRight size={20} />
          </button>
        </BorderGlow>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
