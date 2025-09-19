/// <reference types="nativewind/types" />

import 'react-native';

// Extend React Native components to support className prop for NativeWind
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }
}
