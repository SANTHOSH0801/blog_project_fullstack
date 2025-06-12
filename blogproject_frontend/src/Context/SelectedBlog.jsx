// context/SelectedBlogContext.js
import React, { createContext, useContext, useState } from 'react';

// Create context
const SelectedBlogContext = createContext();

// Provider component
export const SelectedBlogProvider = ({ children }) => {
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    return (
        <SelectedBlogContext.Provider value={{ selectedBlogId, setSelectedBlogId }}>
            {children}
        </SelectedBlogContext.Provider>
    );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedBlogId = () => useContext(SelectedBlogContext);
