"use client";

import { Badge } from "@/client/primatives/badge";
import { Button } from "@/client/primatives/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/client/primatives/collapsible";
import { Input } from "@/client/primatives/input";
import { Label } from "@/client/primatives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/primatives/select";
import { Textarea } from "@/client/primatives/textarea";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";
import {
  BlockCategoryEnum,
  type TBlockCategory,
} from "@/server/db/schema/blocks";
import { api } from "@/trpc/react";
import { AiToolMenu } from "../AiTools/ai-tool-menu";
import { VariableManager } from "../content/variable-manager";
import { EditorProvider } from "../tiptap/notion-like-editor";
import { UndoRedoButton } from "../tiptap/tiptap-ui/undo-redo-button";
import { BlockEditor } from "./BlockEditor";
import { BlockDetails } from "./block-details";
import { ContentEditorCard } from "../content/content-editor-card";

interface BlockEditPageProps {
  blockDetails: BlockDetailsDto;
}

export function BlockEditPage({ blockDetails }: BlockEditPageProps) {
  const utils = api.useUtils();
  const updateBlockMutation = api.blocks.updateBlockBody.useMutation();

  const handleContentUpdate = (content: unknown) => {
    updateBlockMutation.mutate({
      id: blockDetails.id,
      body: content,
    });
  };
  return (
    <div className="w-full px-4 lg:px-8 py-8">
      <div className="grid lg:grid-cols-[1fr_500px] gap-6">
        <EditorProvider
          placeholder="Start writing..."
          initialContent={
            blockDetails.body ? JSON.stringify(blockDetails.body) : ""
          }
          handleUpdate={handleContentUpdate}
        >
          {/* Main Editor */}
          <div className="space-y-6">
            {/* Basic Info */}
            <BlockDetails blockDetails={blockDetails} />
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
