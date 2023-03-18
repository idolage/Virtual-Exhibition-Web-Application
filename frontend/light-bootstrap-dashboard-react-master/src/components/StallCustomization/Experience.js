
import {
  Backdrop,
  BakeShadows,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PresentationControls,
  Stage,
  useGLTF,
} from "@react-three/drei";

import GoldStall from "./GoldStall";

const Experience = () => {


  

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
      <group position={[0, 0, 0]} scale={[2,2,2]}>
        <GoldStall/>
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
