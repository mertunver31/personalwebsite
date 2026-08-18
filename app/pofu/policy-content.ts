/**
 * Pofu (Android) gizlilik politikası metni — TR ve EN.
 *
 * Google Play her uygulama için herkese açık bir gizlilik politikası URL'i
 * zorunlu tutuyor; Play Console'a verilen adres burasıdır:
 *   https://mertefeunver.com/pofu/gizlilik
 *
 * Metin uygulamanın gerçek davranışını anlatır — değiştirmeden önce
 * `Q:\pomodoroapp` tarafındaki davranışın hâlâ aynı olduğunu doğrula:
 *  - veriler yalnız cihazdaki SQLite'ta (`src/db`)
 *  - tek dış ağ isteği ortam videosu indirmesi (`src/features/scene/videoCache.ts`)
 *  - analitik / çökme raporu / reklam SDK'sı yok, hesap yok
 */

export const POFU_CONTACT_EMAIL = "mertefeunver09@gmail.com";

/** Politikanın yürürlük tarihi — metin değişince güncelle. */
export const POFU_POLICY_DATE = { tr: "19 Ağustos 2026", en: "19 August 2026" };

export interface PolicySection {
  heading: string;
  /** Düz paragraflar. */
  paragraphs?: string[];
  /** Madde listesi. */
  bullets?: string[];
}

export interface PolicyDoc {
  locale: "tr" | "en";
  title: string;
  appName: string;
  intro: string[];
  updated: string;
  sections: PolicySection[];
  altLabel: string;
  altHref: string;
  backLabel: string;
}

export const POLICY_TR: PolicyDoc = {
  locale: "tr",
  title: "Pofu — Gizlilik Politikası",
  appName: "Pofu",
  updated: `Son güncelleme: ${POFU_POLICY_DATE.tr}`,
  intro: [
    "Pofu, odaklanmak için kullanılan bir pomodoro zamanlayıcısıdır. Bu politika, uygulamanın hangi verileri işlediğini açıklar.",
    "Kısa cevap: Pofu sizden hiçbir kişisel veri toplamaz, hesap açmanızı istemez ve verilerinizi hiçbir sunucuya göndermez. Uygulamada ürettiğiniz her şey yalnızca kendi cihazınızda kalır.",
  ],
  sections: [
    {
      heading: "1. Sorumlu",
      paragraphs: [
        `Uygulamayı geliştiren ve yayınlayan: Mert Efe Ünver (bireysel geliştirici). İletişim: ${POFU_CONTACT_EMAIL}`,
      ],
    },
    {
      heading: "2. Toplanan kişisel veriler",
      paragraphs: [
        "Hiçbiri. Pofu'nun kullanıcı hesabı, giriş ekranı veya sunucu tarafı yoktur. Ad, e-posta, telefon numarası, konum, kişi listesi, cihaz kimliği veya reklam kimliği toplanmaz.",
        "Uygulamada analitik, çökme raporlama veya reklam SDK'sı bulunmaz. Kullanım davranışınız izlenmez ve profillenmez.",
      ],
    },
    {
      heading: "3. Cihazınızda saklanan veriler",
      paragraphs: [
        "Uygulamanın çalışması için gereken bilgiler yalnızca cihazınızdaki yerel veritabanında (SQLite) tutulur ve cihazdan dışarı çıkmaz:",
      ],
      bullets: [
        "Odak oturumu kayıtlarınız (başlangıç/bitiş zamanı, süre, tamamlandı mı)",
        "Görev listeniz ve görev başlıkları",
        "Ayarlarınız (süreler, tema, sahne seçimi, ses tercihi)",
        "Arka plan olarak seçtiyseniz kendi görselinizin cihazdaki dosya yolu",
        "İndirdiğiniz ortam videolarının önbelleği",
      ],
    },
    {
      heading: "4. İstenen izinler ve nedenleri",
      bullets: [
        "Bildirimler: Odak veya mola süresi dolduğunda sizi uyarmak için. Bildirimler tamamen cihaz üzerinde oluşturulur; uzaktan gönderilen push bildirimi yoktur ve bunun için hiçbir kimlik veya token oluşturulmaz.",
        "Fotoğraflara erişim: Yalnızca kendi arka plan görselinizi seçmek istediğinizde ve yalnızca o an sorulur. Seçtiğiniz görsel cihazınızda kalır, hiçbir yere yüklenmez. Galerinizin geri kalanı okunmaz.",
        "İnternet erişimi: Yalnızca seçtiğiniz ortam videosunu indirmek için kullanılır. Video bir kez indikten sonra uygulama tamamen çevrimdışı çalışır.",
      ],
    },
    {
      heading: "5. Üçüncü taraf hizmetler",
      paragraphs: [
        "Pofu tek bir dış hizmete bağlanır: ortam videolarının barındırıldığı içerik dağıtım ağı (mixkit.co / assets.mixkit.co). Bir sahne indirdiğinizde, her normal internet isteğinde olduğu gibi IP adresiniz ve cihazınızın tarayıcı kimliği bu sunucuya iletilir. Bu istekle birlikte uygulamadan hiçbir kişisel bilgi gönderilmez ve bu bağlantı yalnız indirme sırasında kurulur.",
        "Uygulamayı Google Play üzerinden edindiyseniz, Google'ın kendi veri işleme uygulamaları da geçerlidir; bu, geliştiricinin kontrolü dışındadır.",
      ],
    },
    {
      heading: "6. Verilerin paylaşılması ve satışı",
      paragraphs: [
        "Uygulama hiçbir veriyi üçüncü taraflarla paylaşmaz, kiralamaz veya satmaz. Paylaşılabilecek bir veri zaten toplanmamaktadır.",
      ],
    },
    {
      heading: "7. Verilerinizi silme",
      paragraphs: [
        "Tüm veriler cihazınızda olduğu için silme işlemi tamamen sizin kontrolünüzdedir. Android ayarlarından Uygulamalar → Pofu → Depolama → Verileri temizle adımlarıyla kayıtlarınızı, görevlerinizi ve ayarlarınızı kalıcı olarak silebilirsiniz. Uygulamayı kaldırmak da aynı sonucu verir.",
        "Geliştiricinin elinde silinebilecek bir kopyanız bulunmaz.",
      ],
    },
    {
      heading: "8. Çocukların gizliliği",
      paragraphs: [
        "Pofu çocuklara yönelik tasarlanmamıştır ve hiç kimseden, hiçbir yaş grubundan kişisel veri toplamaz.",
      ],
    },
    {
      heading: "9. Haklarınız",
      paragraphs: [
        "KVKK ve GDPR kapsamındaki erişim, düzeltme ve silme haklarınız saklıdır. Uygulama kişisel veri işlemediği için bu haklar pratikte cihazınızdaki verilere doğrudan erişiminizle karşılanır. Yine de her türlü soru için aşağıdaki adresten yazabilirsiniz.",
      ],
    },
    {
      heading: "10. Bu politikadaki değişiklikler",
      paragraphs: [
        "Uygulamaya veri işleyen yeni bir özellik eklenirse bu sayfa güncellenir ve yukarıdaki tarih değiştirilir. Önemli değişiklikler uygulama içinde de duyurulur.",
      ],
    },
    {
      heading: "11. İletişim",
      paragraphs: [
        `Gizlilikle ilgili her soru için: ${POFU_CONTACT_EMAIL}`,
      ],
    },
  ],
  altLabel: "English version",
  altHref: "/pofu/privacy",
  backLabel: "mertefeunver.com",
};

export const POLICY_EN: PolicyDoc = {
  locale: "en",
  title: "Pofu — Privacy Policy",
  appName: "Pofu",
  updated: `Last updated: ${POFU_POLICY_DATE.en}`,
  intro: [
    "Pofu is a pomodoro focus timer. This policy explains what data the app processes.",
    "The short answer: Pofu collects no personal data, requires no account, and sends nothing to any server. Everything you create in the app stays on your own device.",
  ],
  sections: [
    {
      heading: "1. Who is responsible",
      paragraphs: [
        `The app is developed and published by Mert Efe Ünver (individual developer). Contact: ${POFU_CONTACT_EMAIL}`,
      ],
    },
    {
      heading: "2. Personal data collected",
      paragraphs: [
        "None. Pofu has no user accounts, no sign-in and no backend. It does not collect your name, email, phone number, location, contacts, device identifiers or advertising ID.",
        "The app contains no analytics, crash reporting or advertising SDKs. Your usage is not tracked or profiled.",
      ],
    },
    {
      heading: "3. Data stored on your device",
      paragraphs: [
        "Information needed for the app to work is kept only in a local database (SQLite) on your device and never leaves it:",
      ],
      bullets: [
        "Your focus session history (start/end time, duration, whether it completed)",
        "Your task list and task titles",
        "Your settings (durations, theme, scene selection, sound preference)",
        "The on-device file path of your own image, if you chose one as a background",
        "The cache of ambient videos you have downloaded",
      ],
    },
    {
      heading: "4. Permissions and why they are requested",
      bullets: [
        "Notifications: to alert you when a focus or break period ends. Notifications are generated entirely on the device; there is no remote push and no token or identifier is created for it.",
        "Photo access: only when you choose to set your own background image, and only asked at that moment. The image you pick stays on your device and is never uploaded. The rest of your gallery is not read.",
        "Internet access: used only to download the ambient scene video you select. Once downloaded, the app works fully offline.",
      ],
    },
    {
      heading: "5. Third-party services",
      paragraphs: [
        "Pofu connects to a single external service: the content delivery network hosting the ambient videos (mixkit.co / assets.mixkit.co). When you download a scene, your IP address and device user agent reach that server, as with any ordinary internet request. No personal information from the app is sent with it, and the connection is made only during the download.",
        "If you obtained the app through Google Play, Google's own data practices also apply and are outside the developer's control.",
      ],
    },
    {
      heading: "6. Sharing and selling of data",
      paragraphs: [
        "The app does not share, rent or sell any data to third parties. No such data is collected in the first place.",
      ],
    },
    {
      heading: "7. Deleting your data",
      paragraphs: [
        "Because all data lives on your device, deletion is entirely under your control. In Android settings, go to Apps → Pofu → Storage → Clear data to permanently erase your history, tasks and settings. Uninstalling the app has the same effect.",
        "The developer holds no copy that could be deleted on your behalf.",
      ],
    },
    {
      heading: "8. Children's privacy",
      paragraphs: [
        "Pofu is not designed for children and collects no personal data from anyone, of any age.",
      ],
    },
    {
      heading: "9. Your rights",
      paragraphs: [
        "Your rights of access, rectification and erasure under GDPR and Turkish KVKK are reserved. Since the app processes no personal data, these rights are satisfied in practice by your direct access to the data on your device. You are welcome to write with any question.",
      ],
    },
    {
      heading: "10. Changes to this policy",
      paragraphs: [
        "If a feature that processes data is ever added, this page is updated and the date above is changed. Significant changes are also announced inside the app.",
      ],
    },
    {
      heading: "11. Contact",
      paragraphs: [`For any privacy question: ${POFU_CONTACT_EMAIL}`],
    },
  ],
  altLabel: "Türkçe sürüm",
  altHref: "/pofu/gizlilik",
  backLabel: "mertefeunver.com",
};
