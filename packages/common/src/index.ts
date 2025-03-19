export function getBaseUrl() {
  if (process.env.NODE_ENV === "development")
    return `http://localhost:${process.env.PORT ?? 3000}`
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL

return `http://localhost:${process.env.PORT ?? 3000}`
}
