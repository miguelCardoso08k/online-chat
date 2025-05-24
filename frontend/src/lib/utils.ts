import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultAvatarUrl =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";
