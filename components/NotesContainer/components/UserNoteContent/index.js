import React, { useState } from 'react';
import { useNote } from '@/contexts/NoteContext';
import { useEditor, EditorContent } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Menubar from './components/Menubar';
import ContentCard from '@/components/ContentCard';
import { Box, Divider } from '@chakra-ui/react';
import { debounce } from 'lodash';

const UserNoteContent = () => {
  const { activeNote } = useNote();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    onUpdate: debounce(({ editor }) => {
      const json = editor.getJSON();
      console.log(json);
      // console.log('stringified', JSON.stringify(json));
      // hit an endpoint to post or put a note, give it this content
    }, 1000),
    content: activeNote?.content || '',
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
