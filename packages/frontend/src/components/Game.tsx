"use client";

import { Canvas } from "@react-three/fiber";
import { type ChangeEvent, useCallback, useState } from "react";
import { NoToneMapping, SRGBColorSpace } from "three";
import { Button, Scene, TopScores } from "@/components";
import { api } from "@/constants";
import { useSettings } from "@/hooks";
import { GameState } from "@/types";

export function Game() {
  const { gameState, score, updateSettings, ...settings } = useSettings();
  const [name, setName] = useState("");
  const isNameValid = name.trim().length >= 3;

  const isGameOver = gameState === GameState.Over;

  const handleGameOver = useCallback(
    (score: number) => {
      updateSettings({ gameState: GameState.Over, score });
    },
    [updateSettings]
  );

  const restart = () => window.location.reload();

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replaceAll(/[^a-zA-Z0-9]/g, ""));
  }, []);

  const save = async () => {
    if (!isNameValid) return;

    const response = await api.post("/save", {
      name,
      score: Math.floor(score),
      settings,
    });

    if (response.status === 200) {
      localStorage.setItem("userId", response.data[0].id);
      restart();
    } else {
      console.error("Failed to save score");
    }
  };

  return (
    <div className="flex flex-col gap-4 fixed inset-0 items-center justify-center">
      {isGameOver && (
        <form
          onSubmit={save}
          className="absolute z-50 inset-0 flex items-center justify-center pointer-events-auto bg-black/50"
        >
          <div className="flex flex-col gap-6 w-1/4 bg-black/80 text-white text-center p-6 rounded-md">
            <div className="text-xl font-bold">Game Over</div>
            <span className="text-lg">Score: {Math.floor(score)}</span>
            <input
              className="bg-white text-black py-2 px-4 focus:outline-0 rounded-md"
              type="text"
              value={name}
              placeholder="Enter your name to save your score"
              onChange={handleNameChange}
            />
            <div className="flex gap-4 w-full justify-between">
              <Button
                type="submit"
                disabled={!isNameValid}
                className="flex-1"
                onClick={save}
              >
                Save
              </Button>
              <Button className="flex-1" onClick={restart}>
                Restart
              </Button>
            </div>
          </div>
        </form>
      )}
      <Canvas
        orthographic
        camera={{ zoom: 80, position: [0, 0, 10] }}
        className="z-10"
        onCreated={({ gl }) => {
          gl.toneMapping = NoToneMapping;
          gl.outputColorSpace = SRGBColorSpace;
        }}
      >
        <Scene onGameOver={handleGameOver} />
      </Canvas>

      <TopScores />
    </div>
  );
}
