"use client";

import { Card, CardContent } from "@/client/primatives/card";
import { EditorContentArea } from "../tiptap/notion-like-editor";

export function BlockEditor() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardContent className="px-6">
        <EditorContentArea />
      </CardContent>
    </Card>
  );
}
