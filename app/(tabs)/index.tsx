import { View, Text } from 'react-native';
import { ScreenWrapper } from '../../src/components/ui/ScreenWrapper';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <View className="py-6">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Home Dashboard</Text>
      </View>
    </ScreenWrapper>
  );
}