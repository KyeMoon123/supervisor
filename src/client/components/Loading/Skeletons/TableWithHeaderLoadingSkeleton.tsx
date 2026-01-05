import { cn } from "@/client/lib/utils";

interface TableWithHeaderLoadingSkeletonProps {
  gridCols?: string;
  numberRows?: number;
  showHeader?: boolean;
  showSearch?: boolean;
}

export default function TableWithHeaderLoadingSkeleton({
  gridCols,
  numberRows = 4,
  showHeader = true,
  showSearch = false,
}: TableWithHeaderLoadingSkeletonProps) {
  return (
    <div role="status" className="animate-pulse">
      {showSearch && (
        <div className="h-8 w-60 bg-gray-100 rounded-md  mb-4"></div>
      )}
      {showHeader && (
        <div className="h-12 bg-gray-300 rounded-md w-full mb-4"></div>
      )}
      <div className={cn("grid gap-4", gridCols)}>
        {numberRows &&
          [...Array(numberRows)].map((_, i) => {
            return (
              <div key={i} className="h-8 bg-gray-200 rounded-md  mb-2.5"></div>
            );
          })}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
