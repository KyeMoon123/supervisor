"use client";
import { Badge } from "@/client/primatives/badge";
import { Button } from "@/client/primatives/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/client/primatives/card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { BlocksIcon } from "lucide-react";

export default function BlocksGrid() {
  const router = useRouter();
  const { data: blocks, isLoading } = api.blocks.getBlocks.useQuery();

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading folders...</div>
    );
  }

  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">No blocks found.</div>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BlocksIcon className="size-5 text-foreground" />
        Blocks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block) => (
          <Card
            onClick={() => router.push(`/blocks/${block.id}`)}
            key={block.id}
            className="p-5 hover:shadow-md transition-all hover:border-foreground cursor-pointer bg-card border-border"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="size-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <BlocksIcon className="size-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {block.title || "Untitled Block"}
                  </h3>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {block.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {block.description}
                </p>
              </div>
            </div>
            {/* <div className="flex gap-1 flex-wrap">
              {block.tagAssignments.map((tagAssignment) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tagAssignment.tag.name}
                </Badge>
              ))}
            </div> */}
          </Card>
        ))}
      </div>
    </section>
  );
}
