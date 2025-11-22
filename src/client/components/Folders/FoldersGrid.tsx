"use client";
import { Button } from "@/client/primatives/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/client/primatives/card";
import { api } from "@/trpc/react";

export default function FoldersGrid() {
  const { data: folders, isLoading } = api.folder.getFolders.useQuery();

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading folders...</div>
    );
  }

  if (!folders || folders.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">No folders found.</div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8">
      {folders.map((folder) => (
        <Card key={folder.id}>
          <CardHeader>
            <CardTitle>{folder.name}</CardTitle>
          </CardHeader>

          <CardFooter>
            <Button variant="outline" size="sm">
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
