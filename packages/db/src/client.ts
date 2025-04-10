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
      host: Resource.JobShineDB.host,
      port: Resource.JobShineDB.port,
      user: Resource.JobShineDB.username,
      password: Resource.JobShineDB.password,
      database: Resource.JobShineDB.database,
    })

export const db = drizzle(pool, {
  schema,
  casing: "snake_case",
})

export type DB = typeof db

