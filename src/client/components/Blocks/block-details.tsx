"use client";

import type { BlockDetailsDto } from "@/server/api/routers/blocks";
import { api } from "@/trpc/react";
import { ContentDetailsForm } from "@/client/components/common/ContentDetailsForm";
import {
  BlockCategoryEnum,
  type TBlockCategory,
} from "@/server/db/schema/blocks";

// Adapter to normalize BlockDetailsDto to ContentDetailsForm's expected shape
function normalizeBlockDetails(details: BlockDetailsDto) {
  return {
    id: details.id,
    title: details.title ?? "",
    description: details.description ?? "",
    category:
      details.category &&
      BlockCategoryEnum.enumValues.includes(details.category as TBlockCategory)
        ? (details.category as TBlockCategory)
        : "misc",
    tags: details.tags ?? [],
  };
}

export function BlockDetails({
  blockDetails,
}: {
  blockDetails: BlockDetailsDto;
}) {
  const updateBlockMetaMutation = api.blocks.updateBlock.useMutation();

  // Map updates back to BlockDetailsDto shape
  const handleUpdate = (
    id: string,
    data: Partial<{
      title: string | null;
      description: string | null;
      category: TBlockCategory | null;
      tags: string[] | null;
    }>
  ) => {
    updateBlockMetaMutation.mutate({
      id,
      ...(data.title !== undefined ? { title: data.title ?? "" } : {}),
      ...(data.description !== undefined
        ? { description: data.description ?? "" }
        : {}),
      ...(data.category !== undefined
        ? { category: data.category ?? "misc" }
        : {}),
      ...(data.tags !== undefined ? { tags: data.tags ?? [] } : {}),
    });
  };

  return (
    <ContentDetailsForm
      details={normalizeBlockDetails(blockDetails)}
      onUpdate={handleUpdate}
    />
  );
}
