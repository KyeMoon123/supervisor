"use client";

import { api } from "@/trpc/react";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";
import { BlockHeader } from "../blocks/BlockHeader";
import { BlockEditor } from "../blocks/BlockEditor";
import { EditorProvider } from "../tiptap/notion-like-editor";
import { Textarea } from "@/client/primatives/textarea";
import { Button } from "@/client/primatives/button";
import { Label } from "@/client/primatives/label";
import { useTiptapEditor } from "@/client/hooks/use-tiptap-editor";
import { useState } from "react";

interface BlockDetailProps {
  blockDetails: BlockDetailsDto;
}

export function BlockDetail({ blockDetails }: BlockDetailProps) {
  const utils = api.useUtils();
  const updateBlockMutation = api.blocks.updateBlockBody.useMutation();
  const updateBlockMetaMutation = api.blocks.updateBlock.useMutation();

  const handleMetadataUpdate = (data: {
    title?: string;
    description?: string;
    type?: string;
    tagIds?: string[];
  }) => {
    updateBlockMetaMutation.mutate({
      id: blockDetails.id,
      ...data,
    });
  };

  const handleContentUpdate = (content: unknown) => {
    updateBlockMutation.mutate({
      id: blockDetails.id,
      body: content,
    });
  };

  return (
    <EditorProvider
      placeholder="Start writing..."
      initialContent={
        blockDetails.body ? JSON.stringify(blockDetails.body) : ""
      }
      handleUpdate={handleContentUpdate}
    >
      <div className="p-6  max-w-7xl mx-auto">
        <BlockHeader
          blockDetails={blockDetails}
          onUpdate={handleMetadataUpdate}
        />
        <div className="flex flex-col gap-2">
          <BlockEditor />
        </div>
      </div>
    </EditorProvider>
  );
}

const PromptChat = () => {
  const { editor } = useTiptapEditor();
  const [prompt, setPrompt] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedText, setAccumulatedText] = useState("");

  async function handleStream() {
    if (!editor) return;

    setIsStreaming(true);
    setAccumulatedText("");

    // Build query parameters
    const params = new URLSearchParams({
      summary: prompt,
      context: editor.getText() || "",
    });

    const response = await fetch(`/api/ai/stream?${params.toString()}`, {
      method: "GET",
    });
    if (!response.body) {
      setIsStreaming(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    // Focus editor and get starting position
    editor.commands.focus("end");
    const startPos = editor.state.selection.to;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Update display state
      setAccumulatedText(buffer);

      // Stream plain text character by character for immediate feedback
      editor.commands.insertContent(chunk);
    }

    // Now convert the accumulated markdown to proper format
    if (buffer.length > 0) {
      // Calculate current position after inserting text
      const currentPos = editor.state.selection.to;

      // Select all the text we just inserted
      editor.commands.setTextSelection({
        from: startPos,
        to: currentPos,
      });
      editor.commands.deleteSelection();

      // Insert as parsed markdown at the original position
      editor.commands.insertContentAt(startPos, buffer, {
        parseOptions: {
          preserveWhitespace: "full",
        },
        contentType: "markdown",
      });
    }

    setIsStreaming(false);
    setAccumulatedText("");
  }

  const handleAskAI = async () => {
    await handleStream();
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="prompt">
        Explain your prompt or explain your changes
      </Label>
      <Textarea
        placeholder="Explain your prompt or explain your changes..."
        value={prompt || ""}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isStreaming}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleAskAI}
        disabled={isStreaming}
      >
        {isStreaming ? "Streaming..." : "Send"}
      </Button>
    </div>
  );
};
