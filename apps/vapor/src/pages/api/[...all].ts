import type { NextApiRequest, NextApiResponse } from "next"
import httpProxyMiddleware from "next-http-proxy-middleware"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404)
  }

  const cookies = req.headers.cookie ?? ""

  void httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_BASE_URL,
    pathRewrite: [
      {
        patternStr: "^/api/",
        replaceStr: "/api/",
      },
    ],
    headers: {
      "dev-cookie": cookies,
    },
  })
}
