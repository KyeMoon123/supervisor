import { Badge } from "@/client/primatives/badge";
import { Card } from "@/client/primatives/card";
import FoldersGrid from "../folders/folders-grid";
import PromptsGrid from "../Prompt/prompts-grid";
import BlocksGrid from "../blocks/block-grid";

export function HomeItemsGrid() {
  return (
    <div className="space-y-8">
      <FoldersGrid />
      <PromptsGrid />
      <BlocksGrid />
    </div>
  );
}
