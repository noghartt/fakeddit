import { ComponentProps } from 'react';
import { VStack as ChakraVStack } from '@chakra-ui/react';

// TODO: I don't know if there's a better way to do it, but I want to use VStack
// with `alignItems="flex-start"` by default, but it's centered. So, I do it.
export const VStack = (props: ComponentProps<typeof ChakraVStack>) => (
  <ChakraVStack alignItems="flex-start" {...props} />
);
