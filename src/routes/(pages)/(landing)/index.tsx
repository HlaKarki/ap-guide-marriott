import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(pages)/(landing)/")({ component: App });

function App() {
  return (
    <div className="min-h-screen">
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">HI!</div>
      </section>
    </div>
  );
}
