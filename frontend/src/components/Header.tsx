import { useMainLayout } from "@/hooks/useContext";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  const { Icon, Title } = useMainLayout();
  return (
    <header className="bg-zinc-900 flex items-center relative">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
        <span>
          <Icon size={18} />
        </span>
        <h1 className="text-lg">{Title}</h1>
      </div>
    </header>
  );
}
