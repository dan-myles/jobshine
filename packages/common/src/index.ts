export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000"
  if (process.env.PUBLIC_BASE_URL) return process.env.BASE_URL

  throw new Error(
    "No base URL found. Please set either BASE_URL or NEXT_PUBLIC_BASE_URL in your environment variables.",
  )
}
