import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { workspaces } from "@/server/db/schema/workspaces";
import { user as userSchema } from "@/server/db/schema/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      workspaceId: {
        type: "string",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.transaction(async (tx) => {
            const [workspace] = await tx
              .insert(workspaces)
              .values({
                name: "Personal",
                slug: "personal-" + user.id,
                createdBy: user.id,
              })
              .returning();

            if (workspace) {
              await tx.update(userSchema).set({
                workspaceId: workspace.id,
              });
            }
          });
        },
      },
    },
  },
});
