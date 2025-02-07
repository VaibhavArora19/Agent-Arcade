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

const DefiAgentForm = () => {
  const { mutateAsync } = useCreateAgent();

  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
  });

  async function onSubmit(values: z.infer<typeof AgentSchema>) {
    await mutateAsync({ ...values, agentType: "defi" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[1500px] border-[1px] p-4 mt-4 rounded-lg border-gray-900">
        <FormField
          control={form.control}
          name="agentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your agent display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agentDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Tasks</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormDescription>Select the tasks which this agent should perform specifically.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-sm">
          Create Agent
        </Button>
      </form>
    </Form>
  );
};

export default DefiAgentForm;
