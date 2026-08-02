import { defaultLocale, locales, localeHreflang } from "@/lib/i18n/config";
import { localizedPath, stripLocale } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/site";

export function HreflangLinks({ pathname }: { pathname: string }) {
  const { pathname: basePath } = stripLocale(pathname);

  return (
    <>
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={localeHreflang[locale]}
          href={`${siteConfig.url}${localizedPath(basePath, locale)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}${localizedPath(basePath, defaultLocale)}`}
      />
    </>
  );
}
