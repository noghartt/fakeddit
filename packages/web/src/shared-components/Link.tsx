import { Link as RRLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';

export const Link = chakra(RRLink, {
  baseStyle: {
    color: 'blue.500',
    fontWeight: 'bold',
    _hover: {
      textDecoration: 'underline',
    },
  },
});
