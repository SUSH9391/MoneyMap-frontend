import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../src/components/ui/ScreenWrapper';
import { Button } from '../src/components/ui/Button';

export default function ScanModal() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View className="py-8 items-center justify-center flex-1">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Receipt Scanner
        </Text>
        <Button label="Close Scanner" variant="secondary" onPress={() => router.back()} />
      </View>
    </ScreenWrapper>
  );
}