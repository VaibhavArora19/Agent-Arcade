import AgentCard from "./agent-card";

const DUMMY_DATA = [
  {
    name: "Chill girl",
    description: "A talented ASMR artist dedicated to creating immersive audio experiences to help listener focus.",
    contractAddress: "0x3D6A...66A5",
    category: "Social",
    image: "/agent.png",
  },
  {
    name: "Defi DUDE",
    description: "A skilled trader and investor, proficient in the world of decentralized finance.",
    contractAddress: "0x5f6A...6b45",
    category: "DeFi",
    image: "/image2.jpg",
  },
  {
    name: "Beast Hunter",
    description: "Master of clutch moments, risky plays, and unnecessary taunts.",
    category: "Gaming",
    image: "/game.jpg",
    contractAddress: "0xac78...9d2b",
  },
  {
    name: "Degen bro",
    description: "Started DeFi trading with a ‘send it’ philosophy—research optional.",
    category: "Gaming",
    image: "/degen.jpg",
    contractAddress: "0x34c8...baf7",
  },
];

const AgentCards = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {DUMMY_DATA.map((data) => {
        return (
          <AgentCard
            key={data.contractAddress}
            name={data.name}
            description={data.description}
            contractAddress={data.contractAddress}
            category={data.category}
            image={data.image}
          />
        );
      })}
    </div>
  );
};

export default AgentCards;
