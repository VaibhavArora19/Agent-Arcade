"use client";

import { Terminal, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Step } from "../Create/ai-companion-form";

export function TerminalCard({ steps, currentStep }: { steps: Step[]; currentStep: number }) {
  const getStatusColor = (status: Step["status"]) => {
    switch (status) {
      case "pending":
        return "text-zinc-500";
      case "loading":
        return "text-yellow-500 animate-pulse";
      case "complete":
        return "text-green-500";
      case "error":
        return "text-red-500";
    }
  };

  const getStatusText = (status: Step["status"]) => {
    switch (status) {
      case "pending":
        return "$ Waiting...";
      case "loading":
        return "$ Processing...";
      case "complete":
        return "$ Done ✓";
      case "error":
        return "$ Failed ✗";
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 h-[33rem]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Terminal className="w-4 h-4" />
          <span>Token Generation</span>
        </div>
      </div>
      <div className="p-4 font-mono text-sm space-y-2">
        {steps.map((step, index) => (
          <div key={index} className={`flex items-start gap-2 ${getStatusColor(step.status)}`}>
            <span className="flex-none">{getStatusText(step.status)}</span>
            <span className="opacity-90">{step.text}</span>
          </div>
        ))}
        {currentStep < steps.length && (
          <div className="flex gap-2 text-zinc-400">
            <span>$</span>
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </Card>
  );
}
