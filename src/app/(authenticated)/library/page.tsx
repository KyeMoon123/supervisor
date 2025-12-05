"use client";
import { useAuth } from "@/client/context/AuthContext";
import HomeActionsAndFilters from "@/client/components/Home/HomeActions";
import FoldersGrid from "@/client/components/folders/folders-grid";
import PromptsGrid from "@/client/components/Prompt/prompts-grid";
import { Separator } from "@/client/primatives/separator";

export default function LibraryPage() {
  const { session, isPending, error, refetch } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <h1>Global Search bar goes here</h1>
      </div>
      <div className="flex">
        <HomeActionsAndFilters />
      </div>
      <div className="flex ">
        <FoldersGrid />
      </div>
      <Separator />
      <div className="flex ">
        <PromptsGrid />
      </div>
    </div>
  );
}
