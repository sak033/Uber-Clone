import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CaptainDataContext.Provider
      value={{
        captainData,
        setCaptainData,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
