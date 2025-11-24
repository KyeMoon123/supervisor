import { db } from "@/server/db";
import { folders } from "@/server/db/schema/folder";
import { eq } from "drizzle-orm";

export const FolderRepository = {
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
};

async function createFolder(folder: typeof folders.$inferInsert) {
  const newProject = await db.insert(folders).values(folder).returning();
  return newProject;
}

async function getFolderById(id: string) {
  const folder = await db.query.folders.findFirst({
    where: eq(folders.id, id),
  });
  return folder;
}

async function updateFolder(
  id: string,
  folder: Partial<typeof folders.$inferSelect>
) {
  const updatedFolder = await db
    .update(folders)
    .set(folder)
    .where(eq(folders.id, id))
    .returning();
  return updatedFolder;
}

async function deleteFolder(id: string) {
  const deletedFolder = await db
    .delete(folders)
    .where(eq(folders.id, id))
    .returning();
  return deletedFolder;
}
