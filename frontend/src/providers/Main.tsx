import { MainLayoutContext } from "@/context/MainLayout";
import { ReactNode, useState } from "react";

export default function MainLayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [icon, setIcon] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <MainLayoutContext.Provider
      value={{ icon, setIcon, title, setTitle, content, setContent }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
}
