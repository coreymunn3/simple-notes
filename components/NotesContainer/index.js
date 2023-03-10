import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import UserNoteList from './components/UserNoteList';
import UserNoteContent from './components/UserNoteContent';

const NotesContainer = () => {
  return (
    <>
      <Flex h='94vh'>
        {/* Notes List on left */}
        {/* TODO: make this list narrow by default and increases width on hover */}
        <Box w={['45%', '30%']} m={1}>
          <UserNoteList />
        </Box>
        {/* TODO: Eventually, on smaller screens, hide this completely and navigate to new page to see content */}
        {/* TODO: Rich text formatting */}
        <Box flex={1} m={1}>
          <UserNoteContent />
        </Box>
      </Flex>
    </>
  );
};

export default NotesContainer;
