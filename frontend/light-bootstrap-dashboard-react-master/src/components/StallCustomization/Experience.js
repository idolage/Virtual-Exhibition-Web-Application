import React, { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

import GoldStall from "./GoldStall";
import PlatinumStall from "./PlatinumStall";
import DiamondStall from "./DiamondStall";

const Experience = ({ stallType }) => {
  let stallComponent;

  const [goldModelScale, setGoldModelScale] = useState([1, 1, 1]);
  const [goldModelPosition, setGoldModelPosition] = useState([0, 0, 0.5]);

  const [platinumModelScale, setPlatinumModelScale] = useState([0.1, 0.1, 0.1]);
  const [platinumModelPosition, setPlatinumModelPosition] = useState([
    0, 0, 0.5,
  ]);

  const [diamondModelScale, setDiamondModelScale] = useState([0.1, 0.1, 0.1]);
  const [diamondModelPosition, setDiamondModelPosition] = useState([0, 0, 0.5]);

  switch (stallType) {
    case "Gold":
      stallComponent = (
        <GoldStall position={goldModelPosition} scale={goldModelScale} />
      );
      break;
    case "Platinum":
      stallComponent = (
        <PlatinumStall
          scale={platinumModelScale}
          position={platinumModelPosition}
        />
      );
      break;
    case "Diamond":
      stallComponent = (
        <DiamondStall
          position={diamondModelPosition}
          scale={diamondModelScale}
        />
      );
      break;
    default:
      stallComponent = null;
      break;
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log(width);
      if (width <= 600) {
        setGoldModelScale([1.2, 1.2, 1.2]);
        setPlatinumModelScale([0.05, 0.05, 0.05]);
        setPlatinumModelPosition([0, 0.7, 0.5]);
        setGoldModelPosition([0.2, 0, 0.5]);
        setDiamondModelScale([0.7, 0.7, 0.7]);
        setDiamondModelPosition([0, 0.7, 0.5]);
      } else if (width < 1200) {
        setGoldModelScale([1.2, 1.2, 1.2]);
        setPlatinumModelScale([0.09, 0.09, 0.09]);
        setPlatinumModelPosition([0, 0, 0.5]);
        setGoldModelPosition([0.2, 0, 0.5]);
        setDiamondModelScale([0.7, 0.7, 0.7]);
        setDiamondModelPosition([0, 0.5, 0.5]);
      } else if (width < 1500) {
        setGoldModelScale([1.5, 1.5, 1.5]);
        setPlatinumModelScale([0.1, 0.1, 0.1]);
        setPlatinumModelPosition([0, 0, 0.5]);
        setGoldModelPosition([0.2, 0, 0.5]);
        setDiamondModelScale([1, 1, 1]);
        setDiamondModelPosition([0, 0.5, 0.5]);
      } else {
        setGoldModelScale([1.8, 1.8, 1.8]);
        setPlatinumModelScale([0.12, 0.12, 0.12]);
        setPlatinumModelPosition([0, 0, 0.5]);
        setGoldModelPosition([0, 0, 0.5]);
        setDiamondModelScale([1.3, 1.3, 1.3]);
        setDiamondModelPosition([0, 0.5, 0.5]);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial scale based on window width
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <group>
        {stallComponent}
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, 1, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
