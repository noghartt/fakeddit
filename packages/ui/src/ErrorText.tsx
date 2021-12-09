import { Text, TextProps } from '@chakra-ui/react';

export const ErrorText = ({ children, ...rest }: TextProps) => (
  <Text color="red.500" fontSize="xs" mt="5px" {...rest}>
    {children}
  </Text>
);
