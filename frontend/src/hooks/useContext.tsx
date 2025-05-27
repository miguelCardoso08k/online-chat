import { AlertLogoutContext } from "@/context/AlertLogout";
import { AuthLayoutContext } from "@/context/AuthLayout";
import { ConversationContext } from "@/context/Conversation";
import { MainLayoutContext } from "@/context/MainLayout";
import { UserContext } from "@/context/User";
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

export const useConversationContext = () => {
  const context = useContext(ConversationContext);

  if (!context)
    throw new Error(
      "useConversationContext must be used within a MainLayoutProvider"
    );

  return context;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within a MainLayoutProvider");

  return context;
};

export const useAlertLogout = () => {
  const context = useContext(AlertLogoutContext);

  if (!context)
    throw new Error("useUserContext must be used within a MainLayoutProvider");

  return context;
};
