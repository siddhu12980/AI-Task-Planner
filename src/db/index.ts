import "dotenv/config";
import * as schema from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in .env file");
}

const db = drizzle(process.env.DATABASE_URL,{
  schema: schema,
});



export default db;
