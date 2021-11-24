import { Link } from 'react-router-dom';
import {
  chakra,
  Flex,
  Box,
  Heading,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

import { VStack, Button } from '@fakeddit/ui';

// TODO: I think that I should move it to another file because it'll be reused
// a lot of times
const ChakraLink = chakra(Link);

export const Login = () => (
  <Flex height="100vh">
    <Box flexGrow="1" bgColor="orange.400" />
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
            <FormControl id="username">
              <Input placeholder="Username" />
              <FormErrorMessage>Teste</FormErrorMessage>
            </FormControl>
            <FormControl id="password">
              <Input placeholder="Password" type="password" />
              <FormErrorMessage>Teste</FormErrorMessage>
            </FormControl>
            <Button width="100%" type="submit">
              Log in
            </Button>
          </VStack>
          <Text mt="12px">
            New to Fakeddit?{' '}
            <ChakraLink
              to="/signup"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Sign up
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Flex>
  </Flex>
);
