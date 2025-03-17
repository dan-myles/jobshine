import { defineConfig } from "drizzle-kit"
import { Resource } from "sst"

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/schema/**/*.schema.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.AcmeDB.host,
    port: Resource.AcmeDB.port,
    user: Resource.AcmeDB.username,
    password: Resource.AcmeDB.password,
    database: Resource.AcmeDB.database,
  },
})
