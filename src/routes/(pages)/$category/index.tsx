import { Link, createFileRoute } from "@tanstack/react-router";
import { getArticlesGroupedBySubcategory } from "@/content";

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
    <div className="min-h-screen py-12 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{category}</h1>
      {grouped.map(([subcategory, articles]) => (
        <section key={subcategory} className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-3">{subcategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to="/$category/$slug"
                params={{ category: article.category, slug: article.slug }}
                className="block rounded-lg border border-border p-4 hover:border-brand hover:shadow-sm transition-all"
              >
                <p className="font-medium">{article.frontmatter.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}