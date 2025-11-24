import { db } from "@/server/db"; // your drizzle instance
import { WorkspaceService } from "@/server/services/workspace";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

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
          const slug = "personal-" + user.id.slice(0, 3);
          await WorkspaceService.createWorkspace({
            name: "Personal",
            userId: user.id,
            slug: slug,
          });
        },
      },
    },
  },
});
