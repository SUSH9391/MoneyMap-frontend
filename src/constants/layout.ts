// src/constants/layout.ts
import { Platform } from 'react-native';

export const FLOATING_TAB_DOCK_HEIGHT = 68;
export const FLOATING_TAB_FAB_SIZE = 62;

export const getFloatingTabBottomOffset = (insetsBottom: number) => {
  if (Platform.OS === 'android') {
    // Distance from Android 3-button or gesture navigation bar
    return Math.max(insetsBottom + 14, 34);
  }
  return Math.max(insetsBottom > 0 ? insetsBottom - 4 : 10, 8);
};