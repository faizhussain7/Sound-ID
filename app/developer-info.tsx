import { AppContext } from "@/contexts/AppContext";
import { lazy, Suspense, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const DeveloperInfo = lazy(() => import("@/components/ui/DevInfo"));

export default function DevInfoScreen() {
  const { isDarkMode } = useContext(AppContext);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Suspense
        fallback={
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator
              color={isDarkMode ? "#ffffff" : "#000000"}
              size="large"
            />
          </View>
        }
      >
        <DeveloperInfo dom={{ matchContents: false }} />
      </Suspense>
    </SafeAreaView>
  );
}
