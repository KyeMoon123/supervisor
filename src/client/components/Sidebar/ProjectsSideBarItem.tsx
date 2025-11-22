"use client";

import { cn } from "@/client/lib/utils";
import { Button } from "@/client/primatives/button";
import { Separator } from "@/client/primatives/separator";
import { api } from "@/trpc/react";
import { ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProjectsSideBarItem() {
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const pathname = usePathname();
  const { data: projects } = api.project.getProjects.useQuery();

  return (
    <div className="mb-4">
      <Button
        variant="ghost"
        onClick={() => setProjectsExpanded(!projectsExpanded)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-between",
          pathname === "/projects"
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <FolderOpen className="w-4 h-4 shrink-0" />
          <span>Projects</span>
        </div>
        {projectsExpanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </Button>
      {projectsExpanded && (
        <div className="space-y-1  bg-background rounded-lg ">
          <Link
            href="/projects"
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-3 ",
              pathname === "/projects"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center gap-3 ">
              <span>All Projects</span>
            </div>
          </Link>
          <Separator />
          {projects?.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-3 ",
                pathname.startsWith(`/projects/${project.id}`)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FolderOpen className="w-4 h-4 shrink-0" />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          ))}
          {!projects ||
            (projects.length === 0 && (
              <div className="flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-3 ">
                <span>No projects found</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
