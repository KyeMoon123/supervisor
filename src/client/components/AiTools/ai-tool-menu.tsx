"use client";
import { useAiStream } from "@/client/hooks/use-ai-steam";
import { useTiptapEditor } from "@/client/hooks/use-tiptap-editor";
import { selectionHasText } from "@/client/lib/tiptap-advanced-utils";
import { Button } from "@/client/primatives/button";
import type { Editor } from "@tiptap/core";
import { StarsIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/primatives/popover";
import { Spinner } from "@/client/primatives/spinner";
import { Textarea } from "@/client/primatives/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/primatives/tooltip";
import { useState } from "react";

export function AiToolMenu() {
  const { editor } = useTiptapEditor();
  if (!editor) return null;
  const hasText = editor.getText().trim().length > 0;

  return (
    <div className="flex gap-2">
      {!hasText && <DraftButton editor={editor} />}
      {/* {hasText && <AIMenuButton />} */}
    </div>
  );
}

const DraftButton = ({ editor }: { editor: Editor }) => {
  const { streamWithCallback, isStreaming } = useAiStream();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!editor) return;

    // Get the current selection range
    const { from, to } = editor.state.selection;
    const startPos = from;
    const endPos = to;

    // Delete the selected text first
    editor.commands.deleteRange({ from: startPos, to: endPos });

    // Track position for streaming chunks
    let currentPos = startPos;

    const result = await streamWithCallback(
      {
        prompt: prompt,
        action: "draft",
      },
      ({ chunk }) => {
        // Insert each chunk at the current position
        editor.commands.insertContentAt(currentPos, chunk);
        currentPos += chunk.length;
      }
    );

    // Select the streamed content
    editor.commands.setTextSelection({
      from: startPos,
      to: currentPos,
    });

    // Delete the raw streamed content
    editor.commands.deleteSelection();

    // Insert the final result as parsed markdown at the original position
    editor.commands.insertContentAt(startPos, result, {
      parseOptions: {
        preserveWhitespace: "full",
      },
      contentType: "markdown",
    });

    // Focus the editor at the end of the inserted content
    editor.commands.focus();
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <StarsIcon className="size-4" />
            {isStreaming ? <Spinner className="size-4" /> : "Draft"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-150">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleGenerate();
              }
            }}
            placeholder="Describe what sort of prompt you want to generate..."
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export function AIMenuButton() {
  const { editor } = useTiptapEditor();
  const hasSelection = selectionHasText(editor);
  const { streamWithCallback, isStreaming } = useAiStream();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!editor) return;

    // Get the current selection range
    const { from, to } = editor.state.selection;
    const startPos = from;
    const endPos = to;

    // Delete the selected text first
    editor.commands.deleteRange({ from: startPos, to: endPos });

    // Track position for streaming chunks
    let currentPos = startPos;

    const result = await streamWithCallback(
      {
        prompt: prompt,
        action: "edit_selection",
        selection: editor.getMarkdown().slice(startPos, endPos),
        context: editor.getMarkdown(),
      },
      ({ chunk }) => {
        // Insert each chunk at the current position
        editor.commands.insertContentAt(currentPos, chunk);
        currentPos += chunk.length;
      }
    );

    // Select the streamed content
    editor.commands.setTextSelection({
      from: startPos,
      to: currentPos,
    });

    // Delete the raw streamed content
    editor.commands.deleteSelection();

    // Insert the final result as parsed markdown at the original position
    editor.commands.insertContentAt(startPos, result, {
      parseOptions: {
        preserveWhitespace: "full",
      },
      contentType: "markdown",
    });

    // Focus the editor at the end of the inserted content
    editor.commands.focus();
  };

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger>
          <PopoverTrigger asChild>
            <Button variant="outline" disabled={!hasSelection}>
              <StarsIcon className="size-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent hidden={hasSelection}>
          <p>Select text to use AI tools</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-150">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Describe what sort of change you want to make to the selected text..."
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
}
