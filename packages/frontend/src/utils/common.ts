import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.random() * 20;
  const lightness = 25 + Math.random() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function random(a: number, b: number) {
  return Math.random() * (b - a) + a;
}
