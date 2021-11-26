import { Input } from '@chakra-ui/react';

import { VStack, Button } from '@fakeddit/ui';

export const SignupPage = () => (
  <VStack as="form" alignSelf="center" spacing="12px">
    <Input type="email" placeholder="Email" />
    <Input placeholder="Username" />
    <Input placeholder="Password" type="password" />
    <Button width="100%" type="submit">
      Sign up
    </Button>
  </VStack>
);
