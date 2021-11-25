import { Box, Text, Input } from '@chakra-ui/react';

import { VStack, Button } from '@fakeddit/ui';

import { Link } from '@/shared-components/Link';

export const SignupPage = () => (
  <Box width="100%">
    <VStack as="form" alignSelf="center" spacing="12px">
      <Input type="email" placeholder="Email" />
      <Input placeholder="Username" />
      <Input placeholder="Password" type="password" />
      <Button width="100%" type="submit">
        Sign up
      </Button>
    </VStack>
    <Text mt="12px">
      Already a Fakedditor?{' '}
      <Link to="/" textTransform="uppercase" fontWeight="bold">
        Log in
      </Link>
    </Text>
  </Box>
);
