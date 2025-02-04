"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefiAgentForm from "./defi-agent-form";
import { Button } from "../ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import TerminalComponent from "./terminal-component";

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
          <TabsTrigger value="social">Social Agent</TabsTrigger>
          <TabsTrigger value="defi" className="w-[25%]">
            Defi Agent
          </TabsTrigger>
          <TabsTrigger value="companion" className="w-[25%]">
            AI companion
          </TabsTrigger>
          <TabsTrigger value="game" className="w-[25%]">
            Game Agent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="social">Make changes to your account here.</TabsContent>
        <TabsContent value="defi">
          <div className="flex gap-8">
            <DefiAgentForm />
          </div>
        </TabsContent>
        <TabsContent value="companion">Change your password here.</TabsContent>
        <TabsContent value="game">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateAgentForm;
