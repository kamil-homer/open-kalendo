import { auth } from "@repo/auth/server";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { getDictionary } from "@repo/internationalization";
import { CommandIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./components/language-switcher";
import { MobileNav } from "./components/mobile-nav";

type PublicLayoutProps = {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
};

const PublicLayout = async ({ children, params }: PublicLayoutProps) => {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <MobileNav t={t} userId={userId} />
            <Link className="flex items-center space-x-2" href="/">
              <CommandIcon className="h-6 w-6" />
              <span className="inline-block font-bold truncate max-w-[120px] sm:max-w-none">
                Open Kalendo
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 font-medium text-sm">
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="/"
              >
                {t.app.public.layout.header.calendar}
              </Link>
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="/docs"
              >
                {t.app.public.layout.header.docs}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            {userId ? (
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/admin"
              >
                {t.app.public.layout.header.dashboard}
              </Link>
            ) : (
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/sign-in"
              >
                {t.app.public.layout.header.signIn}
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-muted-foreground text-sm leading-loose md:text-left">
            {t.app.public.layout.footer.builtBy}
            <Link
              className="font-medium underline underline-offset-4 hover:text-primary"
              href="https://github.com/kamil-homer/open-kalendo"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.app.public.layout.footer.github}
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
