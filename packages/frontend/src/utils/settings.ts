import { INITIAL_SETTINGS } from "@/constants";
import { GameState } from "@/types";

export function getInitialSettings() {
  if (typeof localStorage === "undefined") return INITIAL_SETTINGS;

  try {
    const storedSettings = localStorage.getItem("settings");

    if (storedSettings) {
      const parsedSettings = JSON.parse(
        storedSettings
      ) as typeof INITIAL_SETTINGS;

      return {
        ...parsedSettings,
        gameState: GameState.NotStarted,
        score: 0,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return INITIAL_SETTINGS;
}
