import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrainCog, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Manage Tasks Smarter with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                TaskAI helps you organize, prioritize, and complete your tasks with the power of artificial intelligence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full min-[400px]:w-auto">Get Started</Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Simple Interface</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[350px] md:h-[420px] lg:h-[500px] rounded-lg overflow-hidden border bg-card p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BrainCog className="h-6 w-6" />
                    <span className="font-semibold">TaskAI Dashboard</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="p-3 bg-background rounded-md border shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Prepare presentation for meeting</h3>
                        <p className="text-sm text-muted-foreground">High priority • Due tomorrow</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                        Urgent
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-md border shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Research competitors</h3>
                        <p className="text-sm text-muted-foreground">Medium priority • Due in 3 days</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                        Important
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-background rounded-md border shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Schedule team meeting</h3>
                        <p className="text-sm text-muted-foreground">Low priority • Due next week</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        Normal
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Ask AI to create a new task..."
                      className="w-full px-3 py-2 rounded-md border bg-background"
                      disabled
                    />
                    <BrainCog className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button size="sm" disabled>Add</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}