"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefiAgentForm from "./defi-agent-form";
import { Button } from "../ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import SocialAgentForm from "./social-agent-form";
import AICompanionForm from "./ai-companion-form";
import GameAgentForm from "./game-agent-form";

const CreateAgentForm = () => {
  return (
    <div className="pl-20">
      <div className="flex justify-between">
        <Button variant={"outline"}>
          <IoMdArrowRoundBack />
          Back to dashboard
        </Button>
        <h1 className="text-3xl font-bold pr-16">Create Character</h1>
      </div>
      <Tabs defaultValue="social" className="mt-8">
        <TabsList>
          <TabsTrigger value="social" className="w-[15rem]">
            Social Agent
          </TabsTrigger>
          <TabsTrigger value="defi" className="w-[15rem]">
            Defi Agent
          </TabsTrigger>
          <TabsTrigger value="companion" className="w-[15rem]">
            AI companion
          </TabsTrigger>
          <TabsTrigger value="game" className="w-[15rem]">
            Game Agent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="social">
          <SocialAgentForm />
        </TabsContent>
        <TabsContent value="defi">
          <DefiAgentForm />
        </TabsContent>
        <TabsContent value="companion">
          <AICompanionForm />
        </TabsContent>
        <TabsContent value="game">
          <GameAgentForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateAgentForm;
