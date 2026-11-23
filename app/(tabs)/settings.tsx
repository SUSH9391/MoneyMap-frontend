import { View, Text } from 'react-native';
import { ScreenWrapper } from '../../src/components/ui/ScreenWrapper';

export default function SettingsScreen() {
  return (
    <ScreenWrapper>
      <View className="py-6">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Settings</Text>
      </View>
    </ScreenWrapper>
  );
}