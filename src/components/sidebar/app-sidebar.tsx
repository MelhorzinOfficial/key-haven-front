"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { HeaderSidebar } from "./header";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Authentication",
      url: "/app/authentication",
      icon: Bot,
    },
    {
      title: "storage",
      url: "/app/storage",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
