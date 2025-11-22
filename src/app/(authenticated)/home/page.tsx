"use client";
import { useAuth } from "@/client/context/AuthContext";
import HomeActionsAndFilters from "@/client/components/Home/HomeActionsAndFilters";
import FoldersGrid from "@/client/components/Folders/FoldersGrid";
import PromptsGrid from "@/client/components/Prompt/PromptsGrid";
import { Separator } from "@/client/primatives/separator";

export default function HomePage() {
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
