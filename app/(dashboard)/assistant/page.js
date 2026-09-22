"use client";

import { useState } from "react";
import { assistantResponses } from "@/lib/mockData";
import { Brain, Database, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello. I am the PAIMANA+ Project Intelligence Assistant. I can help you understand project risks, interpret data trust signals, and identify actionable insights based on available records.",
      source: "System",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => {
      const mock = assistantResponses[text];
      setMessages((prev) => [
        ...prev,
        mock
          ? { role: "assistant", content: mock.response, source: mock.source }
          : {
              role: "assistant",
              content:
                "I don't have a grounded response for that query in the current demo dataset. Please try one of the suggested prompts.",
              source: "System",
            },
      ]);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-[calc(100vh-128px)] flex flex-col"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Project Intelligence</h1>
          <p className="text-gray-500 font-medium">Source-grounded contextual search and explanation</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Source-Grounded Prototype
        </span>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Chat */}
        <div className="card flex flex-col flex-1 overflow-hidden">
          <div className="p-4 px-6 border-b border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-black">Note:</span> Responses are constrained to available project records and display source references.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-gray-100 text-black rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "assistant" && msg.source && (
                  <div className="flex items-center gap-1 mt-1 ml-1">
                    <Database size={11} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      SOURCE: {msg.source}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 px-6 border-t border-gray-100">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask about project risks, data confidence, or monitoring priorities..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
              <button
                onClick={() => handleSend(input)}
                className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="card p-6 w-72 shrink-0 overflow-y-auto flex flex-col gap-4">
          <h4 className="text-base font-bold text-black">Suggested Queries</h4>
          <div className="flex flex-col gap-2">
            {Object.keys(assistantResponses).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-left px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:text-black transition-all"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
