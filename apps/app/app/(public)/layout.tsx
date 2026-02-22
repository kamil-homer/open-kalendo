import { auth } from "@repo/auth/server";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { CommandIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

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
            <Link className="flex items-center space-x-2" href="/">
              <CommandIcon className="h-6 w-6" />
              <span className="inline-block font-bold">Open Kalendo</span>
            </Link>
            <nav className="flex items-center space-x-6 font-medium text-sm">
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="/docs/intro"
              >
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {userId ? (
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/admin/events"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/sign-in"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-muted-foreground text-sm leading-loose md:text-left">
            Built by Open Kalendo team. Open source on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
