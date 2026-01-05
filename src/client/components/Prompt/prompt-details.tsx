"use client";

import type { PromptDetailsDto } from "@/server/api/routers/prompt";
import { api } from "@/trpc/react";
import { ContentDetailsForm } from "@/client/components/common/ContentDetailsForm";
import { BlockCategoryEnum, type TBlockCategory } from "@/server/db/schema/blocks";

// Adapter to normalize PromptDetailsDto to ContentDetailsForm's expected shape
function normalizePromptDetails(details: PromptDetailsDto) {
  return {
    id: details.id,
    title: details.title ?? "",
    description: details.description ?? "",
    // fallback to "misc" if null or not a valid block category
    category:
      details.category && BlockCategoryEnum.enumValues.includes(details.category as TBlockCategory)
        ? (details.category as TBlockCategory)
        : "misc",
    tags: details.tags ?? [],
  };
}

export function PromptDetails({
  promptDetails,
}: {
  promptDetails: PromptDetailsDto;
}) {
  const updatePromptMutation = api.prompt.updatePrompt.useMutation();

  // Map updates back to PromptDetailsDto shape
  const handleUpdate = (
    id: string,
    data: Partial<{
      title: string | null;
      description: string | null;
      category: TBlockCategory | null;
      tags: string[] | null;
    }>
  ) => {
    // Only send fields that are valid for the API, and normalize nulls to empty string or fallback
    updatePromptMutation.mutate({
      id,
      ...(data.title !== undefined ? { title: data.title ?? "" } : {}),
      ...(data.description !== undefined ? { description: data.description ?? "" } : {}),
      ...(data.category !== undefined
        // Only allow valid prompt categories for the API
        ? {
            category:
              data.category === "template"
                ? "template"
                : data.category === "snippet"
                ? "snippet"
                : "prompt",
          }
        : {}),
      ...(data.tags !== undefined ? { tags: data.tags ?? [] } : {}),
    });
  };

  return (
    <ContentDetailsForm
      details={normalizePromptDetails(promptDetails)}
      onUpdate={handleUpdate}
    />
  );
}
