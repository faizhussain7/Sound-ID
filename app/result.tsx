import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SongSkeleton } from "../components/ui/Skeleton";
import { AppContext } from "../contexts/AppContext";

export default function Result() {
  const router = useRouter();
  const { songData, loading, isDarkMode } = useContext(AppContext);
  const rotation = useSharedValue(0);
  const [hasError, setHasError] = useState(false);

  const discStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    if (songData && !loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 20000 }),
        -1,
        false
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [songData, loading]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <Animated.View
        entering={FadeIn.duration(600)}
        className="relative flex-row items-center justify-center mt-6 mb-4"
      >
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.dismiss();
          }}
          className="absolute left-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700"
          accessibilityLabel="Close results"
        >
          <Ionicons
            name="close"
            size={24}
            color={isDarkMode ? "#ffffff" : "#1f2937"}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800 dark:text-white">
          🎵 Audio Results
        </Text>
      </Animated.View>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <View className="mt-6 mb-4 items-center">
          <Card className="w-full max-w-sm shadow-xl shadow-gray-300 dark:shadow-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {loading ? (
              <SongSkeleton />
            ) : songData ? (
              <Animated.View
                entering={FadeInDown.duration(800)}
                className="items-center"
              >
                <View className="shadow-xl rounded-full">
                  <Animated.View
                    style={discStyle}
                    className="rounded-full overflow-hidden"
                  >
                    {songData.albumArt && !hasError ? (
                      <Image
                        source={{
                          uri: songData.albumArt,
                        }}
                        className="w-48 h-48"
                        resizeMode="cover"
                        onError={() => setHasError(true)}
                      />
                    ) : (
                      <View className="w-36 h-36 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center">
                        <Ionicons
                          name="image"
                          size={64}
                          color={isDarkMode ? "#60a5fa" : "#2563eb"}
                        />
                      </View>
                    )}
                  </Animated.View>
                </View>

                <Text className="text-2xl font-bold text-gray-800 dark:text-white mt-5 text-center">
                  {songData.name}
                </Text>

                <View className="flex-row space-x-2 mt-2">
                  {songData.is_cover && (
                    <View className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Text className="text-xs text-purple-800 dark:text-purple-200">
                        Cover
                      </Text>
                    </View>
                  )}
                  {songData.is_remix && (
                    <View className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Text className="text-xs text-blue-800 dark:text-blue-200">
                        Remix
                      </Text>
                    </View>
                  )}
                </View>

                <View className="w-full mt-6 space-y-3">
                  {[
                    { icon: "person", label: "Artist", value: songData.artist },
                    {
                      icon: "people",
                      label: "Featuring",
                      value: songData.featuring_artists?.join(", "),
                    },
                    { icon: "disc", label: "Album", value: songData.album },
                    {
                      icon: "calendar",
                      label: "Released",
                      value: songData.release_date,
                    },
                    {
                      icon: "musical-notes",
                      label: "Genre",
                      value: songData.genre,
                    },
                    {
                      icon: "time",
                      label: "Duration",
                      value: songData.duration,
                    },
                    {
                      icon: "globe",
                      label: "Language",
                      value: songData.language,
                    },
                  ]
                    .filter((i) => i.value)
                    .map(({ icon, label, value }) => (
                      <View key={label} className="flex-row items-center">
                        <Ionicons
                          name={icon as any}
                          size={20}
                          color="#6b7280"
                        />
                        <Text className="text-base text-gray-700 dark:text-gray-300 ml-3">
                          {label}: {value}
                        </Text>
                      </View>
                    ))}
                </View>

                {songData.description && (
                  <View className="w-full mt-5">
                    <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                      About
                    </Text>
                    <Text className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {songData.description}
                    </Text>
                  </View>
                )}

                {songData.suggested_tracks?.length ? (
                  <View className="w-full mt-5">
                    <Text className="text-lg font-semibold text-gray-800 dark:text-white">
                      You Might Also Like
                    </Text>
                    <View className="mt-2 space-y-2">
                      {songData.suggested_tracks.map((t, i) => {
                        const youtubeSearchUrl = t.youtube_link
                          ? t.youtube_link
                          : `https://www.youtube.com/results?search_query=${encodeURIComponent(
                              `${t.name} ${t.artist} official music video`
                            )}`;
                        return (
                          <TouchableOpacity
                            key={i}
                            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex-row justify-between items-center"
                            onPress={() => {
                              Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                              );
                              Linking.openURL(youtubeSearchUrl);
                            }}
                          >
                            <View className="flex-1">
                              <Text className="text-gray-800 dark:text-white font-medium">
                                {t.name}
                              </Text>
                              <Text className="text-xs text-gray-600 dark:text-gray-400">
                                {t.artist}
                              </Text>
                            </View>
                            <View className="flex-row items-center">
                              {t.youtube_link ? (
                                <Ionicons
                                  name="logo-youtube"
                                  size={16}
                                  color="#dc2626"
                                  style={{ marginRight: 8 }}
                                />
                              ) : (
                                <Ionicons
                                  name="search"
                                  size={16}
                                  color="#6b7280"
                                  style={{ marginRight: 8 }}
                                />
                              )}
                              <Ionicons
                                name="chevron-forward"
                                size={16}
                                color="#6b7280"
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ) : null}

                {songData.link &&
                  Object.values(songData.link).some(Boolean) && (
                    <View className="w-full mt-6">
                      <Text className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                        Listen On
                      </Text>
                      <View className="flex-row justify-center items-center mt-3 gap-4">
                        {songData.link.youtube && (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(songData.link!.youtube!)
                            }
                            className="p-3 bg-red-500 rounded-full shadow-md"
                          >
                            <Ionicons
                              name="logo-youtube"
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                        {songData.link.spotify && (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(songData.link!.spotify!)
                            }
                            className="p-3 bg-green-500 rounded-full shadow-md"
                          >
                            <Ionicons
                              name="musical-note"
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                        {songData.link.apple_music && (
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(songData.link!.apple_music!)
                            }
                            className="p-3 bg-pink-500 rounded-full shadow-md"
                          >
                            <Ionicons
                              name="musical-notes"
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}

                <View className="w-full mt-8">
                  <Button
                    title="Identify Another Song"
                    variant="primary"
                    fullWidth
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.dismiss();
                    }}
                  />
                </View>
              </Animated.View>
            ) : (
              <View className="items-center py-10">
                <Ionicons name="alert-circle" size={48} color="#f59e0b" />
                <Text className="text-lg font-semibold text-gray-800 dark:text-white mt-4">
                  No song data available
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-6">
                  Upload an audio file from the Home tab
                </Text>
                <Button
                  title="Go to Home"
                  variant="primary"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push("/");
                  }}
                />
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
