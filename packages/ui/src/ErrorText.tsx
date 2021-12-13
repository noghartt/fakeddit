import { Text, TextProps } from '@chakra-ui/react';

export const ErrorText = ({ children, ...rest }: TextProps) => (
  <Text
    data-testid="form-error-text"
    color="red.500"
    fontSize="xs"
    mt="5px"
    {...rest}
  >
    {children}
  </Text>
);
