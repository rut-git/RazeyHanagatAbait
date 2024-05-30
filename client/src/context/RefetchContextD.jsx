// src/context/RefetchContext.js
import { createContext, useContext } from 'react';

const RefetchContext = createContext(null);

export const useRefetch = () => {
    return useContext(RefetchContext);
};

export const RefetchProvider = ({ children, value }) => {
    return (
        <RefetchContext.Provider value={value}>
            {children}
        </RefetchContext.Provider>
    );
};
