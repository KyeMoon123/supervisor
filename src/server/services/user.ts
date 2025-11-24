import { db } from "@/server/db";
import { user, workspaceMembers } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const UserService = {
  updateUserWorkspace,
};

async function updateUserWorkspace(userId: string, workspaceId: string) {
  // Validat ethe user is a member of the workspace
  const isMember = await db
    .select({ id: workspaceMembers.id })
    .from(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.userId, userId),
        eq(workspaceMembers.workspaceId, workspaceId)
      )
    );

  if (!isMember) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User is not a member of the workspace",
    });
  }

  const [updatedUser] = await db
    .update(user)
    .set({
      workspaceId: workspaceId,
    })
    .where(eq(user.id, userId))
    .returning({ name: user.name, workspaceId: user.workspaceId });

  if (!updatedUser) {
    throw new Error("Failed to update user workspace");
  }

  return { workspaceId: updatedUser.workspaceId, name: updatedUser.name };
}
