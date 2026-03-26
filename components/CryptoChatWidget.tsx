'use client';

import { useChat, Message } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function CryptoChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gold-500 text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-gold-400 transition-all flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-w-[400px] bg-black/95 backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-black via-gold-900/10 to-black">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
            <Bot size={18} className="text-gold-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">Elite AI Analyst</h3>
            <p className="text-gold-500/70 text-xs">Market & Crypto Intelligence</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
              <Bot size={40} className="text-gold-500 mb-2" />
              <p className="text-sm font-semibold text-white">How can I assist your trading today?</p>
              <p className="text-xs text-white/50 px-6">Ask me about crypto trends, market analysis, or trading strategies.</p>
            </div>
          ) : (
            messages.map((m: Message) => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-1 border ${
                  m.role === 'user' 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-gold-500/20 border-gold-500/30'
                }`}>
                  {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-gold-400" />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  m.role === 'user'
                    ? 'bg-white/10 text-white rounded-tr-sm'
                    : 'bg-gold-500/10 border border-gold-500/20 text-slate-300 rounded-tl-sm'
                }`}>
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props}/>,
                      strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props}/>,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props}/>,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props}/>,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center mt-1">
                <Loader2 size={14} className="text-gold-400 animate-spin" />
              </div>
              <div className="p-3 bg-gold-500/5 rounded-2xl rounded-tl-sm text-gold-400 text-sm">
                Analyzing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/50">
          <div className="relative flex items-center">
            <input
              className="w-full bg-white/5 border border-white/10 focus:border-gold-500/50 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none transition-colors"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about crypto or markets..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-gold-500 text-black rounded-full hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
