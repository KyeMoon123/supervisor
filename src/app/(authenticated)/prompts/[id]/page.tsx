"use client";
import { PromptEditPage } from "@/client/components/Prompt/prompt-edit-page";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";

export default function PromptDetailPage() {
  const { id } = useParams();
  const { data: prompt } = api.prompt.getPrompt.useQuery({ id: id as string });
  return (
    <div className="flex flex-col gap-4 ">
      {prompt && <PromptEditPage promptDetails={prompt} />}
    </div>
  );
}
