import AgentDetails from "@/components/Dashboard/agent-details";
import AgentSummary from "@/components/Dashboard/agent-summary";
import DashboardHeading from "@/components/Dashboard/dashboard-heading";

export default function Home() {
  return (
    <div>
      <DashboardHeading />
      <AgentSummary />
      <AgentDetails />
    </div>
  );
}
