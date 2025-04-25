import { AuthLayoutContext } from "@/context/AuthLayout";
import { MainLayoutContext } from "@/context/MainLayout";
import { useContext } from "react";

export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);
  if (!context) {
    throw new Error("useAuthLayout must be used within an AuthLayoutProvider");
  }
  return context;
};

export const useMainLayout = () => {
  const context = useContext(MainLayoutContext);

  if (!context)
    throw new Error("useMainLayout must be used within a MainLayoutProvider");

  return context;
};
