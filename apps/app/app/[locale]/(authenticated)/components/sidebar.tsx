"use client";

import { UserButton } from "@repo/auth/client";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import { Collapsible } from "@repo/design-system/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/design-system/components/ui/sidebar";
import { NotificationsTrigger } from "@repo/notifications/components/trigger";
import { SquareTerminalIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "../../(public)/components/language-switcher";

type GlobalSidebarProperties = {
  readonly children: ReactNode;
  readonly dict: any;
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export const GlobalSidebar = ({ children, dict }: GlobalSidebarProperties) => {
  const sidebar = useSidebar();

  const navMain = [
    {
      title: dict.dashboard,
      url: "/admin",
      icon: SquareTerminalIcon,
      isActive: true,
    },
    {
      title: dict.events,
      url: "/admin/events",
      icon: SquareTerminalIcon,
      isActive: true,
    },
    {
      title: dict.docs,
      url: "/admin/docs",
      icon: SquareTerminalIcon,
      isActive: true,
    },
    {
      title: dict.publicCalendar,
      url: "/",
      icon: SquareTerminalIcon,
    },
    {
      title: dict.publicDocs,
      url: "/docs",
      icon: SquareTerminalIcon,
    },
  ];

  return (
    <>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navMain.map((item) => (
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  key={item.title}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex overflow-hidden w-full",
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "truncate pl-0",
                  },
                }}
                showName
              />
              <div className="flex shrink-0 items-center gap-px">
                <LanguageSwitcher />
                <ModeToggle />
                <Button
                  asChild
                  className="shrink-0"
                  size="icon"
                  variant="ghost"
                >
                  <div className="h-4 w-4">
                    <NotificationsTrigger />
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
