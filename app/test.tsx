import React from 'react';
import { View, Text } from 'react-native';
import { ScreenWrapper } from '../src/components/ui/ScreenWrapper';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { Badge } from '../src/components/ui/Badge';
import { useAuthStore } from '../src/store/authStore';

export default function AuthTestScreen() {
  const { user, isAuthenticated, isLoading, signIn, signOut } = useAuthStore();

  const handleSimulateLogin = async () => {
    await signIn(
      'mock_access_token_jwt_123',
      'mock_refresh_token_abc_456',
      {
        id: 'usr_01',
        email: 'alex@ledgernest.com',
        firstName: 'Alex',
        lastName: 'Morgan',
      }
    );
  };

  const handleSimulateLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper>
      <View className="py-6 gap-y-4">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Auth State Machine Test
        </Text>

        <Card>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-medium text-zinc-500">Status</Text>
            <Badge
              label={isAuthenticated ? 'Logged In' : 'Logged Out'}
              variant={isAuthenticated ? 'success' : 'neutral'}
            />
          </View>

          <Text className="text-sm text-zinc-600 dark:text-zinc-300">
            {isLoading ? 'Hydrating from SecureStore...' : 'Store ready'}
          </Text>

          {user && (
            <View className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <Text className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                User: {user.firstName} {user.lastName}
              </Text>
              <Text className="text-xs text-zinc-500">{user.email}</Text>
            </View>
          )}
        </Card>

        {/* Action Buttons */}
        {!isAuthenticated ? (
          <Button
            label="Simulate Login"
            variant="primary"
            onPress={handleSimulateLogin}
          />
        ) : (
          <Button
            label="Simulate Logout"
            variant="danger"
            onPress={handleSimulateLogout}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}