import { Song } from "@/types/Song";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  AppState,
  AppStateStatus,
  useColorScheme as useRNColorScheme,
} from "react-native";

type ThemeType = "light" | "dark" | "system";

interface AppContextType {
  songData: Song | null;
  setSongData: (data: Song | null) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isDarkMode: boolean;
  themePreference: ThemeType;
  toggleTheme: () => void;
  setThemePreference: (theme: ThemeType) => void;
}

export const AppContext = createContext<AppContextType>({
  songData: null,
  setSongData: () => {},
  loading: false,
  setLoading: () => {},
  isDarkMode: false,
  themePreference: "system",
  toggleTheme: () => {},
  setThemePreference: () => {},
});

const THEME_STORAGE_KEY = "@theme_preference";

export function AppProvider({ children }: PropsWithChildren) {
  const rnSystemScheme = useRNColorScheme();
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  const [songData, setSongData] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [themePreference, setThemePreferenceState] =
    useState<ThemeType>("system");

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemePreferenceState(stored);
      }
    })();
  }, []);

  useEffect(() => {
    const appliedTheme =
      themePreference === "system"
        ? rnSystemScheme || "light"
        : themePreference;
    setColorScheme(appliedTheme);
  }, [themePreference, rnSystemScheme, setColorScheme]);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active" && themePreference === "system") {
        const appliedTheme = rnSystemScheme || "light";
        setColorScheme(appliedTheme);
      }
    };
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [themePreference, rnSystemScheme, setColorScheme]);

  const updateThemePreference = async (newTheme: ThemeType) => {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setThemePreferenceState(newTheme);
  };

  const toggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentIsDark = colorScheme === "dark";
    const newTheme = currentIsDark ? "light" : "dark";
    updateThemePreference(newTheme);
  };

  const isDarkMode = colorScheme === "dark";

  return (
    <AppContext.Provider
      value={{
        songData,
        setSongData,
        loading,
        setLoading,
        isDarkMode,
        themePreference,
        toggleTheme,
        setThemePreference: updateThemePreference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
