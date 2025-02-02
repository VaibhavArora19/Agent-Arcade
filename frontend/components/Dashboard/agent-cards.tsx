import AgentCard from "./agent-card";

const DUMMY_DATA = [
  {
    name: "Agent Name",
    description: "A talented ASMR artist dedicated to creating immersive audio experiences to help listeners relax, focus.",
    contractAddress: "0x3D6A...66A5",
  },
];

const AgentCards = () => {
  return (
    <div>
      {DUMMY_DATA.map((data) => {
        return <AgentCard key={data.contractAddress} name={data.name} description={data.description} contractAddress={data.contractAddress} />;
      })}
    </div>
  );
};

export default AgentCards;
