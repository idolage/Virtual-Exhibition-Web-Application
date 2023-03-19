import { ColorInput, Slider, Stack, Text, Title,Button } from "@mantine/core";
import { useState } from "react";

import {
  useStallCustomization,
} from "../../contexts/StallCustomizationContext";

export const Configurator = () => {
  const {
    stallColor,
    setStallColor
  } = useStallCustomization();

  const [msg, setMsg] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  
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
