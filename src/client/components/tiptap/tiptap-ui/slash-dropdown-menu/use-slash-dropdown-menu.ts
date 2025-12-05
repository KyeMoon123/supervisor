"use client";

import type { Editor } from "@tiptap/react";
import { useCallback } from "react";

// --- Icons ---
import { AiSparklesIcon } from "@/components/tiptap/tiptap-icons/ai-sparkles-icon";
import { BlockquoteIcon } from "@/components/tiptap/tiptap-icons/blockquote-icon";
import { CodeBlockIcon } from "@/components/tiptap/tiptap-icons/code-block-icon";
import { HeadingOneIcon } from "@/components/tiptap/tiptap-icons/heading-one-icon";
import { HeadingThreeIcon } from "@/components/tiptap/tiptap-icons/heading-three-icon";
import { HeadingTwoIcon } from "@/components/tiptap/tiptap-icons/heading-two-icon";
import { ListIcon } from "@/components/tiptap/tiptap-icons/list-icon";
import { ListOrderedIcon } from "@/components/tiptap/tiptap-icons/list-ordered-icon";
import { ListTodoIcon } from "@/components/tiptap/tiptap-icons/list-todo-icon";
import { TypeIcon } from "@/components/tiptap/tiptap-icons/type-icon";

// --- Lib ---
import {
  findSelectionPosition,
  hasContentAbove,
} from "@/client/lib/tiptap-advanced-utils";
import {
  isExtensionAvailable,
  isNodeInSchema,
} from "@/client/lib/tiptap-utils";

// --- Tiptap UI ---
import {
  addBlockSelectTrigger,
  canAddBlockSelectTrigger,
} from "@/client/components/tiptap/tiptap-ui/block-selector/use-block-select-trigger";
import type { SuggestionItem } from "@/components/tiptap/tiptap-ui-utils/suggestion-menu";
import { BlocksIcon } from "lucide-react";

export interface SlashMenuConfig {
  enabledItems?: SlashMenuItemType[];
  customItems?: SuggestionItem[];
  itemGroups?: {
    [key in SlashMenuItemType]?: string;
  };
  showGroups?: boolean;
}

const texts = {
  // AI
  // continue_writing: {
  //   title: "Continue writing with AI",
  //   subtext: "Continue writing from the current position",
  //   keywords: ["continue", "write", "continue writing", "ai"],
  //   badge: AiSparklesIcon,
  //   group: "AI",
  // },
  // ai_ask_button: {
  //   title: "Generate with AI",
  //   subtext: "Generate content with AI",
  //   keywords: ["ai", "ask", "generate"],
  //   badge: AiSparklesIcon,
  //   group: "AI",
  // },

  // Style
  text: {
    title: "Text",
    subtext: "Regular text paragraph",
    keywords: ["p", "paragraph", "text"],
    badge: TypeIcon,
    group: "Style",
  },
  heading_1: {
    title: "Heading 1",
    subtext: "Top-level heading",
    keywords: ["h", "heading1", "h1"],
    badge: HeadingOneIcon,
    group: "Style",
  },
  heading_2: {
    title: "Heading 2",
    subtext: "Key section heading",
    keywords: ["h2", "heading2", "subheading"],
    badge: HeadingTwoIcon,
    group: "Style",
  },
  bullet_list: {
    title: "Bullet List",
    subtext: "List with unordered items",
    keywords: ["ul", "li", "list", "bulletlist", "bullet list"],
    badge: ListIcon,
    group: "Style",
  },
  // ordered_list: {
  //   title: "Numbered List",
  //   subtext: "List with ordered items",
  //   keywords: ["ol", "li", "list", "numberedlist", "numbered list"],
  //   badge: ListOrderedIcon,
  //   group: "Style",
  // },
  // task_list: {
  //   title: "To-do list",
  //   subtext: "List with tasks",
  //   keywords: ["tasklist", "task list", "todo", "checklist"],
  //   badge: ListTodoIcon,
  //   group: "Style",
  // },
  quote: {
    title: "Blockquote",
    subtext: "Blockquote block",
    keywords: ["quote", "blockquote"],
    badge: BlockquoteIcon,
    group: "Style",
  },
  code_block: {
    title: "Code Block",
    subtext: "Code block with syntax highlighting",
    keywords: ["code", "pre"],
    badge: CodeBlockIcon,
    group: "Style",
  },
  block_select: {
    title: "Block Select",
    subtext: "Select a block",
    keywords: ["block", "select"],
    badge: BlocksIcon,
    group: "Block",
  },
};

export type SlashMenuItemType = keyof typeof texts;

const getItemImplementations = () => {
  return {
    // Style
    text: {
      check: (editor: Editor) => isNodeInSchema("paragraph", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().setParagraph().run();
      },
    },
    heading_1: {
      check: (editor: Editor) => isNodeInSchema("heading", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
    },
    heading_2: {
      check: (editor: Editor) => isNodeInSchema("heading", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
    },
    bullet_list: {
      check: (editor: Editor) => isNodeInSchema("bulletList", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().toggleBulletList().run();
      },
    },
    quote: {
      check: (editor: Editor) => isNodeInSchema("blockquote", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().toggleBlockquote().run();
      },
    },
    code_block: {
      check: (editor: Editor) => isNodeInSchema("codeBlock", editor),
      action: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().toggleNode("codeBlock", "paragraph").run();
      },
    },
    block_select: {
      check: (editor: Editor) => canAddBlockSelectTrigger(editor),
      action: ({ editor }: { editor: Editor }) => {
        addBlockSelectTrigger(editor);
      },
    },
  };
};

function organizeItemsByGroups(
  items: SuggestionItem[],
  showGroups: boolean
): SuggestionItem[] {
  if (!showGroups) {
    return items.map((item) => ({ ...item, group: "" }));
  }

  const groups: { [groupLabel: string]: SuggestionItem[] } = {};

  // Group items
  items.forEach((item) => {
    const groupLabel = item.group || "";
    if (!groups[groupLabel]) {
      groups[groupLabel] = [];
    }
    groups[groupLabel].push(item);
  });

  // Flatten groups in order (this maintains the visual order for keyboard navigation)
  const organizedItems: SuggestionItem[] = [];
  Object.entries(groups).forEach(([, groupItems]) => {
    organizedItems.push(...groupItems);
  });

  return organizedItems;
}

/**
 * Custom hook for slash dropdown menu functionality
 */
export function useSlashDropdownMenu(config?: SlashMenuConfig) {
  const getSlashMenuItems = useCallback(
    (editor: Editor) => {
      const items: SuggestionItem[] = [];

      const enabledItems =
        config?.enabledItems || (Object.keys(texts) as SlashMenuItemType[]);

      const showGroups = config?.showGroups !== false;

      const itemImplementations = getItemImplementations();

      enabledItems.forEach((itemType) => {
        const itemImpl = itemImplementations[itemType];
        const itemText = texts[itemType];

        if (itemImpl && itemText && itemImpl.check(editor)) {
          const item: SuggestionItem = {
            onSelect: ({ editor }) => itemImpl.action!({ editor }),
            ...itemText,
          };

          if (config?.itemGroups?.[itemType]) {
            item.group = config.itemGroups[itemType];
          } else if (!showGroups) {
            item.group = "";
          }

          items.push(item);
        }
      });

      if (config?.customItems) {
        items.push(...config.customItems);
      }

      // Reorganize items by groups to ensure keyboard navigation works correctly
      return organizeItemsByGroups(items, showGroups);
    },
    [config]
  );

  return {
    getSlashMenuItems,
    config,
  };
}
