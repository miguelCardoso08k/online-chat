import { UserContext } from "@/context/User";
import { User } from "@/schemas/user";
import { ReactNode, useState } from "react";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
