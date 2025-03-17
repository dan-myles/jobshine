import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { Resource } from "sst"

import * as schema from "./schema"

const pool: Pool = process.env.BETTER_AUTH_GEN
  ? new Pool({
      host: "",
      port: 0,
      user: "",
      password: "",
      database: "",
    })
  : new Pool({
      host: Resource.AcmeDB.host,
      port: Resource.AcmeDB.port,
      user: Resource.AcmeDB.username,
      password: Resource.AcmeDB.password,
      database: Resource.AcmeDB.database,
    })

export const db = drizzle(pool, {
  schema,
  casing: "snake_case",
})
