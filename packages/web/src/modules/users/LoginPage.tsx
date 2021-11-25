import { Box, Text, Input } from '@chakra-ui/react';

import { VStack, Button } from '@fakeddit/ui';

import { Link } from '@/shared-components/Link';

export const LoginPage = () => (
  <Box width="100%">
    <VStack as="form" alignSelf="center" spacing="12px">
      <Input placeholder="Username" />
      <Input placeholder="Password" type="password" />
      <Button width="100%" type="submit">
        Log in
      </Button>
    </VStack>
    <Text mt="12px">
      New to Fakeddit?{' '}
      <Link to="signup" textTransform="uppercase">
        Sign up
      </Link>
    </Text>
  </Box>
);
