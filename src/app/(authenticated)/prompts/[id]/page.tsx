import { PromptDetail } from "@/client/components/Prompt/prompt-detail";

export default function PromptDetailPage() {
  return (
    <div className="flex flex-col gap-4 ">
      <PromptDetail promptId="1" projectId="1" />
    </div>
  );
}
