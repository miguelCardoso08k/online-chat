import { createContext } from "react";

export type AlertLogoutContextType = {
  open: boolean;
  setOpen: (status: boolean) => void;
};

export const AlertLogoutContext = createContext<AlertLogoutContextType | null>(
  null
);
