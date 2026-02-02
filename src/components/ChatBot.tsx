import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import icyMascot from "@/assets/icy-mascot.png";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Moi! Mä oon ICY 🧊 Miten voin auttaa?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Kiitos viestistäsi! Palaamme asiaan pian. 🧊",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-transparent 
                   shadow-lg hover:scale-110 transition-transform duration-300
                   flex items-center justify-center overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          filter: "drop-shadow(0 4px 20px rgba(56, 189, 248, 0.4))",
        }}
      >
        <img
          src={icyMascot}
          alt="ICY Chat"
          className="w-full h-full object-contain"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] 
                       bg-black/95 border border-white/10 rounded-2xl 
                       flex flex-col overflow-hidden backdrop-blur-xl"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={icyMascot}
                  alt="ICY"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white">
                    ICY
                  </h3>
                  <p className="text-xs text-white/50">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      message.isBot
                        ? "bg-white/10 text-white"
                        : "bg-cyan-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Kirjoita viesti..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full 
                             px-4 py-2 text-sm text-white placeholder-white/30
                             focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-cyan-500 rounded-full flex items-center 
                             justify-center text-white hover:bg-cyan-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
