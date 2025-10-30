import { Html } from "@react-three/drei";
import { INITIAL_SETTINGS } from "@/constants";
import { useSettings } from "@/hooks";
import { GameState } from "@/types";
import { cn } from "@/utils";
import { Button } from "./Button";
import { NumberInput } from "./NumberInput";

export function HUD() {
  const {
    gameState,
    score,
    spawnMin,
    spawnMax,
    gravity,
    jumpVelocity,
    obstacleSpeed,
    updateSettings,
  } = useSettings();

  const started = gameState !== GameState.NotStarted;

  return (
    <Html className="h-screen w-screen p-6" center>
      <div className="flex justify-between text-green-900 items-start gap-4 w-full">
        <div className="flex flex-col gap-4 shrink-0">
          <NumberInput
            label="Jump Velocity"
            value={jumpVelocity}
            step={0.1}
            max={0.5}
            onChange={(jumpVelocity) => updateSettings({ jumpVelocity })}
          />
          <NumberInput
            label="Speed"
            value={obstacleSpeed}
            step={0.001}
            max={0.005}
            onChange={(obstacleSpeed) => updateSettings({ obstacleSpeed })}
          />
          <NumberInput
            label="Min. time to spawn trees (ms)"
            value={spawnMin}
            step={200}
            max={spawnMax}
            onChange={(spawnMin) => updateSettings({ spawnMin })}
          />
          <NumberInput
            label="Max. time to spawn trees (ms)"
            value={spawnMax}
            step={200}
            min={spawnMin}
            max={4000}
            onChange={(spawnMax) => updateSettings({ spawnMax })}
          />
          <NumberInput
            label="Gravity"
            value={gravity}
            step={0.01}
            min={-0.03}
            max={-0.01}
            onChange={(gravity) => updateSettings({ gravity })}
          />
          <Button onClick={() => updateSettings(INITIAL_SETTINGS)}>
            Reset Settings
          </Button>
        </div>

        <div
          className={cn(
            "bg-green-100 rounded-full px-4 py-2 text-black font-sans text-sm",
            started ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex items-center justify-between w-96">
            <p className="text-center text-green-900 text-lg font-normal w-full">
              Press Space or Arrow Up to start
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 w-64 bg-green-100 py-2 pl-4 pr-3 rounded-full">
          <span className="text-green-900 font-bold">Score</span>
          <span className="bg-green-900 text-white rounded-full py-0.5 px-4 font-bold">
            {Math.floor(score)}
          </span>
        </div>
      </div>
    </Html>
  );
}
