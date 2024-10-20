/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import suggestion from "/src/lib/chataisuggestion.json";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Image from "next/image";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [typing, setTyping] = useState(false); // State to manage typing indicator

  const { user } = useUser();
  const ref = useRef();

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const modelName = "gemini-1.5-flash";

  const genAI = new GoogleGenerativeAI(apiKey);
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  // Initialize chat and set default message
  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: modelName })
          .startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);

        // Add initial bot message
        setMessages([
          {
            text: "Hi dear,I am Learnica how can I assist you?",
            role: "bot",
            timestamp: new Date(),
          },
        ]);

        console.log("Chat initialized:", newChat);
      } catch (error) {
        setError(`Failed to initialize chat: ${error.message}`);
        console.error("Chat initialization error:", error);
      }
    };

    initChat();
  }, [genAI, generationConfig, messages, safetySettings]);

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        setTyping(true);
        console.log("Sending message:", userInput);

        const result = await chat.sendMessage(userInput);
        setTyping(false);

        const botMessage = {
          text: await result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error("Chat not initialized");
      }
    } catch (error) {
      setError(`Failed to send message: ${error.message}`);
      setTyping(false);
      console.error("Message send error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  //suggestion ai chat message

  return (
    <section className="flex flex-col h-screen md:h-[100vh] pb-20 container mx-auto">
      <div className="m-2 md:m-0 flex flex-col gap-4 flex-grow">
        <div className="flex gap-1 flex-wrap rounded-md mb-4">
          {suggestion.map((sug) => (
            <button
              className="bg-secondary text-white p-2 border rounded-md"
              key={sug.id}>
              {sug.suggestion}
            </button>
          ))}
        </div>
        {/* responses & chatbox */}
        <div className="flex-grow mb-2 rounded-md border p-4 bg-card">
          <ScrollArea className="h-full">
            <div className="h-[calc(100vh-450px)] md:h-[calc(100vh-400px)] overflow-y-auto">
              {" "}
              {/* Set a fixed height */}
              {error && (
                <div className="text-sm text-red-400">{error.message}</div>
              )}
              {messages.map((m, index) => (
                <div key={index} className="mr-6 whitespace-pre-wrap md:mr-12">
                  {m.role === "user" && (
                    <div className="mb-6 flex gap-6">
                      <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5">
                        <p className="font-semibold text-start">You</p>
                        <div className="mt-1.5 text-sm text-zinc-700 text-start">
                          {m.text}
                        </div>
                      </div>
                    </div>
                  )}

                  {m.role === "bot" && (
                    <div className="mb-6 flex gap-6">
                      <Avatar>
                        <AvatarImage src="/assets/aibot.jpeg" />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div className="mt-1.5">
                        <p className="font-semibold text-zinc-700 text-start">
                          Learnica
                        </p>
                        <p className="text-secondary text-start">{m.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Typing indicator */}
              {typing && (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/assets/aibot.jpeg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-700">
                    Learnica is typing...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <form
          onSubmit={handleSendMessage}
          className="relative focus:outline-none h-[10vh]">
          <div className="absolute left-2 top-3 flex items-center">
            <Image
              src={"/assets/sparkelai.webp"}
              alt=""
              width={20}
              height={20}
            />
          </div>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything..."
            className="pr-12 pl-10 placeholder:italic placeholder:text-zinc-600 text-gray-700 focus:outline-none"
          />
          <Button
            size="icon"
            type="submit"
            variant="destructive"
            className="absolute right-1 top-1 h-8 w-10">
            <SendHorizontalIcon className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
