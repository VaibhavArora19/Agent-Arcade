import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentCards from "./agent-cards";

const AgentDetails = () => {
  return (
    <div className="pl-8 my-8">
      <Tabs defaultValue="social">
        <TabsList>
          <TabsTrigger value="social">Social Agents</TabsTrigger>
          <TabsTrigger value="defi">DeFi Agents</TabsTrigger>
          <TabsTrigger value="companion">AI companions</TabsTrigger>
          <TabsTrigger value="game">Game Agents</TabsTrigger>
        </TabsList>
        <TabsContent value="social" className="mt-8">
          <AgentCards />
        </TabsContent>
        <TabsContent value="defi">Change your defi here.</TabsContent>
        <TabsContent value="companion">Change your companion here.</TabsContent>
        <TabsContent value="game">Change your game here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetails;
