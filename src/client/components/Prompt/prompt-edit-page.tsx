"use client";

import type { PromptDetailsDto } from "@/server/api/routers/prompt";
import { EditorProvider } from "../tiptap/notion-like-editor";
import { api } from "@/trpc/react";
import { ContentEditorCard } from "../content/content-editor-card";
import { VariableManager } from "../content/variable-manager";
import { PromptDetails } from "./prompt-details";
interface PromptDetailProps {
  promptDetails: PromptDetailsDto;
}

export function PromptEditPage({ promptDetails }: PromptDetailProps) {
  const utils = api.useUtils();
  const updatePromptMutation = api.prompt.updatePromptBody.useMutation();

  const handleContentUpdate = (content: unknown) => {
    updatePromptMutation.mutate({
      id: promptDetails.id,
      body: content,
    });
  };
  return (
    <div className="w-full px-4 lg:px-8 py-8">
      <div className="grid lg:grid-cols-[1fr_500px] gap-6">
        <EditorProvider
          placeholder="Start writing..."
          initialContent={
            promptDetails.body ? JSON.stringify(promptDetails.body) : ""
          }
          handleUpdate={handleContentUpdate}
        >
          {/* Main Editor */}
          <div className="space-y-6">
            {/* Basic Info */}
            <PromptDetails promptDetails={promptDetails} />
            {/* Content Editor */}
            <ContentEditorCard />
            {/* Preview Section */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Variable Manager */}
            <VariableManager />
          </div>
        </EditorProvider>
      </div>
    </div>
  );
}
