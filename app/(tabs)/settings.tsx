import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppContext } from "@/contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ThemeSwitcher = ({
  themePreference,
  setThemePreference,
  isDarkMode,
}: {
  themePreference: "system" | "light" | "dark";
  setThemePreference: (theme: "system" | "light" | "dark") => void;
  isDarkMode: boolean;
}) => {
  const themes = ["system", "light", "dark"];
  const themeIcons = {
    system: "contrast",
    light: "sunny",
    dark: "moon",
  };

  const nextTheme = () => {
    const currentIndex = themes.indexOf(themePreference);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setThemePreference(newTheme as "system" | "light" | "dark");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity
      onPress={nextTheme}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
      accessibilityLabel={`Switch to ${themes[(themes.indexOf(themePreference) + 1) % themes.length]} theme`}
    >
      <Ionicons
        name={themeIcons[themePreference] as "contrast" | "sunny" | "moon"}
        size={24}
        color={isDarkMode ? "#60a5fa" : "#f59e0b"}
      />
    </TouchableOpacity>
  );
};

export default function Settings() {
  const { isDarkMode, themePreference, setThemePreference } =
    useContext(AppContext);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 p-4">
        <Animated.View entering={FadeIn.duration(600)} className="items-center">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Settings
          </Text>

          <Animated.View
            entering={FadeInDown.duration(600).delay(200)}
            className="w-full max-w-sm"
          >
            <Card className="p-6 mb-4">
              <Text className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Appearance
              </Text>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-base text-gray-800 dark:text-white">
                    Theme:{" "}
                    {themePreference.charAt(0).toUpperCase() +
                      themePreference.slice(1)}
                  </Text>
                </View>
                <ThemeSwitcher
                  themePreference={themePreference}
                  setThemePreference={setThemePreference}
                  isDarkMode={isDarkMode}
                />
              </View>
            </Card>

            <Card className="p-6 mb-4">
              <Text className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                About SoundID
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 mb-3">
                SoundID helps you identify songs from audio files. Simply upload
                an audio file and we'll tell you what song it is.
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 mb-6">
                Version 1.0.0
              </Text>

              <View className="flex-row gap-3">
                <Button
                  title="Visit Website"
                  variant="outline"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Linking.openURL("https://example.com");
                  }}
                />
                <Button
                  title="Developer Info"
                  variant="primary"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push("/developer-info");
                  }}
                />
              </View>
            </Card>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
