import { useAuthLayout } from "@/hooks/useContext";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  const { wellcomeMessage } = useAuthLayout();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[375px] bg-zinc-800 rounded-2xl shadow-lg p-6 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/">
            <div className="text-2xl font-extrabold">Logo</div>
          </Link>
          <h2 className="text-lg">Bem-vindo {wellcomeMessage}</h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
