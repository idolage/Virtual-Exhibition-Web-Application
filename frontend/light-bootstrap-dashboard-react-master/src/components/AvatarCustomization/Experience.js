import { OrbitControls } from "@react-three/drei";
import Attendeefemaleavatar1 from "./Attendeefemaleavatar1";
import Attendeefemaleavatar2 from "./Attendeefemaleavatar2";
import Attendeemaleavatar1 from "./Attendeemaleavatar1";
import Attendeemaleavatar2 from "./Attendeemaleavatar2";


const Experience = ({ avatarId }) => {


  console.log(avatarId);

  let avatarComponent;

  switch (avatarId) {
    case "1":
      avatarComponent = <Attendeefemaleavatar1 />;
      break;
    case "2":
      avatarComponent = <Attendeefemaleavatar2 />;
      break;
    case "3":
      avatarComponent = <Attendeemaleavatar2 />;
      break;
    case "4":
      avatarComponent = <Attendeemaleavatar1 />;
      break;
    default:
      avatarComponent = null;
      break;
  }

  return (
    <>
      <OrbitControls enableZoom={false} />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 7]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group position={[0, -1, 0]} scale={[1.2, 1.2, 1.2]}>
        {avatarComponent}
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, 1, 0]} // changed the y-position to 1
        receiveShadow
      >
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
