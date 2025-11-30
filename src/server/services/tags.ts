import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { tags } from "../db/schema/tags";
import { TRPCError } from "@trpc/server";

export const TagsService = {
  getTags,
  createTag,
};

async function getTags({ workspaceId }: { workspaceId: string }) {
  return await db.select().from(tags).where(eq(tags.workspaceId, workspaceId));
}

async function createTag({
  workspaceId,
  name,
}: {
  workspaceId: string;
  name: string;
}) {
  // check if the tag already exists
  const [existingTag] = await db
    .select()
    .from(tags)
    .where(and(eq(tags.workspaceId, workspaceId), eq(tags.name, name)));

  if (existingTag) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Tag already exists",
    });
  }

  const [newTag] = await db
    .insert(tags)
    .values({
      workspaceId,
      name,
    })
    .returning();
  return newTag;
}
