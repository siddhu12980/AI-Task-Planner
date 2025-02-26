"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Loader2,
  BrainCog,
  PlusCircle,
  ArrowUp,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import MobileHeader from "@/components/Header";

type MessageRole = "user" | "assistant" | "system";

interface ConversationMessage {
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface AIResponse {
  status: string;
  message?: string;
  response?: any;
  previousMessages?: any[];
  steps?: any[];
}

const AIConversationPage = () => {
  // State
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. How can I help you manage your tasks today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isProcessing) return;

    const userMessage: ConversationMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    setInputValue("");
    setIsProcessing(true);

    try {
      const response = await axios.post<AIResponse>("/api/ai", {
        query: userMessage.content,
      });

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const data = response.data;

      if (data.status === "question") {
        // Add AI question to chat
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message || "I need more information.",
            timestamp: new Date(),
          },
        ]);
      } else if (data.status === "complete") {
        console.log("AI Response:", data);
        let message = "I've processed your request.";

        // Safely extract the response object
        const response = data.response || {};
        console.log("Response:", response);

        // Check for message in multiple possible locations
        if (response.message) {
          message = response.message;
        } else if (response.output) {
          message = response.output;
        }

        // Handle data property if it exists
        if (response.data) {
          // If data contains arrays, process them
          Object.keys(response.data).forEach((key) => {
            if (
              Array.isArray(response.data[key]) &&
              response.data[key].length > 0
            ) {
              // Format array items as a numbered list
              const formattedList = response.data[key]
                .map((item, index) => {
                  // Handle different item structures
                  if (typeof item === "object") {
                    return `${index + 1}. ${item.title || "Untitled"} - ${
                      item.description || "No description"
                    }`;
                  } else {
                    return `${index + 1}. ${item}`;
                  }
                })
                .join("\n");

              // Append the formatted list to the message
              if (formattedList) {
                message += "\n" + formattedList;
              }
            }
          });
        }

        // Update the messages state with the processed response
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: message,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get a response");

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI assistant. How can I help you manage your tasks today?",
        timestamp: new Date(),
      },
    ]);
    inputRef.current?.focus();
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black dark:from-black dark:to-gray-900 text-white">
      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        {/* Mobile header */}
        <MobileHeader />

        {/* Chat content */}
        <main className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="w-full flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Task Assistant</h1>
                  <p className="text-sm text-gray-400">
                    Your personal task management companion
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={startNewConversation}
                className="bg-gray-800 hover:bg-gray-700 text-white transition-all"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>

            <hr />

            {/* Messages container */}

            <Card className="flex-1 overflow-hidden flex flex-col shadow-md  backdrop-blur-sm  border-none bg-transparent text-white">
              <CardContent className="flex-1 p-0">
                <ScrollArea
                  className="h-[calc(100vh-280px)] w-full  no-scrollbar   "
                  ref={scrollAreaRef}
                >
                  <div className="p-4 space-y-6  no-scrollbar">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start gap-3 max-w-[85%] ${
                            message.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar
                            className={`h-8 w-8 mt-1 ring-2 ${
                              message.role === "user"
                                ? "ring-primary/20"
                                : "ring-blue-500/20"
                            }`}
                          >
                            {message.role === "user" ? (
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                U
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-blue-500 text-white">
                                <BrainCog className="h-4 w-4" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground rounded-tr-none"
                                  : "bg-gray-800 rounded-tl-none"
                              }`}
                            >
                              {message.isLoading ? (
                                <div className="flex items-center justify-center h-6">
                                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                                </div>
                              ) : (
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                  {message.content
                                    .split("\n")
                                    .map((line, i) => (
                                      <React.Fragment key={i}>
                                        {line}
                                        {i <
                                          message.content.split("\n").length -
                                            1 && <br />}
                                      </React.Fragment>
                                    ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 mx-2">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input area */}
              <CardFooter className="p-4 border-t border-gray-700 bg-gray-900 backdrop-blur-sm">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 border-gray-600 focus-visible:gray-500 text-white"
                    disabled={isProcessing}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === "" || isProcessing}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ArrowUp className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIConversationPage;
