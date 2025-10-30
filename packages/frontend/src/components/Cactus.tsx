import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

interface Props {
  position: [number, number, number];
  imageNumber: number;
}

export function Cactus({ position, imageNumber }: Props) {
  const texture = useLoader(TextureLoader, `/cactus-${imageNumber}.png`);

  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
