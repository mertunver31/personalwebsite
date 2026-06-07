import { Reveal } from "./Reveal";

// Tüm bölümlerde kullanılan başlık (kicker + büyük başlık)
export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="section-kicker flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-accent-1">
        <span aria-hidden className="text-accent-2">
          ★
        </span>
        {kicker}
      </p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div className="bg-gradient-accent mt-5 h-1 w-20 rounded-full" />
    </Reveal>
  );
}
