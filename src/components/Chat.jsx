/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Bot, User, Loader2, Trash2, Paperclip, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import suggestion from "/src/lib/chataisuggestion.json";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { cn } from "@/lib/utils";

const Chat = () => {
  const { user } = useUser();
  const scrollRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Learnica AI, your personal learning assistant. How can I help you today?",
      role: "bot",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [typing, setTyping] = useState(false);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  // Using NEXT_PUBLIC_GEMINI_API_KEY from environment
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();
  const modelName = "gemini-2.5-flash";

  const genAI = useMemo(() => {
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }, [apiKey]);

  // System instructions for Learnica AI
  const systemInstruction = `You are Learnica AI, an expert educational assistant for the Learnica platform. 
  Your goal is to help students learn effectively. 
  - Be encouraging, professional, and concise.
  - Provide code examples if relevant.
  - If asked about Learnica, explain that it's a premium e-learning platform with courses on web development, digital marketing, and more.
  - Always use a friendly and helpful tone.`;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, typing]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || typing) return;

    if (!genAI) {
      setError("API Configuration error. Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set.");
      return;
    }

    const currentInput = userInput;
    setUserInput("");
    adjustHeight(true);
    setError(null);

    const userMessage = {
      text: currentInput,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setTyping(true);

      const chatHistory = messages
        .filter((_, i) => i > 0)
        .map((msg) => ({
          role: msg.role === "bot" ? "model" : "user",
          parts: [{ text: msg.text }],
        }));

      const response = await genAI.models.generateContent({
        model: modelName,
        systemInstruction: systemInstruction,
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: currentInput }] }
        ],
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      });

      const responseText = response.text;

      const botMessage = {
        text: responseText,
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(`Error: ${err.message || "Something went wrong"}`);
    } finally {
      setTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Chat cleared! How can I help you now?",
        role: "bot",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Suggestions Header */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-zinc-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm z-10">
        {suggestion.map((sug) => (
          <button
            key={sug.id}
            onClick={() => setUserInput(sug.suggestion)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20 whitespace-nowrap"
          >
            {sug.suggestion}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow relative overflow-hidden">
        <ScrollArea className="h-full w-full p-4 md:p-6" ref={scrollRef}>
          <div className="space-y-6 pb-24"> {/* Extra padding at bottom for the fixed input area */}
            <AnimatePresence initial={false}>
              {messages.map((m, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={index}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className="w-8 h-8 shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-sm mt-1">
                      {m.role === "user" ? (
                        <AvatarImage src={user?.imageUrl} />
                      ) : (
                        <AvatarImage src="/assets/aibot.png" />
                      )}
                      <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-[10px]">
                        {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        m.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-tl-none text-zinc-800 dark:text-zinc-200"
                      }`}>
                        {m.text}
                        <span className="block mt-1.5 text-[8px] opacity-40 text-right">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <Avatar className="w-8 h-8 shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <AvatarImage src="/assets/aibot.png" />
                  <AvatarFallback><Bot className="w-4 h-4 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce [animation-duration:0.6s]" />
                  <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.1s]" />
                  <span className="w-1 h-1 bg-primary/60 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                </div>
              </motion.div>
            )}
            
            {error && (
              <div className="flex justify-center mt-2">
                <span className="px-3 py-1 text-[10px] text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-full">
                  {error}
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Bottom Input (KokonutUI Style) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-900 z-20">
        <div className="max-w-3xl mx-auto relative group">
           <div className="rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 p-1 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 transition-all group-focus-within:border-primary/30 group-focus-within:ring-4 group-focus-within:ring-primary/5">
            <Textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Learnica anything..."
              className="w-full resize-none rounded-xl border-none bg-transparent px-4 py-3 text-[13px] placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-zinc-200 min-h-[52px]"
            />
            
            <div className="flex items-center justify-between px-2 pb-1.5">
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />
                <button 
                  onClick={clearChat}
                  className="text-[10px] px-2 py-1 rounded-md text-zinc-500 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  Clear history
                </button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || typing}
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-lg transition-all duration-200",
                  userInput.trim() ? "bg-primary text-white scale-100 shadow-md shadow-primary/20" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 scale-95"
                )}
              >
                {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        <p className="text-[9px] text-center text-zinc-400 mt-2 tracking-tight">
          Powered by Gemini 2.5 Flash • Learnica AI can make mistakes.
        </p>
      </div>
    </div>
  );
};

export default Chat;

