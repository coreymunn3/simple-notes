import { extendTheme } from '@chakra-ui/react';

// 3. extend the theme
const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: `'Lobster', cursive`,
    body: `'Open Sans', sans-serif`,
  },
});

export default theme;
