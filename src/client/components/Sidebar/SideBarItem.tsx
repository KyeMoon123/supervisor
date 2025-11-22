"use client";
import { cn } from "@/client/lib/utils";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import Link from "next/link";

interface SideBarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function SideBarItem({ href, icon, label }: SideBarItemProps) {
  const pathname = usePathname();
  return (
    <div className="mb-4">
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          pathname === href
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        {icon}
        {label}
      </Link>
    </div>
  );
}
