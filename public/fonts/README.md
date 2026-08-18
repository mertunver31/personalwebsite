# Etsy Yazı Tipi Dosyaları / Etsy Font Files

Bu klasör, `/etsyfontype` sayfasında kullanılacak olan yazı tipi dosyalarını (font dosyalarını) yükleyeceğiniz yerdir.

Tasarım aracının fontları doğru bir şekilde yükleyebilmesi için dosyalarınızı **aşağıdaki isimlerle** bu klasörün içerisine ekleyin. Desteklenen dosya formatları: `.ttf`, `.otf`, `.woff`, `.woff2` (en yüksek performans için `.woff2` önerilir).

## Font Listesi ve Durum (Güncel)

✅ = dosya yüklü ve çalışıyor · ⬇️ = hâlâ dosya gerekiyor

| # | Font Adı | Dosya Adı | Durum / Not |
| :--- | :--- | :--- | :--- |
| **1** | Magnolia Script | `magnolia-script.otf` | ✅ Yüklü |
| **2** | Intro Script | `intro-script.otf` | ✅ Yüklü |
| **3** | Script MT Bold | `script-mt-bold.ttf` | ✅ Yüklü (Windows'tan kopyalandı) |
| **4** | GeoSlab703 Md BT | `geoslab703-md-bt.ttf` | ✅ Yüklü |
| **5** | Birds of Paradise | `birds-of-paradise.ttf` | ✅ Yüklü |
| **6** | smoothy cursive | `smoothy-cursive.otf/.ttf` | ✅ Yüklü |
| **7** | Lucida calligraphy | `lucida-calligraphy.ttf` | ✅ Yüklü (Windows'tan kopyalandı) |
| **8** | Monotype Corsiva | `monotype-corsiva.ttf` | ✅ Yüklü (Windows'tan kopyalandı) |
| **9** | Impact | (Gerek yok) | ✅ Sistemde gömülü |
| **10** | Lakesight | `lakesight.ttf` | ✅ Yüklü |
| **11** | La portenia de la recoleta | `la-portenia-de-la-recoleta.ttf` | ✅ Yüklü |
| **12** | Amorinda | `amorinda.ttf` | ✅ Yüklü |
| **13** | Austein Script | `austein-script.otf/.ttf/.woff2` | ✅ Yüklü |
| **14** | canterbury gothic | `canterbury-gothic.ttf` | ✅ Yüklü |
| **15** | Hobo BT | `hobo-bt.ttf` | ✅ Yüklü |
| **16** | Atatürk | `ataturk.ttf` | ✅ Yüklü |
| **17** | Dancing Script | (Gerek yok) | ✅ Google Fonts'tan otomatik |
| **18** | Autumn Chant | `autumn-chant.otf` | ✅ Yüklü |
| **19** | Angelface | `angelface.otf` | ✅ Yüklü |
| **20** | Sauber Script | `sauber-script.ttf` | ✅ Yüklü |

**Özet:** 20/20 font hazır. 🎉 Kalan 8 font için yukarıdaki dosyaları bu klasöre ekleyin; `fonts.css` zaten her ismi (büyük/küçük harf ve `.ttf/.otf/.woff2` varyantlarıyla) tanıyacak şekilde ayarlı, yani sadece dosyayı atmanız yeterli.

## Önemli Notlar

1. Font dosyalarını buraya attığınızda, web sitesini localhost'ta test ederken veya canlıya aldığınızda tarayıcılar bu fontları otomatik olarak okumaya başlayacaktır.
2. Dosya uzantılarınız `.otf`, `.woff` veya `.woff2` ise, `app/etsyfontype/fonts.css` dosyasındaki dosya yollarını güncelleyebilir veya doğrudan fontlarınızın uzantısını `.ttf` yerine kendi uzantınızla değiştirebilirsiniz (Örn: `ataturk.woff2`).
