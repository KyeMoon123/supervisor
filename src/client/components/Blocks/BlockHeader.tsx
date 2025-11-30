"use client";

import { PromptSelect } from "@/client/common/PromptSelect";
import { useInlineEdit } from "@/client/hooks/use-inline-edit";
import { Button } from "@/client/primatives/button";
import { Input } from "@/client/primatives/input";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";
import { Pencil } from "lucide-react";
import { BlockTagSelector } from "./BlockTagSelector";
import { BlockTagDisplay } from "./BlockTagDisplay";
import { useState } from "react";
import { api } from "@/trpc/react";

interface BlockHeaderProps {
  blockDetails: BlockDetailsDto;
  onUpdate: (data: {
    title?: string;
    description?: string;
    type?: string;
    tagIds?: string[];
  }) => void;
}

export function BlockHeader({ blockDetails, onUpdate }: BlockHeaderProps) {
  const titleEdit = useInlineEdit({
    initialValue: blockDetails.title,
    onSave: (title) => onUpdate({ title }),
  });

  const descriptionEdit = useInlineEdit({
    initialValue: blockDetails.description || "",
    onSave: (description) => onUpdate({ description }),
  });
  const [type, setType] = useState(blockDetails.category || "");
  const utils = api.useUtils();
  const { data: allTags = [] } = api.tags.getTags.useQuery();

  const handleTypeChange = (type: string) => {
    setType(type);
    onUpdate({ type });
  };

  const handleRemoveTag = (tagId: string) => {
    const selectedTagIds =
      blockDetails.tagAssignments
        ?.map((ta) => ta.tagId)
        .filter((id): id is string => id !== null) || [];
    const newTagIds = selectedTagIds.filter((id) => id !== tagId);

    // Optimistically update UI
    utils.blocks.getBlock.setData({ id: blockDetails.id }, (old) => {
      if (!old) return old;
      return {
        ...old,
        tagAssignments: old.tagAssignments.filter((ta) => ta.tagId !== tagId),
      };
    });

    onUpdate({ tagIds: newTagIds });
  };

  const handleUpdateTags = (tagIds: string[]) => {
    // Optimistically update UI
    utils.blocks.getBlock.setData({ id: blockDetails.id }, (old) => {
      if (!old) return old;

      const currentTagIds = old.tagAssignments
        .map((ta) => ta.tagId)
        .filter((id): id is string => id !== null);
      const addedTagIds = tagIds.filter((id) => !currentTagIds.includes(id));
      const removedTagIds = currentTagIds.filter((id) => !tagIds.includes(id));

      let newAssignments = [...old.tagAssignments];

      // Remove tags
      if (removedTagIds.length > 0) {
        newAssignments = newAssignments.filter(
          (ta) => ta.tagId && !removedTagIds.includes(ta.tagId)
        );
      }

      // Add tags
      if (addedTagIds.length > 0 && allTags.length > 0) {
        const newTagAssignments = addedTagIds
          .map((tagId) => {
            const tag = allTags.find((t) => t.id === tagId);
            if (!tag) return null;
            return {
              id: `temp-${Date.now()}-${tagId}`,
              tagId: tagId,
              blockId: blockDetails.id,
              promptId: null,
              tag: tag,
            };
          })
          .filter((ta): ta is NonNullable<typeof ta> => ta !== null);
        newAssignments = [...newAssignments, ...newTagAssignments];
      }

      return {
        ...old,
        tagAssignments: newAssignments as typeof old.tagAssignments,
      };
    });

    onUpdate({ tagIds });
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Title Section */}
      <div className="group">
        {titleEdit.isEditing ? (
          <Input
            value={titleEdit.value}
            onChange={(e) => titleEdit.setValue(e.target.value)}
            onBlur={titleEdit.handleSave}
            onKeyDown={titleEdit.handleKeyDown}
            autoFocus
            placeholder="Untitled Block"
            size={200}
          />
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {titleEdit.value || "Untitled Block"}
            </h1>
            <Button variant="ghost" size="sm" onClick={titleEdit.startEditing}>
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="group">
        {descriptionEdit.isEditing ? (
          <Input
            value={descriptionEdit.value}
            onChange={(e) => descriptionEdit.setValue(e.target.value)}
            onBlur={descriptionEdit.handleSave}
            onKeyDown={descriptionEdit.handleKeyDown}
            autoFocus
            className="text-base text-muted-foreground "
            placeholder="Add a description..."
          />
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-base text-muted-foreground">
              {descriptionEdit.value || "Add a description..."}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={descriptionEdit.startEditing}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Tags Display */}
      <BlockTagDisplay blockDetails={blockDetails} onRemove={handleRemoveTag} />

      {/* Metadata Row: Type and Add Tag Button */}
      <div className="flex gap-3 flex-wrap pt-2 items-end">
        <PromptSelect value={type} onChange={handleTypeChange} />
        <BlockTagSelector
          blockDetails={blockDetails}
          onUpdate={handleUpdateTags}
        />
      </div>
    </div>
  );
}
