"use client";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { BlockEditPage } from "@/client/components/blocks/block-edit-page";

export default function BlockDetailPage() {
  const { id } = useParams();
  const { data: block } = api.blocks.getBlock.useQuery({ id: id as string });
  return (
    <div className="flex flex-col">
      {block && <BlockEditPage blockDetails={block} />}
    </div>
  );
}
