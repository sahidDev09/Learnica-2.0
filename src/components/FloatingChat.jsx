"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle } from "lucide-react";
import Chat from "./Chat";
import { Button } from "./ui/button";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] sm:w-[420px] bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Learnica AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Content */}
            <div className="h-[500px]">
              <Chat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen 
          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 rotate-180" 
          : "bg-primary text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingChat;
