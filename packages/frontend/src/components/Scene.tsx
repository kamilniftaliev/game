import { useFrame, useLoader } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { TextureLoader } from "three";
import { useKeyPress, useSettings } from "@/hooks";
import { GameState, type Obstacle } from "@/types";
import { random } from "@/utils";
import { Cactus } from "./Cactus";
import { Ground } from "./Ground";
import { HUD } from "./Hud";
import { Runner } from "./Runner";

interface Props {
  onGameOver: (score: number) => void;
}

export function Scene({ onGameOver }: Props) {
  const {
    gameState,
    jumpVelocity,
    score,
    gravity,
    obstacleSpeed,
    spawnMin,
    spawnMax,
    updateSettings,
  } = useSettings();
  const dinoRef = useRef({ x: -4, y: 0 });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const lastSpawn = useRef(performance.now());
  const spawnTimeout = useRef(random(spawnMin, spawnMax));
  const vel = useRef(0);

  const jump = useCallback(() => {
    if (gameState === GameState.Over) return;

    if (gameState !== GameState.Playing) {
      updateSettings({ gameState: GameState.Playing });
    }

    if (Math.abs(dinoRef.current.y) < 0.0001) {
      vel.current = jumpVelocity;
    }
  }, [jumpVelocity, gameState, updateSettings]);

  useKeyPress("Space", jump);
  useKeyPress("ArrowUp", jump);

  useFrame((_, delta) => {
    if (gameState === GameState.Over) return;

    const now = performance.now();
    if (
      gameState === GameState.Playing &&
      now - lastSpawn.current > spawnTimeout.current
    ) {
      const id = Math.random().toString(36).slice(2, 9);
      setObstacles((o) => [
        ...o,
        { id, x: 7, y: 0.7, imageNumber: Math.floor(random(1, 9)) },
      ]);
      lastSpawn.current = now;
      spawnTimeout.current = random(spawnMin, spawnMax);
    }

    vel.current += gravity * delta * 60;
    dinoRef.current.y += vel.current * delta * 60;
    if (dinoRef.current.y < 0) {
      dinoRef.current.y = 0;
      vel.current = 0;
    }

    setObstacles((prev) => {
      const next = prev
        .map((obs) => ({
          ...obs,
          x: obs.x - obstacleSpeed * delta * 60 * 100,
          imageNumber: obs.imageNumber || Math.floor(random(1, 9)),
        }))
        .filter((obs) => obs.x > -10);

      for (const obs of next) {
        const dx = obs.x - dinoRef.current.x;
        const overlapX = Math.abs(dx) < 0.6 + 0.3;
        const overlapY = dinoRef.current.y < 0.8;

        if (overlapX && overlapY && gameState === GameState.Playing) {
          updateSettings({ gameState: GameState.Over });
          onGameOver(score);
        }
      }

      return next;
    });

    if (gameState === GameState.Playing) {
      const newScore = parseFloat((score + 0.1).toFixed(1));

      updateSettings({ score: newScore });
    }
  });

  // Preload all cactus textures to avoid flickering
  useLoader(TextureLoader, `/cactus-1.png`);
  useLoader(TextureLoader, `/cactus-2.png`);
  useLoader(TextureLoader, `/cactus-3.png`);
  useLoader(TextureLoader, `/cactus-4.png`);
  useLoader(TextureLoader, `/cactus-5.png`);
  useLoader(TextureLoader, `/cactus-6.png`);
  useLoader(TextureLoader, `/cactus-7.png`);
  useLoader(TextureLoader, `/cactus-8.png`);
  useLoader(TextureLoader, `/cactus-9.png`);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />

      <Runner position={[dinoRef.current.x, dinoRef.current.y + 0.27, 0]} />
      {obstacles.map((obs) => (
        <Cactus
          key={obs.id}
          position={[obs.x, obs.y, 0]}
          imageNumber={obs.imageNumber}
        />
      ))}
      <Ground />
      <HUD />
    </>
  );
}
