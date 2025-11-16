import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_DIRECT_CONN_STRING,
  },
} satisfies Config;
