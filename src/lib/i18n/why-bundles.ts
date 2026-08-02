import type { Locale } from "@/lib/i18n/config";

type WhyKeys = {
  why4Title: string;
  why4Desc: string;
  why6Title: string;
  why6Desc: string;
  faqQ6: string;
  faqA6: string;
};

export const whyBundles: Partial<Record<Locale, WhyKeys>> = {
  de: {
    why4Title: "Skalierbare Paketgrößen",
    why4Desc: "Wählen Sie eine Größe für kleine Tests oder größere Kampagnen.",
    why6Title: "Schutz bei Rückgängen",
    why6Desc: "Sinken die Zahlen nach der Lieferung, füllen wir im Servicefenster auf.",
    faqQ6: "Was, wenn mit meiner Bestellung etwas schiefgeht?",
    faqA6:
      "Schreiben Sie uns auf WhatsApp oder Telegram mit Ihrer Bestellnummer. Können wir nicht liefern, klären wir es individuell — Details in der Rückerstattungsrichtlinie.",
  },
  fr: {
    why4Title: "Forfaits qui évoluent",
    why4Desc: "Choisissez une taille pour tester ou pousser une campagne plus large.",
    why6Title: "Protection contre les chutes",
    why6Desc: "Si les chiffres baissent après livraison, on recharge dans la fenêtre de service.",
    faqQ6: "Et si quelque chose ne va pas avec ma commande ?",
    faqA6:
      "Contactez-nous sur WhatsApp ou Telegram avec votre numéro de commande. Si nous ne pouvons pas livrer, nous trouvons une solution au cas par cas — voir la politique de remboursement.",
  },
  es: {
    why4Title: "Paquetes que escalan",
    why4Desc: "Elige un tamaño para pruebas pequeñas o impulsos más grandes.",
    why6Title: "Protección ante caídas",
    why6Desc: "Si bajan los números tras la entrega, reponemos en la ventana de servicio.",
    faqQ6: "¿Qué pasa si algo sale mal con mi pedido?",
    faqA6:
      "Escríbenos por WhatsApp o Telegram con tu ID de pedido. Si no podemos completarlo, lo resolvemos caso por caso — consulta la política de reembolso.",
  },
  pt: {
    why4Title: "Pacotes que escalam",
    why4Desc: "Escolha um tamanho para testes ou campanhas maiores.",
    why6Title: "Proteção contra quedas",
    why6Desc: "Se os números caírem após a entrega, repomos na janela de serviço.",
    faqQ6: "E se algo correr mal com a minha encomenda?",
    faqA6:
      "Envie-nos mensagem no WhatsApp ou Telegram com o ID da encomenda. Se não conseguirmos entregar, resolvemos caso a caso — veja a política de reembolso.",
  },
  "pt-br": {
    why4Title: "Pacotes que escalam",
    why4Desc: "Escolha um tamanho para testes ou campanhas maiores.",
    why6Title: "Proteção contra quedas",
    why6Desc: "Se os números caírem após a entrega, repomos na janela de serviço.",
    faqQ6: "E se algo der errado com meu pedido?",
    faqA6:
      "Mande mensagem no WhatsApp ou Telegram com o ID do pedido. Se não conseguirmos entregar, resolvemos caso a caso — veja a política de reembolso.",
  },
  it: {
    why4Title: "Pacchetti scalabili",
    why4Desc: "Scegli una dimensione per test piccoli o spinte più grandi.",
    why6Title: "Protezione dai cali",
    why6Desc: "Se i numeri scendono dopo la consegna, ricarichiamo nella finestra di servizio.",
    faqQ6: "Cosa succede se qualcosa va storto con il mio ordine?",
    faqA6:
      "Scrivici su WhatsApp o Telegram con l'ID ordine. Se non possiamo completare, risolviamo caso per caso — vedi la politica di rimborso.",
  },
  nl: {
    why4Title: "Pakketten die meeschalen",
    why4Desc: "Kies een formaat voor kleine tests of grotere pushes.",
    why6Title: "Bescherming bij daling",
    why6Desc: "Dalende cijfers vullen we aan binnen het servicewindow.",
    faqQ6: "Wat als er iets misgaat met mijn bestelling?",
    faqA6:
      "Stuur ons een bericht via WhatsApp of Telegram met je order-ID. Kunnen we niet leveren, dan lossen we het per geval op — zie het restitutiebeleid.",
  },
  pl: {
    why4Title: "Pakiety dopasowane do celu",
    why4Desc: "Wybierz rozmiar na małe testy lub większe kampanie.",
    why6Title: "Ochrona przed spadkami",
    why6Desc: "Spadek liczb uzupełniamy w oknie serwisu.",
    faqQ6: "Co jeśli coś pójdzie nie tak z zamówieniem?",
    faqA6:
      "Napisz do nas na WhatsApp lub Telegram z numerem zamówienia. Jeśli nie możemy dostarczyć, rozwiązujemy to indywidualnie — szczegóły w polityce zwrotów.",
  },
  ro: {
    why4Title: "Pachete care scalează",
    why4Desc: "Alege o dimensiune pentru teste mici sau campanii mai mari.",
    why6Title: "Protecție la scădere",
    why6Desc: "Refacem numerele în fereastra de serviciu dacă scad după livrare.",
    faqQ6: "Ce fac dacă ceva nu merge bine cu comanda?",
    faqA6:
      "Scrie-ne pe WhatsApp sau Telegram cu ID-ul comenzii. Dacă nu putem livra, rezolvăm caz cu caz — vezi politica de rambursare.",
  },
  ru: {
    why4Title: "Пакеты под вашу задачу",
    why4Desc: "Выберите размер — от маленького теста до крупной кампании.",
    why6Title: "Защита от спада",
    why6Desc: "Если цифры упали после доставки — дозаполняем в срок сервиса.",
    faqQ6: "Что делать, если с заказом что-то не так?",
    faqA6:
      "Напишите нам в WhatsApp или Telegram с номером заказа. Если не можем выполнить — разберёмся индивидуально, см. политику возврата.",
  },
  uk: {
    why4Title: "Пакети під вашу ціль",
    why4Desc: "Оберіть розмір — від маленького тесту до великої кампанії.",
    why6Title: "Захист від спаду",
    why6Desc: "Дозаповнюємо під час вікна сервісу, якщо цифри впали.",
    faqQ6: "Що робити, якщо з замовленням щось не так?",
    faqA6:
      "Напишіть нам у WhatsApp або Telegram з номером замовлення. Якщо не можемо виконати — вирішимо індивідуально, див. політику повернення.",
  },
  tr: {
    why4Title: "Hedefe göre paket boyutu",
    why4Desc: "Küçük deneme veya daha büyük kampanya — size uyan paketi seçin.",
    why6Title: "Düşüş koruması",
    why6Desc: "Teslimattan sonra sayılar düşerse servis penceresinde yeniden tamamlanır.",
    faqQ6: "Siparişimde sorun olursa ne yapmalıyım?",
    faqA6:
      "WhatsApp veya Telegram'dan sipariş numaranızla yazın. Teslim edemezsek duruma göre çözüm buluruz — ayrıntılar İade Politikası'nda.",
  },
  ar: {
    why4Title: "باقات تناسب هدفك",
    why4Desc: "اختر حجماً للاختبار أو لحملة أكبر.",
    why6Title: "حماية من الانخفاض",
    why6Desc: "إذا انخفضت الأرقام بعد التسليم، نعيد التعبئة خلال فترة الخدمة.",
    faqQ6: "ماذا لو حدث خطأ في طلبي؟",
    faqA6:
      "راسلنا على WhatsApp أو Telegram مع رقم الطلب. إذا لم نتمكن من الإنجاز، نحل الأمر حسب الحالة — راجع سياسة الاسترداد.",
  },
  fa: {
    why4Title: "بسته‌های متناسب با هدف",
    why4Desc: "برای تست کوچک یا کمپین بزرگ‌تر اندازه مناسب را انتخاب کنید.",
    why6Title: "محافظت در برابر افت",
    why6Desc: "در پنجره سرویس جبران می‌کنیم اگر اعداد بعد از تحویل افت کنند.",
    faqQ6: "اگر سفارشم مشکل داشت چه کنم؟",
    faqA6:
      "در WhatsApp یا Telegram با شماره سفارش پیام دهید. اگر نتوانیم تحویل دهیم، مورد به مورد حل می‌کنیم — سیاست بازپرداخت را ببینید.",
  },
  zh: {
    why4Title: "按需选择套餐",
    why4Desc: "小测试或大推广——选适合目标的规模。",
    why6Title: "下降保护",
    why6Desc: "交付后数量下降会在服务窗口内补回。",
    faqQ6: "订单出问题怎么办？",
    faqA6:
      "通过 WhatsApp 或 Telegram 发送订单号联系我们。无法完成时会个案处理——详见退款政策。",
  },
  id: {
    why4Title: "Paket sesuai tujuan",
    why4Desc: "Pilih ukuran untuk uji coba kecil atau dorongan lebih besar.",
    why6Title: "Proteksi penurunan",
    why6Desc: "Kami isi ulang dalam jendela layanan jika angka turun setelah delivery.",
    faqQ6: "Bagaimana jika pesanan saya bermasalah?",
    faqA6:
      "Hubungi kami via WhatsApp atau Telegram dengan ID pesanan. Jika tidak bisa menyelesaikan, kami atur per kasus — lihat kebijakan refund.",
  },
  bn: {
    why4Title: "লক্ষ্য অনুযায়ী প্যাকেজ",
    why4Desc: "ছোট টেস্ট বা বড় ক্যাম্পেইন — আপনার জন্য উপযুক্ত সাইজ বেছে নিন।",
    why6Title: "ড্রপ সুরক্ষা",
    why6Desc: "ডেলিভারির পর সংখ্যা কমলে সার্ভিস উইন্ডোতে পুনরায় পূরণ।",
    faqQ6: "অর্ডারে সমস্যা হলে কী করব?",
    faqA6:
      "WhatsApp বা Telegram-এ অর্ডার ID দিয়ে লিখুন। ডেলিভার করতে না পারলে কেস অনুযায়ী সমাধান — Refund Policy দেখুন।",
  },
  hi: {
    why4Title: "लक्ष्य के हिसाब से पैकेज",
    why4Desc: "छोटे टेस्ट या बड़े push — अपने लक्ष्य के अनुसार साइज़ चुनें।",
    why6Title: "ड्रॉप सुरक्षा",
    why6Desc: "डिलीवरी के बाद संख्या गिरे तो सर्विस विंडो में दोबारा भरते हैं।",
    faqQ6: "अगर ऑर्डर में कोई समस्या हो?",
    faqA6:
      "WhatsApp या Telegram पर ऑर्डर ID के साथ लिखें। पूरा न कर पाएं तो केस के हिसाब से हल — Refund Policy देखें।",
  },
};
