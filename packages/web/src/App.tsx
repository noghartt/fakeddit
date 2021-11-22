import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@fakeddit/ui';

export const App = () => (
  <ChakraProvider theme={theme}>
    <h1>Hello, world</h1>
  </ChakraProvider>
);
