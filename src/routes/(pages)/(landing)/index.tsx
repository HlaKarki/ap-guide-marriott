import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { articles, getCategories } from "@/content";
import { Search } from "lucide-react";

export const Route = createFileRoute("/(pages)/(landing)/")({
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");
  const categories = getCategories();

  const filtered = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.frontmatter.title.toLowerCase().includes(q) ||
          a.frontmatter.category.toLowerCase().includes(q) ||
          a.frontmatter.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.frontmatter.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : null;

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      {/* Search */}
      <div className="relative mb-10">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides..."
          className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-ring transition-colors"
        />
      </div>

      {/* Search results */}
      {filtered ? (
        <section>
          <p className="text-xs text-muted-foreground mb-4">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No guides match your search.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((article) => (
                <Link
                  key={`${article.category}/${article.slug}`}
                  to="/$category/$slug"
                  params={{ category: article.category, slug: article.slug }}
                  className="flex items-baseline justify-between gap-4 rounded-lg border border-border px-4 py-3 hover:border-brand transition-colors"
                >
                  <span className="text-sm font-medium">{article.frontmatter.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{article.category}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        /* Category groups with inline articles */
        <div className="space-y-10">
          {categories.map((category) => {
            const categoryArticles = articles.filter((a) => a.category === category);
            return (
              <section key={category}>
                <div className="flex items-baseline justify-between mb-3">
                  <Link
                    to="/$category"
                    params={{ category }}
                    className="text-lg font-semibold hover:text-brand transition-colors"
                  >
                    {category}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {categoryArticles.length} {categoryArticles.length === 1 ? "guide" : "guides"}
                  </span>
                </div>
                <div className="space-y-1">
                  {categoryArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to="/$category/$slug"
                      params={{ category: article.category, slug: article.slug }}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                    >
                      <span>{article.frontmatter.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
