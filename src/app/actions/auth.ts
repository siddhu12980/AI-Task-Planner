"use server";

import db from "@/db";
import { usersTable } from "@/db/schema";
import { SignupFormSchema, LoginFormSchema } from "@/lib/definitions";
import { deleteSession, createSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function signup(formData: FormData) {
  console.log("\n signup", formData);

  console.log("\n signup", formData.get("name"));
  console.log("\n signup", formData.get("email"));
  console.log("\n signup", formData.get("password"));

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.errors;

    console.log(errors[0].message);
    return {
      success: false,
      message: [`Invalid data: ${errors[0].message}`],
    };
  }

  const { name, email, password } = validatedFields.data;

  let toRedirect = false;
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length) {
      return {
        success: false,
        message: ["Email already exists"],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const session_user = createdUser[0];

    const ses = await createSession({
      id: session_user.id,
      email: session_user.email,
      name: session_user.name,
    });

    console.log(ses);

    toRedirect = true;
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: ["An error occurred during signup. Please try again."],
    };
  }

  if (toRedirect) {
    redirect("/dashboard");
  }
}

export async function login(formData: FormData) {
  const email1 = formData.get("email");
  const password1 = formData.get("password");

  const validatedFields = LoginFormSchema.safeParse({
    email: email1,
    password: password1,
  });

  if (!validatedFields.success) {
    console.error("Invalid form data:", validatedFields.error);
    return {
      success: false,
      message: [`Invalid data: ${validatedFields.error.errors[0].message}`],
    };
  }

  const { email, password } = validatedFields.data;

  if (!email || !password) {
    return {
      success: false,
      message: ["Email and password are required"],
    };
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user.length) {
    return {
      success: false,
      message: ["Invalid email or password"],
    };
  }

  const passwordMatch = await bcrypt.compare(password, user[0].password);

  if (!passwordMatch) {
    return {
      success: false,
      message: ["Invalid email or password"],
    };
  }

  const session_user = user[0];

  const ses = await createSession({
    id: session_user.id,
    email: session_user.email,
    name: session_user.name,
  });

  console.log(ses);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
