"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/primatives/card";
import { Badge } from "@/client/primatives/badge";
import { PromptEditor } from "@/client/components/tiptap/notion-like-editor";

export function EditorTab() {
  const detectedVariables = ["customerName", "issueType", "productName"];

  return (
    <div className="space-x-6 flex w-full">
      <Card className="w-full">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Prompt Template</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <PromptEditor placeholder="Start writing..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detected Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 px-12">
            {detectedVariables.map((variable) => (
              <Badge key={variable} variant="secondary" className=" text-xs">
                {`{{${variable}}}`}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
