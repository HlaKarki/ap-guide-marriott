import { Link, createFileRoute } from "@tanstack/react-router";
import { articles, getCategories, getFeaturedArticles } from "@/content";

export const Route = createFileRoute("/(pages)/(landing)/")({
  component: HomePage,
});

function HomePage() {
  const featured = getFeaturedArticles();
  const categories = getCategories();

  return (
    <div className="min-h-screen py-16 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">AP Guide - Marriott</h1>
      </div>

      {/* All Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recordings by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const count = articles.filter((a) => a.category === category).length;
            return (
              <Link
                key={category}
                to="/$category"
                params={{ category }}
                className="block rounded-lg border border-border p-4 hover:border-brand hover:shadow-sm transition-all"
              >
                <p className="font-medium">{category}</p>
                <p className="text-sm text-muted-foreground">
                  {count} {count === 1 ? "Video" : "Videos"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured / Common Guides */}
      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Common Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.map((article) => (
              <Link
                key={`${article.category}/${article.slug}`}
                to="/$category/$slug"
                params={{
                  category: article.category,
                  slug: article.slug,
                }}
                className="block rounded-lg border border-border p-4 hover:border-brand hover:shadow-sm transition-all"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {article.frontmatter.category}
                </p>
                <p className="font-medium">{article.frontmatter.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
