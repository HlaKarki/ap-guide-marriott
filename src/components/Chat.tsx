import { useState } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export function Chat() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents(`${import.meta.env.VITE_SERVER_URL}/marriott/chat`),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-brand transition-colors cursor-pointer"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex w-95 max-h-130 flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <span className="text-sm font-semibold">AP Guide Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-0.5 hover:bg-brand transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-75">
            {messages.length === 0 && (
              <p className="text-center text-sm text-muted-foreground mt-8">Ask anything about AP processes</p>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.parts.map((part, idx) => {
                    if (part.type === "text") {
                      return <span key={idx}>{part.content}</span>;
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-secondary px-3 py-2">
                  <Loader2 size={14} className="animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-3 flex items-end gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-brand transition-colors cursor-pointer"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}