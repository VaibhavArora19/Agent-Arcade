"use client";

import { AgentSchema } from "@/schema/agent-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useCreateAgent } from "@/hooks/server/useCreateAgent";
import { TerminalCard } from "../terminal/terminal-card";
import { useState } from "react";

interface Step {
  text: string;
  status: "pending" | "loading" | "complete" | "error";
}

const SocialAgentForm = () => {
  const { mutateAsync } = useCreateAgent();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    { text: "Initializing deployment...", status: "pending" },
    { text: "Creating smart contract...", status: "pending" },
    { text: "Deploying token to testnet...", status: "pending" },
    { text: "Verifying contract on Etherscan...", status: "pending" },
    { text: "Generating documentation...", status: "pending" },
    { text: "Creating agent...", status: "pending" },
    { text: "Containerizing agent..", status: "pending" },
  ]);

  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
  });

  async function onSubmit(values: z.infer<typeof AgentSchema>) {
    console.log("values are: ", values);

    await mutateAsync({ ...values, agentType: "social" });
  }

  const createTokenHandler = async () => {
    while (steps[currentStep].text !== "Deploying token to testnet...") {
      // Set current step to loading
      setSteps((prev) => prev.map((step, i) => (i === currentStep ? { ...step, status: "loading" } : step)));

      // Simulate process completion
      const timer = setTimeout(() => {
        setSteps((prev) => prev.map((step, i) => (i === currentStep ? { ...step, status: Math.random() > 0.1 ? "complete" : "error" } : step)));
        setCurrentStep((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }

    //!deploy contract here

    setSteps((prev) => prev.map((step, i) => (i === currentStep ? { ...step, status: "complete" } : step)));
  };
  return (
    <div className="flex gap-10 min-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[60%] border-[1px] p-4 mt-4 rounded-lg border-gray-900">
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Agent name" {...field} />
                </FormControl>
                <FormDescription>This is your agent display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Description</FormLabel>
                <FormControl>
                  <Input placeholder="Agent bio" {...field} />
                </FormControl>
                <FormDescription>Mention what this agent can do.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sdk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SDK</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the SDK" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="agent-kit">Coinbase Agent kit</SelectItem>
                    <SelectItem value="covalent">Covalent</SelectItem>
                    <SelectItem value="eliza">Eliza OS</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the SDK you want to use to create agent(optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chain</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the Chain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="flow">Flow</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the chain you want to deploy your agent on(flow default)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="knowledge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Tasks</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter the knowledge of agent seperated by comma." {...field} />
                </FormControl>
                <FormDescription>Select the tasks which this agent should perform specifically.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit" className="w-full text-sm" onClick={createTokenHandler}>
              Create Token
            </Button>
            <Button type="submit" className="w-full text-sm">
              Create Agent
            </Button>
          </div>
        </form>
      </Form>
      <div className=" w-[25%] pt-4">
        <TerminalCard steps={steps} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default SocialAgentForm;
