import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'flex-row items-center justify-center rounded-2xl active:opacity-80';

  const sizeClasses = {
    sm: 'py-2 px-4',
    md: 'py-3.5 px-6',
    lg: 'py-4 px-8',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-500',
    secondary: 'bg-zinc-100 dark:bg-zinc-800',
    outline: 'border border-zinc-200 dark:border-zinc-700 bg-transparent',
    danger: 'bg-danger',
  }[variant];

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-zinc-900 dark:text-zinc-100 font-medium',
    outline: 'text-zinc-800 dark:text-zinc-200 font-medium',
    danger: 'text-white font-semibold',
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' || variant === 'outline' ? '#7C6FF7' : '#FFFFFF'} />
      ) : (
        <Text className={`text-base ${textClasses}`}>{label}</Text>
      )}
    </Pressable>
  );
}