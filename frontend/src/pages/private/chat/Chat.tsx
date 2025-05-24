import { Everyfriends, OnlineFriends } from "@/components/Friends";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMainLayout } from "@/hooks/useContext";
import { MessageCircle, Plus } from "lucide-react";
import { useEffect } from "react";

export default function Chat() {
  const { setIcon, setTitle } = useMainLayout();
  useEffect(() => {
    setIcon(MessageCircle);
    setTitle("Conversas");
  });

  return (
    <Tabs defaultValue="online" className="pt-2 px-2 w-full h-full">
      <TabsList className="w-full flex justify-between gap-2">
        <h1 className="text-white font-bold">Amigos</h1>
        <TabsTrigger value="online" className="data-[state=active]:!bg-chart-4">
          Online
        </TabsTrigger>
        <TabsTrigger value="every" className="data-[state=active]:!bg-chart-4">
          Todos
        </TabsTrigger>
        <Tooltip delayDuration={300}>
          <TooltipTrigger className="bg-chart-4 rounded-full p-1">
            <Plus color="white" size={20} />
          </TooltipTrigger>
          <TooltipContent>Adionar amigo</TooltipContent>
        </Tooltip>
      </TabsList>
      <TabsContent value="online">
        <OnlineFriends />
      </TabsContent>
      <TabsContent value="every">
        <Everyfriends />
      </TabsContent>
    </Tabs>
  );
}
