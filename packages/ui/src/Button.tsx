import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export const buttonTheme = {
  baseStyle: {
    outline: 'none',
  },
  variants: {
    solid: {
      bgColor: 'blue.400',
      color: 'white',
      _hover: {
        bgColor: 'blue.500',
      },
    },
  },
};

export const Button = (props: ButtonProps) => <ChakraButton {...props} />;
