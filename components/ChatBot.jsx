"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, MessageSquare } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "What help do you required?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpen);
    return () => window.removeEventListener('open-chat', handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      let botReply = "";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes("tell me about the elite trader") || lower.includes("tell me about elite trader") || lower.includes("elite trader")) {
        botReply = "The Elite Trader is the premier learning platform for modern futures and crypto traders. We offer professional strategies, risk management training, and real-time community callouts in our Inner Circle.";
      } else {
        botReply = "Our team will look into it and reach you soon.";
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), text: botReply, sender: "bot" }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] z-[9999] flex flex-col bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden font-inter"
        >
          {/* Header */}
          <div className="bg-[#111] p-4 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                <Bot className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide font-outfit uppercase">Elite Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-slate-400 text-xs text-[10px] uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === "user" 
                    ? "bg-gold-500 text-black rounded-br-none shadow-[0_5px_20px_rgba(212,175,55,0.2)] font-medium" 
                    : "bg-white/[0.04] text-slate-300 rounded-bl-none border border-white/10"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex w-full justify-start"
              >
                <div className="bg-white/[0.04] rounded-2xl rounded-bl-none border border-white/10 p-4 py-4 flex gap-1.5">
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-gold-500/50 rounded-full" />
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold-500/50 rounded-full" />
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold-500/50 rounded-full" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#111] border-t border-white/5 relative z-10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-black/50 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:bg-white/[0.02] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-1.5 p-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black disabled:bg-white/5 disabled:text-slate-500 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
