import { ColorInput, Slider, Stack, Text, Title, Button } from "@mantine/core";
import { useState } from "react";

import { useStallCustomization } from "../../contexts/StallCustomizationContext";
import Axios from "axios";

import Alert from "react-bootstrap/Alert";

export const Configurator = ({ Id }) => {
  const { stallColor, setStallColor } = useStallCustomization();

  const [msg, setMsg] = useState([]);
  const [exhibitionId, setIexhibitionId] = useState("");

  const [msgUploadColor, setMsgUploadColor] = useState();
  const [msgUploadColorErr, setMsgUploadColorErr] = useState();
  //setIexhibitionId(Id);
  console.log(Id);
  const stallId = localStorage.getItem("stallId");
  console.log(stallId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(stallColor);
    // setStallColor(stallColor);
    const requestBody = {
      stallColor: stallColor,
    };
    const params = new URLSearchParams();
    params.append("stallId", stallId);
    Axios.put(
      `http://localhost:8080/api/stalls/update-stall/${Id}?${params.toString()}`,
      requestBody
    )
      .then((res) => {
        setMsgUploadColor("Successfully Saved");
        // alert("Successfully Uploaded");
      })
      .catch((e) => {
        console.log(e);
        setMsgUploadColorErr("Failed to Save");

        // alert("Upload Fail");
      });
  };

  return (
    <>
      {msgUploadColor ? (
        <div className="row">
          <Alert variant="success">{msgUploadColor}</Alert>
        </div>
      ) : (
        <div></div>
      )}

      {msgUploadColorErr ? (
        <div className="row">
          <Alert variant="danger">{msgUploadColorErr}</Alert>
        </div>
      ) : (
        <div></div>
      )}

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
    </>
  );
};
