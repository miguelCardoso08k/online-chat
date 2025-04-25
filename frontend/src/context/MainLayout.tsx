import { createContext, ReactNode } from "react";

export type MainLayoutType = {
  icon: string;
  setIcon: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  content: ReactNode;
  setContent: (content: ReactNode) => void;
};

export const MainLayoutContext = createContext<MainLayoutType | null>(null);
