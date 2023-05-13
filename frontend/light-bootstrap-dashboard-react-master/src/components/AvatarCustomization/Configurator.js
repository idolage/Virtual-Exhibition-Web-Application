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
import Alert from "react-bootstrap/Alert";

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

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/avatars/", {
        method: "PUT",
        body: JSON.stringify({
          avatarId: localStorage.getItem("avatarId"),
          bottomColor: pantsColor,
          topColor: shirtColor,
          shoeColor: shoesColor,
          hairColor: hairColor,
          skinColor: skinColor,
          userId: localStorage.getItem("email"),
        }),
        headers: {
          Authorization: localStorage.getItem("jwt"),

          "Content-type": "application/json; charset=UTF-8",
        },

      });
      if (!response.ok) {
        setMsg("Failed to Save the Avatar");
        throw new Error("Failed to save avatar.");
        setErr("error");
      }
      setMsg("Avatar Saved Successfully");
      setErr("success");
    } catch (err) {
      setMsg("Failed to Save the Avatar");
      setErr("error");
      console.log(err.message);
    }
  };

  return (
    <div>
      {err === "error" ? (
        <Alert style={{ backgroundColor: "#ef5350", color: "white" }}>
          {msg}
        </Alert>
      ) : err === "success" ? (
        <Alert style={{ backgroundColor: "#66bb6a", color: "white" }}>
          {msg}
        </Alert>
      ) : null}

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
      </form>
    </div>
  );
};
