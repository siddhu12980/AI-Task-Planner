"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {  CheckCircle2, ListTodo, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenLine } from "lucide-react"; 
import MobileHeader from "./Header";
import { useState } from "react";
import { Task } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskScreen = ({ tasks }: { tasks: Task[] }) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");

  const [newTaskInput, setNewTaskInput] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const queryClient = useQueryClient();

  const addTask = async () => {
    if (newTaskInput.trim() === "") return;

    const newTask = {
      title: newTaskInput,
      description: newTaskInput,
      status: "pending",
      priority: "medium",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
    try {
      const res = await axios.post(
        "/api/todos",
        {
          title: newTask.title,
          description: newTask.description,
        },
        {
          withCredentials: true,
        }
      );

      const response = res.data;

      console.log("Added task:", response);

      if (res.status === 201) {
        toast.success("Task added successfully");
      }

      setNewTaskInput("");
    } catch (error) {
      toast.error("Failed to add task");
      console.error("Failed to add task:", error);
    }
  };

  const toggleTaskStatus = async (id: number, is_completed: boolean) => {
    try {
      const updateData = {
        is_completed: !is_completed,
      };

      const res = await axios.put(`/api/todos/${id}`, updateData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Task updated successfully  ");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await axios.delete(`/api/todos/${id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      toast.error("Failed to delete task");
      console.error("Failed to delete task:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error("Failed to delete task");
      console.error("Failed to delete task:", error);
    },
  });

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.is_completed === false;
    if (activeTab === "completed") return task.is_completed === true;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col">

      {/* Mobile header */}
      <MobileHeader />
      {/* Dashboard content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Your Tasks</h1>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* AI Task Input */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Add a new task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder={"Enter task title..."}
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />
                  </div>

                  <div className="flex">
                    <Button onClick={addTask}>
                      <PenLine className="mr-2 h-4 w-4" />
                      <span>Direct Input</span>
                    </Button>
                  </div>
                </div>

                {showAdditionalFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task description"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={taskPriority}
                        onValueChange={setTaskPriority}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ListTodo className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No tasks found</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "You don't have any tasks yet. Create one to get started."
                      : activeTab === "pending"
                      ? "You don't have any pending tasks."
                      : "You don't have any completed tasks."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={task.is_completed ? "opacity-60" : ""}
                  >
                    <CardContent className="p-4 flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-5 w-5 rounded-full p-0 ${
                            task.is_completed
                              ? "bg-primary text-primary-foreground"
                              : ""
                          }`}
                          onClick={() =>
                            toggleTaskStatus(task.id, task.is_completed)
                          }
                        >
                          {task.is_completed && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </Button>
                        <div>
                          <p
                            className={`font-medium ${
                              task.is_completed ? "line-through" : ""
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  : task.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                            >
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => mutation.mutate(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TaskScreen;
