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
  name: '耿茁华',
  title: 'AFD全案设计事务所',
  location: '中国',
  email: '635296715@qq.com',
  phone: '+86 156 9632 9109',
  wechat: '微信号: zh_zuishuai',
};

const categories = [
  {
    title: '视觉设计',
    icon: PenTool,
    items: ['平面设计', '海报设计', 'Logo 设计', 'UI 设计', '品牌形象'],
  },
  {
    title: 'AI 设计',
    icon: Cpu,
    items: ['AI 智能体设计', 'AI Skill 设计', 'AI 网站 / Web / App / 小程序'],
  },
  {
    title: '空间设计',
    icon: Building2,
    items: ['住宅设计', '办公 / 会所 / 酒店', '零售空间', '景观设计', '直播场景'],
  },
];

const expertiseStats = [
  { value: '05', unit: '年', label: '空间与品牌设计经验', detail: '覆盖品牌系统、空间表达与高质量项目交付。' },
  { value: '03', unit: '类', label: '核心能力方向', detail: '视觉设计、空间设计与 AI 驱动的数字产品交付。' },
  { value: '80+', unit: '项', label: '跨类别项目经验', detail: '覆盖品牌、室内、网页、应用与 AI 系统。' },
  { value: '08', unit: '步', label: '稳定交付方法', detail: '从需求、提案到制作与交付，流程清晰稳定。' },
];

const featuredProjects = [
  {
    type: 'VISUAL',
    title: 'XENITH 品牌视觉系统',
    desc: '品牌识别、视觉系统与包装延展。',
    tags: ['品牌视觉', 'VI', '包装'],
    tone: 'amber',
    image: '/assets/xenith-brand.webp',
    gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'],
  },
  {
    type: 'AI',
    title: '春山时 餐饮品牌设计',
    desc: '餐饮品牌、包装系统与视觉延展。',
    tags: ['餐饮品牌', 'VI', '包装'],
    tone: 'cyan',
    image: '/assets/spring-mountain-visual.webp',
    gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'],
  },
  {
    type: 'SPACE',
    title: '林野集 LINKING 全案设计',
    desc: '品牌全案、VI 与平面视觉系统。',
    tags: ['全案设计', 'VI', '平面'],
    tone: 'violet',
    image: '/assets/linyeji-linking.webp',
    gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'],
  },
  {
    type: 'UI',
    title: '玉宝 / 银玉 全案设计',
    desc: '全案设计、VI 与平面视觉系统。',
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
    label: '视觉设计',
    description: '从平面、海报到 Logo、UI 与品牌形象，建立统一的视觉语言。',
    archiveDetail: '聚焦品牌识别、视觉系统与数字表达，形成完整一致的项目呈现。',
    layout: 'overviewLeft',
    route: '/works?section=visual',
    subcategories: [
      { label: '平面设计', icon: PenTool },
      { label: '海报设计', icon: Frame },
      { label: 'Logo 设计', icon: Sparkles },
      { label: 'UI 设计', icon: MonitorSmartphone },
      { label: '品牌形象', icon: Layers3 },
    ],
    projects: [
      { title: 'XENITH 品牌视觉系统', meta: '品牌设计 / 视觉识别 / 延展系统', year: '2024', visual: 'visualBrand', image: '/assets/xenith-brand.webp', gallery: ['/assets/xenith-brand.webp', '/assets/xenith-keyboard.jpg'], focal: '50% 42%', focus: ['品牌设计', 'VI'] },
      { title: '春山时 餐饮品牌设计', meta: '品牌设计 / 餐饮视觉 / 包装系统', year: '2024', visual: 'visualUi', image: '/assets/spring-mountain-visual.webp', gallery: ['/assets/spring-mountain-visual.webp', '/assets/spring-mountain-space.webp'], focal: '50% 44%', focus: ['餐饮品牌', '包装'] },
      { title: '林野集 LINKING 全案设计', meta: '全案设计 / VI / 平面视觉', year: '2023', visual: 'visualObject', image: '/assets/linyeji-linking.webp', gallery: ['/assets/linyeji-linking.webp', '/assets/linyeji-app-dashboard.webp'], focal: '50% 40%', focus: ['全案设计', 'VI'] },
      { title: '玉宝 / 银玉 全案设计', meta: '全案设计 / VI / 平面视觉', year: '2024', visual: 'visualBrand', image: '/assets/yuyao-silverjade.webp', gallery: ['/assets/yuyao-silverjade.webp'], focal: '50% 42%', focus: ['全案设计', 'VI'] },
    ],
  },
  {
    slug: 'space',
    icon: Building2,
    no: '02',
    title: '空间设计',
    label: '空间设计',
    description: '住宅、餐饮、零售与会所空间，以叙事空间和落地体验为核心。',
    archiveDetail: '围绕生活方式、商业消费与空间叙事展开，覆盖住宅、餐饮、零售与会所环境。',
    layout: 'overviewRight',
    route: '/works?section=space',
    subcategories: [
      { label: '住宅设计', icon: Building2 },
      { label: '办公 / 会所 / 酒店', icon: Frame },
      { label: '零售空间', icon: SquareStack },
      { label: '景观设计', icon: Sparkles },
      { label: '直播场景', icon: MonitorSmartphone },
    ],
    projects: [
      { title: '春山时新零售餐饮空间', meta: '商业室内 / 餐饮空间 / 品牌延展', year: '2024', visual: 'spaceLight', image: '/assets/spring-mountain-space.webp', gallery: ['/assets/spring-mountain-space.webp'], focal: '50% 48%', focus: ['商业室内', '餐饮空间'] },
      { title: '武汉融创一号院住宅', meta: '住宅设计 / 户型规划 / 现代极简', year: '2023', visual: 'spaceGallery', image: '/assets/wuhan-rongchuang-1.webp', gallery: ['/assets/wuhan-rongchuang-1.webp'], focal: '50% 38%', focus: ['住宅设计'] },
      { title: 'MOMENT 主材展厅', meta: '展厅空间 / 叙事动线 / 克制极简', year: '2023', visual: 'spaceRetail', image: '/assets/moment-main-material.webp', gallery: ['/assets/moment-main-material.webp'], focal: '50% 42%', focus: ['展陈空间'] },
      { title: '意大利银玉新中式茶吧', meta: '零售空间 / 茶饮餐吧 / 现代东方', year: '2024', visual: 'spaceRetail', image: '/assets/yinyu-italy-tea.jpg', gallery: ['/assets/yinyu-italy-tea.jpg'], focal: '50% 44%', focus: ['零售空间'] },
      { title: '武汉现代东方住宅', meta: '120 平 / 住宅室内 / 东方现代', year: '2024', visual: 'spaceLight', image: '/assets/wuhan-oriental-home.webp', gallery: ['/assets/wuhan-oriental-home.webp'], focal: '50% 42%', focus: ['住宅设计'] },
      { title: '华润天宸现代意式住宅', meta: '148 平 / 住宅空间 / 现代意式', year: '2023', visual: 'spaceRetail', image: '/assets/huarun-tianchen-italian.webp', gallery: ['/assets/huarun-tianchen-italian.webp'], focal: '50% 42%', focus: ['住宅设计'] },
      { title: 'The Boots 餐厅 / 武汉', meta: '餐饮室内 / 商业建筑 / 休闲体验', year: '2024', visual: 'spaceLight', image: '/assets/the-boots-wuhan.webp', gallery: ['/assets/the-boots-wuhan.webp'], focal: '50% 42%', focus: ['餐饮空间'] },
      { title: '仁记面包 / 武汉泛海广场', meta: '零售 / 烘焙空间 / 解构调性', year: '2024', visual: 'spaceGallery', image: '/assets/kq-fanhai-bakery.jpg', gallery: ['/assets/kq-fanhai-bakery.jpg'], focal: '50% 42%', focus: ['零售空间'] },
      { title: '南山会所 / 当代商务空间', meta: '会所空间 / 商务接待 / 当代克制', year: '2023', visual: 'spaceGallery', image: '/assets/studio-bw.webp', gallery: ['/assets/studio-bw.webp'], focal: '50% 40%', focus: ['会所空间'] },
    ],
  },
  {
    slug: 'web',
    icon: MonitorSmartphone,
    no: '03',
    title: '网页 / App 搭建',
    label: '网页 / App 搭建',
    description: '从品牌官网到后台系统，兼顾体验、转化与信息层级。',
    archiveDetail: '覆盖品牌站、企业官网、应用与小程序，整合信息架构与视觉表达。',
    layout: 'overviewLeft',
    route: '/works?section=web',
    subcategories: [
      { label: '网页 / App 搭建', icon: MonitorSmartphone },
      { label: '网页开发', icon: Cpu },
      { label: 'App 设计', icon: Contact },
      { label: '后台系统', icon: SquareStack },
      { label: 'UI 设计', icon: Layers3 },
    ],
    projects: [
      { title: '林野集 LINKING 商城 App 与管理后台', meta: '商城系统 / 数据可视化 / 权限管理', year: '2024', visual: 'webDashboard', image: '/assets/linyeji-app-dashboard.webp', gallery: ['/assets/linyeji-app-dashboard.webp', '/assets/linyeji-linking.webp'], focal: '50% 24%', focus: ['商城系统'] },
      { title: '春山时官网设计与开发', meta: '品牌官网 / 响应式设计 / 交互体验', year: '2024', visual: 'webMobile', image: '/assets/spring-mountain-ui.webp', gallery: ['/assets/spring-mountain-ui.webp', '/assets/enterprise-homepage-dev.webp'], focal: '50% 36%', focus: ['品牌官网'] },
      { title: '企业官网设计与开发', meta: '企业官网 / 商务交互 / 转化导向', year: '2023', visual: 'webLanding', image: '/assets/enterprise-homepage-dev.webp', gallery: ['/assets/enterprise-homepage-dev.webp'], focal: '52% 42%', focus: ['企业官网'] },
    ],
  },
  {
    slug: 'ai',
    icon: Bot,
    no: '04',
    title: 'AI 智能体搭建',
    label: 'AI 智能体搭建',
    description: '从客服、流程到知识管理，构建真正可运行的智能系统。',
    archiveDetail: '围绕 AI 客服、流程自动化与知识管理，形成可落地、可复用的解决方案。',
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
      { title: 'AI 客服智能体', meta: '客户咨询 / 自动回复 / 推荐支持', year: '2024', visual: 'aiFlow', image: '/assets/nexa-ai-agent.webp', gallery: ['/assets/nexa-ai-agent.webp'], focal: '50% 20%', focus: ['AI 客服'] },
      { title: '业务流程自动化智能体', meta: '流程归档 / 内容分发 / 发布协同', year: '2024', visual: 'aiWorkflow', image: '/assets/ai-workflow-panel.webp', gallery: ['/assets/ai-workflow-panel.webp'], focal: '50% 26%', focus: ['流程自动化', '内容分发'] },
      { title: 'KM 智能体', meta: '技能管理 / 流程归档 / 知识图谱', year: '2023', visual: 'aiKnowledge', image: '/assets/km-agent.webp', gallery: ['/assets/km-agent.webp'], focal: '50% 36%', focus: ['知识管理', '技能'] },
    ],
  },
];

const archiveMap = Object.fromEntries(projectRows.map((row) => [row.slug, row]));

const strengths = [
  { icon: Layers3, title: '策略与交付并重', text: '从品牌思考到空间执行与数字表达，把抽象需求转化为可落地系统。' },
  { icon: Bot, title: '视觉、空间、AI 一体化', text: '让视觉语言、内容系统、空间氛围和智能工具保持同一套逻辑。' },
  { icon: Frame, title: '高密度项目执行', text: '在复杂交付、多轮修改与跨端协作中，依然保持节奏与质量。' },
  { icon: MonitorSmartphone, title: '长期主义品牌共创', text: '不是一次性交付，而是嵌入品牌长期成长与运营的设计关系。' },
  { icon: Cpu, title: '网页与交互同步落地', text: '信息架构、界面层级与前端实现同步推进，减少设计开发脱节。' },
  { icon: Sparkles, title: '审美统一与细节控制', text: '字体、材质、版式与动效保持协调，让整体体验更完整。' },
];

const introSlides = [
  {
    kind: 'company',
    kicker: '公司介绍',
    title: 'AFD',
    headline: '公司介绍',
    bodyParts: [
      { text: 'AFD 设计事务所是一家专注于品牌赋能与生活美学的独立全案工作室。', accent: false },
      { text: '服务范围覆盖空间设计、视觉设计与 AI 驱动的数字设计。', accent: true },
      { text: '工作室由具有设计、供应链协作与数字制作背景的成员共同建立。', accent: false },
      { text: '团队拥有环境空间、平面设计、数字媒体、AI 设计与软件创意方向的实际交付经验。', accent: false },
      { text: '始终强调实用性、适配性、专业度与真实落地。', accent: true },
    ],
    meta: '空间 / 视觉 / AI 数字设计',
    image: '/assets/studio-bw.webp',
  },
  {
    kind: 'designer',
    kicker: '设计师简介',
    title: '耿茁华',
    headline: '跨学科设计经验',
    body: '拥有多年空间与品牌设计经验，实践覆盖品牌 VI、平面传播、电商视觉、新媒体设计、包装、商业空间、住宅设计、网站、应用与 AI 系统。',
    meta: '策略 / 系统 / 交付',
    image: '/assets/designer-geng-final.webp',
  },
];

const UI_COPY = {
  zh: {
    navBrand: 'AFD全案设计事务所',
    navLinks: [
      { href: '#profile', label: '公司介绍' },
      { href: '#projects', label: '项目展示' },
      { href: '#strengths', label: '核心优势' },
      { href: '#contact', label: '联系方式' },
    ],
    languageButton: '中文',
    languageAria: '当前为中文',
    homeAria: '返回首页',
    prefaceTitle: '让设计美学\n贯穿你的生活',
    prefaceKicker: 'AFD全案设计事务所',
    prefaceCopy: '独立全案工作室，覆盖视觉设计、空间设计、住宅项目、数字设计与 AI 智能体搭建。',
    prefaceSub: '用心呈现美学，用设计影响生活。',
    prefaceHint: '点击标题进入主页',
    prefaceAria: '前言页面',
    enterHomeAria: '进入主页',
    heroTitle: ['全方位', '设计服务'],
    heroAria: '全方位设计服务',
    heroStatDesc: '覆盖品牌视觉、AI 应用、空间场景与数字产品的跨领域项目经验。',
    heroStart: '填写你的需求',
    profileControls: '轮播切换',
    previousPage: '上一页',
    nextPage: '下一页',
    expertiseTitle: '跨学科设计经验',
    expertiseLead: '把视觉设计、空间设计与数字设计整合进同一套更稳定的表达系统。',
    expertiseBody: '实践覆盖品牌 VI、平面传播、电商视觉、新媒体设计、包装、商业空间、住宅设计、网站、应用与 AI 系统。',
    expertiseHighlight: '擅长将品牌调性、用户审美与市场需求转译为稳定、高级且可执行的方案。',
    showcaseTitle: '项目展示',
    showcaseDesc: '每个大类都以统一的三栏节奏呈现，点击卡片即可查看该类别的完整归档页面。',
    viewAll: '查看全部',
    projectCount: '项目数量',
    archiveFilterSuffix: '分类切换',
    openLargeImage: '点击查看大图',
    strengthsTitle: '核心优势',
    strengthsDesc: '让每个项目都能从概念、执行到交付形成稳定闭环。',
    contactHeading: '让我们的合作从清晰沟通开始',
    contactDesc: '如果你正在推进品牌、空间、AI 或网页项目，可以直接通过右侧联系卡找到我。',
    contactRole: '全案设计师 / 品牌、空间、AI 与数字设计',
    qrAlt: '微信二维码',
    qrHint: '扫码添加微信',
    sendMail: '发送合作邮件',
    requirementHeading: '从清晰需求开始推进项目',
    requirementDesc: '你可以直接提交需求，我们会根据项目类型、预算与时间节奏，快速给出合适的合作建议和下一步方向。',
    formProjectType: '项目类型',
    formProjectPlaceholder: '请选择项目类型',
    formName: '姓名',
    formNamePlaceholder: '请输入你的姓名',
    formRequirement: '需求说明',
    formRequirementPlaceholder: '请描述项目目标、范围，以及你想解决的问题',
    formBudget: '预算',
    formBudgetPlaceholder: '请选择预算范围',
    formBudgetOptions: [
      { value: 'under-10k', label: '1 万以下' },
      { value: '10k-30k', label: '1 万 - 3 万' },
      { value: '30k-80k', label: '3 万 - 8 万' },
      { value: '80k-150k', label: '8 万 - 15 万' },
      { value: 'over-150k', label: '15 万以上' },
      { value: 'discuss', label: '需要沟通' },
    ],
    sendRequirement: '发送需求',
    close: '关闭',
    previousImage: '上一张图片',
    nextImage: '下一张图片',
  },
};

const CONTACT_EN = {
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
    title: 'Yubao 鐠?Yinyu Full-Service Design',
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
    text: 'Not a one-off output, but a design relationship embedded into the brand闁炽儲鐛?long-term growth and operation.',
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
    kicker: '设计师简介',
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
        title: 'Yubao 鐠?Yinyu Full-Service Design',
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
      { title: 'Modern Oriental Residence 鐠?Wuhan', meta: '120 sqm / residential interior / oriental modern aesthetic', year: '2024', visual: 'spaceLight', image: '/assets/wuhan-oriental-home.webp', gallery: ['/assets/wuhan-oriental-home.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Renji Bakery 鐠?Wuhan Fanhai Plaza', meta: 'New retail / bakery commercial space / deconstructivist mood', year: '2024', visual: 'spaceGallery', image: '/assets/kq-fanhai-bakery.jpg', gallery: ['/assets/kq-fanhai-bakery.jpg'], focal: '50% 42%', focus: ['Commercial Retail'] },
      { title: 'The Boots Restaurant 鐠?Wuhan', meta: 'Dining interior / commercial architecture / leisure experience', year: '2024', visual: 'spaceLight', image: '/assets/the-boots-wuhan.webp', gallery: ['/assets/the-boots-wuhan.webp'], focal: '50% 42%', focus: ['Dining Space'] },
      { title: 'Modern Italian Residence 鐠?Wuhan Tianchen', meta: '148 sqm / flat residence / modern Italian style', year: '2023', visual: 'spaceRetail', image: '/assets/huarun-tianchen-italian.webp', gallery: ['/assets/huarun-tianchen-italian.webp'], focal: '50% 42%', focus: ['Residential Design'] },
      { title: 'Nanshan Club 鐠?Contemporary Business Space', meta: 'Club interior / business reception / contemporary restraint', year: '2023', visual: 'spaceGallery', image: '/assets/studio-bw.webp', gallery: ['/assets/studio-bw.webp'], focal: '50% 40%', focus: ['Club Space'] },
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
    ui: UI_COPY.zh,
    contact,
    categories,
    expertiseStats,
    featuredProjects,
    strengths,
    introSlides,
    projectRows,
  };
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname + window.location.search);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [language, setLanguage] = useState('zh');
  const localized = getLocalizedPortfolio(language);
  const localizedArchiveMap = Object.fromEntries(localized.projectRows.map((row) => [row.slug, row]));

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname + window.location.search);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = 'zh-CN';
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
          onClick={() => setLanguage('zh')}
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
        <div className={`prefaceLine ${showLead ? 'isVisible' : ''}`}>AFD 全案设计</div>
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
          <b>设计</b>
          <span>不止于装饰</span>
        </div>
      </div>
      <div className="scrollCue">滚动浏览</div>
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
            <div className="sectionLabel">全案设计师</div>
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
            <div className="sectionLabel">精选项目</div>
            <h2>精选项目</h2>
          </div>
          <p>涵盖品牌、空间、AI 系统与数字产品的代表性项目。</p>
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
            <span>精选项目</span>
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
        <div className="projectDots" aria-label={`${row.title} 分页`}>
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
          鑴?        </BorderGlow>
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
            <div className="sectionLabel">核心优势</div>
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
          <div className="sectionLabel">联系</div>
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
          <div className="sectionLabel">项目需求</div>
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


