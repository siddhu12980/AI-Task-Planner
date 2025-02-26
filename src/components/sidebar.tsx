"use client"

import { Button } from "@/components/ui/button";
import {
  BrainCog,
  CheckCircle2,
  Clock,
  ListTodo,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";

enum Screen {
  "Tasks",
  "AI_CHAT",
}

const Sidebar = ({setScreen}:{
  setScreen: (screen: Screen) => void
}) => {
  return (
    <div className="hidden md:flex w-64 flex-col bg-card border-r p-4">
      <div className="flex items-center space-x-2 mb-8">
        <BrainCog className="h-6 w-6" />
        <span className="font-bold text-xl">TaskAI</span>
      </div>

      <nav className="space-y-2 flex-1">
        <Button variant="ghost" className="w-full justify-start" asChild 
          onClick={() => setScreen(Screen.Tasks)}
        >
          <Link href="/dashboard">
            <ListTodo className="mr-2 h-4 w-4" />
            Tasks
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setScreen(Screen.AI_CHAT)}
        >
          <BrainCog className="mr-2 h-4 w-4" />
          AI Chat
        </Button>

        
        <Button variant="ghost" className="w-full justify-start" disabled>
          <Clock className="mr-2 h-4 w-4" />
          Upcoming
        </Button>
        <Button variant="ghost" className="w-full justify-start" disabled>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Completed
        </Button>
      </nav>

      <div className="pt-4 border-t">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          asChild
        >
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
