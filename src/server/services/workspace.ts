import { db } from "@/server/db";
import { user, workspaceMembers } from "@/server/db/schema";
import { workspaces } from "@/server/db/schema/workspaces";
import { eq } from "drizzle-orm";

export const WorkspaceService = {
  getUserWorkspaces,
  createWorkspace,
};

async function getUserWorkspaces(userId: string) {
  const workspacesData = await db
    .select({
      workspace: workspaces,
    })
    .from(workspaceMembers)
    .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
    .where(eq(workspaceMembers.userId, userId));
  return workspacesData.map((workspace) => workspace.workspace);
}

interface CreateWorkspaceParams {
  name: string;
  userId: string;
  slug?: string;
}
async function createWorkspace({ name, userId, slug }: CreateWorkspaceParams) {
  const workspaceSlug = slug ?? name.toLowerCase().replace(/ /g, "-");
  await db.transaction(async (tx) => {
    const [newWorkspace] = await tx
      .insert(workspaces)
      .values({ name, slug: workspaceSlug, createdBy: userId })
      .returning({ id: workspaces.id });

    if (!newWorkspace) {
      throw new Error("Failed to create workspace");
    }

    await tx.insert(workspaceMembers).values({
      workspaceId: newWorkspace?.id,
      userId: userId,
      role: "owner",
    });

    await tx.update(user).set({
      workspaceId: newWorkspace?.id,
    });
    return newWorkspace;
  });
}
