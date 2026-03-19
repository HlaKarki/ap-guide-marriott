import { Link, createFileRoute } from "@tanstack/react-router";
import { getArticle } from "@/content";
import { Callout, Steps, Step } from "@/components/mdx";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/(pages)/$category/$slug/")({
  component: ArticlePage,
});

function ArticlePage() {
  const { category, slug } = Route.useParams();
  const article = getArticle(category, slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <p className="text-muted-foreground">
            Could not find an article for "{category}/{slug}"
          </p>
        </div>
      </div>
    );
  }

  const { Content, frontmatter } = article;

  return (
    <div className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            to="/$category"
            params={{ category }}
            className="hover:text-foreground transition-colors"
          >
            {category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate max-w-48">{frontmatter.title}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">{frontmatter.title}</h1>

        <article className="prose prose-lg max-w-none">
          <Content components={{ Callout, Steps, Step }} />
        </article>
      </div>
    </div>
  );
}