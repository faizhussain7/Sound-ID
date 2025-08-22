import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <View className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md ${className}`}>
      {children}
    </View>
  );
}