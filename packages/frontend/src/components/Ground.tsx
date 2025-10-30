interface Props {
  position?: [number, number, number];
}

export function Ground({ position = [0, -0.35, 0] }: Props) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[20, 0.7, 1]} />
      <meshStandardMaterial color="#0c803d" />
    </mesh>
  );
}
