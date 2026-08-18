# Kişisel Portföy Sitesi

İki dilli (TR/EN), Next.js 16 + Tailwind v4 ile yapılmış, Vercel'de ücretsiz
yayınlanmak üzere tasarlanmış kişisel portföy / CV sitesi.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000  ( /tr ve /en )
npm run build    # üretim derlemesi
```

## İçeriği düzenleme (en önemli kısım)

Tüm kişisel içerik tek yerde, kolayca düzenlenebilir:

| Dosya | İçerik |
| --- | --- |
| `content/profile.ts` | Ad, ünvan, hakkımda, konum, e-posta, sosyal linkler, yetenekler, deneyim, eğitim |
| `content/projects.ts` | Proje kartları (gizli repolar için `privateRepo: true`) |
| `messages/tr.json` / `messages/en.json` | Arayüz metinleri (menü, buton vb.) |
| `public/cv.pdf` | İndirilebilir CV (bu dosyayı buraya koy) |
| `public/foto.jpg` | (Opsiyonel) profil fotoğrafı |
| `public/projects/` | (Opsiyonel) proje görselleri |

`TODO:` ile başlayan tüm alanlar doldurulması gereken yerlerdir. İki dilli alanlar
`{ tr: "...", en: "..." }` biçimindedir.

## Tasarım

- Koyu tema + elektrik gradyan (mor → fuşya → camgöbeği)
- `app/globals.css` içindeki `--accent-*` değişkenleriyle renk paleti değiştirilebilir
- Framer Motion ile kaydırmada beliren animasyonlar

## Deploy (Vercel)



1. Bu projeyi GitHub'a push et.
2. [vercel.com](https://vercel.com) → New Project → repoyu import et → Deploy.
3. Vercel Analytics paneli ziyaretçi istatistiklerini gösterir (`@vercel/analytics` zaten ekli).
4. Domain alındığında: Vercel → Project → Settings → Domains.
