import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  Input,
  Button,
} from '@chakra-ui/react';

import { VStack } from '@fakeddit/ui';

export const Login = () => (
  <Flex height="100vh">
    <Box flexGrow="1" bgColor="orange.600" />
    <Flex flex="9" flexDirection="column" justifyContent="center">
      <VStack ml="30px" maxW="360px" spacing="64px">
        <VStack maxW="320px" spacing="12px" width="100%">
          <Heading fontSize="sm">Login</Heading>
          <Text fontSize="xs">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
            ullam, mollitia consectetur voluptatem sed veritatis illum, eveniet
            ipsa quas dolores ea adipisci. Ducimus eum perferendis quos ipsum?
            Recusandae, illo sint.
          </Text>
        </VStack>
        <Box width="100%">
          <VStack as="form" alignSelf="center" spacing="12px">
            <Input placeholder="Username" />
            <Input placeholder="Password" type="password" />
            <Button w="100%">Log in</Button>
          </VStack>
          <Text mt="12px">
            New to Fakeddit?{' '}
            <Link textTransform="uppercase" fontWeight="bold">
              Sign up
            </Link>
          </Text>
        </Box>
      </VStack>
    </Flex>
  </Flex>
);
