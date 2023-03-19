import { ColorInput, Slider, Stack, Text, Title, Button } from "@mantine/core";
import { useState } from "react";

import { useStallCustomization } from "../../contexts/StallCustomizationContext";

export const Configurator = () => {
  const { stallColor, setStallColor } = useStallCustomization();

  const [msg, setMsg] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(stallColor);
    //  try {
    //    const response = await fetch("http://localhost:8080/api/avatars/", {
    //      method: "POST",
    //      body: JSON.stringify({
    //        avatarId: "2",
    //        bottomColor: pantsColor,
    //        topColor: shirtColor,
    //        shoeColor: shoesColor,
    //        hairColor: hairColor,
    //        skinColor: skinColor,
    //        gender: "Female",
    //        userId: "hansijk@gmail.com",
    //      }),
    //      headers: {
    //        "Content-type": "application/json; charset=UTF-8",
    //      },
    //    });
    //    if (!response.ok) {
    //      throw new Error("Failed to save avatar.");
    //    }
    //    setMsg("Avatar Saved Successfully");
    //  } catch (err) {
    //    setMsg(err.message);
    //    console.log(err.message);
    //  }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Stack spacing={"sm"} py={"sm"}>
        <ColorInput
          label="StallColor"
          format="hex"
          value={stallColor}
          onChange={setStallColor}
        />
      </Stack>
      <Button type="submit">Save</Button>
      <Text>{msg}</Text>
    </form>
  );
};
