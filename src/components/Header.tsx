import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center">
        <Link to="/" className="text-sm font-semibold tracking-tight hover:text-brand transition-colors">
          <div className="flex gap-2 items-baseline">
            <span className="text-lg font-semibold">AP Guide</span>
            <span className="text-muted-foreground font-normal text-sm">
              Marriott AP
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
