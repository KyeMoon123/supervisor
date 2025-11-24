"use client";

import { Home } from "lucide-react";
import * as React from "react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/primatives/sidebar";
import { usePathname } from "next/navigation";
import SideBarItem from "../../Sidebar/SideBarItem";
import { WorkspaceSwitcher } from "../workspace-switcher";
import { SearchSidebarWrapper } from "../search";
import { Separator } from "@/client/primatives/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader className="gap-4 ">
        <WorkspaceSwitcher />
        <SearchSidebarWrapper />
      </SidebarHeader>
      <Separator className="my-4" />
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/home"}>
                  <SideBarItem
                    href="/home"
                    icon={<Home className="w-4 h-4" />}
                    label="Home"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
