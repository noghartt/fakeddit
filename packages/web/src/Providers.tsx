import { BrowserRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@fakeddit/ui';

import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './modules/auth/AuthContext';

interface Props {
  children: React.ReactElement;
}

export const Providers = ({ children }: Props) => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </RelayEnvironmentProvider>
);
