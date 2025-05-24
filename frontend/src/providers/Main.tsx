import { MainLayoutContext } from "@/context/MainLayout";
import { ReactNode, useState } from "react";
import { Atom, LucideProps } from "lucide-react";

export default function MainLayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [Icon, setIcon] = useState<React.FC<LucideProps>>(() => Atom);
  const [Title, setTitle] = useState<string>("Title");

  return (
    <MainLayoutContext.Provider value={{ Icon, setIcon, Title, setTitle }}>
      {children}
    </MainLayoutContext.Provider>
  );
}
