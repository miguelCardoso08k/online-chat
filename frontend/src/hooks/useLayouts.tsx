import { AuthLayoutContext } from "@/context/AuthLayout";
import { useContext } from "react";

export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);
  if (!context) {
    throw new Error("useAuthLayout must be used within an AuthLayoutProvider");
  }
  return context;
};
