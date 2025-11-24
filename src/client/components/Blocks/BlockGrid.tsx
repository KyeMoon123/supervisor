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
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8">
      {blocks.map((block) => (
        <Card key={block.id}>
          <CardHeader>
            <CardTitle>{block.title || "Untitled Block"}</CardTitle>
          </CardHeader>

          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/blocks/${block.id}`)}
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
