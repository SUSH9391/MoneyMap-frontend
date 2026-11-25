import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}

export function ScreenWrapper({
  children,
  scrollable = false,
  className = '',
}: ScreenWrapperProps) {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
      <StatusBar barStyle="default" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className={`flex-1 px-5 ${className}`}>{content}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
