"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, AlertTriangle, Loader2, RotateCcw, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const QUICK_PROMPTS = [
  "What are signs of a heart attack?",
  "How do I perform CPR?",
  "Find nearest hospital",
  "Poison control number",
];

function MarkdownText({ text }: { text: string }) {
  // Simple inline markdown: **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground-bright">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="px-1 py-0.5 rounded text-[0.8em] bg-blue-500/10 text-blue-300 font-mono">
              {part.slice(1, -1)}
            </code>
          );
        }
        // Handle line breaks
        return part.split("\n").map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ));
      })}
    </>
  );
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm **EmerGen AI**, your medical emergency assistant. I can help with first aid guidance, symptoms, and navigating this portal.\n\n⚠️ For life-threatening emergencies, call **911** immediately.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
    if (!isOpen && messages.length > 1) setHasUnread(true);
  }, [messages, isOpen, scrollToBottom]);

  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      };

      const assistantId = (Date.now() + 1).toString();
      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsLoading(true);

      // Build history for API (exclude welcome message & current empty assistant msg)
      const history = [
        ...messages.filter((m) => m.id !== "welcome"),
        userMsg,
      ].map((m) => ({ role: m.role, content: m.content }));

      try {
        abortRef.current = new AbortController();
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Request failed" }));
          throw new Error(err.error || "Request failed");
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          const captured = accumulated;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: captured, isStreaming: true } : m
            )
          );
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated, isStreaming: false } : m
          )
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        const errorText =
          err instanceof Error && err.message.includes("API key")
            ? "⚠️ API key not configured. Add `GEMINI_API_KEY` to `.env.local` and restart the server."
            : "Sorry, I encountered an error. Please try again.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errorText, isStreaming: false }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setIsLoading(false);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm **EmerGen AI**, your medical emergency assistant. I can help with first aid guidance, symptoms, and navigating this portal.\n\n⚠️ For life-threatening emergencies, call **911** immediately.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        id="ai-chatbot-trigger"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%)",
          boxShadow: "0 8px 32px rgba(59,130,246,0.45)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <motion.span
            className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0a0e1a]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}

        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(96,165,250,0.5)" }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: "min(580px, calc(100dvh - 7rem))",
              background: "rgba(10,14,26,0.97)",
              border: "1px solid rgba(59,130,246,0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.15)",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-label="EmerGen AI assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: "linear-gradient(90deg, rgba(37,99,235,0.18) 0%, rgba(59,130,246,0.08) 100%)",
                borderBottom: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-bright leading-none">EmerGen AI</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[0.6rem] text-foreground-muted uppercase tracking-wide">Online · Gemini</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground-bright hover:bg-white/5 transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground-bright hover:bg-white/5 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      msg.role === "user" ? "bg-blue-500/20" : "bg-blue-600/25"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-blue-300" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm text-foreground-muted"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                            boxShadow: "0 2px 12px rgba(59,130,246,0.25)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    {msg.content ? (
                      <MarkdownText text={msg.content} />
                    ) : (
                      <span className="flex items-center gap-1.5 text-foreground-muted/60">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span className="text-xs">Thinking…</span>
                      </span>
                    )}
                    {msg.isStreaming && msg.content && (
                      <span className="inline-block w-0.5 h-3.5 bg-blue-400 ml-0.5 animate-pulse rounded-full align-text-bottom" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex gap-2 flex-wrap flex-shrink-0">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={isLoading}
                    className="text-xs px-2.5 py-1.5 rounded-full transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      color: "#93c5fd",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Emergency disclaimer strip */}
            <div
              className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(239,68,68,0.04)" }}
            >
              <AlertTriangle className="w-3 h-3 flex-shrink-0 text-red-400/70" />
              <p className="text-[0.6rem] text-foreground-muted/50 leading-tight">
                Not a substitute for professional care. Call{" "}
                <a href="tel:911" className="text-red-400/80 font-mono hover:underline">
                  911
                </a>{" "}
                for emergencies.
              </p>
            </div>

            {/* Input */}
            <div
              className="px-4 pb-4 pt-2 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(59,130,246,0.18)",
                }}
              >
                <textarea
                  ref={inputRef}
                  id="chatbot-input"
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-grow
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about symptoms, first aid, emergency contacts…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-foreground-bright placeholder-foreground-muted/50 resize-none outline-none leading-relaxed min-h-[1.5rem] max-h-24 disabled:opacity-50"
                  style={{ scrollbarWidth: "none" }}
                  aria-label="Chat message input"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                  style={{
                    background: input.trim() && !isLoading
                      ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-blue-300 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
              <p className="text-[0.55rem] text-foreground-muted/30 text-center mt-1.5">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
