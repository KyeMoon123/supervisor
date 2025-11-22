"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/primatives/tabs";
import { EditorTab } from "@/client/components/Prompt/editor-tab";
import { PlaygroundTab } from "@/client/components/Prompt/playground-tab";
import { PublishedTab } from "@/client/components/Prompt/published-tab";
import { VersionsTab } from "@/client/components/Prompt/versions-tab";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Button } from "@/client/primatives/button";

interface PromptDetailProps {
  promptId: string;
  projectId: string;
}

export function PromptDetail({ promptId, projectId }: PromptDetailProps) {
  return (
    <div className="p-2">
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link
            href={`/projects/${projectId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Project
          </Link>
          <h2 className="text-2xl font-semibold text-foreground">
            Customer Support Assistant
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI assistant for handling customer support inquiries with empathy
            and accuracy
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Publish Version
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-0">
          <EditorTab />
        </TabsContent>

        <TabsContent value="playground" className="mt-0">
          <PlaygroundTab />
        </TabsContent>

        <TabsContent value="published" className="mt-0">
          <PublishedTab />
        </TabsContent>

        <TabsContent value="versions" className="mt-0">
          <VersionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
