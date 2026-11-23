// app/(tabs)/transactions.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../../src/components/ui/ScreenWrapper';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { useTransactions } from '../../src/hooks/useTransactions';

type FilterType = 'all' | 'income' | 'expense' | 'receipts';

export default function TransactionsScreen() {
  const { data: transactions = [], isLoading } = useTransactions();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');

  // Multi-factor Filter: Search string + Inflow/Outflow/Receipt-only
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      // 1. Search Query
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category?.name?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Type & Source filter
      if (filterType === 'income') return t.type === 'income';
      if (filterType === 'expense') return t.type === 'expense';
      if (filterType === 'receipts') return Boolean((t as any).receiptItem || (t as any).receiptId);

      return true;
    });
  }, [transactions, search, filterType]);

  return (
    <ScreenWrapper>
      <View className="py-6 flex-1 gap-y-4">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Transactions</Text>

        {/* Search Bar */}
        <View className="flex-row items-center px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <Ionicons name="search" size={18} color="#A1A1AA" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search merchant, category..."
            placeholderTextColor="#A1A1AA"
            className="flex-1 ml-2 text-base text-zinc-900 dark:text-zinc-100"
          />
        </View>

        {/* Filter Pills */}
        <View className="flex-row gap-x-2">
          {(['all', 'expense', 'income', 'receipts'] as FilterType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilterType(tab)}
              className={`px-3.5 py-1.5 rounded-full border ${
                filterType === tab
                  ? 'bg-brand-500 border-brand-500'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <Text
                className={`text-xs font-semibold capitalize ${
                  filterType === tab ? 'text-white' : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {tab === 'receipts' ? '🧾 Receipts' : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Card className="items-center py-8">
              <Text className="text-zinc-400">No matching transactions found.</Text>
            </Card>
          )}
          renderItem={({ item }) => {
            const isReceipt = Boolean((item as any).receiptItem || (item as any).receiptId);
            const isIncome = item.type === 'income';

            return (
              <Card className="mb-2.5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-x-3 flex-1 mr-3">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: item.category?.color ? `${item.category.color}20` : '#F4F4F5' }}
                  >
                    <Ionicons
                      name={isReceipt ? 'receipt-outline' : 'card-outline'}
                      size={20}
                      color={item.category?.color || '#7C6FF7'}
                    />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center gap-x-1.5">
                      <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-100" numberOfLines={1}>
                        {item.description}
                      </Text>
                      {isReceipt && <Badge label="OCR" variant="brand" className="px-1.5 py-0" />}
                    </View>
                    <Text className="text-xs text-zinc-400">
                      {item.category?.name || 'General'} • {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                {/* Amount */}
                <Text
                  className={`text-base font-bold ${
                    isIncome ? 'text-emerald-600' : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {isIncome ? '+' : '-'}${Math.abs(Number(item.amount)).toFixed(2)}
                </Text>
              </Card>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
}