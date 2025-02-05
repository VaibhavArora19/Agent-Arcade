import { useMutation } from "@tanstack/react-query";

type TAgentArgs = {
  agentName: string;
  agentDescription: string;
  sdk?: string;
  chain?: string;
  agentType?: string;
  task?: string;
};

export const useCreateAgent = () => {
  const createAgent = async (agentArgs: TAgentArgs) => {
    const data = await fetch("/create-agent", {
      method: "POST",
      body: JSON.stringify(agentArgs),
    });

    const response = await data.json();

    return response;
  };

  return useMutation({
    mutationKey: ["create_agent"],
    mutationFn: createAgent,
  });
};
