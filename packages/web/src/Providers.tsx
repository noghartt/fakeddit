import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@fakeddit/ui';

interface Props {
  children: React.ReactElement;
}

export const Providers = ({ children }: Props) => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </BrowserRouter>
);
