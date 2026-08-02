import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/translations";

type PlatformI18nBundle = {
  meta: Pick<
    Messages["meta"],
    | "platformFreeTitle"
    | "platformFreeDescription"
    | "platformPaidTitle"
    | "platformPaidDescription"
  >;
  catalog: Pick<
    Messages["catalog"],
    | "platformFreeHeading"
    | "platformFreeDesc"
    | "platformPaidHeading"
    | "platformPaidDesc"
  >;
  common: Pick<Messages["common"], "currency">;
};

export const platformI18nBundles: Partial<Record<Locale, PlatformI18nBundle>> = {
  de: {
    meta: {
      platformFreeTitle: "Kostenlose {platform}-Services — Tests & Aufgaben",
      platformFreeDescription:
        "Alle kostenlosen {platform}-Tests auf MyFreeFollower. Registrieren, Pakete abholen — kein Passwort nötig.",
      platformPaidTitle: "{platform}-Follower & Engagement kaufen",
      platformPaidDescription:
        "Bezahlte {platform}-Pakete mit sofortigem Checkout. Schrittweise Lieferung und 24/7-Support.",
    },
    catalog: {
      platformFreeHeading: "Kostenlose {platform}-Services",
      platformFreeDesc:
        "Alle Gratis-Tests für {platform} — Follower, Likes, Views und mehr. Kein Passwort, nur Ihr öffentlicher Link.",
      platformPaidHeading: "{platform}-Wachstum kaufen",
      platformPaidDesc:
        "Sofortige bezahlte Pakete für {platform}. Stufe wählen, Benutzername eingeben und sicher bezahlen.",
    },
    common: { currency: "Währung" },
  },
  fr: {
    meta: {
      platformFreeTitle: "Services {platform} gratuits — Essais & tâches",
      platformFreeDescription:
        "Tous les essais gratuits {platform} sur MyFreeFollower. Inscrivez-vous, réclamez des forfaits — aucun mot de passe requis.",
      platformPaidTitle: "Acheter abonnés & engagement {platform}",
      platformPaidDescription:
        "Forfaits {platform} payants avec paiement instantané. Livraison progressive et support 24h/24.",
    },
    catalog: {
      platformFreeHeading: "Services {platform} gratuits",
      platformFreeDesc:
        "Parcourez chaque essai gratuit pour {platform} — abonnés, likes, vues et plus. Pas de mot de passe, juste votre lien public.",
      platformPaidHeading: "Acheter de la croissance {platform}",
      platformPaidDesc:
        "Forfaits payants instantanés pour {platform}. Choisissez un palier, entrez votre nom d'utilisateur et payez en toute sécurité.",
    },
    common: { currency: "Devise" },
  },
  es: {
    meta: {
      platformFreeTitle: "Servicios gratuitos de {platform} — Pruebas y tareas",
      platformFreeDescription:
        "Todas las pruebas gratuitas de {platform} en MyFreeFollower. Regístrate, reclama paquetes — sin contraseña.",
      platformPaidTitle: "Comprar seguidores e interacción de {platform}",
      platformPaidDescription:
        "Paquetes de pago de {platform} con checkout instantáneo. Entrega gradual y soporte 24/7.",
    },
    catalog: {
      platformFreeHeading: "Servicios gratuitos de {platform}",
      platformFreeDesc:
        "Explora cada prueba gratuita para {platform} — seguidores, likes, vistas y más. Sin contraseña, solo tu enlace público.",
      platformPaidHeading: "Comprar crecimiento en {platform}",
      platformPaidDesc:
        "Paquetes de pago instantáneos para {platform}. Elige un nivel, introduce tu usuario y paga de forma segura.",
    },
    common: { currency: "Moneda" },
  },
  pt: {
    meta: {
      platformFreeTitle: "Serviços gratuitos de {platform} — Testes e tarefas",
      platformFreeDescription:
        "Todos os testes gratuitos de {platform} no MyFreeFollower. Registe-se, reclame pacotes — sem palavra-passe.",
      platformPaidTitle: "Comprar seguidores e engagement em {platform}",
      platformPaidDescription:
        "Pacotes pagos de {platform} com checkout instantâneo. Entrega gradual e suporte 24/7.",
    },
    catalog: {
      platformFreeHeading: "Serviços gratuitos de {platform}",
      platformFreeDesc:
        "Explore cada teste gratuito para {platform} — seguidores, likes, visualizações e mais. Sem palavra-passe, apenas o seu link público.",
      platformPaidHeading: "Comprar crescimento em {platform}",
      platformPaidDesc:
        "Pacotes pagos instantâneos para {platform}. Escolha um nível, introduza o seu nome de utilizador e pague com segurança.",
    },
    common: { currency: "Moeda" },
  },
  "pt-br": {
    meta: {
      platformFreeTitle: "Serviços gratuitos de {platform} — Testes e tarefas",
      platformFreeDescription:
        "Todos os testes gratuitos de {platform} no MyFreeFollower. Cadastre-se, resgate pacotes — sem senha.",
      platformPaidTitle: "Comprar seguidores e engajamento no {platform}",
      platformPaidDescription:
        "Pacotes pagos de {platform} com checkout instantâneo. Entrega gradual e suporte 24/7.",
    },
    catalog: {
      platformFreeHeading: "Serviços gratuitos de {platform}",
      platformFreeDesc:
        "Explore cada teste gratuito para {platform} — seguidores, curtidas, visualizações e mais. Sem senha, apenas seu link público.",
      platformPaidHeading: "Comprar crescimento no {platform}",
      platformPaidDesc:
        "Pacotes pagos instantâneos para {platform}. Escolha um plano, informe seu usuário e pague com segurança.",
    },
    common: { currency: "Moeda" },
  },
  it: {
    meta: {
      platformFreeTitle: "Servizi {platform} gratuiti — Prove e task",
      platformFreeDescription:
        "Tutte le prove gratuite {platform} su MyFreeFollower. Registrati, richiedi pacchetti — nessuna password richiesta.",
      platformPaidTitle: "Acquista follower e engagement {platform}",
      platformPaidDescription:
        "Pacchetti {platform} a pagamento con checkout immediato. Consegna graduale e supporto 24/7.",
    },
    catalog: {
      platformFreeHeading: "Servizi {platform} gratuiti",
      platformFreeDesc:
        "Sfoglia ogni prova gratuita per {platform} — follower, like, visualizzazioni e altro. Nessuna password, solo il tuo link pubblico.",
      platformPaidHeading: "Acquista crescita su {platform}",
      platformPaidDesc:
        "Pacchetti a pagamento immediati per {platform}. Scegli un livello, inserisci il tuo username e paga in sicurezza.",
    },
    common: { currency: "Valuta" },
  },
  nl: {
    meta: {
      platformFreeTitle: "Gratis {platform}-services — Proefjes & taken",
      platformFreeDescription:
        "Alle gratis {platform}-proefjes op MyFreeFollower. Registreer, claim pakketten — geen wachtwoord nodig.",
      platformPaidTitle: "{platform}-volgers & engagement kopen",
      platformPaidDescription:
        "Betaalde {platform}-pakketten met directe checkout. Geleidelijke levering en 24/7 support.",
    },
    catalog: {
      platformFreeHeading: "Gratis {platform}-services",
      platformFreeDesc:
        "Bekijk elk gratis proefje voor {platform} — volgers, likes, views en meer. Geen wachtwoord, alleen je openbare link.",
      platformPaidHeading: "{platform}-groei kopen",
      platformPaidDesc:
        "Directe betaalde pakketten voor {platform}. Kies een tier, voer je gebruikersnaam in en betaal veilig.",
    },
    common: { currency: "Valuta" },
  },
  pl: {
    meta: {
      platformFreeTitle: "Darmowe usługi {platform} — Testy i zadania",
      platformFreeDescription:
        "Wszystkie darmowe testy {platform} w MyFreeFollower. Zarejestruj się, odbierz pakiety — bez hasła.",
      platformPaidTitle: "Kup obserwujących i zaangażowanie {platform}",
      platformPaidDescription:
        "Płatne pakiety {platform} z natychmiastową płatnością. Stopniowa dostawa i wsparcie 24/7.",
    },
    catalog: {
      platformFreeHeading: "Darmowe usługi {platform}",
      platformFreeDesc:
        "Przeglądaj każdy darmowy test dla {platform} — obserwujących, polubień, wyświetleń i więcej. Bez hasła, tylko publiczny link.",
      platformPaidHeading: "Kup wzrost na {platform}",
      platformPaidDesc:
        "Natychmiastowe płatne pakiety dla {platform}. Wybierz poziom, podaj nazwę użytkownika i zapłać bezpiecznie.",
    },
    common: { currency: "Waluta" },
  },
  ro: {
    meta: {
      platformFreeTitle: "Servicii {platform} gratuite — Teste și sarcini",
      platformFreeDescription:
        "Toate testele gratuite {platform} pe MyFreeFollower. Înregistrează-te, revendică pachete — fără parolă.",
      platformPaidTitle: "Cumpără urmăritori și engagement {platform}",
      platformPaidDescription:
        "Pachete plătite {platform} cu checkout instant. Livrare graduală și suport 24/7.",
    },
    catalog: {
      platformFreeHeading: "Servicii {platform} gratuite",
      platformFreeDesc:
        "Răsfoiește fiecare test gratuit pentru {platform} — urmăritori, aprecieri, vizualizări și altele. Fără parolă, doar linkul tău public.",
      platformPaidHeading: "Cumpără creștere pe {platform}",
      platformPaidDesc:
        "Pachete plătite instant pentru {platform}. Alege un nivel, introdu numele de utilizator și plătește în siguranță.",
    },
    common: { currency: "Monedă" },
  },
  ru: {
    meta: {
      platformFreeTitle: "Бесплатные услуги {platform} — Пробники и задания",
      platformFreeDescription:
        "Все бесплатные пробники {platform} на MyFreeFollower. Регистрация, получение пакетов — пароль не нужен.",
      platformPaidTitle: "Купить подписчиков и вовлечённость {platform}",
      platformPaidDescription:
        "Платные пакеты {platform} с мгновенной оплатой. Постепенная доставка и поддержка 24/7.",
    },
    catalog: {
      platformFreeHeading: "Бесплатные услуги {platform}",
      platformFreeDesc:
        "Все бесплатные пробники для {platform} — подписчики, лайки, просмотры и другое. Без пароля, только публичная ссылка.",
      platformPaidHeading: "Купить рост на {platform}",
      platformPaidDesc:
        "Мгновенные платные пакеты для {platform}. Выберите тариф, укажите username и оплатите безопасно.",
    },
    common: { currency: "Валюта" },
  },
  uk: {
    meta: {
      platformFreeTitle: "Безкоштовні послуги {platform} — Пробники та завдання",
      platformFreeDescription:
        "Усі безкоштовні пробники {platform} на MyFreeFollower. Реєстрація, отримання пакетів — пароль не потрібен.",
      platformPaidTitle: "Купити підписників і залучення {platform}",
      platformPaidDescription:
        "Платні пакети {platform} з миттєвою оплатою. Поступова доставка та підтримка 24/7.",
    },
    catalog: {
      platformFreeHeading: "Безкоштовні послуги {platform}",
      platformFreeDesc:
        "Усі безкоштовні пробники для {platform} — підписники, лайки, перегляди та інше. Без пароля, лише публічне посилання.",
      platformPaidHeading: "Купити зростання на {platform}",
      platformPaidDesc:
        "Миттєві платні пакети для {platform}. Оберіть тариф, вкажіть username і оплатіть безпечно.",
    },
    common: { currency: "Валюта" },
  },
  tr: {
    meta: {
      platformFreeTitle: "Ücretsiz {platform} hizmetleri — Denemeler ve görevler",
      platformFreeDescription:
        "MyFreeFollower'daki tüm ücretsiz {platform} denemeleri. Kaydolun, paket alın — şifre gerekmez.",
      platformPaidTitle: "{platform} takipçi ve etkileşim satın al",
      platformPaidDescription:
        "Anında ödemeli {platform} paketleri. Kademeli teslimat ve 7/24 destek.",
    },
    catalog: {
      platformFreeHeading: "Ücretsiz {platform} hizmetleri",
      platformFreeDesc:
        "{platform} için her ücretsiz denemeye göz atın — takipçi, beğeni, izlenme ve daha fazlası. Şifre yok, yalnızca herkese açık bağlantınız.",
      platformPaidHeading: "{platform} büyümesi satın al",
      platformPaidDesc:
        "{platform} için anında ücretli paketler. Bir kademe seçin, kullanıcı adınızı girin ve güvenle ödeyin.",
    },
    common: { currency: "Para birimi" },
  },
  ar: {
    meta: {
      platformFreeTitle: "خدمات {platform} المجانية — تجارب ومهام",
      platformFreeDescription:
        "جميع تجارب {platform} المجانية على MyFreeFollower. سجّل، احصل على الحزم — لا حاجة لكلمة مرور.",
      platformPaidTitle: "شراء متابعين وتفاعل {platform}",
      platformPaidDescription:
        "حزم {platform} المدفوعة مع دفع فوري. تسليم تدريجي ودعم على مدار الساعة.",
    },
    catalog: {
      platformFreeHeading: "خدمات {platform} المجانية",
      platformFreeDesc:
        "تصفح كل تجربة مجانية لـ {platform} — متابعين، إعجابات، مشاهدات والمزيد. بدون كلمة مرور، فقط رابطك العام.",
      platformPaidHeading: "شراء نمو {platform}",
      platformPaidDesc:
        "حزم مدفوعة فورية لـ {platform}. اختر المستوى، أدخل اسم المستخدم وادفع بأمان.",
    },
    common: { currency: "العملة" },
  },
  fa: {
    meta: {
      platformFreeTitle: "خدمات رایگان {platform} — آزمایش‌ها و وظایف",
      platformFreeDescription:
        "همه آزمایش‌های رایگان {platform} در MyFreeFollower. ثبت‌نام کنید، بسته بگیرید — بدون رمز عبور.",
      platformPaidTitle: "خرید فالوور و تعامل {platform}",
      platformPaidDescription:
        "بسته‌های پولی {platform} با پرداخت فوری. تحویل تدریجی و پشتیبانی ۲۴ ساعته.",
    },
    catalog: {
      platformFreeHeading: "خدمات رایگان {platform}",
      platformFreeDesc:
        "هر آزمایش رایگان برای {platform} را مرور کنید — فالوور، لایک، بازدید و بیشتر. بدون رمز، فقط لینک عمومی شما.",
      platformPaidHeading: "خرید رشد {platform}",
      platformPaidDesc:
        "بسته‌های پولی فوری برای {platform}. سطح را انتخاب کنید، نام کاربری را وارد کنید و امن پرداخت کنید.",
    },
    common: { currency: "ارز" },
  },
  zh: {
    meta: {
      platformFreeTitle: "免费 {platform} 服务 — 试用与任务",
      platformFreeDescription:
        "MyFreeFollower 上所有免费 {platform} 试用。注册、领取套餐 — 无需密码。",
      platformPaidTitle: "购买 {platform} 粉丝与互动",
      platformPaidDescription:
        "即时结账的 {platform} 付费套餐。渐进式交付，全天候客服。",
    },
    catalog: {
      platformFreeHeading: "免费 {platform} 服务",
      platformFreeDesc:
        "浏览 {platform} 的每项免费试用 — 粉丝、点赞、播放等。无需密码，只需公开链接。",
      platformPaidHeading: "购买 {platform} 增长",
      platformPaidDesc:
        "{platform} 即时付费套餐。选择档位，输入用户名，安全结账。",
    },
    common: { currency: "货币" },
  },
  id: {
    meta: {
      platformFreeTitle: "Layanan {platform} gratis — Uji coba & tugas",
      platformFreeDescription:
        "Semua uji coba {platform} gratis di MyFreeFollower. Daftar, klaim paket — tanpa kata sandi.",
      platformPaidTitle: "Beli pengikut & engagement {platform}",
      platformPaidDescription:
        "Paket berbayar {platform} dengan checkout instan. Pengiriman bertahap dan dukungan 24/7.",
    },
    catalog: {
      platformFreeHeading: "Layanan {platform} gratis",
      platformFreeDesc:
        "Jelajahi setiap uji coba gratis untuk {platform} — pengikut, suka, tayangan, dan lainnya. Tanpa kata sandi, cukup tautan publik Anda.",
      platformPaidHeading: "Beli pertumbuhan {platform}",
      platformPaidDesc:
        "Paket berbayar instan untuk {platform}. Pilih tier, masukkan username, dan checkout dengan aman.",
    },
    common: { currency: "Mata uang" },
  },
  bn: {
    meta: {
      platformFreeTitle: "বিনামূল্যে {platform} সেবা — ট্রায়াল ও টাস্ক",
      platformFreeDescription:
        "MyFreeFollower-এ সব বিনামূল্যে {platform} ট্রায়াল। সাইন আপ করুন, প্যাকেজ নিন — পাসওয়ার্ড লাগে না।",
      platformPaidTitle: "{platform} ফলোয়ার ও সম্পৃক্ততা কিনুন",
      platformPaidDescription:
        "তাৎক্ষণিক চেকআউট সহ {platform} পেইড প্যাকেজ। ধীরে ধীরে ডেলিভারি ও ২৪/৭ সাপোর্ট।",
    },
    catalog: {
      platformFreeHeading: "বিনামূল্যে {platform} সেবা",
      platformFreeDesc:
        "{platform}-এর প্রতিটি ফ্রি ট্রায়াল দেখুন — ফলোয়ার, লাইক, ভিউ ও আরও। পাসওয়ার্ড নয়, শুধু পাবলিক লিংক।",
      platformPaidHeading: "{platform} বৃদ্ধি কিনুন",
      platformPaidDesc:
        "{platform}-এর তাৎক্ষণিক পেইড প্যাকেজ। টিয়ার বেছে নিন, ইউজারনেম দিন, নিরাপদে পেমেন্ট করুন।",
    },
    common: { currency: "মুদ্রা" },
  },
  hi: {
    meta: {
      platformFreeTitle: "मुफ़्त {platform} सेवाएँ — ट्रायल और टास्क",
      platformFreeDescription:
        "MyFreeFollower पर सभी मुफ़्त {platform} ट्रायल। साइन अप करें, पैकेज लें — पासवर्ड की ज़रूरत नहीं।",
      platformPaidTitle: "{platform} फ़ॉलोअर और एंगेजमेंट खरीदें",
      platformPaidDescription:
        "तुरंत चेकआउट वाले {platform} पेड पैकेज। धीरे-धीरे डिलीवरी और 24/7 सपोर्ट।",
    },
    catalog: {
      platformFreeHeading: "मुफ़्त {platform} सेवाएँ",
      platformFreeDesc:
        "{platform} के हर मुफ़्त ट्रायल को देखें — फ़ॉलोअर, लाइक, व्यू और अधिक। पासवर्ड नहीं, बस आपका पब्लिक लिंक।",
      platformPaidHeading: "{platform} ग्रोथ खरीदें",
      platformPaidDesc:
        "{platform} के तुरंत पेड पैकेज। टियर चुनें, यूज़रनेम दर्ज करें और सुरक्षित चेकआउट करें।",
    },
    common: { currency: "मुद्रा" },
  },
};
