
import { Configurator } from "./Configurator";

const Interface = ({exhibitionId}) => {
  const exId = exhibitionId;
  return (
    <>
      <div  className="mx-4 mt-lg-5">
        <Configurator Id={exId} />
      </div>
    </>
  );
};
export default Interface;
