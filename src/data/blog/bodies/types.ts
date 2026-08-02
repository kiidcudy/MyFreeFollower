import type { BlogFaq, BlogSection } from "@/data/blog/posts";

export interface BlogBodyOverride {
  sections: BlogSection[];
  faq: BlogFaq[];
}

export type BlogBodyLocaleMap = Record<string, BlogBodyOverride>;
