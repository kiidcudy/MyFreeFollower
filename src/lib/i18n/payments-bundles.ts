import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/translations";

type PaymentsMessages = Messages["payments"];

export const paymentsBundles: Partial<Record<Locale, PaymentsMessages>> = {
  tr: {
    title: "Kabul ettiğimiz ödeme yöntemleri",
    description:
      "Cryptomus ve Binance Pay ile kripto ödeme alıyoruz. PayPal, Skrill, Revolut, kredi kartı, banka havalesi veya Payoneer için WhatsApp veya Telegram üzerinden yazmanız yeterli.",
    note: "Tüm ödemeler güvenli işlenir. Sosyal medya şifrenizi asla istemiyoruz.",
    secureBadge: "Güvenli",
  },
  de: {
    title: "Akzeptierte Zahlungsmethoden",
    description:
      "Krypto via Cryptomus und Binance Pay. Für PayPal, Skrill, Revolut, Karte, Überweisung oder Payoneer — kontaktieren Sie uns per WhatsApp oder Telegram.",
    note: "Alle Zahlungen werden sicher verarbeitet. Wir fragen niemals nach Ihrem Passwort.",
    secureBadge: "Sicher",
  },
  fr: {
    title: "Modes de paiement acceptés",
    description:
      "Crypto via Cryptomus et Binance Pay. Pour PayPal, Skrill, Revolut, carte, virement ou Payoneer — contactez-nous sur WhatsApp ou Telegram.",
    note: "Paiements sécurisés. Nous ne demandons jamais votre mot de passe.",
    secureBadge: "Sécurisé",
  },
  es: {
    title: "Métodos de pago aceptados",
    description:
      "Cripto con Cryptomus y Binance Pay. Para PayPal, Skrill, Revolut, tarjeta, transferencia o Payoneer — escríbenos por WhatsApp o Telegram.",
    note: "Pagos seguros. Nunca pedimos tu contraseña.",
    secureBadge: "Seguro",
  },
  ar: {
    title: "طرق الدفع المقبولة",
    description:
      "عملات رقمية عبر Cryptomus وBinance Pay. لـ PayPal وSkrill وRevolut والبطاقة والتحويل — تواصل عبر WhatsApp أو Telegram.",
    note: "مدفوعات آمنة. لا نطلب كلمة مرور حسابك.",
    secureBadge: "آمن",
  },
  ru: {
    title: "Способы оплаты",
    description:
      "Криптовалюта через Cryptomus и Binance Pay. PayPal, Skrill, Revolut, карта, перевод — напишите в WhatsApp или Telegram.",
    note: "Безопасная оплата. Мы никогда не просим пароль от аккаунта.",
    secureBadge: "Безопасно",
  },
  pt: {
    title: "Métodos de pagamento aceites",
    description:
      "Cripto via Cryptomus e Binance Pay. PayPal, Skrill, Revolut, cartão ou transferência — contacte via WhatsApp ou Telegram.",
    note: "Pagamentos seguros. Nunca pedimos a sua palavra-passe.",
    secureBadge: "Seguro",
  },
  "pt-br": {
    title: "Formas de pagamento aceitas",
    description:
      "Cripto via Cryptomus e Binance Pay. PayPal, Skrill, Revolut, cartão ou transferência — fale conosco no WhatsApp ou Telegram.",
    note: "Pagamentos seguros. Nunca pedimos sua senha.",
    secureBadge: "Seguro",
  },
  it: {
    title: "Metodi di pagamento accettati",
    description:
      "Crypto via Cryptomus e Binance Pay. PayPal, Skrill, Revolut, carta o bonifico — contattaci su WhatsApp o Telegram.",
    note: "Pagamenti sicuri. Non chiediamo mai la password.",
    secureBadge: "Sicuro",
  },
  nl: {
    title: "Geaccepteerde betaalmethoden",
    description:
      "Crypto via Cryptomus en Binance Pay. PayPal, Skrill, Revolut, kaart of overschrijving — neem contact op via WhatsApp of Telegram.",
    note: "Veilige betalingen. We vragen nooit om je wachtwoord.",
    secureBadge: "Veilig",
  },
  pl: {
    title: "Akceptowane metody płatności",
    description:
      "Krypto przez Cryptomus i Binance Pay. PayPal, Skrill, Revolut, karta, przelew — napisz na WhatsApp lub Telegram.",
    note: "Bezpieczne płatności. Nigdy nie prosimy o hasło.",
    secureBadge: "Bezpieczne",
  },
  ro: {
    title: "Metode de plată acceptate",
    description:
      "Crypto prin Cryptomus și Binance Pay. PayPal, Skrill, Revolut, card sau transfer — contactați-ne pe WhatsApp sau Telegram.",
    note: "Plăți securizate. Nu cerem niciodată parola.",
    secureBadge: "Securizat",
  },
  uk: {
    title: "Прийняті способи оплати",
    description:
      "Крипто через Cryptomus і Binance Pay. PayPal, Skrill, Revolut, картка, переказ — напишіть у WhatsApp або Telegram.",
    note: "Безпечні платежі. Ми ніколи не просимо пароль.",
    secureBadge: "Безпечно",
  },
  fa: {
    title: "روش‌های پرداخت",
    description:
      "ارز دیجیتال از Cryptomus و Binance Pay. PayPal، Skrill، Revolut، کارت — از WhatsApp یا Telegram پیام دهید.",
    note: "پرداخت امن. هرگز رمز عبور نمی‌خواهیم.",
    secureBadge: "امن",
  },
  zh: {
    title: "支持的支付方式",
    description:
      "通过 Cryptomus 和 Binance Pay 支付加密货币。PayPal、Skrill、Revolut、银行卡或转账 — 请通过 WhatsApp 或 Telegram 联系我们。",
    note: "安全支付。我们从不索要密码。",
    secureBadge: "安全",
  },
  id: {
    title: "Metode pembayaran",
    description:
      "Kripto via Cryptomus dan Binance Pay. PayPal, Skrill, Revolut, kartu, transfer — hubungi via WhatsApp atau Telegram.",
    note: "Pembayaran aman. Kami tidak pernah minta password.",
    secureBadge: "Aman",
  },
  bn: {
    title: "গ্রহণযোগ্য পেমেন্ট পদ্ধতি",
    description:
      "Cryptomus ও Binance Pay-এ ক্রিপ্টো। PayPal, Skrill, Revolut, কার্ড — WhatsApp বা Telegram-এ লিখুন।",
    note: "নিরাপদ পেমেন্ট। আমরা পাসওয়ার্ড চাই না।",
    secureBadge: "নিরাপদ",
  },
  hi: {
    title: "स्वीकृत भुगतान विधियाँ",
    description:
      "Cryptomus और Binance Pay से क्रिप्टो। PayPal, Skrill, Revolut, कार्ड — WhatsApp या Telegram पर लिखें।",
    note: "सुरक्षित भुगतान। हम पासवर्ड नहीं माँगते।",
    secureBadge: "सुरक्षित",
  },
};
