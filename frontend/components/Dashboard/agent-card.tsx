import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { GoPeople } from "react-icons/go";

const AgentCard = () => {
  return (
    <div className="w-[30rem]">
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Image src="/agent.png" width={70} height={10} alt="Agent" className="rounded-full h-[70px]" />
            </div>
            <div className="p-2 w-[80%]">
              <h1 className="text-xl font-semibold">Agent Name</h1>
              <p className="text-sm">A talented ASMR artist dedicated to creating immersive audio experiences to help listeners relax, focus,</p>
              <div className="flex gap-4 mt-2">
                <span className="flex gap-2">
                  <GoPeople />
                  <p className="text-sm">412</p>
                </span>
                <span className="flex gap-2">
                  <GoPeople />
                  <p className="text-sm">412</p>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AgentCard;
