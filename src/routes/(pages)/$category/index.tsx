import { Link, createFileRoute } from "@tanstack/react-router";
import { getArticlesGroupedBySubcategory } from "@/content";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/(pages)/$category/")({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const grouped = getArticlesGroupedBySubcategory(category);

  if (grouped.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category not found</h1>
          <p className="text-muted-foreground">No guides found for "{category}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{category}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">{category}</h1>

      {grouped.map(([subcategory, articles]) => (
        <section key={subcategory} className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">{subcategory}</h2>
          <div className="space-y-1">
            {articles.map((article) => (
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
      ))}
    </div>
  );
}