// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../src/components/ui/ScreenWrapper';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { useAuthStore } from '../../src/store/authStore';
import { useBudgets } from '../../src/hooks/useBudgets';
import { useTransactions } from '../../src/hooks/useTransactions';

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user);

  // TanStack Query Hooks from Phase 4
  const { data: budgets, isLoading: isBudgetsLoading } = useBudgets();
  const { data: transactions, isLoading: isTxLoading } = useTransactions();

  const isLoading = isBudgetsLoading || isTxLoading;

  return (
    <ScreenWrapper scrollable>
      <View className="py-6 gap-y-5">
        {/* Header Greeting */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-medium text-zinc-500">Welcome back,</Text>
            <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {user?.firstName || 'User'} 👋
            </Text>
          </View>
          <Badge label="Active" variant="success" />
        </View>

        {/* Loading Indicator */}
        {isLoading && (
          <View className="py-8 items-center justify-center">
            <ActivityIndicator size="large" color="#7C6FF7" />
            <Text className="text-xs text-zinc-400 mt-2">Syncing financial data...</Text>
          </View>
        )}

        {/* Budgets Summary Card */}
        <Card>
          <Text className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Active Budgets
          </Text>
          {budgets && budgets.length > 0 ? (
            budgets.map((b) => (
              <View key={b.id} className="py-2 flex-row justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
                <Text className="text-base font-medium text-zinc-800 dark:text-zinc-200">{b.name}</Text>
                <Text className="text-base font-bold text-brand-500">${b.amount}</Text>
              </View>
            ))
          ) : (
            <Text className="text-sm text-zinc-400 italic">No budgets found</Text>
          )}
        </Card>

        {/* Recent Transactions Card */}
        <Card>
          <Text className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Recent Transactions
          </Text>
          {transactions && transactions.length > 0 ? (
            transactions.slice(0, 5).map((t) => (
              <View key={t.id} className="py-2.5 flex-row justify-between items-center border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
                <View>
                  <Text className="text-base font-medium text-zinc-800 dark:text-zinc-200">{t.description}</Text>
                  <Text className="text-xs text-zinc-400">{t.category?.name || 'General'}</Text>
                </View>
                <Text className={`text-base font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount)}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-sm text-zinc-400 italic">No recent transactions</Text>
          )}
        </Card>
      </View>
    </ScreenWrapper>
  );
}