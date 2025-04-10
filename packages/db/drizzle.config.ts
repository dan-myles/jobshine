import { defineConfig } from "drizzle-kit"
import { Resource } from "sst"

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/schema/**/*.schema.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.JobShineDB.host,
    port: Resource.JobShineDB.port,
    user: Resource.JobShineDB.username,
    password: Resource.JobShineDB.password,
    database: Resource.JobShineDB.database,
  },
})
