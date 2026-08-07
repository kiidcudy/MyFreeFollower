"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  { quoteKey: "home.testimonial1Quote", nameKey: "home.testimonial1Name", roleKey: "home.testimonial1Role" },
  { quoteKey: "home.testimonial2Quote", nameKey: "home.testimonial2Name", roleKey: "home.testimonial2Role" },
  { quoteKey: "home.testimonial3Quote", nameKey: "home.testimonial3Name", roleKey: "home.testimonial3Role" },
  { quoteKey: "home.testimonial4Quote", nameKey: "home.testimonial4Name", roleKey: "home.testimonial4Role" },
] as const;

export function HomeTestimonials() {
  const { t } = useLocale();

  return (
    <>
      <SectionHeader title={t("home.testimonialsTitle")} subtitle={t("home.testimonialsSubtitle")} />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {testimonials.map((item, i) => (
          <blockquote
            key={item.quoteKey}
            className={`mff-card flex h-full flex-col p-6 sm:p-8 ${
              i === 0 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="flex gap-1 text-[#ff9f0a]" aria-hidden>
              {"★★★★★"}
            </div>
            <p className="mt-5 flex-1 text-base leading-relaxed text-[#1d1d1f]">
              &ldquo;{t(item.quoteKey)}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0077ed] to-[#5ac8fa] text-xs font-bold text-white">
                {t(item.nameKey).charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold">{t(item.nameKey)}</p>
                <p className="text-xs text-[#6e6e73]">{t(item.roleKey)}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </>
  );
}
