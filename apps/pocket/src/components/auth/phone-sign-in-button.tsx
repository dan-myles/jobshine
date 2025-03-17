import { DimensionValue, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type PhoneSignInButton = {
  width?: DimensionValue
  height?: DimensionValue
}

export const PhoneSignInButton = (props: PhoneSignInButton) => {
  const handlePhoneSignIn = () => {
    console.log("Sign in with phone")
  }

  return (
    <TouchableOpacity
      className="rounded-[5] bg-blue-500"
      onPress={handlePhoneSignIn}
      style={{ width: props.width, height: props.height }}
    >
      <View className="h-full flex flex-row items-center justify-center">
        <Ionicons name="phone-portrait-sharp" size={18} color="white" />
        <Text className="ml-2 text-lg font-medium text-white">Sign in with phone number</Text>
      </View>
    </TouchableOpacity>
  )
}
