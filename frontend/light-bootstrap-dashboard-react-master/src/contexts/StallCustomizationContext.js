import { createContext, useContext, useState } from "react";

const StallCustomizationContext = createContext({});

export const StallCustomizationProvider = ({ children }) => {
  const [stallColor, setStallColor] = useState();

  return (
    <StallCustomizationContext.Provider
      value={{
        stallColor,
        setStallColor,
      }}
    >
      {children}
    </StallCustomizationContext.Provider>
  );
};

export const useStallCustomization = () => {
  return useContext(StallCustomizationContext);
};
