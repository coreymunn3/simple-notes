import React, { useState } from 'react';
import { useNote } from '@/contexts/NoteContext';
import { useMutation } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Menubar from './components/Menubar';
import ContentCard from '@/components/ContentCard';
import { Box, Divider } from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

const UserNoteContent = () => {
  const { activeNote } = useNote();

  const updateNoteMutation = useMutation(
    ['update-note'],
    async (updatedContent) => {
      const res = await axios.post('/api/note', {
        ...activeNote,
        content: updatedContent,
      });
      return res;
    },
    {
      onSuccess: (data) => {},
    }
  );

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    onUpdate: debounce(({ editor }) => {
      const json = editor.getJSON();
      const stringifiedContent = JSON.stringify(json);
      console.log('stringifiedContent', stringifiedContent);
      updateNoteMutation.mutate(stringifiedContent);
    }, 1000),
    // need to call setContent from editor commands whenever activeNote changes
    content: '',
  });

  return (
    <ContentCard py={1}>
      {activeNote?.id ? (
        <>
          <Box my={1}>
            <Menubar editor={editor} />
          </Box>
          <Divider />
          <EditorContent editor={editor} />
        </>
      ) : (
        <Box></Box>
      )}
    </ContentCard>
  );
};

export default UserNoteContent;
