import React from 'react';
import ColorModeSwitch from '@/components/ColorModeSwitch';
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Icon,
  Heading,
  Button,
} from '@chakra-ui/react';
import { SlNotebook } from 'react-icons/sl';

const Navbar = () => {
  return (
    <Box padding='2'>
      <Flex>
        <Stack direction={'row'} alignItems='center'>
          <Icon as={SlNotebook} boxSize={6} />
          <Heading size={'md'} as={'span'}>
            Simple Notes
          </Heading>
        </Stack>

        <Spacer />

        {/* TODO: Make these auto-collapse into a hamburger menu on small screens */}
        <Stack direction={'row'} alignItems='center'>
          <Button
            variant={'link'}
            fontWeight={'normal'}
          >{`Welcome, Corey!`}</Button>
          <ColorModeSwitch />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
