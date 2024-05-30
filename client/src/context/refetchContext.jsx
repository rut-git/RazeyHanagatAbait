import React, { createContext, useContext } from 'react';

const RefetchContext = createContext();

export const useRefetch = () => useContext(RefetchContext);

export const RefetchProvider = ({ children, value }) => {
    return (
        <RefetchContext.Provider value={value}>
            {children}
        </RefetchContext.Provider>
    );
};
