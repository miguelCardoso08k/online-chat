import { AlertLogoutContext } from "@/context/AlertLogout";
import { ReactNode, useState } from "react";

export default function AlertLogoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertLogoutContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertLogoutContext.Provider>
  );
}
