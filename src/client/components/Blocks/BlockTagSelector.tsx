"use client";

import { useState } from "react";
import { Badge } from "@/client/primatives/badge";
import { Button } from "@/client/primatives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/primatives/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/client/primatives/command";
import { X, Plus, Check } from "lucide-react";
import { cn } from "@/client/lib/utils";
import { api } from "@/trpc/react";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";

interface BlockTagSelectorProps {
  blockDetails: BlockDetailsDto;
  onUpdate: (tagIds: string[]) => void;
}

export function BlockTagSelector({
  blockDetails,
  onUpdate,
}: BlockTagSelectorProps) {
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const utils = api.useUtils();
  const { data: allTags = [] } = api.tags.getTags.useQuery();
  const createTagMutation = api.tags.createTag.useMutation({
    onSuccess: () => {
      utils.tags.getTags.invalidate();
      setNewTagName("");
    },
  });

  const selectedTags =
    blockDetails.tagAssignments?.map((ta) => ta.tag).filter(Boolean) || [];
  const selectedTagIds = selectedTags.map((tag) => tag.id);

  const handleToggleTag = (tagId: string) => {
    const isCurrentlySelected = selectedTagIds.includes(tagId);
    const newTagIds = isCurrentlySelected
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];

    // Perform the actual update
    onUpdate(newTagIds);

    // Close popover after a brief delay to allow the UI to update
    if (!isCurrentlySelected) {
      setTimeout(() => setTagPopoverOpen(false), 100);
    }
  };

  const handleCreateAndAddTag = () => {
    if (!newTagName.trim()) return;

    createTagMutation.mutate(
      { name: newTagName.trim() },
      {
        onSuccess: (newTag) => {
          if (newTag) {
            // Optimistically add the new tag
            utils.blocks.getBlock.setData({ id: blockDetails.id }, (old) => {
              if (!old) return old;

              return {
                ...old,
                tagAssignments: [
                  ...old.tagAssignments,
                  {
                    id: `temp-${Date.now()}`,
                    tagId: newTag.id,
                    blockId: blockDetails.id,
                    promptId: null,
                    tag: newTag,
                  },
                ],
              };
            });

            onUpdate([...selectedTagIds, newTag.id]);
          }
          setNewTagName("");
          setTagPopoverOpen(false);
        },
      }
    );
  };

  const availableTags = allTags.filter(
    (tag) => !selectedTagIds.includes(tag.id)
  );

  return (
    <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Plus className="h-3.5 w-3.5" />
          Add Tag
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <Command>
          <CommandInput
            placeholder="Search or create tag..."
            value={newTagName}
            onValueChange={setNewTagName}
          />
          <CommandList>
            <CommandEmpty>
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={handleCreateAndAddTag}
                  disabled={!newTagName.trim() || createTagMutation.isPending}
                >
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Create "{newTagName}"
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {availableTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  onSelect={() => {
                    handleToggleTag(tag.id);
                  }}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedTagIds.includes(tag.id)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                  {tag.name}
                </CommandItem>
              ))}
              {availableTags.length > 0 && newTagName.trim() && (
                <CommandItem
                  onSelect={handleCreateAndAddTag}
                  className="cursor-pointer border-t"
                >
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Create "{newTagName}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
