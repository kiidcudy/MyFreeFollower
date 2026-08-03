import type { Locale } from "@/lib/i18n/config";
import type { CatalogService } from "@/lib/catalog/types";
import { isFreeService } from "@/lib/catalog/types";
import { localizeDeliveryLabel, localizeUnitLabel } from "@/lib/i18n/catalog-units";

const PLATFORMS: Record<Locale, Record<string, string>> = {
  en: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Website Traffic" },
  de: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Website-Traffic" },
  fr: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Trafic web" },
  es: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Tráfico web" },
  pt: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Tráfego web" },
  "pt-br": { "X (Twitter)": "X (Twitter)", "Website Traffic": "Tráfego web" },
  it: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Traffico web" },
  nl: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Websiteverkeer" },
  pl: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Ruch na stronie" },
  ro: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Trafic web" },
  ru: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Трафик сайта" },
  uk: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Трафік сайту" },
  tr: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Site Trafiği" },
  ar: { "X (Twitter)": "X (Twitter)", "Website Traffic": "زيارات الموقع" },
  fa: { "X (Twitter)": "X (Twitter)", "Website Traffic": "ترافیک وب‌سایت" },
  zh: { "X (Twitter)": "X (Twitter)", "Website Traffic": "网站流量" },
  id: { "X (Twitter)": "X (Twitter)", "Website Traffic": "Traffic Website" },
  bn: { "X (Twitter)": "X (Twitter)", "Website Traffic": "ওয়েবসাইট ট্রাফিক" },
  hi: { "X (Twitter)": "X (Twitter)", "Website Traffic": "वेबसाइट ट्रैफ़िक" },
};

const TYPES: Record<Locale, Record<string, string>> = {
  en: {},
  de: {
    Followers: "Follower", Likes: "Likes", Views: "Views", Comments: "Kommentare",
    Subscribers: "Abonnenten", Shares: "Shares", Saves: "Speicherungen",
    Members: "Mitglieder", Plays: "Plays", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Reaktionen", Reviews: "Bewertungen", "Video Views": "Video-Views",
    "Reels Views": "Reels-Views", "Story Views": "Story-Views", "Auto Likes": "Auto-Likes",
    "Auto Views": "Auto-Views", "Profile Visits": "Profilbesuche", "Live Views": "Live-Views",
    "Watch Hours": "Wiedergabestunden", "Monthly Listeners": "Monatliche Hörer",
    "Channel Views": "Kanalaufrufe", "Online Members": "Online-Mitglieder",
    "Post Views": "Beitragsaufrufe", "Page Likes": "Seiten-Likes", "Post Likes": "Beitrags-Likes",
    "Page Reviews": "Seitenbewertungen", "Website Traffic": "Website-Traffic",
    "Live Website Traffic": "Live-Website-Traffic",
  },
  fr: {
    Followers: "Abonnés", Likes: "Likes", Views: "Vues", Comments: "Commentaires",
    Subscribers: "Abonnés", Shares: "Partages", Saves: "Enregistrements",
    Members: "Membres", Plays: "Écoutes", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Réactions", Reviews: "Avis", "Video Views": "Vues vidéo",
    "Reels Views": "Vues Reels", "Story Views": "Vues story", "Auto Likes": "Likes auto",
    "Auto Views": "Vues auto", "Profile Visits": "Visites profil", "Live Views": "Vues live",
    "Watch Hours": "Heures de visionnage", "Monthly Listeners": "Auditeurs mensuels",
    "Channel Views": "Vues chaîne", "Online Members": "Membres en ligne",
    "Post Views": "Vues publication", "Page Likes": "Likes page", "Post Likes": "Likes publication",
    "Page Reviews": "Avis page", "Website Traffic": "Trafic web",
    "Live Website Traffic": "Trafic web live",
  },
  es: {
    Followers: "Seguidores", Likes: "Likes", Views: "Visualizaciones", Comments: "Comentarios",
    Subscribers: "Suscriptores", Shares: "Compartidos", Saves: "Guardados",
    Members: "Miembros", Plays: "Reproducciones", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Reacciones", Reviews: "Reseñas", "Video Views": "Visualizaciones de video",
    "Reels Views": "Visualizaciones Reels", "Story Views": "Visualizaciones de historias",
    "Auto Likes": "Likes automáticos", "Auto Views": "Visualizaciones automáticas",
    "Profile Visits": "Visitas al perfil", "Live Views": "Visualizaciones en vivo",
    "Watch Hours": "Horas de reproducción", "Monthly Listeners": "Oyentes mensuales",
    "Channel Views": "Vistas del canal", "Online Members": "Miembros en línea",
    "Post Views": "Vistas de publicación", "Page Likes": "Likes de página",
    "Post Likes": "Likes de publicación", "Page Reviews": "Reseñas de página",
    "Website Traffic": "Tráfico web", "Live Website Traffic": "Tráfico web en vivo",
  },
  pt: {
    Followers: "Seguidores", Likes: "Likes", Views: "Visualizações", Comments: "Comentários",
    Subscribers: "Subscritores", Shares: "Partilhas", Saves: "Guardados",
    Members: "Membros", Plays: "Reproduções", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Reações", Reviews: "Avaliações", "Video Views": "Visualizações de vídeo",
    "Reels Views": "Visualizações Reels", "Story Views": "Visualizações de stories",
    "Auto Likes": "Likes automáticos", "Auto Views": "Visualizações automáticas",
    "Profile Visits": "Visitas ao perfil", "Live Views": "Visualizações ao vivo",
    "Watch Hours": "Horas de visualização", "Monthly Listeners": "Ouvintes mensais",
    "Channel Views": "Visualizações do canal", "Online Members": "Membros online",
    "Post Views": "Visualizações de publicação", "Page Likes": "Likes da página",
    "Post Likes": "Likes da publicação", "Page Reviews": "Avaliações da página",
    "Website Traffic": "Tráfego web", "Live Website Traffic": "Tráfego web ao vivo",
  },
  "pt-br": {
    Followers: "Seguidores", Likes: "Curtidas", Views: "Visualizações", Comments: "Comentários",
    Subscribers: "Inscritos", Shares: "Compartilhamentos", Saves: "Salvamentos",
    Members: "Membros", Plays: "Reproduções", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Reações", Reviews: "Avaliações", "Video Views": "Visualizações de vídeo",
    "Reels Views": "Visualizações Reels", "Story Views": "Visualizações de stories",
    "Auto Likes": "Curtidas automáticas", "Auto Views": "Visualizações automáticas",
    "Profile Visits": "Visitas ao perfil", "Live Views": "Visualizações ao vivo",
    "Watch Hours": "Horas de exibição", "Monthly Listeners": "Ouvintes mensais",
    "Channel Views": "Visualizações do canal", "Online Members": "Membros online",
    "Post Views": "Visualizações de post", "Page Likes": "Curtidas da página",
    "Post Likes": "Curtidas do post", "Page Reviews": "Avaliações da página",
    "Website Traffic": "Tráfego web", "Live Website Traffic": "Tráfego web ao vivo",
  },
  it: {
    Followers: "Follower", Likes: "Like", Views: "Visualizzazioni", Comments: "Commenti",
    Subscribers: "Iscritti", Shares: "Condivisioni", Saves: "Salvataggi",
    Members: "Membri", Plays: "Ascolti", Reposts: "Repost", Upvotes: "Upvote",
    Reactions: "Reazioni", Reviews: "Recensioni", "Video Views": "Visualizzazioni video",
    "Reels Views": "Visualizzazioni Reels", "Story Views": "Visualizzazioni storie",
    "Auto Likes": "Like automatici", "Auto Views": "Visualizzazioni automatiche",
    "Profile Visits": "Visite profilo", "Live Views": "Visualizzazioni live",
    "Watch Hours": "Ore di visione", "Monthly Listeners": "Ascoltatori mensili",
    "Channel Views": "Visualizzazioni canale", "Online Members": "Membri online",
    "Post Views": "Visualizzazioni post", "Page Likes": "Like pagina",
    "Post Likes": "Like post", "Page Reviews": "Recensioni pagina",
    "Website Traffic": "Traffico web", "Live Website Traffic": "Traffico web live",
  },
  nl: {
    Followers: "Volgers", Likes: "Likes", Views: "Weergaven", Comments: "Reacties",
    Subscribers: "Abonnees", Shares: "Shares", Saves: "Opslagen",
    Members: "Leden", Plays: "Afspeelbeurten", Reposts: "Reposts", Upvotes: "Upvotes",
    Reactions: "Reacties", Reviews: "Beoordelingen", "Video Views": "Videoweergaven",
    "Reels Views": "Reels-weergaven", "Story Views": "Story-weergaven",
    "Auto Likes": "Auto-likes", "Auto Views": "Auto-weergaven",
    "Profile Visits": "Profielbezoeken", "Live Views": "Live-weergaven",
    "Watch Hours": "Kijkuren", "Monthly Listeners": "Maandelijkse luisteraars",
    "Channel Views": "Kanaalweergaven", "Online Members": "Online leden",
    "Post Views": "Postweergaven", "Page Likes": "Pagina-likes",
    "Post Likes": "Post-likes", "Page Reviews": "Paginabeoordelingen",
    "Website Traffic": "Websiteverkeer", "Live Website Traffic": "Live websiteverkeer",
  },
  pl: {
    Followers: "Obserwujących", Likes: "Polubień", Views: "Wyświetleń", Comments: "Komentarzy",
    Subscribers: "Subskrybentów", Shares: "Udostępnień", Saves: "Zapisów",
    Members: "Członków", Plays: "Odtworzeń", Reposts: "Repostów", Upvotes: "Upvote'ów",
    Reactions: "Reakcji", Reviews: "Opinii", "Video Views": "Wyświetleń wideo",
    "Reels Views": "Wyświetleń Reels", "Story Views": "Wyświetleń relacji",
    "Auto Likes": "Auto polubień", "Auto Views": "Auto wyświetleń",
    "Profile Visits": "Wizyt profilu", "Live Views": "Wyświetleń na żywo",
    "Watch Hours": "Godzin oglądania", "Monthly Listeners": "Miesięcznych słuchaczy",
    "Channel Views": "Wyświetleń kanału", "Online Members": "Członków online",
    "Post Views": "Wyświetleń posta", "Page Likes": "Polubień strony",
    "Post Likes": "Polubień posta", "Page Reviews": "Opinii strony",
    "Website Traffic": "Ruchu na stronie", "Live Website Traffic": "Ruchu na stronie na żywo",
  },
  ro: {
    Followers: "Urmăritori", Likes: "Aprecieri", Views: "Vizualizări", Comments: "Comentarii",
    Subscribers: "Abonați", Shares: "Distribuiri", Saves: "Salvări",
    Members: "Membri", Plays: "Redări", Reposts: "Repostări", Upvotes: "Upvote-uri",
    Reactions: "Reacții", Reviews: "Recenzii", "Video Views": "Vizualizări video",
    "Reels Views": "Vizualizări Reels", "Story Views": "Vizualizări story",
    "Auto Likes": "Aprecieri auto", "Auto Views": "Vizualizări auto",
    "Profile Visits": "Vizite profil", "Live Views": "Vizualizări live",
    "Watch Hours": "Ore vizionare", "Monthly Listeners": "Ascultători lunari",
    "Channel Views": "Vizualizări canal", "Online Members": "Membri online",
    "Post Views": "Vizualizări postare", "Page Likes": "Aprecieri pagină",
    "Post Likes": "Aprecieri postare", "Page Reviews": "Recenzii pagină",
    "Website Traffic": "Trafic web", "Live Website Traffic": "Trafic web live",
  },
  ru: {
    Followers: "Подписчиков", Likes: "Лайков", Views: "Просмотров", Comments: "Комментариев",
    Subscribers: "Подписчиков", Shares: "Репостов", Saves: "Сохранений",
    Members: "Участников", Plays: "Прослушиваний", Reposts: "Репостов", Upvotes: "Апвоутов",
    Reactions: "Реакций", Reviews: "Отзывов", "Video Views": "Просмотров видео",
    "Reels Views": "Просмотров Reels", "Story Views": "Просмотров stories",
    "Auto Likes": "Авто-лайков", "Auto Views": "Авто-просмотров",
    "Profile Visits": "Посещений профиля", "Live Views": "Просмотров эфира",
    "Watch Hours": "Часов просмотра", "Monthly Listeners": "Слушателей в месяц",
    "Channel Views": "Просмотров канала", "Online Members": "Участников онлайн",
    "Post Views": "Просмотров поста", "Page Likes": "Лайков страницы",
    "Post Likes": "Лайков поста", "Page Reviews": "Отзывов страницы",
    "Website Traffic": "Трафика сайта", "Live Website Traffic": "Живого трафика сайта",
  },
  uk: {
    Followers: "Підписників", Likes: "Лайків", Views: "Переглядів", Comments: "Коментарів",
    Subscribers: "Підписників", Shares: "Репостів", Saves: "Збережень",
    Members: "Учасників", Plays: "Прослуховувань", Reposts: "Репостів", Upvotes: "Апвоутів",
    Reactions: "Реакцій", Reviews: "Відгуків", "Video Views": "Переглядів відео",
    "Reels Views": "Переглядів Reels", "Story Views": "Переглядів stories",
    "Auto Likes": "Авто-лайків", "Auto Views": "Авто-переглядів",
    "Profile Visits": "Відвідувань профілю", "Live Views": "Переглядів ефіру",
    "Watch Hours": "Годин перегляду", "Monthly Listeners": "Слухачів на місяць",
    "Channel Views": "Переглядів каналу", "Online Members": "Учасників онлайн",
    "Post Views": "Переглядів поста", "Page Likes": "Лайків сторінки",
    "Post Likes": "Лайків поста", "Page Reviews": "Відгуків сторінки",
    "Website Traffic": "Трафіку сайту", "Live Website Traffic": "Живого трафіку сайту",
  },
  tr: {
    Followers: "Takipçi", Likes: "Beğeni", Views: "İzlenme", Comments: "Yorum",
    Subscribers: "Abone", Shares: "Paylaşım", Saves: "Kaydetme",
    Members: "Üye", Plays: "Dinlenme", Reposts: "Repost", Upvotes: "Upvote",
    Reactions: "Tepki", Reviews: "Değerlendirme", "Video Views": "Video İzlenme",
    "Reels Views": "Reels İzlenme", "Story Views": "Hikaye İzlenme",
    "Auto Likes": "Otomatik Beğeni", "Auto Views": "Otomatik İzlenme",
    "Profile Visits": "Profil Ziyareti", "Live Views": "Canlı İzlenme",
    "Watch Hours": "İzlenme Saati", "Monthly Listeners": "Aylık Dinleyici",
    "Channel Views": "Kanal İzlenme", "Online Members": "Çevrimiçi Üye",
    "Post Views": "Gönderi Görüntülenme", "Page Likes": "Sayfa Beğenisi",
    "Post Likes": "Gönderi Beğenisi", "Page Reviews": "Sayfa Değerlendirmesi",
    "Website Traffic": "Site Trafiği", "Live Website Traffic": "Canlı Site Trafiği",
  },
  ar: {
    Followers: "متابعين", Likes: "إعجابات", Views: "مشاهدات", Comments: "تعليقات",
    Subscribers: "مشتركين", Shares: "مشاركات", Saves: "حفظ",
    Members: "أعضاء", Plays: "تشغيل", Reposts: "إعادة نشر", Upvotes: "تصويت",
    Reactions: "تفاعلات", Reviews: "مراجعات", "Video Views": "مشاهدات فيديو",
    "Reels Views": "مشاهدات Reels", "Story Views": "مشاهدات القصص",
    "Auto Likes": "إعجابات تلقائية", "Auto Views": "مشاهدات تلقائية",
    "Profile Visits": "زيارات الملف", "Live Views": "مشاهدات مباشرة",
    "Watch Hours": "ساعات مشاهدة", "Monthly Listeners": "مستمعين شهرياً",
    "Channel Views": "مشاهدات القناة", "Online Members": "أعضاء متصلين",
    "Post Views": "مشاهدات المنشور", "Page Likes": "إعجابات الصفحة",
    "Post Likes": "إعجابات المنشور", "Page Reviews": "مراجعات الصفحة",
    "Website Traffic": "زيارات الموقع", "Live Website Traffic": "زيارات مباشرة للموقع",
  },
  fa: {
    Followers: "فالوور", Likes: "لایک", Views: "بازدید", Comments: "کامنت",
    Subscribers: "مشترک", Shares: "اشتراک", Saves: "ذخیره",
    Members: "عضو", Plays: "پخش", Reposts: "ریپost", Upvotes: "آپ‌ووت",
    Reactions: "واکنش", Reviews: "نظر", "Video Views": "بازدید ویدیو",
    "Reels Views": "بازدید Reels", "Story Views": "بازدید استوری",
    "Auto Likes": "لایک خودکار", "Auto Views": "بازدید خودکار",
    "Profile Visits": "بازدید پروفایل", "Live Views": "بازدید لایو",
    "Watch Hours": "ساعت تماشا", "Monthly Listeners": "شنونده ماهانه",
    "Channel Views": "بازدید کانال", "Online Members": "عضو آنلاین",
    "Post Views": "بازدید پست", "Page Likes": "لایک صفحه",
    "Post Likes": "لایک پست", "Page Reviews": "نظر صفحه",
    "Website Traffic": "ترافیک سایت", "Live Website Traffic": "ترافیک زنده سایت",
  },
  zh: {
    Followers: "粉丝", Likes: "点赞", Views: "播放", Comments: "评论",
    Subscribers: "订阅", Shares: "分享", Saves: "收藏",
    Members: "成员", Plays: "播放", Reposts: "转发", Upvotes: "点赞",
    Reactions: "反应", Reviews: "评价", "Video Views": "视频播放",
    "Reels Views": "Reels播放", "Story Views": "快拍观看",
    "Auto Likes": "自动点赞", "Auto Views": "自动播放",
    "Profile Visits": "主页访问", "Live Views": "直播观看",
    "Watch Hours": "观看时长", "Monthly Listeners": "月听众",
    "Channel Views": "频道观看", "Online Members": "在线成员",
    "Post Views": "帖子浏览", "Page Likes": "主页点赞",
    "Post Likes": "帖子点赞", "Page Reviews": "主页评价",
    "Website Traffic": "网站流量", "Live Website Traffic": "实时网站流量",
  },
  id: {
    Followers: "Pengikut", Likes: "Suka", Views: "Tayangan", Comments: "Komentar",
    Subscribers: "Pelanggan", Shares: "Bagikan", Saves: "Simpan",
    Members: "Anggota", Plays: "Putar", Reposts: "Repost", Upvotes: "Upvote",
    Reactions: "Reaksi", Reviews: "Ulasan", "Video Views": "Tayangan Video",
    "Reels Views": "Tayangan Reels", "Story Views": "Tayangan Story",
    "Auto Likes": "Suka Otomatis", "Auto Views": "Tayangan Otomatis",
    "Profile Visits": "Kunjungan Profil", "Live Views": "Tayangan Live",
    "Watch Hours": "Jam Tonton", "Monthly Listeners": "Pendengar Bulanan",
    "Channel Views": "Tayangan Channel", "Online Members": "Anggota Online",
    "Post Views": "Tayangan Posting", "Page Likes": "Suka Halaman",
    "Post Likes": "Suka Posting", "Page Reviews": "Ulasan Halaman",
    "Website Traffic": "Traffic Website", "Live Website Traffic": "Traffic Website Live",
  },
  bn: {
    Followers: "ফলোয়ার", Likes: "লাইক", Views: "ভিউ", Comments: "মন্তব্য",
    Subscribers: "সাবস্ক্রাইবার", Shares: "শেয়ার", Saves: "সেভ",
    Members: "সদস্য", Plays: "প্লে", Reposts: "রিপোস্ট", Upvotes: "আপভোট",
    Reactions: "রিঅ্যাকশন", Reviews: "রিভিউ", "Video Views": "ভিডিও ভিউ",
    "Reels Views": "রিলস ভিউ", "Story Views": "স্টোরি ভিউ",
    "Auto Likes": "অটো লাইক", "Auto Views": "অটো ভিউ",
    "Profile Visits": "প্রোফাইল ভিজিট", "Live Views": "লাইভ ভিউ",
    "Watch Hours": "ওয়াচ আওয়ার", "Monthly Listeners": "মাসিক শ্রোতা",
    "Channel Views": "চ্যানেল ভিউ", "Online Members": "অনলাইন সদস্য",
    "Post Views": "পোস্ট ভিউ", "Page Likes": "পেজ লাইক",
    "Post Likes": "পোস্ট লাইক", "Page Reviews": "পেজ রিভিউ",
    "Website Traffic": "ওয়েবসাইট ট্রাফিক", "Live Website Traffic": "লাইভ ওয়েবসাইট ট্রাফিক",
  },
  hi: {
    Followers: "फ़ॉलोअर्स", Likes: "लाइक्स", Views: "व्यूज़", Comments: "कमेंट्स",
    Subscribers: "सब्सक्राइबर्स", Shares: "शेयर", Saves: "सेव",
    Members: "सदस्य", Plays: "प्ले", Reposts: "रीपोस्ट", Upvotes: "अपवोट",
    Reactions: "रिएक्शन", Reviews: "रिव्यू", "Video Views": "वीडियो व्यूज़",
    "Reels Views": "रील्स व्यूज़", "Story Views": "स्टोरी व्यूज़",
    "Auto Likes": "ऑटो लाइक्स", "Auto Views": "ऑटो व्यूज़",
    "Profile Visits": "प्रोफ़ाइल विज़िट", "Live Views": "लाइव व्यूज़",
    "Watch Hours": "वॉच आवर्स", "Monthly Listeners": "मासिक श्रोता",
    "Channel Views": "चैनल व्यूज़", "Online Members": "ऑनलाइन मेंबर्स",
    "Post Views": "पोस्ट व्यूज़", "Page Likes": "पेज लाइक्स",
    "Post Likes": "पोस्ट लाइक्स", "Page Reviews": "पेज रिव्यू",
    "Website Traffic": "वेबसाइट ट्रैफ़िक", "Live Website Traffic": "लाइव वेबसाइट ट्रैफ़िक",
  },
};

const TITLE_FREE: Record<Locale, string> = {
  en: "Free {platform} {type}",
  de: "Kostenlose {platform} {type}",
  fr: "{type} {platform} gratuits",
  es: "{type} de {platform} gratis",
  pt: "{type} de {platform} grátis",
  "pt-br": "{type} de {platform} grátis",
  it: "{type} {platform} gratis",
  nl: "Gratis {platform} {type}",
  pl: "Darmowe {type} {platform}",
  ro: "{type} {platform} gratuite",
  ru: "Бесплатные {type} {platform}",
  uk: "Безкоштовні {type} {platform}",
  tr: "Ücretsiz {platform} {type}",
  ar: "{type} {platform} مجانية",
  fa: "{type} رایگان {platform}",
  zh: "免费{platform}{type}",
  id: "{type} {platform} Gratis",
  bn: "বিনামূল্যে {platform} {type}",
  hi: "मुफ़्त {platform} {type}",
};

const TITLE_BUY: Record<Locale, string> = {
  en: "Buy {platform} {type}",
  de: "{platform} {type} kaufen",
  fr: "Acheter des {type} {platform}",
  es: "Comprar {type} de {platform}",
  pt: "Comprar {type} de {platform}",
  "pt-br": "Comprar {type} de {platform}",
  it: "Compra {type} {platform}",
  nl: "Koop {platform} {type}",
  pl: "Kup {type} {platform}",
  ro: "Cumpără {type} {platform}",
  ru: "Купить {type} {platform}",
  uk: "Купити {type} {platform}",
  tr: "{platform} {type} Satın Al",
  ar: "شراء {type} {platform}",
  fa: "خرید {type} {platform}",
  zh: "购买{platform}{type}",
  id: "Beli {type} {platform}",
  bn: "{platform} {type} কিনুন",
  hi: "{platform} {type} खरीदें",
};

function fill(template: string, platform: string, type: string): string {
  return template.replace(/\{platform\}/g, platform).replace(/\{type\}/g, type);
}

export function localizePlatform(locale: Locale, platform: string): string {
  return PLATFORMS[locale]?.[platform] ?? platform;
}

export function localizeType(locale: Locale, type: string): string {
  return TYPES[locale]?.[type] ?? type;
}

export function localizeUnit(locale: Locale, unit: string): string {
  return localizeUnitLabel(locale, unit);
}

export function localizeDelivery(locale: Locale, delivery: string): string {
  return localizeDeliveryLabel(locale, delivery);
}

export function getFreeServiceTitle(locale: Locale, platform: string, type: string): string {
  const p = localizePlatform(locale, platform);
  const ty = localizeType(locale, type);
  return fill(TITLE_FREE[locale] ?? TITLE_FREE.en, p, ty);
}

export function getBuyServiceTitle(locale: Locale, platform: string, type: string): string {
  const p = localizePlatform(locale, platform);
  const ty = localizeType(locale, type);
  return fill(TITLE_BUY[locale] ?? TITLE_BUY.en, p, ty);
}

export function getServiceDisplayTitle(locale: Locale, service: CatalogService): string {
  return isFreeService(service)
    ? getFreeServiceTitle(locale, service.platform, service.type)
    : getBuyServiceTitle(locale, service.platform, service.type);
}
