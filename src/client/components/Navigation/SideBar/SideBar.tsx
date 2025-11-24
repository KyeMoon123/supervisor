"use client";
import React from "react";
import { cn } from "@/client/lib/utils";
import { Button } from "@/client/primatives/button";
import { Home, MoonIcon, Settings, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import SideBarItem from "../../Sidebar/SideBarItem";

interface SideBarProps {
  disabled?: boolean;
}

export default function SideBar({ disabled }: SideBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-18 h-full flex flex-col" suppressHydrationWarning>
      <nav className="flex-1 p-1 overflow-y-auto flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4 mt-8">
          <SideBarItem
            href="/home"
            icon={<Home className="w-4 h-4" />}
            label="Home"
          />
          {/* <SideBarItem
            href="/workbench"
            icon={<Wrench className="w-4 h-4" />}
            label="Workbench"
          />
          <SideBarItem
            href="/library"
            icon={<Book className="w-4 h-4" />}
            label="Library"
          /> */}
        </div>
        <div className="mt-auto mb-12 gap-4">
          <SideBarItem
            href="/settings"
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
          />
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-3rounded-lg text-sm font-medium transition-colors w-full justify-center"
            )}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </nav>
    </aside>
  );
}
