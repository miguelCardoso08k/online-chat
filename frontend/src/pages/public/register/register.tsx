import RegisterForm from "@/components/RegisterForm";
import { useAuthLayout } from "@/hooks/useContext";
import { useEffect } from "react";

export default function Register() {
  const { setWellcomeMessage } = useAuthLayout();

  useEffect(() => {
    setWellcomeMessage("ao chat-online");
  });

  return <RegisterForm />;
}
