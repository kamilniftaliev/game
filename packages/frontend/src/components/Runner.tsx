import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

interface Props {
  position: [number, number, number];
}

export function Runner({ position }: Props) {
  const texture = useLoader(TextureLoader, `/car.png`);

  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
