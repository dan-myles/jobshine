import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { useQuery } from "@tanstack/react-query"

import { api } from "~/trpc/api"
import { authClient } from "~/utils/auth-client"

export default function Page() {
  const { data } = useQuery(api.post.all.queryOptions())

  const signOut = async () => {
    const res = await authClient.signOut()
    console.log("res", res)
  }

  return (
    <SafeAreaView>
      <View className="">
        <Link href="/sign-in">TO SIGN IN</Link>
        <Pressable className="h-10 w-20 rounded-md bg-blue-200" onPress={signOut}>
          <Text>SIGN OUT</Text>
        </Pressable>

        {data?.map((post) => (
          <Pressable key={post.id} onPress={() => console.log(post)}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="ml-2 flex-row items-center">
                  <View className="text-sm font-medium text-gray-900">
                    <Text>{post.title}</Text>
                    <Text className="text-xs text-gray-500">{post.content}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}
