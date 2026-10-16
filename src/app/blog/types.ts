export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "code"; language: "python" | "sql" | "text"; caption: string; code: string }
  | { type: "note"; title: string; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  hero: { src: string; alt: string; width: number; height: number };
  introduction: string[];
  sections: { id: string; title: string; blocks: ArticleBlock[] }[];
  faq: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
  course: { label: string; href: string; description: string };
};
