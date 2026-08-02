"use client";

import { useState } from "react";
import { PageBreadcrumbs } from "@/components/seo/PageBreadcrumbs";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { siteConfig, whatsappLink } from "@/lib/site";

export default function ContactPage() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: t("nav.home"), path: "/" },
          { label: t("nav.contact"), path: "/contact" },
        ]}
      />

      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t("contact.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {t("contact.subtitle")}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
        >
          {sent ? (
            <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
              {t("contact.success")}
            </p>
          ) : (
            <>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-ink-800">
                  {t("contact.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-ink-800">
                  {t("contact.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-ink-800"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
              >
                {t("contact.send")}
              </button>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink-900">
              {t("common.email")}
            </h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 block text-sm text-brand-700 hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink-900">
              {t("common.whatsapp")}
            </h2>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-brand-700 hover:underline"
            >
              {siteConfig.whatsappDisplay}
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-ink-900">
              {t("common.liveChat")}
            </h2>
            <p className="mt-2 text-sm text-ink-700">
              {t("contact.subtitle")}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
