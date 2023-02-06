import React, { useState } from 'react';
import { Box, Flex, Stack, IconButton, Text, Divider } from '@chakra-ui/react';
import { useNote } from '@/contexts/NoteContext';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';

const getNotes = () => {
  return [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'A Sample Note 1',
      content: 'Lorem Ipsum, dolar sit amet.',
      published: false,
      user_id: 1,
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'A Sample Note 2',
      content: 'Lorem Ipsum, dolar sit amet.',
      published: false,
      user_id: 1,
    },
    {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'A Sample Note 3',
      content: 'Lorem Ipsum, dolar sit amet.',
      published: false,
      user_id: 1,
    },
  ];
};

const UserNoteList = () => {
  const { activeNote, setActiveNote } = useNote();
  const notesQuery = useQuery(['Notes'], getNotes, {
    onSuccess: (data) => setActiveNote(data[0]),
  });

  return (
    <Flex direction={'column'} height={'100%'} overflow='auto'>
      {/* control Panel to add or delete a selected note */}
      <Stack direction={'row'}>
        <Box flex={1}></Box>
        <IconButton icon={<EditIcon />}></IconButton>
        <IconButton icon={<DeleteIcon />}></IconButton>
      </Stack>
      {/* TODO: Get list of Notes */}
      <Stack direction={'column'} spacing={0}>
        {notesQuery.isSuccess ? (
          notesQuery.data.map((note) => (
            <>
              <Divider
                borderColor={'gray.300'}
                m={0}
                w={'95%'}
                alignSelf='center'
              />
              <Box
                as='button'
                textAlign='left'
                p={1}
                borderRadius={4}
                bgColor={note.id === activeNote?.id ? 'blue.400' : ''}
                onClick={() => setActiveNote(note)}
              >
                <Text my={0.5}>{note.title}</Text>
                <Text mb={0.5} color={'gray.400'}>
                  {/* TODO: Make this show a relative date (eg. 3 hours ago) */}
                  {note.updatedAt.toLocaleDateString('en-us')}
                </Text>
              </Box>
            </>
          ))
        ) : (
          <Text>No Notes Yet!</Text>
        )}
      </Stack>
    </Flex>
  );
};

export default UserNoteList;
