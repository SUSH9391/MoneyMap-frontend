// app/(tabs)/budget.tsx
import React, { useMemo } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ScreenWrapper } from '../../src/components/ui/ScreenWrapper';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { useBudgets } from '../../src/hooks/useBudgets';

export default function BudgetScreen() {
  const { data: budgets = [], isLoading } = useBudgets();

  // 1. Calculate aggregated financial metrics
  const { totalBudget, totalSpent, remaining, overallPercentage } = useMemo(() => {
    const total = budgets.reduce((acc, b) => acc + Number(b.amount || 0), 0);
    const spent = budgets.reduce((acc, b) => acc + Number(b.progress?.spent || 0), 0);
    const rem = Math.max(total - spent, 0);
    const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
    return { totalBudget: total, totalSpent: spent, remaining: rem, overallPercentage: pct };
  }, [budgets]);

  return (
    <ScreenWrapper scrollable>
      <View className="py-6 gap-y-6">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Monthly Budgets</Text>
            <Text className="text-sm text-zinc-500">Spending limits & allocations</Text>
          </View>
        </View>

        {/* Aggregate Overview Card */}
        <Card className="bg-brand-50/60 dark:bg-brand-950/20 border-brand-200 dark:border-brand-900">
          <Text className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
            Total Remaining This Month
          </Text>
          <Text className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">
            ${remaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>

          {/* Aggregate Progress Bar */}
          <View className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden mb-2">
            <View
              className={`h-full rounded-full ${
                overallPercentage >= 100 ? 'bg-danger' : overallPercentage >= 80 ? 'bg-warning' : 'bg-brand-500'
              }`}
              style={{ width: `${overallPercentage}%` }}
            />
          </View>

          <View className="flex-row justify-between text-xs text-zinc-500">
            <Text className="text-xs text-zinc-500">${totalSpent.toFixed(0)} spent</Text>
            <Text className="text-xs text-zinc-500">${totalBudget.toFixed(0)} limit</Text>
          </View>
        </Card>

        {/* Category Budget Breakdown */}
        <View className="gap-y-3">
          <Text className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Category Breakdown ({budgets.length})
          </Text>

          {isLoading ? (
            <ActivityIndicator color="#7C6FF7" />
          ) : budgets.length === 0 ? (
            <Card className="items-center py-6">
              <Text className="text-zinc-400">No active budgets for this period.</Text>
            </Card>
          ) : (
            budgets.map((b) => {
              const spent = Number(b.progress?.spent || 0);
              const limit = Number(b.amount || 1);
              const pct = Math.min(Math.round((spent / limit) * 100), 100);
              const isOver = spent >= limit;
              const isNear = !isOver && pct >= 80;

              return (
                <Card key={b.id} className="gap-y-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-x-2">
                      <View
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: b.category?.color || '#7C6FF7' }}
                      />
                      <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {b.name}
                      </Text>
                    </View>
                    <Badge
                      label={isOver ? 'Over Limit' : isNear ? 'Near Limit' : `${pct}%`}
                      variant={isOver ? 'danger' : isNear ? 'warning' : 'neutral'}
                    />
                  </View>

                  <View className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                    <View
                      className={`h-full ${isOver ? 'bg-danger' : isNear ? 'bg-warning' : 'bg-brand-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="text-xs text-zinc-500">${spent.toFixed(2)} spent</Text>
                    <Text className="text-xs text-zinc-400 font-medium">${limit.toFixed(2)} allocated</Text>
                  </View>
                </Card>
              );
            })
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}