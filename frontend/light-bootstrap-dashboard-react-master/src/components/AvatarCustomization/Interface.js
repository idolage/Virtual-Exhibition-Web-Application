import {
  useAvatarCustomization,
} from "../../contexts/AvatarCustomizationContext";
import { Configurator } from "./Configurator";

const Interface = () => {
  const { saveAvtarCustomization } = useAvatarCustomization();
  return (
    <>
      <div  className="mx-4 mt-lg-5">
        <Configurator />
      </div>
    </>
  );
};
export default Interface;
