import { GameState } from "@/types";

export const INITIAL_SETTINGS = {
  jumpVelocity: 0.3,
  obstacleSpeed: 0.001,
  gravity: -0.01,
  gameState: GameState.NotStarted,
  score: 0,
  spawnMin: 1000,
  spawnMax: 2000,
};
