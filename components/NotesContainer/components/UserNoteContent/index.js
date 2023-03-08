import React, { useMemo, useEffect } from 'react';
import { useNote } from '@/contexts/NoteContext';
import { useMutation } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
import { generateHTML } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import History from '@tiptap/extension-history';
import { lowlight } from 'lowlight/lib/core';
const js = require('highlight.js/lib/languages/javascript');
import Menubar from './components/Menubar';
import ContentCard from '@/components/ContentCard';
import { Box, Divider } from '@chakra-ui/react';
import { debounce } from 'lodash';
import axios from 'axios';

lowlight.registerLanguage('js', js);

const UserNoteContent = () => {
  const { activeNote } = useNote();
  // use tiptap util function to generate memoized HTML from the activeNote Json
  const output = useMemo(() => {
    if (activeNote?.content) {
      const json = JSON.parse(activeNote.content);
      return generateHTML(json, [
        Document,
        Paragraph,
        Text,
        Heading,
        Bold,
        Italic,
        Underline,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        Blockquote,
        CodeBlockLowlight,
      ]);
    }
  }, [activeNote]);

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
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      Bold,
      Italic,
      Underline,
      Strike,
      ListItem,
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      History,
    ],
    autofocus: true,
    onUpdate: debounce(({ editor }) => {
      const json = editor.getJSON();
      const stringifiedContent = JSON.stringify(json);
      updateNoteMutation.mutate(stringifiedContent);
    }, 1000),
    content: output,
  });

  // reset the editor content when the expected output changes
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(output);
    }
  }, [output, editor]);

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
