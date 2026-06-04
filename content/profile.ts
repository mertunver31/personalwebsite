import type {
  EducationItem,
  ExperienceItem,
  Localized,
  SkillGroup,
  SocialLink,
} from "./types";

/* =========================================================
   KİŞİSEL BİLGİLER — Mert Efe Ünver
   ========================================================= */

export const profile = {
  name: "Mert Efe Ünver",
  role: {
    tr: "Fullstack AI Geliştirici",
    en: "Fullstack AI Developer",
  } satisfies Localized,
  tagline: {
    tr: "Üretim seviyesinde AI/LLM sistemlerini uçtan uca tasarlar, fine-tune eder ve yayına alırım.",
    en: "I build, fine-tune, and ship production-grade AI/LLM systems end to end.",
  } satisfies Localized,
  about: {
    tr: "Yapay zeka/LLM sistemlerini uçtan uca geliştiren, fine-tune eden ve yayına alan bir Fullstack AI geliştiricisiyim. Bağımsız olarak full-stack platformlar (React/Next.js + FastAPI) tasarlıyor, makine öğrenmesi modellerini entegre edip uyarlıyor ve bunları besleyen veri pipeline'larını kuruyorum. Modelin tüm yaşam döngüsünde rahatım: veri seti oluşturma, prompt mühendisliği, fine-tuning ve çıktı değerlendirme. Üniversiteler arası mühendislik yarışmalarında iki kez birincilik ve Teknofest finalistliği elde ettim.",
    en: "I'm a Fullstack AI Developer with hands-on experience building, fine-tuning, and shipping production-grade AI/LLM systems end to end. I independently design full-stack platforms (React/Next.js + FastAPI), integrate and adapt machine-learning models, and build the data pipelines that feed them — across the full model lifecycle: dataset construction, prompt engineering, fine-tuning, and output evaluation. Dual 1st-place winner in inter-university engineering competitions and a Teknofest finalist.",
  } satisfies Localized,
  location: {
    tr: "Ankara, Türkiye",
    en: "Ankara, Turkey",
  } satisfies Localized,
  email: "mertefeunver09@gmail.com",
  // CV PDF'i public/ altına koy: public/cv.pdf
  cvUrl: "/cv.pdf",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/mertunver31", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mertefeunver",
    icon: "linkedin",
  },
  { label: "E-posta", href: "mailto:mertefeunver09@gmail.com", icon: "mail" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: { tr: "AI / LLM & Fine-Tuning", en: "AI / LLM & Fine-Tuning" },
    skills: [
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "LoRA / PEFT" },
      { name: "Prompt Engineering" },
      { name: "RLHF" },
      { name: "RAG" },
      { name: "Vector DBs" },
      { name: "OpenCV" },
      { name: "YOLO" },
      { name: "MediaPipe" },
    ],
  },
  {
    title: { tr: "Diller", en: "Languages" },
    skills: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Java" },
      { name: "Dart" },
      { name: "SQL" },
    ],
  },
  {
    title: { tr: "Web & Mobil", en: "Web & Mobile" },
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "FastAPI" },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: { tr: "Veri & Analitik", en: "Data & Analytics" },
    skills: [
      { name: "Selenium" },
      { name: "BeautifulSoup" },
      { name: "Power BI" },
      { name: "DAX" },
    ],
  },
  {
    title: { tr: "Araçlar & Platformlar", en: "Tools & Platforms" },
    skills: [
      { name: "Git" },
      { name: "Supabase" },
      { name: "Vercel" },
      { name: "FFmpeg" },
      { name: "Remotion" },
      { name: "Fal AI" },
      { name: "Postman" },
      { name: "Figma" },
      { name: "Playwright" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: {
      tr: "Yazılım & AI Geliştirme Stajyeri",
      en: "Software & AI Development Intern",
    },
    company: "Pavo Group — Ankara",
    period: { tr: "May 2024 — Haz 2025", en: "May 2024 — Jun 2025" },
    description: {
      tr: "Takip süreçlerini otomatikleştirmek ve ekip iş akışlarını optimize etmek için dil modeli özellikleri gömülü, AI/LLM entegre bir görev yönetimi aracını bağımsız olarak geliştirdim. Yöneticilerin karar almasına yönelik DAX ile kapsamlı Power BI raporları ve panoları tasarladım.",
      en: "Independently engineered an AI/LLM-integrated task-management tool, embedding language-model features to automate tracking and optimize team workflows. Designed comprehensive Power BI reports and dashboards using DAX for executive decision-making.",
    },
    tech: ["Python", "LLM", "Power BI", "DAX"],
  },
  {
    role: {
      tr: "Yazılım Mühendisliği Stajyeri",
      en: "Software Engineering Intern",
    },
    company: "Kristal Bulut Yazılım — Ankara",
    period: { tr: "Ağu 2023 — Eki 2023", en: "Aug 2023 — Oct 2023" },
    description: {
      tr: "11+ e-ticaret platformundan ürün verilerini yapılandırılmış JSON'a çeken bir Python web-crawling sistemi (Selenium, BeautifulSoup) geliştirip yayına aldım — ML/AI kullanımına hazır, temiz ve etiketli veri setleri üretti.",
      en: "Built and deployed a Python web-crawling system (Selenium, BeautifulSoup) scraping product data from 11+ e-commerce platforms into structured JSON — producing clean, labeled datasets ready for downstream ML/AI use.",
    },
    tech: ["Python", "Selenium", "BeautifulSoup"],
  },
];

export const education: EducationItem[] = [
  {
    degree: {
      tr: "Bilgisayar Mühendisliği Y.L. (Tezli)",
      en: "M.S. in Computer Engineering (Thesis)",
    },
    school: "Gazi Üniversitesi — Ankara",
    period: { tr: "Oca 2026 — Günümüz", en: "Jan 2026 — Present" },
  },
  {
    degree: {
      tr: "Bilgisayar Mühendisliği Lisans (Tam Burslu)",
      en: "B.S. in Computer Engineering (Full Scholarship)",
    },
    school: "TED Üniversitesi — Ankara",
    period: { tr: "Eyl 2020 — Tem 2025", en: "Sep 2020 — Jul 2025" },
    description: {
      tr: "Not Ort.: 3.23 / 4.0 · Yan Dal: Uygulamalı Veri Analitiği",
      en: "GPA: 3.23 / 4.0 · Secondary Field: Applied Data Analytics",
    },
  },
];
