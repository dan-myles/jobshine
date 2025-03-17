import { DimensionValue, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type GoogleSignInButtonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
};

export const GoogleSignInButton = (props: GoogleSignInButtonProps) => {
  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  return (
    <TouchableOpacity
      className="rounded-[5] bg-white border border-[#DADCE0] overflow-hidden"
      style={{ width: props.width, height: props.height }}
      onPress={handleGoogleSignIn}
    >
      <View className="flex-row items-center justify-center h-full">
        <Ionicons name="logo-google" size={18} color="#4285F4" />
        <Text className="ml-2 text-lg font-medium text-[#757575] whitespace-nowrap">
          Sign in with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

