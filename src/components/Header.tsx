import { Button } from "@/components/ui/button";
import { BrainCog, Settings } from "lucide-react";
import React from "react";

const MobileHeader = () => {
  return (
    <header className="md:hidden flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center space-x-2">
        <BrainCog className="h-6 w-6" />
        <span className="font-bold text-xl">TaskAI</span>
      </div>
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default MobileHeader;
