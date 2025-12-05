"use client";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { BlockDetail } from "@/client/components/blocks/block-details";

export default function BlockDetailPage() {
  const { id } = useParams();
  const { data: block } = api.blocks.getBlock.useQuery({ id: id as string });
  return (
    <div className="flex flex-col gap-4 ">
      {block && <BlockDetail blockDetails={block} />}
    </div>
  );
}
