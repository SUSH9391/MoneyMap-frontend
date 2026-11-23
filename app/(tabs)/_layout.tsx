
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { TabBar } from '@/components/TabBar';

const ICON_COLOR = '#71717A';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7C6FF7',
        tabBarInactiveTintColor: ICON_COLOR,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color ?? ICON_COLOR}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              size={size}
              color={color ?? ICON_COLOR}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="pie-chart-outline"
              size={size}
              color={color ?? ICON_COLOR}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color ?? ICON_COLOR}
            />
          ),
        }}
      />
    </Tabs>
  );
}
