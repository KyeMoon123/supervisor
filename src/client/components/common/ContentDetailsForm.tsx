"use client";

import { Badge } from "@/client/primatives/badge";
import { Input } from "@/client/primatives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/primatives/select";
import { Textarea } from "@/client/primatives/textarea";
import { Field, FieldError, FieldLabel } from "@/client/primatives/field";
import {
  BlockCategoryEnum,
  type TBlockCategory,
} from "@/server/db/schema/blocks";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "@/client/primatives/button";
import { toSentenceCase } from "@/shared/utils/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/client/primatives/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/client/primatives/hover-card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { api } from "@/trpc/react";
import { ConfirmationDialog } from "@/client/common/ConfirmationDialog";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
  description: string;
  category: string;
  tags: string[];
};

interface ContentDetails {
  id: string;
  title: string | null;
  description: string | null;
  category: string;
  tags: string[];
  archivedAt: Date | null;
}

interface ContentDetailsFormProps {
  details: ContentDetails;
  onUpdate: (id: string, data: Partial<ContentDetails>) => void;
}

export function ContentDetailsForm({
  details,
  onUpdate,
}: ContentDetailsFormProps) {
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();
  const archiveBlockMutation = api.blocks.archiveBlock.useMutation();
  const unarchiveBlockMutation = api.blocks.unarchiveBlock.useMutation();
  const deleteBlockMutation = api.blocks.deleteBlock.useMutation();
  const utils = api.useUtils();

  const form = useForm<FormValues>({
    defaultValues: {
      title: details.title ?? "",
      description: details.description ?? "",
      category: details.category ?? ("misc" as TBlockCategory),
      tags: details.tags ?? [],
    },
  });

  // Watch form values for debouncing
  const titleValue = form.watch("title");
  const descriptionValue = form.watch("description");
  const categoryValue = form.watch("category");

  // Debounce the values
  const debouncedTitle = useDebounce(titleValue, 500);
  const debouncedDescription = useDebounce(descriptionValue, 500);
  const debouncedCategory = useDebounce(categoryValue, 500);

  // Update the content when debounced values change
  useEffect(() => {
    if (debouncedTitle !== details.title && debouncedTitle !== "") {
      onUpdate(details.id, { title: debouncedTitle });
    }
  }, [debouncedTitle]);

  useEffect(() => {
    if (debouncedDescription !== details.description) {
      onUpdate(details.id, { description: debouncedDescription });
    }
  }, [debouncedDescription]);

  useEffect(() => {
    if (debouncedCategory !== details.category) {
      onUpdate(details.id, { category: debouncedCategory });
    }
  }, [debouncedCategory]);

  // Update form when details changes (from external updates)
  useEffect(() => {
    form.reset({
      title: details.title ?? "",
      description: details.description ?? "",
      category: details.category ?? ("misc" as TBlockCategory),
      tags: details.tags ?? [],
    });
  }, [details.id]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      const currentTags = form.watch("tags") ?? [];

      if (!currentTags.includes(newTag)) {
        onUpdate(details.id, { tags: [...currentTags, newTag] });
        form.setValue("tags", [...currentTags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.watch("tags") ?? [];
    onUpdate(details.id, {
      tags: currentTags.filter((tag) => tag !== tagToRemove),
    });
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleArchive = async () => {
    if (details.archivedAt) {
      await unarchiveBlockMutation.mutate(
        { id: details.id },
        {
          onSuccess: async () => {
            await utils.blocks.getBlock.refetch();
          },
        }
      );
    } else {
      await archiveBlockMutation.mutate(
        { id: details.id },
        {
          onSuccess: async () => {
            await utils.blocks.getBlock.refetch();
          },
        }
      );
    }
  };

  const handleDelete = async () => {
    await deleteBlockMutation.mutateAsync({ id: details.id });
    await utils.blocks.getBlock.refetch();
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="pb-3">
        <div className="flex items-center justify-between gap-4">
          {details.archivedAt && (
            <div className="flex items-center gap-2">
              <Badge variant={details.archivedAt ? "destructive" : "default"}>
                Archived
              </Badge>
            </div>
          )}
          {/* Compact title display */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="content-details-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Untitled"
                  autoComplete="off"
                />
              )}
            />

            {form.watch("tags") && form.watch("tags").length > 0 && (
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="flex gap-1.5 flex-shrink-0 cursor-pointer">
                    <Badge variant="secondary" className="text-xs h-5 px-1.5">
                      {form.watch("tags")[0]}
                    </Badge>
                    {form.watch("tags").length > 1 && (
                      <Badge variant="secondary" className="text-xs h-5 px-1.5">
                        +{form.watch("tags").length - 1}
                      </Badge>
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2">
                  <div className="flex flex-wrap gap-1.5 max-w-xs">
                    {form.watch("tags").map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs h-5 px-1.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

          {/* Compact category and expand button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-7 text-xs w-[110px] border-border/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BlockCategoryEnum.enumValues.map((category: string) => (
                      <SelectItem key={category} value={category}>
                        {toSentenceCase(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle metadata</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Expanded metadata section */}
        <CollapsibleContent>
          <form className="mt-4 space-y-4 pl-1">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="content-details-description"
                    className="text-xs text-muted-foreground"
                  >
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="content-details-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="What does this prompt do?"
                    rows={3}
                    className="text-sm resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <FieldLabel
                htmlFor="content-details-tags"
                className="text-xs text-muted-foreground"
              >
                Tags
              </FieldLabel>
              <Input
                id="content-details-tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag and press Enter..."
                className="h-8 text-sm"
              />
              {form.watch("tags") && form.watch("tags").length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.watch("tags").map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs gap-1 h-6 px-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive ml-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </Field>
          </form>
          <div className="flex items-center gap-2 justify-end mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await handleArchive();
              }}
              isLoading={
                archiveBlockMutation.isPending ||
                unarchiveBlockMutation.isPending
              }
            >
              {details.archivedAt ? "Unarchive" : "Archive"}
            </Button>
            <ConfirmationDialog
              triggerText="Delete"
              onConfirm={async () => {
                await handleDelete();
              }}
              type="destructive"
              title="Delete Block"
              description="Are you sure you want to delete this block? This action cannot be undone."
              loading={deleteBlockMutation.isPending}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
