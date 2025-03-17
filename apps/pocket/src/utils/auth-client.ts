import * as SecureStore from "expo-secure-store"
import { expoClient } from "@better-auth/expo/client"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: `https://${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth`,
  plugins: [
    expoClient({
      scheme: "projectacme",
      storagePrefix: "projectacme",
      storage: SecureStore,
    }),
  ],
})
