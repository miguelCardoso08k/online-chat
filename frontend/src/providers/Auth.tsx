import { AuthLayoutContext } from "@/context/AuthLayout";
import { ReactNode, useState } from "react";

export function AuthLayoutProvider({ children }: { children: ReactNode }) {
  const [wellcomeMessage, setWellcomeMessage] = useState("");

  return (
    <AuthLayoutContext.Provider value={{ wellcomeMessage, setWellcomeMessage }}>
      {children}
    </AuthLayoutContext.Provider>
  );
}
