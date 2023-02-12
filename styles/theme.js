import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// 3. extend the theme
const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: `'Lobster', cursive`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        // ProseMirror styling taken from waptik code: https://gist.github.com/waptik/6cf0dc01b17566e02c98eb6ac2c52084
        '.ProseMirror': {
          mt: 4,
          '> * + *': {
            marginTop: '0.75em',
          },
          // @see https://github.com/jesster2k10/guava-cards/blob/5d5c283eb720bf503258f4e17bce3865d35fd8d3/packages/website/src/bundles/editor/ContentEditor.tsx#L86
          'p.is-editor-empty:first-child::before': {
            content: 'attr(data-placeholder)',
            color: 'gray.500',
            float: 'left',
            pointerEvents: 'none',
            height: 0,
          },
          '&:focus': {
            outline: 'none',
          },
          h1: {
            fontSize: '2rem',
            lineHeight: '1.1',
            fontWeight: '700',
          },
          h2: {
            fontSize: '1.25rem',
            lineHeight: '1.1',
            fontWeight: '700',
          },
          'ul, ol': {
            padding: '0 1.2rem',
          },
          code: {
            bg: 'rgba(#616161, 0.1)',
            color: '#616161',
          },
          pre: {
            fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
            background: mode('gray.900', 'blue.100')(props),
            color: mode('white', 'gray.900')(props),
            padding: '0.75rem 1rem',
            rounded: 'md',
            whiteSpace: 'pre-wrap',
            code: {
              color: 'inherit',
              p: 0,
              background: 'none',
              fontSize: '0.8rem',
            },
          },
          blockquote: {
            pl: 4,
            borderLeft: '2px solid rgba(13, 13, 13, 0.1)',
          },
          img: {
            maxW: 'full',
            h: 'auto',
          },
          mark: {
            bg: '#FAF594',
          },
          hr: {
            border: 'none',
            borderTop: '2px solid rgba(#0D0D0D, 0.1)',
            margin: '2rem 0',
          },
        }, // .ProseMirror
      },
    }),
  },
  components: {
    Divider: {
      baseStyle: {
        borderColor: 'gray.300',
        margin: 0,
      },
    },
  },
});

export default theme;
