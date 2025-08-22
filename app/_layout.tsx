import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext, AppProvider } from "../contexts/AppContext";

function RootStack() {
  const { isDarkMode } = useContext(AppContext);

  return (
    <SafeAreaProvider>
      <Animated.View
        className="flex-1 bg-gray-50 dark:bg-gray-900"
        entering={FadeIn.duration(300)}
      >
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? "#111827" : "#ffffff",
            },
            headerTintColor: isDarkMode ? "#f9fafb" : "#111827",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="result"
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="developer-info"
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </Animated.View>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
}
