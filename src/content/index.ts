import type { MDXProps } from "mdx/types";
import type { JSX } from "react";

export type ArticleFrontmatter = {
  title: string;
  category: string;
  tags: string[];
  keywords: string[];
  updated: string;
  featured?: boolean;
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
  // path looks like "./hotshop/creating-pos.mdx"
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
