"use client";

import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/design-system/components/ui/sheet";
import { CommandIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

type MobileNavProps = {
  readonly t: any;
  readonly userId: string | null;
  readonly children?: React.ReactNode;
};

export const MobileNav = ({ t, userId, children }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      title: t.app.public.layout.header.calendar,
      href: "/",
    },
    {
      title: t.app.public.layout.header.docs,
      href: "/docs",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon" variant="ghost">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle asChild>
            <Link
              className="flex items-center space-x-2"
              href="/"
              onClick={() => setOpen(false)}
            >
              <CommandIcon className="h-6 w-6" />
              <span className="font-bold">Open Kalendo</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 py-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <SheetFooter className="border-t pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {children}
            {userId ? (
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                href="/admin"
                onClick={() => setOpen(false)}
              >
                {t.app.public.layout.header.dashboard}
              </Link>
            ) : (
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                href="/sign-in"
                onClick={() => setOpen(false)}
              >
                {t.app.public.layout.header.signIn}
              </Link>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
