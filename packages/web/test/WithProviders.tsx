import { RelayEnvironmentProvider, Environment } from 'react-relay';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@fakeddit/ui';

import { RelayEnvironment } from '../src//relay/RelayEnvironment';
import { AuthProvider } from '../src/modules/auth/AuthContext';

interface Props {
  children: React.ReactElement;
  relayEnvironment?: Environment;
}

export const WithProviders = ({
  children,
  relayEnvironment = RelayEnvironment,
}: Props) => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <AuthProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AuthProvider>
  </RelayEnvironmentProvider>
);
