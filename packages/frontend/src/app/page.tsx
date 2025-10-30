"use client";

import { Game } from "@/components";
import { SettingsProvider } from "@/store";

export default function Home() {
  return (
    <SettingsProvider>
      <Game />
    </SettingsProvider>
  );
}
