import { SafeAreaProvider } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "~/trpc/api"

import "../globals.css"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
