"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "What plans do you offer?",
  "How do I enrol?",
  "Contact support",
];

function CryptoChatWidgetInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        const reply =
          typeof data.reply === "string"
            ? data.reply
            : "I could not generate a reply. Please try again.";
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: reply },
        ]);
      } else {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";
        const assistantId = crypto.randomUUID();

        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("0:")) {
                try {
                  const parsed = JSON.parse(line.slice(2));
                  if (typeof parsed === "string") {
                    assistantText += parsed;
                  }
                } catch {
                  /* ignore stream parse errors */
                }
              }
            }
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: assistantText } : m
              )
            );
          }
        }

        if (!assistantText.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      "Thanks for your message. Ask about plans, pricing, or how to get started!",
                  }
                : m
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Connection issue — please try again or message us on [Telegram](https://t.me/Elitefuture).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input).catch((error) => {
      console.error("Chat send failed:", error);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gold-500 text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-gold-400 transition-all flex items-center justify-center group"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-w-[400px] bg-black/95 backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-black via-gold-900/10 to-black">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
            <Bot size={18} className="text-gold-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">Elite Assistant</h3>
            <p className="text-gold-500/70 text-xs">Plans · Pricing · Support</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="text-center space-y-2 py-4">
                <Bot size={36} className="text-gold-500 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-semibold text-white">Hi — how can I help?</p>
                <p className="text-xs text-white/50 px-4">
                  Ask about plans, pricing, enrolment, or contact support.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {STARTERS.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => {
                      void sendMessage(starter).catch((error) => {
                        console.error("Chat send failed:", error);
                      });
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-full border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-colors"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-1 border ${
                    m.role === "user"
                      ? "bg-white/10 border-white/20"
                      : "bg-gold-500/20 border-gold-500/30"
                  }`}
                >
                  {m.role === "user" ? (
                    <User size={14} className="text-white" />
                  ) : (
                    <Bot size={14} className="text-gold-400" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-white/10 text-white rounded-tr-sm"
                      : "bg-gold-500/10 border border-gold-500/20 text-slate-300 rounded-tl-sm"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ ...props }) => (
                        <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-gold-400 hover:text-gold-300 underline"
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ ...props }) => (
                        <strong className="text-white font-semibold" {...props} />
                      ),
                      ul: ({ ...props }) => (
                        <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center mt-1">
                <Loader2 size={14} className="text-gold-400 animate-spin" />
              </div>
              <div className="p-3 bg-gold-500/5 rounded-2xl rounded-tl-sm text-gold-400 text-sm">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={onSubmit} className="p-3 border-t border-white/10 bg-black/50">
          <div className="relative flex items-center">
            <input
              className="w-full bg-white/5 border border-white/10 focus:border-gold-500/50 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
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

export default function CryptoChatWidget() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return <CryptoChatWidgetInner />;
}
