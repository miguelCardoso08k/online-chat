import LoginForm from "@/components/LoginForm";
import { useAuthLayout } from "@/hooks/useLayouts";
import { useEffect } from "react";

export default function Login() {
  const { setWellcomeMessage } = useAuthLayout();

  useEffect(() => {
    setWellcomeMessage("de volta");
  });

  return <LoginForm />;
}
