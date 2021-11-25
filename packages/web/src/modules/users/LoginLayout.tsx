import { useLocation, Outlet } from 'react-router-dom';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { Link } from '@/shared-components/Link';

const SignupOrLoginLink = ({ pathname }: { pathname: string }) => {
  const isSignupScreen = pathname === '/signup';

  const text = isSignupScreen ? 'Already a Fakedditor?' : 'New to Fakeddit?';
  const link = {
    to: isSignupScreen ? '/' : '/signup',
    text: isSignupScreen ? 'Log In' : 'Sign Up',
  };

  return (
    <Text mt="12px">
      {text} <Link to={link.to}>{link.text}</Link>
    </Text>
  );
};

export const LoginLayout = () => {
  const { pathname } = useLocation();

  return (
    <Flex height="100vh">
      <Box flexGrow="1" bgColor="orange.400" />
      <Flex flex="9" flexDirection="column" justifyContent="center">
        <Flex flexDirection="column" maxW="360px" ml="30px">
          <Heading fontSize="sm">
            {pathname === '/signup' ? 'Sign Up' : 'Log In'}
          </Heading>
          <Text fontSize="xs" mt="12px">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
            ullam, mollitia consectetur voluptatem sed veritatis illum, eveniet
            ipsa quas dolores ea adipisci. Ducimus eum perferendis quos ipsum?
            Recusandae, illo sint.
          </Text>
          <Box mt="64px">
            <Outlet />
          </Box>
          <SignupOrLoginLink pathname={pathname} />
        </Flex>
      </Flex>
    </Flex>
  );
};
