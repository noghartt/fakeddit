import { Outlet } from 'react-router';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export const LoginLayout = () => (
  <Flex height="100vh">
    <Box flexGrow="1" bgColor="orange.400" />
    <Flex flex="9" flexDirection="column" justifyContent="center">
      <Flex flexDirection="column" maxW="360px" ml="30px">
        <Heading fontSize="sm">Login</Heading>
        <Text fontSize="xs" mt="12px">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
          ullam, mollitia consectetur voluptatem sed veritatis illum, eveniet
          ipsa quas dolores ea adipisci. Ducimus eum perferendis quos ipsum?
          Recusandae, illo sint.
        </Text>
        <Box mt="64px">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
