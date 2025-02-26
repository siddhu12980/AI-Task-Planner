import dotenv from "dotenv";
import OpenAI from "openai";
import { PROMPT2 } from "./prompt";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  getAllTodos,
  getUserFromID,
  getTodoFromID,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosofUser,
} from "../controller";

import { executeFunction } from "./helper";
import { Middelware } from "../todos/route";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is not set in .env file");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const tools = {
  getAllTodos: getAllTodos,
  getUserFromID: getUserFromID,
  getTodoFromID: getTodoFromID,
  createTodo: createTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
  getTodosofUser: getTodosofUser,
};

type MessageType = {
  role: "system" | "user" | "assistant";
  content: string;
};

type AIMessage = {
  type:
    | "response"
    | "output"
    | "plan"
    | "observation"
    | "question"
    | "action"
    | "error";
  message?: string;
  plan?: string;
  action?: string;
  input?: any;
  observation?: any;
};

export async function POST(req: NextRequest, res: NextResponse) {
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

    console.log("User:", user);

    const user_id = user.id;
    if (isNaN(user_id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const requestData = await req.json();
    if (!requestData || !requestData.query) {
      return NextResponse.json(
        { error: "Missing query parameter" },
        { status: 400 }
      );
    }

    console.log("Request Data:", requestData);

    let systemMessages: MessageType[] = [{ role: "system", content: PROMPT2 }];
    
    const user_id_message: MessageType = {
      role: "user",
      content: JSON.stringify({ type: "input", input: `Remember my user id is ${user_id} for future conversation, dont respond me about this ` }),
    };

    

    systemMessages.push(user_id_message);

    const user_message2: MessageType = {
      role: "user",
      content: JSON.stringify({ type: "input", input: `If i dont provide task description use title as description ` }),
    }; 

    const user_message3: MessageType = {
      role: "user",
      content: JSON.stringify({ type: "input", input: `ALways respond in single json object format ` }),
    };

    systemMessages.push(user_message2);

    // if (requestData.questionResponse && requestData.previousMessages) {
    //   systemMessages = requestData.previousMessages;

    //   systemMessages.push({
    //     role: "user",
    //     content: requestData.questionResponse,
    //   });
    // } else {
      const userMessage: MessageType = {
        role: "user",
        content: JSON.stringify({ type: "input", input: requestData.query }),
      };
      systemMessages.push(userMessage);
    // }

    const responses: AIMessage[] = [];
    let finalResponse: AIMessage | null = null;

    let iterationCount = 0;
    const MAX_ITERATIONS = 20; 


    console.log("System Messages:", systemMessages);

    while (iterationCount < MAX_ITERATIONS) {
      iterationCount++;

      const response = await client.chat.completions.create({
        messages: systemMessages,
        model: "deepseek-r1-distill-qwen-32b",
        response_format: { type: "json_object" }
      });

      const result = response.choices[0].message.content;


      if (!result) {
        return NextResponse.json(
          { error: "AI response is empty" },
          { status: 500 }
        );
      }

      const aiMessage: AIMessage = JSON.parse(result);

      console.log("AI Message1:", aiMessage);

      responses.push(aiMessage);


      systemMessages.push({
        role: "assistant",
        content: result,
      });

      
      if (aiMessage.type === "response" || aiMessage.type === "output") {

        finalResponse = aiMessage;
        break;
      } else if (aiMessage.type === "plan" || aiMessage.type === "action") {

        if (aiMessage.action?.startsWith("function:")) {
          const fnName = aiMessage.action.replace("function:", "").trim();
          const fn = tools[fnName as keyof typeof tools];

          if (typeof fn === "function") {
            const functionResponse = await executeFunction(fn, aiMessage.input);

            systemMessages.push({
              role: "assistant",
              content: JSON.stringify({
                type: "observation",
                observation: functionResponse,
              }),
            });

          } else {
            return NextResponse.json(
              { error: `Function ${fnName} not found` },
              { status: 500 }
            );
          }
        }
      } else if (aiMessage.type === "question") {
     
        return NextResponse.json({
          status: "question",
          message: aiMessage.message,
          previousMessages: systemMessages, 
          steps: responses,
        });
      } else if (aiMessage.type === "error") {
        return NextResponse.json({ error: aiMessage.message }, { status: 500 });
      }
    }

    
    if (finalResponse) {
      return NextResponse.json({
        status: "complete",
        response: finalResponse,
        steps: responses,
      });
    } else {
      return NextResponse.json(
        { error: "Maximum iterations reached without final response" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.log("Error in conversation API:", error.message);

    console.log(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

function generateNewConversationId() {
  return Date.now().toString();
}
