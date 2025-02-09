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
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, BYTECODE } from "@/constants";
import { Loader2 } from "lucide-react";

interface Step {
  text: string;
  status: "pending" | "loading" | "complete" | "error";
}

const DefiAgentForm = () => {
  const { mutateAsync } = useCreateAgent();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    { text: "Initializing deployment...", status: "pending" },
    { text: "Creating smart contract...", status: "pending" },
    { text: "Deploying token to testnet...", status: "pending" },
    { text: "Verifying contract on Etherscan...", status: "pending" },
    { text: "Creating agent...", status: "pending" },
    { text: "Containerizing agent..", status: "pending" },
  ]);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentStep >= steps.length || steps[currentStep].text === "Creating agent..." || !start) {
      return;
    }

    const timer = setTimeout(() => {
      setSteps((prevSteps) => prevSteps.map((step, i) => (i === currentStep ? { ...step, status: "complete" } : step)));
      setCurrentStep((prev) => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentStep, steps, start]);

  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
  });

  async function onSubmit(values: z.infer<typeof AgentSchema>) {
    // await mutateAsync({ ...values, agentType: "defi" });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }
  const createTokenHandler = async () => {
    //@ts-expect-error nothing bro don;t worry
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(ABI, BYTECODE, signer);

    const contract = await factory.deploy("tt", "tt", 18);

    setStart(true);
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
                  <Textarea placeholder="Agent bio" {...field} />
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
            {loading ? (
              <Button disabled className="w-full text-sm">
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full text-sm">
                Create Agent
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className=" w-[25%] pt-4">
        <TerminalCard steps={steps} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default DefiAgentForm;
