import { User } from "@/schemas/user";
import { createContext, Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const UserContext = createContext<UserContextType | null>(null);
