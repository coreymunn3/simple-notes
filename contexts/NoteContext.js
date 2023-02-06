import React, { createContext, useState } from 'react';

export const NoteContext = createContext(null);

export const NoteContextProvider = (props) => {
  const { children, ...rest } = props;

  const [activeNote, setActiveNote] = useState(null);
  const defaultValue = {
    activeNote,
    setActiveNote,
  };

  return (
    <NoteContext.Provider value={defaultValue}>{children}</NoteContext.Provider>
  );
};

export const useNote = () => React.useContext(NoteContext);
