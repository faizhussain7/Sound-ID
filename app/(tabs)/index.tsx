import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppContext } from "@/contexts/AppContext";
import { identifySongWithGemini } from "@/services/geminiApi";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCallback, useContext, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const { setSongData, setLoading, isDarkMode, loading } =
    useContext(AppContext);
  const [error, setError] = useState("");
  const isProcessingRef = useRef(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateY: translateY.value },
    ],
  }));

  const startAnimation = () => {
    scale.value = withRepeat(withTiming(1.1, { duration: 2000 }), -1, true);
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false
    );
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  };

  const stopAnimation = () => {
    scale.value = withSpring(1);
    rotation.value = withTiming(0);
    translateY.value = withSpring(0);
  };

  const handleUpload = useCallback(async () => {
    if (isProcessingRef.current || loading) return;
    isProcessingRef.current = true;
    try {
      setError("");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "audio/mpeg",
          "audio/mp4",
          "audio/wav",
          "audio/x-wav",
          "audio/*",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        if (!file.mimeType?.startsWith("audio/")) {
          setError("Please select an audio file");
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          return;
        }

        if (typeof file.size === "number" && file.size > 15 * 1024 * 1024) {
          setError("File too large. Please select an audio file under 15MB.");
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          return;
        }

        setLoading(true);
        startAnimation();
        try {
          const songData = await identifySongWithGemini({
            fileUri: file.uri,
            mimeType: file.mimeType ?? "audio/mpeg",
          });
          setSongData(songData);
          router.push("/result");
        } catch (err) {
          setError("Failed to identify song. Please try again.");
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
          setLoading(false);
          stopAnimation();
        }
      }
    } catch (err) {
      setError("An error occurred while selecting the file");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [loading, setLoading, setSongData, router]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 p-4">
        <Animated.View entering={FadeIn.duration(600)} className="items-center">
          <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
            SoundID
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Identify any song in seconds
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(200)}
          className="flex-1 justify-center items-center"
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleUpload}
            disabled={loading}
          >
            <Card className="w-full max-w-sm items-center p-6 mb-8">
              <Animated.View
                style={animatedStyle}
                className="w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-6"
              >
                <Ionicons
                  name="musical-notes"
                  size={64}
                  color={isDarkMode ? "#60a5fa" : "#2563eb"}
                />
              </Animated.View>

              <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                Upload Audio
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Select an audio file to identify the song
              </Text>

              <Button
                title={loading ? "Processing…" : "Select Audio File"}
                onPress={handleUpload}
                variant="primary"
                fullWidth
                disabled={loading}
              />

              <View className="mt-4">
                <Text className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Supports MP3, WAV, M4A formats
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

          <Card className="w-full max-w-sm p-4 mb-4">
            <View className="flex-row items-center">
              <Ionicons
                name="information-circle"
                size={24}
                color={isDarkMode ? "#60a5fa" : "#2563eb"}
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-700 dark:text-gray-300 flex-1">
                Results from audio may not always be accurate.
              </Text>
            </View>
          </Card>

          {error && (
            <Animated.View
              entering={FadeIn}
              className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg w-full max-w-sm"
            >
              <Text className="text-red-600 dark:text-red-300 text-center">
                {error}
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
