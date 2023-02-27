import React from 'react';
import { Flex, Box, Spinner } from '@chakra-ui/react';

const ContentCard = (props) => {
  const { loading, spinnerProps, children, ...cardProps } = props;
  return (
    <Flex
      direction={'column'}
      overflow='auto'
      position='relative'
      px={[1, 2]}
      h='100%'
      bgColor={'gray.100'}
      borderRadius={4}
      {...cardProps}
    >
      {/* if anything in the card is loading, show the spinner overlay */}
      {loading && (
        <Box
          position={'absolute'}
          top='0'
          left='0'
          w='100%'
          h='100%'
          zIndex={99}
          borderRadius={4}
          bgColor={'rgba(237,242,237,0.5)'}
          display='flex'
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Spinner size='lg' />
        </Box>
      )}
      {children}
    </Flex>
  );
};

export default ContentCard;
