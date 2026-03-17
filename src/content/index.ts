import type { MDXProps } from "mdx/types";
import type { JSX } from "react";

export type ArticleFrontmatter = {
  title: string;
  category: string;
  subcategory?: string;
  tags: string[];
  keywords: string[];
  updated: string;
  featured?: boolean;
  videoOnly?: boolean;
};

type MDXModule = {
  default: (props: MDXProps) => JSX.Element;
  frontmatter: ArticleFrontmatter;
};

const mdxModules = import.meta.glob<MDXModule>("./**/*.mdx", { eager: true });

export type Article = {
  slug: string;
  category: string;
  Content: MDXModule["default"];
  frontmatter: ArticleFrontmatter;
};

export const articles: Article[] = Object.entries(mdxModules).map(([path, mod]) => {
  const parts = path.replace("./", "").replace(".mdx", "").split("/");
  const category = parts[0];
  const slug = parts[1];

  return {
    slug,
    category,
    Content: mod.default,
    frontmatter: mod.frontmatter,
  };
});

export function getArticle(category: string, slug: string): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.frontmatter.featured);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))];
}

const subcategoryOrder: Record<string, string[]> = {
  HotShop: ["PO Creation", "Receiving", "ReadSoft", "Exceptions", "Reports"],
  PSAP: ["Invoice Request", "Vendor"],
  Walkthroughs: ["Daily", "Weekly", "Monthly", "Tips"],
};

export function getArticlesGroupedBySubcategory(category: string): [string, Article[]][] {
  const categoryArticles = getArticlesByCategory(category);
  const grouped = new Map<string, Article[]>();

  for (const article of categoryArticles) {
    const sub = article.frontmatter.subcategory ?? "General";
    const existing = grouped.get(sub) ?? [];
    existing.push(article);
    grouped.set(sub, existing);
  }

  const order = subcategoryOrder[category] ?? [];

  return [...grouped.entries()].sort((a, b) => {
    const aIndex = order.indexOf(a[0]);
    const bIndex = order.indexOf(b[0]);
    const aPos = aIndex === -1 ? Infinity : aIndex;
    const bPos = bIndex === -1 ? Infinity : bIndex;
    return aPos - bPos;
  });
}
