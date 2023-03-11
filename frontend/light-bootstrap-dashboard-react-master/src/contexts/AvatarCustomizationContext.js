import { createContext, useContext, useState } from "react";

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
