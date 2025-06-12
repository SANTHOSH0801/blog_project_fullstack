// context/SelectedBlogContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context
const SelectedUserEmailContext = createContext();

// Provider component
export const SelectedEmailProvider = ({ children }) => {
    const [selectedEmailid, setSelectedEmailid] = useState(null);

    return (
        <SelectedUserEmailContext.Provider value={{ selectedEmailid, setSelectedEmailid }}>
            {children}
        </SelectedUserEmailContext.Provider>
    );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedEmailid = () => useContext(SelectedUserEmailContext);
