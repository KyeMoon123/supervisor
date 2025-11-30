"use client";

import type { Editor } from "@tiptap/react";
import { useMemo, useRef } from "react";

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

export type BlockSelectMenuProps = Omit<
  SuggestionMenuProps,
  "items" | "children"
> & {
  blocks?: Block[];
};

export const BlockSelectMenu = (props: BlockSelectMenuProps) => {
  return (
    <SuggestionMenu
      char=":"
      pluginKey="blockSelectMenu"
      decorationClass="tiptap-block-select-decoration"
      selector="tiptap-block-select-menu"
      items={getSuggestionItems}
      {...props}
    >
      {(props) => <BlockList {...props} />}
    </SuggestionMenu>
  );
};

const getSuggestionItems = async (props: { query: string; editor: Editor }) => {
  const blocks: Block[] =
    props.editor.storage.uiState.blockSelectMenuItems || [];

  return blocks?.length > 0
    ? blocks.map(
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

const BlockItem = (props: {
  item: SuggestionItem<Block>;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const { item, isSelected, onSelect } = props;
  const itemRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={itemRef}
      data-style="ghost"
      data-active-state={isSelected ? "on" : "off"}
      onClick={onSelect}
    >
      <div className="tiptap-button-text">
        {item.title}
        {item.subtext && (
          <div className="text-xs text-muted-foreground">{item.subtext}</div>
        )}
      </div>
    </Button>
  );
};

const BlockList = ({
  items,
  selectedIndex,
  onSelect,
}: SuggestionMenuRenderProps<Block>) => {
  const renderedItems = useMemo(() => {
    const rendered: React.ReactElement[] = [];

    items.forEach((item, index) => {
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
  }, [items, selectedIndex, onSelect]);

  if (!renderedItems.length) {
    return null;
  }

  return (
    <Card
      style={{
        maxHeight: "var(--suggestion-menu-max-height)",
      }}
    >
      <CardBody>
        <ButtonGroup>{renderedItems}</ButtonGroup>
      </CardBody>
    </Card>
  );
};
