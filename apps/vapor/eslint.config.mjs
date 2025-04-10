import baseConfig from "@jobshine/eslint-config/base"
import nextjsConfig from "@jobshine/eslint-config/nextjs"
import reactConfig from "@jobshine/eslint-config/react"

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
]
