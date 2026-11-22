import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Pressable } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export function InputField({
  label,
  error,
  isPassword = false,
  className = '',
  ...props
}: InputFieldProps) {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {label}
        </Text>
      )}
      <View className="relative flex-row items-center">
        <TextInput
          secureTextEntry={hidePassword}
          placeholderTextColor="#A1A1AA"
          className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border ${
            error ? 'border-danger' : 'border-zinc-200 dark:border-zinc-700'
          } text-zinc-900 dark:text-zinc-100 text-base focus:border-brand-500 ${className}`}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setHidePassword(!hidePassword)}
            className="absolute right-4"
          >
            <Text className="text-xs text-brand-500 font-semibold">
              {hidePassword ? 'SHOW' : 'HIDE'}
            </Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-xs text-danger mt-1.5">{error}</Text>}
    </View>
  );
}