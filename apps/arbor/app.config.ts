import { defineConfig } from "@tanstack/react-start/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  tsr: {
    appDirectory: "src",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    envPrefix: "PUBLIC_",
  },
  server: {
    routeRules: {
      "/api/v1/**": {
        proxy: {
          to: `${import.meta.env.PUBLIC_BASE_URL}/api/v1/**`,
        },
      },
    },
  },
})
