"use client";
import * as React from "react";

import type { NavigationItemProps } from "../Navigation";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/client/lib/utils";

interface SideBarPrimaryMenuItemProps {
  item: NavigationItemProps;
  showText?: boolean;
}

const linkVariants = cva(
  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-primary/5  transition-colors",
  {
    variants: {
      variant: {
        default: "",
        active: "text-primary bg-primary/10",
      },
    },
  }
);

export const SideBarPrimaryMenuItem = ({
  item,
  showText = true,
}: SideBarPrimaryMenuItemProps) => {
  return (
    <li key={item.label}>
      {/*@ts-ignore*/}
      <Link
        href={item.route}
        className={cn(linkVariants({ variant: "default" }), "text-primary")}
      >
        <item.icon className={"h-6 w-6 shrink-0 "} aria-hidden="true" />
        {showText && item.label}
      </Link>
    </li>
  );
};
