import React from 'react';
import { Flex, Box, Stack, Spacer, IconButton } from '@chakra-ui/react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaParagraph,
  FaHeading,
  FaListOl,
  FaListUl,
  FaUndo,
  FaRedo,
  FaCode,
  FaQuoteLeft,
} from 'react-icons/fa';

const ActiveIconButton = ({ active, icon, ...rest }) => {
  return (
    <IconButton icon={icon} bgColor={active ? 'gray.300' : ''} {...rest} />
  );
};

// ToDo: On small screens, collapse all of the editor menu into a Little "Aa" icon IconButton, like on notes and have it open a menu with more editing options
const Menubar = ({ editor, ...rest }) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex direction={'row'} {...rest}>
      <Stack spacing={1} direction='row' alignItems={'center'}>
        <ActiveIconButton
          icon={<FaBold />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        />
        <ActiveIconButton
          icon={<FaItalic />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        />
        <ActiveIconButton
          icon={<FaUnderline />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        />
        <ActiveIconButton
          icon={<FaStrikethrough />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        />
        <ActiveIconButton
          icon={<FaHeading />}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive('heading', { level: 1 })}
        />
        <ActiveIconButton
          icon={<FaHeading />}
          size={'xs'}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 3 })}
        />
        <ActiveIconButton
          icon={<FaParagraph />}
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
        />
        <ActiveIconButton
          icon={<FaListUl />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        />
        <ActiveIconButton
          icon={<FaListOl />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        />
        <ActiveIconButton
          icon={<FaCode />}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        />
        <ActiveIconButton
          icon={<FaQuoteLeft />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        />
      </Stack>

      <Spacer />

      <Flex d='row'>
        <ActiveIconButton
          icon={<FaUndo />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <ActiveIconButton
          icon={<FaRedo />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
      </Flex>
    </Flex>
  );
};

export default Menubar;
