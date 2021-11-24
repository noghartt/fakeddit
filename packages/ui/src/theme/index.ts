import { extendTheme } from '@chakra-ui/react';
// eslint-disable-next-line import/named
import { Theme, ColorHues } from '@chakra-ui/theme';

import { DeepPartial } from '@fakeddit/types';

const colors: Record<string, DeepPartial<ColorHues>> = {
  orange: {
    '600': '#F7861B',
  },
};

const overrides: DeepPartial<Theme> = {
  // TODO: In the future, implements dark theme
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  colors,
};

export const theme = extendTheme(overrides);
