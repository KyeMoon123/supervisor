"use client";
import { cn } from "@/client/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/primatives/tooltip";
import Link from "next/link";

interface SideBarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function SideBarItem({ href, icon, label }: SideBarItemProps) {
  return (
    <div>
      {/* <Tooltip>
        <TooltipTrigger> */}
      <Link
        href={href}
        className={cn(
          "flex items-center gap-6 rounded-lg text-sm font-medium transition-colors w-full justify-center"
        )}
      >
        {icon}
        <span className="text-sm ">{label}</span>
      </Link>
      {/* </TooltipTrigger>
        <TooltipContent side="right" align="center"> */}
      <p>{label}</p>
      {/* </TooltipContent>
      </Tooltip> */}
    </div>
  );
}
