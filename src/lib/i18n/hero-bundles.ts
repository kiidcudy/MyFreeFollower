import type { Locale } from "@/lib/i18n/config";

type HeroKeys = {
  heroTitle?: string;
  heroSubtitle?: string;
};

/** Overrides marketing fluff in home-bundles hero copy per locale. */
export const heroBundles: Partial<Record<Locale, HeroKeys>> = {
  tr: {
    heroTitle: "Profilinizde gerçekten görünen ücretsiz takipçiler",
    heroSubtitle:
      "Platform seçin, linkinizi yapıştırın, devam edin. Üyeler için ücretsiz denemeler — daha hızlı büyümek istediğinizde ücretli paketler. Asla şifre istemiyoruz.",
  },
  de: {
    heroSubtitle:
      "Plattform wählen, Link einfügen, loslegen. Kostenlose Tests für Mitglieder — bezahlte Pakete wenn Sie mehr Tempo wollen. Wir fragen nie nach Ihrem Passwort.",
  },
  fr: {
    heroSubtitle:
      "Choisissez une plateforme, collez votre lien, c'est parti. Essais gratuits pour les membres — packs payants quand vous voulez plus de vitesse. Jamais de mot de passe.",
  },
  es: {
    heroSubtitle:
      "Elige plataforma, pega tu enlace y listo. Pruebas gratis para miembros — packs de pago cuando quieras más velocidad. Nunca pedimos contraseña.",
  },
  hi: {
    heroSubtitle:
      "प्लेटफ़ॉर्म चुनें, लिंक पेस्ट करें, शुरू करें। मेंबर्स के लिए मुफ़्त ट्रायल — ज़्यादा स्पीड चाहिए तो paid पैकेज। हम कभी पासवर्ड नहीं मांगते।",
  },
  ar: {
    heroSubtitle:
      "اختر المنصة، الصق الرابط، وابدأ. تجارب مجانية للأعضاء — باقات مدفوعة عندما تريد سرعة أكبر. لا نطلب كلمة المرور أبداً.",
  },
  ru: {
    heroSubtitle:
      "Выберите платформу, вставьте ссылку — и вперёд. Бесплатные тесты для участников — платные пакеты, когда нужна скорость. Пароль не нужен.",
  },
  pt: {
    heroSubtitle:
      "Escolha a plataforma, cole o link e avance. Testes grátis para membros — packs pagos quando quiser mais velocidade. Nunca pedimos palavra-passe.",
  },
  "pt-br": {
    heroSubtitle:
      "Escolha a plataforma, cole o link e siga. Testes grátis para membros — pacotes pagos quando quiser mais velocidade. Nunca pedimos senha.",
  },
  it: {
    heroSubtitle:
      "Scegli la piattaforma, incolla il link e vai. Prove gratuite per i membri — pacchetti a pagamento quando vuoi più velocità. Mai la password.",
  },
  nl: {
    heroSubtitle:
      "Kies platform, plak je link, ga verder. Gratis trials voor leden — betaalde pakketten als je meer snelheid wilt. We vragen nooit om je wachtwoord.",
  },
  pl: {
    heroSubtitle:
      "Wybierz platformę, wklej link i działaj. Darmowe testy dla członków — płatne pakiety, gdy chcesz więcej tempa. Nigdy nie prosimy o hasło.",
  },
  ro: {
    heroSubtitle:
      "Alege platforma, lipește linkul și mergi mai departe. Trial-uri gratuite pentru membri — pachete plătite când vrei mai multă viteză. Nu cerem niciodată parola.",
  },
  uk: {
    heroSubtitle:
      "Оберіть платформу, вставте посилання — і вперед. Безкоштовні тести для учасників — платні пакети, коли потрібна швидкість. Пароль не потрібен.",
  },
  fa: {
    heroSubtitle:
      "پلتفرم را انتخاب کنید، لینک را بچسبانید و شروع کنید. تست رایگان برای اعضا — بسته‌های پولی وقتی سرعت بیشتر می‌خواهید. هرگز رمز نمی‌خواهیم.",
  },
  zh: {
    heroSubtitle:
      "选择平台，粘贴链接即可开始。会员免费试用——需要更快增长时再选付费套餐。我们从不要密码。",
  },
  id: {
    heroSubtitle:
      "Pilih platform, tempel link, lanjut. Trial gratis untuk member — paket berbayar saat butuh kecepatan lebih. Kami tidak pernah minta password.",
  },
  bn: {
    heroSubtitle:
      "প্ল্যাটফর্ম বেছে নিন, লিংক দিন, শুরু করুন। সদস্যদের জন্য ফ্রি ট্রায়াল — বেশি গতি চাইলে paid প্যাকেজ। আমরা কখনো পাসওয়ার্ড চাই না।",
  },
};
