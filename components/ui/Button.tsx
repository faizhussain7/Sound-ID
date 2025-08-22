import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  fullWidth = false,
  disabled = false 
}: ButtonProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, { damping: 15, stiffness: 150 }) }],
  }));

  const handlePress = () => {
    scale.value = 0.95;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => {
      scale.value = 1;
      onPress();
    }, 100);
  };

  const getButtonClass = () => {
    const baseClass = "py-3 px-6 rounded-full flex items-center justify-center ";
    const widthClass = fullWidth ? "w-full" : "";
    
    switch (variant) {
      case 'primary':
        return `${baseClass} ${widthClass} bg-blue-500 dark:bg-blue-600 ${disabled ? 'opacity-50' : ''}`;
      case 'secondary':
        return `${baseClass} ${widthClass} bg-gray-200 dark:bg-gray-700 ${disabled ? 'opacity-50' : ''}`;
      case 'outline':
        return `${baseClass} ${widthClass} border border-gray-300 dark:border-gray-600 ${disabled ? 'opacity-50' : ''}`;
      default:
        return baseClass;
    }
  };

  const getTextClass = () => {
    switch (variant) {
      case 'primary':
        return "text-white font-medium text-base";
      case 'secondary':
        return "text-gray-800 dark:text-white font-medium text-base";
      case 'outline':
        return "text-gray-800 dark:text-white font-medium text-base";
      default:
        return "text-gray-800 dark:text-white";
    }
  };

  return (
    <Animated.View style={animatedStyle} className={fullWidth ? "w-full" : ""} >
      <Pressable 
        className={getButtonClass()} 
        onPress={handlePress}
        disabled={disabled}
      >
        <Text className={getTextClass()}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}