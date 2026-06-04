// İki dilli metin tipi: her alanın TR ve EN karşılığı
export type Localized = { tr: string; en: string };

export type SocialLink = {
  label: string;
  href: string;
  // lucide-react ikon adı (Icons haritasında çözülür)
  icon: "github" | "linkedin" | "mail" | "twitter" | "globe";
};

export type Skill = {
  name: string;
  // 0-100 yetkinlik (opsiyonel görsel bar için)
  level?: number;
};

export type SkillGroup = {
  title: Localized;
  skills: Skill[];
};

export type ExperienceItem = {
  role: Localized;
  company: string;
  period: Localized;
  description: Localized;
  tech?: string[];
};

export type EducationItem = {
  degree: Localized;
  school: string;
  period: Localized;
  description?: Localized;
};

export type Project = {
  title: string;
  // Tek satırlık vurucu açıklama
  tagline: Localized;
  // 2-3 cümlelik problem + çözüm
  description: Localized;
  tech: string[];
  // Kaynak kod gizliyse true -> "Kaynak kodu özel" rozeti
  privateRepo?: boolean;
  // Varsa canlı demo veya public repo linki
  liveUrl?: string;
  repoUrl?: string;
  // public/projects/ altındaki görsel (opsiyonel)
  image?: string;
  // Öne çıkan proje mi
  featured?: boolean;
};
