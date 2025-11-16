import React from "react";
import { cn } from "@/client/lib/utils";

interface TableEmptyStateProps {
  mainText: string;
  subText?: string;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
}

export default function TableEmptyState({
  mainText,
  subText,
  icon,
  button,
  className,
}: TableEmptyStateProps) {
  return (
    <div
      className={cn(
        className,
        "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
      )}
    >
      {icon && (
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-foreground">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{mainText}</h3>
      {subText && <p className="mt-1 text-sm text-gray-500">{subText}</p>}
      {button && <div className="mt-6">{button}</div>}
    </div>
  );
}
