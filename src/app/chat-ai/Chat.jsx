/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import image from "../../../public/assets/learnicaAi.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

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

  return (
    <section className="grid md:grid-cols-2 h-screen items-center container mx-auto">
      <div className="md:w-[500px] hidden md:inline">
        <Image src={image} alt="ai" className="" />
        <h1 className="text-5xl font-bold text-center text-secondary">
          Ask Learnica AI
        </h1>
        <p className=" text-center">
          Learnica can assists you in every situation
        </p>
      </div>
      {/* chat box */}
      <div className=" m-2 md:m-0">
        <h1 className="text-2xl font-medium bg-primary text-white rounded-md py-2 max-w-lg text-center">
          Learnica AI Assistant
        </h1>
        <div className="mt-4 w-full max-w-lg">
          {/* responses */}
          <ScrollArea
            className="mb-2 md:h-[500px] h-[450px] rounded-md border p-4 bg-card"
            ref={ref}>
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
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-zinc-500">
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
                      <p className="font-semibold">Learnica</p>
                      <p>{m.text}</p>
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
                <div className="text-sm text-gray-500">
                  Learnica is typing...
                </div>
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="relative">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              className="pr-12 placeholder:italic placeholder:text-zinc-600"
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
      </div>
    </section>
  );
};

export default Chat;
