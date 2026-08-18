import type { Project } from "./types";

/* =========================================================
   PROJELER — Mert Efe Ünver
   Gizli repolar için privateRepo: true (kaynak kod gösterilmez).
   ========================================================= */

export const projects: Project[] = [
  {
    title: "Vitryn",
    tagline: {
      tr: "Küratörler için dijital vitrin platformu",
      en: "Digital showcase platform for curators",
    },
    description: {
      tr: "Küratörler ve markalar için çok kiracılı (multi-tenant) bir dijital vitrin/showcase platformunu uçtan uca tasarlayıp yayına aldım. Next.js + Supabase ile içerik yönetimi, kimlik doğrulama ve Vercel üzerinde ölçeklenebilir dağıtım. Kullanıcılar kendi koleksiyonlarını/vitrinlerini oluşturup paylaşabiliyor.",
      en: "Designed and shipped a multi-tenant digital showcase platform for curators and brands end to end. Content management, auth, and scalable deployment on Vercel with Next.js + Supabase — users build and share their own curated storefronts.",
    },
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.vitryn.co/",
    privateRepo: true,
    featured: true,
  },
  {
    title: "Memoire Vision",
    tagline: {
      tr: "🏆 2× Birincilik — Bilgisayarlı Görü",
      en: "🏆 2× First Place — Computer Vision",
    },
    description: {
      tr: "İki ayrı yarışmada birincilik kazanan bilgisayarlı görü / görüntü işleme projesi. Başkent Üniversitesi 'Genç Beyinler Yeni Fikirler 2025' proje yarışmasında 1.lik ve Işık Üniversitesi sinyal işleme konferansında 1.lik. Derin öğrenme tabanlı bir görü sistemi olarak uçtan uca tasarlandı ve sunuldu.",
      en: "A computer-vision / image-processing project that took first place in two competitions: 1st at Başkent University's 'Genç Beyinler Yeni Fikirler 2025' project contest and 1st at Işık University's signal-processing conference. A deep-learning-based vision system, designed and presented end to end.",
    },
    tech: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Deep Learning"],
    privateRepo: true,
    featured: true,
  },
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
    title: "Cross-Attention ViT — Deepfake Detection",
    tagline: {
      tr: "Sıkıştırılmış deepfake videolar için Vision Transformer",
      en: "Vision Transformer for compressed deepfake videos",
    },
    description: {
      tr: "Yüksek lisans Makine Öğrenmesi ve Etik dersleri için yapılan dönem sonu akademik projesi. Sıkıştırılmış (düşük kaliteli) deepfake videoları tespit etmek için hibrit bir Vision Transformer: uzamsal akış (entropi tabanlı uyarlanabilir patch + DeiT-Small) ile frekans akışı (2B FFT + EfficientNet-B0) cross-attention ile birleştirildi. SDFVD 2.0 veri setinde %95.99 AUC-ROC ve %89.13 doğruluk.",
      en: "End-of-term academic project for the M.S. Machine Learning and Ethics courses. A hybrid Vision Transformer for detecting compressed (low-quality) deepfake videos: a spatial stream (entropy-based adaptive patches + DeiT-Small) fused with a frequency stream (2D FFT + EfficientNet-B0) via cross-attention. 95.99% AUC-ROC and 89.13% accuracy on SDFVD 2.0.",
    },
    tech: ["Python", "PyTorch", "Vision Transformer", "FFT", "EfficientNet", "MTCNN"],
    repoUrl:
      "https://github.com/mertunver31/-AP-and-FD-Based-Cross-Attention-Vision-Transformer-Architecture-for-Compressed-Deepfake-Videos-",
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
    liveUrl: "https://www.kesingelir.com.tr/",
    privateRepo: true,
  },
  {
    title: "Turbo Best Downloader",
    tagline: {
      tr: "Reklam & gelir modeli deneyi",
      en: "Ad-tech & monetization experiment",
    },
    description: {
      tr: "Kasıtlı olarak çalışmayan bir 'dosya/video dönüştürücü'. Amaç gerçek bir converter sunmak değil; internetteki reklam ağlarının (ad networks) bir web sitesine reklamları nasıl yerleştirdiğini, reklam akışını ve gelir modelinin uçtan uca nasıl işlediğini gözlemlemek. Trafik, yerleşim ve kazanç dinamiklerini anlamak için bir kum havuzu.",
      en: "A deliberately non-functional 'file/video converter'. The point isn't to convert anything — it's to study how online ad networks inject ads into a site, how the ad flow works, and how the revenue model behaves end to end. A sandbox for understanding traffic, placement, and earnings dynamics.",
    },
    tech: ["Next.js", "Ad Networks", "SEO", "Analytics"],
    liveUrl: "https://turbobestdownloader.online/en",
  },
];
