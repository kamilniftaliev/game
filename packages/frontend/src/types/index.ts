export type Obstacle = {
  id: string;
  x: number;
  y: number;
  imageNumber: number;
};

export enum GameState {
  NotStarted = "not-started",
  Playing = "playing",
  Over = "over",
}
