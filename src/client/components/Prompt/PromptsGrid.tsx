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
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8">
      {prompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader>
            <CardTitle>{prompt.name}</CardTitle>
          </CardHeader>

          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/prompts/${prompt.id}`)}
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
