"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  time: string;
}

const suggestedPrompts = [
  "Software Engineering vs AI Specialization 🚀",
  "Medical Clinical vs Research Pathways 🩺",
  "Business Analytics Global Demand 📊",
  "Skill Gap Analysis for Web Development 🌐",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Welcome to EduNav AI! I'm your career guidance strategist. To kick things off, tell me a bit about your background or what subjects make time fly for you!",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    // AI Response Simulation
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `That's an excellent field to explore! Based on current industry data, focusing on practical project-building alongside core fundamentals will give you a major competitive edge. Would you like me to map out a step-by-step roadmap for this?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              EduNav<span className="text-sky-600">.AI</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block h-4 w-[1px] bg-slate-300 mx-2" />
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            Active Counseling Session
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition">
              ← Back to Home
            </button>
          </Link>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg border border-rose-200 transition"
          >
            Reset Chat
          </button>
        </div>
      </header>

      {/* MAIN CHAT WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* LEFT SIDEBAR: QUICK PROMPTS & SESSION INFO */}
        <div className="hidden lg:flex flex-col gap-4 col-span-1 bg-white/80 border border-slate-200/80 rounded-2xl p-5 shadow-sm backdrop-blur-md">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Suggested Topics</h3>
            <p className="text-xs text-slate-500 mt-1">Click any prompt to start quick analysis</p>
          </div>

          <div className="space-y-2 mt-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/70 hover:border-sky-300 text-xs font-medium text-slate-700 hover:text-sky-800 transition-all shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Model Status:</span>
              <span className="font-semibold text-emerald-600">Ready (EduNav v2)</span>
            </div>
            <div className="flex justify-between">
              <span>Privacy:</span>
              <span className="font-semibold text-slate-700">Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* RIGHT: CHAT CONTAINER */}
        <div className="col-span-1 lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl shadow-sm flex flex-col h-[75vh] sm:h-[80vh] overflow-hidden">
          
          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                  msg.sender === "ai" 
                    ? "bg-slate-900 text-white" 
                    : "bg-gradient-to-tr from-sky-500 to-blue-600 text-white"
                }`}>
                  {msg.sender === "ai" ? "🤖" : " You "}
                </div>

                {/* Message Box */}
                <div className={`max-w-[80%] space-y-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-sky-600 text-white font-medium rounded-tr-none shadow-sm"
                      : "bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none font-normal"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium px-1 block">
                    {msg.time}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Loading Spinner */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-xs text-white">🤖</div>
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />
                  EduNav AI is analyzing...
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT FORM */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EduNav AI about fields, roadmaps, or university major guidance..."
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 shadow-xs transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Send 🚀
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}