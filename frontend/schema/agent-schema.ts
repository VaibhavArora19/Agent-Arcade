import { z } from "zod";

export const AgentSchema = z.object({
  agentName: z.string({ message: "Agent name is required" }),
  agentBio: z.string({ message: "Agent bio is required" }),
  chain: z.string({ message: "Chain is required" }).optional(),
  sdk: z.string({ message: "SDK is required" }).optional(),
  knowledge: z.string({ message: "Task is required" }).optional(),
});
