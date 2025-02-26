import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCog, Calendar, CheckSquare, Clock, ListTodo, MessageSquare, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              AI-Powered Task Management
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TaskAI combines powerful task management with artificial intelligence to help you work smarter, not harder.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card>
            <CardHeader className="pb-2">
              <Sparkles className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>AI Task Creation</CardTitle>
              <CardDescription>
                Create tasks using natural language. Let AI understand and organize your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simply type what you need to do, and our AI will create structured tasks with appropriate priorities and deadlines.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <ListTodo className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Smart Organization</CardTitle>
              <CardDescription>
                Automatically categorize and prioritize your tasks based on importance and deadlines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                TaskAI learns your work patterns and helps organize your tasks in the most efficient way possible.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Intelligent Scheduling</CardTitle>
              <CardDescription>
                Let AI suggest the best times to work on specific tasks based on your calendar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimize your day with AI-powered scheduling that considers your energy levels and available time slots.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <MessageSquare className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get help and suggestions from your personal AI assistant.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask questions, get clarification, or request help breaking down complex tasks into manageable steps.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CheckSquare className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your productivity and task completion with detailed analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualize your progress and identify patterns to improve your productivity over time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Smart Reminders</CardTitle>
              <CardDescription>
                Never miss a deadline with intelligent, context-aware reminders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                TaskAI sends reminders at optimal times based on task importance and your work habits.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}