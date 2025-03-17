import React from "react"
import { DimensionValue, Text, TouchableOpacity, View } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import { Ionicons } from "@expo/vector-icons"

type AppleSignInButtonProps = {
  width?: DimensionValue
  height?: DimensionValue
}

export const AppleSignInButton = (props: AppleSignInButtonProps) => {
  const handleAppleSignIn = async () => {
    const credentials = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    console.log("credentials", credentials)
  }

  return (
    <TouchableOpacity
      className="rounded-[5] bg-black"
      style={{ width: props.width, height: props.height }}
      onPress={handleAppleSignIn}
    >
      <View className="flex h-full flex-row items-center justify-center">
        <Ionicons name="logo-apple" size={18} color="white" />
        <Text className="ml-2 text-lg font-medium text-white">Sign in with Apple</Text>
      </View>
    </TouchableOpacity>
  )
}
