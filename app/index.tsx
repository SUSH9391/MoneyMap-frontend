import '../src/global.css'; // Ensures Tailwind styles are loaded
import { ScreenWrapper } from '../src/components/ui/ScreenWrapper';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { Badge } from '../src/components/ui/Badge';
import { InputField } from '../src/components/ui/InputField';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScreenWrapper scrollable>
      <View className="py-6 gap-y-4">
        <Badge label="Phase 1 Ready" variant="success" />
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          LedgerNest Design System
        </Text>

        <Card>
          <Text className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
            Account Balance
          </Text>
          <Text className="text-3xl font-bold text-brand-500">$12,450.00</Text>
        </Card>

        <InputField label="Email Address" placeholder="alex@ledgernest.com" />
        <Button label="Continue" onPress={() => console.log('Tapped!')} />
      </View>
    </ScreenWrapper>
  );
}