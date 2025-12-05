"use client";
import { Button } from "@/client/primatives/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/client/primatives/card";
import { api } from "@/trpc/react";
import { FolderIcon } from "lucide-react";

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
    <section>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FolderIcon className="size-5 text-secondary" />
        Folders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <Card
            key={folder.name}
            className="p-5 hover:shadow-md transition-all hover:border-secondary cursor-pointer bg-card border-border"
          >
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <FolderIcon className="size-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1 truncate">
                  {folder.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {folder.description || "No description"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
