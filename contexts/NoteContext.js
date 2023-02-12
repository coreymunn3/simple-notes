import React, { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const NoteContext = createContext(null);

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

export const NoteContextProvider = (props) => {
  const { children, ...rest } = props;
  const [activeNote, setActiveNote] = useState(null);

  const notesQuery = useQuery(['notes'], getNotes, {
    onSuccess: (data) => setActiveNote(data[0]),
  });

  const defaultValue = {
    notes: notesQuery.data || [],
    activeNote,
    setActiveNote,
  };

  return (
    <NoteContext.Provider value={defaultValue}>
      {notesQuery.isSuccess && children}
    </NoteContext.Provider>
  );
};

export const useNote = () => React.useContext(NoteContext);
