import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/translations";

export type HomeExtra = Pick<
  Messages["home"],
  | "popularFreeTitle"
  | "popularFreeSubtitle"
  | "viewAllFree"
  | "featuredTitle"
  | "featuredSubtitle"
  | "featuredFreeLabel"
  | "featuredBuyLabel"
  | "featuredInstagramDesc"
  | "featuredTiktokDesc"
  | "featuredYoutubeDesc"
  | "featuredXDesc"
  | "featuredFacebookDesc"
  | "featuredTelegramDesc"
  | "guaranteeTitle"
  | "guaranteeSubtitle"
  | "guarantee1Title"
  | "guarantee1Desc"
  | "guarantee2Title"
  | "guarantee2Desc"
  | "guarantee3Title"
  | "guarantee3Desc"
  | "guarantee4Title"
  | "guarantee4Desc"
  | "testimonialsTitle"
  | "testimonialsSubtitle"
  | "testimonial1Quote"
  | "testimonial1Name"
  | "testimonial1Role"
  | "testimonial2Quote"
  | "testimonial2Name"
  | "testimonial2Role"
  | "testimonial3Quote"
  | "testimonial3Name"
  | "testimonial3Role"
  | "testimonial4Quote"
  | "testimonial4Name"
  | "testimonial4Role"
  | "blogPreviewTitle"
  | "blogPreviewSubtitle"
  | "viewAllBlog"
  | "readArticle"
>;

const tr: HomeExtra = {
  popularFreeTitle: "Popüler ücretsiz servisler",
  popularFreeSubtitle:
    "En popüler platformlarda deneme takipçi, beğeni ve izlenme alın — ücretsiz hesap gerekir.",
  viewAllFree: "Tüm ücretsiz servisler",
  featuredTitle: "Öne çıkan platformlar",
  featuredSubtitle:
    "Instagram, TikTok, YouTube ve daha fazlasına doğrudan gidin — ücretsiz deneme veya anında satın alma.",
  featuredFreeLabel: "Ücretsiz dene",
  featuredBuyLabel: "Satın al",
  featuredInstagramDesc:
    "Reels, gönderi ve profil ziyaretlerinizi ücretsiz denemeler veya anında takipçi/beğeni paketleriyle büyütün.",
  featuredTiktokDesc:
    "En iyi videolarınızda FYP ivmesi için TikTok takipçi, beğeni ve izlenme artırın.",
  featuredYoutubeDesc:
    "Yeni kanalların ilk günden aktif görünmesi için abone, izlenme ve izlenme saati alın.",
  featuredXDesc:
    "Lansmanlar, thread'ler ve kişisel marka için X takipçi ve etkileşim artırın.",
  featuredFacebookDesc:
    "İşletmeler ve topluluk sayfaları için sayfa beğenisi, erişim ve takipçi.",
  featuredTelegramDesc:
    "Kripto, haber ve topluluk grupları için kanal üyesi ve gönderi görüntülenmesi.",
  guaranteeTitle: "Büyümeniz güvence altında",
  guaranteeSubtitle: "Her sipariş içerik üreticileri ve markalar için tasarlanmış politikalarla korunur.",
  guarantee1Title: "Düşüş koruması",
  guarantee1Desc: "Teslimattan sonra sayılar düşerse, servis penceresinde yeniden tamamlanır.",
  guarantee2Title: "WhatsApp ve Telegram destek",
  guarantee2Desc: "Gerçek insanlar — bilet labirenti yok. Kendi dilinizde yanıt veriyoruz.",
  guarantee3Title: "Asla şifre istemiyoruz",
  guarantee3Desc: "Yalnızca herkese açık kullanıcı adı veya bağlantı gerekir.",
  guarantee4Title: "Hızlı teslimat başlangıcı",
  guarantee4Desc: "Çoğu sipariş saniyeler içinde başlar ve doğal görünüm için kademeli tamamlanır.",
  testimonialsTitle: "İçerik üreticileri MyFreeFollower'a güveniyor",
  testimonialsSubtitle:
    "Ücretsiz deneme ve ücretli paketlerle büyüyen üyelerden gerçek geri bildirimler.",
  testimonial1Quote:
    "Önce ücretsiz Instagram takipçi denedim, sonra ücretli pakete geçtim. Teslimat sorunsuzdu, profilimde sorun olmadı.",
  testimonial1Name: "Sarah M.",
  testimonial1Role: "Instagram içerik üreticisi · ABD",
  testimonial2Quote:
    "Ürün videomda TikTok izlenmeleri saatler içinde arttı. Gece yarısı WhatsApp'tan destek aldım.",
  testimonial2Name: "Alex K.",
  testimonial2Role: "TikTok mağaza sahibi · İngiltere",
  testimonial3Quote:
    "Kaliteyi test etmek için ücretsiz YouTube abone aldım. Her yayında MyFreeFollower kullanıyorum.",
  testimonial3Name: "Jordan T.",
  testimonial3Role: "YouTube müzisyeni · Kanada",
  testimonial4Quote:
    "Telegram üyesi siparişi tam istediğim gibi geldi. Kripto ile ödedim, destek birkaç dakikada döndü.",
  testimonial4Name: "Elena R.",
  testimonial4Role: "Topluluk yöneticisi · Almanya",
  blogPreviewTitle: "Büyüme ipuçları ve rehberler",
  blogPreviewSubtitle:
    "Ücretsiz takipçi, platform stratejileri ve güvenli  hakkında en yeni yazılar.",
  viewAllBlog: "Tüm yazılar",
  readArticle: "Yazıyı oku",
};

export const homeExtraBundles: Partial<Record<Locale, Partial<HomeExtra>>> = {
  tr,
  de: {
    popularFreeTitle: "Beliebte kostenlose Services",
    popularFreeSubtitle:
      "Test-Follower, Likes und Views auf Top-Plattformen — kostenloses Konto erforderlich.",
    viewAllFree: "Alle kostenlosen Services",
    featuredTitle: "Top-Plattformen",
    featuredSubtitle:
      "Direkt zu Instagram, TikTok, YouTube und mehr — kostenlose Tests oder Sofort-Kauf.",
    featuredFreeLabel: "Gratis testen",
    featuredBuyLabel: "Jetzt kaufen",
    guaranteeTitle: "Ihr Wachstum, geschützt",
    testimonialsTitle: "Creators vertrauen MyFreeFollower",
    blogPreviewTitle: "Wachstumstipps & Guides",
    viewAllBlog: "Alle Artikel",
    readArticle: "Artikel lesen",
  },
  fr: {
    popularFreeTitle: "Services gratuits populaires",
    viewAllFree: "Tous les services gratuits",
    featuredTitle: "Plateformes phares",
    featuredFreeLabel: "Essai gratuit",
    featuredBuyLabel: "Acheter",
    guaranteeTitle: "Votre croissance, protégée",
    testimonialsTitle: "Les créateurs font confiance à MyFreeFollower",
    blogPreviewTitle: "Conseils et guides",
    viewAllBlog: "Tous les articles",
    readArticle: "Lire l'article",
  },
  es: {
    popularFreeTitle: "Servicios gratis populares",
    viewAllFree: "Todos los servicios gratis",
    featuredTitle: "Plataformas destacadas",
    featuredFreeLabel: "Prueba gratis",
    featuredBuyLabel: "Comprar",
    guaranteeTitle: "Tu crecimiento, protegido",
    testimonialsTitle: "Los creadores confían en MyFreeFollower",
    blogPreviewTitle: "Consejos y guías",
    viewAllBlog: "Todos los artículos",
    readArticle: "Leer artículo",
  },
  ar: {
    popularFreeTitle: "خدمات مجانية شائعة",
    viewAllFree: "جميع الخدمات المجانية",
    featuredTitle: "أبرز المنصات",
    featuredFreeLabel: "تجربة مجانية",
    featuredBuyLabel: "اشترِ الآن",
    guaranteeTitle: "نموك محمي",
    testimonialsTitle: "المبدعون يثقون بـ MyFreeFollower",
    blogPreviewTitle: "نصائح وأدلة",
    viewAllBlog: "جميع المقالات",
    readArticle: "اقرأ المقال",
  },
  ru: {
    popularFreeTitle: "Популярные бесплатные услуги",
    viewAllFree: "Все бесплатные услуги",
    featuredTitle: "Топ платформы",
    featuredFreeLabel: "Бесплатный тест",
    featuredBuyLabel: "Купить",
    guaranteeTitle: "Ваш рост под защитой",
    testimonialsTitle: "Креаторы доверяют MyFreeFollower",
    blogPreviewTitle: "Советы и гиды",
    viewAllBlog: "Все статьи",
    readArticle: "Читать",
  },
  pt: {
    popularFreeTitle: "Serviços grátis populares",
    viewAllFree: "Todos os serviços grátis",
    featuredTitle: "Plataformas em destaque",
    featuredFreeLabel: "Teste grátis",
    featuredBuyLabel: "Comprar",
    guaranteeTitle: "O seu crescimento, protegido",
    testimonialsTitle: "Criadores confiam na MyFreeFollower",
    blogPreviewTitle: "Dicas e guias",
    viewAllBlog: "Todos os artigos",
    readArticle: "Ler artigo",
  },
  "pt-br": {
    popularFreeTitle: "Serviços grátis populares",
    viewAllFree: "Todos os serviços grátis",
    featuredTitle: "Plataformas em destaque",
    featuredFreeLabel: "Teste grátis",
    featuredBuyLabel: "Comprar",
    guaranteeTitle: "Seu crescimento, protegido",
    testimonialsTitle: "Criadores confiam na MyFreeFollower",
    blogPreviewTitle: "Dicas e guias",
    viewAllBlog: "Todos os artigos",
    readArticle: "Ler artigo",
  },
  it: {
    popularFreeTitle: "Servizi gratuiti popolari",
    viewAllFree: "Tutti i servizi gratuiti",
    featuredTitle: "Piattaforme top",
    featuredFreeLabel: "Prova gratis",
    featuredBuyLabel: "Acquista",
    guaranteeTitle: "La tua crescita, protetta",
    testimonialsTitle: "I creator si fidano di MyFreeFollower",
    blogPreviewTitle: "Consigli e guide",
    viewAllBlog: "Tutti gli articoli",
    readArticle: "Leggi articolo",
  },
  nl: {
    popularFreeTitle: "Populaire gratis diensten",
    viewAllFree: "Alle gratis diensten",
    featuredTitle: "Topplatforms",
    featuredFreeLabel: "Gratis proberen",
    featuredBuyLabel: "Kopen",
    guaranteeTitle: "Je groei, beschermd",
    testimonialsTitle: "Creators vertrouwen MyFreeFollower",
    blogPreviewTitle: "Tips & gidsen",
    viewAllBlog: "Alle artikelen",
    readArticle: "Lees artikel",
  },
  pl: {
    popularFreeTitle: "Popularne darmowe usługi",
    viewAllFree: "Wszystkie darmowe usługi",
    featuredTitle: "Top platformy",
    featuredFreeLabel: "Darmowy test",
    featuredBuyLabel: "Kup",
    guaranteeTitle: "Twój wzrost, chroniony",
    testimonialsTitle: "Twórcy ufają MyFreeFollower",
    blogPreviewTitle: "Porady i przewodniki",
    viewAllBlog: "Wszystkie artykuły",
    readArticle: "Czytaj",
  },
  ro: {
    popularFreeTitle: "Servicii gratuite populare",
    viewAllFree: "Toate serviciile gratuite",
    featuredTitle: "Platforme de top",
    featuredFreeLabel: "Test gratuit",
    featuredBuyLabel: "Cumpără",
    guaranteeTitle: "Creșterea ta, protejată",
    testimonialsTitle: "Creatorii au încredere în MyFreeFollower",
    blogPreviewTitle: "Sfaturi și ghiduri",
    viewAllBlog: "Toate articolele",
    readArticle: "Citește",
  },
  uk: {
    popularFreeTitle: "Популярні безкоштовні послуги",
    viewAllFree: "Усі безкоштовні послуги",
    featuredTitle: "Топ платформи",
    featuredFreeLabel: "Безкоштовний тест",
    featuredBuyLabel: "Купити",
    guaranteeTitle: "Ваше зростання під захистом",
    testimonialsTitle: "Креатори довіряють MyFreeFollower",
    blogPreviewTitle: "Поради та гіди",
    viewAllBlog: "Усі статті",
    readArticle: "Читати",
  },
  fa: {
    popularFreeTitle: "خدمات رایگان محبوب",
    viewAllFree: "همه خدمات رایگان",
    featuredTitle: "پلتفرم‌های برتر",
    featuredFreeLabel: "تست رایگان",
    featuredBuyLabel: "خرید",
    guaranteeTitle: "رشد شما، محافظت‌شده",
    testimonialsTitle: "خالقان به MyFreeFollower اعتماد دارند",
    blogPreviewTitle: "نکات و راهنماها",
    viewAllBlog: "همه مقالات",
    readArticle: "مطالعه",
  },
  zh: {
    popularFreeTitle: "热门免费服务",
    viewAllFree: "所有免费服务",
    featuredTitle: "热门平台",
    featuredFreeLabel: "免费试用",
    featuredBuyLabel: "立即购买",
    guaranteeTitle: "您的增长，有保障",
    testimonialsTitle: "创作者信赖 MyFreeFollower",
    blogPreviewTitle: "增长技巧与指南",
    viewAllBlog: "所有文章",
    readArticle: "阅读",
  },
  id: {
    popularFreeTitle: "Layanan gratis populer",
    viewAllFree: "Semua layanan gratis",
    featuredTitle: "Platform teratas",
    featuredFreeLabel: "Coba gratis",
    featuredBuyLabel: "Beli",
    guaranteeTitle: "Pertumbuhan Anda, terlindungi",
    testimonialsTitle: "Kreator percaya MyFreeFollower",
    blogPreviewTitle: "Tips & panduan",
    viewAllBlog: "Semua artikel",
    readArticle: "Baca artikel",
  },
  bn: {
    popularFreeTitle: "জনপ্রিয় বিনামূল্যে সেবা",
    viewAllFree: "সব বিনামূল্যে সেবা",
    featuredTitle: "শীর্ষ প্ল্যাটফর্ম",
    featuredFreeLabel: "বিনামূল্যে ট্রায়াল",
    featuredBuyLabel: "কিনুন",
    guaranteeTitle: "আপনার বৃদ্ধি, সুরক্ষিত",
    testimonialsTitle: "ক্রিয়েটররা MyFreeFollower-এ বিশ্বাস করে",
    blogPreviewTitle: "টিপস ও গাইড",
    viewAllBlog: "সব নিবন্ধ",
    readArticle: "পড়ুন",
  },
  hi: {
    popularFreeTitle: "लोकप्रिय मुफ़्त सेवाएं",
    viewAllFree: "सभी मुफ़्त सेवाएं",
    featuredTitle: "शीर्ष प्लेटफ़ॉर्म",
    featuredFreeLabel: "मुफ़्त ट्रायल",
    featuredBuyLabel: "खरीदें",
    guaranteeTitle: "आपकी वृद्धि, सुरक्षित",
    testimonialsTitle: "क्रिएटर्स MyFreeFollower पर भरोसा करते हैं",
    blogPreviewTitle: "ग्रोथ टिप्स और गाइड",
    viewAllBlog: "सभी लेख",
    readArticle: "पढ़ें",
  },
};
