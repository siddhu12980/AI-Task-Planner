"use client";

import AIConversationPage from "@/components/Chat";
import Sidebar from "@/components/sidebar";
import TaskScreen from "@/components/TaskScreen";
import { NormalTask, Task } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

enum Screen {
  "Tasks",
  "AI_CHAT",
}

function addNormalTaskToTemplateTask(tasks: NormalTask[]): Task[] {
  return tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
      priority: Math.random() > 0.5 ? "high" : "medium",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };
  });
}

const fetchAllTasks = async () => {
  try {
    const res = await axios.get("/api/todos", {
      withCredentials: true,
    });

    const data = res.data;

    console.log("Fetched tasks:", data);

    if (res.status === 200) {
      if (data.length > 0) {
        const complexTasks = addNormalTaskToTemplateTask(data);
        return complexTasks;
      } else {
        return [] as Task[];
      }
    }
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};

export default function DashboardPage() {
  const [screen, setScreen] = useState(Screen.Tasks);

  const task_data = useQuery({ queryKey: ["tasks"], queryFn: fetchAllTasks });

  if (task_data.isError) {
    console.error("Failed to fetch tasks:", task_data.error);

    return (
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar setScreen={setScreen} />
        <div className="flex-1 flex items-center justify-center">
          <p>Failed to load tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar setScreen={setScreen} />

      {task_data.isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Loading tasks...</p>
        </div>
      ) : task_data.isError ? (
        <div className="flex-1 flex items-center justify-center">
          <p>Failed to load tasks</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {screen === Screen.Tasks ? (
            <TaskScreen tasks={task_data.data ?? []} />
          ) : (
            <AIConversationPage />
          )}
        </div>
      )}
    </div>
  );
}
