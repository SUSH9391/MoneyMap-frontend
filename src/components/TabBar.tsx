// src/components/TabBar.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  FLOATING_TAB_DOCK_HEIGHT,
  FLOATING_TAB_FAB_SIZE,
  getFloatingTabBottomOffset,
} from '../constants/layout';

const TAB_HEIGHT = FLOATING_TAB_DOCK_HEIGHT;
const CENTER_BUTTON_SIZE = FLOATING_TAB_FAB_SIZE;
const FAB_SPACE = 64;
const HORIZONTAL_MARGIN = 16;

export function TabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const bottomOffset = getFloatingTabBottomOffset(insets.bottom);
  const routes = state.routes.filter(
    (route) => descriptors[route.key].options.tabBarIcon !== undefined
  );

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      {/* Floating Dock */}
      <View
        style={[
          styles.dock,
          {
            bottom: bottomOffset,
          },
        ]}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
      >
        <View style={styles.content}>
          {routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = emitter.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigateToTab(route.key);
              }
            };

            return (
              <React.Fragment key={route.key}>
                {/* Leave empty gap in the center (between tab 2 and 3) for the FAB */}
                {index === 2 ? <View style={styles.spacer} /> : null}

                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  style={styles.tabItem}
                >
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: isFocused ? '#7C6FF7' : '#A1A1AA',
                    size: 24,
                  })}
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>
      </View>

      {/* Elevated Center Scan FAB */}
      <View
        style={[
          styles.fabContainer,
          {
            bottom: bottomOffset + TAB_HEIGHT - CENTER_BUTTON_SIZE / 2,
          },
        ]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={styles.fab}
          className="bg-brand-500"
          activeOpacity={0.85}
          onPress={() => router.push('/scan' as any)}
        >
          <Ionicons name="scan" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
  },
  dock: {
    position: 'absolute',
    left: HORIZONTAL_MARGIN,
    right: HORIZONTAL_MARGIN,
    height: TAB_HEIGHT,
    borderRadius: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: FAB_SPACE,
    height: '100%',
  },
  fabContainer: {
    position: 'absolute',
    left: '50%',
    marginLeft: -CENTER_BUTTON_SIZE / 2,
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fab: {
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});