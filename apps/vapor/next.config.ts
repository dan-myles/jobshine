import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/checkout",
        destination: `https://${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      },
      {
        source: "/portal",
        destination: `https://${process.env.NEXT_PUBLIC_BASE_URL}/portal`,
      },
      {
        source: "/polar/webhooks",
        destination: `https://${process.env.NEXT_PUBLIC_BASE_URL}/polar/webhooks`,
      }
    ]
  }
}

export default nextConfig
