"use client";

import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DashboardHeading = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between px-16 my-6">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h3 className="text-gray-200 mt-2">Manage your AI agents with ease</h3>
      </div>
      <div>
        <Button onClick={() => router.push("/create")}>
          <FiPlus />
          Create Agent
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeading;
