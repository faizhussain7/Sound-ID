import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function TabsLayout() {
  const { isDarkMode } = useContext(AppContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "#60a5fa" : "#2563eb",
        tabBarInactiveTintColor: isDarkMode ? "#9ca3af" : "#6b7280",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#111827" : "#ffffff",
          borderTopColor: isDarkMode ? "#1f2937" : "#e5e7eb",
        },
        headerStyle: {
          backgroundColor: isDarkMode ? "#111827" : "#ffffff",
        },
        headerTintColor: isDarkMode ? "#f9fafb" : "#111827",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
