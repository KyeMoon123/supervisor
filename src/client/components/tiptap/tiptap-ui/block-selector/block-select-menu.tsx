"use client";

import type { Editor } from "@tiptap/react";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

// --- Tiptap UI ---
import {
  Button,
  ButtonGroup,
} from "@/components/tiptap/tiptap-ui-primitive/button";
import { Card, CardBody } from "@/components/tiptap/tiptap-ui-primitive/card";
import type {
  SuggestionItem,
  SuggestionMenuProps,
  SuggestionMenuRenderProps,
} from "@/components/tiptap/tiptap-ui-utils/suggestion-menu";
import { SuggestionMenu } from "@/components/tiptap/tiptap-ui-utils/suggestion-menu";
import type { Block } from "@/shared/models/block";
import { Input } from "@/client/primatives/input";

export type BlockSelectMenuProps = Omit<
  SuggestionMenuProps,
  "items" | "children"
> & {
  blocks?: Block[];
};

export const BlockSelectMenu = (props: BlockSelectMenuProps) => {
  const params = useParams();
  const currentBlockId = params?.id as string | undefined;

  return (
    <SuggestionMenu
      char="@"
      pluginKey="blockSelectMenu"
      decorationClass="tiptap-block-select-decoration"
      selector="tiptap-block-select-menu"
      items={(itemProps) => getSuggestionItems(itemProps, currentBlockId)}
      {...props}
    >
      {(props) => <BlockList {...props} />}
    </SuggestionMenu>
  );
};

const getSuggestionItems = async (
  props: { query: string; editor: Editor },
  currentBlockId?: string
) => {
  const blocks: Block[] =
    props.editor.storage.uiState.blockSelectMenuItems || [];

  // Filter out the current block if it exists
  const filteredBlocks = currentBlockId
    ? blocks?.filter((block) => block.id !== currentBlockId) || []
    : blocks || [];

  return filteredBlocks?.length > 0
    ? filteredBlocks.map(
        (block): SuggestionItem => ({
          title: block.title,
          subtext: block.description ?? undefined,
          context: block,
          onSelect: ({ editor, context }) => {
            if (!context?.body?.content) return;

            const { from } = editor.state.selection;
            // Remove the trigger marker (":" character before the cursor) if possible
            if (from > 0) {
              editor.commands.deleteRange({ from: from - 1, to: from });
            }

            const jsonContent = context.body.content.map((node: any) =>
              typeof node.toJSON === "function" ? node.toJSON() : node
            );

            // Insert block content
            editor.commands.insertContent({
              type: "doc",
              content: jsonContent,
            });
          },
        })
      )
    : [];
};

const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const BlockItem = (props: {
  item: SuggestionItem<Block>;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const { item, isSelected, onSelect } = props;

  return (
    <div
      className="w-full justify-start text-left cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors duration-100 bg-background/20"
      onClick={onSelect}
    >
      <div className="flex flex-col">
        <div className="text-sm font-medium">{item.title}</div>
        {/* {item.subtext && ( */}
        <div className="text-xs text-muted-foreground ">
          {truncateText(item.subtext ?? "")}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

const BlockList = ({
  items,
  selectedIndex,
  onSelect,
}: SuggestionMenuRenderProps<Block>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const subtextMatch = item.subtext?.toLowerCase().includes(query);
      return titleMatch || subtextMatch;
    });
  }, [items, searchQuery]);

  const renderedItems = useMemo(() => {
    const rendered: React.ReactElement[] = [];

    filteredItems.forEach((item, index) => {
      if (!item.context) return;

      rendered.push(
        <BlockItem
          key={`block-item-${index}-${item.title}`}
          item={item}
          isSelected={index === selectedIndex}
          onSelect={() => onSelect(item)}
        />
      );
    });

    return rendered;
  }, [filteredItems, selectedIndex, onSelect]);

  return (
    <Card
      style={{
        maxHeight: "var(--suggestion-menu-max-height)",
        minHeight: "150px",
      }}
    >
      <CardBody className="flex flex-col gap-2">
        <div className="px-2 pt-2">
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>
        {renderedItems.length > 0 ? (
          <div className="overflow-y-auto">
            <ButtonGroup>{renderedItems}</ButtonGroup>
          </div>
        ) : (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            {searchQuery ? "No blocks found" : "No blocks available"}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
