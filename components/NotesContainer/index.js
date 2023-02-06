import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import UserNoteList from './components/UserNoteList';
import UserNoteContent from './components/UserNoteContent';

const NotesContainer = () => {
  return (
    <Box>
      <Flex>
        {/* Notes List on left */}
        {/* TODO: make this list narrow by default and increases width on hover */}
        <Box
          w={['45%', '30%']}
          height='400px'
          bgColor={'gray.100'}
          m={1}
          borderRadius={4}
        >
          <UserNoteList />
        </Box>
        {/* TODO: Eventually, on smaller screens, hide this completely and navigate to new page to see content */}
        {/* TODO: Rich text formatting */}
        <Box flex={1} height='400px' bgColor={'gray.100'} m={1} p={[1, 2]}>
          <UserNoteContent />
        </Box>
      </Flex>
    </Box>
  );
};

export default NotesContainer;
