import type { Project } from "./types";

/* =========================================================
   PROJELER — Mert Efe Ünver
   Gizli repolar için privateRepo: true (kaynak kod gösterilmez).
   ========================================================= */

export const projects: Project[] = [
  {
    title: "Blenz AI",
    tagline: {
      tr: "Full-Stack AI Video Editör",
      en: "Full-Stack AI Video Editor",
    },
    description: {
      tr: "Yüz tanıma ve ses-görüntü işleme için OpenCV, FFmpeg, MediaPipe ve Librosa entegre eden full-stack bir AI video editörü geliştirdim. Üçüncü parti üretken AI modellerini (Fal AI) üretim render pipeline'ına entegre ettim; React/Next.js arayüz, Supabase ile veritabanı/kimlik doğrulama ve Vercel üzerinde ölçeklenebilir mimari ile yayına aldım.",
      en: "Engineered a full-stack AI video editor integrating OpenCV, FFmpeg, MediaPipe and Librosa for facial recognition and audio-visual processing. Integrated third-party generative AI (Fal AI) into a production rendering pipeline, with a React/Next.js frontend, Supabase auth/DB, deployed on Vercel.",
    },
    tech: [
      "Next.js",
      "FastAPI",
      "OpenCV",
      "FFmpeg",
      "MediaPipe",
      "Remotion",
      "Fal AI",
      "Supabase",
    ],
    liveUrl: "https://blenzai.com",
    privateRepo: true,
    featured: true,
  },
  {
    title: "LLM Fine-Tuning & Evaluation",
    tagline: {
      tr: "Açık kaynak LLM'leri fine-tune etme ve değerlendirme",
      en: "Fine-tuning & evaluating open-source LLMs",
    },
    description: {
      tr: "Açık kaynak LLM'leri LoRA/PEFT ile özel talimat veri setleri üzerinde fine-tune ettim; eğitim verisi için veri temizleme ve biçimlendirme pipeline'ları kurdum. Yanıt kalitesini ve olgusal doğruluğu artırmak için değerlendirme rubrikleri tasarlayıp model çıktılarını sıraladım.",
      en: "Fine-tuned open-source LLMs on custom instruction datasets using LoRA/PEFT; built data-cleaning and formatting pipelines for training data. Designed evaluation rubrics and ranked model outputs to improve response quality and factual accuracy.",
    },
    tech: ["Python", "Hugging Face", "PEFT / LoRA", "PyTorch"],
    privateRepo: true,
    featured: true,
  },
  {
    title: "Kesin Gelir",
    tagline: {
      tr: "Serverless YKS Tercih Platformu",
      en: "Serverless YKS University-Preference Platform",
    },
    description: {
      tr: "Özel bir backend altyapısı olmadan büyük dış veri setlerini dinamik olarak çeken, işleyen ve render eden serverless bir frontend geliştirdim.",
      en: "Engineered a serverless frontend that dynamically fetches, processes, and renders large external datasets without dedicated backend infrastructure.",
    },
    tech: ["React", "Next.js", "Serverless"],
    privateRepo: true,
  },
];
