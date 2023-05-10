import { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const StallCustomizationContext = createContext({});

export const StallCustomizationProvider = ({ children }) => {
  const [stallColor, setStallColor] = useState();

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    console.log("stored Email:" + storedEmail);
    const fetchStallDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/api/stalls/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        if (response.data[0].stallColor !== null) {
          setStallColor(response.data[0].stallColor);
        }
        console.log(response.data[0].stallColor);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStallDetails();
  }, []);

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
