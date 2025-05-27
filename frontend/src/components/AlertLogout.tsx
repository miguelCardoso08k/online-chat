import Cookies from "js-cookie";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { User } from "@/api/api";
import { useAlertLogout } from "@/hooks/useContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function AlertLogout() {
  const { open, setOpen } = useAlertLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwt = Cookies.get("token")!;
    const res = await User.logout(jwt);
    console.log(res);
    if (res.ok) {
      Cookies.remove("token");
      navigate("/auth/signin");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja encerrar a sessão?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao encerrar a sessão, seus dados ficaram salvos e outros usuários
            poderão te enviar mensagens normalmente.
            <br />
            Para acessar sua conta novamente, será necessário informar suas
            credenciais novamente.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleLogout}>
                Sair
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
