import { extendTheme } from '@chakra-ui/react';
// eslint-disable-next-line import/named
import { Theme } from '@chakra-ui/theme';

import { DeepPartial } from '@fakeddit/types';

const overrides: DeepPartial<Theme> = {
  // TODO: In the future, implements dark theme
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
};

export const theme = extendTheme(overrides);
