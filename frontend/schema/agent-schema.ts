import { z } from "zod";

export const AgentSchema = z.object({
  agentName: z.string({ message: "Agent name is required" }),
  agentDescription: z.string({ message: "Agent description is required" }),
  chain: z.string({ message: "Chain is required" }).optional(),
  sdk: z.string({ message: "SDK is required" }).optional(),
  task: z.string({ message: "Task is required" }).optional(),
});
