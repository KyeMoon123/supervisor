import { Search } from "lucide-react";
import { useState } from "react";

import { Label } from "@/client/primatives/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/client/primatives/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/client/primatives/dropdown-menu";

// Full search form for expanded sidebar
export function SidebarSearch({ ...props }: React.ComponentProps<"form">) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <form {...props}>
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search the docs..."
                className="pl-8"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </form>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// Collapsed sidebar: icon button that expands to search input
export function CollapsedSidebarSearch({ ...props }: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              variant="default"
              tooltip="Search"
              aria-label="Open search"
              className="justify-center"
            >
              <Search className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg p-2"
            align="start"
            side="right"
            sideOffset={4}
          >
            <form {...props}>
              <Label htmlFor="collapsed-search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="collapsed-search"
                placeholder="Search the docs..."
                autoFocus
                className="pl-8"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// Wrapper: renders correct search based on sidebar state
export function SearchSidebarWrapper(props: React.ComponentProps<"form">) {
  const { state } = useSidebar();

  if (state === "expanded") {
    return <SidebarSearch {...props} />;
  }
  return <CollapsedSidebarSearch {...props} />;
}
