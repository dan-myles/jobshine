import { Text } from "react-native"
import { Redirect, Slot } from "expo-router"

import { authClient } from "~/utils/auth-client"

export default function Layout() {
  const { data, isPending } = authClient.useSession()

  if (isPending) {
    return <Text>Loading...</Text>
  }

  if (!data) {
    return <Redirect href="/sign-in" />
  }

  return <Slot />
}
