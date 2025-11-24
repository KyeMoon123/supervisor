"use client";

import { Card, CardContent } from "@/client/primatives/card";
import {
  EditorContentArea,
  EditorProvider,
} from "../tiptap/notion-like-editor";
import { api } from "@/trpc/react";
import type { BlockDetailsDto } from "@/server/api/routers/blocks";

interface BlockDetailProps {
  blockDetails: BlockDetailsDto;
}

export function BlockDetail({ blockDetails }: BlockDetailProps) {
  const updateBlockMutation = api.blocks.updateBlockBody.useMutation();
  return (
    <EditorProvider
      placeholder="Start writing..."
      initialContent={
        blockDetails.body ? JSON.stringify(blockDetails.body) : ""
      }
      handleUpdate={(content) => {
        updateBlockMutation.mutate({
          id: blockDetails.id,
          body: content,
        });
      }}
    >
      <div className="p-2">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {blockDetails.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {blockDetails.description || "No description"}
            </p>
          </div>
        </div>
        <div className="space-x-6 flex w-full">
          <Card className="w-full">
            <CardContent className="">
              <EditorContentArea />
            </CardContent>
          </Card>
        </div>
      </div>
    </EditorProvider>
  );
}
