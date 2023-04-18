import {
  ColorInput,
  Slider,
  Stack,
  Text,
  Title,
  Button,
  DEFAULT_THEME,
} from "@mantine/core";
import { useState } from "react";

import { useAvatarCustomization } from "../../contexts/AvatarCustomizationContext";

export const Configurator = () => {
  const {
    hairColor,
    setHairColor,
    shirtColor,
    setShirtColor,
    pantsColor,
    setPantsColor,
    shoesColor,
    setShoesColor,
    skinColor,
    setSkinColor,
  } = useAvatarCustomization();

  const [msg, setMsg] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/avatars/", {
        method: "POST",
        body: JSON.stringify({
          avatarId: "2",
          bottomColor: pantsColor,
          topColor: shirtColor,
          shoeColor: shoesColor,
          hairColor: hairColor,
          skinColor: skinColor,
          gender: "Female",
          userId: "hansijk@gmail.com",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to save avatar.");
      }
      setMsg("Avatar Saved Successfully");
    } catch (err) {
      setMsg(err.message);
      console.log(err.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Stack spacing={"sm"} py={"sm"}>
        <ColorInput
          label="Skin"
          format="hex"
          withPicker={false}
          swatches={[
            "#ffffff",
            "#e3dada",
            "#a69c9c",
            "#998a71",
            "#f5eed7",
            "#edd5c0",
            "#7d5a39",
            "#fffacc",
          ]}
          value={skinColor}
          onChange={setSkinColor}
        />

        <ColorInput
          label="Hair"
          format="hex"
          value={hairColor}
          onChange={setHairColor}
        />

        <ColorInput
          label="Shirt"
          format="hex"
          value={shirtColor}
          onChange={setShirtColor}
        />

        <ColorInput
          label="Pants"
          format="hex"
          value={pantsColor}
          onChange={setPantsColor}
        />

        <ColorInput
          label="Shoes"
          format="hex"
          value={shoesColor}
          onChange={setShoesColor}
        />
      </Stack>
      <Button type="submit">Save Avatar</Button>
      <Text>{msg}</Text>
    </form>
  );
};
