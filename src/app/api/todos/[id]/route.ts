import { cookies } from "next/headers";
import { Middelware } from "../route";
import db from "@/db";
import { todosTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "DELETE") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const cookieStore = await cookies();
//     const session = cookieStore.get("session");

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { user, error } = await Middelware(session.value);
//     if (error || !user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ error: "Todo ID is required" });
//     }

//     console.log("id", id);

//     const todoId = Number(id);

//     const deleted = await db
//       .delete(todosTable)
//       .where(and(eq(todosTable.id, todoId), eq(todosTable.user_id, user.id)));

//     if (!deleted) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     return res.status(200).json({ message: "Todo deleted successfully" });
//   } catch (error: any) {
//     console.error("Error deleting todo:", error.message);
//     return res.status(500).json({ error: "An unexpected error occurred" });
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user, error } = await Middelware(session.value);
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todoId = Number(params.id);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
    }

    const deleted = await db
      .delete(todosTable)
      .where(and(eq(todosTable.id, todoId), eq(todosTable.user_id, user.id)))
      .returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting todo:", error.message);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user, error } = await Middelware(session.value);
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todoId = Number(params.id);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid Todo ID" }, { status: 400 });
    }

    const { is_completed } = await req.json();

    if (is_completed === undefined) {
      return NextResponse.json(
        { error: "At least one field is required" },
        { status: 400 }
      );
    }

    const updatedTodo = await db
      .update(todosTable)
      .set({ is_completed: is_completed })
      .where(and(eq(todosTable.id, todoId), eq(todosTable.user_id, user.id)))
      .returning();

    if (!updatedTodo.length) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo updated successfully", updatedTodo },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating todo:", error.message);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
