// app/create-category.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../src/components/ui/ScreenWrapper';
import { InputField } from '../src/components/ui/InputField';
import { Button } from '../src/components/ui/Button';
import client from '../src/api/client';

const PALETTE = ['#7C6FF7', '#4D7C5F', '#BE3A50', '#A16207', '#3A7EB5', '#D946EF', '#06B6D4', '#F97316'];
const ICONS = ['cart', 'restaurant', 'car', 'film', 'cafe', 'fitness', 'medical', 'airplane'];

export default function CreateCategoryModal() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a category name');
      return;
    }

    try {
      setLoading(true);
      await client.post('/categories', {
        name: name.trim(),
        color: selectedColor,
        icon: selectedIcon,
      });
      router.back();
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <View className="py-6 gap-y-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">New Category</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-circle" size={26} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        <InputField label="Category Name" placeholder="e.g. Groceries, Streaming" value={name} onChangeText={setName} />

        {/* Color Palette */}
        <View>
          <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Accent Color</Text>
          <View className="flex-row flex-wrap gap-3">
            {PALETTE.map((hex) => (
              <TouchableOpacity
                key={hex}
                onPress={() => setSelectedColor(hex)}
                style={{ backgroundColor: hex }}
                className={`w-11 h-11 rounded-full items-center justify-center ${
                  selectedColor === hex ? 'border-4 border-white shadow-md' : ''
                }`}
              >
                {selectedColor === hex && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Icon Selector */}
        <View>
          <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Category Icon</Text>
          <View className="flex-row flex-wrap gap-3">
            {ICONS.map((icon) => (
              <TouchableOpacity
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                className={`w-11 h-11 rounded-xl items-center justify-center border ${
                  selectedIcon === icon
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Ionicons name={icon as any} size={20} color={selectedIcon === icon ? '#FFFFFF' : '#71717A'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button label="Save Category" onPress={handleCreate} loading={loading} />
      </View>
    </ScreenWrapper>
  );
}