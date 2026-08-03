import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/translations";

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
type LegalMessages = DeepPartial<Messages["legal"]>;

export const legalBundles: Partial<Record<Locale, LegalMessages>> = {
  de: {
    privacyTitle: "Datenschutzerklärung",
    termsTitle: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert",
    lastUpdatedDate: "1. August 2026",
    privacyIntro:
      "Diese Datenschutzerklärung erläutert, wie MyFreeFollower Ihre Informationen erhebt, nutzt und schützt, wenn Sie unsere Website und Dienste nutzen.",
    privacySection1Title: "Welche Daten wir erheben",
    privacySection1Body:
      "Wir erheben Angaben bei der Registrierung (Benutzername, E-Mail, Passwort), Bestelldetails (Benutzernamen und Profillinks), Nachweis-Einreichungen und Support-Nachrichten. Außerdem erfassen wir grundlegende Nutzungsdaten wie IP-Adresse und Browsertyp für Sicherheit und Analysen.",
    privacySection2Title: "Wie wir Ihre Daten nutzen",
    privacySection2Body:
      "Wir nutzen Ihre Daten zur Kontoführung, Auftragsabwicklung, Prüfung von Aufgabennachweisen, Betrugsprävention, Serviceverbesserung und Support. Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte.",
    privacySection3Title: "Cookies und Analysen",
    privacySection3Body:
      "Wir verwenden Cookies, um Ihre Spracheinstellung und Sitzung zu speichern. Analyse-Tools helfen uns zu verstehen, wie Besucher die Seite nutzen, damit wir das Erlebnis verbessern können.",
    privacySection4Title: "Aufbewahrung und Sicherheit",
    privacySection4Body:
      "Kontodaten speichern wir, solange Ihr Konto aktiv ist und gesetzlich erforderlich. Wir setzen angemessene Sicherheitsmaßnahmen ein, können aber keine absolute Sicherheit garantieren.",
    privacySection5Title: "Ihre Rechte",
    privacySection5Body:
      "Sie können Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten per E-Mail an support@myfreefollower.com anfordern. Kontodaten können Sie durch Kontaktaufnahme mit uns löschen lassen.",
    privacySection6Title: "Kontakt",
    privacySection6Body:
      "Bei Datenschutzfragen schreiben Sie an support@myfreefollower.com oder nutzen Sie unsere Kontaktseite.",
    termsIntro:
      "Mit der Nutzung von MyFreeFollower akzeptieren Sie diese Nutzungsbedingungen. Bitte lesen Sie sie sorgfältig.",
    termsSection1Title: "Annahme der Bedingungen",
    termsSection1Body:
      "Mit Kontoerstellung oder Bestellung stimmen Sie diesen Bedingungen und geltendem Recht zu. Wenn Sie nicht einverstanden sind, nutzen Sie unsere Dienste nicht.",
    termsSection2Title: "Pflichten des Kontoinhabers",
    termsSection2Body:
      "Sie sind für die Sicherheit Ihrer Zugangsdaten und alle Aktivitäten unter Ihrem Konto verantwortlich. Geben Sie korrekte Angaben an und erstellen Sie keine Mehrfachkonten zum Missbrauch von Gratis-Tests.",
    termsSection3Title: "Leistungen und Lieferung",
    termsSection3Body:
      "Wir bieten Social-Media-Wachstumsdienste mit schrittweiser Lieferung. Lieferzeiten sind Schätzungen, keine Garantien. Wir können Bestellungen stornieren oder erstatten, die Plattformrichtlinien oder unsere Fair-Use-Regeln verletzen.",
    termsSection4Title: "Aufgaben, Punkte und Auszahlungen",
    termsSection4Body:
      "Punkte werden durch genehmigte Aufgaben verdient. Unvollständige oder betrügerische Nachweise können abgelehnt werden. Auszahlungen unterliegen Mindestbeträgen und manueller Prüfung. Empfehlungsprovisionen werden gemäß Programmregeln gutgeschrieben.",
    termsSection5Title: "Unzulässige Nutzung",
    termsSection5Body:
      "Sie dürfen unsere Dienste nicht für illegale Aktivitäten, Belästigung, Spam oder Verstöße gegen Drittplattform-Bedingungen nutzen. Missbrauch kann zur Sperrung oder Kündigung führen.",
    termsSection6Title: "Haftungsbeschränkung",
    termsSection6Body:
      "MyFreeFollower wird ohne Gewähr bereitgestellt. Wir sind nicht mit Instagram, TikTok, YouTube oder anderen Plattformen verbunden. Wir haften nicht für Maßnahmen Drittplattformen gegen Ihr Konto.",
    termsSection7Title: "Änderungen und Kontakt",
    termsSection7Body:
      "Wir können diese Bedingungen jederzeit aktualisieren. Fortgesetzte Nutzung gilt als Zustimmung. Fragen an support@myfreefollower.com.",
    refundTitle: "Rückerstattungsrichtlinie",
    refundDescription: "Wie wir Rückerstattungen handhaben, wenn eine Bestellung nicht wie beschrieben erfüllt werden kann.",
    refundIntro:
      "Jede Bestellung soll sauber ankommen. Wenn wir nicht liefern können, was Sie bezahlt haben, kontaktieren Sie uns — wir finden eine faire Lösung.",
    refundSection1Title: "Wann Rückerstattungen gelten",
    refundSection1Body:
      "Sie können eine Rückerstattung beantragen, wenn Ihre Bestellung nicht im angegebenen Lieferfenster gestartet, gar nicht geliefert oder unseres Erachtens erheblich unvollständig war.",
    refundSection2Title: "Wann keine Rückerstattung erfolgt",
    refundSection2Body:
      "Keine Rückerstattung nach Kundenstorno, sobald die Lieferung begonnen hat; bei falschen Links oder privaten Konten durch den Kunden; oder bei Plattformmaßnahmen außerhalb unserer Kontrolle.",
    refundSection3Title: "So beantragen Sie eine Rückerstattung",
    refundSection3Body:
      "Kontaktieren Sie den Support per WhatsApp, Live-Chat oder E-Mail an support@myfreefollower.com mit Bestell-ID und Konto-E-Mail. Prüfung innerhalb von 24–48 Stunden.",
    refundSection4Title: "Rückerstattung nach Zahlungsart",
    refundSection4Body:
      "Genehmigte Rückerstattungen gehen nach Möglichkeit an die ursprüngliche Zahlungsmethode. Krypto- und Guthabenzahlungen können dem Kontoguthaben gutgeschrieben oder per Vereinbarung erstattet werden.",
  },
  fr: {
    privacyTitle: "Politique de confidentialité",
    termsTitle: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour",
    lastUpdatedDate: "1 août 2026",
    privacyIntro:
      "Cette politique de confidentialité explique comment MyFreeFollower collecte, utilise et protège vos informations lorsque vous utilisez notre site et nos services.",
    privacySection1Title: "Informations collectées",
    privacySection1Body:
      "Nous collectons les données fournies à l'inscription (nom d'utilisateur, e-mail, mot de passe), les détails de commande (noms d'utilisateur et liens de profil), les preuves de tâches et les messages au support. Nous collectons aussi des données d'usage de base comme l'adresse IP et le type de navigateur pour la sécurité et l'analyse.",
    privacySection2Title: "Utilisation de vos informations",
    privacySection2Body:
      "Nous utilisons vos données pour gérer votre compte, traiter les commandes, examiner les preuves, prévenir la fraude, améliorer nos services et répondre au support. Nous ne vendons pas vos informations personnelles à des tiers.",
    privacySection3Title: "Cookies et analytique",
    privacySection3Body:
      "Nous utilisons des cookies pour mémoriser votre langue et votre session. Les outils d'analyse nous aident à comprendre l'utilisation du site afin d'améliorer l'expérience.",
    privacySection4Title: "Conservation et sécurité",
    privacySection4Body:
      "Nous conservons les données de compte tant que votre compte est actif et conformément à la loi. Nous mettons en place des mesures de sécurité raisonnables, sans garantie absolue.",
    privacySection5Title: "Vos droits",
    privacySection5Body:
      "Vous pouvez demander l'accès, la correction ou la suppression de vos données en contactant support@myfreefollower.com. Vous pouvez demander la suppression de votre compte en nous contactant.",
    privacySection6Title: "Contact",
    privacySection6Body:
      "Pour toute question de confidentialité, écrivez à support@myfreefollower.com ou utilisez notre page de contact.",
    termsIntro:
      "En utilisant MyFreeFollower, vous acceptez ces conditions d'utilisation. Veuillez les lire attentivement.",
    termsSection1Title: "Acceptation des conditions",
    termsSection1Body:
      "En créant un compte ou en passant commande, vous acceptez ces conditions et les lois applicables. Si vous n'êtes pas d'accord, n'utilisez pas nos services.",
    termsSection2Title: "Responsabilités du compte",
    termsSection2Body:
      "Vous êtes responsable de la sécurité de vos identifiants et de toute activité sous votre compte. Fournissez des informations exactes et ne créez pas plusieurs comptes pour abuser des essais gratuits.",
    termsSection3Title: "Services et livraison",
    termsSection3Body:
      "Nous fournissons des services de croissance sociale livrés progressivement. Les délais sont des estimations, pas des garanties. Nous pouvons annuler ou rembourser les commandes contraires aux règles des plateformes ou à notre usage équitable.",
    termsSection4Title: "Tâches, points et retraits",
    termsSection4Body:
      "Les points sont gagnés en accomplissant des tâches approuvées. Les preuves incomplètes ou frauduleuses peuvent être rejetées. Les retraits sont soumis à des seuils minimums et à un examen manuel. Les commissions de parrainage sont créditées selon les règles du programme.",
    termsSection5Title: "Usage interdit",
    termsSection5Body:
      "Vous ne devez pas utiliser nos services pour des activités illégales, du harcèlement, du spam ou en violation des conditions de plateformes tierces. Nous pouvons suspendre ou résilier les comptes abusifs.",
    termsSection6Title: "Limitation de responsabilité",
    termsSection6Body:
      "MyFreeFollower est fourni tel quel. Nous ne sommes affiliés à Instagram, TikTok, YouTube ou aucune plateforme sociale. Nous ne sommes pas responsables des actions prises par des plateformes tierces.",
    termsSection7Title: "Modifications et contact",
    termsSection7Body:
      "Nous pouvons mettre à jour ces conditions à tout moment. L'utilisation continue vaut acceptation. Contact : support@myfreefollower.com.",
    refundTitle: "Politique de remboursement",
    refundDescription: "Comment nous gérons les remboursements lorsqu'une commande ne peut pas être exécutée comme décrit.",
    refundIntro:
      "Nous voulons que chaque commande se passe bien. Si nous ne pouvons pas livrer ce que vous avez payé, contactez-nous pour une résolution équitable.",
    refundSection1Title: "Quand les remboursements s'appliquent",
    refundSection1Body:
      "Vous pouvez demander un remboursement si votre commande n'a pas démarré dans le délai indiqué, n'a pas été livrée du tout, ou était nettement incomplète de notre faute.",
    refundSection2Title: "Quand les remboursements ne s'appliquent pas",
    refundSection2Body:
      "Pas de remboursement si le client annule après le début de la livraison, pour liens incorrects ou comptes privés fournis par le client, ou pour actions de plateforme hors de notre contrôle.",
    refundSection3Title: "Comment demander un remboursement",
    refundSection3Body:
      "Contactez le support via WhatsApp, chat en direct ou e-mail à support@myfreefollower.com avec votre numéro de commande et e-mail de compte. Examen sous 24–48 heures.",
    refundSection4Title: "Remboursements par mode de paiement",
    refundSection4Body:
      "Les remboursements approuvés sont renvoyés au mode de paiement d'origine lorsque possible. Les paiements crypto ou solde peuvent être crédités sur le compte ou remboursés par accord.",
  },
  es: {
    privacyTitle: "Política de privacidad",
    termsTitle: "Términos de servicio",
    lastUpdated: "Última actualización",
    lastUpdatedDate: "1 de agosto de 2026",
    privacyIntro:
      "Esta Política de privacidad explica cómo MyFreeFollower recopila, usa y protege tu información cuando utilizas nuestro sitio web y servicios.",
    privacySection1Title: "Información que recopilamos",
    privacySection1Body:
      "Recopilamos datos que proporcionas al registrarte (usuario, correo, contraseña), detalles de pedidos (usuarios y enlaces de perfil), pruebas de tareas y mensajes de soporte. También recopilamos datos básicos de uso como IP y tipo de navegador para seguridad y analítica.",
    privacySection2Title: "Cómo usamos tu información",
    privacySection2Body:
      "Usamos tus datos para gestionar tu cuenta, procesar pedidos, revisar pruebas, prevenir fraude, mejorar servicios y responder soporte. No vendemos tu información personal a terceros.",
    privacySection3Title: "Cookies y analítica",
    privacySection3Body:
      "Usamos cookies para recordar tu idioma y sesión. Las herramientas analíticas nos ayudan a entender cómo los visitantes usan el sitio para mejorar la experiencia.",
    privacySection4Title: "Retención y seguridad",
    privacySection4Body:
      "Conservamos datos de cuenta mientras esté activa y según la ley. Implementamos medidas de seguridad razonables, pero ningún servicio online garantiza seguridad absoluta.",
    privacySection5Title: "Tus derechos",
    privacySection5Body:
      "Puedes solicitar acceso, corrección o eliminación de tus datos contactando support@myfreefollower.com. Puedes eliminar datos de cuenta contactándonos.",
    privacySection6Title: "Contacto",
    privacySection6Body:
      "Para preguntas de privacidad, escribe a support@myfreefollower.com o usa nuestra página de contacto.",
    termsIntro:
      "Al usar MyFreeFollower, aceptas estos Términos de servicio. Léelos con atención.",
    termsSection1Title: "Aceptación de términos",
    termsSection1Body:
      "Al crear una cuenta o hacer un pedido, aceptas cumplir estos términos y las leyes aplicables. Si no estás de acuerdo, no uses nuestros servicios.",
    termsSection2Title: "Responsabilidades de la cuenta",
    termsSection2Body:
      "Eres responsable de mantener seguras tus credenciales y de toda actividad bajo tu cuenta. Proporciona información exacta y no crees múltiples cuentas para abusar de pruebas gratuitas.",
    termsSection3Title: "Servicios y entrega",
    termsSection3Body:
      "Ofrecemos servicios de crecimiento en redes sociales con entrega gradual. Los plazos son estimaciones, no garantías. Podemos cancelar o reembolsar pedidos que violen políticas de plataformas o nuestras reglas de uso justo.",
    termsSection4Title: "Tareas, puntos y retiros",
    termsSection4Body:
      "Los puntos se ganan completando tareas aprobadas. Podemos rechazar pruebas incompletas o fraudulentas. Los retiros están sujetos a mínimos y revisión manual. Las comisiones por referidos se acreditan según las reglas del programa.",
    termsSection5Title: "Uso prohibido",
    termsSection5Body:
      "No puedes usar nuestros servicios para actividad ilegal, acoso, spam o violar términos de plataformas de terceros. Podemos suspender o cerrar cuentas que abusen del sistema.",
    termsSection6Title: "Limitación de responsabilidad",
    termsSection6Body:
      "MyFreeFollower se proporciona tal cual. No estamos afiliados a Instagram, TikTok, YouTube ni ninguna plataforma social. No somos responsables de acciones de plataformas terceras sobre tu cuenta.",
    termsSection7Title: "Cambios y contacto",
    termsSection7Body:
      "Podemos actualizar estos términos en cualquier momento. El uso continuado implica aceptación. Contacto: support@myfreefollower.com.",
    refundTitle: "Política de reembolso",
    refundDescription: "Cómo gestionamos reembolsos cuando un pedido no puede completarse como se describe.",
    refundIntro:
      "Queremos que cada pedido salga bien. Si no podemos entregar lo que pagaste, contáctanos y buscaremos una solución justa.",
    refundSection1Title: "Cuándo aplican reembolsos",
    refundSection1Body:
      "Puedes solicitar reembolso si tu pedido no comenzó en el plazo indicado, no se entregó en absoluto, o estuvo significativamente incompleto por nuestra culpa.",
    refundSection2Title: "Cuándo no aplican reembolsos",
    refundSection2Body:
      "No hay reembolso por cancelación del cliente tras iniciar la entrega, enlaces incorrectos o cuentas privadas proporcionadas por el cliente, o acciones de plataforma fuera de nuestro control.",
    refundSection3Title: "Cómo solicitar un reembolso",
    refundSection3Body:
      "Contacta soporte por WhatsApp, chat en vivo o email a support@myfreefollower.com con ID de pedido y email de cuenta. Revisamos en 24–48 horas.",
    refundSection4Title: "Reembolsos por método de pago",
    refundSection4Body:
      "Los reembolsos aprobados se devuelven al método de pago original cuando sea posible. Pagos crypto o saldo pueden acreditarse al balance o reembolsarse por acuerdo.",
  },
  pt: {
    privacyTitle: "Política de privacidade",
    termsTitle: "Termos de serviço",
    lastUpdated: "Última atualização",
    lastUpdatedDate: "1 de agosto de 2026",
    privacyIntro:
      "Esta Política de Privacidade explica como o MyFreeFollower recolhe, utiliza e protege a sua informação quando usa o nosso site e serviços.",
    privacySection1Title: "Informação que recolhemos",
    privacySection1Body:
      "Recolhemos dados fornecidos no registo (nome de utilizador, e-mail, palavra-passe), detalhes de encomendas (nomes de utilizador e links de perfil), provas de tarefas e mensagens de suporte. Também recolhemos dados básicos de utilização como IP e tipo de browser para segurança e análise.",
    privacySection2Title: "Como usamos a sua informação",
    privacySection2Body:
      "Usamos os seus dados para gerir a conta, processar encomendas, rever provas, prevenir fraude, melhorar serviços e responder ao suporte. Não vendemos informação pessoal a terceiros.",
    privacySection3Title: "Cookies e analítica",
    privacySection3Body:
      "Usamos cookies para memorizar idioma e sessão. Ferramentas analíticas ajudam-nos a perceber como os visitantes usam o site para melhorar a experiência.",
    privacySection4Title: "Retenção e segurança",
    privacySection4Body:
      "Retemos dados de conta enquanto estiver ativa e conforme exigido por lei. Implementamos medidas de segurança razoáveis, sem garantia absoluta.",
    privacySection5Title: "Os seus direitos",
    privacySection5Body:
      "Pode solicitar acesso, correção ou eliminação dos seus dados contactando support@myfreefollower.com. Pode eliminar dados de conta contactando-nos.",
    privacySection6Title: "Contacto",
    privacySection6Body:
      "Para questões de privacidade, escreva a support@myfreefollower.com ou use a nossa página de contacto.",
    termsIntro:
      "Ao usar o MyFreeFollower, aceita estes Termos de Serviço. Leia-os com atenção.",
    termsSection1Title: "Aceitação dos termos",
    termsSection1Body:
      "Ao criar conta ou fazer encomenda, concorda em cumprir estes termos e leis aplicáveis. Se não concordar, não use os nossos serviços.",
    termsSection2Title: "Responsabilidades da conta",
    termsSection2Body:
      "É responsável por manter credenciais seguras e por toda a atividade na sua conta. Forneça informação exata e não crie várias contas para abusar de testes gratuitos.",
    termsSection3Title: "Serviços e entrega",
    termsSection3Body:
      "Fornecemos serviços de crescimento social com entrega gradual. Prazos são estimativas, não garantias. Podemos cancelar ou reembolsar encomendas que violem políticas de plataformas ou regras de uso justo.",
    termsSection4Title: "Tarefas, pontos e levantamentos",
    termsSection4Body:
      "Pontos são ganhos com tarefas aprovadas. Podemos rejeitar provas incompletas ou fraudulentas. Levantamentos estão sujeitos a mínimos e revisão manual. Comissões de referência são creditadas conforme regras do programa.",
    termsSection5Title: "Uso proibido",
    termsSection5Body:
      "Não pode usar os nossos serviços para atividade ilegal, assédio, spam ou violar termos de plataformas terceiras. Podemos suspender ou encerrar contas abusivas.",
    termsSection6Title: "Limitação de responsabilidade",
    termsSection6Body:
      "O MyFreeFollower é fornecido tal como está. Não estamos afiliados ao Instagram, TikTok, YouTube ou qualquer plataforma social. Não somos responsáveis por ações de plataformas terceiras.",
    termsSection7Title: "Alterações e contacto",
    termsSection7Body:
      "Podemos atualizar estes termos a qualquer momento. Uso continuado implica aceitação. Contacto: support@myfreefollower.com.",
    refundTitle: "Política de reembolso",
    refundDescription: "Como tratamos reembolsos quando uma encomenda não pode ser concluída como descrito.",
    refundIntro:
      "Queremos que cada encomenda corra bem. Se não pudermos entregar o que pagou, contacte-nos para uma resolução justa.",
    refundSection1Title: "Quando se aplicam reembolsos",
    refundSection1Body:
      "Pode pedir reembolso se a encomenda não tiver começado no prazo indicado, não tiver sido entregue, ou estiver significativamente incompleta por nossa culpa.",
    refundSection2Title: "Quando não se aplicam reembolsos",
    refundSection2Body:
      "Sem reembolso por cancelamento após início da entrega, links incorretos ou contas privadas fornecidas pelo cliente, ou ações de plataforma fora do nosso controlo.",
    refundSection3Title: "Como pedir reembolso",
    refundSection3Body:
      "Contacte suporte via WhatsApp, chat ao vivo ou e-mail support@myfreefollower.com com ID de encomenda e e-mail da conta. Revisão em 24–48 horas.",
    refundSection4Title: "Reembolsos por método de pagamento",
    refundSection4Body:
      "Reembolsos aprovados voltam ao método original quando possível. Pagamentos crypto ou saldo podem ser creditados na conta ou reembolsados por acordo.",
  },
  "pt-br": {
    privacyTitle: "Política de privacidade",
    termsTitle: "Termos de serviço",
    lastUpdated: "Última atualização",
    lastUpdatedDate: "1 de agosto de 2026",
    privacyIntro:
      "Esta Política de Privacidade explica como o MyFreeFollower coleta, usa e protege suas informações quando você usa nosso site e serviços.",
    privacySection1Title: "Informações que coletamos",
    privacySection1Body:
      "Coletamos dados fornecidos no cadastro (usuário, e-mail, senha), detalhes de pedidos (usuários e links de perfil), provas de tarefas e mensagens de suporte. Também coletamos dados básicos de uso como IP e tipo de navegador para segurança e análise.",
    privacySection2Title: "Como usamos suas informações",
    privacySection2Body:
      "Usamos seus dados para gerir a conta, processar pedidos, revisar provas, prevenir fraude, melhorar serviços e responder ao suporte. Não vendemos informações pessoais a terceiros.",
    privacySection3Title: "Cookies e analítica",
    privacySection3Body:
      "Usamos cookies para lembrar idioma e sessão. Ferramentas analíticas nos ajudam a entender como visitantes usam o site para melhorar a experiência.",
    privacySection4Title: "Retenção e segurança",
    privacySection4Body:
      "Retemos dados de conta enquanto estiver ativa e conforme exigido por lei. Implementamos medidas de segurança razoáveis, sem garantia absoluta.",
    privacySection5Title: "Seus direitos",
    privacySection5Body:
      "Você pode solicitar acesso, correção ou exclusão dos seus dados contactando support@myfreefollower.com. Pode excluir dados de conta entrando em contato conosco.",
    privacySection6Title: "Contato",
    privacySection6Body:
      "Para dúvidas de privacidade, escreva para support@myfreefollower.com ou use nossa página de contato.",
    termsIntro:
      "Ao usar o MyFreeFollower, você aceita estes Termos de Serviço. Leia com atenção.",
    termsSection1Title: "Aceitação dos termos",
    termsSection1Body:
      "Ao criar conta ou fazer pedido, você concorda em cumprir estes termos e leis aplicáveis. Se não concordar, não use nossos serviços.",
    termsSection2Title: "Responsabilidades da conta",
    termsSection2Body:
      "Você é responsável por manter credenciais seguras e por toda atividade na sua conta. Forneça informações exatas e não crie várias contas para abusar de testes gratuitos.",
    termsSection3Title: "Serviços e entrega",
    termsSection3Body:
      "Fornecemos serviços de crescimento social com entrega gradual. Prazos são estimativas, não garantias. Podemos cancelar ou reembolsar pedidos que violem políticas de plataformas ou regras de uso justo.",
    termsSection4Title: "Tarefas, pontos e saques",
    termsSection4Body:
      "Pontos são ganhos com tarefas aprovadas. Podemos rejeitar provas incompletas ou fraudulentas. Saques estão sujeitos a mínimos e revisão manual. Comissões de indicação são creditadas conforme regras do programa.",
    termsSection5Title: "Uso proibido",
    termsSection5Body:
      "Você não pode usar nossos serviços para atividade ilegal, assédio, spam ou violar termos de plataformas terceiras. Podemos suspender ou encerrar contas abusivas.",
    termsSection6Title: "Limitação de responsabilidade",
    termsSection6Body:
      "O MyFreeFollower é fornecido como está. Não somos afiliados ao Instagram, TikTok, YouTube ou qualquer plataforma social. Não somos responsáveis por ações de plataformas terceiras.",
    termsSection7Title: "Alterações e contato",
    termsSection7Body:
      "Podemos atualizar estes termos a qualquer momento. Uso continuado implica aceitação. Contato: support@myfreefollower.com.",
    refundTitle: "Política de reembolso",
    refundDescription: "Como tratamos reembolsos quando um pedido não pode ser concluído como descrito.",
    refundIntro:
      "Queremos que cada pedido saia bem. Se não pudermos entregar o que você pagou, fale conosco para uma solução justa.",
    refundSection1Title: "Quando se aplicam reembolsos",
    refundSection1Body:
      "Você pode pedir reembolso se o pedido não tiver começado no prazo indicado, não tiver sido entregue, ou estiver significativamente incompleto por nossa culpa.",
    refundSection2Title: "Quando não se aplicam reembolsos",
    refundSection2Body:
      "Sem reembolso por cancelamento após início da entrega, links incorretos ou contas privadas fornecidas pelo cliente, ou ações de plataforma fora do nosso controle.",
    refundSection3Title: "Como solicitar reembolso",
    refundSection3Body:
      "Contate o suporte via WhatsApp, chat ao vivo ou e-mail support@myfreefollower.com com ID do pedido e e-mail da conta. Revisão em 24–48 horas.",
    refundSection4Title: "Reembolsos por método de pagamento",
    refundSection4Body:
      "Reembolsos aprovados voltam ao método original quando possível. Pagamentos crypto ou saldo podem ser creditados na conta ou reembolsados por acordo.",
  },
  it: {
    privacyTitle: "Informativa sulla privacy",
    termsTitle: "Termini di servizio",
    lastUpdated: "Ultimo aggiornamento",
    lastUpdatedDate: "1 agosto 2026",
    privacyIntro:
      "Questa Informativa sulla privacy spiega come MyFreeFollower raccoglie, utilizza e protegge le tue informazioni quando usi il nostro sito e i nostri servizi.",
    privacySection1Title: "Informazioni che raccogliamo",
    privacySection1Body:
      "Raccogliamo dati forniti in registrazione (username, email, password), dettagli ordini (username e link profilo), prove delle task e messaggi al supporto. Raccogliamo anche dati di utilizzo base come IP e tipo browser per sicurezza e analisi.",
    privacySection2Title: "Come usiamo le tue informazioni",
    privacySection2Body:
      "Usiamo i tuoi dati per gestire l'account, elaborare ordini, revisionare prove, prevenire frodi, migliorare i servizi e rispondere al supporto. Non vendiamo informazioni personali a terzi.",
    privacySection3Title: "Cookie e analitica",
    privacySection3Body:
      "Usiamo cookie per ricordare lingua e sessione. Strumenti analitici ci aiutano a capire come i visitatori usano il sito per migliorare l'esperienza.",
    privacySection4Title: "Conservazione e sicurezza",
    privacySection4Body:
      "Conserviamo i dati account finché è attivo e come richiesto dalla legge. Implementiamo misure di sicurezza ragionevoli, senza garanzia assoluta.",
    privacySection5Title: "I tuoi diritti",
    privacySection5Body:
      "Puoi richiedere accesso, correzione o cancellazione dei dati contattando support@myfreefollower.com. Puoi eliminare i dati account contattandoci.",
    privacySection6Title: "Contatto",
    privacySection6Body:
      "Per domande sulla privacy, scrivi a support@myfreefollower.com o usa la pagina contatti.",
    termsIntro:
      "Usando MyFreeFollower accetti questi Termini di servizio. Leggili attentamente.",
    termsSection1Title: "Accettazione dei termini",
    termsSection1Body:
      "Creando un account o effettuando un ordine, accetti questi termini e le leggi applicabili. Se non sei d'accordo, non usare i nostri servizi.",
    termsSection2Title: "Responsabilità dell'account",
    termsSection2Body:
      "Sei responsabile della sicurezza delle credenziali e di ogni attività sotto il tuo account. Fornisci informazioni accurate e non creare più account per abusare delle prove gratuite.",
    termsSection3Title: "Servizi e consegna",
    termsSection3Body:
      "Forniamo servizi di crescita social con consegna graduale. I tempi sono stime, non garanzie. Possiamo annullare o rimborsare ordini che violino policy delle piattaforme o le nostre regole di uso equo.",
    termsSection4Title: "Task, punti e prelievi",
    termsSection4Body:
      "I punti si guadagnano completando task approvate. Possiamo rifiutare prove incomplete o fraudolente. I prelievi sono soggetti a minimi e revisione manuale. Le commissioni referral sono accreditate secondo le regole del programma.",
    termsSection5Title: "Uso vietato",
    termsSection5Body:
      "Non puoi usare i nostri servizi per attività illegali, molestie, spam o violare i termini di piattaforme terze. Possiamo sospendere o chiudere account abusivi.",
    termsSection6Title: "Limitazione di responsabilità",
    termsSection6Body:
      "MyFreeFollower è fornito così com'è. Non siamo affiliati a Instagram, TikTok, YouTube o altre piattaforme social. Non siamo responsabili per azioni di piattaforme terze sul tuo account.",
    termsSection7Title: "Modifiche e contatto",
    termsSection7Body:
      "Possiamo aggiornare questi termini in qualsiasi momento. L'uso continuato implica accettazione. Contatto: support@myfreefollower.com.",
    refundTitle: "Politica di rimborso",
    refundDescription: "Come gestiamo i rimborsi quando un ordine non può essere completato come descritto.",
    refundIntro:
      "Vogliamo che ogni ordine vada a buon fine. Se non possiamo consegnare ciò che hai pagato, contattaci per una soluzione equa.",
    refundSection1Title: "Quando si applicano i rimborsi",
    refundSection1Body:
      "Puoi richiedere rimborso se l'ordine non è partito entro la finestra indicata, non è stato consegnato, o era significativamente incompleto per colpa nostra.",
    refundSection2Title: "Quando non si applicano i rimborsi",
    refundSection2Body:
      "Nessun rimborso per cancellazione dopo inizio consegna, link errati o account privati forniti dal cliente, o azioni di piattaforma fuori dal nostro controllo.",
    refundSection3Title: "Come richiedere un rimborso",
    refundSection3Body:
      "Contatta il supporto via WhatsApp, live chat o email support@myfreefollower.com con ID ordine e email account. Revisione entro 24–48 ore.",
    refundSection4Title: "Rimborsi per metodo di pagamento",
    refundSection4Body:
      "I rimborsi approvati tornano al metodo originale quando possibile. Pagamenti crypto o saldo possono essere accreditati sul conto o rimborsati per accordo.",
  },
  nl: {
    privacyTitle: "Privacybeleid",
    termsTitle: "Servicevoorwaarden",
    lastUpdated: "Laatst bijgewerkt",
    lastUpdatedDate: "1 augustus 2026",
    privacyIntro:
      "Dit privacybeleid legt uit hoe MyFreeFollower je informatie verzamelt, gebruikt en beschermt wanneer je onze website en diensten gebruikt.",
    privacySection1Title: "Informatie die we verzamelen",
    privacySection1Body:
      "We verzamelen gegevens bij registratie (gebruikersnaam, e-mail, wachtwoord), bestelgegevens (gebruikersnamen en profiellinks), taakbewijzen en supportberichten. Ook verzamelen we basisgebruiksdata zoals IP-adres en browsertype voor beveiliging en analyse.",
    privacySection2Title: "Hoe we je informatie gebruiken",
    privacySection2Body:
      "We gebruiken je gegevens om je account te beheren, bestellingen te verwerken, bewijzen te beoordelen, fraude te voorkomen, diensten te verbeteren en support te bieden. We verkopen je persoonsgegevens niet aan derden.",
    privacySection3Title: "Cookies en analytics",
    privacySection3Body:
      "We gebruiken cookies om je taalvoorkeur en sessie te onthouden. Analysetools helpen ons begrijpen hoe bezoekers de site gebruiken om de ervaring te verbeteren.",
    privacySection4Title: "Bewaring en beveiliging",
    privacySection4Body:
      "We bewaren accountgegevens zolang je account actief is en zoals wettelijk vereist. We implementeren redelijke beveiligingsmaatregelen, zonder absolute garantie.",
    privacySection5Title: "Je rechten",
    privacySection5Body:
      "Je kunt toegang, correctie of verwijdering van je gegevens aanvragen via support@myfreefollower.com. Accountgegevens kun je laten verwijderen door contact op te nemen.",
    privacySection6Title: "Contact",
    privacySection6Body:
      "Voor privacyvragen mail je naar support@myfreefollower.com of gebruik je onze contactpagina.",
    termsIntro:
      "Door MyFreeFollower te gebruiken ga je akkoord met deze servicevoorwaarden. Lees ze zorgvuldig.",
    termsSection1Title: "Acceptatie van voorwaarden",
    termsSection1Body:
      "Door een account aan te maken of te bestellen ga je akkoord met deze voorwaarden en toepasselijke wetgeving. Als je het niet eens bent, gebruik onze diensten niet.",
    termsSection2Title: "Accountverantwoordelijkheden",
    termsSection2Body:
      "Je bent verantwoordelijk voor de beveiliging van je inloggegevens en alle activiteit onder je account. Geef accurate informatie en maak geen meerdere accounts om gratis proefjes te misbruiken.",
    termsSection3Title: "Diensten en levering",
    termsSection3Body:
      "We bieden social media groeidiensten met geleidelijke levering. Levertijden zijn schattingen, geen garanties. We kunnen bestellingen annuleren of terugbetalen die platformregels of onze fair-use regels schenden.",
    termsSection4Title: "Taken, punten en opnames",
    termsSection4Body:
      "Punten worden verdiend met goedgekeurde taken. Onvolledige of frauduleuze bewijzen kunnen worden afgewezen. Opnames zijn onderworpen aan minimums en handmatige controle. Referralcommissies worden gecrediteerd volgens programmaregels.",
    termsSection5Title: "Verboden gebruik",
    termsSection5Body:
      "Je mag onze diensten niet gebruiken voor illegale activiteit, intimidatie, spam of schending van voorwaarden van derde platforms. We kunnen misbruikende accounts opschorten of beëindigen.",
    termsSection6Title: "Beperking van aansprakelijkheid",
    termsSection6Body:
      "MyFreeFollower wordt geleverd zoals het is. We zijn niet gelieerd aan Instagram, TikTok, YouTube of andere platforms. We zijn niet aansprakelijk voor acties van derde platforms op je account.",
    termsSection7Title: "Wijzigingen en contact",
    termsSection7Body:
      "We kunnen deze voorwaarden op elk moment bijwerken. Voortgezet gebruik geldt als acceptatie. Contact: support@myfreefollower.com.",
    refundTitle: "Restitutiebeleid",
    refundDescription: "Hoe we restituties afhandelen wanneer een bestelling niet kan worden voltooid zoals beschreven.",
    refundIntro:
      "We willen dat elke bestelling goed verloopt. Als we niet kunnen leveren wat je betaalde, neem contact op voor een eerlijke oplossing.",
    refundSection1Title: "Wanneer restituties gelden",
    refundSection1Body:
      "Je kunt restitutie aanvragen als je bestelling niet binnen het aangegeven venster is gestart, helemaal niet is geleverd, of aanzienlijk incompleet was door onze schuld.",
    refundSection2Title: "Wanneer geen restitutie",
    refundSection2Body:
      "Geen restitutie bij annulering na start levering, verkeerde links of privéaccounts door de klant, of platformacties buiten onze controle.",
    refundSection3Title: "Restitutie aanvragen",
    refundSection3Body:
      "Neem contact op via WhatsApp, live chat of e-mail support@myfreefollower.com met bestel-ID en account-e-mail. Beoordeling binnen 24–48 uur.",
    refundSection4Title: "Restitutie per betaalmethode",
    refundSection4Body:
      "Goedgekeurde restituties gaan waar mogelijk terug naar de oorspronkelijke betaalmethode. Crypto- of saldobetalingen kunnen op het account worden gecrediteerd of per overeenkomst worden terugbetaald.",
  },
  pl: {
    privacyTitle: "Polityka prywatności",
    termsTitle: "Regulamin",
    lastUpdated: "Ostatnia aktualizacja",
    lastUpdatedDate: "1 sierpnia 2026",
    privacyIntro:
      "Niniejsza Polityka prywatności wyjaśnia, jak MyFreeFollower zbiera, wykorzystuje i chroni Twoje informacje podczas korzystania z naszej witryny i usług.",
    privacySection1Title: "Informacje, które zbieramy",
    privacySection1Body:
      "Zbieramy dane podane przy rejestracji (nazwa użytkownika, e-mail, hasło), szczegóły zamówień (nazwy użytkowników i linki do profili), dowody zadań i wiadomości do wsparcia. Zbieramy też podstawowe dane użycia, takie jak adres IP i typ przeglądarki, dla bezpieczeństwa i analityki.",
    privacySection2Title: "Jak wykorzystujemy Twoje informacje",
    privacySection2Body:
      "Wykorzystujemy dane do obsługi konta, realizacji zamówień, weryfikacji dowodów, zapobiegania oszustwom, ulepszania usług i wsparcia. Nie sprzedajemy danych osobowych stronom trzecim.",
    privacySection3Title: "Pliki cookie i analityka",
    privacySection3Body:
      "Używamy plików cookie, aby zapamiętać język i sesję. Narzędzia analityczne pomagają zrozumieć, jak odwiedzający korzystają ze strony, aby poprawić doświadczenie.",
    privacySection4Title: "Przechowywanie i bezpieczeństwo",
    privacySection4Body:
      "Przechowujemy dane konta, dopóki konto jest aktywne i zgodnie z prawem. Stosujemy rozsądne środki bezpieczeństwa, bez gwarancji absolutnej.",
    privacySection5Title: "Twoje prawa",
    privacySection5Body:
      "Możesz poprosić o dostęp, poprawkę lub usunięcie danych, kontaktując support@myfreefollower.com. Możesz usunąć dane konta, kontaktując się z nami.",
    privacySection6Title: "Kontakt",
    privacySection6Body:
      "W sprawach prywatności napisz na support@myfreefollower.com lub skorzystaj ze strony kontaktowej.",
    termsIntro:
      "Korzystając z MyFreeFollower, akceptujesz niniejszy Regulamin. Przeczytaj go uważnie.",
    termsSection1Title: "Akceptacja regulaminu",
    termsSection1Body:
      "Tworząc konto lub składając zamówienie, zgadzasz się przestrzegać regulaminu i obowiązującego prawa. Jeśli się nie zgadzasz, nie korzystaj z naszych usług.",
    termsSection2Title: "Obowiązki konta",
    termsSection2Body:
      "Odpowiadasz za bezpieczeństwo danych logowania i całą aktywność na koncie. Podawaj prawdziwe informacje i nie twórz wielu kont, aby nadużywać darmowych testów.",
    termsSection3Title: "Usługi i dostawa",
    termsSection3Body:
      "Świadczymy usługi wzrostu w social mediach z stopniową dostawą. Terminy to szacunki, nie gwarancje. Możemy anulować lub zwrócić zamówienia naruszające zasady platform lub nasze zasady fair use.",
    termsSection4Title: "Zadania, punkty i wypłaty",
    termsSection4Body:
      "Punkty zdobywasz za zatwierdzone zadania. Możemy odrzucić niekompletne lub fałszywe dowody. Wypłaty podlegają minimum i ręcznej weryfikacji. Prowizje referral są naliczane według zasad programu.",
    termsSection5Title: "Zabronione użycie",
    termsSection5Body:
      "Nie wolno używać naszych usług do działań nielegalnych, nękania, spamu lub naruszania regulaminów platform trzecich. Możemy zawiesić lub zamknąć konta nadużywające systemu.",
    termsSection6Title: "Ograniczenie odpowiedzialności",
    termsSection6Body:
      "MyFreeFollower jest dostarczany w stanie, w jakim jest. Nie jesteśmy powiązani z Instagramem, TikTokiem, YouTube ani innymi platformami. Nie odpowiadamy za działania platform trzecich wobec Twojego konta.",
    termsSection7Title: "Zmiany i kontakt",
    termsSection7Body:
      "Możemy aktualizować regulamin w dowolnym momencie. Dalsze korzystanie oznacza akceptację. Kontakt: support@myfreefollower.com.",
    refundTitle: "Polityka zwrotów",
    refundDescription: "Jak obsługujemy zwroty, gdy zamówienia nie można zrealizować zgodnie z opisem.",
    refundIntro:
      "Chcemy, aby każde zamówienie przebiegło sprawnie. Jeśli nie możemy dostarczyć tego, za co zapłaciłeś, skontaktuj się z nami w sprawie sprawiedliwego rozwiązania.",
    refundSection1Title: "Kiedy przysługują zwroty",
    refundSection1Body:
      "Możesz poprosić o zwrot, jeśli zamówienie nie rozpoczęło się w podanym terminie, nie zostało dostarczone wcale lub było znacząco niekompletne z naszej winy.",
    refundSection2Title: "Kiedy zwroty nie przysługują",
    refundSection2Body:
      "Brak zwrotu przy anulowaniu po rozpoczęciu dostawy, błędnych linkach lub prywatnych kontach podanych przez klienta, lub działaniach platform poza naszą kontrolą.",
    refundSection3Title: "Jak poprosić o zwrot",
    refundSection3Body:
      "Skontaktuj się z supportem przez WhatsApp, live chat lub e-mail support@myfreefollower.com z ID zamówienia i e-mailem konta. Weryfikacja w 24–48 godzin.",
    refundSection4Title: "Zwroty według metody płatności",
    refundSection4Body:
      "Zatwierdzone zwroty trafiają na pierwotną metodę płatności, gdy to możliwe. Płatności crypto lub saldo mogą być zaksięgowane na koncie lub zwrócone po uzgodnieniu.",
  },
  ro: {
    privacyTitle: "Politica de confidențialitate",
    termsTitle: "Termeni și condiții",
    lastUpdated: "Ultima actualizare",
    lastUpdatedDate: "1 august 2026",
    privacyIntro:
      "Această Politică de confidențialitate explică modul în care MyFreeFollower colectează, utilizează și protejează informațiile tale când folosești site-ul și serviciile noastre.",
    privacySection1Title: "Informații pe care le colectăm",
    privacySection1Body:
      "Colectăm date furnizate la înregistrare (nume utilizator, e-mail, parolă), detalii comenzi (nume de utilizator și linkuri profil), dovezi de sarcini și mesaje către suport. Colectăm și date de utilizare de bază precum IP și tip browser pentru securitate și analiză.",
    privacySection2Title: "Cum folosim informațiile tale",
    privacySection2Body:
      "Folosim datele pentru administrarea contului, procesarea comenzilor, verificarea dovezilor, prevenirea fraudei, îmbunătățirea serviciilor și suport. Nu vindem informații personale către terți.",
    privacySection3Title: "Cookie-uri și analiză",
    privacySection3Body:
      "Folosim cookie-uri pentru a reține limba și sesiunea. Instrumentele analitice ne ajută să înțelegem cum folosesc vizitatorii site-ul pentru a îmbunătăți experiența.",
    privacySection4Title: "Păstrare și securitate",
    privacySection4Body:
      "Păstrăm datele contului cât timp este activ și conform legii. Implementăm măsuri de securitate rezonabile, fără garanție absolută.",
    privacySection5Title: "Drepturile tale",
    privacySection5Body:
      "Poți solicita acces, corectare sau ștergere a datelor contactând support@myfreefollower.com. Poți șterge datele contului contactându-ne.",
    privacySection6Title: "Contact",
    privacySection6Body:
      "Pentru întrebări de confidențialitate, scrie la support@myfreefollower.com sau folosește pagina de contact.",
    termsIntro:
      "Prin utilizarea MyFreeFollower, accepți acești Termeni și condiții. Citește-i cu atenție.",
    termsSection1Title: "Acceptarea termenilor",
    termsSection1Body:
      "Prin crearea unui cont sau plasarea unei comenzi, ești de acord să respecți acești termeni și legile aplicabile. Dacă nu ești de acord, nu folosi serviciile noastre.",
    termsSection2Title: "Responsabilități cont",
    termsSection2Body:
      "Ești responsabil pentru securitatea credențialelor și toată activitatea de pe cont. Furnizează informații corecte și nu crea conturi multiple pentru a abuza de testele gratuite.",
    termsSection3Title: "Servicii și livrare",
    termsSection3Body:
      "Oferim servicii de creștere socială cu livrare graduală. Termenele sunt estimări, nu garanții. Putem anula sau rambursa comenzi care încalcă politicile platformelor sau regulile noastre de utilizare corectă.",
    termsSection4Title: "Sarcini, puncte și retrageri",
    termsSection4Body:
      "Punctele se câștigă prin sarcini aprobate. Putem respinge dovezi incomplete sau frauduloase. Retragerile sunt supuse unor minime și revizuirii manuale. Comisionele de recomandare sunt creditate conform regulilor programului.",
    termsSection5Title: "Utilizare interzisă",
    termsSection5Body:
      "Nu poți folosi serviciile noastre pentru activități ilegale, hărțuire, spam sau încălcarea termenilor platformelor terțe. Putem suspenda sau închide conturi abuzive.",
    termsSection6Title: "Limitarea răspunderii",
    termsSection6Body:
      "MyFreeFollower este furnizat ca atare. Nu suntem afiliați cu Instagram, TikTok, YouTube sau alte platforme sociale. Nu răspundem pentru acțiunile platformelor terțe asupra contului tău.",
    termsSection7Title: "Modificări și contact",
    termsSection7Body:
      "Putem actualiza acești termeni oricând. Utilizarea continuă implică acceptare. Contact: support@myfreefollower.com.",
    refundTitle: "Politica de rambursare",
    refundDescription: "Cum gestionăm rambursările când o comandă nu poate fi finalizată conform descrierii.",
    refundIntro:
      "Vrem ca fiecare comandă să meargă bine. Dacă nu putem livra ce ai plătit, contactează-ne pentru o soluție echitabilă.",
    refundSection1Title: "Când se aplică rambursări",
    refundSection1Body:
      "Poți solicita rambursare dacă comanda nu a început în fereastra indicată, nu a fost livrată deloc sau a fost semnificativ incompletă din vina noastră.",
    refundSection2Title: "Când nu se aplică rambursări",
    refundSection2Body:
      "Fără rambursare la anulare după începerea livrării, linkuri greșite sau conturi private furnizate de client, sau acțiuni ale platformei în afara controlului nostru.",
    refundSection3Title: "Cum soliciți rambursare",
    refundSection3Body:
      "Contactează suportul prin WhatsApp, chat live sau e-mail support@myfreefollower.com cu ID comandă și e-mail cont. Revizuire în 24–48 ore.",
    refundSection4Title: "Rambursări după metoda de plată",
    refundSection4Body:
      "Rambursările aprobate revin la metoda originală când este posibil. Plățile crypto sau sold pot fi creditate în cont sau rambursate prin acord.",
  },
  ru: {
    privacyTitle: "Политика конфиденциальности",
    termsTitle: "Условия использования",
    lastUpdated: "Последнее обновление",
    lastUpdatedDate: "1 августа 2026 г.",
    privacyIntro:
      "Настоящая Политика конфиденциальности объясняет, как MyFreeFollower собирает, использует и защищает вашу информацию при использовании нашего сайта и услуг.",
    privacySection1Title: "Какие данные мы собираем",
    privacySection1Body:
      "Мы собираем данные при регистрации (имя пользователя, email, пароль), детали заказов (имена пользователей и ссылки на профили), доказательства выполнения заданий и сообщения в поддержку. Также собираем базовые данные использования, такие как IP-адрес и тип браузера, для безопасности и аналитики.",
    privacySection2Title: "Как мы используем ваши данные",
    privacySection2Body:
      "Мы используем данные для управления аккаунтом, обработки заказов, проверки доказательств, предотвращения мошенничества, улучшения сервисов и поддержки. Мы не продаём персональные данные третьим лицам.",
    privacySection3Title: "Файлы cookie и аналитика",
    privacySection3Body:
      "Мы используем cookie для сохранения языка и сессии. Аналитические инструменты помогают понять, как посетители используют сайт, чтобы улучшить опыт.",
    privacySection4Title: "Хранение и безопасность",
    privacySection4Body:
      "Мы храним данные аккаунта, пока он активен, и в соответствии с законом. Применяем разумные меры безопасности, но абсолютную защиту гарантировать нельзя.",
    privacySection5Title: "Ваши права",
    privacySection5Body:
      "Вы можете запросить доступ, исправление или удаление данных, написав на support@myfreefollower.com. Удалить данные аккаунта можно, связавшись с нами.",
    privacySection6Title: "Контакты",
    privacySection6Body:
      "По вопросам конфиденциальности пишите на support@myfreefollower.com или используйте страницу контактов.",
    termsIntro:
      "Используя MyFreeFollower, вы соглашаетесь с настоящими Условиями использования. Прочитайте их внимательно.",
    termsSection1Title: "Принятие условий",
    termsSection1Body:
      "Создавая аккаунт или оформляя заказ, вы соглашаетесь соблюдать эти условия и применимое законодательство. Если не согласны — не используйте наши услуги.",
    termsSection2Title: "Обязанности владельца аккаунта",
    termsSection2Body:
      "Вы отвечаете за безопасность учётных данных и всю активность под вашим аккаунтом. Указывайте точную информацию и не создавайте несколько аккаунтов для злоупотребления бесплатными пробниками.",
    termsSection3Title: "Услуги и доставка",
    termsSection3Body:
      "Мы предоставляем услуги роста в соцсетях с постепенной доставкой. Сроки — оценки, а не гарантии. Мы можем отменить или вернуть средства за заказы, нарушающие правила платформ или наши правила fair use.",
    termsSection4Title: "Задания, баллы и вывод",
    termsSection4Body:
      "Баллы начисляются за одобренные задания. Неполные или мошеннические доказательства могут быть отклонены. Вывод средств подлежит минимумам и ручной проверке. Реферальные комиссии начисляются по правилам программы.",
    termsSection5Title: "Запрещённое использование",
    termsSection5Body:
      "Нельзя использовать наши услуги для незаконной деятельности, домогательств, спама или нарушения условий сторонних платформ. Мы можем заблокировать или закрыть злоупотребляющие аккаунты.",
    termsSection6Title: "Ограничение ответственности",
    termsSection6Body:
      "MyFreeFollower предоставляется «как есть». Мы не связаны с Instagram, TikTok, YouTube или другими платформами. Не несём ответственности за действия сторонних платформ в отношении вашего аккаунта.",
    termsSection7Title: "Изменения и контакты",
    termsSection7Body:
      "Мы можем обновлять условия в любое время. Продолжение использования означает согласие. Вопросы: support@myfreefollower.com.",
    refundTitle: "Политика возврата",
    refundDescription: "Как мы обрабатываем возвраты, если заказ не может быть выполнен как описано.",
    refundIntro:
      "Мы хотим, чтобы каждый заказ прошёл гладко. Если не можем доставить оплаченное — свяжитесь с нами для справедливого решения.",
    refundSection1Title: "Когда применяются возвраты",
    refundSection1Body:
      "Вы можете запросить возврат, если заказ не начался в указанный срок, не был доставлен вообще или был существенно неполным по нашей вине.",
    refundSection2Title: "Когда возвраты не применяются",
    refundSection2Body:
      "Нет возврата при отмене после начала доставки, неверных ссылках или приватных аккаунтах, указанных клиентом, или действиях платформы вне нашего контроля.",
    refundSection3Title: "Как запросить возврат",
    refundSection3Body:
      "Свяжитесь с поддержкой через WhatsApp, live chat или email support@myfreefollower.com с ID заказа и email аккаунта. Рассмотрение за 24–48 часов.",
    refundSection4Title: "Возврат по способу оплаты",
    refundSection4Body:
      "Одобренные возвраты идут на исходный способ оплаты, когда возможно. Crypto или баланс могут быть зачислены на аккаунт или возвращены по договорённости.",
  },
  uk: {
    privacyTitle: "Політика конфіденційності",
    termsTitle: "Умови використання",
    lastUpdated: "Останнє оновлення",
    lastUpdatedDate: "1 серпня 2026 р.",
    privacyIntro:
      "Ця Політика конфіденційності пояснює, як MyFreeFollower збирає, використовує та захищає вашу інформацію під час користування нашим сайтом і послугами.",
    privacySection1Title: "Які дані ми збираємо",
    privacySection1Body:
      "Ми збираємо дані при реєстрації (ім'я користувача, email, пароль), деталі замовлень (імена користувачів і посилання на профілі), докази виконання завдань і повідомлення в підтримку. Також збираємо базові дані використання, такі як IP-адреса та тип браузера, для безпеки та аналітики.",
    privacySection2Title: "Як ми використовуємо ваші дані",
    privacySection2Body:
      "Ми використовуємо дані для керування акаунтом, обробки замовлень, перевірки доказів, запобігання шахрайству, покращення сервісів і підтримки. Ми не продаємо персональні дані третім особам.",
    privacySection3Title: "Файли cookie та аналітика",
    privacySection3Body:
      "Ми використовуємо cookie для збереження мови та сесії. Аналітичні інструменти допомагають зрозуміти, як відвідувачі користуються сайтом, щоб покращити досвід.",
    privacySection4Title: "Зберігання та безпека",
    privacySection4Body:
      "Ми зберігаємо дані акаунта, поки він активний, і відповідно до закону. Застосовуємо розумні заходи безпеки, але абсолютний захист гарантувати неможливо.",
    privacySection5Title: "Ваші права",
    privacySection5Body:
      "Ви можете запросити доступ, виправлення або видалення даних, написавши на support@myfreefollower.com. Видалити дані акаунта можна, зв'язавшись з нами.",
    privacySection6Title: "Контакти",
    privacySection6Body:
      "З питань конфіденційності пишіть на support@myfreefollower.com або скористайтеся сторінкою контактів.",
    termsIntro:
      "Користуючись MyFreeFollower, ви погоджуєтесь з цими Умовами використання. Прочитайте їх уважно.",
    termsSection1Title: "Прийняття умов",
    termsSection1Body:
      "Створюючи акаунт або оформлюючи замовлення, ви погоджуєтесь дотримуватися цих умов і застосовного законодавства. Якщо не згодні — не користуйтеся нашими послугами.",
    termsSection2Title: "Обов'язки власника акаунта",
    termsSection2Body:
      "Ви відповідаєте за безпеку облікових даних і всю активність під вашим акаунтом. Вказуйте точну інформацію і не створюйте кілька акаунтів для зловживання безкоштовними пробниками.",
    termsSection3Title: "Послуги та доставка",
    termsSection3Body:
      "Ми надаємо послуги зростання в соцмережах із поступовою доставкою. Терміни — оцінки, а не гарантії. Ми можемо скасувати або повернути кошти за замовлення, що порушують правила платформ або наші правила fair use.",
    termsSection4Title: "Завдання, бали та виведення",
    termsSection4Body:
      "Бали нараховуються за схвалені завдання. Неповні або шахрайські докази можуть бути відхилені. Виведення підлягає мінімумам і ручній перевірці. Реферальні комісії нараховуються за правилами програми.",
    termsSection5Title: "Заборонене використання",
    termsSection5Body:
      "Не можна використовувати наші послуги для незаконної діяльності, домагань, спаму або порушення умов сторонніх платформ. Ми можемо заблокувати або закрити зловживальні акаунти.",
    termsSection6Title: "Обмеження відповідальності",
    termsSection6Body:
      "MyFreeFollower надається «як є». Ми не пов'язані з Instagram, TikTok, YouTube чи іншими платформами. Не несемо відповідальності за дії сторонніх платформ щодо вашого акаунта.",
    termsSection7Title: "Зміни та контакти",
    termsSection7Body:
      "Ми можемо оновлювати умови будь-коли. Продовження використання означає згоду. Питання: support@myfreefollower.com.",
    refundTitle: "Політика повернення",
    refundDescription: "Як ми обробляємо повернення, якщо замовлення не може бути виконане як описано.",
    refundIntro:
      "Ми хочемо, щоб кожне замовлення пройшло гладко. Якщо не можемо доставити оплачене — зв'яжіться з нами для справедливого рішення.",
    refundSection1Title: "Коли застосовуються повернення",
    refundSection1Body:
      "Ви можете запросити повернення, якщо замовлення не розпочалося в указаний термін, не було доставлене взагалі або було суттєво неповним з нашої вини.",
    refundSection2Title: "Коли повернення не застосовуються",
    refundSection2Body:
      "Немає повернення при скасуванні після початку доставки, невірних посиланнях або приватних акаунтах, вказаних клієнтом, або діях платформи поза нашим контролем.",
    refundSection3Title: "Як запросити повернення",
    refundSection3Body:
      "Зв'яжіться з підтримкою через WhatsApp, live chat або email support@myfreefollower.com з ID замовлення та email акаунта. Розгляд за 24–48 годин.",
    refundSection4Title: "Повернення за способом оплати",
    refundSection4Body:
      "Схвалені повернення йдуть на початковий спосіб оплати, коли можливо. Crypto або баланс можуть бути зараховані на акаунт або повернені за домовленістю.",
  },
  tr: {
    privacyTitle: "Gizlilik Politikası",
    termsTitle: "Hizmet Şartları",
    lastUpdated: "Son güncelleme",
    lastUpdatedDate: "1 Ağustos 2026",
    privacyIntro:
      "Bu Gizlilik Politikası, web sitemizi ve hizmetlerimizi kullandığınızda MyFreeFollower'ın bilgilerinizi nasıl topladığını, kullandığını ve koruduğunu açıklar.",
    privacySection1Title: "Topladığımız bilgiler",
    privacySection1Body:
      "Kayıt sırasında verdiğiniz bilgileri (kullanıcı adı, e-posta, şifre), sipariş detaylarını (kullanıcı adları ve profil linkleri), görev kanıtlarını ve destek mesajlarını topluyoruz. Güvenlik ve analiz için IP adresi ve tarayıcı türü gibi temel kullanım verilerini de topluyoruz.",
    privacySection2Title: "Bilgilerinizi nasıl kullanıyoruz",
    privacySection2Body:
      "Verilerinizi hesabınızı yönetmek, siparişleri işlemek, görev kanıtlarını incelemek, dolandırıcılığı önlemek, hizmetleri geliştirmek ve destek sağlamak için kullanıyoruz. Kişisel bilgilerinizi üçüncü taraflara satmıyoruz.",
    privacySection3Title: "Çerezler ve analitik",
    privacySection3Body:
      "Dil tercihinizi ve oturumunuzu hatırlamak için çerezler kullanıyoruz. Analitik araçlar, ziyaretçilerin siteyi nasıl kullandığını anlamamıza ve deneyimi iyileştirmemize yardımcı olur.",
    privacySection4Title: "Saklama ve güvenlik",
    privacySection4Body:
      "Hesap verilerini hesabınız aktifken ve yasaların gerektirdiği süre boyunca saklıyoruz. Makul güvenlik önlemleri uyguluyoruz, ancak mutlak güvenlik garanti edilemez.",
    privacySection5Title: "Haklarınız",
    privacySection5Body:
      "support@myfreefollower.com adresine yazarak kişisel verilerinize erişim, düzeltme veya silme talep edebilirsiniz. Hesap verilerinizi bizimle iletişime geçerek silebilirsiniz.",
    privacySection6Title: "İletişim",
    privacySection6Body:
      "Gizlilik soruları için support@myfreefollower.com adresine yazın veya iletişim sayfamızı kullanın.",
    privacySection7Title: "Üçüncü taraf hizmet sağlayıcılar",
    privacySection7Body:
      "Barındırma, ödeme, analitik ve e-posta için güvenilir altyapı ortakları kullanıyoruz. Ortaklar veriyi yalnızca bizim adımıza işler ve sözleşmeyle korumak zorundadır. Verilerinizi satmalarına izin vermiyoruz.",
    privacySection8Title: "Uluslararası veri aktarımı",
    privacySection8Body:
      "MyFreeFollower küresel çalışır. Bilgileriniz kendi ülkeniz dışında işlenebilir. Gerekli olduğunda sözleşmesel güvenceler veya eşdeğer yasal mekanizmalar uygulanır.",
    privacySection9Title: "Çocukların gizliliği",
    privacySection9Body:
      "Hizmetlerimiz 16 yaş altına yönelik değildir. Bilerek çocuk verisi toplamıyoruz. Çocuk hesabı olduğunu düşünüyorsanız support@myfreefollower.com'a yazın, hesabı sileriz.",
    privacySection10Title: "Politika güncellemeleri",
    privacySection10Body:
      "Bu politikayı yasal, teknik veya iş değişikliklerine göre güncelleyebiliriz. Önemli değişiklikler e-posta veya site bildirimiyle duyurulabilir. Kullanıma devam kabul sayılır.",
    termsIntro:
      "MyFreeFollower'ı kullanarak bu Hizmet Şartlarını kabul etmiş olursunuz. Lütfen dikkatlice okuyun.",
    termsSection1Title: "Şartların kabulü",
    termsSection1Body:
      "Hesap oluşturarak veya sipariş vererek bu şartlara ve geçerli yasalara uymayı kabul edersiniz. Kabul etmiyorsanız hizmetlerimizi kullanmayın.",
    termsSection2Title: "Hesap sorumlulukları",
    termsSection2Body:
      "Giriş bilgilerinizin güvenliğinden ve hesabınızdaki tüm aktiviteden siz sorumlusunuz. Doğru bilgi verin ve ücretsiz denemeleri kötüye kullanmak için birden fazla hesap açmayın.",
    termsSection3Title: "Hizmetler ve teslimat",
    termsSection3Body:
      "Kademeli teslimatla sosyal medya büyüme hizmetleri sunuyoruz. Teslimat süreleri tahmindir, garanti değildir. Platform politikalarını veya adil kullanım kurallarımızı ihlal eden siparişleri iptal edebilir veya iade edebiliriz.",
    termsSection4Title: "Görevler, puanlar ve ücretsiz hizmetler",
    termsSection4Body:
      "Puanlar onaylanmış panel görevleriyle kazanılır ve katalogdaki ücretsiz deneme paketlerinde harcanır. Ücretli hizmetler kart veya kripto gerektirir — puanlar ücretli siparişlerde veya nakde çevrilemez. Sahte kanıtlar reddedilir. Referans komisyonları panel kurallarına tabidir.",
    termsSection5Title: "Yasak kullanım",
    termsSection5Body:
      "Hizmetlerimizi yasadışı faaliyet, taciz, spam veya üçüncü taraf platform şartlarını ihlal etmek için kullanamazsınız. Sistemi kötüye kullanan hesapları askıya alabilir veya kapatabiliriz.",
    termsSection6Title: "Sorumluluk sınırlaması",
    termsSection6Body:
      "MyFreeFollower olduğu gibi sunulur. Instagram, TikTok, YouTube veya herhangi bir sosyal platformla bağlantılı değiliz. Üçüncü taraf platformların hesabınıza yönelik işlemlerinden sorumlu değiliz.",
    termsSection7Title: "Değişiklikler ve iletişim",
    termsSection7Body:
      "Bu şartları istediğimiz zaman güncelleyebiliriz. Kullanıma devam etmek kabul anlamına gelir. Sorular: support@myfreefollower.com.",
    termsSection8Title: "Ödemeler ve faturalama",
    termsSection8Body:
      "Ücretli siparişler checkout'ta gösterilen para biriminde faturalandırılır. Seçilen yöntemle tahsilat yetkisi verirsiniz. Başarısız kart veya kripto ödemeleri aktif sipariş oluşturmaz.",
    termsSection9Title: "Fikri mülkiyet",
    termsSection9Body:
      "MyFreeFollower logosu, site tasarımı ve özgün içerik korunur. Katalogumuzu yazılı izin olmadan kopyalayamaz veya yeniden satamazsınız. Kanıt medyanız size aittir; inceleme için bize lisans verirsiniz.",
    termsSection10Title: "Uyuşmazlık çözümü",
    termsSection10Body:
      "Her sipariş uyuşmazlığında önce destekle iletişime geçin. 48 saat içinde çözüm hedefliyoruz. Destekle konuşmadan açılan chargeback hesap askısına yol açabilir.",
    termsSection11Title: "Uygulanacak hukuk",
    termsSection11Body:
      "Bu şartlar şirket kaydımızdaki yargı alanına tabidir. Yerel tüketici hakları yasaların gerektirdiği ölçüde geçerlidir.",
    termsSection12Title: "Bölünebilirlik",
    termsSection12Body:
      "Herhangi bir hüküm uygulanamaz bulunursa diğer hükümler yürürlükte kalır. Bir hakkın kullanılmaması gelecekte feragat sayılmaz.",
    refundTitle: "İade Politikası",
    refundDescription: "Bir sipariş tarif edildiği gibi tamamlanamadığında iadeleri nasıl ele aldığımız.",
    refundIntro:
      "Her siparişin sorunsuz gitmesini istiyoruz. Ödediğiniz şeyi teslim edemezsek, adil bir çözüm için bizimle iletişime geçin.",
    refundSection1Title: "İade ne zaman geçerlidir",
    refundSection1Body:
      "Siparişiniz belirtilen teslimat süresinde başlamadıysa, hiç teslim edilmediyse veya bizim hatamızla önemli ölçüde eksik kaldıysa iade talep edebilirsiniz.",
    refundSection2Title: "İade ne zaman geçerli değildir",
    refundSection2Body:
      "Teslimat başladıktan sonra müşteri iptali, müşterinin verdiği yanlış link veya gizli hesaplar veya kontrolümüz dışındaki platform işlemleri için iade yoktur.",
    refundSection3Title: "İade nasıl talep edilir",
    refundSection3Body:
      "Sipariş ID'niz ve hesap e-postanızla WhatsApp, canlı sohbet veya support@myfreefollower.com üzerinden destekle iletişime geçin. 24–48 saat içinde incelenir.",
    refundSection4Title: "Ödeme yöntemine göre iade",
    refundSection4Body:
      "Onaylanan iadeler mümkünse orijinal ödeme yöntemine döner. Kripto iadeler anlaşmaya göre kripto veya hesap kredisi olabilir. Kart iadeleri bankaya göre 5–10 iş günü sürebilir.",
    refundSection5Title: "Kısmi teslimat ve kısmi iade",
    refundSection5Body:
      "Bizim hatamızla siparişin yalnızca bir kısmı teslim edildiyse kısmi iade veya kalan miktarın tamamlanması sunulabilir. Kısmi iade yalnızca teslim edilmeyen kısımdan hesaplanır.",
    refundSection6Title: "Chargeback ve ödeme itirazları",
    refundSection6Body:
      "Destekle iletişime geçmeden banka chargeback'i gecikmeye ve hesap askısına yol açabilir. Önce support@myfreefollower.com'a sipariş ID ile yazın.",
    refundSection7Title: "İade işlem süresi",
    refundSection7Body:
      "Onaylanan iadeler onaydan sonra 1–3 iş günü içinde başlatılır. Kripto iadeler ağ onayına bağlıdır. İade işlendiğinde e-posta onayı alırsınız.",
    refundSection8Title: "İade talebi iletişimi",
    refundSection8Body:
      "Sipariş ID, hesap e-postası, ödeme yöntemi ve kısa açıklama ile support@myfreefollower.com, WhatsApp (+44 7544 368792) veya Telegram (@buycheapfollowerr) üzerinden yazın.",
  },
  ar: {
    privacyTitle: "سياسة الخصوصية",
    termsTitle: "شروط الخدمة",
    lastUpdated: "آخر تحديث",
    lastUpdatedDate: "1 أغسطس 2026",
    privacyIntro:
      "توضح سياسة الخصوصية هذه كيف يجمع MyFreeFollower معلوماتك ويستخدمها ويحميها عند استخدام موقعنا وخدماتنا.",
    privacySection1Title: "المعلومات التي نجمعها",
    privacySection1Body:
      "نجمع المعلومات التي تقدمها عند التسجيل (اسم المستخدم، البريد، كلمة المرور)، تفاصيل الطلبات (أسماء المستخدمين وروابط الملفات)، إثباتات المهام ورسائل الدعم. كما نجمع بيانات استخدام أساسية مثل عنوان IP ونوع المتصفح للأمان والتحليل.",
    privacySection2Title: "كيف نستخدم معلوماتك",
    privacySection2Body:
      "نستخدم بياناتك لإدارة حسابك ومعالجة الطلبات ومراجعة الإثباتات ومنع الاحتيال وتحسين الخدمات والرد على الدعم. لا نبيع معلوماتك الشخصية لأطراف ثالثة.",
    privacySection3Title: "ملفات تعريف الارتباط والتحليلات",
    privacySection3Body:
      "نستخدم ملفات تعريف الارتباط لتذكر لغتك وجلستك. تساعدنا أدوات التحليل على فهم كيفية استخدام الزوار للموقع لتحسين التجربة.",
    privacySection4Title: "الاحتفاظ بالبيانات والأمان",
    privacySection4Body:
      "نحتفظ ببيانات الحساب طالما كان نشطًا ووفقًا للقانون. نطبق تدابير أمنية معقولة، دون ضمان أمان مطلق.",
    privacySection5Title: "حقوقك",
    privacySection5Body:
      "يمكنك طلب الوصول أو التصحيح أو الحذف لبياناتك بالتواصل مع support@myfreefollower.com. يمكنك حذف بيانات الحساب بالتواصل معنا.",
    privacySection6Title: "التواصل",
    privacySection6Body:
      "لأسئلة الخصوصية، راسل support@myfreefollower.com أو استخدم صفحة التواصل.",
    termsIntro:
      "باستخدام MyFreeFollower، فإنك توافق على شروط الخدمة هذه. يرجى قراءتها بعناية.",
    termsSection1Title: "قبول الشروط",
    termsSection1Body:
      "بإنشاء حساب أو تقديم طلب، توافق على الالتزام بهذه الشروط والقوانين المعمول بها. إذا لم توافق، لا تستخدم خدماتنا.",
    termsSection2Title: "مسؤوليات الحساب",
    termsSection2Body:
      "أنت مسؤول عن أمان بيانات الدخول وكل النشاط تحت حسابك. قدم معلومات دقيقة ولا تنشئ حسابات متعددة لإساءة استخدام التجارب المجانية.",
    termsSection3Title: "الخدمات والتسليم",
    termsSection3Body:
      "نقدم خدمات نمو على وسائل التواصل بتسليم تدريجي. المواعيد تقديرية وليست ضمانات. قد نلغي أو نسترد الطلبات التي تنتهك سياسات المنصات أو قواعد الاستخدام العادل.",
    termsSection4Title: "المهام والنقاط والسحب",
    termsSection4Body:
      "تُكتسب النقاط بإكمال مهام معتمدة. قد نرفض إثباتات ناقصة أو احتيالية. السحب يخضع لحدود دنيا ومراجعة يدوية. تُضاف عمولات الإحالة وفق قواعد البرنامج.",
    termsSection5Title: "الاستخدام المحظور",
    termsSection5Body:
      "لا يجوز استخدام خدماتنا لأنشطة غير قانونية أو مضايقة أو رسائل مزعجة أو انتهاك شروط منصات طرف ثالث. قد نعلق أو ننهي الحسابات المسيئة.",
    termsSection6Title: "تحديد المسؤولية",
    termsSection6Body:
      "يُقدَّم MyFreeFollower كما هو. لسنا تابعين لـ Instagram أو TikTok أو YouTube أو أي منصة اجتماعية. لسنا مسؤولين عن إجراءات المنصات تجاه حسابك.",
    termsSection7Title: "التغييرات والتواصل",
    termsSection7Body:
      "قد نحدّث هذه الشروط في أي وقت. الاستمرار في الاستخدام يعني القبول. تواصل: support@myfreefollower.com.",
    refundTitle: "سياسة الاسترداد",
    refundDescription: "كيف نتعامل مع الاسترداد عندما لا يمكن إكمال الطلب كما هو موصوف.",
    refundIntro:
      "نريد أن يسير كل طلب بسلاسة. إذا لم نتمكن من تسليم ما دفعته، تواصل معنا لحل عادل.",
    refundSection1Title: "متى ينطبق الاسترداد",
    refundSection1Body:
      "يمكنك طلب استرداد إذا لم يبدأ طلبك ضمن نافذة التسليم المحددة، أو لم يُسلَّم إطلاقًا، أو كان ناقصًا بشكل كبير بسبب خطأ منا.",
    refundSection2Title: "متى لا ينطبق الاسترداد",
    refundSection2Body:
      "لا استرداد عند إلغاء العميل بعد بدء التسليم، أو روابط خاطئة أو حسابات خاصة من العميل، أو إجراءات منصة خارج سيطرتنا.",
    refundSection3Title: "كيف تطلب الاسترداد",
    refundSection3Body:
      "تواصل مع الدعم عبر WhatsApp أو الدردشة أو support@myfreefollower.com مع رقم الطلب وبريد الحساب. المراجعة خلال 24–48 ساعة.",
    refundSection4Title: "استرداد حسب طريقة الدفع",
    refundSection4Body:
      "يُعاد الاسترداد المعتمد إلى طريقة الدفع الأصلية عند الإمكان. قد تُضاف مدفوعات العملات الرقمية أو الرصيد إلى حسابك أو تُسترد بالاتفاق.",
  },
  fa: {
    privacyTitle: "سیاست حریم خصوصی",
    termsTitle: "شرایط استفاده",
    lastUpdated: "آخرین به‌روزرسانی",
    lastUpdatedDate: "۱ اوت ۲۰۲۶",
    privacyIntro:
      "این سیاست حریم خصوصی توضیح می‌دهد MyFreeFollower هنگام استفاده از وب‌سایت و خدمات ما چگونه اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کند.",
    privacySection1Title: "اطلاعاتی که جمع می‌کنیم",
    privacySection1Body:
      "اطلاعات ثبت‌نام (نام کاربری، ایمیل، رمز عبور)، جزئیات سفارش (نام کاربری و لینک پروفایل)، اثبات وظایف و پیام‌های پشتیبانی را جمع می‌کنیم. همچنین داده‌های پایه مانند IP و نوع مرورگر برای امنیت و تحلیل جمع می‌کنیم.",
    privacySection2Title: "نحوه استفاده از اطلاعات شما",
    privacySection2Body:
      "از داده‌های شما برای مدیریت حساب، پردازش سفارش، بررسی اثبات‌ها، جلوگیری از تقلب، بهبود خدمات و پاسخ پشتیبانی استفاده می‌کنیم. اطلاعات شخصی شما را به اشخاص ثالث نمی‌فروشیم.",
    privacySection3Title: "کوکی‌ها و تحلیل",
    privacySection3Body:
      "از کوکی برای به‌خاطر سپردن زبان و نشست استفاده می‌کنیم. ابزارهای تحلیل به ما کمک می‌کنند نحوه استفاده بازدیدکنندگان از سایت را بفهمیم و تجربه را بهبود دهیم.",
    privacySection4Title: "نگهداری و امنیت",
    privacySection4Body:
      "داده‌های حساب را تا زمانی که فعال است و طبق قانون نگه می‌داریم. اقدامات امنیتی معقول اعمال می‌کنیم، اما امنیت مطلق تضمین نمی‌شود.",
    privacySection5Title: "حقوق شما",
    privacySection5Body:
      "می‌توانید با تماس support@myfreefollower.com دسترسی، اصلاح یا حذف داده‌های شخصی را درخواست کنید. با تماس با ما می‌توانید داده‌های حساب را حذف کنید.",
    privacySection6Title: "تماس",
    privacySection6Body:
      "برای سؤالات حریم خصوصی به support@myfreefollower.com بنویسید یا از صفحه تماس استفاده کنید.",
    termsIntro:
      "با استفاده از MyFreeFollower، این شرایط استفاده را می‌پذیرید. لطفاً با دقت بخوانید.",
    termsSection1Title: "پذیرش شرایط",
    termsSection1Body:
      "با ایجاد حساب یا ثبت سفارش، موافقت می‌کنید این شرایط و قوانین مربوطه را رعایت کنید. اگر موافق نیستید، از خدمات ما استفاده نکنید.",
    termsSection2Title: "مسئولیت‌های حساب",
    termsSection2Body:
      "شما مسئول امنیت اطلاعات ورود و تمام فعالیت تحت حساب خود هستید. اطلاعات دقیق بدهید و برای سوءاستفاده از آزمایش‌های رایگان چند حساب نسازید.",
    termsSection3Title: "خدمات و تحویل",
    termsSection3Body:
      "خدمات رشد شبکه‌های اجتماعی را با تحویل تدریجی ارائه می‌دهیم. زمان‌ها تخمین است، نه تضمین. می‌توانیم سفارش‌هایی که سیاست پلتفرم یا قوانین استفاده منصفانه ما را نقض کنند لغو یا بازپرداخت کنیم.",
    termsSection4Title: "وظایف، امتیاز و برداشت",
    termsSection4Body:
      "امتیاز با تکمیل وظایف تأییدشده به‌دست می‌آید. اثبات‌های ناقص یا جعلی ممکن است رد شوند. برداشت مشمول حداقل و بررسی دستی است. کمیسیون معرفی طبق قوانین برنامه واریز می‌شود.",
    termsSection5Title: "استفاده ممنوع",
    termsSection5Body:
      "نباید از خدمات ما برای فعالیت غیرقانونی، آزار، هرزنامه یا نقض شرایط پلتفرم‌های دیگر استفاده کنید. ممکن است حساب‌های سوءاستفاده‌کننده را تعلیق یا ببندیم.",
    termsSection6Title: "محدودیت مسئولیت",
    termsSection6Body:
      "MyFreeFollower «همان‌طور که هست» ارائه می‌شود. با Instagram، TikTok، YouTube یا هیچ پلتفرم اجتماعی وابسته نیستیم. مسئول اقدامات پلتفرم‌های دیگر علیه حساب شما نیستیم.",
    termsSection7Title: "تغییرات و تماس",
    termsSection7Body:
      "می‌توانیم این شرایط را هر زمان به‌روز کنیم. ادامه استفاده به‌منزله پذیرش است. تماس: support@myfreefollower.com.",
    refundTitle: "سیاست بازپرداخت",
    refundDescription: "نحوه رسیدگی به بازپرداخت وقتی سفارش طبق توضیحات تکمیل نمی‌شود.",
    refundIntro:
      "می‌خواهیم هر سفارش درست پیش برود. اگر نتوانیم آنچه پرداخت کرده‌اید تحویل دهیم، برای راه‌حل منصفانه با ما تماس بگیرید.",
    refundSection1Title: "چه زمانی بازپرداخت اعمال می‌شود",
    refundSection1Body:
      "اگر سفارش در بازه تحویل اعلام‌شده شروع نشد، اصلاً تحویل نشد یا به‌طور قابل‌توجهی ناقص بود به‌خاطر خطای ما، می‌توانید بازپرداخت بخواهید.",
    refundSection2Title: "چه زمانی بازپرداخت اعمال نمی‌شود",
    refundSection2Body:
      "پس از شروع تحویل لغو مشتری، لینک یا حساب خصوصی اشتباه از سوی مشتری، یا اقدامات پلتفرم خارج از کنترل ما — بازپرداخت نیست.",
    refundSection3Title: "نحوه درخواست بازپرداخت",
    refundSection3Body:
      "با شناسه سفارش و ایمیل حساب از WhatsApp، چت زنده یا support@myfreefollower.com با پشتیبانی تماس بگیرید. بررسی در ۲۴–۴۸ ساعت.",
    refundSection4Title: "بازپرداخت بر اساس روش پرداخت",
    refundSection4Body:
      "بازپرداخت‌های تأییدشده در صورت امکان به روش پرداخت اصلی برمی‌گردد. پرداخت رمزارز یا موجودی ممکن است به حساب واریز یا طبق توافق بازپرداخت شود.",
  },
  zh: {
    privacyTitle: "隐私政策",
    termsTitle: "服务条款",
    lastUpdated: "最后更新",
    lastUpdatedDate: "2026年8月1日",
    privacyIntro:
      "本隐私政策说明 MyFreeFollower 在您使用我们的网站和服务时如何收集、使用和保护您的信息。",
    privacySection1Title: "我们收集的信息",
    privacySection1Body:
      "我们收集注册时提供的信息（用户名、邮箱、密码）、订单详情（用户名和主页链接）、任务证明及客服消息。我们还收集 IP 地址和浏览器类型等基本使用数据，用于安全与分析。",
    privacySection2Title: "我们如何使用您的信息",
    privacySection2Body:
      "我们使用您的数据管理账户、处理订单、审核任务证明、防止欺诈、改进服务并回复客服。我们不会向第三方出售您的个人信息。",
    privacySection3Title: "Cookie 与分析",
    privacySection3Body:
      "我们使用 Cookie 记住您的语言和会话。分析工具帮助我们了解访客如何使用网站，以改进体验。",
    privacySection4Title: "数据保留与安全",
    privacySection4Body:
      "在账户活跃期间及法律要求范围内保留账户数据。我们采取合理安全措施，但无法保证绝对安全。",
    privacySection5Title: "您的权利",
    privacySection5Body:
      "您可联系 support@myfreefollower.com 请求访问、更正或删除个人数据。也可联系我们删除账户数据。",
    privacySection6Title: "联系方式",
    privacySection6Body:
      "隐私相关问题请发邮件至 support@myfreefollower.com 或使用联系页面。",
    termsIntro: "使用 MyFreeFollower 即表示您同意本服务条款。请仔细阅读。",
    termsSection1Title: "条款接受",
    termsSection1Body:
      "创建账户或下单即表示您同意遵守本条款及适用法律。如不同意，请勿使用我们的服务。",
    termsSection2Title: "账户责任",
    termsSection2Body:
      "您需保管好登录凭据并对账户下的一切活动负责。请提供准确信息，不得创建多个账户滥用免费试用。",
    termsSection3Title: "服务与交付",
    termsSection3Body:
      "我们提供渐进式交付的社交媒体增长服务。交付时间为估算，非保证。我们可取消或退款违反平台政策或公平使用规则的订单。",
    termsSection4Title: "任务、积分与提现",
    termsSection4Body:
      "积分通过完成已批准任务获得。不完整或虚假证明可能被拒绝。提现受最低门槛和人工审核限制。推荐佣金按项目规则入账。",
    termsSection5Title: "禁止用途",
    termsSection5Body:
      "不得将我们的服务用于非法活动、骚扰、垃圾信息或违反第三方平台条款。我们可暂停或终止滥用账户。",
    termsSection6Title: "责任限制",
    termsSection6Body:
      "MyFreeFollower 按原样提供。我们与 Instagram、TikTok、YouTube 或任何社交平台无关联。不对第三方平台对您账户采取的行动负责。",
    termsSection7Title: "变更与联系",
    termsSection7Body:
      "我们可随时更新本条款。继续使用即视为接受。联系：support@myfreefollower.com。",
    refundTitle: "退款政策",
    refundDescription: "当订单无法按描述完成时，我们如何处理退款。",
    refundIntro: "我们希望每个订单都能顺利完成。若无法交付您所付款项，请联系我们寻求公平解决方案。",
    refundSection1Title: "何时可退款",
    refundSection1Body:
      "若订单未在规定的交付窗口内开始、完全未交付，或因我方原因严重不完整，您可申请退款。",
    refundSection2Title: "何时不可退款",
    refundSection2Body:
      "交付开始后客户取消、客户提供错误链接或私密账户、或平台在我们控制范围外的操作，不予退款。",
    refundSection3Title: "如何申请退款",
    refundSection3Body:
      "通过 WhatsApp、在线客服或 support@myfreefollower.com 联系客服，提供订单 ID 和账户邮箱。24–48 小时内审核。",
    refundSection4Title: "按支付方式的退款",
    refundSection4Body:
      "批准的退款在可能情况下退回原支付方式。加密货币或余额支付可能记入账户余额或按约定退款。",
  },
  id: {
    privacyTitle: "Kebijakan Privasi",
    termsTitle: "Syarat Layanan",
    lastUpdated: "Terakhir diperbarui",
    lastUpdatedDate: "1 Agustus 2026",
    privacyIntro:
      "Kebijakan Privasi ini menjelaskan bagaimana MyFreeFollower mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan situs dan layanan kami.",
    privacySection1Title: "Informasi yang kami kumpulkan",
    privacySection1Body:
      "Kami mengumpulkan data saat pendaftaran (username, email, kata sandi), detail pesanan (username dan link profil), bukti tugas, dan pesan dukungan. Kami juga mengumpulkan data penggunaan dasar seperti IP dan jenis browser untuk keamanan dan analitik.",
    privacySection2Title: "Cara kami menggunakan informasi Anda",
    privacySection2Body:
      "Kami menggunakan data untuk mengelola akun, memproses pesanan, meninjau bukti, mencegah penipuan, meningkatkan layanan, dan merespons dukungan. Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.",
    privacySection3Title: "Cookie dan analitik",
    privacySection3Body:
      "Kami menggunakan cookie untuk mengingat bahasa dan sesi Anda. Alat analitik membantu kami memahami bagaimana pengunjung menggunakan situs agar pengalaman dapat ditingkatkan.",
    privacySection4Title: "Retensi dan keamanan",
    privacySection4Body:
      "Kami menyimpan data akun selama akun aktif dan sesuai hukum. Kami menerapkan langkah keamanan wajar, tanpa jaminan keamanan mutlak.",
    privacySection5Title: "Hak Anda",
    privacySection5Body:
      "Anda dapat meminta akses, koreksi, atau penghapusan data dengan menghubungi support@myfreefollower.com. Anda dapat menghapus data akun dengan menghubungi kami.",
    privacySection6Title: "Kontak",
    privacySection6Body:
      "Untuk pertanyaan privasi, email ke support@myfreefollower.com atau gunakan halaman kontak.",
    termsIntro:
      "Dengan menggunakan MyFreeFollower, Anda setuju dengan Syarat Layanan ini. Harap baca dengan saksama.",
    termsSection1Title: "Penerimaan syarat",
    termsSection1Body:
      "Dengan membuat akun atau memesan, Anda setuju mematuhi syarat ini dan hukum yang berlaku. Jika tidak setuju, jangan gunakan layanan kami.",
    termsSection2Title: "Tanggung jawab akun",
    termsSection2Body:
      "Anda bertanggung jawab atas keamanan kredensial dan semua aktivitas di akun Anda. Berikan informasi akurat dan jangan buat banyak akun untuk menyalahgunakan uji coba gratis.",
    termsSection3Title: "Layanan dan pengiriman",
    termsSection3Body:
      "Kami menyediakan layanan pertumbuhan media sosial dengan pengiriman bertahap. Waktu pengiriman adalah estimasi, bukan jaminan. Kami dapat membatalkan atau mengembalikan dana pesanan yang melanggar kebijakan platform atau aturan fair use kami.",
    termsSection4Title: "Tugas, poin, dan penarikan",
    termsSection4Body:
      "Poin diperoleh dengan menyelesaikan tugas yang disetujui. Bukti tidak lengkap atau palsu dapat ditolak. Penarikan tunduk pada minimum dan tinjauan manual. Komisi referral dikreditkan sesuai aturan program.",
    termsSection5Title: "Penggunaan terlarang",
    termsSection5Body:
      "Anda tidak boleh menggunakan layanan kami untuk aktivitas ilegal, pelecehan, spam, atau melanggar syarat platform pihak ketiga. Kami dapat menangguhkan atau menutup akun yang menyalahgunakan sistem.",
    termsSection6Title: "Batasan tanggung jawab",
    termsSection6Body:
      "MyFreeFollower disediakan apa adanya. Kami tidak afiliasi dengan Instagram, TikTok, YouTube, atau platform sosial mana pun. Kami tidak bertanggung jawab atas tindakan platform pihak ketiga terhadap akun Anda.",
    termsSection7Title: "Perubahan dan kontak",
    termsSection7Body:
      "Kami dapat memperbarui syarat ini kapan saja. Penggunaan berkelanjutan berarti penerimaan. Kontak: support@myfreefollower.com.",
    refundTitle: "Kebijakan Pengembalian Dana",
    refundDescription: "Cara kami menangani pengembalian dana ketika pesanan tidak dapat diselesaikan seperti dijelaskan.",
    refundIntro:
      "Kami ingin setiap pesanan berjalan lancar. Jika kami tidak dapat mengirimkan apa yang Anda bayar, hubungi kami untuk solusi adil.",
    refundSection1Title: "Kapan pengembalian dana berlaku",
    refundSection1Body:
      "Anda dapat meminta pengembalian dana jika pesanan tidak dimulai dalam jendela pengiriman yang dinyatakan, tidak dikirim sama sekali, atau sangat tidak lengkap karena kesalahan kami.",
    refundSection2Title: "Kapan pengembalian dana tidak berlaku",
    refundSection2Body:
      "Tidak ada pengembalian dana untuk pembatalan pelanggan setelah pengiriman dimulai, link salah atau akun privat dari pelanggan, atau tindakan platform di luar kendali kami.",
    refundSection3Title: "Cara meminta pengembalian dana",
    refundSection3Body:
      "Hubungi dukungan via WhatsApp, live chat, atau email support@myfreefollower.com dengan ID pesanan dan email akun. Tinjauan dalam 24–48 jam.",
    refundSection4Title: "Pengembalian dana menurut metode pembayaran",
    refundSection4Body:
      "Pengembalian dana yang disetujui dikembalikan ke metode pembayaran asli jika memungkinkan. Pembayaran crypto atau saldo dapat dikreditkan ke akun atau dikembalikan sesuai kesepakatan.",
  },
  bn: {
    privacyTitle: "গোপনীয়তা নীতি",
    termsTitle: "সেবার শর্তাবলী",
    lastUpdated: "সর্বশেষ আপডেট",
    lastUpdatedDate: "১ আগস্ট, ২০২৬",
    privacyIntro:
      "এই গোপনীয়তা নীতি ব্যাখ্যা করে MyFreeFollower আমাদের ওয়েবসাইট ও সেবা ব্যবহার করার সময় আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষা করে।",
    privacySection1Title: "আমরা যে তথ্য সংগ্রহ করি",
    privacySection1Body:
      "নিবন্ধনে দেওয়া তথ্য (ইউজারনেম, ইমেইল, পাসওয়ার্ড), অর্ডার বিবরণ (ইউজারনেম ও প্রোফাইল লিংক), টাস্ক প্রমাণ ও সাপোর্ট বার্তা সংগ্রহ করি। নিরাপত্তা ও বিশ্লেষণের জন্য IP ও ব্রাউজার ধরনের মতো মৌলিক ব্যবহার ডেটাও সংগ্রহ করি।",
    privacySection2Title: "আমরা আপনার তথ্য কীভাবে ব্যবহার করি",
    privacySection2Body:
      "অ্যাকাউন্ট পরিচালনা, অর্ডার প্রক্রিয়া, প্রমাণ পর্যালোচনা, প্রতারণা প্রতিরোধ, সেবা উন্নতি ও সাপোর্টের জন্য আপনার ডেটা ব্যবহার করি। ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।",
    privacySection3Title: "কুকি ও বিশ্লেষণ",
    privacySection3Body:
      "ভাষা ও সেশন মনে রাখতে কুকি ব্যবহার করি। বিশ্লেষণ সরঞ্জাম দর্শকরা সাইট কীভাবে ব্যবহার করে তা বুঝতে সাহায্য করে।",
    privacySection4Title: "ধারণ ও নিরাপত্তা",
    privacySection4Body:
      "অ্যাকাউন্ট সক্রিয় থাকা ও আইন অনুযায়ী ডেটা রাখি। যুক্তিসঙ্গত নিরাপত্তা ব্যবস্থা নিই, তবে সম্পূর্ণ নিরাপত্তার গ্যারান্টি নেই।",
    privacySection5Title: "আপনার অধিকার",
    privacySection5Body:
      "support@myfreefollower.com-এ যোগাযোগ করে অ্যাক্সেস, সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন। আমাদের সাথে যোগাযোগ করে অ্যাকাউন্ট ডেটা মুছতে পারেন।",
    privacySection6Title: "যোগাযোগ",
    privacySection6Body:
      "গোপনীয়তা প্রশ্নে support@myfreefollower.com-এ লিখুন বা যোগাযোগ পৃষ্ঠা ব্যবহার করুন।",
    termsIntro:
      "MyFreeFollower ব্যবহার করে আপনি এই সেবার শর্তাবলী মেনে নিচ্ছেন। সাবধানে পড়ুন।",
    termsSection1Title: "শর্ত গ্রহণ",
    termsSection1Body:
      "অ্যাকাউন্ট তৈরি বা অর্ডার দিয়ে আপনি এই শর্ত ও প্রযোজ্য আইন মানতে সম্মত হন। সম্মত না হলে সেবা ব্যবহার করবেন না।",
    termsSection2Title: "অ্যাকাউন্টের দায়িত্ব",
    termsSection2Body:
      "লগইন তথ্যের নিরাপত্তা ও অ্যাকাউন্টের সব কার্যকলাপের জন্য আপনি দায়ী। সঠিক তথ্য দিন এবং ফ্রি ট্রায়াল অপব্যবহারের জন্য একাধিক অ্যাকাউন্ট তৈরি করবেন না।",
    termsSection3Title: "সেবা ও ডেলিভারি",
    termsSection3Body:
      "আমরা ধীরে ধীরে ডেলিভারি সহ সোশ্যাল মিডিয়া বৃদ্ধি সেবা দিই। সময় অনুমান, গ্যারান্টি নয়। প্ল্যাটফর্ম নীতি বা ন্যায্য ব্যবহারের নিয়ম লঙ্ঘনকারী অর্ডার বাতিল বা রিফান্ড করতে পারি।",
    termsSection4Title: "টাস্ক, পয়েন্ট ও উত্তোলন",
    termsSection4Body:
      "অনুমোদিত টাস্ক সম্পন্ন করে পয়েন্ট পাওয়া যায়। অসম্পূর্ণ বা জাল প্রমাণ প্রত্যাখ্যান হতে পারে। উত্তোলন ন্যূনতম সীমা ও ম্যানুয়াল পর্যালোচনার অধীন। রেফারেল কমিশন প্রোগ্রাম নিয়ম অনুযায়ী জমা হয়।",
    termsSection5Title: "নিষিদ্ধ ব্যবহার",
    termsSection5Body:
      "অবৈধ কার্যকলাপ, হয়রানি, স্প্যাম বা তৃতীয় পক্ষের প্ল্যাটফর্ম শর্ত লঙ্ঘনের জন্য সেবা ব্যবহার করা যাবে না। অপব্যবহারকারী অ্যাকাউন্ট স্থগিত বা বন্ধ করতে পারি।",
    termsSection6Title: "দায় সীমাবদ্ধতা",
    termsSection6Body:
      "MyFreeFollower যেমন আছে তেমনই দেওয়া হয়। Instagram, TikTok, YouTube বা কোনো সোশ্যাল প্ল্যাটফর্মের সাথে সংযুক্ত নই। তৃতীয় পক্ষের প্ল্যাটফর্মের আপনার অ্যাকাউন্টে ব্যবস্থার জন্য দায়ী নই।",
    termsSection7Title: "পরিবর্তন ও যোগাযোগ",
    termsSection7Body:
      "যেকোনো সময় শর্ত আপডেট করতে পারি। ব্যবহার চালিয়ে গেলে গ্রহণ বোঝায়। যোগাযোগ: support@myfreefollower.com।",
    refundTitle: "রিফান্ড নীতি",
    refundDescription: "অর্ডার বর্ণনা অনুযায়ী সম্পন্ন না হলে রিফান্ড কীভাবে পরিচালনা করি।",
    refundIntro:
      "প্রতিটি অর্ডার মসৃণভাবে সম্পন্ন হোক — এটাই চাই। যা দিয়েছেন তা ডেলিভারি না হলে, ন্যায্য সমাধানের জন্য যোগাযোগ করুন।",
    refundSection1Title: "কখন রিফান্ড প্রযোজ্য",
    refundSection1Body:
      "নির্দিষ্ট ডেলিভারি সময়ের মধ্যে শুরু না হলে, একদম ডেলিভারি না হলে, বা আমাদের দোষে উল্লেখযোগ্যভাবে অসম্পূর্ণ হলে রিফান্ড চাইতে পারেন।",
    refundSection2Title: "কখন রিফান্ড প্রযোজ্য নয়",
    refundSection2Body:
      "ডেলিভারি শুরুর পর গ্রাহক বাতিল, ভুল লিংক বা প্রাইভেট অ্যাকাউন্ট, বা আমাদের নিয়ন্ত্রণের বাইরে প্ল্যাটফর্ম পদক্ষেপ — রিফান্ড নেই।",
    refundSection3Title: "রিফান্ড কীভাবে চাইবেন",
    refundSection3Body:
      "অর্ডার ID ও অ্যাকাউন্ট ইমেইল নিয়ে WhatsApp, লাইভ চ্যাট বা support@myfreefollower.com-এ সাপোর্টে যোগাযোগ করুন। ২৪–৪৮ ঘণ্টায় পর্যালোচনা।",
    refundSection4Title: "পেমেন্ট পদ্ধতি অনুযায়ী রিফান্ড",
    refundSection4Body:
      "অনুমোদিত রিফান্ড সম্ভব হলে মূল পেমেন্ট পদ্ধতিতে ফেরত যায়। ক্রিপ্টো বা ব্যালেন্স পেমেন্ট অ্যাকাউন্টে জমা বা চুক্তি অনুযায়ী ফেরত হতে পারে।",
  },
  hi: {
    privacyTitle: "गोपनीयता नीति",
    termsTitle: "सेवा की शर्तें",
    lastUpdated: "अंतिम अपडेट",
    lastUpdatedDate: "1 अगस्त 2026",
    privacyIntro:
      "यह गोपनीयता नीति बताती है कि MyFreeFollower हमारी वेबसाइट और सेवाओं का उपयोग करते समय आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करता है।",
    privacySection1Title: "हम कौन सी जानकारी एकत्र करते हैं",
    privacySection1Body:
      "पंजीकरण पर दी गई जानकारी (यूज़रनेम, ईमेल, पासवर्ड), ऑर्डर विवरण (यूज़रनेम और प्रोफ़ाइल लिंक), टास्क प्रूफ और सपोर्ट संदेश एकत्र करते हैं। सुरक्षा और विश्लेषण के लिए IP और ब्राउज़र प्रकार जैसे बुनियादी उपयोग डेटा भी एकत्र करते हैं।",
    privacySection2Title: "हम आपकी जानकारी कैसे उपयोग करते हैं",
    privacySection2Body:
      "खाता संचालन, ऑर्डर प्रसंस्करण, प्रूफ समीक्षा, धोखाधड़ी रोकथाम, सेवा सुधार और सपोर्ट के लिए आपके डेटा का उपयोग करते हैं। व्यक्तिगत जानकारी तीसरे पक्ष को नहीं बेचते।",
    privacySection3Title: "कुकीज़ और विश्लेषण",
    privacySection3Body:
      "भाषा और सत्र याद रखने के लिए कुकीज़ उपयोग करते हैं। विश्लेषण उपकरण विज़िटर साइट कैसे उपयोग करते हैं यह समझने में मदद करते हैं।",
    privacySection4Title: "रखरखाव और सुरक्षा",
    privacySection4Body:
      "खाता सक्रिय रहने और कानून के अनुसार डेटा रखते हैं। उचित सुरक्षा उपाय लागू करते हैं, पर पूर्ण सुरक्षा की गारंटी नहीं।",
    privacySection5Title: "आपके अधिकार",
    privacySection5Body:
      "support@myfreefollower.com पर संपर्क करके एक्सेस, सुधार या हटाने का अनुरोध कर सकते हैं। हमसे संपर्क करके खाता डेटा हटा सकते हैं।",
    privacySection6Title: "संपर्क",
    privacySection6Body:
      "गोपनीयता प्रश्नों के लिए support@myfreefollower.com पर लिखें या संपर्क पृष्ठ उपयोग करें।",
    termsIntro:
      "MyFreeFollower उपयोग करके आप इन सेवा शर्तों से सहमत हैं। कृपया ध्यान से पढ़ें।",
    termsSection1Title: "शर्तों की स्वीकृति",
    termsSection1Body:
      "खाता बनाकर या ऑर्डर देकर आप इन शर्तों और लागू कानूनों का पालन करने से सहमत हैं। सहमत न हों तो सेवाएँ उपयोग न करें।",
    termsSection2Title: "खाते की ज़िम्मेदारियाँ",
    termsSection2Body:
      "लॉगिन क्रेडेंशियल की सुरक्षा और खाते की सभी गतिविधि की ज़िम्मेदारी आपकी है। सटीक जानकारी दें और मुफ़्त ट्रायल दुरुपयोग के लिए कई खाते न बनाएँ।",
    termsSection3Title: "सेवाएँ और डिलीवरी",
    termsSection3Body:
      "हम क्रमिक डिलीवरी वाली सोशल मीडिया ग्रोथ सेवाएँ देते हैं। समय अनुमान हैं, गारंटी नहीं। प्लेटफ़ॉर्म नीतियों या fair use नियमों का उल्लंघन करने वाले ऑर्डर रद्द या रिफंड कर सकते हैं।",
    termsSection4Title: "टास्क, पॉइंट और निकासी",
    termsSection4Body:
      "स्वीकृत टास्क पूरे करके पॉइंट मिलते हैं। अधूरे या नकली प्रूफ अस्वीकार हो सकते हैं। निकासी न्यूनतम सीमा और मैन्युअल समीक्षा के अधीन। रेफ़रल कमीशन प्रोग्राम नियमों के अनुसार जमा होता है।",
    termsSection5Title: "निषिद्ध उपयोग",
    termsSection5Body:
      "अवैध गतिविधि, उत्पीड़न, स्पैम या तृतीय-पक्ष प्लेटफ़ॉर्म शर्तों का उल्लंघन के लिए सेवाएँ उपयोग न करें। दुरुपयोग करने वाले खाते निलंबित या बंद कर सकते हैं।",
    termsSection6Title: "दायित्व की सीमा",
    termsSection6Body:
      "MyFreeFollower जैसा है वैसा प्रदान किया जाता है। Instagram, TikTok, YouTube या किसी सोशल प्लेटफ़ॉर्म से संबद्ध नहीं। तृतीय-पक्ष प्लेटफ़ॉर्म की आपके खाते पर कार्रवाई के लिए ज़िम्मेदार नहीं।",
    termsSection7Title: "परिवर्तन और संपर्क",
    termsSection7Body:
      "किसी भी समय शर्तें अपडेट कर सकते हैं। उपयोग जारी रखना स्वीकृति माना जाएगा। संपर्क: support@myfreefollower.com।",
    refundTitle: "रिफंड नीति",
    refundDescription: "जब ऑर्डर वर्णित अनुसार पूरा न हो, तो रिफंड कैसे संभालते हैं।",
    refundIntro:
      "हर ऑर्डर सही से पूरा हो — यही चाहते हैं। जो भुगतान किया वह डिलीवर न हो तो न्यायसंगत समाधान के लिए संपर्क करें।",
    refundSection1Title: "रिफंड कब लागू होता है",
    refundSection1Body:
      "यदि ऑर्डर निर्दिष्ट डिलीवरी अवधि में शुरू न हुआ, बिल्कुल डिलीवर न हुआ, या हमारी गलती से काफ़ी अधूरा रहा तो रिफंड माँग सकते हैं।",
    refundSection2Title: "रिफंड कब नहीं",
    refundSection2Body:
      "डिलीवरी शुरू होने के बाद ग्राहक रद्दी, गलत लिंक या निजी खाता, या हमारे नियंत्रण से बाहर प्लेटफ़ॉर्म कार्रवाई — रिफंड नहीं।",
    refundSection3Title: "रिफंड कैसे माँगें",
    refundSection3Body:
      "ऑर्डर ID और खाता ईमेल के साथ WhatsApp, लाइव चैट या support@myfreefollower.com पर सपोर्ट से संपर्क करें। 24–48 घंटे में समीक्षा।",
    refundSection4Title: "भुगतान विधि के अनुसार रिफंड",
    refundSection4Body:
      "स्वीकृत रिफंड संभव हो तो मूल भुगतान विधि पर लौटता है। क्रिप्टो या बैलेंस भुगतान खाते में जमा या समझौते से वापस हो सकता है।",
  },
};
