import React, { createContext, useState } from 'react';

export const NoteContext = createContext(null);

export const NoteContextProvider = (props) => {
  const { children, ...rest } = props;

  const [activeNoteId, setActiveNoteId] = useState(null);
  const defaultValue = {
    activeNoteId,
    setActiveNoteId,
  };

  return (
    <NoteContext.Provider value={defaultValue}>{children}</NoteContext.Provider>
  );
};

export const useNote = () => React.useContext(NoteContext);
