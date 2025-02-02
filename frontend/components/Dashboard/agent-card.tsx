import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { Button } from "../ui/button";
import { MdDeleteOutline } from "react-icons/md";

type TProps = {
  name: string;
  description: string;
  contractAddress: string;
};

const AgentCard = (props: TProps) => {
  return (
    <div className="w-[32rem]  ">
      <Card className="hover:border-gray-500">
        <CardContent className="pt-4">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Image src="/agent.png" width={70} height={10} alt="Agent" className="rounded-full h-[70px]" />
            </div>
            <div className="p-2 w-[80%]">
              <h1 className="text-xl font-semibold">{props.name}</h1>
              <p className="text-sm">{props.description}</p>
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
        <p className="bg-secondary p-1 text-sm rounded-2xl block w-[7.5rem] ml-6 text-center">{props.contractAddress}</p>
        <CardFooter className="mt-4 border-t-2 border-gray-900 pt-4 gap-4">
          <Button variant={"outline"} className="w-[90%]">
            Chat
          </Button>
          <Button variant={"outline"}>
            <MdDeleteOutline className="text-red-700" size={20} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AgentCard;
