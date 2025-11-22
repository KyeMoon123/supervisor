"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useContext } from "react";

// --- Tiptap Core Extensions ---
import { Typography } from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";

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

// --- Styles ---
import "@/components/tiptap/notion-like-editor.scss";

// --- Content ---

export interface PromptEditorProps {
  placeholder?: string;
}

export interface EditorProviderProps {
  placeholder?: string;
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
      {/* <AiMenu /> */}
      <SlashDropdownMenu />
    </EditorContent>
  );
}

/**
 * Component that creates and provides the editor instance
 */
export function EditorProvider(props: EditorProviderProps) {
  const { placeholder = "Start writing..." } = props;

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

  console.log(editor?.getJSON());
  console.log(editor?.getHTML());
  // console.log(editor?.getText());
  console.log(editor?.getMarkdown());

  return (
    <div className="notion-like-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <EditorContentArea />
      </EditorContext.Provider>
    </div>
  );
}

/**
 * Prompt editor with all necessary providers, ready to use with just a placeholder
 */
export function PromptEditor({
  placeholder = "Start writing...",
}: PromptEditorProps) {
  return <EditorProvider placeholder={placeholder} />;
}
