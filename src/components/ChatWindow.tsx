"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp?: string;
}

interface ChatWindowProps {
  sessionId: string;
  initialMessages: Message[];
  isCompleted?: boolean;
}

export default function ChatWindow({
  sessionId,
  initialMessages,
  isCompleted = false,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: [...messages, userMessage],
          message: userText,
        }),
      });

      const data = await res.json();
      const botReplyText =
        data.text ||
        data.content ||
        data.message ||
        "[EduNav AI]: Response received successfully!";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: botReplyText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: "[EduNav AI]: I received your message! Tell me more about your interests or goals.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-[550px] flex-col justify-between rounded-xl border border-gray-800 bg-gray-900/80 p-4 text-white shadow-2xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold shadow-lg shadow-blue-500/30"
          >
            AI
          </motion.div>
          <div>
            <h2 className="font-semibold text-gray-100">EduNav Assistant</h2>
            <p className="text-xs text-gray-400">Deep AI Career Counseling Session</p>
          </div>
        </div>
        <motion.span 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20"
        >
          ● Active session
        </motion.span>
      </div>

      {/* Messages List with Popup Animations */}
      <div className="my-4 flex-1 space-y-4 overflow-y-auto pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", damping: 20 }}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  msg.sender === "user" ? "bg-purple-600" : "bg-blue-600"
                }`}
              >
                {msg.sender === "user" ? "U" : "AI"}
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-200 border border-gray-700"
                }`}
              >
                {msg.text}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-gray-400"
          >
            <div className="h-2.5 w-2.5 animate-ping rounded-full bg-blue-500"></div>
            EduNav Assistant is thinking...
          </motion.div>
        )}
      </div>

      {/* Input Form with Smooth Hover and Press */}
      <form onSubmit={handleSend} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thoughts, interests, or doubts..."
          disabled={loading || isCompleted}
          className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={loading || !input.trim() || isCompleted}
          className="absolute right-2 top-2 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500 disabled:opacity-40 transition-colors shadow-lg shadow-blue-600/30"
        >
          🚀
        </motion.button>
      </form>
    </motion.div>
  );
}