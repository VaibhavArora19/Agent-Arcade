import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GoPeople } from "react-icons/go";

const DUMMY_DATA = [
  {
    title: "Total Characters",
    value: 3,
    change: "+12%",
    icon: <GoPeople />,
  },
  {
    title: "Total Games",
    value: 1,
    change: "+6%",
    icon: <GoPeople />,
  },
  {
    title: "Total Defi",
    value: 1,
    change: "+6%",
    icon: <GoPeople />,
  },
  {
    title: "Total Social",
    value: 1,
    change: "+6%",
    icon: <GoPeople />,
  },
];

const AgentSummary = () => {
  return (
    <div className="px-16">
      <div className=" flex gap-8">
        {DUMMY_DATA.map((item) => {
          return (
            <Card key={item.title} className="w-[350px]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="flex gap-4">
                  <p className="text-4xl font-semibold">{item.value}</p>
                  <Button>{item.change}</Button>
                </div>
                <div>
                  <Button variant={"secondary"}>{item.icon}</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AgentSummary;
