import { NextRequest, NextResponse } from "next/server";
import { createTodo, getTodosofUser, getUserFromID } from "../controller";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function Middelware(session: string | undefined) {
  try {
    const payload = await decrypt(session);

    if (!payload) {
      return { error: "Unauthorized" };
    }

    const user = await getUserFromID(payload.id);

    if (!user) {
      return { error: "Unauthorized" };
    }

    return { user };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("session", session);

    const { user, error } = await Middelware(session.value);

    if (error || !user) {
      return NextResponse.json({ error }, { status: 401 });
    }

    const users = await getTodosofUser(user.id!);

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//create todos

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user, error } = await Middelware(session.value);

    if (error || !user) {
      return NextResponse.json({ error }, { status: 401 });
    }

    if (!request.body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = await request.json();

    const { title, description } = data;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const todo = await createTodo({
      title,
      description,
      user_id: user.id!,
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
