import React, { useState } from 'react';
import { Box, Flex, Stack, IconButton, Text, Divider } from '@chakra-ui/react';
import TitleModal from './components/TitleModal';
import { useNote } from '@/contexts/NoteContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const UserNoteList = () => {
  const { activeNote, setActiveNote } = useNote();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const notesQuery = useQuery(
    ['notes'],
    async () => {
      const res = await axios.get('/api/note');
      return res.data;
    },
    {
      // TODO: Add Snackbars for Error and Success
      onSuccess: (data) => {
        if (!activeNote) {
          setActiveNote(data[0]);
        }
      },
    }
  );

  const createNoteMutation = useMutation(
    ['create-update-note'],
    async (newNote) => {
      const res = await axios.post('/api/note', newNote);
      return res;
    },
    {
      // TODO: Add Snackbars for Error and Success
      onSuccess: (data) => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );
  const deleteNoteMutation = useMutation(
    ['delete-note'],
    async (note) => {
      const res = await axios.delete(`/api/note/${note.id}`);
      return res;
    },
    {
      // TODO: Add Snackbars for Error and Success
      onSuccess: (data) => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );

  const handleCreateNote = (note) => {
    createNoteMutation.mutate(note);
  };
  const handleDeleteNote = (note) => {
    deleteNoteMutation.mutate(note);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Flex direction={'column'} height={'100%'} px={[1, 2]} overflow='auto'>
      {/* control Panel to add or delete a selected note */}
      <Stack direction={'row'} my={1} spacing={1}>
        <Box flex={1}></Box>
        <IconButton icon={<EditIcon />} onClick={handleOpenModal} />
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => handleDeleteNote(activeNote)}
        />
      </Stack>
      {/* TODO: Get list of Notes */}
      <Stack direction={'column'} spacing={0}>
        {notesQuery.data ? (
          notesQuery.data.map((note) => (
            <>
              <Divider w={'95%'} alignSelf='center' />
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
                  {new Date(note.updatedAt).toLocaleDateString('en-us')}
                </Text>
              </Box>
            </>
          ))
        ) : (
          <Text>No Notes Yet!</Text>
        )}
      </Stack>
      <TitleModal
        open={open}
        handleClose={handleCloseModal}
        handleCreateNote={handleCreateNote}
      />
    </Flex>
  );
};

export default UserNoteList;
