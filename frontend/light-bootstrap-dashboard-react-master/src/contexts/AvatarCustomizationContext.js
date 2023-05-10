import { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const AvatarCustomizationContext = createContext({});

export const AvatarCustomizationProvider = ({ children }) => {
  const [hairColor, setHairColor] = useState();
  const [eyesColor, setEyesColor] = useState();
  const [mouthColor, setMouthColor] = useState();
  const [glassesColor, setGlassesColor] = useState();
  const [skinColor, setSkinColor] = useState();
  const [shirtColor, setShirtColor] = useState();
  const [pantsColor, setPantsColor] = useState();
  const [shoesColor, setShoesColor] = useState();
  const [lacesColor, setLacesColor] = useState();
  const [soleColor, setSoleColor] = useState();

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    console.log(storedEmail);
    const fetchAvatarDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/api/avatars/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        if (response.data.topColor !== null) {
          setShirtColor(response.data.topColor);
        }

         if (response.data.bottomColor !== null) {
           setPantsColor(response.data.bottomColor);
         }
        
         if (response.data.topColor !== null) {
           setShoesColor(response.data.shoeColor);
         }
        
         if (response.data.topColor !== null) {
           setHairColor(response.data.hairColor);
         }
         if (response.data.skinColor !== null) {
           setSkinColor(response.data.skinColor);
         }
        
      } catch (e) {
        console.error(e);
      }
    };
    fetchAvatarDetails();
  }, []);

  return (
    <AvatarCustomizationContext.Provider
      value={{
        hairColor,
        setHairColor,
        mouthColor,
        setMouthColor,
        eyesColor,
        setEyesColor,
        glassesColor,
        setGlassesColor,
        skinColor,
        setSkinColor,
        shirtColor,
        setShirtColor,
        pantsColor,
        setPantsColor,
        shoesColor,
        setShoesColor,
        lacesColor,
        setLacesColor,
        soleColor,
        setSoleColor,
      }}
    >
      {children}
    </AvatarCustomizationContext.Provider>
  );
};

export const useAvatarCustomization = () => {
  return useContext(AvatarCustomizationContext);
};
