import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCog, CheckCircle, ListChecks, UserCircle } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, Powerful, Intelligent
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TaskAI makes task management effortless with a simple three-step process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          <Card className="relative border-primary/20">
            <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <UserCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up for TaskAI to get started. It only takes a minute to create your account.
                </p>
                <ul className="space-y-2 text-sm text-left w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Quick sign-up process</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Secure authentication</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Free starter plan available</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card className="relative border-primary/20">
            <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </div>
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <BrainCog className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Interact with AI</h3>
                <p className="text-muted-foreground">
                  Use natural language to create tasks, get suggestions, and organize your work.
                </p>
                <ul className="space-y-2 text-sm text-left w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Natural language processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Intelligent task creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Personalized suggestions</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card className="relative border-primary/20">
            <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              3
            </div>
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <ListChecks className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Manage Your Tasks</h3>
                <p className="text-muted-foreground">
                  View, update, and complete tasks with an intuitive interface designed for productivity.
                </p>
                <ul className="space-y-2 text-sm text-left w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Drag-and-drop organization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Smart filtering and sorting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Progress tracking and analytics</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-12">
          <Button size="lg" className="w-full max-w-sm">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}