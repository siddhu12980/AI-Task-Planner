export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string | Date;
}

export   interface NormalTask {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    is_completed: boolean;
  }