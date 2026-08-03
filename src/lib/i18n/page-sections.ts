/** Section index lists for legal and about pages — keys map to legal.*Section{n}Title/Body in en.ts */

export const privacySections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const termsSections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const refundSections = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const aboutSections = [
  { titleKey: "about.missionTitle", bodyKey: "about.missionBody" },
  { titleKey: "about.storyTitle", bodyKey: "about.storyBody" },
  { titleKey: "about.howTitle", bodyKey: "about.howBody" },
  { titleKey: "about.platformsTitle", bodyKey: "about.platformsBody" },
  { titleKey: "about.valuesTitle", bodyKey: "about.valuesBody" },
  { titleKey: "about.trustTitle", bodyKey: "about.trustBody" },
  { titleKey: "about.supportTitle", bodyKey: "about.supportBody" },
  { titleKey: "about.safetyTitle", bodyKey: "about.safetyBody" },
] as const;

export const faqSections = [
  { titleKey: "faq.sectionGeneral", keys: [1, 2, 3, 4, 27] as const },
  { titleKey: "faq.sectionOrders", keys: [5, 9, 10, 11, 12, 21, 22, 24, 25] as const },
  { titleKey: "faq.sectionAccount", keys: [6, 7, 13, 14, 15, 20] as const },
  { titleKey: "faq.sectionTasks", keys: [17, 18, 19] as const },
  { titleKey: "faq.sectionSupport", keys: [8, 16, 23, 26, 28] as const },
] as const;
