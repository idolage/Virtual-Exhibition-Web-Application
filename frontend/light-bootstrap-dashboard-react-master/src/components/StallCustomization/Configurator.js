import { ColorInput, Slider, Stack, Text, Title, Button } from "@mantine/core";
import { useState } from "react";

import { useStallCustomization } from "../../contexts/StallCustomizationContext";
import Axios from 'axios';
export const Configurator = ({Id}) => {
  const { stallColor, setStallColor } = useStallCustomization();

  const [msg, setMsg] = useState([]);
  const [exhibitionId, setIexhibitionId] = useState('');

  //setIexhibitionId(Id);
  console.log(Id);
  const stallId = localStorage.getItem('stallId');
  console.log(stallId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(stallColor);
    // setStallColor(stallColor);
    const requestBody = {
      stallColor: stallColor
    };
    const params = new URLSearchParams();
    params.append('stallId', stallId);
    Axios.put(
      `http://localhost:8080/api/stalls/update-stall/${Id}?${params.toString()}`,requestBody
    )
      .then((res) => {
        alert("Successfully Uploaded");
  
      })
      .catch((e) => {
        console.log(e);
        alert("Upload Fail");
      });
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
