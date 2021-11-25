import { Input } from '@chakra-ui/react';

import { VStack, Button } from '@fakeddit/ui';

export const LoginPage = () => (
  <VStack as="form" alignSelf="center" spacing="12px">
    <Input placeholder="Username" />
    <Input placeholder="Password" type="password" />
    <Button width="100%" type="submit">
      Log in
    </Button>
  </VStack>
);
