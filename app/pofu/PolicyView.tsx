import Link from "next/link";
import type { PolicyDoc } from "./policy-content";

/**
 * Gizlilik politikası sayfasının sunumu. İçerik `policy-content.ts` içinde;
 * burada yalnız düzen var, iki dil de aynı bileşeni kullanıyor.
 */
export function PolicyView({ doc }: { doc: PolicyDoc }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="border-b border-[var(--border)] pb-8">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent-1)]">
          ← {doc.backLabel}
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {doc.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
          <span>{doc.updated}</span>
          <span aria-hidden="true">·</span>
          <Link
            href={doc.altHref}
            className="text-[var(--accent-3)] underline-offset-4 hover:underline">
            {doc.altLabel}
          </Link>
        </div>

        <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-[var(--foreground)]/90">
          {doc.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-[var(--accent-1)]">
              {section.heading}
            </h2>

            {section.paragraphs?.map((p) => (
              <p
                key={p}
                className="mt-3 text-[15px] leading-relaxed text-[var(--foreground)]/85">
                {p}
              </p>
            ))}

            {section.bullets ? (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[15px] leading-relaxed text-[var(--foreground)]/85">
                    <span aria-hidden="true" className="text-[var(--accent-2)]">
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <footer className="mt-16 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
        Pofu · {doc.updated}
      </footer>
    </main>
  );
}
