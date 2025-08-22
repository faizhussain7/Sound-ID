import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface SkeletonProps {
width?: number | `${number}%`;
    height?: number | `${number}%`;
    borderRadius?: number;
    className?: string;
}  

export function Skeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  className = ''
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, { duration: 1000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[{ width , height, borderRadius }, animatedStyle]} 
      className={`bg-gray-200 dark:bg-gray-700 ${className}`} 
    />
  );
}

export function SongSkeleton() {
  return (
    <View className="w-full items-center space-y-4">
      <Skeleton width={160} height={160} borderRadius={8} />
      <Skeleton width={200} height={24} />
      <Skeleton width={180} height={20} />
      <Skeleton width={160} height={20} />
      <Skeleton width={120} height={20} />
    </View>
  );
}