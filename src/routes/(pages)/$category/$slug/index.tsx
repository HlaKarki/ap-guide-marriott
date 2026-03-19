import { createFileRoute } from "@tanstack/react-router";
import { getArticle } from "@/content";
import { Callout, Steps, Step } from "@/components/mdx";

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
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1 capitalize">{frontmatter.category}</p>
          <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        </div>
        <article className="prose prose-lg max-w-none">
          <Content components={{ Callout, Steps, Step }} />
        </article>
      </div>
    </div>
  );
}
