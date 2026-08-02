import type { Locale } from "@/lib/i18n/config";
import type { SeoContent } from "@/lib/catalog/seo-content";
import {
  getBuyServiceTitle,
  getFreeServiceTitle,
  localizePlatform,
  localizeType,
} from "@/lib/i18n/catalog-labels";
import { clampDescription } from "@/lib/seo";
import {
  computeFreePointsCost,
  getSmallestTierUnitPriceUSD,
  isFreeService,
  isPaidService,
  type CatalogService,
  type FreeCatalogService,
  type PaidCatalogService,
} from "@/lib/catalog";
import { formatPoints, formatUSD, siteConfig } from "@/lib/site";

interface SeoTemplateSet {
  metaTitle: string;
  description: string;
  focusKeyword: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faq: { question: string; answer: string }[];
}

interface LocaleTemplates {
  free: SeoTemplateSet;
  paid: SeoTemplateSet;
}

function localeNumberTag(locale: Locale): string {
  return locale === "pt-br" ? "pt-BR" : locale;
}

function applyTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

function renderSet(set: SeoTemplateSet, vars: Record<string, string>): SeoContent {
  const keyword = applyTemplate(set.focusKeyword, vars);
  const filled = { ...vars, keyword };
  return {
    metaTitle: applyTemplate(set.metaTitle, filled),
    description: clampDescription(applyTemplate(set.description, filled)),
    focusKeyword: keyword,
    intro: applyTemplate(set.intro, filled),
    sections: set.sections.map((s) => ({
      heading: applyTemplate(s.heading, filled),
      body: applyTemplate(s.body, filled),
    })),
    faq: set.faq.map((f) => ({
      question: applyTemplate(f.question, filled),
      answer: applyTemplate(f.answer, filled),
    })),
  };
}

function freeVars(locale: Locale, service: FreeCatalogService): Record<string, string> {
  const platform = localizePlatform(locale, service.platform);
  const type = localizeType(locale, service.type);
  const amount = service.amount.toLocaleString(localeNumberTag(locale));
  return {
    platform,
    type,
    title: getFreeServiceTitle(locale, service.platform, service.type),
    amount,
    unit: service.unit,
    brand: siteConfig.name,
    points: formatPoints(computeFreePointsCost(service)),
    startPrice: "",
    startQty: "",
    delivery: "",
    maxQty: "",
    pointsRate: String(siteConfig.servicePointToUSD),
    platformLower: platform.toLowerCase(),
    typeLower: type.toLowerCase(),
  };
}

function paidVars(locale: Locale, service: PaidCatalogService): Record<string, string> {
  const platform = localizePlatform(locale, service.platform);
  const type = localizeType(locale, service.type);
  const smallestTier = service.tiers[0];
  const unitUsd = getSmallestTierUnitPriceUSD(service);
  const startPrice = smallestTier
    ? formatUSD(smallestTier.priceUSD)
    : formatUSD(unitUsd * 100);
  const startQty = (smallestTier?.quantity ?? 100).toLocaleString(
    localeNumberTag(locale),
  );
  const maxQty = (
    service.tiers[service.tiers.length - 1]?.quantity ?? 10000
  ).toLocaleString(localeNumberTag(locale));
  return {
    platform,
    type,
    title: getBuyServiceTitle(locale, service.platform, service.type),
    amount: "",
    unit: service.unit,
    brand: siteConfig.name,
    points: "",
    startPrice,
    startQty,
    delivery: service.delivery,
    maxQty,
    pointsRate: String(siteConfig.servicePointToUSD),
    platformLower: platform.toLowerCase(),
    typeLower: type.toLowerCase(),
  };
}

function kw(platformLower: string, typeLower: string): Record<string, string> {
  return { platform: platformLower, type: typeLower };
}

function s(
  heading: string,
  body: string,
): { heading: string; body: string } {
  return { heading, body };
}

function f(question: string, answer: string): { question: string; answer: string } {
  return { question, answer };
}

function tpl(free: SeoTemplateSet, paid: SeoTemplateSet): LocaleTemplates {
  return { free, paid };
}

const LOCALE_TEMPLATES: Record<Exclude<Locale, "en">, LocaleTemplates> = {
  de: tpl(
    {
      metaTitle: "{title} — {amount} {unit} Test | {brand}",
      description:
        "Sichere dir {amount} {unit} {keyword} auf {brand}. Erledige einfache Aufgaben, sammle Punkte und löse ein — kein Passwort nötig.",
      focusKeyword: "kostenlose {platform} {type}",
      intro:
        "{keyword} ermöglicht echtes Wachstum auf {platform}, ohne vorab zu zahlen. Auf {brand} verdienst du Punkte mit Micro-Aufgaben und löst sie für ein Testpaket mit {amount} {unit} ein. Wir fragen nie nach deinem Passwort — nur nach deinem öffentlichen Benutzernamen oder Profillink.",
      sections: [
        s(
          "Was sind kostenlose {platform} {type}?",
          "Kostenlose {typeLower} auf {platform} helfen dir, Social Proof aufzubauen, bevor du in größere Pakete investierst. Unser Test mit {amount} {unit} ist zum Prüfen von Liefergeschwindigkeit und Qualität gedacht. {keyword} eignet sich für neue Creator, kleine Unternehmen und alle, die aufgabenbasiertes SMM-Wachstum ausprobieren möchten.",
        ),
        s(
          "So erhältst du kostenlose {title}",
          "Registriere dich kostenlos, sieh dir verfügbare Aufgaben an und reiche den Nachweis ein, wenn du fertig bist. Genehmigte Aufgaben gutschreiben Punkte auf dein Guthaben. Sobald du genug Punkte hast (dieser Service kostet etwa {points} Punkte), öffne das Bestellformular, gib deinen Benutzernamen ein und bestätige. Die Lieferung startet in der Regel innerhalb von 0–24 Stunden.",
        ),
        s(
          "Warum {brand} für kostenloses Wachstum",
          "{brand} verbindet eine Aufgaben-Ökonomie mit einem vollständigen kostenpflichtigen Katalog über 24 Plattformen. Du kannst mit {keyword} starten und dann mit günstigen Paketen skalieren oder weiter täglich Aufgaben erledigen. Support ist rund um die Uhr per Live-Chat und WhatsApp erreichbar.",
        ),
        s(
          "Kostenlos vs. kostenpflichtig {platform} {type}",
          "Kostenlose Tests nutzen verdiente Punkte und eignen sich zum Ausprobieren. Kostenpflichtige Pakete liefern größere Mengen sofort per Karte, Krypto oder Punkten an der Kasse. Viele Nutzer holen sich zuerst einen Gratis-Test und upgraden dann, wenn sie Ergebnisse sehen.",
        ),
      ],
      faq: [
        f(
          "Ist {keyword} wirklich kostenlos?",
          "Ja. Du verdienst Punkte durch Aufgaben — keine Kreditkarte nötig. Dieses Paket mit {amount} {unit} kostet etwa {points} Punkte zum Einlösen.",
        ),
        f(
          "Muss ich mein {platform}-Passwort teilen?",
          "Niemals. Wir brauchen nur deinen öffentlichen Benutzernamen oder Profil-URL. {brand} fragt nie nach deinem Passwort.",
        ),
        f(
          "Wie lange dauert die Lieferung kostenloser {typeLower}?",
          "Die meisten Gratis-Bestellungen starten innerhalb von 0–24 Stunden. Bei hoher Auslastung kann die Fertigstellung etwas länger dauern; die Lieferung erfolgt schrittweise und kontofreundlich.",
        ),
        f(
          "Kann ich kostenlose {typeLower} mehrfach bestellen?",
          "Gratis-Tests sind pro Service begrenzt, damit das System fair bleibt. Du kannst andere Gratis-Services derselben Plattform nutzen oder auf ein kostenpflichtiges Paket upgraden.",
        ),
      ],
    },
    {
      metaTitle: "{title} — ab {startPrice} | {brand}",
      description:
        "Kaufe {keyword} ab {startPrice}. Sofortige Lieferung in {delivery}. Bezahle mit Karte, Krypto oder Punkten. Vertrauenswürdiges {platform}-Wachstum — kein Passwort nötig.",
      focusKeyword: "{platform} {type} kaufen",
      intro:
        "{keyword} auf {brand} liefert echte {unit} mit schneller, schrittweiser Zustellung. Pakete starten bei {startQty} {unit} für {startPrice}. Gib deinen Benutzernamen ein, wähle eine Stufe und bezahle sicher — wir fragen nie nach deinem Passwort.",
      sections: [
        s(
          "Warum {platform} {type} kaufen?",
          "{type} auf {platform} signalisieren Beliebtheit und Vertrauen. Höhere Zahlen verbessern den ersten Eindruck, fördern organisches Engagement und helfen Inhalten, mehr Menschen zu erreichen. {keyword} ist eine schnelle Möglichkeit, Schwung zu holen, wenn du ein Profil, eine Kampagne oder ein Produkt startest.",
        ),
        s(
          "Lieferung & Qualität",
          "Bestellungen starten in der Regel innerhalb von {delivery}. Die Lieferung wird natürlich verteilt, um die Kontogesundheit zu schützen. Alle Pakete werden von {brand} mit Support und transparenter Bestellverfolgung im Dashboard begleitet.",
        ),
        s(
          "Preise & Zahlungsoptionen",
          "Wähle aus festen Stufen bis zu {maxQty} {unit}. Bezahle per Karte, Kryptowährung oder mit verdienten Punkten ({pointsRate} Punkte pro 1 $). Größere Stufen senken den Stückpreis automatisch.",
        ),
        s(
          "So bestellst du {title}",
          "Wähle eine Paketgröße, gib deinen {platform}-Benutzernamen oder Link ein und schließe den Checkout ab. Du kannst auch Punkte durch Gratis-Aufgaben verdienen und sie für kostenpflichtige Services nutzen. Den Status siehst du jederzeit auf deiner Bestellseite.",
        ),
      ],
      faq: [
        f(
          "Ist es sicher, {platform} {typeLower} zu kaufen?",
          "Ja. Wir fragen nie nach deinem Passwort. Die Lieferung erfolgt schrittweise und wirkt natürlich. Täglich werden auf {brand} tausende Bestellungen bearbeitet.",
        ),
        f(
          "Wie schnell startet meine Bestellung?",
          "Die meisten {keyword}-Bestellungen beginnen innerhalb von {delivery}. Die Fertigstellung hängt von Paketgröße und aktueller Warteschlange ab.",
        ),
        f(
          "Kann ich mit Punkten statt Geld bezahlen?",
          "Ja. Verdiene Punkte durch Aufgaben und gib sie an der Kasse aus. Punktpreise werden neben USD für jede Stufe angezeigt.",
        ),
        f(
          "Was, wenn ich Hilfe bei meiner Bestellung brauche?",
          "Kontaktiere unseren 24/7-Support per Live-Chat oder WhatsApp. Gib Bestell-ID und Benutzernamen an für die schnellste Lösung.",
        ),
      ],
    },
  ),
  fr: tpl(
    {
      metaTitle: "{title} — Essai {amount} {unit} | {brand}",
      description:
        "Obtenez {amount} {unit} {keyword} sur {brand}. Accomplissez des tâches simples, gagnez des points et échangez — aucun mot de passe requis.",
      focusKeyword: "{type} {platform} gratuits",
      intro:
        "{keyword} vous permet de tester une croissance réelle sur {platform} sans payer d'avance. Sur {brand}, vous gagnez des points en accomplissant des micro-tâches et les échangez contre un pack d'essai de {amount} {unit}. Nous ne demandons jamais votre mot de passe — seulement votre nom d'utilisateur public ou le lien de profil.",
      sections: [
        s(
          "Que sont les {type} {platform} gratuits ?",
          "Des {typeLower} gratuits sur {platform} vous aident à construire une preuve sociale avant d'investir dans des packs plus grands. Notre essai de {amount} {unit} sert à tester la vitesse et la qualité de livraison. {keyword} convient aux nouveaux créateurs, aux petites entreprises et à quiconque explore la croissance SMM par tâches.",
        ),
        s(
          "Comment obtenir {title}",
          "Inscrivez-vous gratuitement, parcourez les tâches disponibles et soumettez une preuve une fois terminé. Les tâches approuvées créditent des points sur votre solde. Lorsque vous en avez assez (ce service coûte environ {points} points), ouvrez le formulaire, entrez votre nom d'utilisateur et confirmez. La livraison démarre généralement sous 0 à 24 heures.",
        ),
        s(
          "Pourquoi choisir {brand} pour la croissance gratuite",
          "{brand} combine une économie de tâches avec un catalogue payant complet sur 24 plateformes. Commencez avec {keyword}, puis passez à des packs abordables ou continuez à gagner via des tâches quotidiennes. Support disponible 24h/24 par chat en direct et WhatsApp.",
        ),
        s(
          "Gratuit vs payant : {type} {platform}",
          "Les essais gratuits utilisent des points gagnés et servent à tester. Les packs payants livrent de plus grandes quantités instantanément par carte, crypto ou points au paiement. Beaucoup réclament d'abord un essai gratuit, puis passent à la version supérieure en voyant les résultats.",
        ),
      ],
      faq: [
        f(
          "{keyword} est-il vraiment gratuit ?",
          "Oui. Vous gagnez des points en accomplissant des tâches — aucune carte bancaire requise. Ce pack de {amount} {unit} coûte environ {points} points à échanger.",
        ),
        f(
          "Dois-je partager mon mot de passe {platform} ?",
          "Jamais. Nous avons seulement besoin de votre nom d'utilisateur public ou de l'URL du profil. {brand} ne demandera jamais votre mot de passe.",
        ),
        f(
          "Combien de temps prend la livraison des {typeLower} gratuits ?",
          "La plupart des commandes gratuites démarrent sous 0 à 24 heures. Des files d'attente plus longues peuvent légèrement retarder la fin ; la livraison reste progressive et sûre pour votre compte.",
        ),
        f(
          "Puis-je commander des {typeLower} gratuits plusieurs fois ?",
          "Les essais gratuits sont limités par service pour rester équitables. Explorez d'autres services gratuits sur la même plateforme ou passez à un pack payant pour des quantités plus grandes.",
        ),
      ],
    },
    {
      metaTitle: "{title} — À partir de {startPrice} | {brand}",
      description:
        "Achetez {keyword} à partir de {startPrice}. Livraison instantanée en {delivery}. Payez par carte, crypto ou points. Croissance {platform} fiable — aucun mot de passe requis.",
      focusKeyword: "acheter des {type} {platform}",
      intro:
        "{keyword} sur {brand} livre de vrais {unit} avec une distribution rapide et progressive. Les packs commencent à {startQty} {unit} pour {startPrice}. Entrez votre nom d'utilisateur, choisissez un palier et payez en toute sécurité — nous ne demandons jamais votre mot de passe.",
      sections: [
        s(
          "Pourquoi acheter des {type} {platform} ?",
          "Les {type} sur {platform} signalent popularité et confiance. Des chiffres plus élevés améliorent la première impression, encouragent l'engagement organique et aident le contenu à toucher plus de monde. {keyword} est un moyen rapide de prendre de l'élan au lancement d'un profil, d'une campagne ou d'un produit.",
        ),
        s(
          "Livraison et qualité",
          "Les commandes démarrent généralement sous {delivery}. La livraison est étalée naturellement pour protéger la santé du compte. Tous les packs bénéficient du support {brand} et d'un suivi transparent dans votre tableau de bord.",
        ),
        s(
          "Tarifs et options de paiement",
          "Choisissez parmi des paliers prédéfinis jusqu'à {maxQty} {unit}. Payez par carte, cryptomonnaie ou points gagnés ({pointsRate} points par 1 $). Les paliers volumineux réduisent automatiquement le prix unitaire.",
        ),
        s(
          "Comment commander {title}",
          "Sélectionnez une taille de pack, entrez votre nom d'utilisateur ou lien {platform}, puis finalisez le paiement. Vous pouvez aussi gagner des points via des tâches gratuites et les utiliser pour des services payants. Suivez le statut depuis votre page de commandes.",
        ),
      ],
      faq: [
        f(
          "Est-il sûr d'acheter des {typeLower} {platform} ?",
          "Oui. Nous ne demandons jamais votre mot de passe. La livraison est progressive et conçue pour paraître naturelle. Des milliers de commandes sont traitées chaque jour sur {brand}.",
        ),
        f(
          "À quelle vitesse ma commande démarre-t-elle ?",
          "La plupart des commandes {keyword} commencent sous {delivery}. Le délai de fin dépend de la taille du pack et du volume de la file d'attente.",
        ),
        f(
          "Puis-je payer avec des points plutôt qu'en argent ?",
          "Oui. Gagnez des points en accomplissant des tâches, puis dépensez-les au paiement. Les prix en points sont affichés à côté des USD pour chaque palier.",
        ),
        f(
          "Et si j'ai besoin d'aide pour ma commande ?",
          "Contactez notre support 24h/24 par chat en direct ou WhatsApp. Indiquez votre numéro de commande et nom d'utilisateur pour une résolution plus rapide.",
        ),
      ],
    },
  ),
  es: tpl(
    {
      metaTitle: "{title} — Prueba {amount} {unit} | {brand}",
      description:
        "Consigue {amount} {unit} {keyword} en {brand}. Completa tareas sencillas, gana puntos y canjéalos — sin contraseña.",
      focusKeyword: "{type} de {platform} gratis",
      intro:
        "{keyword} te permite probar crecimiento real en {platform} sin pagar por adelantado. En {brand} ganas puntos completando microtareas y los canjeas por un paquete de prueba de {amount} {unit}. Nunca pedimos tu contraseña — solo tu nombre de usuario público o enlace del perfil.",
      sections: [
        s(
          "¿Qué son los {type} de {platform} gratis?",
          "Los {typeLower} gratis en {platform} te ayudan a construir prueba social antes de invertir en paquetes mayores. Nuestra prueba de {amount} {unit} sirve para evaluar velocidad y calidad de entrega. {keyword} es ideal para creadores nuevos, pequeños negocios y quienes exploran el crecimiento SMM basado en tareas.",
        ),
        s(
          "Cómo obtener {title}",
          "Regístrate gratis, revisa las tareas disponibles y envía la prueba al terminar. Las tareas aprobadas acreditan puntos a tu saldo. Cuando tengas suficientes (este servicio cuesta unos {points} puntos), abre el formulario, introduce tu usuario y confirma. La entrega suele iniciar en 0–24 horas.",
        ),
        s(
          "Por qué elegir {brand} para crecimiento gratis",
          "{brand} combina una economía de tareas con un catálogo de pago completo en 24 plataformas. Empieza con {keyword} y escala con paquetes asequibles o sigue ganando con tareas diarias. Soporte 24/7 por chat en vivo y WhatsApp.",
        ),
        s(
          "Gratis vs de pago: {type} de {platform}",
          "Las pruebas gratis usan puntos ganados y sirven para probar. Los paquetes de pago entregan cantidades mayores al instante con tarjeta, cripto o puntos en el checkout. Muchos piden primero una prueba gratis y luego actualizan al ver resultados.",
        ),
      ],
      faq: [
        f(
          "¿{keyword} es realmente gratis?",
          "Sí. Ganas puntos completando tareas — no se requiere tarjeta. Este paquete de {amount} {unit} cuesta aproximadamente {points} puntos para canjear.",
        ),
        f(
          "¿Debo compartir mi contraseña de {platform}?",
          "Nunca. Solo necesitamos tu nombre de usuario público o URL del perfil. {brand} nunca pedirá tu contraseña.",
        ),
        f(
          "¿Cuánto tarda la entrega de {typeLower} gratis?",
          "La mayoría de pedidos gratis inician en 0–24 horas. Colas más largas pueden retrasar ligeramente la finalización; la entrega es gradual y segura para tu cuenta.",
        ),
        f(
          "¿Puedo pedir {typeLower} gratis más de una vez?",
          "Las pruebas gratis están limitadas por servicio para mantener la equidad. Explora otros servicios gratis en la misma plataforma o actualiza a un paquete de pago.",
        ),
      ],
    },
    {
      metaTitle: "{title} — Desde {startPrice} | {brand}",
      description:
        "Compra {keyword} desde {startPrice}. Entrega instantánea en {delivery}. Paga con tarjeta, cripto o puntos. Crecimiento {platform} confiable — sin contraseña.",
      focusKeyword: "comprar {type} de {platform}",
      intro:
        "{keyword} en {brand} entrega {unit} reales con distribución rápida y gradual. Los paquetes empiezan en {startQty} {unit} por {startPrice}. Introduce tu usuario, elige un nivel y paga de forma segura — nunca pedimos tu contraseña.",
      sections: [
        s(
          "¿Por qué comprar {type} de {platform}?",
          "Los {type} en {platform} señalan popularidad y confianza. Más números mejoran la primera impresión, fomentan el engagement orgánico y ayudan al contenido a llegar a más personas. {keyword} es una forma rápida de impulsar el momentum al lanzar un perfil, campaña o producto.",
        ),
        s(
          "Entrega y calidad",
          "Los pedidos suelen iniciar en {delivery}. La entrega se reparte de forma natural para proteger la salud de la cuenta. Todos los paquetes cuentan con soporte de {brand} y seguimiento transparente en tu panel.",
        ),
        s(
          "Precios y opciones de pago",
          "Elige entre niveles predefinidos hasta {maxQty} {unit}. Paga con tarjeta, criptomoneda o puntos ganados ({pointsRate} puntos por 1 $). Los niveles mayores reducen automáticamente el precio por unidad.",
        ),
        s(
          "Cómo pedir {title}",
          "Selecciona un tamaño de paquete, introduce tu usuario o enlace de {platform} y completa el checkout. También puedes ganar puntos con tareas gratis y usarlos en servicios de pago. Sigue el estado en tu página de pedidos.",
        ),
      ],
      faq: [
        f(
          "¿Es seguro comprar {typeLower} de {platform}?",
          "Sí. Nunca pedimos tu contraseña. La entrega es gradual y diseñada para verse natural. Miles de pedidos se procesan diariamente en {brand}.",
        ),
        f(
          "¿Qué tan rápido inicia mi pedido?",
          "La mayoría de pedidos de {keyword} comienzan en {delivery}. El tiempo de finalización depende del tamaño del paquete y la cola actual.",
        ),
        f(
          "¿Puedo pagar con puntos en lugar de dinero?",
          "Sí. Gana puntos completando tareas y gástalo en el checkout. Los precios en puntos se muestran junto al USD en cada nivel.",
        ),
        f(
          "¿Qué hago si necesito ayuda con mi pedido?",
          "Contacta nuestro soporte 24/7 por chat en vivo o WhatsApp. Proporciona tu ID de pedido y nombre de usuario para una resolución más rápida.",
        ),
      ],
    },
  ),
  pt: tpl(
    {
      metaTitle: "{title} — Teste {amount} {unit} | {brand}",
      description:
        "Obtenha {amount} {unit} {keyword} em {brand}. Complete tarefas simples, ganhe pontos e resgate — sem palavra-passe.",
      focusKeyword: "{type} de {platform} grátis",
      intro:
        "{keyword} permite testar crescimento real em {platform} sem pagar antecipadamente. Em {brand}, ganha pontos ao completar microtarefas e resgata-os por um pacote de teste de {amount} {unit}. Nunca pedimos a sua palavra-passe — apenas o nome de utilizador público ou link do perfil.",
      sections: [
        s("O que são {type} de {platform} grátis?", "Os {typeLower} grátis em {platform} ajudam a construir prova social antes de investir em pacotes maiores. O nosso teste de {amount} {unit} serve para avaliar velocidade e qualidade de entrega. {keyword} é ideal para novos criadores, pequenas empresas e quem explora crescimento SMM baseado em tarefas."),
        s("Como obter {title}", "Registe-se gratuitamente, veja as tarefas disponíveis e envie a prova quando terminar. Tarefas aprovadas creditam pontos ao seu saldo. Quando tiver pontos suficientes (este serviço custa cerca de {points} pontos), abra o formulário, introduza o utilizador e confirme. A entrega normalmente inicia em 0–24 horas."),
        s("Porquê escolher {brand} para crescimento grátis", "{brand} combina uma economia de tarefas com um catálogo pago completo em 24 plataformas. Comece com {keyword} e escale com pacotes acessíveis ou continue a ganhar com tarefas diárias. Suporte 24/7 por chat ao vivo e WhatsApp."),
        s("Grátis vs pago: {type} de {platform}", "Os testes grátis usam pontos ganhos e servem para experimentar. Os pacotes pagos entregam quantidades maiores de imediato com cartão, cripto ou pontos no checkout. Muitos pedem primeiro um teste grátis e atualizam ao ver resultados."),
      ],
      faq: [
        f("{keyword} é realmente grátis?", "Sim. Ganha pontos ao completar tarefas — sem cartão de crédito. Este pacote de {amount} {unit} custa aproximadamente {points} pontos para resgatar."),
        f("Preciso de partilhar a palavra-passe do {platform}?", "Nunca. Só precisamos do nome de utilizador público ou URL do perfil. {brand} nunca pedirá a sua palavra-passe."),
        f("Quanto tempo demora a entrega de {typeLower} grátis?", "A maioria dos pedidos grátis inicia em 0–24 horas. Filas maiores podem prolongar ligeiramente a conclusão; a entrega é gradual e segura para a conta."),
        f("Posso pedir {typeLower} grátis mais do que uma vez?", "Os testes grátis são limitados por serviço para manter a equidade. Explore outros serviços grátis na mesma plataforma ou atualize para um pacote pago."),
      ],
    },
    {
      metaTitle: "{title} — A partir de {startPrice} | {brand}",
      description: "Compre {keyword} a partir de {startPrice}. Entrega instantânea em {delivery}. Pague com cartão, cripto ou pontos. Crescimento {platform} fiável — sem palavra-passe.",
      focusKeyword: "comprar {type} de {platform}",
      intro: "{keyword} em {brand} entrega {unit} reais com distribuição rápida e gradual. Os pacotes começam em {startQty} {unit} por {startPrice}. Introduza o utilizador, escolha um nível e pague com segurança — nunca pedimos a palavra-passe.",
      sections: [
        s("Porquê comprar {type} de {platform}?", "Os {type} em {platform} sinalizam popularidade e confiança. Números mais altos melhoram a primeira impressão, incentivam engagement orgânico e ajudam o conteúdo a alcançar mais pessoas. {keyword} é uma forma rápida de ganhar impulso ao lançar um perfil, campanha ou produto."),
        s("Entrega e qualidade", "Os pedidos normalmente iniciam em {delivery}. A entrega é distribuída naturalmente para proteger a saúde da conta. Todos os pacotes incluem suporte {brand} e acompanhamento transparente no painel."),
        s("Preços e opções de pagamento", "Escolha entre níveis predefinidos até {maxQty} {unit}. Pague com cartão, criptomoeda ou pontos ganhos ({pointsRate} pontos por 1 $). Níveis maiores reduzem automaticamente o preço por unidade."),
        s("Como encomendar {title}", "Selecione um tamanho de pacote, introduza o utilizador ou link {platform} e conclua o checkout. Também pode ganhar pontos com tarefas grátis e usá-los em serviços pagos. Acompanhe o estado na página de pedidos."),
      ],
      faq: [
        f("É seguro comprar {typeLower} de {platform}?", "Sim. Nunca pedimos a palavra-passe. A entrega é gradual e concebida para parecer natural. Milhares de pedidos são processados diariamente em {brand}."),
        f("Quão rápido inicia o meu pedido?", "A maioria dos pedidos de {keyword} começa em {delivery}. O tempo de conclusão depende do tamanho do pacote e da fila atual."),
        f("Posso pagar com pontos em vez de dinheiro?", "Sim. Ganhe pontos ao completar tarefas e gaste-os no checkout. Os preços em pontos aparecem junto ao USD em cada nível."),
        f("E se precisar de ajuda com o meu pedido?", "Contacte o nosso suporte 24/7 por chat ao vivo ou WhatsApp. Indique o ID do pedido e o utilizador para resolução mais rápida."),
      ],
    },
  ),
  "pt-br": tpl(
    {
      metaTitle: "{title} — Teste {amount} {unit} | {brand}",
      description: "Ganhe {amount} {unit} {keyword} no {brand}. Complete tarefas simples, acumule pontos e resgate — sem senha.",
      focusKeyword: "{type} de {platform} grátis",
      intro: "{keyword} permite testar crescimento real no {platform} sem pagar adiantado. No {brand}, você ganha pontos completando microtarefas e resgata por um pacote de teste de {amount} {unit}. Nunca pedimos sua senha — apenas seu nome de usuário público ou link do perfil.",
      sections: [
        s("O que são {type} de {platform} grátis?", "Os {typeLower} grátis no {platform} ajudam a construir prova social antes de investir em pacotes maiores. Nosso teste de {amount} {unit} serve para avaliar velocidade e qualidade da entrega. {keyword} é ideal para novos criadores, pequenos negócios e quem explora crescimento SMM por tarefas."),
        s("Como obter {title}", "Cadastre-se grátis, veja as tarefas disponíveis e envie a prova ao concluir. Tarefas aprovadas creditam pontos no seu saldo. Quando tiver pontos suficientes (este serviço custa cerca de {points} pontos), abra o formulário, informe o usuário e confirme. A entrega normalmente começa em 0–24 horas."),
        s("Por que escolher {brand} para crescimento grátis", "{brand} combina economia de tarefas com catálogo pago completo em 24 plataformas. Comece com {keyword} e escale com pacotes acessíveis ou continue ganhando com tarefas diárias. Suporte 24/7 por chat ao vivo e WhatsApp."),
        s("Grátis vs pago: {type} de {platform}", "Testes grátis usam pontos ganhos e servem para experimentar. Pacotes pagos entregam quantidades maiores na hora com cartão, cripto ou pontos no checkout. Muitos pedem um teste grátis primeiro e fazem upgrade ao ver resultados."),
      ],
      faq: [
        f("{keyword} é realmente grátis?", "Sim. Você ganha pontos completando tarefas — sem cartão de crédito. Este pacote de {amount} {unit} custa aproximadamente {points} pontos para resgatar."),
        f("Preciso compartilhar minha senha do {platform}?", "Nunca. Só precisamos do nome de usuário público ou URL do perfil. {brand} nunca pedirá sua senha."),
        f("Quanto tempo leva a entrega de {typeLower} grátis?", "A maioria dos pedidos grátis começa em 0–24 horas. Filas maiores podem estender um pouco a conclusão; a entrega é gradual e segura para a conta."),
        f("Posso pedir {typeLower} grátis mais de uma vez?", "Testes grátis são limitados por serviço para manter a equidade. Explore outros serviços grátis na mesma plataforma ou faça upgrade para um pacote pago."),
      ],
    },
    {
      metaTitle: "{title} — A partir de {startPrice} | {brand}",
      description: "Compre {keyword} a partir de {startPrice}. Entrega instantânea em {delivery}. Pague com cartão, cripto ou pontos. Crescimento {platform} confiável — sem senha.",
      focusKeyword: "comprar {type} de {platform}",
      intro: "{keyword} no {brand} entrega {unit} reais com distribuição rápida e gradual. Pacotes começam em {startQty} {unit} por {startPrice}. Informe seu usuário, escolha um nível e pague com segurança — nunca pedimos sua senha.",
      sections: [
        s("Por que comprar {type} de {platform}?", "Os {type} no {platform} sinalizam popularidade e confiança. Números maiores melhoram a primeira impressão, incentivam engajamento orgânico e ajudam o conteúdo a alcançar mais pessoas. {keyword} é uma forma rápida de ganhar impulso ao lançar perfil, campanha ou produto."),
        s("Entrega e qualidade", "Pedidos normalmente começam em {delivery}. A entrega é distribuída naturalmente para proteger a saúde da conta. Todos os pacotes incluem suporte {brand} e acompanhamento transparente no painel."),
        s("Preços e opções de pagamento", "Escolha entre níveis predefinidos até {maxQty} {unit}. Pague com cartão, criptomoeda ou pontos ganhos ({pointsRate} pontos por 1 $). Níveis maiores reduzem automaticamente o preço por unidade."),
        s("Como pedir {title}", "Selecione um tamanho de pacote, informe seu usuário ou link {platform} e conclua o checkout. Também pode ganhar pontos com tarefas grátis e usá-los em serviços pagos. Acompanhe o status na página de pedidos."),
      ],
      faq: [
        f("É seguro comprar {typeLower} de {platform}?", "Sim. Nunca pedimos sua senha. A entrega é gradual e feita para parecer natural. Milhares de pedidos são processados diariamente no {brand}."),
        f("Quão rápido meu pedido começa?", "A maioria dos pedidos de {keyword} inicia em {delivery}. O tempo de conclusão depende do tamanho do pacote e da fila atual."),
        f("Posso pagar com pontos em vez de dinheiro?", "Sim. Ganhe pontos completando tarefas e gaste no checkout. Preços em pontos aparecem junto ao USD em cada nível."),
        f("E se eu precisar de ajuda com meu pedido?", "Contate nosso suporte 24/7 por chat ao vivo ou WhatsApp. Informe o ID do pedido e usuário para resolução mais rápida."),
      ],
    },
  ),
  it: tpl(
    {
      metaTitle: "{title} — Prova {amount} {unit} | {brand}",
      description: "Ottieni {amount} {unit} {keyword} su {brand}. Completa compiti semplici, guadagna punti e riscatta — nessuna password richiesta.",
      focusKeyword: "{type} {platform} gratis",
      intro: "{keyword} ti permette di testare una crescita reale su {platform} senza pagare in anticipo. Su {brand} guadagni punti completando micro-compiti e li riscatti per un pacchetto di prova da {amount} {unit}. Non chiediamo mai la password — solo username pubblico o link del profilo.",
      sections: [
        s("Cosa sono i {type} {platform} gratis?", "I {typeLower} gratis su {platform} aiutano a costruire prova sociale prima di investire in pacchetti più grandi. La nostra prova da {amount} {unit} serve a testare velocità e qualità di consegna. {keyword} è ideale per nuovi creator, piccole imprese e chi esplora la crescita SMM basata su compiti."),
        s("Come ottenere {title}", "Registrati gratis, consulta i compiti disponibili e invia la prova al termine. I compiti approvati accreditano punti sul saldo. Quando ne hai abbastanza (questo servizio costa circa {points} punti), apri il modulo, inserisci lo username e conferma. La consegna di solito inizia entro 0–24 ore."),
        s("Perché scegliere {brand} per la crescita gratis", "{brand} combina un'economia di compiti con un catalogo a pagamento completo su 24 piattaforme. Inizia con {keyword} e scala con pacchetti convenienti o continua a guadagnare con compiti giornalieri. Supporto 24/7 via chat live e WhatsApp."),
        s("Gratis vs a pagamento: {type} {platform}", "Le prove gratis usano punti guadagnati e servono per testare. I pacchetti a pagamento consegnano quantità maggiori subito con carta, crypto o punti al checkout. Molti richiedono prima una prova gratis e poi passano al livello superiore vedendo i risultati."),
      ],
      faq: [
        f("{keyword} è davvero gratis?", "Sì. Guadagni punti completando compiti — nessuna carta di credito. Questo pacchetto da {amount} {unit} costa circa {points} punti da riscattare."),
        f("Devo condividere la password di {platform}?", "Mai. Ci serve solo lo username pubblico o l'URL del profilo. {brand} non chiederà mai la password."),
        f("Quanto tempo richiede la consegna di {typeLower} gratis?", "La maggior parte degli ordini gratis inizia entro 0–24 ore. Code più lunghe possono allungare leggermente i tempi; la consegna resta graduale e sicura per l'account."),
        f("Posso ordinare {typeLower} gratis più di una volta?", "Le prove gratis sono limitate per servizio per mantenere equità. Esplora altri servizi gratis sulla stessa piattaforma o passa a un pacchetto a pagamento."),
      ],
    },
    {
      metaTitle: "{title} — Da {startPrice} | {brand}",
      description: "Compra {keyword} da {startPrice}. Consegna istantanea in {delivery}. Paga con carta, crypto o punti. Crescita {platform} affidabile — nessuna password.",
      focusKeyword: "compra {type} {platform}",
      intro: "{keyword} su {brand} consegna {unit} reali con distribuzione rapida e graduale. I pacchetti partono da {startQty} {unit} a {startPrice}. Inserisci lo username, scegli un livello e paga in sicurezza — non chiediamo mai la password.",
      sections: [
        s("Perché comprare {type} {platform}?", "I {type} su {platform} segnalano popolarità e fiducia. Numeri più alti migliorano la prima impressione, incoraggiano l'engagement organico e aiutano i contenuti a raggiungere più persone. {keyword} è un modo rapido per prendere slancio al lancio di profilo, campagna o prodotto."),
        s("Consegna e qualità", "Gli ordini di solito iniziano entro {delivery}. La consegna è distribuita naturalmente per proteggere la salute dell'account. Tutti i pacchetti includono supporto {brand} e tracciamento trasparente nella dashboard."),
        s("Prezzi e opzioni di pagamento", "Scegli tra livelli predefiniti fino a {maxQty} {unit}. Paga con carta, criptovaluta o punti guadagnati ({pointsRate} punti per 1 $). I livelli maggiori riducono automaticamente il prezzo unitario."),
        s("Come ordinare {title}", "Seleziona una dimensione del pacchetto, inserisci username o link {platform} e completa il checkout. Puoi anche guadagnare punti con compiti gratis e usarli per servizi a pagamento. Segui lo stato dalla pagina ordini."),
      ],
      faq: [
        f("È sicuro comprare {typeLower} {platform}?", "Sì. Non chiediamo mai la password. La consegna è graduale e pensata per sembrare naturale. Migliaia di ordini vengono elaborati ogni giorno su {brand}."),
        f("Quanto velocemente inizia il mio ordine?", "La maggior parte degli ordini {keyword} inizia entro {delivery}. I tempi di completamento dipendono dalla dimensione del pacchetto e dalla coda attuale."),
        f("Posso pagare con punti invece che con denaro?", "Sì. Guadagna punti completando compiti e spendili al checkout. I prezzi in punti sono mostrati accanto all'USD per ogni livello."),
        f("Cosa fare se ho bisogno di aiuto con il mio ordine?", "Contatta il nostro supporto 24/7 via chat live o WhatsApp. Fornisci ID ordine e username per una risoluzione più rapida."),
      ],
    },
  ),
  nl: tpl(
    {
      metaTitle: "{title} — {amount} {unit} proef | {brand}",
      description: "Claim {amount} {unit} {keyword} op {brand}. Voltooi eenvoudige taken, verdien punten en wissel in — geen wachtwoord nodig.",
      focusKeyword: "gratis {platform} {type}",
      intro: "{keyword} laat je echte groei op {platform} testen zonder vooraf te betalen. Op {brand} verdien je punten door microtaken te voltooien en wisselt ze in voor een proefpakket van {amount} {unit}. We vragen nooit om je wachtwoord — alleen je openbare gebruikersnaam of profiellink.",
      sections: [
        s("Wat zijn gratis {platform} {type}?", "Gratis {typeLower} op {platform} helpen social proof op te bouwen voordat je in grotere pakketten investeert. Onze proef van {amount} {unit} is bedoeld om leversnelheid en kwaliteit te testen. {keyword} is ideaal voor nieuwe creators, kleine bedrijven en iedereen die taakgebaseerde SMM-groei verkent."),
        s("Hoe claim je {title}", "Registreer gratis, bekijk beschikbare taken en dien bewijs in wanneer je klaar bent. Goedgekeurde taken crediteren punten op je saldo. Zodra je genoeg punten hebt (deze service kost ongeveer {points} punten), open je het bestelformulier, voer je je gebruikersnaam in en bevestig je. Levering start meestal binnen 0–24 uur."),
        s("Waarom {brand} voor gratis groei", "{brand} combineert een taakeconomie met een volledige betaalde catalogus over 24 platforms. Begin met {keyword} en schaal op met betaalbare pakketten of blijf verdienen via dagelijkse taken. Support 24/7 via live chat en WhatsApp."),
        s("Gratis vs betaald {platform} {type}", "Gratis proeven gebruiken verdiende punten en zijn perfect om te testen. Betaalde pakketten leveren grotere hoeveelheden direct via kaart, crypto of punten bij checkout. Veel leden claimen eerst een gratis proef en upgraden wanneer ze resultaten zien."),
      ],
      faq: [
        f("Is {keyword} echt gratis?", "Ja. Je verdient punten door taken te voltooien — geen creditcard nodig. Dit pakket van {amount} {unit} kost ongeveer {points} punten om in te wisselen."),
        f("Moet ik mijn {platform}-wachtwoord delen?", "Nooit. We hebben alleen je openbare gebruikersnaam of profiel-URL nodig. {brand} vraagt nooit om je wachtwoord."),
        f("Hoe lang duurt levering van gratis {typeLower}?", "De meeste gratis bestellingen starten binnen 0–24 uur. Langere wachtrijen kunnen voltooiing iets verlengen; levering verloopt geleidelijk en veilig voor je account."),
        f("Kan ik gratis {typeLower} meer dan eens bestellen?", "Gratis proeven zijn per service beperkt om het systeem eerlijk te houden. Verken andere gratis services op hetzelfde platform of upgrade naar een betaald pakket."),
      ],
    },
    {
      metaTitle: "{title} — Vanaf {startPrice} | {brand}",
      description: "Koop {keyword} vanaf {startPrice}. Directe levering in {delivery}. Betaal met kaart, crypto of punten. Betrouwbare {platform}-groei — geen wachtwoord nodig.",
      focusKeyword: "koop {platform} {type}",
      intro: "{keyword} op {brand} levert echte {unit} met snelle, geleidelijke distributie. Pakketten starten bij {startQty} {unit} voor {startPrice}. Voer je gebruikersnaam in, kies een tier en betaal veilig — we vragen nooit om je wachtwoord.",
      sections: [
        s("Waarom {platform} {type} kopen?", "{type} op {platform} signaleren populariteit en vertrouwen. Hogere aantallen verbeteren de eerste indruk, stimuleren organisch engagement en helpen content meer mensen te bereiken. {keyword} is een snelle manier om momentum op te bouwen bij een profiel, campagne of productlancering."),
        s("Levering en kwaliteit", "Bestellingen starten meestal binnen {delivery}. Levering wordt natuurlijk gespreid om accountgezondheid te beschermen. Alle pakketten worden ondersteund door {brand} met transparante ordertracking in je dashboard."),
        s("Prijzen en betaalopties", "Kies uit vooraf ingestelde tiers tot {maxQty} {unit}. Betaal met kaart, cryptocurrency of verdiende punten ({pointsRate} punten per $1). Grotere tiers verlagen automatisch de prijs per eenheid."),
        s("Hoe bestel je {title}", "Selecteer een pakketgrootte, voer je {platform}-gebruikersnaam of link in en rond checkout af. Je kunt ook punten verdienen via gratis taken en die gebruiken voor betaalde services. Volg status op je bestellingenpagina."),
      ],
      faq: [
        f("Is het veilig om {platform} {typeLower} te kopen?", "Ja. We vragen nooit om je wachtwoord. Levering is geleidelijk en ontworpen om natuurlijk te lijken. Duizenden bestellingen worden dagelijks verwerkt op {brand}."),
        f("Hoe snel start mijn bestelling?", "De meeste {keyword}-bestellingen beginnen binnen {delivery}. Voltooiingstijd hangt af van pakketgrootte en huidige wachtrij."),
        f("Kan ik met punten betalen in plaats van geld?", "Ja. Verdien punten door taken te voltooien en besteed ze bij checkout. Puntenprijzen staan naast USD voor elke tier."),
        f("Wat als ik hulp nodig heb bij mijn bestelling?", "Neem contact op met onze 24/7-support via live chat of WhatsApp. Geef bestel-ID en gebruikersnaam voor de snelste oplossing."),
      ],
    },
  ),
  pl: tpl(
    {
      metaTitle: "{title} — Próbka {amount} {unit} | {brand}",
      description: "Odbierz {amount} {unit} {keyword} na {brand}. Wykonuj proste zadania, zdobywaj punkty i wymieniaj — bez hasła.",
      focusKeyword: "darmowe {type} {platform}",
      intro: "{keyword} pozwala przetestować prawdziwy wzrost na {platform} bez wcześniejszej płatności. Na {brand} zdobywasz punkty za mikrozadania i wymieniasz je na pakiet próbny {amount} {unit}. Nigdy nie prosimy o hasło — tylko o publiczną nazwę użytkownika lub link do profilu.",
      sections: [
        s("Czym są darmowe {type} {platform}?", "Darmowe {typeLower} na {platform} pomagają zbudować dowód społeczny przed inwestycją w większe pakiety. Nasza próbka {amount} {unit} służy do testu szybkości i jakości dostawy. {keyword} jest idealne dla nowych twórców, małych firm i osób odkrywających wzrost SMM oparty na zadaniach."),
        s("Jak odebrać {title}", "Zarejestruj się za darmo, przeglądaj dostępne zadania i prześlij dowód po ukończeniu. Zatwierdzone zadania dodają punkty do salda. Gdy masz wystarczająco (ten serwis kosztuje około {points} punktów), otwórz formularz, podaj nazwę użytkownika i potwierdź. Dostawa zwykle startuje w 0–24 godziny."),
        s("Dlaczego {brand} do darmowego wzrostu", "{brand} łączy ekonomię zadań z pełnym płatnym katalogiem na 24 platformach. Zacznij od {keyword}, potem skaluj tańszymi pakietami lub zdobywaj punkty codziennymi zadaniami. Wsparcie 24/7 przez czat na żywo i WhatsApp."),
        s("Darmowe vs płatne {type} {platform}", "Darmowe próbki używają zdobytych punktów i służą do testów. Płatne pakiety dostarczają większe ilości od razu kartą, krypto lub punktami przy kasie. Wielu najpierw odbiera darmową próbkę, a potem przechodzi na wyższy poziom po zobaczeniu wyników."),
      ],
      faq: [
        f("Czy {keyword} jest naprawdę darmowe?", "Tak. Zdobywasz punkty wykonując zadania — karta kredytowa nie jest wymagana. Ten pakiet {amount} {unit} kosztuje około {points} punktów do wymiany."),
        f("Czy muszę podać hasło do {platform}?", "Nigdy. Potrzebujemy tylko publicznej nazwy użytkownika lub URL profilu. {brand} nigdy nie poprosi o hasło."),
        f("Ile trwa dostawa darmowych {typeLower}?", "Większość darmowych zamówień startuje w 0–24 godziny. Dłuższe kolejki mogą nieco wydłużyć ukończenie; dostawa jest stopniowa i bezpieczna dla konta."),
        f("Czy mogę zamówić darmowe {typeLower} więcej niż raz?", "Darmowe próbki są ograniczone na serwis, aby system był sprawiedliwy. Sprawdź inne darmowe usługi na tej samej platformie lub przejdź na pakiet płatny."),
      ],
    },
    {
      metaTitle: "{title} — Od {startPrice} | {brand}",
      description: "Kup {keyword} od {startPrice}. Natychmiastowa dostawa w {delivery}. Płać kartą, krypto lub punktami. Zaufany wzrost {platform} — bez hasła.",
      focusKeyword: "kup {type} {platform}",
      intro: "{keyword} na {brand} dostarcza prawdziwe {unit} z szybką, stopniową dystrybucją. Pakiety zaczynają się od {startQty} {unit} za {startPrice}. Podaj nazwę użytkownika, wybierz poziom i zapłać bezpiecznie — nigdy nie prosimy o hasło.",
      sections: [
        s("Dlaczego kupować {type} {platform}?", "{type} na {platform} sygnalizują popularność i zaufanie. Wyższe liczby poprawiają pierwsze wrażenie, zachęcają do organicznego zaangażowania i pomagają treściom dotrzeć do szerszej publiczności. {keyword} to szybki sposób na rozpędzenie profilu, kampanii lub produktu."),
        s("Dostawa i jakość", "Zamówienia zwykle startują w {delivery}. Dostawa jest rozłożona naturalnie, aby chronić konto. Wszystkie pakiety mają wsparcie {brand} i przejrzyste śledzenie w panelu."),
        s("Ceny i opcje płatności", "Wybierz spośród gotowych poziomów do {maxQty} {unit}. Płać kartą, kryptowalutą lub zdobytymi punktami ({pointsRate} punktów za 1 $). Większe poziomy automatycznie obniżają cenę jednostkową."),
        s("Jak zamówić {title}", "Wybierz rozmiar pakietu, podaj nazwę użytkownika lub link {platform} i dokończ checkout. Możesz też zdobywać punkty darmowymi zadaniami i wydawać je na płatne usługi. Status śledzisz na stronie zamówień."),
      ],
      faq: [
        f("Czy bezpiecznie jest kupować {typeLower} {platform}?", "Tak. Nigdy nie prosimy o hasło. Dostawa jest stopniowa i wygląda naturalnie. Tysiące zamówień jest przetwarzanych codziennie na {brand}."),
        f("Jak szybko startuje moje zamówienie?", "Większość zamówień {keyword} zaczyna się w {delivery}. Czas ukończenia zależy od rozmiaru pakietu i aktualnej kolejki."),
        f("Czy mogę płacić punktami zamiast pieniędzy?", "Tak. Zdobywaj punkty wykonując zadania i wydawaj je przy kasie. Ceny w punktach są obok USD dla każdego poziomu."),
        f("Co jeśli potrzebuję pomocy z zamówieniem?", "Skontaktuj się z naszym wsparciem 24/7 przez czat na żywo lub WhatsApp. Podaj ID zamówienia i nazwę użytkownika dla szybszej pomocy."),
      ],
    },
  ),
  ro: tpl(
    {
      metaTitle: "{title} — Test {amount} {unit} | {brand}",
      description: "Obține {amount} {unit} {keyword} pe {brand}. Finalizează sarcini simple, câștigă puncte și răscumpără — fără parolă.",
      focusKeyword: "{type} {platform} gratuite",
      intro: "{keyword} îți permite să testezi creștere reală pe {platform} fără plată în avans. Pe {brand} câștigi puncte completând micro-sarcini și le răscumperi pentru un pachet de test de {amount} {unit}. Nu cerem niciodată parola — doar numele de utilizator public sau linkul profilului.",
      sections: [
        s("Ce sunt {type} {platform} gratuite?", "{typeLower} gratuite pe {platform} te ajută să construiești dovadă socială înainte de a investi în pachete mai mari. Testul nostru de {amount} {unit} servește pentru a evalua viteza și calitatea livrării. {keyword} este ideal pentru creatori noi, afaceri mici și cei care explorează creșterea SMM bazată pe sarcini."),
        s("Cum obții {title}", "Înregistrează-te gratuit, vezi sarcinile disponibile și trimite dovada când termini. Sarcinile aprobate creditează puncte în sold. Când ai suficiente (acest serviciu costă aproximativ {points} puncte), deschide formularul, introdu utilizatorul și confirmă. Livrarea începe de obicei în 0–24 ore."),
        s("De ce {brand} pentru creștere gratuită", "{brand} combină o economie de sarcini cu un catalog plătit complet pe 24 platforme. Începe cu {keyword}, apoi scalează cu pachete accesibile sau continuă să câștigi prin sarcini zilnice. Suport 24/7 prin chat live și WhatsApp."),
        s("Gratuit vs plătit: {type} {platform}", "Testele gratuite folosesc puncte câștigate și sunt perfecte pentru testare. Pachetele plătite livrează cantități mai mari instant cu card, cripto sau puncte la checkout. Mulți solicită mai întâi un test gratuit, apoi trec la nivel superior când văd rezultate."),
      ],
      faq: [
        f("{keyword} este cu adevărat gratuit?", "Da. Câștigi puncte completând sarcini — fără card de credit. Acest pachet de {amount} {unit} costă aproximativ {points} puncte de răscumpărat."),
        f("Trebuie să împărtășesc parola {platform}?", "Niciodată. Avem nevoie doar de numele de utilizator public sau URL-ul profilului. {brand} nu va cere niciodată parola."),
        f("Cât durează livrarea {typeLower} gratuite?", "Majoritatea comenzilor gratuite încep în 0–24 ore. Cozi mai lungi pot prelungi ușor finalizarea; livrarea este graduală și sigură pentru cont."),
        f("Pot comanda {typeLower} gratuite de mai multe ori?", "Testele gratuite sunt limitate per serviciu pentru echitate. Explorează alte servicii gratuite pe aceeași platformă sau treci la un pachet plătit."),
      ],
    },
    {
      metaTitle: "{title} — De la {startPrice} | {brand}",
      description: "Cumpără {keyword} de la {startPrice}. Livrare instant în {delivery}. Plătește cu card, cripto sau puncte. Creștere {platform} de încredere — fără parolă.",
      focusKeyword: "cumpără {type} {platform}",
      intro: "{keyword} pe {brand} livrează {unit} reale cu distribuție rapidă și graduală. Pachetele încep de la {startQty} {unit} pentru {startPrice}. Introdu utilizatorul, alege un nivel și plătește în siguranță — nu cerem niciodată parola.",
      sections: [
        s("De ce cumpăra {type} {platform}?", "{type} pe {platform} semnalează popularitate și încredere. Numere mai mari îmbunătățesc prima impresie, încurajează engagement organic și ajută conținutul să ajungă la mai mulți oameni. {keyword} este o modalitate rapidă de a lua avânt la lansarea unui profil, campanie sau produs."),
        s("Livrare și calitate", "Comenzile încep de obicei în {delivery}. Livrarea este distribuită natural pentru a proteja sănătatea contului. Toate pachetele includ suport {brand} și urmărire transparentă în panou."),
        s("Prețuri și opțiuni de plată", "Alege din niveluri predefinite până la {maxQty} {unit}. Plătește cu card, criptomonedă sau puncte câștigate ({pointsRate} puncte per 1 $). Nivelurile mari reduc automat prețul pe unitate."),
        s("Cum comanzi {title}", "Selectează mărimea pachetului, introdu utilizatorul sau linkul {platform} și finalizează checkout-ul. Poți câștiga puncte prin sarcini gratuite și le folosi pentru servicii plătite. Urmărește statusul pe pagina comenzilor."),
      ],
      faq: [
        f("Este sigur să cumperi {typeLower} {platform}?", "Da. Nu cerem niciodată parola. Livrarea este graduală și concepută să pară naturală. Mii de comenzi sunt procesate zilnic pe {brand}."),
        f("Cât de repede începe comanda mea?", "Majoritatea comenzilor {keyword} încep în {delivery}. Timpul de finalizare depinde de mărimea pachetului și coada curentă."),
        f("Pot plăti cu puncte în loc de bani?", "Da. Câștigă puncte completând sarcini și cheltuiește-le la checkout. Prețurile în puncte apar lângă USD pentru fiecare nivel."),
        f("Ce fac dacă am nevoie de ajutor cu comanda?", "Contactează suportul nostru 24/7 prin chat live sau WhatsApp. Oferă ID-ul comenzii și utilizatorul pentru rezolvare rapidă."),
      ],
    },
  ),
  ru: tpl(
    {
      metaTitle: "{title} — Тест {amount} {unit} | {brand}",
      description: "Получите {amount} {unit} {keyword} на {brand}. Выполняйте простые задания, зарабатывайте баллы и обменивайте — пароль не нужен.",
      focusKeyword: "бесплатные {type} {platform}",
      intro: "{keyword} позволяет протестировать реальный рост на {platform} без предоплаты. На {brand} вы зарабатываете баллы за микрозадания и обмениваете их на пробный пакет {amount} {unit}. Мы никогда не просим пароль — только публичное имя пользователя или ссылку на профиль.",
      sections: [
        s("Что такое бесплатные {type} {platform}?", "Бесплатные {typeLower} на {platform} помогают создать социальное доказательство до покупки больших пакетов. Наш тест {amount} {unit} подходит для проверки скорости и качества доставки. {keyword} идеален для новых авторов, малого бизнеса и тех, кто изучает SMM-рост через задания."),
        s("Как получить {title}", "Зарегистрируйтесь бесплатно, просмотрите доступные задания и отправьте подтверждение после выполнения. Одобренные задания начисляют баллы на баланс. Когда наберёте достаточно (этот сервис стоит около {points} баллов), откройте форму, введите имя пользователя и подтвердите. Доставка обычно начинается в течение 0–24 часов."),
        s("Почему {brand} для бесплатного роста", "{brand} сочетает экономику заданий с полным платным каталогом на 24 платформах. Начните с {keyword}, затем масштабируйтесь доступными пакетами или продолжайте зарабатывать ежедневными заданиями. Поддержка 24/7 через чат и WhatsApp."),
        s("Бесплатно vs платно: {type} {platform}", "Бесплатные тесты используют заработанные баллы и подходят для проверки. Платные пакеты доставляют большие объёмы сразу картой, криптовалютой или баллами при оплате. Многие сначала берут бесплатный тест, а затем переходят на платный после результатов."),
      ],
      faq: [
        f("{keyword} действительно бесплатно?", "Да. Вы зарабатываете баллы выполняя задания — кредитная карта не нужна. Этот пакет {amount} {unit} стоит около {points} баллов для обмена."),
        f("Нужно ли делиться паролем {platform}?", "Никогда. Нам нужны только публичное имя пользователя или URL профиля. {brand} никогда не попросит пароль."),
        f("Сколько длится доставка бесплатных {typeLower}?", "Большинство бесплатных заказов начинаются в течение 0–24 часов. Длинные очереди могут немного продлить завершение; доставка постепенная и безопасна для аккаунта."),
        f("Можно ли заказать бесплатные {typeLower} несколько раз?", "Бесплатные тесты ограничены для каждого сервиса ради справедливости. Попробуйте другие бесплатные сервисы на той же платформе или перейдите на платный пакет."),
      ],
    },
    {
      metaTitle: "{title} — От {startPrice} | {brand}",
      description: "Купите {keyword} от {startPrice}. Мгновенная доставка за {delivery}. Оплата картой, криптовалютой или баллами. Надёжный рост {platform} — пароль не нужен.",
      focusKeyword: "купить {type} {platform}",
      intro: "{keyword} на {brand} доставляет настоящие {unit} с быстрой постепенной подачей. Пакеты начинаются от {startQty} {unit} за {startPrice}. Введите имя пользователя, выберите уровень и оплатите безопасно — мы никогда не просим пароль.",
      sections: [
        s("Зачем покупать {type} {platform}?", "{type} на {platform} показывают популярность и доверие. Большие числа улучшают первое впечатление, стимулируют органическое вовлечение и помогают контенту охватить больше людей. {keyword} — быстрый способ набрать импульс при запуске профиля, кампании или продукта."),
        s("Доставка и качество", "Заказы обычно начинаются в течение {delivery}. Доставка распределяется естественно для защиты аккаунта. Все пакеты поддерживаются {brand} с прозрачным отслеживанием в панели."),
        s("Цены и способы оплаты", "Выберите из готовых уровней до {maxQty} {unit}. Оплатите картой, криптовалютой или заработанными баллами ({pointsRate} баллов за 1 $). Большие уровни автоматически снижают цену за единицу."),
        s("Как заказать {title}", "Выберите размер пакета, введите имя пользователя или ссылку {platform} и завершите оплату. Также можно зарабатывать баллы бесплатными заданиями и тратить их на платные сервисы. Статус отслеживайте на странице заказов."),
      ],
      faq: [
        f("Безопасно ли покупать {typeLower} {platform}?", "Да. Мы никогда не просим пароль. Доставка постепенная и выглядит естественно. Тысячи заказов обрабатываются ежедневно на {brand}."),
        f("Как быстро начнётся мой заказ?", "Большинство заказов {keyword} начинаются в течение {delivery}. Время завершения зависит от размера пакета и текущей очереди."),
        f("Можно ли платить баллами вместо денег?", "Да. Зарабатывайте баллы выполняя задания и тратьте их при оплате. Цены в баллах показаны рядом с USD для каждого уровня."),
        f("Что делать, если нужна помощь с заказом?", "Свяжитесь с поддержкой 24/7 через чат или WhatsApp. Укажите ID заказа и имя пользователя для быстрого решения."),
      ],
    },
  ),
  uk: tpl(
    {
      metaTitle: "{title} — Тест {amount} {unit} | {brand}",
      description: "Отримайте {amount} {unit} {keyword} на {brand}. Виконуйте прості завдання, заробляйте бали та обмінюйте — пароль не потрібен.",
      focusKeyword: "безкоштовні {type} {platform}",
      intro: "{keyword} дає змогу протестувати справжній ріст на {platform} без передоплати. На {brand} ви заробляєте бали за мікрозавдання та обмінюєте їх на пробний пакет {amount} {unit}. Ми ніколи не просимо пароль — лише публічне ім'я користувача або посилання на профіль.",
      sections: [
        s("Що таке безкоштовні {type} {platform}?", "Безкоштовні {typeLower} на {platform} допомагають створити соціальний доказ перед інвестицією в більші пакети. Наш тест {amount} {unit} слугує для перевірки швидкості та якості доставки. {keyword} ідеальний для нових авторів, малого бізнесу та тих, хто досліджує SMM-ріст через завдання."),
        s("Як отримати {title}", "Зареєструйтеся безкоштовно, перегляньте доступні завдання та надішліть підтвердження після виконання. Схвалені завдання нараховують бали на баланс. Коли наберете достатньо (цей сервіс коштує близько {points} балів), відкрийте форму, введіть ім'я користувача та підтвердіть. Доставка зазвичай починається протягом 0–24 годин."),
        s("Чому {brand} для безкоштовного росту", "{brand} поєднує економіку завдань із повним платним каталогом на 24 платформах. Почніть з {keyword}, потім масштабуйтеся доступними пакетами або продовжуйте заробляти щоденними завданнями. Підтримка 24/7 через чат і WhatsApp."),
        s("Безкоштовно vs платно: {type} {platform}", "Безкоштовні тести використовують зароблені бали і підходять для перевірки. Платні пакети доставляють більші обсяги одразу карткою, криптовалютою або балами при оплаті. Багато хто спочатку бере безкоштовний тест, а потім переходить на платний після результатів."),
      ],
      faq: [
        f("{keyword} справді безкоштовно?", "Так. Ви заробляєте бали виконуючи завдання — кредитна картка не потрібна. Цей пакет {amount} {unit} коштує близько {points} балів для обміну."),
        f("Чи потрібно ділитися паролем {platform}?", "Ніколи. Нам потрібні лише публічне ім'я користувача або URL профілю. {brand} ніколи не попросить пароль."),
        f("Скільки триває доставка безкоштовних {typeLower}?", "Більшість безкоштовних замовлень починаються протягом 0–24 годин. Довгі черги можуть трохи подовжити завершення; доставка поступова і безпечна для акаунта."),
        f("Чи можна замовити безкоштовні {typeLower} кілька разів?", "Безкоштовні тести обмежені для кожного сервісу заради справедливості. Спробуйте інші безкоштовні сервіси на тій самій платформі або перейдіть на платний пакет."),
      ],
    },
    {
      metaTitle: "{title} — Від {startPrice} | {brand}",
      description: "Купіть {keyword} від {startPrice}. Миттєва доставка за {delivery}. Оплата карткою, криптовалютою або балами. Надійний ріст {platform} — пароль не потрібен.",
      focusKeyword: "купити {type} {platform}",
      intro: "{keyword} на {brand} доставляє справжні {unit} із швидкою поступовою подачею. Пакети починаються від {startQty} {unit} за {startPrice}. Введіть ім'я користувача, оберіть рівень і оплатіть безпечно — ми ніколи не просимо пароль.",
      sections: [
        s("Навіщо купувати {type} {platform}?", "{type} на {platform} показують популярність і довіру. Більші числа покращують перше враження, стимулюють органічну залученість і допомагають контенту охопити більше людей. {keyword} — швидкий спосіб набрати імпульс при запуску профілю, кампанії або продукту."),
        s("Доставка та якість", "Замовлення зазвичай починаються протягом {delivery}. Доставка розподіляється природно для захисту акаунта. Усі пакети підтримуються {brand} із прозорим відстеженням у панелі."),
        s("Ціни та способи оплати", "Оберіть із готових рівнів до {maxQty} {unit}. Оплатіть карткою, криптовалютою або заробленими балами ({pointsRate} балів за 1 $). Більші рівні автоматично знижують ціну за одиницю."),
        s("Як замовити {title}", "Оберіть розмір пакета, введіть ім'я користувача або посилання {platform} і завершіть оплату. Також можна заробляти бали безкоштовними завданнями та витрачати їх на платні сервіси. Статус відстежуйте на сторінці замовлень."),
      ],
      faq: [
        f("Чи безпечно купувати {typeLower} {platform}?", "Так. Ми ніколи не просимо пароль. Доставка поступова і виглядає природно. Тисячі замовлень обробляються щодня на {brand}."),
        f("Як швидко почнеться моє замовлення?", "Більшість замовлень {keyword} починаються протягом {delivery}. Час завершення залежить від розміру пакета та поточної черги."),
        f("Чи можна платити балами замість грошей?", "Так. Заробляйте бали виконуючи завдання та витрачайте їх при оплаті. Ціни в балах показані поруч із USD для кожного рівня."),
        f("Що робити, якщо потрібна допомога з замовленням?", "Зв'яжіться з підтримкою 24/7 через чат або WhatsApp. Вкажіть ID замовлення та ім'я користувача для швидкого вирішення."),
      ],
    },
  ),
  tr: tpl(
    {
      metaTitle: "{title} — {amount} {unit} Deneme | {brand}",
      description: "{brand}'da {amount} {unit} {keyword} alın. Basit görevleri tamamlayın, puan kazanın ve kullanın — şifre gerekmez.",
      focusKeyword: "ücretsiz {platform} {type}",
      intro: "{keyword}, {platform}'da önceden ödeme yapmadan gerçek büyümeyi test etmenizi sağlar. {brand}'da mikro görevlerle puan kazanır ve {amount} {unit} deneme paketi için kullanırsınız. Asla şifrenizi istemeyiz — yalnızca herkese açık kullanıcı adınız veya profil bağlantınız.",
      sections: [
        s("Ücretsiz {platform} {type} nedir?", "{platform}'daki ücretsiz {typeLower}, daha büyük paketlere yatırım yapmadan önce sosyal kanıt oluşturmanıza yardımcı olur. {amount} {unit} denememiz teslimat hızı ve kalitesini test etmek içindir. {keyword}, yeni içerik üreticileri, küçük işletmeler ve görev tabanlı SMM büyümesini keşfedenler için idealdir."),
        s("{title} nasıl alınır", "Ücretsiz kaydolun, mevcut görevlere göz atın ve bitince kanıt gönderin. Onaylanan görevler bakiyenize puan ekler. Yeterli puanınız olduğunda (bu hizmet yaklaşık {points} puan), sipariş formunu açın, kullanıcı adınızı girin ve onaylayın. Teslimat genellikle 0–24 saat içinde başlar."),
        s("Ücretsiz büyüme için neden {brand}", "{brand}, görev ekonomisini 24 platformda tam ücretli katalogla birleştirir. {keyword} ile başlayın, uygun fiyatlı paketlerle ölçeklendirin veya günlük görevlerle kazanmaya devam edin. 7/24 canlı sohbet ve WhatsApp desteği."),
        s("Ücretsiz vs ücretli {platform} {type}", "Ücretsiz denemeler kazanılan puanları kullanır ve test için idealdir. Ücretli paketler kart, kripto veya puanla anında daha büyük miktarlar teslim eder. Birçok kişi önce ücretsiz deneme alır, sonuç görünce yükseltir."),
      ],
      faq: [
        f("{keyword} gerçekten ücretsiz mi?", "Evet. Görevleri tamamlayarak puan kazanırsınız — kredi kartı gerekmez. Bu {amount} {unit} paketi yaklaşık {points} puanla kullanılır."),
        f("{platform} şifremi paylaşmam gerekir mi?", "Asla. Yalnızca herkese açık kullanıcı adınız veya profil URL'niz gerekir. {brand} asla şifrenizi istemez."),
        f("Ücretsiz {typeLower} teslimatı ne kadar sürer?", "Çoğu ücretsiz sipariş 0–24 saat içinde başlar. Uzun kuyruklar tamamlanmayı biraz uzatabilir; teslimat kademeli ve hesap güvenliğine uygundur."),
        f("Ücretsiz {typeLower} birden fazla kez sipariş edebilir miyim?", "Ücretsiz denemeler adil sistem için hizmet başına sınırlıdır. Aynı platformdaki diğer ücretsiz hizmetleri deneyin veya ücretli pakete geçin."),
      ],
    },
    {
      metaTitle: "{title} — {startPrice}'den itibaren | {brand}",
      description: "{startPrice}'den itibaren {keyword} satın alın. {delivery} içinde anında teslimat. Kart, kripto veya puanla ödeyin. Güvenilir {platform} büyümesi — şifre gerekmez.",
      focusKeyword: "{platform} {type} satın al",
      intro: "{brand}'da {keyword}, hızlı ve kademeli dağıtımla gerçek {unit} teslim eder. Paketler {startPrice} karşılığında {startQty} {unit}'den başlar. Kullanıcı adınızı girin, bir kademe seçin ve güvenle ödeyin — asla şifrenizi istemeyiz.",
      sections: [
        s("Neden {platform} {type} satın almalı?", "{platform}'daki {type} popülerlik ve güven sinyali verir. Daha yüksek sayılar ilk izlenimi iyileştirir, organik etkileşimi teşvik eder ve içeriğin daha geniş kitlelere ulaşmasına yardımcı olur. {keyword}, profil, kampanya veya ürün lansmanında hızlı ivme kazanmanın yoludur."),
        s("Teslimat ve kalite", "Siparişler genellikle {delivery} içinde başlar. Teslimat hesap sağlığını korumak için doğal şekilde yayılır. Tüm paketler {brand} desteği ve panelde şeffaf sipariş takibi içerir."),
        s("Fiyatlandırma ve ödeme seçenekleri", "{maxQty} {unit}'ye kadar hazır kademelerden seçin. Kart, kripto para veya kazanılan puanlarla ({pointsRate} puan = 1 $) ödeyin. Büyük kademeler birim fiyatı otomatik düşürür."),
        s("{title} nasıl sipariş edilir", "Paket boyutunu seçin, {platform} kullanıcı adınızı veya bağlantınızı girin ve ödemeyi tamamlayın. Ücretsiz görevlerle puan kazanıp ücretli hizmetlerde kullanabilirsiniz. Durumu siparişler sayfasından takip edin."),
      ],
      faq: [
        f("{platform} {typeLower} satın almak güvenli mi?", "Evet. Asla şifrenizi istemeyiz. Teslimat kademeli ve doğal görünecek şekilde tasarlanmıştır. {brand}'da günlük binlerce sipariş işlenir."),
        f("Siparişim ne kadar hızlı başlar?", "Çoğu {keyword} siparişi {delivery} içinde başlar. Tamamlanma süresi paket boyutu ve mevcut kuyruğa bağlıdır."),
        f("Para yerine puanla ödeyebilir miyim?", "Evet. Görevleri tamamlayarak puan kazanın ve ödeme sırasında harcayın. Puan fiyatları her kademede USD yanında gösterilir."),
        f("Siparişim için yardıma ihtiyacım olursa?", "7/24 canlı sohbet veya WhatsApp ile destek ekibimize ulaşın. En hızlı çözüm için sipariş ID'nizi ve kullanıcı adınızı belirtin."),
      ],
    },
  ),
  ar: tpl(
    {
      metaTitle: "{title} — تجربة {amount} {unit} | {brand}",
      description: "احصل على {amount} {unit} {keyword} على {brand}. أكمل مهاماً بسيطة، اكسب نقاطاً واستبدلها — لا حاجة لكلمة المرور.",
      focusKeyword: "{type} {platform} مجانية",
      intro: "يتيح لك {keyword} اختبار نمو حقيقي على {platform} دون دفع مسبق. على {brand} تكسب نقاطاً بإنجاز مهام صغيرة وتستبدلها بباقة تجريبية {amount} {unit}. لا نطلب كلمة المرور أبداً — فقط اسم المستخدم العام أو رابط الملف الشخصي.",
      sections: [
        s("ما هي {type} {platform} المجانية؟", "تساعدك {typeLower} المجانية على {platform} في بناء دليل اجتماعي قبل الاستثمار في باقات أكبر. تجربتنا {amount} {unit} مخصصة لاختبار سرعة وجودة التسليم. {keyword} مثالي للمبدعين الجدد والشركات الصغيرة ومن يستكشف نمو SMM القائم على المهام."),
        s("كيفية الحصول على {title}", "سجّل مجاناً، تصفح المهام المتاحة وأرسل الإثبات عند الانتهاء. المهام المعتمدة تضيف نقاطاً إلى رصيدك. عندما يكون لديك ما يكفي (هذه الخدمة تكلف حوالي {points} نقطة)، افتح النموذج، أدخل اسم المستخدم وأكد. يبدأ التسليم عادة خلال 0–24 ساعة."),
        s("لماذا {brand} للنمو المجاني", "يجمع {brand} بين اقتصاد المهام وخدمات مدفوعة كاملة على 24 منصة. ابدأ بـ {keyword} ثم وسّع بباقات بأسعار معقولة أو استمر في الكسب عبر مهام يومية. دعم على مدار الساعة عبر الدردشة المباشرة وWhatsApp."),
        s("مجاني مقابل مدفوع: {type} {platform}", "تستخدم التجارب المجانية النقاط المكتسبة وهي مثالية للاختبار. الباقات المدفوعة تسلم كميات أكبر فوراً بالبطاقة أو العملات الرقمية أو النقاط عند الدفع. كثيرون يطلبون تجربة مجانية أولاً ثم يرقّون عند رؤية النتائج."),
      ],
      faq: [
        f("هل {keyword} مجاني حقاً؟", "نعم. تكسب نقاطاً بإنجاز المهام — لا حاجة لبطاقة ائتمان. هذه الباقة {amount} {unit} تكلف حوالي {points} نقطة للاستبدال."),
        f("هل أحتاج مشاركة كلمة مرور {platform}؟", "أبداً. نحتاج فقط اسم المستخدم العام أو رابط الملف الشخصي. {brand} لن يطلب كلمة المرور أبداً."),
        f("كم يستغرق تسليم {typeLower} المجانية؟", "تبدأ معظم الطلبات المجانية خلال 0–24 ساعة. قد تطيل قوائم الانتظار الطويلة الإنجاز قليلاً؛ التسليم تدريجي وآمن للحساب."),
        f("هل يمكن طلب {typeLower} مجانية أكثر من مرة؟", "التجارب المجانية محدودة لكل خدمة للعدالة. جرّب خدمات مجانية أخرى على نفس المنصة أو انتقل إلى باقة مدفوعة."),
      ],
    },
    {
      metaTitle: "{title} — من {startPrice} | {brand}",
      description: "اشترِ {keyword} من {startPrice}. تسليم فوري خلال {delivery}. ادفع بالبطاقة أو العملات الرقمية أو النقاط. نمو {platform} موثوق — لا حاجة لكلمة المرور.",
      focusKeyword: "شراء {type} {platform}",
      intro: "يقدّم {keyword} على {brand} {unit} حقيقية مع توزيع سريع وتدريجي. تبدأ الباقات من {startQty} {unit} بـ {startPrice}. أدخل اسم المستخدم، اختر المستوى وادفع بأمان — لا نطلب كلمة المرور أبداً.",
      sections: [
        s("لماذا شراء {type} {platform}؟", "تشير {type} على {platform} إلى الشعبية والثقة. الأعداد الأعلى تحسّن الانطباع الأول وتشجع التفاعل العضوي وتساعد المحتوى على الوصول لجمهور أوسع. {keyword} طريقة سريعة لاكتساب زخم عند إطلاق ملف أو حملة أو منتج."),
        s("التسليم والجودة", "تبدأ الطلبات عادة خلال {delivery}. يُوزَّع التسليم بشكل طبيعي لحماية صحة الحساب. جميع الباقات مدعومة من {brand} مع تتبع شفاف في لوحة التحكم."),
        s("الأسعار وخيارات الدفع", "اختر من مستويات محددة مسبقاً حتى {maxQty} {unit}. ادفع بالبطاقة أو العملات الرقمية أو النقاط المكتسبة ({pointsRate} نقطة لكل 1 $). المستويات الأكبر تخفض سعر الوحدة تلقائياً."),
        s("كيفية طلب {title}", "اختر حجم الباقة، أدخل اسم المستخدم أو رابط {platform} وأكمل الدفع. يمكنك أيضاً كسب نقاط عبر مهام مجانية واستخدامها للخدمات المدفوعة. تتبع الحالة من صفحة الطلبات."),
      ],
      faq: [
        f("هل شراء {typeLower} {platform} آمن؟", "نعم. لا نطلب كلمة المرور أبداً. التسليم تدريجي ومصمم ليبدو طبيعياً. تُعالَج آلاف الطلبات يومياً على {brand}."),
        f("متى يبدأ طلبي؟", "تبدأ معظم طلبات {keyword} خلال {delivery}. يعتمد وقت الإنجاز على حجم الباقة وحجم قائمة الانتظار."),
        f("هل يمكن الدفع بالنقاط بدلاً من المال؟", "نعم. اكسب نقاطاً بإنجاز المهام وأنفقها عند الدفع. أسعار النقاط تظهر بجانب USD لكل مستوى."),
        f("ماذا إذا احتجت مساعدة في طلبي؟", "تواصل مع دعمنا على مدار الساعة عبر الدردشة المباشرة أو WhatsApp. قدّم رقم الطلب واسم المستخدم للحل الأسرع."),
      ],
    },
  ),
  fa: tpl(
    {
      metaTitle: "{title} — آزمایش {amount} {unit} | {brand}",
      description: "{amount} {unit} {keyword} را در {brand} دریافت کنید. کارهای ساده انجام دهید، امتیاز بگیرید و مبادله کنید — بدون رمز عبور.",
      focusKeyword: "{type} رایگان {platform}",
      intro: "{keyword} به شما امکان می‌دهد رشد واقعی در {platform} را بدون پرداخت پیش‌پرداخت آزمایش کنید. در {brand} با انجام میکروکارها امتیاز می‌گیرید و برای بسته آزمایشی {amount} {unit} مبادله می‌کنید. هرگز رمز عبور نمی‌خواهیم — فقط نام کاربری عمومی یا لینک پروفایل.",
      sections: [
        s("{type} رایگان {platform} چیست؟", "{typeLower} رایگان در {platform} قبل از سرمایه‌گذاری در بسته‌های بزرگ‌تر به ساخت اثبات اجتماعی کمک می‌کند. آزمایش {amount} {unit} ما برای بررسی سرعت و کیفیت تحویل است. {keyword} برای خالقان جدید، کسب‌وکارهای کوچک و کسانی که رشد SMM مبتنی بر کار را کاوش می‌کنند ایده‌آل است."),
        s("چگونه {title} دریافت کنیم", "رایگان ثبت‌نام کنید، کارهای موجود را ببینید و پس از اتمام مدرک ارسال کنید. کارهای تأییدشده امتیاز به موجودی اضافه می‌کنند. وقتی کافی دارید (این سرویس حدود {points} امتیاز هزینه دارد)، فرم را باز کنید، نام کاربری را وارد و تأیید کنید. تحویل معمولاً در 0–24 ساعت شروع می‌شود."),
        s("چرا {brand} برای رشد رایگان", "{brand} اقتصاد کار را با کاتالوگ پولی کامل در 24 پلتفرم ترکیب می‌کند. با {keyword} شروع کنید، سپس با بسته‌های مقرون‌به‌صرفه مقیاس دهید یا با کارهای روزانه ادامه دهید. پشتیبانی 24/7 از طریق چت زنده و WhatsApp."),
        s("رایگان در برابر پولی: {type} {platform}", "آزمایش‌های رایگان از امتیازهای کسب‌شده استفاده می‌کنند و برای آزمایش مناسب‌اند. بسته‌های پولی مقادیر بیشتر را فوری با کارت، رمزارز یا امتیاز تحویل می‌دهند. بسیاری ابتدا آزمایش رایگان می‌گیرند و پس از دیدن نتایج ارتقا می‌دهند."),
      ],
      faq: [
        f("آیا {keyword} واقعاً رایگان است؟", "بله. با انجام کارها امتیاز می‌گیرید — کارت اعتباری لازم نیست. این بسته {amount} {unit} حدود {points} امتیاز برای مبادله هزینه دارد."),
        f("آیا باید رمز {platform} را به اشتراک بگذارم؟", "هرگز. فقط نام کاربری عمومی یا URL پروفایل لازم است. {brand} هرگز رمز عبور نمی‌خواهد."),
        f("تحویل {typeLower} رایگان چقدر طول می‌کشد؟", "بیشتر سفارش‌های رایگان در 0–24 ساعت شروع می‌شوند. صف‌های طولانی ممکن است تکمیل را کمی طولانی کند؛ تحویل تدریجی و ایمن برای حساب است."),
        f("آیا می‌توان {typeLower} رایگان را بیش از یک بار سفارش داد؟", "آزمایش‌های رایگان برای هر سرویس محدود است تا سیستم عادلانه بماند. سرویس‌های رایگان دیگر در همان پلتفرم را امتحان کنید یا به بسته پولی ارتقا دهید."),
      ],
    },
    {
      metaTitle: "{title} — از {startPrice} | {brand}",
      description: "{keyword} را از {startPrice} بخرید. تحویل فوری در {delivery}. با کارت، رمزارز یا امتیاز پرداخت کنید. رشد قابل اعتماد {platform} — بدون رمز عبور.",
      focusKeyword: "خرید {type} {platform}",
      intro: "{keyword} در {brand} {unit} واقعی با توزیع سریع و تدریجی تحویل می‌دهد. بسته‌ها از {startQty} {unit} با {startPrice} شروع می‌شوند. نام کاربری را وارد کنید، سطح انتخاب و امن پرداخت کنید — هرگز رمز عبور نمی‌خواهیم.",
      sections: [
        s("چرا {type} {platform} بخریم؟", "{type} در {platform} محبوبیت و اعتماد را نشان می‌دهد. اعداد بالاتر اولین برداشت را بهبود می‌دهند، تعامل ارگانیک را تشویق و به محتوا کمک می‌کنند به مخاطبان بیشتر برسد. {keyword} راه سریعی برای ایجاد شتاب در راه‌اندازی پروفایل، کمپین یا محصول است."),
        s("تحویل و کیفیت", "سفارش‌ها معمولاً در {delivery} شروع می‌شوند. تحویل به‌صورت طبیعی پخش می‌شود تا سلامت حساب حفظ شود. همه بسته‌ها با پشتیبانی {brand} و ردیابی شفاف در داشبورد همراه‌اند."),
        s("قیمت‌گذاری و گزینه‌های پرداخت", "از سطوح از پیش تعیین‌شده تا {maxQty} {unit} انتخاب کنید. با کارت، رمزارز یا امتیازهای کسب‌شده ({pointsRate} امتیاز به ازای 1 $) پرداخت کنید. سطوح بزرگ‌تر قیمت واحد را خودکار کاهش می‌دهند."),
        s("چگونه {title} سفارش دهیم", "اندازه بسته را انتخاب کنید، نام کاربری یا لینک {platform} را وارد و پرداخت را تکمیل کنید. همچنین می‌توانید با کارهای رایگان امتیاز بگیرید و برای سرویس‌های پولی خرج کنید. وضعیت را از صفحه سفارش‌ها دنبال کنید."),
      ],
      faq: [
        f("آیا خرید {typeLower} {platform} امن است؟", "بله. هرگز رمز عبور نمی‌خواهیم. تحویل تدریجی و طبیعی طراحی شده است. هزاران سفارش روزانه در {brand} پردازش می‌شود."),
        f("سفارش من چقدر سریع شروع می‌شود؟", "بیشتر سفارش‌های {keyword} در {delivery} شروع می‌شوند. زمان تکمیل به اندازه بسته و صف فعلی بستگی دارد."),
        f("آیا می‌توان با امتیاز به جای پول پرداخت کرد؟", "بله. با انجام کارها امتیاز بگیرید و در پرداخت خرج کنید. قیمت‌های امتیازی در کنار USD برای هر سطح نمایش داده می‌شود."),
        f("اگر به کمک برای سفارش نیاز داشتم؟", "با پشتیبانی 24/7 از طریق چت زنده یا WhatsApp تماس بگیرید. شناسه سفارش و نام کاربری را برای حل سریع‌تر ارائه دهید."),
      ],
    },
  ),
  zh: tpl(
    {
      metaTitle: "{title} — {amount}{unit}试用 | {brand}",
      description: "在{brand}领取{amount}{unit}{keyword}。完成简单任务、赚取积分并兑换 — 无需密码。",
      focusKeyword: "免费{platform}{type}",
      intro: "{keyword}让你无需预付即可在{platform}测试真实增长。在{brand}通过微任务赚取积分，兑换{amount}{unit}试用包。我们从不索要密码 — 只需公开用户名或主页链接。",
      sections: [
        s("什么是免费{platform}{type}？", "免费{platform}{typeLower}帮助你在投资更大套餐前建立社交证明。我们的{amount}{unit}试用用于测试交付速度和质量。{keyword}适合新创作者、小企业和探索任务式SMM增长的用户。"),
        s("如何领取{title}", "免费注册，浏览可用任务，完成后提交证明。通过的任务会将积分计入余额。积分足够时（此服务约需{points}积分），打开订单表单，输入用户名并确认。交付通常在0–24小时内开始。"),
        s("为何选择{brand}免费增长", "{brand}将任务经济与24个平台的完整付费目录结合。从{keyword}开始，再用实惠套餐扩展或继续每日任务赚取。7×24在线聊天和WhatsApp支持。"),
        s("免费与付费{platform}{type}对比", "免费试用使用赚取的积分，适合测试。付费套餐通过卡、加密货币或积分即时交付更大数量。许多人先领取免费试用，看到效果后再升级。"),
      ],
      faq: [
        f("{keyword}真的免费吗？", "是的。通过完成任务赚取积分 — 无需信用卡。此{amount}{unit}套餐约需{points}积分兑换。"),
        f("需要分享{platform}密码吗？", "绝不需要。我们只需公开用户名或主页URL。{brand}永远不会索要密码。"),
        f("免费{typeLower}交付需要多久？", "大多数免费订单在0–24小时内开始。队列较长可能稍延完成时间；交付渐进且对账号安全。"),
        f("可以多次领取免费{typeLower}吗？", "免费试用每项服务有限制以保持公平。可尝试同平台其他免费服务或升级付费套餐。"),
      ],
    },
    {
      metaTitle: "{title} — {startPrice}起 | {brand}",
      description: "从{startPrice}购买{keyword}。{delivery}内即时交付。支持卡、加密货币或积分支付。可靠的{platform}增长 — 无需密码。",
      focusKeyword: "购买{platform}{type}",
      intro: "{brand}上的{keyword}以快速、渐进方式交付真实{unit}。套餐从{startPrice}的{startQty}{unit}起。输入用户名、选择档位并安全结账 — 我们从不索要密码。",
      sections: [
        s("为何购买{platform}{type}？", "{platform}上的{type}体现人气与信任。更高数字改善第一印象、促进自然互动并帮助内容触达更多受众。{keyword}是启动账号、活动或产品时快速获得动力的方式。"),
        s("交付与质量", "订单通常在{delivery}内开始。交付自然分散以保护账号健康。所有套餐均有{brand}支持和面板透明追踪。"),
        s("定价与支付选项", "选择预设档位，最高{maxQty}{unit}。支持卡、加密货币或赚取的积分（{pointsRate}积分=$1）。更大档位自动降低单价。"),
        s("如何订购{title}", "选择套餐大小，输入{platform}用户名或链接并完成结账。也可通过免费任务赚积分用于付费服务。在订单页随时查看状态。"),
      ],
      faq: [
        f("购买{platform}{typeLower}安全吗？", "安全。我们从不索要密码。交付渐进且设计自然。{brand}每天处理数千订单。"),
        f("订单多快开始？", "大多数{keyword}订单在{delivery}内开始。完成时间取决于套餐大小和当前队列。"),
        f("可以用积分代替现金支付吗？", "可以。完成任务赚积分并在结账时使用。每档积分价格与美元并列显示。"),
        f("订单需要帮助怎么办？", "通过在线聊天或WhatsApp联系7×24支持。提供订单ID和用户名以便更快处理。"),
      ],
    },
  ),
  id: tpl(
    {
      metaTitle: "{title} — Uji Coba {amount} {unit} | {brand}",
      description: "Dapatkan {amount} {unit} {keyword} di {brand}. Selesaikan tugas sederhana, kumpulkan poin, dan tukar — tanpa kata sandi.",
      focusKeyword: "{type} {platform} gratis",
      intro: "{keyword} memungkinkan Anda menguji pertumbuhan nyata di {platform} tanpa bayar di muka. Di {brand} Anda mendapat poin dengan menyelesaikan micro-tugas dan menukarnya untuk paket uji coba {amount} {unit}. Kami tidak pernah meminta kata sandi — hanya username publik atau tautan profil.",
      sections: [
        s("Apa itu {type} {platform} gratis?", "{typeLower} gratis di {platform} membantu membangun bukti sosial sebelum investasi paket lebih besar. Uji coba {amount} {unit} kami untuk menguji kecepatan dan kualitas pengiriman. {keyword} ideal untuk kreator baru, bisnis kecil, dan yang mengeksplorasi pertumbuhan SMM berbasis tugas."),
        s("Cara mendapatkan {title}", "Daftar gratis, lihat tugas tersedia, dan kirim bukti setelah selesai. Tugas disetujui menambah poin ke saldo. Saat cukup (layanan ini sekitar {points} poin), buka formulir, masukkan username, dan konfirmasi. Pengiriman biasanya mulai dalam 0–24 jam."),
        s("Mengapa {brand} untuk pertumbuhan gratis", "{brand} menggabungkan ekonomi tugas dengan katalog berbayar lengkap di 24 platform. Mulai dengan {keyword}, lalu skala dengan paket terjangkau atau terus dapat poin lewat tugas harian. Dukungan 24/7 via live chat dan WhatsApp."),
        s("Gratis vs berbayar: {type} {platform}", "Uji coba gratis memakai poin yang diperoleh dan cocok untuk testing. Paket berbayar mengirim jumlah lebih besar instan via kartu, kripto, atau poin saat checkout. Banyak yang klaim uji coba gratis dulu, lalu upgrade saat melihat hasil."),
      ],
      faq: [
        f("Apakah {keyword} benar-benar gratis?", "Ya. Anda mendapat poin dengan menyelesaikan tugas — tanpa kartu kredit. Paket {amount} {unit} ini sekitar {points} poin untuk ditukar."),
        f("Apakah saya perlu membagikan kata sandi {platform}?", "Tidak pernah. Kami hanya butuh username publik atau URL profil. {brand} tidak akan meminta kata sandi."),
        f("Berapa lama pengiriman {typeLower} gratis?", "Kebanyakan pesanan gratis mulai dalam 0–24 jam. Antrean panjang mungkin sedikit memperpanjang penyelesaian; pengiriman bertahap dan aman untuk akun."),
        f("Bisakah pesan {typeLower} gratis lebih dari sekali?", "Uji coba gratis dibatasi per layanan agar adil. Coba layanan gratis lain di platform yang sama atau upgrade ke paket berbayar."),
      ],
    },
    {
      metaTitle: "{title} — Mulai {startPrice} | {brand}",
      description: "Beli {keyword} mulai {startPrice}. Pengiriman instan dalam {delivery}. Bayar dengan kartu, kripto, atau poin. Pertumbuhan {platform} terpercaya — tanpa kata sandi.",
      focusKeyword: "beli {type} {platform}",
      intro: "{keyword} di {brand} mengirim {unit} nyata dengan distribusi cepat dan bertahap. Paket mulai {startQty} {unit} seharga {startPrice}. Masukkan username, pilih tier, dan checkout aman — kami tidak pernah meminta kata sandi.",
      sections: [
        s("Mengapa beli {type} {platform}?", "{type} di {platform} menandakan popularitas dan kepercayaan. Angka lebih tinggi memperbaiki kesan pertama, mendorong engagement organik, dan membantu konten menjangkau lebih banyak orang. {keyword} cara cepat dapat momentum saat meluncurkan profil, kampanye, atau produk."),
        s("Pengiriman & kualitas", "Pesanan biasanya mulai dalam {delivery}. Pengiriman disebar natural untuk melindungi kesehatan akun. Semua paket didukung {brand} dengan pelacakan transparan di dashboard."),
        s("Harga & opsi pembayaran", "Pilih dari tier preset hingga {maxQty} {unit}. Bayar dengan kartu, kripto, atau poin yang diperoleh ({pointsRate} poin per $1). Tier lebih besar otomatis menurunkan harga per unit."),
        s("Cara pesan {title}", "Pilih ukuran paket, masukkan username atau tautan {platform}, dan selesaikan checkout. Anda juga bisa dapat poin lewat tugas gratis dan gunakan untuk layanan berbayar. Lacak status di halaman pesanan."),
      ],
      faq: [
        f("Apakah aman membeli {typeLower} {platform}?", "Ya. Kami tidak pernah meminta kata sandi. Pengiriman bertahap dan dirancang terlihat natural. Ribuan pesanan diproses setiap hari di {brand}."),
        f("Seberapa cepat pesanan saya mulai?", "Kebanyakan pesanan {keyword} mulai dalam {delivery}. Waktu selesai tergantung ukuran paket dan antrean saat ini."),
        f("Bisakah bayar dengan poin bukan uang?", "Ya. Dapat poin dengan menyelesaikan tugas dan habiskan saat checkout. Harga poin ditampilkan di samping USD untuk setiap tier."),
        f("Bagaimana jika butuh bantuan pesanan?", "Hubungi dukungan 24/7 via live chat atau WhatsApp. Berikan ID pesanan dan username untuk resolusi tercepat."),
      ],
    },
  ),
  bn: tpl(
    {
      metaTitle: "{title} — {amount} {unit} ট্রায়াল | {brand}",
      description: "{brand}-এ {amount} {unit} {keyword} নিন। সহজ কাজ সম্পন্ন করুন, পয়েন্ট অর্জন করুন এবং রিডিম করুন — পাসওয়ার্ড লাগবে না।",
      focusKeyword: "বিনামূল্যে {platform} {type}",
      intro: "{keyword} আপনাকে {platform}-এ অগ্রিম পেমেন্ট ছাড়াই প্রকৃত বৃদ্ধি পরীক্ষা করতে দেয়। {brand}-এ মাইক্রো-টাস্ক সম্পন্ন করে পয়েন্ট অর্জন করুন এবং {amount} {unit} ট্রায়াল প্যাকের জন্য রিডিম করুন। আমরা কখনো পাসওয়ার্ড চাই না — শুধু পাবলিক ইউজারনেম বা প্রোফাইল লিংক।",
      sections: [
        s("বিনামূল্যে {platform} {type} কী?", "{platform}-এ বিনামূল্যে {typeLower} বড় প্যাকে বিনিয়োগের আগে সামাজিক প্রমাণ গড়তে সাহায্য করে। আমাদের {amount} {unit} ট্রায়াল ডেলিভারি গতি ও মান পরীক্ষার জন্য। {keyword} নতুন ক্রিয়েটর, ছোট ব্যবসা এবং টাস্ক-ভিত্তিক SMM বৃদ্ধি অনুসন্ধানকারীদের জন্য আদর্শ।"),
        s("কীভাবে {title} পাবেন", "বিনামূল্যে সাইন আপ করুন, উপলব্ধ কাজ দেখুন এবং শেষ হলে প্রমাণ জমা দিন। অনুমোদিত কাজে ব্যালেন্সে পয়েন্ট যোগ হয়। যথেষ্ট পয়েন্ট হলে (এই সেবায় প্রায় {points} পয়েন্ট), ফর্ম খুলুন, ইউজারনেম দিন এবং নিশ্চিত করুন। ডেলিভারি সাধারণত 0–24 ঘণ্টায় শুরু হয়।"),
        s("বিনামূল্যে বৃদ্ধির জন্য কেন {brand}", "{brand} টাস্ক ইকোনমিকে 24 প্ল্যাটফর্মে সম্পূর্ণ পেইড ক্যাটালগের সাথে মিলিয়ে। {keyword} দিয়ে শুরু করুন, সাশ্রয়ী প্যাকে স্কেল করুন বা দৈনিক টাস্কে অর্থ উপার্জন চালিয়ে যান। 24/7 লাইভ চ্যাট ও WhatsApp সাপোর্ট।"),
        s("বিনামূল্যে vs পেইড {platform} {type}", "বিনামূল্যে ট্রায়াল অর্জিত পয়েন্ট ব্যবহার করে এবং পরীক্ষার জন্য উপযুক্ত। পেইড প্যাক কার্ড, ক্রিপ্টো বা পয়েন্টে তাৎক্ষণিক বড় পরিমাণ দেয়। অনেকে আগে ফ্রি ট্রায়াল নেন, ফল দেখে আপগ্রেড করেন।"),
      ],
      faq: [
        f("{keyword} কি সত্যিই বিনামূল্যে?", "হ্যাঁ। কাজ সম্পন্ন করে পয়েন্ট অর্জন করুন — ক্রেডিট কার্ড লাগবে না। এই {amount} {unit} প্যাক রিডিমে প্রায় {points} পয়েন্ট।"),
        f("{platform} পাসওয়ার্ড শেয়ার করতে হবে?", "কখনো না। শুধু পাবলিক ইউজারনেম বা প্রোফাইল URL লাগে। {brand} কখনো পাসওয়ার্ড চাইবে না।"),
        f("বিনামূল্যে {typeLower} ডেলিভারি কতক্ষণ?", "বেশিরভাগ ফ্রি অর্ডার 0–24 ঘণ্টায় শুরু হয়। দীর্ঘ কিউ সমাপ্তি সামান্য বাড়াতে পারে; ডেলিভারি ধাপে ধাপে এবং অ্যাকাউন্ট-নিরাপদ।"),
        f("বিনামূল্যে {typeLower} একাধিকবার অর্ডার করা যায়?", "ফ্রি ট্রায়াল ন্যায্যতার জন্য প্রতি সেবায় সীমিত। একই প্ল্যাটফর্মে অন্য ফ্রি সেবা দেখুন বা পেইড প্যাকে আপগ্রেড করুন।"),
      ],
    },
    {
      metaTitle: "{title} — {startPrice} থেকে | {brand}",
      description: "{startPrice} থেকে {keyword} কিনুন। {delivery}-এ তাৎক্ষণিক ডেলিভারি। কার্ড, ক্রিপ্টো বা পয়েন্টে পেমেন্ট। বিশ্বস্ত {platform} বৃদ্ধি — পাসওয়ার্ড লাগবে না।",
      focusKeyword: "{platform} {type} কিনুন",
      intro: "{brand}-এ {keyword} দ্রুত, ধাপে ধাপে বিতরণে প্রকৃত {unit} দেয়। প্যাক {startPrice}-এ {startQty} {unit} থেকে শুরু। ইউজারনেম দিন, টিয়ার বেছে নিন এবং নিরাপদে চেকআউট করুন — আমরা কখনো পাসওয়ার্ড চাই না।",
      sections: [
        s("কেন {platform} {type} কিনবেন?", "{platform}-এ {type} জনপ্রিয়তা ও বিশ্বাস বোঝায়। বেশি সংখ্যা প্রথম ধারণা ভালো করে, অর্গানিক এngagement বাড়ায় এবং কনটেন্ট আরও মানুষের কাছে পৌঁছাতে সাহায্য করে। {keyword} প্রোফাইল, ক্যাম্পেইন বা প্রোডাক্ট লঞ্চে গতি পাওয়ার দ্রুত উপায়।"),
        s("ডেলিভারি ও গুণমান", "অর্ডার সাধারণত {delivery}-এর মধ্যে শুরু হয়। অ্যাকাউন্ট সুরক্ষার জন্য ডেলিভারি প্রাকৃতিকভাবে ছড়িয়ে দেওয়া হয়। সব প্যাক {brand} সাপোর্ট ও ড্যাশবোর্ডে স্বচ্ছ ট্র্যাকিং সহ।"),
        s("মূল্য ও পেমেন্ট অপশন", "{maxQty} {unit} পর্যন্ত প্রিসেট টিয়ার থেকে বেছে নিন। কার্ড, ক্রিপ্টো বা অর্জিত পয়েন্টে ({pointsRate} পয়েন্ট প্রতি $1) পেমেন্ট করুন। বড় টিয়ার স্বয়ংক্রিয়ভাবে প্রতি ইউনিট দাম কমায়।"),
        s("কীভাবে {title} অর্ডার করবেন", "প্যাক সাইজ বেছে নিন, {platform} ইউজারনেম বা লিংক দিন এবং চেকআউট সম্পন্ন করুন। ফ্রি টাস্কে পয়েন্ট অর্জন করে পেইড সেবায় ব্যবহার করতে পারেন। অর্ডার পেজ থেকে স্ট্যাটাস দেখুন।"),
      ],
      faq: [
        f("{platform} {typeLower} কেনা কি নিরাপদ?", "হ্যাঁ। আমরা কখনো পাসওয়ার্ড চাই না। ডেলিভারি ধাপে ধাপে এবং প্রাকৃতিক দেখতে ডিজাইন করা। {brand}-এ প্রতিদিন হাজার হাজার অর্ডার প্রসেস হয়।"),
        f("আমার অর্ডার কত দ্রুত শুরু হবে?", "বেশিরভাগ {keyword} অর্ডার {delivery}-এ শুরু হয়। সমাপ্তি প্যাক সাইজ ও বর্তমান কিউর উপর নির্ভর করে।"),
        f("টাকার বদলে পয়েন্টে পেমেন্ট করা যায়?", "হ্যাঁ। কাজ সম্পন্ন করে পয়েন্ট অর্জন করুন এবং চেকআউটে ব্যবহার করুন। প্রতি টিয়ারে USD-র পাশে পয়েন্ট দাম দেখানো হয়।"),
        f("অর্ডারে সাহায্য লাগলে?", "24/7 লাইভ চ্যাট বা WhatsApp-এ সাপোর্টে যোগাযোগ করুন। দ্রুত সমাধানের জন্য অর্ডার ID ও ইউজারনেম দিন।"),
      ],
    },
  ),
  hi: tpl(
    {
      metaTitle: "{title} — {amount} {unit} ट्रायल | {brand}",
      description: "{brand} पर {amount} {unit} {keyword} पाएं। सरल कार्य पूरे करें, पॉइंट कमाएं और रिडीम करें — पासवर्ड की जरूरत नहीं।",
      focusKeyword: "मुफ़्त {platform} {type}",
      intro: "{keyword} आपको {platform} पर बिना अग्रिम भुगतान के वास्तविक वृद्धि आज़माने देता है। {brand} पर माइक्रो-टास्क पूरे करके पॉइंट कमाएं और {amount} {unit} ट्रायल पैक के लिए रिडीम करें। हम कभी पासवर्ड नहीं मांगते — केवल सार्वजनिक यूज़रनेम या प्रोफ़ाइल लिंक।",
      sections: [
        s("मुफ़्त {platform} {type} क्या हैं?", "{platform} पर मुफ़्त {typeLower} बड़े पैक में निवेश से पहले सामाजिक प्रमाण बनाने में मदद करते हैं। हमारा {amount} {unit} ट्रायल डिलीवरी गति और गुणवत्ता जांचने के लिए है। {keyword} नए क्रिएटर, छोटे व्यवसाय और टास्क-आधारित SMM वृद्धि खोजने वालों के लिए आदर्श है।"),
        s("{title} कैसे पाएं", "मुफ़्त साइन अप करें, उपलब्ध कार्य देखें और पूरा होने पर प्रमाण भेजें। स्वीकृत कार्यों से बैलेंस में पॉइंट जुड़ते हैं। पर्याप्त पॉइंट होने पर (यह सेवा लगभग {points} पॉइंट), फॉर्म खोलें, यूज़रनेम दर्ज करें और पुष्टि करें। डिलीवरी आमतौर पर 0–24 घंटे में शुरू होती है।"),
        s("मुफ़्त वृद्धि के लिए {brand} क्यों", "{brand} टास्क इकोनॉमी को 24 प्लेटफ़ॉर्म पर पूर्ण paid कैटलॉग के साथ जोड़ता है। {keyword} से शुरू करें, सस्ते पैक से स्केल करें या दैनिक कार्यों से कमाते रहें। 24/7 लाइव चैट और WhatsApp सपोर्ट।"),
        s("मुफ़्त vs paid {platform} {type}", "मुफ़्त ट्रायल कमाए पॉइंट इस्तेमाल करते हैं और परीक्षण के लिए उपयुक्त हैं। paid पैक कार्ड, क्रिप्टो या पॉइंट से तुरंत बड़ी मात्रा देते हैं। कई पहले मुफ़्त ट्रायल लेते हैं, परिणाम देखकर अपग्रेड करते हैं।"),
      ],
      faq: [
        f("क्या {keyword} वाकई मुफ़्त है?", "हाँ। कार्य पूरे करके पॉइंट कमाएं — क्रेडिट कार्ड की जरूरत नहीं। यह {amount} {unit} पैक रिडीम में लगभग {points} पॉइंट।"),
        f("क्या {platform} पासवर्ड साझा करना होगा?", "कभी नहीं। केवल सार्वजनिक यूज़रनेम या प्रोफ़ाइल URL चाहिए। {brand} कभी पासवर्ड नहीं मांगेगा।"),
        f("मुफ़्त {typeLower} डिलीवरी में कितना समय?", "अधिकांश मुफ़्त ऑर्डर 0–24 घंटे में शुरू होते हैं। लंबी कतार से पूर्णता थोड़ी बढ़ सकती है; डिलीवरी क्रमिक और खाते के लिए सुरक्षित है।"),
        f("क्या मुफ़्त {typeLower} कई बार ऑर्डर कर सकते हैं?", "मुफ़्त ट्रायल निष्पक्षता के लिए प्रति सेवा सीमित हैं। उसी प्लेटफ़ॉर्म पर अन्य मुफ़्त सेवाएं देखें या paid पैक पर अपग्रेड करें।"),
      ],
    },
    {
      metaTitle: "{title} — {startPrice} से | {brand}",
      description: "{startPrice} से {keyword} खरीदें। {delivery} में तत्काल डिलीवरी। कार्ड, क्रिप्टो या पॉइंट से भुगतान। विश्वसनीय {platform} वृद्धि — पासवर्ड की जरूरत नहीं।",
      focusKeyword: "{platform} {type} खरीदें",
      intro: "{brand} पर {keyword} तेज़, क्रमिक वितरण के साथ वास्तविक {unit} देता है। पैक {startPrice} पर {startQty} {unit} से शुरू। यूज़रनेम दर्ज करें, टियर चुनें और सुरक्षित checkout करें — हम कभी पासवर्ड नहीं मांगते।",
      sections: [
        s("{platform} {type} क्यों खरीदें?", "{platform} पर {type} लोकप्रियता और विश्वास दर्शाते हैं। अधिक संख्या पहली छाप सुधारती है, organic engagement बढ़ाती है और सामग्री को अधिक लोगों तक पहुंचने में मदद करती है। {keyword} प्रोफ़ाइल, अभियान या उत्पाद लॉन्च पर गति पाने का तेज़ तरीका है।"),
        s("डिलीवरी और गुणवत्ता", "ऑर्डर आमतौर पर {delivery} में शुरू होते हैं। खाते की सुरक्षा के लिए डिलीवरी प्राकृतिक रूप से फैलती है। सभी पैक {brand} सपोर्ट और डैशबोर्ड में पारदर्शी ट्रैकिंग के साथ।"),
        s("मूल्य और भुगतान विकल्प", "{maxQty} {unit} तक preset टियर में से चुनें। कार्ड, क्रिप्टो या कमाए पॉइंट ({pointsRate} पॉइंट प्रति $1) से भुगतान करें। बड़े टियर स्वचालित रूप से प्रति इकाई कीमत कम करते हैं।"),
        s("{title} कैसे ऑर्डर करें", "पैक साइज चुनें, {platform} यूज़रनेम या लिंक दर्ज करें और checkout पूरा करें। मुफ़्त कार्यों से पॉइंट कमा कर paid सेवाओं में इस्तेमाल कर सकते हैं। ऑर्डर पेज से स्थिति देखें।"),
      ],
      faq: [
        f("{platform} {typeLower} खरीदना सुरक्षित है?", "हाँ। हम कभी पासवर्ड नहीं मांगते। डिलीवरी क्रमिक और प्राकृतिक दिखने के लिए डिज़ाइन की गई है। {brand} पर रोज़ाना हजारों ऑर्डर प्रोसेस होते हैं।"),
        f("मेरा ऑर्डर कितनी जल्दी शुरू होगा?", "अधिकांश {keyword} ऑर्डर {delivery} में शुरू होते हैं। पूर्णता समय पैक साइज और वर्तमान कतार पर निर्भर करता है।"),
        f("क्या पैसे की जगह पॉइंट से भुगतान कर सकते हैं?", "हाँ। कार्य पूरे करके पॉइंट कमाएं और checkout पर खर्च करें। हर टियर पर USD के साथ पॉइंट कीमत दिखती है।"),
        f("ऑर्डर में मदद चाहिए तो?", "24/7 लाइव चैट या WhatsApp से सपोर्ट से संपर्क करें। तेज़ समाधान के लिए ऑर्डर ID और यूज़रनेम दें।"),
      ],
    },
  ),
};

export function buildLocalizedSeoContent(
  locale: Locale,
  service: CatalogService,
): SeoContent {
  if (locale === "en") {
    throw new Error("Use generateSeoContent for English locale");
  }

  const templates = LOCALE_TEMPLATES[locale];
  if (!templates) {
    throw new Error(`No SEO templates for locale: ${locale}`);
  }

  if (isFreeService(service)) {
    const vars = freeVars(locale, service);
    return renderSet(templates.free, {
      ...vars,
      ...kw(vars.platformLower, vars.typeLower),
    });
  }

  if (isPaidService(service)) {
    const vars = paidVars(locale, service);
    return renderSet(templates.paid, {
      ...vars,
      ...kw(vars.platformLower, vars.typeLower),
    });
  }

  throw new Error("Unknown catalog service tier");
}
