import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { CommandIcon } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@repo/auth/server";

type PublicLayoutProps = {
  readonly children: ReactNode;
};

const PublicLayout = async ({ children }: PublicLayoutProps) => {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <CommandIcon className="h-6 w-6" />
              <span className="font-bold inline-block">Open Kalendo</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/docs/intro" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {userId ? (
              <Link
                href="/admin/events"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Open Kalendo team. Open source on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
