import type { Locale } from "@/lib/i18n/config";
import { trBlogBodies } from "./tr";
import { deBlogBodies } from "./de";
import { frBlogBodies } from "./fr";
import { esBlogBodies } from "./es";
import { arBlogBodies } from "./ar";
import { ruBlogBodies } from "./ru";
import { ptBlogBodies } from "./pt";
import { ptBrBlogBodies } from "./pt-br";
import { itBlogBodies } from "./it";
import { nlBlogBodies } from "./nl";
import { plBlogBodies } from "./pl";
import { roBlogBodies } from "./ro";
import { ukBlogBodies } from "./uk";
import { faBlogBodies } from "./fa";
import { zhBlogBodies } from "./zh";
import { idBlogBodies } from "./id";
import { bnBlogBodies } from "./bn";
import { hiBlogBodies } from "./hi";
import type { BlogBodyLocaleMap } from "./types";

export const blogBodyOverrides: Partial<Record<Locale, BlogBodyLocaleMap>> = {
  tr: trBlogBodies,
  de: deBlogBodies,
  fr: frBlogBodies,
  es: esBlogBodies,
  ar: arBlogBodies,
  ru: ruBlogBodies,
  pt: ptBlogBodies,
  "pt-br": ptBrBlogBodies,
  it: itBlogBodies,
  nl: nlBlogBodies,
  pl: plBlogBodies,
  ro: roBlogBodies,
  uk: ukBlogBodies,
  fa: faBlogBodies,
  zh: zhBlogBodies,
  id: idBlogBodies,
  bn: bnBlogBodies,
  hi: hiBlogBodies,
};
