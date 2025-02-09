"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefiAgentForm from "./defi-agent-form";
import { Button } from "../ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import SocialAgentForm from "./social-agent-form";
import AICompanionForm from "./ai-companion-form";
import GameAgentForm from "./game-agent-form";
import { useRouter } from "next/navigation";

const TABS = [
  {
    name: "social",
    label: "Social Agent",
    component: <SocialAgentForm />,
  },
  {
    name: "defi",
    label: "DeFi Agent",
    component: <DefiAgentForm />,
  },
  {
    name: "companion",
    label: "AI companion",
    component: <AICompanionForm />,
  },
  {
    name: "game",
    label: "Game Agent",
    component: <GameAgentForm />,
  },
];

const CreateAgentForm = () => {
  const router = useRouter();

  return (
    <div className="pl-20">
      <div className="flex justify-between">
        <Button variant={"outline"} onClick={() => router.push("/")}>
          <IoMdArrowRoundBack />
          Back to dashboard
        </Button>
        <h1 className="text-3xl font-bold pr-16">Create Character</h1>
      </div>
      <Tabs defaultValue="social" className="mt-8">
        <TabsList>
          {TABS.map((tab) => {
            return (
              <TabsTrigger value={tab.name} key={tab.name} className="w-[13.7rem]">
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {TABS.map((tab) => {
          return (
            <TabsContent value={tab.name} key={tab.name}>
              {tab.component}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default CreateAgentForm;
