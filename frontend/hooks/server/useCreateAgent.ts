import { useMutation } from "@tanstack/react-query";

type TAgentArgs = {
  agentName: string;
  agentBio: string;
  sdk?: string;
  chain?: string;
  agentType?: string;
  knowledge?: string;
};

export const useCreateAgent = () => {
  const createAgent = async (agentArgs: TAgentArgs) => {
    const knowledgeArray = agentArgs.knowledge?.split(",").map((item) => item.trim());

    const data = await fetch("/create-agent/flow", {
      method: "POST",
      body: JSON.stringify({ ...agentArgs, knowledge: knowledgeArray }),
    });

    const response = await data.json();

    return response;
  };

  return useMutation({
    mutationKey: ["create_agent"],
    mutationFn: createAgent,
  });
};
