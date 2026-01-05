import { db } from "@/server/db";
import { folders } from "@/server/db/schema/folder";
import { and, eq } from "drizzle-orm";

export const FolderService = {
  getFolders,
};

interface GetFoldersParams {
  workspaceId: string;
  userId: string;
}
async function getFolders({ workspaceId, userId }: GetFoldersParams) {
  const foldersData = await db.query.folders.findMany({
    where: and(
      eq(folders.workspaceId, workspaceId),
      eq(folders.createdBy, userId)
    ),
  });
  return foldersData;
}
