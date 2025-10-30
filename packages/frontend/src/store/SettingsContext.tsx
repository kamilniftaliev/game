"use client";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { INITIAL_SETTINGS } from "@/constants";
import { getInitialSettings } from "@/utils";

export const SettingsContext = createContext<
  typeof INITIAL_SETTINGS & {
    updateSettings: (newSettings: Partial<typeof INITIAL_SETTINGS>) => void;
  }
>({
  ...INITIAL_SETTINGS,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState(getInitialSettings());

  const updateSettings = useCallback(
    (newSettings: Partial<typeof settings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...newSettings };

        localStorage.setItem("settings", JSON.stringify(next));

        return next;
      });
    },
    []
  );

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
