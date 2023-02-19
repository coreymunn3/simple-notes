import React, { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const NoteContext = createContext(null);

const getNotes = async () => {
  const res = await axios.get('/api/note');
  return res.data;
};

export const NoteContextProvider = (props) => {
  const { children, ...rest } = props;
  const [activeNote, setActiveNote] = useState(null);

  const notesQuery = useQuery(['notes'], getNotes, {
    onSuccess: (data) => setActiveNote(data[0]),
  });

  const defaultValue = {
    notes: notesQuery.data,
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
