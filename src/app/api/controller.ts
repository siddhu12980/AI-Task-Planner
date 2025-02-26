import db from "@/db/index"
import { todosTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getAllTodos() {
  try {
    return await db.select().from(todosTable);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
}

type Todo = {
  user_id: number;
  title: string;
  description: string;
};

type todoUpdate = {
  title: string;
  description: string;
  is_completed: boolean;
};

type TodoResponse = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  is_completed: boolean;
};

type User = {
  name: string;
  email: string;
  password: string;
};

type UserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

async function getAllUsers() {
  try {
    const users = await db.query.usersTable.findMany({
      with: { todos: true },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

async function getTodosofUser(id: number) {

  console.log("Getting todos of user with ID:", id);
  try {
    const todos = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.user_id, id));

    
    return todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
}

async function getUserFromID(id: number) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    if (user.length === 0) throw new Error("User not found");
    return user[0];
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
}

async function createUser(user: User) {
  try {
    const u = await db.insert(usersTable).values(user).returning();
    return u[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

async function deleteUser(id: number) {
  try {
    await db.delete(todosTable).where(eq(todosTable.user_id, id)); // Delete todos of this user
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return "User deleted";
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error(`Failed to delete user with ID ${id}`);
  }
}

async function getTodoFromID(id: number) {
  try {
    const todo1 = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));
    return todo1[0];
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw new Error(`Failed to fetch todo with ID ${id}`);
  }
}

async function createTodo(todo: Todo) {

  console.log("Creating todo:", todo);
  try {
    const todo1 = await db.insert(todosTable).values(todo).returning();

    return todo1[0];
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
}

async function updateTodo(id: number, todo: Partial<todoUpdate>) {
  try {
    const todo2 = await db
      .update(todosTable)
      .set(todo)
      .where(eq(todosTable.id, id))
      .returning();
    return todo2[0];
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw new Error(`Failed to update todo with ID ${id}`);
  }
}

async function deleteTodo(id: number) {
  try {
     await db.delete(todosTable).where(eq(todosTable.id, id));

    return "Todo deleted";
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw new Error(`Failed to delete todo with ID ${id}`);
  }
}

async function deleteALL() {
  try {
    await db.delete(todosTable);
    await db.delete(usersTable);
  } catch (error) {
    console.error(`Error deleting all todos and users:`, error);
    throw new Error(`Failed to delete all todos and users`);
  }
}
export {
  getAllTodos,
  getAllUsers,
  getUserFromID,
  createUser,
  deleteUser,
  getTodoFromID,
  createTodo,
  updateTodo,
  deleteALL,
  deleteTodo,
  getTodosofUser,
};
