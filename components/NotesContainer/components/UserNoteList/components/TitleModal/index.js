import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormControl,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

const TitleModal = (props) => {
  const { open, handleClose, handleCreateNote } = props;
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    if (title.length < 255) {
      setTitle(e.target.value);
    }
  };

  return (
    <Modal onClose={handleClose} isOpen={open} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Note Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input variant='flushed' value={title} onChange={handleChange} />
            <FormHelperText
              textAlign={'right'}
            >{`${title.length}/255`}</FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Stack direction={'row'}>
            <Button
              onClick={() => {
                handleCreateNote({
                  title,
                  user_id: 1, // TODO: change this to the current actual user
                });
                setTitle('');
                handleClose();
              }}
              colorScheme='blue'
            >
              Create
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TitleModal;
