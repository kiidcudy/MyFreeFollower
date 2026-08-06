import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { blogBodyOverrides } from "@/data/blog/bodies";
import type { BlogFaq, BlogPost, BlogSection } from "@/data/blog/posts";

export interface BlogLocaleOverride {
  title?: string;
  metaTitle?: string;
  description?: string;
  focusKeyword?: string;
  sections?: Array<Partial<BlogSection>>;
  faq?: Array<Partial<BlogFaq>>;
}

type BlogLocaleMap = Partial<Record<string, BlogLocaleOverride>>;

const SLUGS = [
  "free-followers-guide-2026",
  "free-instagram-followers-no-password",
  "free-tiktok-likes-and-views",
  "buy-cheap-followers-safely",
  "earn-free-social-media-growth-tasks",
  "instagram-reels-growth-guide-2026",
] as const;

/** Localized titles, meta, and body overrides via blogBodyOverrides for pt, pt-br, it, nl, pl, ro, uk, fa, zh, id, bn, hi (+ tr/de/fr/es/ar/ru). */
const translations: Record<
  Exclude<Locale, "en">,
  BlogLocaleMap
> = {
  de: {
    "free-followers-guide-2026": {
      title: "Kostenlose Follower Guide 2026: Social Growth durch Aufgaben",
      metaTitle:
        "Kostenlose Follower Guide 2026 — Wachstum durch Tasks | MyFreeFollower",
      description:
        "Kompletter Guide zu kostenlosen Followern 2026: Task-basiertes Wachstum, Instagram-, TikTok- und YouTube-Strategien, Sicherheitstipps und wann Paid-Pakete sinnvoll sind.",
      focusKeyword: "kostenlose follower guide 2026",
    },
    "free-instagram-followers-no-password": {
      title:
        "Kostenlose Instagram Follower ohne Passwort — Sichere Methoden 2026",
      metaTitle:
        "Kostenlose Instagram Follower ohne Passwort | MyFreeFollower",
      description:
        "So erhältst du kostenlose Instagram Follower ohne Passwort. Task-basierte Methoden, Trial-Größen, Liefergeschwindigkeit und Kombination mit Likes/Views.",
      focusKeyword: "kostenlose instagram follower ohne passwort",
    },
    "free-tiktok-likes-and-views": {
      title: "Kostenlose TikTok Likes & Views — Reichweite ohne Geld",
      metaTitle: "Kostenlose TikTok Likes & Views — Guide 2026 | MyFreeFollower",
      description:
        "Kostenlose TikTok Likes und Views 2026: Tasks, Videoauswahl, sichere Lieferung und Kombination mit kostenlosen TikTok Followern.",
      focusKeyword: "kostenlose tiktok likes und views",
    },
    "buy-cheap-followers-safely": {
      title: "Günstige Follower sicher kaufen — Growth Guide 2026",
      metaTitle: "Günstige Follower sicher kaufen | MyFreeFollower",
      description:
        "Follower günstig und sicher kaufen: Panel prüfen, schrittweise Lieferung, Zahlungssicherheit und Kombination mit kostenlosen Task-Punkten.",
      focusKeyword: "günstige follower sicher kaufen",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Kostenloses Social Growth durch Aufgaben verdienen",
      metaTitle:
        "Kostenloses Social Growth durch Tasks | MyFreeFollower",
      description:
        "Verdiene kostenloses Instagram-, TikTok- und YouTube-Wachstum durch Aufgaben. Tägliche Routinen, Proof-Tipps, Referrals und Punkt-Strategien.",
      focusKeyword: "kostenloses social media growth tasks",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels Wachstum 2026: Views, Likes, Follower",
      metaTitle: "Instagram Reels Wachstum Guide 2026 | MyFreeFollower",
      description:
        "Instagram Reels 2026 wachsen: Hook-Tests, kostenlose Reels-Views und Likes via Tasks, Profil-Conversion, sicheres Pacing und Paid-Pakete.",
      focusKeyword: "instagram reels wachstum 2026",
    },
  },
  fr: {
    "free-followers-guide-2026": {
      title: "Guide followers gratuits 2026 : croissance par tâches",
      metaTitle:
        "Guide followers gratuits 2026 | MyFreeFollower",
      description:
        "Guide complet followers gratuits 2026 : croissance par tâches, stratégies Instagram, TikTok, YouTube, sécurité et passage au payant.",
      focusKeyword: "guide followers gratuits 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Followers Instagram gratuits sans mot de passe — 2026",
      metaTitle: "Followers Instagram gratuits sans mot de passe | MyFreeFollower",
      description:
        "Obtenez des followers Instagram gratuits sans mot de passe. Méthodes sûres, essais gratuits et combinaison likes/vues.",
      focusKeyword: "followers instagram gratuits sans mot de passe",
    },
    "free-tiktok-likes-and-views": {
      title: "Likes et vues TikTok gratuits — booster sans payer",
      metaTitle: "Likes et vues TikTok gratuits | MyFreeFollower",
      description:
        "Likes et vues TikTok gratuits en 2026 : tâches, choix de vidéos, livraison progressive et followers gratuits.",
      focusKeyword: "likes et vues tiktok gratuits",
    },
    "buy-cheap-followers-safely": {
      title: "Acheter des followers pas cher en toute sécurité — 2026",
      metaTitle: "Acheter followers pas cher en sécurité | MyFreeFollower",
      description:
        "Acheter followers bon marché sans arnaque : vérifier le panel, livraison graduelle, paiements sûrs et points gratuits.",
      focusKeyword: "acheter followers pas cher en sécurité",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Gagner une croissance sociale gratuite en complétant des tâches",
      metaTitle: "Croissance sociale gratuite par tâches | MyFreeFollower",
      description:
        "Gagnez followers et engagement gratuits via des micro-tâches. Routines, preuves, parrainage et rachat de points.",
      focusKeyword: "croissance sociale gratuite tâches",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Croissance Reels Instagram 2026 : vues, likes, abonnés",
      metaTitle: "Guide croissance Reels Instagram 2026 | MyFreeFollower",
      description:
        "Faites grandir vos Reels Instagram en 2026 : hooks, vues et likes gratuits via tâches, conversion profil et livraison progressive.",
      focusKeyword: "croissance reels instagram 2026",
    },
  },
  es: {
    "free-followers-guide-2026": {
      title: "Guía de seguidores gratis 2026: crecimiento por tareas",
      metaTitle: "Guía seguidores gratis 2026 | MyFreeFollower",
      description:
        "Guía completa de seguidores gratis en 2026: crecimiento por tareas, Instagram, TikTok, YouTube, seguridad y cuándo pagar.",
      focusKeyword: "guía seguidores gratis 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Seguidores Instagram gratis sin contraseña — 2026",
      metaTitle: "Seguidores Instagram gratis sin contraseña | MyFreeFollower",
      description:
        "Consigue seguidores Instagram gratis sin compartir contraseña. Métodos seguros, pruebas y likes/vistas.",
      focusKeyword: "seguidores instagram gratis sin contraseña",
    },
    "free-tiktok-likes-and-views": {
      title: "Likes y views TikTok gratis — impulsa tu alcance",
      metaTitle: "Likes y views TikTok gratis | MyFreeFollower",
      description:
        "Likes y views TikTok gratis: tareas, selección de videos, entrega segura y seguidores gratis.",
      focusKeyword: "likes y views tiktok gratis",
    },
    "buy-cheap-followers-safely": {
      title: "Comprar seguidores baratos de forma segura — 2026",
      metaTitle: "Comprar seguidores baratos seguro | MyFreeFollower",
      description:
        "Compra seguidores baratos sin estafas: evaluar panel, entrega gradual, pagos seguros y puntos de tareas.",
      focusKeyword: "comprar seguidores baratos seguro",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Gana crecimiento social gratis completando tareas",
      metaTitle: "Crecimiento social gratis por tareas | MyFreeFollower",
      description:
        "Gana seguidores gratis con micro-tareas. Rutinas diarias, pruebas, referidos y canje de puntos.",
      focusKeyword: "crecimiento social gratis tareas",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Crecimiento Reels Instagram 2026: views, likes, seguidores",
      metaTitle: "Guía crecimiento Reels Instagram 2026 | MyFreeFollower",
      description:
        "Crece en Instagram Reels 2026: ganchos, vistas y likes gratis con tareas, conversión de perfil y entrega segura.",
      focusKeyword: "crecimiento reels instagram 2026",
    },
  },
  pt: {
    "free-followers-guide-2026": {
      title: "Guia de seguidores grátis 2026: crescimento por tarefas",
      metaTitle: "Guia seguidores grátis 2026 | MyFreeFollower",
      description:
        "Guia completo de seguidores grátis em 2026: crescimento por tarefas, Instagram, TikTok, YouTube e segurança.",
      focusKeyword: "guia seguidores grátis 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Seguidores Instagram grátis sem senha — 2026",
      metaTitle: "Seguidores Instagram grátis sem senha | MyFreeFollower",
      description:
        "Obtenha seguidores Instagram grátis sem senha. Métodos seguros e combinação com likes/views.",
      focusKeyword: "seguidores instagram grátis sem senha",
    },
    "free-tiktok-likes-and-views": {
      title: "Curtidas e views TikTok grátis",
      metaTitle: "Curtidas e views TikTok grátis | MyFreeFollower",
      description:
        "Curtidas e views TikTok grátis: tarefas, escolha de vídeos e entrega segura.",
      focusKeyword: "curtidas views tiktok grátis",
    },
    "buy-cheap-followers-safely": {
      title: "Comprar seguidores baratos com segurança — 2026",
      metaTitle: "Comprar seguidores baratos seguro | MyFreeFollower",
      description:
        "Compre seguidores baratos sem golpes: painel confiável, entrega gradual e pagamentos seguros.",
      focusKeyword: "comprar seguidores baratos seguro",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Ganhe crescimento social grátis completando tarefas",
      metaTitle: "Crescimento social grátis por tarefas | MyFreeFollower",
      description:
        "Ganhe seguidores grátis com micro-tarefas. Rotinas, provas, indicações e resgate de pontos.",
      focusKeyword: "crescimento social grátis tarefas",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Crescimento Reels Instagram 2026: views, likes, seguidores",
      metaTitle: "Guia Reels Instagram 2026 | MyFreeFollower",
      description:
        "Cresça no Instagram Reels em 2026: hooks, visualizações e likes grátis via tarefas e conversão de perfil.",
      focusKeyword: "crescimento reels instagram 2026",
    },
  },
  "pt-br": {
    "free-followers-guide-2026": {
      title: "Guia de seguidores grátis 2026: crescimento por tarefas",
      metaTitle: "Guia seguidores grátis 2026 | MyFreeFollower",
      description:
        "Guia completo de seguidores grátis: crescimento por tarefas, Instagram, TikTok, YouTube e dicas de segurança.",
      focusKeyword: "guia seguidores grátis 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Seguidores Instagram grátis sem senha",
      metaTitle: "Seguidores Instagram grátis sem senha | MyFreeFollower",
      description:
        "Como conseguir seguidores Instagram grátis sem senha. Métodos seguros e trials gratuitos.",
      focusKeyword: "seguidores instagram grátis sem senha",
    },
    "free-tiktok-likes-and-views": {
      title: "Curtidas e visualizações TikTok grátis",
      metaTitle: "Curtidas e views TikTok grátis | MyFreeFollower",
      description:
        "Curtidas e views TikTok grátis com tarefas. Estratégia de vídeos e entrega segura.",
      focusKeyword: "curtidas views tiktok grátis",
    },
    "buy-cheap-followers-safely": {
      title: "Comprar seguidores baratos com segurança",
      metaTitle: "Comprar seguidores baratos seguro | MyFreeFollower",
      description:
        "Compre seguidores baratos sem cair em golpe. Painel confiável e pagamento seguro.",
      focusKeyword: "comprar seguidores baratos seguro",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Ganhe crescimento social grátis com tarefas",
      metaTitle: "Crescimento social grátis | MyFreeFollower",
      description:
        "Ganhe seguidores grátis completando tarefas. Rotina diária, provas e indicações.",
      focusKeyword: "crescimento social grátis tarefas",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Crescimento Reels Instagram 2026: views, curtidas, seguidores",
      metaTitle: "Guia Reels Instagram 2026 | MyFreeFollower",
      description:
        "Cresça no Instagram Reels em 2026: ganchos, visualizações e curtidas grátis via tarefas e perfil otimizado.",
      focusKeyword: "crescimento reels instagram 2026",
    },
  },
  it: {
    "free-followers-guide-2026": {
      title: "Guida follower gratis 2026: crescita con task",
      metaTitle: "Guida follower gratis 2026 | MyFreeFollower",
      description:
        "Guida completa ai follower gratis 2026: crescita con task, Instagram, TikTok, YouTube e sicurezza.",
      focusKeyword: "guida follower gratis 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Follower Instagram gratis senza password",
      metaTitle: "Follower Instagram gratis senza password | MyFreeFollower",
      description:
        "Ottieni follower Instagram gratis senza password. Metodi sicuri e trial gratuiti.",
      focusKeyword: "follower instagram gratis senza password",
    },
    "free-tiktok-likes-and-views": {
      title: "Like e views TikTok gratis",
      metaTitle: "Like e views TikTok gratis | MyFreeFollower",
      description:
        "Like e views TikTok gratis: task, scelta video e consegna sicura.",
      focusKeyword: "like views tiktok gratis",
    },
    "buy-cheap-followers-safely": {
      title: "Comprare follower economici in sicurezza",
      metaTitle: "Comprare follower economici sicuro | MyFreeFollower",
      description:
        "Compra follower economici senza truffe. Panel affidabile e pagamenti sicuri.",
      focusKeyword: "comprare follower economici sicuro",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Guadagna crescita social gratis con i task",
      metaTitle: "Crescita social gratis con task | MyFreeFollower",
      description:
        "Guadagna follower gratis completando task. Routine, prove e referral.",
      focusKeyword: "crescita social gratis task",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Crescita Reels Instagram 2026: views, like, follower",
      metaTitle: "Guida Reels Instagram 2026 | MyFreeFollower",
      description:
        "Fai crescere i Reels Instagram nel 2026: hook, visualizzazioni e like gratis via task e conversione profilo.",
      focusKeyword: "crescita reels instagram 2026",
    },
  },
  nl: {
    "free-followers-guide-2026": {
      title: "Gratis volgers gids 2026: groei via taken",
      metaTitle: "Gratis volgers gids 2026 | MyFreeFollower",
      description:
        "Complete gids gratis volgers 2026: taak-groei, Instagram, TikTok, YouTube en veiligheid.",
      focusKeyword: "gratis volgers gids 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Gratis Instagram volgers zonder wachtwoord",
      metaTitle: "Gratis Instagram volgers zonder wachtwoord | MyFreeFollower",
      description:
        "Gratis Instagram volgers zonder wachtwoord. Veilige methoden en trials.",
      focusKeyword: "gratis instagram volgers zonder wachtwoord",
    },
    "free-tiktok-likes-and-views": {
      title: "Gratis TikTok likes en views",
      metaTitle: "Gratis TikTok likes en views | MyFreeFollower",
      description:
        "Gratis TikTok likes en views via taken. Videostrategie en veilige levering.",
      focusKeyword: "gratis tiktok likes views",
    },
    "buy-cheap-followers-safely": {
      title: "Goedkope volgers veilig kopen",
      metaTitle: "Goedkope volgers veilig kopen | MyFreeFollower",
      description:
        "Koop goedkope volgers veilig. Panel check, geleidelijke levering en betalingen.",
      focusKeyword: "goedkope volgers veilig kopen",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Gratis social growth verdienen met taken",
      metaTitle: "Gratis social growth via taken | MyFreeFollower",
      description:
        "Verdien gratis volgers met micro-taken. Dagelijkse routine en punten inwisselen.",
      focusKeyword: "gratis social growth taken",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels groei 2026: views, likes, volgers",
      metaTitle: "Instagram Reels groei gids 2026 | MyFreeFollower",
      description:
        "Groei met Instagram Reels in 2026: hooks, gratis Reels views en likes via taken en profielconversie.",
      focusKeyword: "instagram reels groei 2026",
    },
  },
  pl: {
    "free-followers-guide-2026": {
      title: "Przewodnik darmowych obserwujących 2026",
      metaTitle: "Przewodnik darmowych obserwujących 2026 | MyFreeFollower",
      description:
        "Kompletny przewodnik darmowych obserwujących: wzrost przez zadania, Instagram, TikTok, YouTube.",
      focusKeyword: "darmowi obserwujący przewodnik 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Darmowi obserwujący Instagram bez hasła",
      metaTitle: "Darmowi obserwujący Instagram bez hasła | MyFreeFollower",
      description:
        "Zdobądź darmowych obserwujących Instagram bez hasła. Bezpieczne metody.",
      focusKeyword: "darmowi obserwujący instagram bez hasła",
    },
    "free-tiktok-likes-and-views": {
      title: "Darmowe polubienia i wyświetlenia TikTok",
      metaTitle: "Darmowe polubienia TikTok | MyFreeFollower",
      description:
        "Darmowe polubienia i wyświetlenia TikTok przez zadania.",
      focusKeyword: "darmowe polubienia tiktok",
    },
    "buy-cheap-followers-safely": {
      title: "Kup tanich obserwujących bezpiecznie",
      metaTitle: "Kup tanich obserwujących bezpiecznie | MyFreeFollower",
      description:
        "Kup tanich obserwujących bez oszustw. Weryfikacja panelu i bezpieczne płatności.",
      focusKeyword: "kup tanich obserwujących bezpiecznie",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Zarabiaj darmowy wzrost social przez zadania",
      metaTitle: "Darmowy wzrost social przez zadania | MyFreeFollower",
      description:
        "Zdobywaj darmowych obserwujących wykonując zadania. Rutyna i punkty.",
      focusKeyword: "darmowy wzrost social zadania",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Wzrost Reels Instagram 2026: wyświetlenia, polubienia",
      metaTitle: "Przewodnik Reels Instagram 2026 | MyFreeFollower",
      description:
        "Rozwijaj Reels na Instagramie w 2026: haki, darmowe wyświetlenia i polubienia przez zadania.",
      focusKeyword: "wzrost reels instagram 2026",
    },
  },
  ro: {
    "free-followers-guide-2026": {
      title: "Ghid urmăritori gratuiți 2026: creștere prin task-uri",
      metaTitle: "Ghid urmăritori gratuiți 2026 | MyFreeFollower",
      description:
        "Ghid complet urmăritori gratuiți 2026: creștere prin task-uri, Instagram, TikTok, YouTube.",
      focusKeyword: "urmăritori gratuiți ghid 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Urmăritori Instagram gratuiți fără parolă",
      metaTitle: "Urmăritori Instagram fără parolă | MyFreeFollower",
      description:
        "Obține urmăritori Instagram gratuiți fără parolă. Metode sigure.",
      focusKeyword: "urmăritori instagram fără parolă",
    },
    "free-tiktok-likes-and-views": {
      title: "Like-uri și vizualizări TikTok gratuite",
      metaTitle: "Like-uri TikTok gratuite | MyFreeFollower",
      description:
        "Like-uri și vizualizări TikTok gratuite prin task-uri.",
      focusKeyword: "like-uri tiktok gratuite",
    },
    "buy-cheap-followers-safely": {
      title: "Cumpără urmăritori ieftini în siguranță",
      metaTitle: "Urmăritori ieftini sigur | MyFreeFollower",
      description:
        "Cumpără urmăritori ieftini fără înșelătorii. Panel verificat.",
      focusKeyword: "urmăritori ieftini sigur",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Câștigă creștere social gratuită prin task-uri",
      metaTitle: "Creștere social gratuită | MyFreeFollower",
      description:
        "Câștigă urmăritori gratuiți completând task-uri zilnice.",
      focusKeyword: "creștere social task-uri",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Creștere Reels Instagram 2026: vizualizări, like-uri",
      metaTitle: "Ghid Reels Instagram 2026 | MyFreeFollower",
      description:
        "Crește pe Instagram Reels în 2026: hook-uri, vizualizări și like-uri gratuite prin task-uri.",
      focusKeyword: "creștere reels instagram 2026",
    },
  },
  ru: {
    "free-followers-guide-2026": {
      title: "Гайд по бесплатным подписчикам 2026",
      metaTitle: "Гайд бесплатные подписчики 2026 | MyFreeFollower",
      description:
        "Полный гайд по бесплатным подписчикам: рост через задания, Instagram, TikTok, YouTube.",
      focusKeyword: "бесплатные подписчики гайд 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Бесплатные подписчики Instagram без пароля",
      metaTitle: "Instagram подписчики без пароля | MyFreeFollower",
      description:
        "Как получить бесплатных подписчиков Instagram без пароля. Безопасные методы.",
      focusKeyword: "бесплатные подписчики instagram без пароля",
    },
    "free-tiktok-likes-and-views": {
      title: "Бесплатные лайки и просмотры TikTok",
      metaTitle: "Бесплатные лайки TikTok | MyFreeFollower",
      description:
        "Бесплатные лайки и просмотры TikTok через задания.",
      focusKeyword: "бесплатные лайки tiktok",
    },
    "buy-cheap-followers-safely": {
      title: "Купить дешёвых подписчиков безопасно",
      metaTitle: "Купить подписчиков дёшево безопасно | MyFreeFollower",
      description:
        "Как безопасно купить дешёвых подписчиков. Проверка панели и оплата.",
      focusKeyword: "купить подписчиков дешево безопасно",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Заработай бесплатный рост через задания",
      metaTitle: "Бесплатный рост через задания | MyFreeFollower",
      description:
        "Зарабатывай подписчиков выполняя задания. Ежедневная рутина и баллы.",
      focusKeyword: "бесплатный рост задания",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Рост Reels в Instagram 2026: просмотры, лайки",
      metaTitle: "Гайд по Reels Instagram 2026 | MyFreeFollower",
      description:
        "Рост Instagram Reels в 2026: хуки, бесплатные просмотры и лайки через задания и конверсия профиля.",
      focusKeyword: "рост reels instagram 2026",
    },
  },
  uk: {
    "free-followers-guide-2026": {
      title: "Гайд безкоштовних підписників 2026",
      metaTitle: "Гайд безкоштовні підписники 2026 | MyFreeFollower",
      description:
        "Повний гайд безкоштовних підписників: ріст через завдання, Instagram, TikTok, YouTube.",
      focusKeyword: "безкоштовні підписники гайд 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Безкоштовні підписники Instagram без пароля",
      metaTitle: "Instagram підписники без пароля | MyFreeFollower",
      description:
        "Як отримати безкоштовних підписників Instagram без пароля.",
      focusKeyword: "безкоштовні підписники instagram",
    },
    "free-tiktok-likes-and-views": {
      title: "Безкоштовні лайки та перегляди TikTok",
      metaTitle: "Безкоштовні лайки TikTok | MyFreeFollower",
      description:
        "Безкоштовні лайки та перегляди TikTok через завдання.",
      focusKeyword: "безкоштовні лайки tiktok",
    },
    "buy-cheap-followers-safely": {
      title: "Купити дешевих підписників безпечно",
      metaTitle: "Купити підписників дешево | MyFreeFollower",
      description:
        "Як безпечно купити дешевих підписників без шахрайства.",
      focusKeyword: "купити підписників дешево",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Заробляй безкоштовне зростання через завдання",
      metaTitle: "Безкоштовне зростання через завдання | MyFreeFollower",
      description:
        "Заробляй підписників виконуючи завдання щодня.",
      focusKeyword: "безкоштовне зростання завдання",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Зростання Reels Instagram 2026: перегляди, лайки",
      metaTitle: "Гайд Reels Instagram 2026 | MyFreeFollower",
      description:
        "Зростання Instagram Reels у 2026: хуки, безкоштовні перегляди та лайки через завдання.",
      focusKeyword: "зростання reels instagram 2026",
    },
  },
  tr: {
    "free-followers-guide-2026": {
      title: "Ücretsiz Takipçi Rehberi 2026: Görevle Büyüme",
      metaTitle: "Ücretsiz Takipçi Rehberi 2026 | MyFreeFollower",
      description:
        "2026 ücretsiz takipçi rehberi: görev tabanlı, Instagram, TikTok, YouTube stratejileri ve güvenlik.",
      focusKeyword: "ücretsiz takipçi rehberi 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Şifresiz Ücretsiz Instagram Takipçi — 2026",
      metaTitle: "Şifresiz Ücretsiz Instagram Takipçi | MyFreeFollower",
      description:
        "Şifre paylaşmadan ücretsiz Instagram takipçi alın. Güvenli yöntemler ve deneme paketleri.",
      focusKeyword: "şifresiz ücretsiz instagram takipçi",
    },
    "free-tiktok-likes-and-views": {
      title: "Ücretsiz TikTok Beğeni ve İzlenme",
      metaTitle: "Ücretsiz TikTok Beğeni ve İzlenme | MyFreeFollower",
      description:
        "Görevlerle ücretsiz TikTok beğeni ve izlenme. Video seçimi ve güvenli teslimat.",
      focusKeyword: "ücretsiz tiktok beğeni izlenme",
    },
    "buy-cheap-followers-safely": {
      title: "Ucuz Takipçiyi Güvenle Satın Al — 2026",
      metaTitle: "Ucuz Takipçi Güvenle Satın Al | MyFreeFollower",
      description:
        "Ucuz takipçiyi dolandırılmadan satın alın. Panel kontrolü ve güvenli ödeme.",
      focusKeyword: "ucuz takipçi güvenle satın al",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Görev Tamamlayarak Ücretsiz Sosyal Medya Büyümesi",
      metaTitle: "Görevle Ücretsiz Büyüme | MyFreeFollower",
      description:
        "Görev yaparak ücretsiz takipçi kazanın. Günlük rutin, kanıt ipuçları ve puan stratejileri.",
      focusKeyword: "görevle ücretsiz sosyal medya büyümesi",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels Büyümesi 2026: İzlenme, Beğeni, Takipçi",
      metaTitle: "Instagram Reels Büyüme Rehberi 2026 | MyFreeFollower",
      description:
        "2026'da Instagram Reels büyütün: kanca testleri, görevle ücretsiz Reels izlenme/beğeni, profil dönüşümü ve güvenli teslimat.",
      focusKeyword: "instagram reels büyümesi 2026",
    },
  },
  ar: {
    "free-followers-guide-2026": {
      title: "دليل المتابعين المجانيين 2026: النمو عبر المهام",
      metaTitle: "دليل المتابعين المجانيين 2026 | MyFreeFollower",
      description:
        "دليل شامل للمتابعين المجانيين 2026: النمو بالمهام، إنستغرام، تيك توك، يوتيوب والأمان.",
      focusKeyword: "دليل المتابعين المجانيين 2026",
    },
    "free-instagram-followers-no-password": {
      title: "متابعون إنستغرام مجانيون بدون كلمة مرور",
      metaTitle: "متابعون إنستغرام بدون كلمة مرور | MyFreeFollower",
      description:
        "احصل على متابعين إنستغرام مجاناً دون مشاركة كلمة المرور. طرق آمنة.",
      focusKeyword: "متابعون إنستغرام مجانيون بدون كلمة مرور",
    },
    "free-tiktok-likes-and-views": {
      title: "إعجابات ومشاهدات تيك توك مجانية",
      metaTitle: "إعجابات تيك توك مجانية | MyFreeFollower",
      description:
        "إعجابات ومشاهدات تيك توك مجانية عبر المهام.",
      focusKeyword: "إعجابات مشاهدات تيك توك مجانية",
    },
    "buy-cheap-followers-safely": {
      title: "شراء متابعين رخيص بأمان — 2026",
      metaTitle: "شراء متابعين رخيص بأمان | MyFreeFollower",
      description:
        "اشترِ متابعين رخيصاً دون احتيال. التحقق من اللوحة والدفع الآمن.",
      focusKeyword: "شراء متابعين رخيص بأمان",
    },
    "earn-free-social-media-growth-tasks": {
      title: "اكسب نمواً مجانياً عبر إكمال المهام",
      metaTitle: "نمو مجاني عبر المهام | MyFreeFollower",
      description:
        "اكسب متابعين مجاناً بإكمال مهام بسيطة. روتين يومي ونقاط.",
      focusKeyword: "نمو مجاني مهام",
    },
    "instagram-reels-growth-guide-2026": {
      title: "نمو Reels إنستغرام 2026: مشاهدات، إعجابات، متابعون",
      metaTitle: "دليل نمو Reels إنستغرام 2026 | MyFreeFollower",
      description:
        "نمِّ Reels على إنستغرام في 2026: خطافات، مشاهدات وإعجابات مجانية عبر المهام وتحويل الملف الشخصي.",
      focusKeyword: "نمو reels إنستغرام 2026",
    },
  },
  fa: {
    "free-followers-guide-2026": {
      title: "راهنمای فالوور رایگان ۲۰۲۶",
      metaTitle: "راهنمای فالوور رایگان ۲۰۲۶ | MyFreeFollower",
      description:
        "راهنمای کامل فالوور رایگان: رشد مبتنی بر تسک، اینستاگرام، تیک‌تاک، یوتیوب.",
      focusKeyword: "راهنمای فالوور رایگان ۲۰۲۶",
    },
    "free-instagram-followers-no-password": {
      title: "فالوور رایگان اینستاگرام بدون رمز",
      metaTitle: "فالوور اینستاگرام بدون رمز | MyFreeFollower",
      description:
        "فالوور رایگان اینستاگرام بدون اشتراک رمز عبور.",
      focusKeyword: "فالوور رایگان اینستاگرام",
    },
    "free-tiktok-likes-and-views": {
      title: "لایک و بازدید رایگان تیک‌تاک",
      metaTitle: "لایک رایگان تیک‌تاک | MyFreeFollower",
      description:
        "لایک و بازدید رایگان تیک‌تاک با انجام تسک.",
      focusKeyword: "لایک بازدید رایگان تیک‌تاک",
    },
    "buy-cheap-followers-safely": {
      title: "خرید فالوور ارزان با امنیت",
      metaTitle: "خرید فالوور ارزان امن | MyFreeFollower",
      description:
        "خرید فالوور ارزان بدون کلاهبرداری.",
      focusKeyword: "خرید فالوور ارزان امن",
    },
    "earn-free-social-media-growth-tasks": {
      title: "رشد رایگان شبکه‌های اجتماعی با تسک",
      metaTitle: "رشد رایگان با تسک | MyFreeFollower",
      description:
        "با تکمیل تسک فالوور رایگان کسب کنید.",
      focusKeyword: "رشد رایگان تسک",
    },
    "instagram-reels-growth-guide-2026": {
      title: "رشد Reels اینستاگرام ۲۰۲۶: بازدید، لایک، فالوور",
      metaTitle: "راهنمای رشد Reels اینستاگرام ۲۰۲۶ | MyFreeFollower",
      description:
        "رشد Reels اینستاگرام در ۲۰۲۶: قلاب، بازدید و لایک رایگان با تسک و تبدیل پروفایل.",
      focusKeyword: "رشد reels اینستاگرام ۲۰۲۶",
    },
  },
  zh: {
    "free-followers-guide-2026": {
      title: "2026免费粉丝指南：任务式增长",
      metaTitle: "2026免费粉丝指南 | MyFreeFollower",
      description:
        "2026免费粉丝完整指南：任务式增长、Instagram、TikTok、YouTube策略与安全提示。",
      focusKeyword: "免费粉丝指南2026",
    },
    "free-instagram-followers-no-password": {
      title: "免密码免费Instagram粉丝",
      metaTitle: "免密码免费Instagram粉丝 | MyFreeFollower",
      description:
        "无需密码获取免费Instagram粉丝。安全方法与试用包。",
      focusKeyword: "免密码免费instagram粉丝",
    },
    "free-tiktok-likes-and-views": {
      title: "免费TikTok点赞与播放",
      metaTitle: "免费TikTok点赞播放 | MyFreeFollower",
      description:
        "通过任务获取免费TikTok点赞和播放量。",
      focusKeyword: "免费tiktok点赞播放",
    },
    "buy-cheap-followers-safely": {
      title: "安全购买便宜粉丝 — 2026",
      metaTitle: "安全购买便宜粉丝 | MyFreeFollower",
      description:
        "安全购买便宜粉丝：面板验证、渐进交付、安全支付。",
      focusKeyword: "安全购买便宜粉丝",
    },
    "earn-free-social-media-growth-tasks": {
      title: "做任务赚取免费社交媒体增长",
      metaTitle: "任务赚取免费增长 | MyFreeFollower",
      description:
        "完成任务赚取免费粉丝。每日 routine、证明技巧与积分策略。",
      focusKeyword: "任务免费社交媒体增长",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels增长2026：播放、点赞、粉丝",
      metaTitle: "Instagram Reels增长指南2026 | MyFreeFollower",
      description:
        "2026 Instagram Reels增长：钩子测试、任务免费播放/点赞、主页转化与安全节奏。",
      focusKeyword: "instagram reels增长 2026",
    },
  },
  id: {
    "free-followers-guide-2026": {
      title: "Panduan followers gratis 2026: pertumbuhan via tugas",
      metaTitle: "Panduan followers gratis 2026 | MyFreeFollower",
      description:
        "Panduan lengkap followers gratis: pertumbuhan berbasis tugas, Instagram, TikTok, YouTube.",
      focusKeyword: "panduan followers gratis 2026",
    },
    "free-instagram-followers-no-password": {
      title: "Followers Instagram gratis tanpa password",
      metaTitle: "Followers Instagram gratis tanpa password | MyFreeFollower",
      description:
        "Dapatkan followers Instagram gratis tanpa password. Metode aman.",
      focusKeyword: "followers instagram gratis tanpa password",
    },
    "free-tiktok-likes-and-views": {
      title: "Like dan views TikTok gratis",
      metaTitle: "Like views TikTok gratis | MyFreeFollower",
      description:
        "Like dan views TikTok gratis lewat tugas harian.",
      focusKeyword: "like views tiktok gratis",
    },
    "buy-cheap-followers-safely": {
      title: "Beli followers murah dengan aman",
      metaTitle: "Beli followers murah aman | MyFreeFollower",
      description:
        "Beli followers murah tanpa penipuan. Verifikasi panel dan pembayaran.",
      focusKeyword: "beli followers murah aman",
    },
    "earn-free-social-media-growth-tasks": {
      title: "Dapatkan pertumbuhan sosmed gratis via tugas",
      metaTitle: "Pertumbuhan sosmed gratis | MyFreeFollower",
      description:
        "Hasilkan followers gratis dengan menyelesaikan tugas.",
      focusKeyword: "pertumbuhan sosmed gratis tugas",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Pertumbuhan Reels Instagram 2026: views, likes, followers",
      metaTitle: "Panduan Reels Instagram 2026 | MyFreeFollower",
      description:
        "Tumbuhkan Instagram Reels 2026: hook, views dan likes gratis via tugas dan konversi profil.",
      focusKeyword: "pertumbuhan reels instagram 2026",
    },
  },
  bn: {
    "free-followers-guide-2026": {
      title: "ফ্রি ফলোয়ার গাইড ২০২৬: টাস্কে বৃদ্ধি",
      metaTitle: "ফ্রি ফলোয়ার গাইড ২০২৬ | MyFreeFollower",
      description:
        "২০২৬ ফ্রি ফলোয়ার সম্পূর্ণ গাইড: টাস্ক ভিত্তিক বৃদ্ধি, Instagram, TikTok, YouTube।",
      focusKeyword: "ফ্রি ফলোয়ার গাইড ২০২৬",
    },
    "free-instagram-followers-no-password": {
      title: "পাসওয়ার্ড ছাড়া ফ্রি Instagram ফলোয়ার",
      metaTitle: "পাসওয়ার্ড ছাড়া Instagram ফলোয়ার | MyFreeFollower",
      description:
        "পাসওয়ার্ড ছাড়াই ফ্রি Instagram ফলোয়ার পান।",
      focusKeyword: "পাসওয়ার্ড ছাড়া instagram ফলোয়ার",
    },
    "free-tiktok-likes-and-views": {
      title: "ফ্রি TikTok লাইক ও ভিউ",
      metaTitle: "ফ্রি TikTok লাইক | MyFreeFollower",
      description:
        "টাস্কে ফ্রি TikTok লাইক ও ভিউ অর্জন করুন।",
      focusKeyword: "ফ্রি tiktok লাইক ভিউ",
    },
    "buy-cheap-followers-safely": {
      title: "নিরাপদে সস্তা ফলোয়ার কিনুন",
      metaTitle: "সস্তা ফলোয়ার নিরাপদ | MyFreeFollower",
      description:
        "প্রতারণা ছাড়া সস্তা ফলোয়ার কিনুন।",
      focusKeyword: "সস্তা ফলোয়ার নিরাপদ",
    },
    "earn-free-social-media-growth-tasks": {
      title: "টাস্কে ফ্রি সোশ্যাল মিডিয়া বৃদ্ধি",
      metaTitle: "টাস্কে ফ্রি বৃদ্ধি | MyFreeFollower",
      description:
        "টাস্ক সম্পন্ন করে ফ্রি ফলোয়ার অর্জন করুন।",
      focusKeyword: "টাস্ক ফ্রি সোশ্যাল বৃদ্ধি",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels বৃদ্ধি ২০২৬: ভিউ, লাইক, ফলোয়ার",
      metaTitle: "Instagram Reels গাইড ২০২৬ | MyFreeFollower",
      description:
        "২০২৬-এ Instagram Reels বাড়ান: হুক, টাস্কে ফ্রি ভিউ/লাইক ও প্রোফাইল রূপান্তর।",
      focusKeyword: "instagram reels বৃদ্ধি ২০২৬",
    },
  },
  hi: {
    "free-followers-guide-2026": {
      title: "फ्री फॉलोअर्स गाइड 2026: टास्क से गrowth",
      metaTitle: "फ्री फॉलोअर्स गाइड 2026 | MyFreeFollower",
      description:
        "2026 फ्री फॉलोअर्स पूर्ण गाइड: टास्क आधारित वृद्धि, Instagram, TikTok, YouTube।",
      focusKeyword: "फ्री फॉलोअर्स गाइड 2026",
    },
    "free-instagram-followers-no-password": {
      title: "पासवर्ड के बिना फ्री Instagram फॉलोअर्स",
      metaTitle: "पासवर्ड के बिना Instagram फॉलोअर्स | MyFreeFollower",
      description:
        "पासवर्ड साझा किए बिना फ्री Instagram फॉलोअर्स पाएं।",
      focusKeyword: "पासवर्ड के बिना instagram फॉलोअर्स",
    },
    "free-tiktok-likes-and-views": {
      title: "फ्री TikTok लाइक और व्यू",
      metaTitle: "फ्री TikTok लाइक | MyFreeFollower",
      description:
        "टास्क से फ्री TikTok लाइक और व्यू अर्जित करें।",
      focusKeyword: "फ्री tiktok लाइक व्यू",
    },
    "buy-cheap-followers-safely": {
      title: "सस्ते फॉलोअर्स सुरक्षित खरीदें",
      metaTitle: "सस्ते फॉलोअर्स सुरक्षित | MyFreeFollower",
      description:
        "धोखाधड़ी के बिना सस्ते फॉलोअर्स खरीदें।",
      focusKeyword: "सस्ते फॉलोअर्स सुरक्षित",
    },
    "earn-free-social-media-growth-tasks": {
      title: "टास्क पूरा करके फ्री सोशल गrowth",
      metaTitle: "टास्क से फ्री गrowth | MyFreeFollower",
      description:
        "टास्क पूरा करके फ्री फॉलोअर्स कमाएं।",
      focusKeyword: "टास्क फ्री सोशल गrowth",
    },
    "instagram-reels-growth-guide-2026": {
      title: "Instagram Reels growth 2026: views, likes, followers",
      metaTitle: "Instagram Reels guide 2026 | MyFreeFollower",
      description:
        "2026 में Instagram Reels बढ़ाएं: hooks, tasks से free views/likes और profile conversion.",
      focusKeyword: "instagram reels growth 2026",
    },
  },
};

const BODY_LOCALES = [
  "tr",
  "de",
  "fr",
  "es",
  "ar",
  "ru",
  "pt",
  "pt-br",
  "it",
  "nl",
  "pl",
  "ro",
  "uk",
  "fa",
  "zh",
  "id",
  "bn",
  "hi",
] as const;

function mergeBodyOverrides(
  locale: Exclude<Locale, "en">,
  map: BlogLocaleMap,
): BlogLocaleMap {
  const bodies = blogBodyOverrides[locale];
  if (!bodies) return map;

  const merged: BlogLocaleMap = { ...map };
  for (const slug of SLUGS) {
    const body = bodies[slug];
    if (!body) continue;
    merged[slug] = {
      ...merged[slug],
      sections: body.sections,
      faq: body.faq,
    };
  }
  return merged;
}

function mergeSections(
  base: BlogSection[],
  overrides?: Array<Partial<BlogSection>>,
): BlogSection[] {
  if (!overrides?.length) return base;

  return base.map((section, index) => {
    const override = overrides[index];
    if (!override) return section;
    return {
      h2: override.h2 ?? section.h2,
      body: override.body ?? section.body,
    };
  });
}

function mergeFaq(
  base: BlogFaq[],
  overrides?: Array<Partial<BlogFaq>>,
): BlogFaq[] {
  if (!overrides?.length) return base;

  return base.map((item, index) => {
    const override = overrides[index];
    if (!override) return item;
    return {
      q: override.q ?? item.q,
      a: override.a ?? item.a,
    };
  });
}

export function mergeLocalizedPost(
  post: BlogPost,
  override?: BlogLocaleOverride,
): BlogPost {
  if (!override) return post;

  return {
    ...post,
    title: override.title ?? post.title,
    metaTitle: override.metaTitle ?? post.metaTitle,
    description: override.description ?? post.description,
    focusKeyword: override.focusKeyword ?? post.focusKeyword,
    sections: mergeSections(post.sections, override.sections),
    faq: mergeFaq(post.faq, override.faq),
  };
}

/** Per-locale, per-slug overrides keyed for getLocalizedPost */
export const blogLocaleOverrides: Record<Locale, BlogLocaleMap> =
  locales.reduce(
    (acc, locale) => {
      if (locale === "en") {
        acc[locale] = {};
      } else {
        const meta = translations[locale] ?? {};
        acc[locale] =
          BODY_LOCALES.includes(locale as (typeof BODY_LOCALES)[number])
            ? mergeBodyOverrides(locale, meta)
            : meta;
      }
      return acc;
    },
    {} as Record<Locale, BlogLocaleMap>,
  );

export { SLUGS as blogSlugs };
