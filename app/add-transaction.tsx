import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../src/components/ui/ScreenWrapper';
import { Button } from '../src/components/ui/Button';
import { useCategories } from '../src/hooks/useCategories';
import { useCreateTransaction } from '../src/hooks/useTransaction';

export default function AddTransactionModal() {
  const router = useRouter();
  const { data: categories = [] } = useCategories();
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  // Form State
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id || ''
  );

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Required Field', 'Please enter a description.');
      return;
    }

    try {
      await createTransaction({
        amount: parsedAmount,
        type,
        description: description.trim(),
        categoryId: selectedCategoryId || (categories[0]?.id ?? ''),
        date: new Date().toISOString(),
      });

      router.back();
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to save transaction');
    }
  };

  return (
    <ScreenWrapper scrollable>
      <View className="py-5 gap-y-6">
        {/* Header with Close Button */}
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Add Transaction
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-1 rounded-full bg-zinc-100 dark:bg-zinc-800"
          >
            <Ionicons name="close" size={22} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Expense / Income Segmented Control */}
        <View className="flex-row p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`flex-1 py-3 rounded-xl items-center ${
              type === 'expense' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-semibold ${
                type === 'expense' ? 'text-danger' : 'text-zinc-500'
              }`}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType('income')}
            className={`flex-1 py-3 rounded-xl items-center ${
              type === 'income' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-semibold ${
                type === 'income' ? 'text-emerald-600' : 'text-zinc-500'
              }`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Big Amount Input Field */}
        <View className="items-center py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60">
          <Text className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-1">
            Amount
          </Text>
          <View className="flex-row items-center justify-center">
            <Text className="text-3xl font-bold text-zinc-400 mr-1">$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor="#A1A1AA"
              className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 min-w-[120px] text-center"
              autoFocus
            />
          </View>
        </View>

        {/* Description Field */}
        <View>
          <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Whole Foods groceries, Uber ride"
            placeholderTextColor="#A1A1AA"
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-base"
          />
        </View>

        {/* Category Selector */}
        <View>
          <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Category
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-x-2">
            {categories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategoryId(cat.id)}
                  className={`flex-row items-center px-4 py-2.5 rounded-xl border mr-2 ${
                    isSelected
                      ? 'bg-brand-500 border-brand-500'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <View
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: cat.color || '#7C6FF7' }}
                  />
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? 'text-white' : 'text-zinc-700 dark:text-zinc-200'
                    }`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Save Button */}
        <Button
          label="Save Transaction"
          onPress={handleSave}
          loading={isPending}
          className="mt-4"
        />
      </View>
    </ScreenWrapper>
  );
}