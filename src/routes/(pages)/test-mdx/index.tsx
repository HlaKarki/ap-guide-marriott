import { createFileRoute } from "@tanstack/react-router";
import Content, { frontmatter } from "#/content/hotshop/creating-pos.mdx";

export const Route = createFileRoute("/(pages)/test-mdx/")({
  component: TestMdx,
});

function TestMdx() {
  return (
    <div className="min-h-screen py-16 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        {frontmatter.title as string}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Category: {frontmatter.category as string}
      </p>
      <article className="prose">
        <Content />
      </article>
    </div>
  );
}