import { createContext } from "react";

export type AuthLayoutContextType = {
  wellcomeMessage: string;
  setWellcomeMessage: (message: string) => void;
};

export const AuthLayoutContext = createContext<AuthLayoutContextType | null>(null);
