"use client";
import { Button } from "@/client/primatives/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/client/primatives/card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Badge } from "@/client/primatives/badge";
import { FileIcon } from "lucide-react";

export default function PromptsGrid() {
  const router = useRouter();
  const { data: prompts, isLoading } = api.prompt.getPrompts.useQuery();

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading folders...</div>
    );
  }

  if (!prompts || prompts.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">No prompts found.</div>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileIcon className="size-5 text-primary" />
        Prompts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((prompt) => (
          <Card
            onClick={() => router.push(`/prompts/${prompt.id}`)}
            key={prompt.id}
            className="p-5 hover:shadow-md transition-all hover:border-primary cursor-pointer bg-card border-border"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <FileIcon className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {prompt.title || "Untitled Prompt"}
                  </h3>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {prompt.key}{" "}
                    {/* Change to prompt type and allow user to add types */}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {prompt.description}
                </p>
              </div>
            </div>
            {/* <div className="flex gap-1 flex-wrap">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div> */}
          </Card>
        ))}
      </div>
    </section>
  );
}
