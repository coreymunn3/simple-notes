import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NoteContextProvider } from '@/contexts/NoteContext';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <NoteContextProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </NoteContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
