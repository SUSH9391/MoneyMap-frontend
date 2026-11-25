import React from 'react';
import { Text, View } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
}

export function Badge({ label, variant = 'brand', className = '' }: BadgeProps) {
  const variantStyles = {
    brand: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 border-brand-200 dark:border-brand-800',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200',
    warning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200',
    danger: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200',
    neutral: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  }[variant];

  return (
    <View
      className={`self-start px-2.5 py-1 rounded-full border ${variantStyles
        .split(' ')
        .slice(0, 2)
        .join(' ')} ${className}`}
    >
      <Text className={`text-xs font-medium ${variantStyles.split(' ').slice(2).join(' ')}`}>
        {label}
      </Text>
    </View>
  );
}
