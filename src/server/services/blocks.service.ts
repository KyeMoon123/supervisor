import type {
  BlockDetailsDto,
  UpdateBlockInput,
} from "@/shared/api-interface/blocks";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db";
import { blocks } from "../db/schema/blocks";
import { tagAssignments } from "../db/schema/tagAssignments";
import { pickDefined } from "@/shared/utils/utils";

export const BlocksService = {
  getBlocks,
  createBlock,
  getBlockDetails,
  updateBlockBody,
  updateBlock,
};

async function getBlocks({
  workspaceId,
}: {
  workspaceId: string;
  userId: string;
}) {
  return await db
    .select()
    .from(blocks)
    .where(eq(blocks.workspaceId, workspaceId));
}

async function createBlock(block: typeof blocks.$inferInsert) {
  const blockTitle = block.title || `Untitled Block - ${nanoid(4)}`;
  const [newBlock] = await db
    .insert(blocks)
    .values({
      ...block,
      title: blockTitle,
    })
    .returning();
  return newBlock;
}

async function getBlockDetails({
  id,
}: {
  id: string;
}): Promise<BlockDetailsDto> {
  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, id),
    with: {
      tagAssignments: {
        with: {
          tag: true,
        },
      },
    },
  });
  if (!block) {
    throw new Error("Block not found");
  }
  // Filter out tag assignments where tag is null
  const tagAssignments = block.tagAssignments.filter(
    (ta): ta is typeof ta & { tag: NonNullable<typeof ta.tag> } =>
      ta.tag !== null
  );

  return {
    ...block,
    tagAssignments,
  };
}

async function updateBlockBody({ id, body }: { id: string; body: unknown }) {
  await db.update(blocks).set({ body }).where(eq(blocks.id, id));
  const [updated] = await db.select().from(blocks).where(eq(blocks.id, id));
  return updated;
}

async function updateBlock({
  id,
  title,
  description,
  type,
  tagIds,
}: UpdateBlockInput) {
  const updateData = pickDefined({ title, description, type });
  if (Object.keys(updateData).length > 0) {
    await db.update(blocks).set(updateData).where(eq(blocks.id, id));
  }
  if (tagIds) {
    await db.delete(tagAssignments).where(eq(tagAssignments.blockId, id));
    if (tagIds.length > 0) {
      await db
        .insert(tagAssignments)
        .values(tagIds.map((tagId) => ({ blockId: id, tagId })));
    }
  }
  const [updated] = await db.select().from(blocks).where(eq(blocks.id, id));
  return updated;
}
