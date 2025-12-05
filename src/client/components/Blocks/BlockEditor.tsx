"use client";

import { Card, CardContent } from "@/client/primatives/card";
import { AiToolMenu } from "../AiTools/ai-tool-menu";
import { EditorContentArea } from "../tiptap/notion-like-editor";
import { UndoRedoButton } from "../tiptap/tiptap-ui/undo-redo-button";

export function BlockEditor() {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-end">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
        <AiToolMenu />
      </div>
      <Card className="max-h-[75vh]">
        <CardContent className="px-6 overflow-y-auto flex-1">
          <EditorContentArea />
        </CardContent>
      </Card>
    </div>
  );
}
