import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ children, onPress, className = '', ...props }: CardProps) {
  const cardClasses = `rounded-2xl p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 ${className}`;

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={`${cardClasses} active:opacity-85`} {...props}>
        {children}
      </Pressable>
    );
  }

  return (
    <View className={cardClasses} {...props}>
      {children}
    </View>
  );
}
