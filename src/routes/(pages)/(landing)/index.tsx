import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { articles, getCategories, getFeaturedArticles } from "@/content";

export const Route = createFileRoute("/(pages)/(landing)/")({
  component: HomePage,
});

function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const featured = getFeaturedArticles();
  const categories = getCategories();

  return (
    <div className="min-h-screen py-16 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">AP Guide</h1>
        <p className="text-gray-500 text-lg">Search for anything or browse the common guides below.</p>
      </div>

      {/* Search - placeholder for now */}
      <div className="mb-12">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search guides... (e.g. 'how to create a PO')"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Featured / Common Guides */}
      {featured.length > 0 && (
        <section className="mb-12">
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
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{article.frontmatter.category}</p>
                <p className="font-medium">{article.frontmatter.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const count = articles.filter((a) => a.category === category).length;
            return (
              <div key={category} className="rounded-lg border border-gray-200 p-4">
                <p className="font-medium capitalize">{category}</p>
                <p className="text-sm text-gray-400">
                  {count} {count === 1 ? "guide" : "guides"}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
