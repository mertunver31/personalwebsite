"use client";

import {
  siPytorch,
  siHuggingface,
  siOpencv,
  siMediapipe,
  siPython,
  siTypescript,
  siJavascript,
  siDart,
  siReact,
  siNextdotjs,
  siFastapi,
  siFlutter,
  siTailwindcss,
  siSelenium,
  siGit,
  siSupabase,
  siVercel,
  siFfmpeg,
  siPostman,
  siFigma,
  siClaude,
  siGooglegemini,
  siOllama,
  siAlibabacloud,
  type SimpleIcon,
} from "simple-icons";
import {
  Brain,
  Coffee,
  Database,
  Eye,
  Hand,
  Layers,
  Search,
  Sparkles,
  Sigma,
  Soup,
  BarChart3,
  Clapperboard,
  Zap,
  Theater,
  Code2,
  type LucideIcon,
} from "lucide-react";

type Entry =
  | { kind: "brand"; icon: SimpleIcon }
  | { kind: "lucide"; Icon: LucideIcon; color: string };

// Her yetenek -> marka logosu (simple-icons) veya kavramsal yedek (lucide)
const MAP: Record<string, Entry> = {
  // AI / LLM & Fine-Tuning
  PyTorch: { kind: "brand", icon: siPytorch },
  "Hugging Face": { kind: "brand", icon: siHuggingface },
  "LoRA / PEFT": { kind: "lucide", Icon: Layers, color: "#a78bfa" },
  "Prompt Engineering": { kind: "lucide", Icon: Sparkles, color: "#f0abfc" },
  RLHF: { kind: "lucide", Icon: Brain, color: "#f472b6" },
  RAG: { kind: "lucide", Icon: Search, color: "#22d3ee" },
  "Vector DBs": { kind: "lucide", Icon: Database, color: "#34d399" },
  OpenCV: { kind: "brand", icon: siOpencv },
  YOLO: { kind: "lucide", Icon: Eye, color: "#fb7185" },
  MediaPipe: { kind: "brand", icon: siMediapipe },

  // Diller / Languages
  Python: { kind: "brand", icon: siPython },
  TypeScript: { kind: "brand", icon: siTypescript },
  JavaScript: { kind: "brand", icon: siJavascript },
  Java: { kind: "lucide", Icon: Coffee, color: "#f89820" },
  Dart: { kind: "brand", icon: siDart },
  SQL: { kind: "lucide", Icon: Database, color: "#38bdf8" },

  // Web & Mobil
  React: { kind: "brand", icon: siReact },
  "Next.js": { kind: "brand", icon: siNextdotjs },
  FastAPI: { kind: "brand", icon: siFastapi },
  Flutter: { kind: "brand", icon: siFlutter },
  "Tailwind CSS": { kind: "brand", icon: siTailwindcss },

  // Veri & Analitik
  Selenium: { kind: "brand", icon: siSelenium },
  BeautifulSoup: { kind: "lucide", Icon: Soup, color: "#22d3ee" },
  "Power BI": { kind: "lucide", Icon: BarChart3, color: "#f2c811" },
  DAX: { kind: "lucide", Icon: Sigma, color: "#facc15" },

  // Araçlar & Platformlar
  Git: { kind: "brand", icon: siGit },
  Supabase: { kind: "brand", icon: siSupabase },
  Vercel: { kind: "brand", icon: siVercel },
  FFmpeg: { kind: "brand", icon: siFfmpeg },
  Remotion: { kind: "lucide", Icon: Clapperboard, color: "#0b84f3" },
  "Fal AI": { kind: "lucide", Icon: Zap, color: "#a855f7" },
  Postman: { kind: "brand", icon: siPostman },
  Figma: { kind: "brand", icon: siFigma },
  Playwright: { kind: "lucide", Icon: Theater, color: "#2ead33" },

  // AI Araçları
  "Claude Code": { kind: "brand", icon: siClaude },
  "Gemini Antigravity": { kind: "brand", icon: siGooglegemini },
  "Gemini CLI": { kind: "brand", icon: siGooglegemini },
  Codex: { kind: "lucide", Icon: Code2, color: "#10a37f" },
  Ollama: { kind: "brand", icon: siOllama },
  "Alibaba Cloud": { kind: "brand", icon: siAlibabacloud },
};

const FALLBACK: Entry = { kind: "lucide", Icon: Hand, color: "#a1a1b5" };

// Neredeyse siyah logoları neon karanlıkta okunur kıl
function neonColor(hex: string) {
  if (/^#?0{6}$/i.test(hex) || hex.toLowerCase() === "000000") return "#e5e7eb";
  return hex.startsWith("#") ? hex : `#${hex}`;
}

export function techColor(name: string): string {
  const e = MAP[name] ?? FALLBACK;
  return e.kind === "brand" ? neonColor(e.icon.hex) : e.color;
}

export function TechIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const e = MAP[name] ?? FALLBACK;

  if (e.kind === "brand") {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <path d={e.icon.path} />
      </svg>
    );
  }

  const Icon = e.Icon;
  return <Icon className={className} style={style} aria-hidden="true" />;
}
