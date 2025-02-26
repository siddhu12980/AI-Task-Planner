import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what people are saying about TaskAI.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold">Sarah Johnson</h4>
                  <p className="text-xs text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                "TaskAI has completely transformed how I manage my workload. The AI suggestions are spot-on, and I love how it prioritizes my tasks automatically. I'm saving at least an hour every day!"
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="David Chen" />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold">David Chen</h4>
                  <p className="text-xs text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                "As a developer juggling multiple projects, TaskAI has been a game-changer. The natural language task creation is incredibly intuitive, and the AI seems to understand exactly what I need to do."
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="Emily Rodriguez" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                    <StarIcon className="h-4 w-4 fill-primary text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold">Emily Rodriguez</h4>
                  <p className="text-xs text-muted-foreground">Freelance Designer</p>
                </div>
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                "I've tried dozens of task management apps, but TaskAI is in a league of its own. The AI assistant helps me break down complex projects into manageable steps, and the interface is beautiful and intuitive."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}