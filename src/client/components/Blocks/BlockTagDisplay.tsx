"use client";

import { Badge } from "@/client/primatives/badge";
import { X } from "lucide-react";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";
import { api } from "@/trpc/react";

interface BlockTagDisplayProps {
  blockDetails: BlockDetailsDto;
  onRemove: (tagId: string) => void;
}

export function BlockTagDisplay({
  blockDetails,
  onRemove,
}: BlockTagDisplayProps) {
  const selectedTags =
    blockDetails.tagAssignments?.map((ta) => ta.tag).filter(Boolean) || [];

  if (selectedTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <Badge key={tag.id} variant="default">
          <span className="text-sm">{tag.name}</span>
          <button
            onClick={() => onRemove(tag.id)}
            aria-label="Remove tag"
            className="cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
