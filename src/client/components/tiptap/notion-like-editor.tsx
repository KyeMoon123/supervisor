"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useContext, useEffect, useRef } from "react";

// --- Tiptap Core Extensions ---
import { Typography } from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { StarterKit } from "@tiptap/starter-kit";

// --- Hooks ---
import { useScrollToHash } from "@/client/components/tiptap/tiptap-ui/copy-anchor-link-button/use-scroll-to-hash";

// --- Custom Extensions ---
import { UiState } from "@/client/components/tiptap/tiptap-extension/ui-state-extension";

import "@/components/tiptap/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { SlashDropdownMenu } from "@/client/components/tiptap/tiptap-ui/slash-dropdown-menu";
import { BlockSelectMenu } from "./tiptap-ui/block-selector/block-select-menu";

// --- Styles ---
import "@/components/tiptap/notion-like-editor.scss";
import { api } from "@/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import { AiMenu } from "./tiptap-ui/ai-menu";
import AI from "./tiptap-extension/ai-extension";
// --- Content ---

export interface EditorProviderProps {
  placeholder?: string;
  initialContent?: string;
  children: React.ReactNode;
  handleUpdate: (content: unknown) => void;
}

/**
 * EditorContent component that renders the actual editor
 */
export function EditorContentArea() {
  const { editor } = useContext(EditorContext)!;

  useScrollToHash();

  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      editor={editor}
      role="presentation"
      className="notion-like-editor-content"
    >
      <AiMenu />
      {/* <EmojiDropdownMenu /> */}
      <BlockSelectMenu />
      <SlashDropdownMenu />
    </EditorContent>
  );
}

/**
 * Component that creates and provides the editor instance
 */
export function EditorProvider({
  placeholder,
  initialContent,
  children,
  handleUpdate,
}: EditorProviderProps) {
  const lastSavedContentRef = useRef<string | undefined>(undefined);
  const hasUserEditedRef = useRef(false);
  const { data: queryBlocks, isLoading: isLoadingBlocks } =
    api.blocks.getBlocks.useQuery();

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "notion-like-editor",
      },
    },
    extensions: [
      Markdown.configure({
        markedOptions: {
          gfm: true, // GitHub Flavored Markdown
        },
      }),
      AI,
      StarterKit.configure({
        undoRedo: false,
        horizontalRule: false,
        dropcursor: {
          width: 2,
        },
        link: { openOnClick: false },
      }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass: "is-empty with-slash",
      }),
      Typography,
      UiState,
    ],
  });

  useEffect(() => {
    if (editor && queryBlocks) {
      editor.commands.setBlockSelectMenuItems(queryBlocks);
    }
  }, [editor, queryBlocks]);

  // Set initial content on mount
  useEffect(() => {
    if (initialContent && editor) {
      try {
        const parsed = JSON.parse(initialContent);
        editor.commands.setContent(parsed);
      } catch {
        editor.commands.setContent(initialContent);
      }
      lastSavedContentRef.current = JSON.stringify(editor?.getJSON());
      hasUserEditedRef.current = false;
    }
  }, [initialContent, editor]);

  // Listen for user edits
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      hasUserEditedRef.current = true;
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor]);

  // Debounced autosave
  const debouncedEditorContent = useDebounce(editor?.getJSON(), 1000);

  useEffect(() => {
    if (!debouncedEditorContent) return;
    if (!hasUserEditedRef.current) return;

    const serialized = JSON.stringify(debouncedEditorContent);
    const text = editor?.getText() || "";
    if (serialized === lastSavedContentRef.current) return;

    // Only autosave if content has actually changed and user has edited

    handleUpdate(text?.trim() === "" ? null : serialized);
    lastSavedContentRef.current = serialized;
  }, [debouncedEditorContent, handleUpdate]);

  return (
    <div className="notion-like-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        {children}
      </EditorContext.Provider>
    </div>
  );
}
