import { Badge } from "@/client/primatives/badge";
import { AiToolMenu } from "../AiTools/ai-tool-menu";
import { BlockEditor } from "../blocks/BlockEditor";
import { UndoRedoButton } from "../tiptap/tiptap-ui/undo-redo-button";

export function ContentEditorCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-muted/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm"> Content</h3>
          <Badge variant="outline" className="text-xs">
            {/* 123 tokens */}
          </Badge>
        </div>
        <div>
          <div className="flex justify-end gap-2 items-center">
            <UndoRedoButton action="undo" />
            <UndoRedoButton action="redo" />
            <AiToolMenu />
          </div>
        </div>
      </div>

      <BlockEditor />
    </div>
  );
}
