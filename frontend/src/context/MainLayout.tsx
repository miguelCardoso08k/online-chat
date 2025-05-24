import { LucideProps } from "lucide-react";
import { createContext } from "react";

export type MainLayoutType = {
  Icon: React.FC<LucideProps>;
  setIcon: (icon: React.FC<LucideProps>) => void;
  Title: string;
  setTitle: (title: string) => void;
};

export const MainLayoutContext = createContext<MainLayoutType | null>(null);
