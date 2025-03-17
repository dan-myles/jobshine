import { Platform, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { AppleSignInButton } from "~/components/auth/apple-sign-in-button"
import { GoogleSignInButton } from "~/components/auth/google-sign-in-button"
import { PhoneSignInButton } from "~/components/auth/phone-sign-in-button"
import { Icons } from "~/components/icons"
import { cn } from "~/utils/cn"

export default function Page() {
  const isIOS = Platform.OS === "ios"
  const isAndroid = Platform.OS === "android"

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-1 items-center justify-between px-6 py-8">
        <View className="items-center p-12">
          <Icons.logo size={180} color="white" />
          <Text className="mt-4 text-2xl font-semibold text-white">Acme</Text>
        </View>

        <View className="w-full space-y-4">
          <View className="flex-row justify-between">
            {isIOS && (
              <View className="mr-2 flex-1">
                <AppleSignInButton width="100%" height={48} />
              </View>
            )}
            {isAndroid  && (
              <View
                className={cn(
                  "flex-1 flex-row items-center",
                  isIOS ? "justify-between" : "justify-center",
                )}
              >
                <GoogleSignInButton width="100%" height={48} />
              </View>
            )}
          </View>

          <View className="mb-4 mt-4 flex-row items-center">
            <View className="h-px flex-1 bg-gray-600" />
            <Text className="mx-4 text-gray-400">or</Text>
            <View className="h-px flex-1 bg-gray-600" />
          </View>

          <View className="flex-row items-center">
            <PhoneSignInButton width="100%" height={48} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
