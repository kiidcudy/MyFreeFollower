import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  const home = localizedPath("/", defaultLocale);
  const freeFollowers = localizedPath("/free-followers", defaultLocale);
  const blog = localizedPath("/blog", defaultLocale);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 text-center">
        <div className="max-w-md">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-700">
            404
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-900">
            Page not found
          </h1>
          <p className="mt-3 text-ink-700">
            The page you requested does not exist on {siteConfig.name}. It may
            have moved or the URL may be incorrect.
          </p>
          <nav className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={home}
              className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
            >
              Go home
            </Link>
            <Link
              href={freeFollowers}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-800 hover:border-brand-200"
            >
              Free followers
            </Link>
            <Link
              href={blog}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-800 hover:border-brand-200"
            >
              Blog
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
